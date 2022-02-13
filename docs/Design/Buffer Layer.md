---
sidebar_position: 8
title: 'Buffer Layer'
---



import BufferClassesSvg from '../../static/img/buffer_classes.svg'


https://nitcbase.github.io/design/buffer.html

:::note 
The stub code with class and function declarations of the buffer layer can be found in the file `buffer.cpp`.
:::



## Layout

Whenever NITCbase needs to work on a disk block, the block has to be first fetched from the **secondary memory storage** (`disk`) to the **primary memory**. A large pool of memory (called `buffer` in the documentation) is pre-allocated and managed to hold copies of disk blocks in the primary memory. When a request involving access/update of a disk block comes from any of the higher layers, the corresponding disk block is loaded into the buffer. After performing updates, the block has to be committed back to the disk.

NITCbase uses a dedicated **Buffer Layer** for the above task. All the requests involving disk blocks go through the Buffer Layer. The interface provided by the Buffer Layer gives a memory disk abstraction to higher layers. NITCbase has pre-allocated memory for holding `32 blocks` in its buffer memory at a given time. Buffer Layer is responsible for maintaining the buffer memory and making replacements and writebacks as required. The disk class functions are used by the Buffer Layer to load blocks from the disk to the buffer and back. A single object of the disk class needs to be declared at the start of the session. Its purpose is to run the constructor and the destructor of the class.

NITCbase follows an Object-Oriented design for Buffer Layer. The class diagram is as shown below.

<BufferClassesSvg className="themedDocusaurus" />


Certain structure definitions and functions that help access record data and metadata from the disk block are also included in the Buffer Layer. These are discussed at the end of this page (see [miscellaneous section](#Miscellaneous)).

---

## Block Structures

The Buffer Layer defines the following block data structures.

* [HeadInfo](#HeadInfo)
* [Attribute](#Attribute)
* [InternalEntry](#InternalEntry)
* [Index](#Index)

Each structure is designed to store a subset of the data stored in a disk block. A disk block contains `2048` bytes of data. Higher layer functions, however, instead of processing the whole block data together, typically request access to a particular set of related data in a disk block at a time. Whenever such a selective access request is made, the method in the Buffer Layer implementing the access functionality will pack the requested data into the corresponding block structure designed to store that particular type of data. Variables of these structures will be declared and used in the [Cache Layer](./Cache%20Layer), the [Block Access Layer](./Block%20Access%20Layer), and the [B+ Tree Layer](./B+%20Tree%20Layer).

### HeadInfo
NITCbase maintains a `32 bytes` fixed-size header for every disk block. This header stores meta-information, like the type of the block, and a few block specific information, like `#Attrs` and `#Slots`. Though the header has many fields, usage of the fields depends on the type of the block. The structure `HeadInfo` is used to collect all the entries of the header, as shown below. The `setHeader()` and the `getHeader()` methods take a pointer to `struct HeadInfo` as argument.

Implementation Note: `getHeader()` and `setHeader()` methods expect the higher layers to allocate memory for the `struct HeadInfo` before calling them.
```cpp
struct HeadInfo{
	int32_t blockType;
	int32_t pBlock;
	int32_t lBlock;
	int32_t rBlock;
	int32_t numEntries;
	int32_t numAttrs;
	int32_t numSlots;
	unsigned char reserved[4];
};
	/* #include <cstdint> must be done */ 
```

### Attribute
According to the [Physical Layer storage model](./Physical%20Layer#disk-model), a Record block has slots for storing records, and each record contains a set of attributes. The `Attribute` block data structure is used to hold an attribute in memory. Since an attribute can have either `NUMBER` or `STRING` type, `Attribute` is a union of the two types. The size of an Attribute is fixed at `16 bytes`. A `record` will be an array of Attributes whose size is equal to the number of attributes in the relation. An `attribute` being a fundamental unit of data in a `record`, the `Attribute` block data structure is used in several functions of NITCbase.
```cpp
typedef union Attribute{
	float nVal;
	char strVal[ATTR_SIZE];
} Attribute;
```
### InternalEntry
Each `Internal Index block` of a `B+ Tree` consists of many `attribute values` and `child pointers`. This data is arranged in the block in such a way that an attribute value is stored between its left child and right child pointers. The `right child pointer` of one attribute value will be the same as the `left child pointer` of the next attribute value. Hence to avoid redundancy, only one copy is stored, making the data overlapped. The combination of `left child`, `attribute value`, and `right child` makes up the `InternalEntry` structure, as shown below. An Internal Index block is a combination of `100 such overlapped entries`. The getEntry() and setEntry() methods of the class IndInternal take a pointer to struct InternalEntry as an argument.

Implementation Note: The `getEntry()` and `setEntry()` methods are declared in the `class IndBuffer` but are overridden in the `class IndInternal`. `getEntry()` and `setEntry()` methods expect the higher layers to allocate memory for struct InternalEntry before calling them.
```cpp
struct InternalEntry{
	int32_t lChild;
	union Attribute attrVal;
	int32_t rChild;
};
/* #include <cstdint> must be done */
```
### Index
An `index` of a relation should store a reference to its record along with the corresponding attribute value. NITCbase uses `RecId`, which is a `(block#, slot#)` pair, for referencing any record. In NITCbase, an `Index` structure is a combination of `attribute value`, `block#`, and `slot#`, followed by some unused space left for future use, as shown below. Each `Leaf Index block` is a combination of `63 such Index entries`. The `getEntry()` and the `setEntry()` methods of the `class IndLeaf` take a pointer to `struct Index` as an argument.

Implementation Note: The `getEntry()` and `setEntry()` methods are declared in the `class IndBuffer` but are overridden in the `class LeafBuffer`. `getEntry()` and `setEntry()` methods expect the higher layers to allocate memory for `struct Index` before calling them.
```cpp
struct Index{
	union Attribute attrVal;
	int32_t block;
	int32_t slot;
	unsigned char unused[8];
};
/* #include <cstdint> must be done */
```
---

## Buffer Structure
The `Buffer Layer` also defines a `buffer` structure. `StaticBuffer class` maintains meta-information for each block loaded to a buffer. The `BufferMetaInfo` structure is used for storing this meta-information. This structure contains `four fields`: a `free flag` which indicates whether the buffer is occupied, a `dirty flag` which indicates whether the block has been modified, a `blockNum field` which is the block number of the block that is stored in the given buffer and a `timeStamp` field which indicates the last time the buffer had been accessed. `Replacement` is done using a simple `Least Recently Used(LRU)` algorithm, which has been implemented in the `getFreeBuffer()` method. The `timeStamp` field has to be updated each time the buffer is accessed, as is done in the `getBufferPtr()` method.
```cpp
struct BufferMetaInfo{
	bool free;
	bool dirty;
	int blockNum;
	int timeStamp;
};
```

---
## Class StaticBuffer
The `class StaticBuffer` contains as its member field, `blocks[HEADER_SIZE][BLOCK_SIZE]`, a two-dimensional array of unsigned characters with size sufficient to store `32 disk blocks` in memory at any given time. Logically `blocks[i]` can be used to buffer one disk block for each `0 ≤ i ≤ 31`. Each entry of blocks, i.e., `blocks[i]`, is referred to as `buffer block` in the NITCbase documentation. `Buffer blocks` will be committed back to the `disk` as and when required. In addition to storing the data of a block, `class StaticBuffer` also maintains `meta-information` for each loaded block in an array of `BufferMetaInfo` structures through the `metaInfo[HEADER_SIZE]` field. `StaticBuffer class` also maintains a copy of the `Block Allocation Map` in its `blockAllocMap[DISK_BLOCKS]` field. The ith entry of the `Block Allocation Map` specifies whether the ith block is occupied or free. If occupied, it stores the type(`REC`/`IND_INTERNAL`/`IND_LEAF`/`UNUSED`) of the block.

All these data fields are `private` to the `StaticBuffer class` and can only be accessed through `public` methods. This class provides the basic disk fetch and commit interfaces to the higher layers, creating an illusion of having the entire disk in memory at all times. `StaticBuffer` is a `static class`, i.e., all member fields and methods are declared `static`. By doing so, memory will be allocated statically for all member fields of the class, and any access to them will refer to the same statically allocated memory. Also static methods in a class are allowed to access only static members of the class. Consequently, there needs to exist only a single static object of the class(see implementation tip below). The class definition of `StaticBuffer` is as given below:

:::info Note
* The `class BlockBuffer` is a `friend class` to `StaticBuffer class`. This allows all methods in `BlockBuffer` to access the `private` fields and methods of the `StaticBuffer class`. 
* At the same time, friendship is not inherited in C++, i.e., if a `base class` has a friend class, then the class doesn’t become a friend of the `derived classes`. This is explained in detail in the next section.
:::

:::tip Implementation Tip
C++ allows static methods to be accessed using the semantics `class_name::function_name()`, instead of `object_instance->function_name()` as in the case of methods that are not declared statically. Since the class is static, only a single object of the class needs to be created when NITCbase is running, whose sole purpose is to run the `constructor` and the `destructor`.
:::

```cpp
class StaticBuffer{
				
friend class BlockBuffer;

public:
	//methods
	StaticBuffer();
	~StaticBuffer();
	static int getStaticBlockType(int blockNum);
	static void setDirtyBit(int blockNum);
	
private:
	//fields
	static unsigned char blocks[HEADER_SIZE][BLOCK_SIZE];
	static struct BufferMetaInfo metaInfo[HEADER_SIZE];
	static unsigned char blockAllocMap[DISK_BLOCKS];

	//methods
	static int getBufferNum(int blockNum);
	static int getFreeBuffer(int blockNum);
	
};
```
---

<!-- ### StaticBuffer :: StaticBuffer()

#### Description
Transfers the contents of the specified disk block to the input memory buffer. Used in buffer layer to load disk block to buffer.

:::note 
Higher layers must allocate memory for the unsigned character array of size 2048 before passing its pointer to the function.
:::
#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| buffer   | `unsigned char *` | Memory pointer of the buffer to which the block contents is to be loaded/read. |
| blockNum | `int`             | Block number of the disk block to be read.                                     |

#### Return Values
|        Value      |                         Description                               |
|--------------|--------------------------------------------------------|
| `SUCCESS`      | Successful loading/reading of the block to the buffer. |
| `E_OUTOFBOUND` | Block number is out of range.                          | -->


---

## Class BlockBuffer
The `class BlockBuffer` is a generic class for representing a disk block of any type (`Record`, `Internal Index`, or `Leaf Index`). Its only field is `blockNum`. The field `blockNum` stores the disk block number corresponding to the block object. The block has to be loaded and stored in one of the `32 buffers` of the `StaticBuffer class` before its data can be accessed. Adding to the complexity is the fact that the block, once loaded, may not even be present in the buffer memory later on because of the `buffer replacement algorithm` implemented by `Buffer Layer`. In order to work with data of the block, any method of the `BlockBuffer class` or its descendent classes need to know the address of the buffer memory to which the block has been loaded. Hence any method of this class operating on the block data should first get the pointer to the buffer memory that holds the contents of the block. The `getBufferPtr()` method is used for this purpose. The public methods of `BlockBuffer` deal with information like `header` and `block type`, which are generic to all blocks. `RecBuffer` and `IndBuffer` classes extend the `class BlockBuffer`, thereby, inheriting all the fields and methods of `BlockBuffer`.

:::info Note
* If the class definition of a class (say A) declares another class (say B) as a `friend class`, then an instance of class B can access the `private` fields and methods of class A. This friendship is, however, not inherited by the `child classes` of B. 
* As per the NITCbase design, the definition of the `class StaticBuffer` contains the declaration: `friend class BlockBuffer`. Hence, the methods in `BlockBuffer` can access the `private` fields and methods of the `class StaticBuffer`. 
* On the other hand, `RecBuffer` and `IndBuffer` classes can access them only through the public functions of `StaticBuffer class` and through the `public` and `protected` functions of `BlockBuffer class`.
:::
```cpp
class BlockBuffer{
public:
	//methods
	BlockBuffer(char blockType);
	BlockBuffer(int blockNum);
	int getBlockNum();
	int getBlockType();
	void setBlockType(int blockType);
	void getHeader(struct HeadInfo* head);
	void setHeader(struct HeadInfo* head);
	void releaseBlock();

protected:
	//field
	int blockNum;
	
	//methods
	unsigned char *getBufferPtr();
	int getBlock();
	int getFreeBlock(int BlockType);

};
```

## Class RecBuffer
```cpp
class RecBuffer : public BlockBuffer{

public:

	//methods
	RecBuffer();
	RecBuffer(int blockNum);
	void getSlotmap(unsigned char *slotMap);
	void setSlotmap(unsigned char *slotMap);
	int getRecord(union Attribute *rec,int slotNum);
	int setRecord(union Attribute *rec,int slotNum);

};
```

## Class IndBuffer
```cpp
class IndBuffer : public BlockBuffer{

public:
	//methods
	IndBuffer(char blockType);
	IndBuffer(int blockNum);	
	virtual int getEntry(void *ptr, int indexNum) = 0;
	virtual int setEntry(void *ptr, int indexNum) = 0;
	
};
```

## Class IndInternal
```cpp
class IndInternal : public IndBuffer{

public:
	//methods
	IndInternal();
	IndInternal(int blockNum);
	int getEntry(void *ptr, int indexNum);
	int setEntry(void *ptr, int indexNum);
	
};
```

## Class IndLeaf
```cpp
class IndLeaf : public IndBuffer{

public:
	//methods
	IndLeaf();
	IndLeaf(int blockNum);
	int getEntry(void *ptr, int indexNum) ;
	int setEntry(void *ptr, int indexNum) ;
	
};
```

## Miscellaneous
```cpp

```
```cpp

```
```cpp

```
