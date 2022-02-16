---
sidebar_position: 8
title: 'Buffer Layer'
---



import BufferClassesSvg from '../../static/img/buffer_classes.svg'
import BufferClasses from '../../static/img/buffer_classes.png'; 
import Link from '@docusaurus/Link';

https://nitcbase.github.io/design/buffer.html

:::info note 
The Buffer Layer code is contained in four files: `StaticBuffer.cpp`, `StaticBuffer.h`, `BlockBuffer.cpp` and `BlockBuffer.h`. The stub code for these can be found <Link to="/buffer_stub">here</Link >.
:::



## Layout

Whenever NITCbase needs to work on a disk block, the block has to be first fetched from the **secondary memory storage** (`disk`) to the **primary memory**. A large pool of memory (called `buffer` in the documentation) is pre-allocated and managed to hold copies of disk blocks in the primary memory. When a request involving access/update of a disk block comes from any of the higher layers, the corresponding disk block is loaded into the buffer. After performing updates, the block has to be committed back to the disk.

NITCbase uses a dedicated **Buffer Layer** for the above task. All the requests involving disk blocks go through the Buffer Layer. The interface provided by the Buffer Layer gives a memory disk abstraction to higher layers. NITCbase has pre-allocated memory for holding `32 blocks` in its buffer memory at a given time. Buffer Layer is responsible for maintaining the buffer memory and making replacements and writebacks as required. The disk class functions are used by the Buffer Layer to load blocks from the disk to the buffer and back. A single object of the disk class needs to be declared at the start of the session. Its purpose is to run the constructor and the destructor of the class.

NITCbase follows an Object-Oriented design for Buffer Layer. The class diagram is as shown below.

<!-- <BufferClassesSvg className="themedDocusaurus" /> -->

---

<img src={BufferClasses} alt="BufferClasses" width="1600"/>

---

Certain structure definitions and functions that help access record data and metadata from the disk block are also included in the Buffer Layer. These are discussed at the end of this page (see [miscellaneous section](#Miscellaneous)).

## Block Structures

The Buffer Layer defines the following block data structures.

* [HeadInfo](#HeadInfo)
* [Attribute](#Attribute)
* [InternalEntry](#InternalEntry)
* [Index](#Index)

Each structure is designed to store a subset of the data stored in a disk block. A disk block contains `2048` bytes of data. Higher layer functions, however, instead of processing the whole block data together, typically request access to a particular set of related data in a disk block at a time. Whenever such a selective access request is made, the method in the Buffer Layer implementing the access functionality will pack the requested data into the corresponding block structure designed to store that particular type of data. Variables of these structures will be declared and used in the [Cache Layer](./Cache%20Layer), the [Block Access Layer](./Block%20Access%20Layer), and the [B+ Tree Layer](./B+%20Tree%20Layer).

### HeadInfo
NITCbase maintains a `32 bytes` fixed-size header for every disk block. This header stores meta-information, like the type of the block, and a few block specific information, like `#Attrs` and `#Slots`. Though the header has many fields, usage of the fields depends on the type of the block. The structure `HeadInfo` is used to collect all the entries of the header, as shown below. The `setHeader()` and the `getHeader()` methods take a pointer to `struct HeadInfo` as argument.

:::note Implementation Note
`getHeader()` and `setHeader()` methods expect the higher layers to allocate memory for the `struct HeadInfo` before calling them.
:::

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
According to the [Physical Layer storage model](../Design/Physical%20Layer#disk-model), a Record block has slots for storing records, and each record contains a set of attributes. The `Attribute` block data structure is used to hold an attribute in memory. Since an attribute can have either `NUMBER` or `STRING` type, `Attribute` is a union of the two types. The size of an Attribute is fixed at `16 bytes`. A `record` will be an array of Attributes whose size is equal to the number of attributes in the relation. An `attribute` being a fundamental unit of data in a `record`, the `Attribute` block data structure is used in several functions of NITCbase.
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
The `class StaticBuffer` contains as its member field, `blocks[BUFFER_CAPACITY][BLOCK_SIZE]`, a two-dimensional array of unsigned characters with size sufficient to store `32 disk blocks` in memory at any given time. Logically `blocks[i]` can be used to buffer one disk block for each `0 ≤ i ≤ 31`. Each entry of blocks, i.e., `blocks[i]`, is referred to as `buffer block` in the NITCbase documentation. `Buffer blocks` will be committed back to the `disk` as and when required. In addition to storing the data of a block, `class StaticBuffer` also maintains `meta-information` for each loaded block in an array of `BufferMetaInfo` structures through the `metaInfo[BUFFER_CAPACITY]` field. `StaticBuffer class` also maintains a copy of the `Block Allocation Map` in its `blockAllocMap[DISK_BLOCKS]` field. The ith entry of the `Block Allocation Map` specifies whether the ith block is occupied or free. If occupied, it stores the type(`REC`/`IND_INTERNAL`/`IND_LEAF`/`UNUSED`) of the block.

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
	static int setDirtyBit(int blockNum);
	
private:
	//fields
	static unsigned char blocks[BUFFER_CAPACITY][BLOCK_SIZE];
	static struct BufferMetaInfo metaInfo[BUFFER_CAPACITY];
	static unsigned char blockAllocMap[DISK_BLOCKS];

	//methods
	static int getBufferNum(int blockNum);
	static int getFreeBuffer(int blockNum);
	
};
```
---

The following are the specifications for the methods in `class StaticBuffer`. The stub code is availabe here(TODO LINK).

### StaticBuffer :: StaticBuffer()

#### Description
* `Constructor` of the `class StaticBuffer`
* Copies `Block Allocation Map` from disk to buffer memory and updates the meta information of each buffer to initial empty conditions. 
* Should be called at the beginning of the session after the `Disk constructor`.

:::info Note 
The object of the `StaticBuffer class` must be declared after the object of the `Disk class` to ensure that the `StaticBuffer constructor` is called after the `Disk constructor`.
:::
#### Arguments
Nil
#### Return Values
Nil
```cpp
StaticBuffer::StaticBuffer(){
    // copy Block Allocation Map blocks from disk to blockAllocMap using Disk::readBlock()

    //initialize metaInfo of all the buffer blocks with free:true, dirty:false, blockNum:-1 and timeStamp:-1.
    
}
```

### StaticBuffer :: ~StaticBuffer()

#### Description
* `Destructor` of the `class StaticBuffer`
* Copies the `Block Allocation Map` and the dirty blocks from the buffer memory to disk. 
* Should be called at the end of the session before the `Disk destructor`.

:::info Note 
The object of the `StaticBuffer class` must be declared after the object of the `Disk class` to ensure that the `StaticBuffer destructor` is called before the `Disk destructor`.
:::
#### Arguments
Nil

#### Return Values
Nil
```cpp
StaticBuffer::~StaticBuffer(){
    // copy blockAllocMap to Block Allocation Map blocks in the disk using Disk::writeBlock().

    /*iterate through all the metaInfo entries, 
    	write back buffer blocks with meta-info as free:false,dirty:true using Disk::writeBlock().*/
	
}
```

### StaticBuffer :: getStaticBlockType()

#### Description
Returns the block type of the block corresponding to the input block number. This function is used to find the block type without the creation of a block object.

:::info note 
* This function is useful in cases where, given a block number, its block type is not known. Hence it is also not known which type of record object (`Record`, `Internal Index`, or `Leaf Index`) needs to be used to store the block. 
* This function has been used in the B+ Tree Layer, where the block number of the constituent blocks of a B+ Tree is known, but it is not known whether the block is of type `IndInternal` or `IndLeaf`.
:::
#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockNum | `int`             | Block number of the block whose type is required.                              |

#### Return Values
|        Value      |                         Description                               |
|--------------|--------------------------------------------------------|
| blockType      | Block type of the block (`REC`/`IND_INTERNAL`/`IND_LEAF`/`UNUSED`) |
```cpp
int StaticBuffer::getStaticBlockType(int blockNum){
	// Check if blockNum is valid (non zero and less than number of disk blocks)
	// and return E_OUTOFBOUND if not valid.

	// Access the entry in block allocation map corresponding to the blockNum argument
	// and return the block type after type casting to integer.
}
```

### StaticBuffer :: setDirtyBit()

#### Description
Sets the `dirty bit` of the buffer corresponding to the block.

#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockNum | `int`             | Block number of the block whose buffer's dirty bit is to be set.   |

#### Return Values

|        Value     |           Description                        |
|------------------|----------------------------------------------|
| `SUCCESS`        | successfully set dirty bit                   |
| `E_OUTOFBOUND`   | Block number is out of range.                |

```cpp
int StaticBuffer::setDirtyBit(int blockNum){
	// Check if blockNum is valid (non zero and less than number of disk blocks)
	// and return E_OUTOFBOUND if not valid.

    // find the buffer number corresponding to the block using getBufferNum().
    
    // set the dirty flag of that buffer in metaInfo to true

	// return SUCCESS
    
}
```

### StaticBuffer :: getBufferNum()

#### Description
Returns the buffer number of the buffer to which the block with the given block number is loaded.

#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockNum | `int`             | Block number of the block whose buffer number is required.                                    |

#### Return Values
|        Value  | Type |                        Description                               |
|--------------|--------|------------------------------------------------|
| bufferNum  | `int`    | Buffer number to which the given block is loaded. |
| `FAILURE`  | `int`    | Block is not loaded to any buffer.                          |
```cpp
int StaticBuffer::getBufferNum(int blockNum){
	// Check if blockNum is valid (non zero and less than number of disk blocks)
	// and return E_OUTOFBOUND if not valid.
    
	//traverse through the metaInfo array &
    //	find the buffer number of the buffer to which the block is loaded.
    
    //if found return buffer number, else indicate failure.
	
}
```
### StaticBuffer :: getFreeBuffer()

#### Description
Assigns a buffer to the block and returns the buffer number. If no free buffer block is found, the least recently used (`LRU`) buffer block is replaced.

:::info note
* This function never fails - a buffer is always assigned to the block.
* The `timeStamp` is reset to `0` each time the buffer block is accessed and incremented when other buffer blocks are accessed. Thus the buffer block with the largest `timeStamp` is the one that is least recently used.
* The function allots a free buffer block, fills its `metaInfo` with relevant information, and updates the `timeStamp`. The caller is responsible for actually loading the block into the buffer. 
:::
#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockNum | `int`             | Block number of the block to be loaded to a buffer block.                       

#### Return Values
|        Value |  Type |                        Description                                        |
|--------------|-------|---------------------------------------------------------------------------|
| bufferNum    | `int` | Buffer number of the free/freed buffer block assigned to the input block. |

```cpp
int StaticBuffer::getFreeBuffer(int blockNum){
	// Check if blockNum is valid (non zero and less than number of disk blocks)
	// and return E_OUTOFBOUND if not valid.

    // increase the timeStamp in metaInfo of all occupied buffers.
    
    // let bufferNum be used to store the buffer number of the free/freed buffer.
	
    // if a free buffer is available, bufferNum is the index of that free buffer.
    
    // if a free buffer is not available, write back the buffer with the largest timeStamp using Disk::writeBlock() and set it as bufferNum.
    
    // update the metaInfo entry corresponding to bufferNum with free:false, dirty:false, blockNum:the input block number and timeStamp:0.
    
    // return the bufferNum.
}
```

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

The following are the specifications for the methods in class BlockBuffer. The stub code is availabe here(TODO LINK).

### BlockBuffer :: BlockBuffer() (Constructor1)

#### Description
* One of the`Constructors` of the `class BlockBuffer`
* Called if a new block of the input type is to be allocated in the disk.

:::info note
If the block already exists on the disk use [constructor 2](#blockbuffer--blockbuffer-constructor-2).
:::
#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockType | `char`             | Type of the new block to be allotted. (`'R'`/`'I'`/`'L'`); (`R`-`REC`, `I`-`IND_INTERNAL`, `L`-`IND_LEAF`) |

#### Return Values
Nil

```cpp
Blockbuffer::BlockBuffer(char blockType){
	
	// allocate a block in the disk and a buffer in memory to hold the new block of given type using getFreeBlock().

	// set the blockNum field of the object to that of the allocated block number.

}
```

### BlockBuffer :: BlockBuffer() (Constructor2)

#### Description
* One of the`Constructors` of the `class BlockBuffer`
* Called when the block already exists on the disk.

:::info note
If a new block is to be allocated in the disk use [constructor 1](#blockbuffer--blockbuffer-constructor-1).
:::
#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockNum | `int`             | Block number of the block whose object is to be created.                                     |

#### Return Values
Nil

```cpp
Blockbuffer::BlockBuffer(int blockNum){
	
	// set the blockNum field of the object to input argument.

	// copy the block into buffer memory using getBlock() (discard the return value).

}
```

### BlockBuffer :: getBlockNum()

#### Description
Returns the block number of the block.

#### Arguments
Nil

#### Return Values
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockNum | `int`             | Block number of the block.   |


```cpp
int BlockBuffer::getBlockNum(){

	//return corresponding block number.
	
}
```

### BlockBuffer :: getBlockType()

#### Description
Returns the type of the block corresponding to the block object.

#### Arguments
Nil
#### Return Values
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockType | `int`             | Type of the block(`REC`/`IND_INTERNAL`/`IND_LEAF`) |

```cpp
int BlockBuffer::getBlockType(){

	// get the starting address of the buffer containing the block using getBufferPtr(). 
	
	//return the first 4 bytes of the buffer that stores the block type.
	
}
```

### BlockBuffer :: setBlockType()

#### Description
Sets the type of the block with the input block type.

#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockType | `int`             | Type of the block(`REC`/`IND_INTERNAL`/`IND_LEAF`) |

#### Return Values
Nil

```cpp
void BlockBuffer::setBlockType(int blockType){						
	
	// get the starting address of the buffer containing the block using getBufferPtr().

	//store the input block type in the first 4 bytes of the buffer.

	//update the StaticBuffer::blockAllocMap entry corresponding to the object's block number. 

	//update dirty bit using StaticBuffer::setDirtyBit().
	
}
```

### BlockBuffer :: getHeader()

#### Description
Gives the header of the block.

:::info note
* Any type of block(`Record`, `Internal Index`, or `Leaf Index`) of NITCbase has the same header structure. Therefore, `getHeader()` method is kept in abstract `BlockBuffer class`.
* Higher layer must allocate memory for the `struct HeadInfo` variable before calling this function.
:::
#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| head | struct HeadInfo*   | Pointer to the HeadInfo structure to which the block header is copied.  |

#### Return Values
Nil

```cpp
void BlockBuffer::getHeader(struct HeadInfo *head){	
	
	// get the starting address of the buffer containing the block using getBufferPtr().

	//copy the header of block to the memory location pointed to by the head using appropriate type casting.

}
```

### BlockBuffer :: setHeader()

#### Description
Sets the header of the block.

:::info note
* Any type of block(`Record`, `Internal Index`, or `Leaf Index`) of NITCbase has the same header structure. Therefore, `setHeader()` method is kept in abstract `BlockBuffer class`.
* Higher layer must allocate memory for the `struct HeadInfo` variable before calling this function.
:::

#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| head | struct HeadInfo*   | Pointer to the HeadInfo structure to which the block header is copied.  |

#### Return Values
Nil

```cpp
void BlockBuffer::setHeader(struct HeadInfo *head){

	// get the starting address of the buffer containing the block using getBufferPtr().

	//copy the contents of the memory location pointed to by head to the header of block using appropriate type casting.

	//update dirty bit using StaticBuffer::setDirtyBit().
	
}
```

### BlockBuffer :: releaseBlock()

#### Description
Deletes the block from both the buffer memory and the disk.

#### Arguments
Nil                                    |

#### Return Values
Nil

```cpp
void BlockBuffer::releaseBlock(){

	// get the buffer number of the buffer assigned to the block using StaticBuffer::getBufferNum().

	//if the buffer number is valid, free the buffer by setting the free flag of its metaInfo entry to true.

	//free the block in disk by setting the data type of the entry corresponding to the block number in StaticBuffer::blockAllocMap to UNUSED.
	
	//set the object's blockNum to -1.
	
}
```

### BlockBuffer :: getBufferPtr()

#### Description
Returns a pointer to the first byte of the buffer storing the block.

#### Arguments
Nil

#### Return Values
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| bufferPtr | `unsigned char*`  | Pointer to the buffer containing the block. |

:::info Note
* All get and set methods accessing the block's data should call the `getBufferPtr()` method to get the starting address of the buffer block holding the block's data. 
* **This also ensures that the block is reloaded back to buffer memory if it had been replaced by the buffer replacement algorithm since the last data access.**
:::

```cpp
unsigned char * BlockBuffer::getBufferPtr(){
	
	//find the buffer number of the block using getBlock().
	
	// return the pointer to this buffer (given by StaticBuffer::blocks[bufferNum]).
}

```

### BlockBuffer :: getBlock()

#### Description
Loads the block into buffer (if not present), updates the timestamps and returns the corresponding buffer number.

#### Arguments
Nil                                    |

#### Return Values
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| bufferNum | `int`  | Buffer number of the buffer containing the block. |

:::info note
This function **never fails** - a buffer is always alloted to the block doing replacement, if necessary.
:::
```cpp
int BlockBuffer::getBlock(){

     // get the buffer number of the buffer assigned to the block using StaticBuffer::getBufferNum().
	 
     // if present in buffer memory(i.e., a valid buffer number), set the timeStamp in the corresponding BufferMetaInfo entry to 0 and increment the timeStamp in the BufferMetaInfo of all other occupied buffers.
     
     //if not present in buffer memory(i.e., an invalid buffer number), get a free buffer using StaticBuffer::getFreeBuffer() and read the block into the free buffer using Disk::readBlock().
   
     //return the buffer number.
	
}
```

### BlockBuffer :: getFreeBlock()

#### Description
Returns the block number of a free block of the input type in the disk and allots a buffer to that block. If free block is not available FAILURE is returned.

#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockType | `int`  | Type of the required block(`REC`/`IND_INTERNAL`/`IND_LEAF`/`UNUSED`) |

#### Return Values
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| blockNum | `int`  | Block number of the free block. |
| `FAILURE` | `int`  | No free block is available in the disk. |

```cpp
int BlockBuffer::getFreeBlock(int blockType){

	//iterate through the StaticBuffer::blockAllocMap and find the block number of a free block in the disk.

	//if no block is free, return FAILURE.
	
	//set the object's blockNum to the block number of the free block.

	//find a free buffer using StaticBuffer::getFreeBuffer() .
	
	//initialize the header of the block with pblock: -1, lblock: -1, rblock: -1, numEntries: 0, numAttrs: 0 and numSlots: 0 using setHeader().	

	//update the block type of the block to the input block type using setBlockType().

	//return block number of the free block.

}
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

*IndBuffer* class is a generic class for representing an *Index* block. [B+ Trees](https://en.wikipedia.org/wiki/B%2B_tree) are constructed using *Index* blocks which can be either [Index Internal blocks](../Design/Physical%20Layer#internal-index-block-structure) or [Index Leaf blocks](../Design/Physical%20Layer#leaf-index-block-structure). B+ Tree helps in faster data access as compared to sequentially accessing the data through [Record](../Design/Physical%20Layer#record-block-structure) blocks. 

*IndBuffer* class extends the [BlockBuffer](#class-blockbuffer) class. Thus, all its protected fields and methods can be accessed by *IndBuffer* class. In addition to these, *IndBuffer* class has two [pure virtual methods](https://en.wikipedia.org/wiki/Virtual_function#Abstract_classes_and_pure_virtual_functions)- `getEntry()` and `setEntry()`. These methods take an argument of type `void *` so that arguments of both [`struct InternalEntry`](#internalentry) and [`struct Index`](#index) type can be passed to it. This is based on the fact that a [void pointer](https://en.wikipedia.org/wiki/Void_type) can hold address of any type and can be typcasted to any type. 

The children classes, [IndInternal](#class-indinternal) and [IndLeaf](#class-indleaf), extend the class IndBuffer and override the virtual functions. The constructors of *IndBuffer* class simply calls the constructor of the parent class with the received argument.

```cpp
class IndBuffer : public BlockBuffer {

public:
	//methods
	IndBuffer(char blockType);
	IndBuffer(int blockNum);	
	virtual int getEntry(void *ptr, int indexNum) = 0;
	virtual int setEntry(void *ptr, int indexNum) = 0;
	
};
```

The following are the specifications for the methods in class IndBuffer.

### IndBuffer :: IndBuffer() (Constructor 1)

#### Description
Called if a new index block of the input type is to be allocated in the disk.

#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| I | `char`  | New block of [`IND_INTERNAL`](https://nitcbase.github.io/constants.html) type to be alloted. |
| L | `char`  | New block of [`IND_LEAF `](https://nitcbase.github.io/constants.html) type to be alloted. |

#### Return Values
Nil

#### Algorithm
```cpp
// this is the way to call parent non-default constructor.
IndBuffer::IndBuffer(char blockType) : BlockBuffer(blockType){}

```

:::note
If the index block already exists on the disk use [constructor 2](#indbuffer-constructor-2).
:::

### IndBuffer :: IndBuffer() (Constructor 2)

#### Description
Called when the index block already exists on the disk.

#### Arguments
| Name | Type | Description |
|-----------|------------------|---------------------|
| blockNum | `int`  | Block number of the index block. |

#### Return Values
Nil

#### Algorithm
```cpp
// this is a way to call parent non-default constructor.
IndBuffer::IndBuffer(int blockNum) : BlockBuffer(blockNum){} 
```

:::note
If a new index block is to be allocated in the disk use [constructor 1](#indbuffer-constructor-1).
:::


## Class IndInternal
```cpp
class IndInternal : public IndBuffer {

public:
	//methods
	IndInternal();
	IndInternal(int blockNum);
	int getEntry(void *ptr, int indexNum);
	int setEntry(void *ptr, int indexNum);
	
};
```

## Class IndLeaf

An object of the *IndLeaf* class will be associated with a [Index Leaf blocks](../Design/Physical%20Layer#leaf-index-block-structure). A Leaf Index block stores entries of type `struct Index` and is used as the leaf nodes of a B+ Tree. Public methods of this class deal with the access/modification of the *Index* entries. **IndLeaf* class extends [IndBuffer class](#class-indbuffer) and overrides its virtual methods. The constructor of the IndLeaf class calls the constructor of the parent class by passing suitable argument.

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

The following are the specifications for the methods in class IndLeaf.

### IndLeaf :: IndLeaf() (Constructor 1)

#### Description
Called if a new leaf index block is to be allocated in the disk.

#### Arguments
Nil

#### Return Values
Nil

#### Algorithm
```cpp
IndLeaf::IndLeaf() : IndBuffer('L'){} // this is the way to call parent non-default constructor.
				      // 'L' used to denote IndLeaf.

```

:::note
If the leaf index block already exists on the disk use [constructor 2](#indleaf-constructor-2).
:::

### IndLeaf :: IndLeaf() (Constructor 2)

#### Description
Called when the leaf index block already exists on the disk.

#### Arguments
| Name | Type | Description |
|-----------|------------------|---------------------|
| blockNum | `int`  | Block number of the leaf index block. |
#### Return Values
Nil

#### Algorithm
```cpp
//this is the way to call parent non-default constructor.
IndLeaf::IndLeaf(int blockNum) : IndBuffer(blockNum){} 
```

:::note
If a new leaf index block is to be allocated in the disk use [constructor 1](#indleaf-constructor-1).
:::


### IndLeaf :: getEntry()

#### Description
Gives the indexNum<sup>th</sup> entry of the block.

#### Arguments
| Name | Type | Description |
|-----------|------------------|---------------------|
| ptr | `void *`  | Pointer to the  [struct Index](#index) to which the specified leaf index entry of the block is copied. |
| indexNum | `int`  | Index number of the entry in the block. |

#### Return Values
| Value | Description |
|----------|--------------------------------------------------------------------------------|
| [`SUCCESS`](https://nitcbase.github.io/constants.html#constants)  |	Successful getting of the leaf index entry. |
| [`E_OUTOFBOUND`](https://nitcbase.github.io/constants.html#constants) | Input `indexNum` is outside the valid range of index numbers of the block. |

#### Algorithm
```cpp
int IndLeaf::getEntry(void *ptr, int indexNum) {
						
	// get the starting address of the buffer containing the block using BlockBuffer::getBufferPtr(). 

	// if the indexNum is not in the valid range of 0-(MAX_ENTRIES_LEAF-1), return E_OUTOFBOUND.

	// using offset range, copy the indexNumth entry to memory pointed to by ptr.    

	// return SUCCESS.

}

```

:::note
* The [void pointer](https://en.wikipedia.org/wiki/Void_type) is a generic pointer that can be pointed at objects of any data type. However, because the void pointer does not know what type of object it is pointing to, the void pointer must first be explicitly cast to another pointer type before it is dereferenced.
* The higher layers calling the `getEntry()` function of the *IndLeaf* class must ensure that the argument of type `struct Index *` is passed.
* The higher layers must allocate memory for the `struct Index` before calling this function.
:::


### IndLeaf :: setEntry()

#### Description
Sets the indexNum<sup>th</sup> entry of the block with the input struct Index contents.

#### Arguments
| Name | Type | Description |
|-----------|------------------|---------------------|
| ptr | `void *`  | Pointer to the [struct Index](#index) to which the specified leaf index entry of the block is copied. |
| indexNum | `int`  | Index number of the entry in the block. |

#### Return Values
| Value | Description |
|----------|--------------------------------------------------------------------------------|
| [`SUCCESS`](https://nitcbase.github.io/constants.html#constants)  |	Successful setting of the leaf index entry. |
| [`E_OUTOFBOUND`](https://nitcbase.github.io/constants.html#constants) | Input `indexNum` is outside the valid range of index numbers of the block. |

#### Algorithm
```cpp
int IndLeaf::getEntry(void *ptr, int indexNum) {
						
	// get the starting address of the buffer containing the block using BlockBuffer::getBufferPtr(). 

	// if the indexNum is not in the valid range of 0-(MAX_ENTRIES_LEAF-1), return E_OUTOFBOUND.

	// using offset range, copy the indexNumth entry to memory pointed to by ptr.    

	// return SUCCESS.

}
```

:::note
* The [void pointer](https://en.wikipedia.org/wiki/Void_type) is a generic pointer that can be pointed at objects of any data type. However, because the void pointer does not know what type of object it is pointing to, the void pointer must first be explicitly cast to another pointer type before it is dereferenced.
* The higher layers calling the `setEntry()` function of the IndLeaf class must ensure that the argument of type `struct Index *` is passed.
* The higher layers must allocate memory for the struct Index before calling this function.
:::



## Miscellaneous

Given below are the definitions of RecId and IndexId structures. Variables of these structures will be of use in several layers of NITCbase, such as [Cache layer](Cache%20Layer.md), [Block access layer](Block%20Access%20Layer.md) and [B+ tree](B+%20Tree%20Layer.md) layer, to name a few.

### RecId

Relations in NITCbase are made up of records. Every record of any relation can be referenced using an id called `RecId`. `RecId` is a combination of the block number of the corresponding record block and the slot number of the slot occupied by the record in the block. It is used to locate where the record is stored in the disk.

```cpp
struct RecId {
	int block;
	int slot;
};
```

### IndexId

The Leaf Index blocks of a B+ Tree are made of [Index](#index) entries. Every *Index* entry of any *Leaf Index* block can be referenced using an id called `IndexId`. It is a combination of block number of the corresponding leaf index block and index number, which is the offset of the index in that block. It is used to locate where the index is stored in the disk.

```cpp
struct IndexId {
	int block;
	int index;
};
```

### compare()

#### Description
This function compares two [`union Attribute`](#attribute) values on the basis of the input attribute type.

#### Arguments
| Name | Type | Description |
|-----------|------------------|---------------------|
| attr1 | [`union Attribute`](#attribute)  |First attribute value to be compared. |
| attr2 | [`union Attribute`](#attribute)  | Second attribute value to be compared. |
| attrType | `int`  | Type of the attribute [`NUM/STR`](https://nitcbase.github.io/constants.html#constants). |

#### Return Values
| Value | Description |
|----------|--------------------------------------------------------------------------------|
| Negative integer  |	Value in `attr1` is **less** than the value in `attr2`. |
| Zero  |	Value in `attr1` is **equal** to the value in `attr2`. |
| Positive integer	 |	Value in `attr1` is **greater** than the value in `attr2`. |


```cpp
int compare(union Attribute attr1, union Attribute attr2, int attrType) {
	
    /* 	if attrType == STRING
			return strcmp(attr1.sval, attr2.sval); */
    
    /* else if attrType == NUMBER 
          return -1, 0, 1 depending on whether the value attr1.nval is
          less than, equal to or greater than the value attr2.nval */ 
    
}
```

:::note
* Both the attributes given as input must be of the same type as the input type.
* For string type, the comparision is performed with respect to *lexicographic order*.
:::