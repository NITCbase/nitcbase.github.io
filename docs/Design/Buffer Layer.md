---
sidebar_position: 8
title: "Buffer Layer"
---

import BufferClassesSvg from '../../static/img/buffer_classes.svg'
import BufferClasses from '../../static/img/buffer_classes.png';
import BufferStructures from '../../static/img/buffer_structures.png';
import Link from '@docusaurus/Link';

https://nitcbase.github.io/archived-site/design/buffer.html

:::info note
The Buffer Layer code is to be written in 2 pairs of files:

- `StaticBuffer.cpp` and it's header file `StaticBuffer.h`
- `BlockBuffer.cpp` and it's header file `BlockBuffer.h`.

**<Link to="/buffer_stub">The stub code for these files can be found here. </Link >**
:::

## Layout

Whenever NITCbase needs to work on a disk block, the block has to be first fetched from the _secondary memory storage_ (`disk`) to the **primary memory**. _A large pool of memory_ (called _buffer_ in the documentation) is pre-allocated and managed to _hold copies of disk blocks in the primary memory_. When a request involving _access/update_ of a disk block comes from any of the higher layers, the corresponding disk block is loaded into the buffer. After performing updates, the block is committed back to the disk from the buffer.

NITCbase uses a dedicated **Buffer Layer** for the above functionality.
_All the requests involving disk blocks go through the Buffer Layer._ The interface provided by the **_Buffer Layer_** gives a memory address space abstraction to the higher layers, hiding the complexities involved in the reads and writes to the actual physical disk blocks.

NITCbase has pre-allocated memory for holding **32 disk blocks** in its **_buffer memory_** at a given time. Buffer Layer is responsible for maintaining the buffer memory and making _replacements_ and _writebacks_ as required. The disk class functions are used by the Buffer Layer to load blocks from the disk to the buffer and also to write back blocks as and when necessary. A single object of the disk class needs to be declared at the start of the session. Its purpose is to run the constructor and the destructor of the class.

:::tip Note
The `Disk` class _constructor_ will create a new **_Run Copy_** of the actual disk and all disk accesses during runtime of NITCbase is done via this _Run Copy_. At the close of the system, the `Disk` class _destructor_ will write back the _Run Copy_ of disk to the actual disk.
:::

NITCbase follows an Object-Oriented design for Buffer Layer. The class diagram is as shown below.

<!-- <BufferClassesSvg className="themedDocusaurus" /> -->

---

<img src={BufferClasses} alt="BufferClasses" width="1600"/>

---

Various structures used in the buffer layer are outlined in the below diagrams.
<img src={BufferStructures} alt="BufferStructures" width="800" />

---

Certain other structure definitions and functions that help access record data and metadata from the disk block are also included in the Buffer Layer. These are discussed at the end of this page (see [miscellaneous section](#Miscellaneous)).

## Block Structures

The Buffer Layer defines the following block data structures.

- [HeadInfo](#headinfo)
- [Attribute](#attribute)
- [InternalEntry](#internalentry)
- [Index](#index)

Each structure is designed to store **a subset of the data stored in a disk block**. A disk block contains **_2048 bytes_** of data. Higher layer functions, however, instead of processing the whole block data together, typically request access to a particular set of related data in a disk block at a time. Whenever such a selective access request is made, the method in the Buffer Layer implementing the access functionality will pack the requested data into the corresponding block structure designed to store that particular type of data. Variables of these structures will be declared and used in the [Cache Layer](./Cache%20Layer), the [Block Access Layer](./Block%20Access%20Layer), and the [B+ Tree Layer](./B+%20Tree%20Layer).

### HeadInfo

**NITCbase maintains a _32 byte_ _fixed-size_ header for every disk block.** This header stores _meta-information_, like the type of the block, and a few block specific information, like `#Attrs` and `#Slots`. Though the header has many fields, usage of the fields depends on the type of the block. The structure `HeadInfo` is used to collect all the entries of the header, as shown below. The `setHeader()` and the `getHeader()` methods take a pointer to `struct HeadInfo` as argument.

:::caution Implementation Note
`getHeader()` and `setHeader()` methods expect the higher layers to allocate memory for the `struct HeadInfo` before calling them.
:::

```cpp
struct HeadInfo {
    int32_t blockType;
    int32_t pblock;
    int32_t lblock;
    int32_t rblock;
    int32_t numEntries;
    int32_t numAttrs;
    int32_t numSlots;
    unsigned char reserved[4];
};
    /* #include <cstdint> must be done */
```

### Attribute

According to the [Physical Layer storage model](../Design/Physical%20Layer#disk-model), a Record block has slots for storing records, and each record contains a set of attributes. The `Attribute` block data structure is used to hold an attribute in memory. Since an attribute can have either `NUMBER` or `STRING` type, `**Attribute**` is a _union_ containing the two types. The size of an Attribute is fixed at **_16 bytes_**. A `**record**` will be an array of Attributes whose size is equal to the number of attributes in the relation.

:::tip
Attribute is the fundamental unit of data in a record. Hence, the `Attribute` data structure is used in several functions of NITCbase.
:::

The definition for `union Attribute` is given below:

```cpp
typedef union Attribute {
    double nVal;
    char sVal[ATTR_SIZE];
} Attribute;
```

### InternalEntry

Each **Internal Index** block of a _B+ Tree_ consists of many _attribute values_ and the _child pointers_. This data is arranged in the block in such a way that an attribute value is stored **between** its left child and right child pointers.

:::info Note
The `right child pointer` of one attribute value will be the **same** as the `left child pointer` of the next attribute value. Hence to avoid redundancy, only one copy is stored, _making the data overlapped._
:::

The combination of `left child`, `attribute value`, and `right child` makes up the `InternalEntry` structure, as shown below. An Internal Index block is a combination of `100 such overlapped entries`. The `getEntry()` and `setEntry()` methods of the class `IndInternal` take a pointer to struct `InternalEntry` as an argument.

:::caution Implementation Note
The `getEntry()` and `setEntry()` methods are declared in the `class IndBuffer` but are overridden in the `class IndInternal`. `getEntry()` and `setEntry()` methods expect the higher layers to allocate memory for struct InternalEntry before calling them.
:::

```cpp
struct InternalEntry {
    int32_t lChild;
    union Attribute attrVal;
    int32_t rChild;
};
/* #include <cstdint> must be done */
```

### Index

An _index_ of a relation should store a reference to its record along with the corresponding attribute value. NITCbase uses `**RecId**`, which is a `(block#, slot#)` pair, for referencing any record. In NITCbase, an `Index` structure is a combination of `attribute value`, `block#`, and `slot#`, followed by some unused space left for future use, as shown below.

Each `Leaf Index block` is a combination of **63 such Index entries**. The `getEntry()` and the `setEntry()` methods of the `class IndLeaf` take a pointer to `struct Index` as an argument.

:::caution Implementation Note
The `getEntry()` and `setEntry()` methods are declared in the `class IndBuffer` but are overridden in the `class LeafBuffer`. `getEntry()` and `setEntry()` methods expect the higher layers to allocate memory for `struct Index` before calling them.
:::

```cpp
struct Index {
    union Attribute attrVal;
    int32_t block;
    int32_t slot;
    unsigned char unused[8];
};
/* #include <cstdint> must be done */
```

---

## Buffer Structure

The Buffer Layer also defines a _buffer_ structure. `StaticBuffer class` maintains meta-information for each block loaded to a buffer.

The `BufferMetaInfo` structure is used for storing this meta-information. This structure contains **four fields**: a `free flag` which indicates whether the buffer is occupied, a `dirty flag` which indicates whether the block has been modified, a `blockNum` field which is the block number of the block that is stored in the given buffer and a `timeStamp` field which indicates the last time the buffer had been accessed.

_Block Replacement_ is done using a simple **Least Recently Used (LRU)** algorithm, which has been implemented in the `getFreeBuffer()` method. The `timeStamp` field has to be updated each time the buffer is accessed, as is done in the `getBufferPtr()` method.

```cpp
struct BufferMetaInfo {
    bool free;
    bool dirty;
    int blockNum;
    int timeStamp;
};
```

---

## class StaticBuffer

The `class StaticBuffer` contains as its member field, `blocks[BUFFER_CAPACITY][BLOCK_SIZE]`, a two-dimensional array of unsigned characters with size sufficient to store `32` disk blocks in memory at any given time. Logically `blocks[i]` can be used to buffer one disk block for each `0 ≤ i ≤ 31`. Each entry of blocks, i.e., `blocks[i]`, is referred to as buffer block in the NITCbase documentation. Buffer blocks will be committed back to the `disk` as and when required. In addition to storing the data of a block, `class StaticBuffer` also maintains meta-information for each loaded block in an array of `BufferMetaInfo` structures through the `metaInfo[BUFFER_CAPACITY]` field. `StaticBuffer class` also maintains a copy of the **Block Allocation Map** in its `blockAllocMap[DISK_BLOCKS]` field. The ith entry of the Block Allocation Map specifies whether the ith block is occupied or free. If occupied, it stores the type(`REC`/`IND_INTERNAL`/`IND_LEAF`/`UNUSED`) of the block.

All these data fields are **private** to the `StaticBuffer class` and can only be accessed through **public** methods. This class provides the basic disk fetch and commit interfaces to the higher layers, creating an illusion of having the entire disk in memory at all times. `StaticBuffer` is a **static class**, i.e., all member fields and methods are declared static. By doing so, memory will be allocated statically for all member fields of the class, and any access to them will refer to the same statically allocated memory. Also static methods in a class are allowed to access only static members of the class. Consequently, there needs to exist only a single static object of the class(see implementation tip below). The class definition of `StaticBuffer` is as given below:

:::info Note

- The `class BlockBuffer` is a **friend class** to `StaticBuffer class`. This allows all methods in `BlockBuffer` to access the private fields and methods of the `StaticBuffer class`.
- At the same time, **friendship is not inherited in C++**, i.e., if a base class has a friend class, then the class doesn’t become a friend of the derived classes. This is explained in detail in the next section.
  :::

:::tip Implementation Tip
C++ allows static methods to be accessed using the semantics `class_name::function_name()`, instead of `object_instance->function_name()` as in the case of methods that are not declared statically. Since the class is static, only a single object of the class needs to be created when NITCbase is running, whose sole purpose is to run the `constructor` and the `destructor`.
:::

```cpp
class StaticBuffer {

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

The following are the specifications for the methods in `class StaticBuffer`.

### StaticBuffer :: StaticBuffer()

#### Description

- `Constructor` of the `class StaticBuffer`
- Copies `Block Allocation Map` from disk to buffer memory and updates the meta information of each buffer to initial empty conditions.
- Should be called at the beginning of the session after the `Disk constructor`.

:::caution Note
The object of the `StaticBuffer class` must be declared after the object of the `Disk class` to ensure that the `StaticBuffer constructor` is called after the `Disk constructor`.
:::

#### Arguments

Nil

#### Return Values

Nil

#### Algorithm

```cpp
StaticBuffer::StaticBuffer(){
    // copy Block Allocation Map blocks from disk to blockAllocMap using Disk::readBlock()

    //initialize metaInfo of all the buffer blocks with free:true, dirty:false, blockNum:-1 and timeStamp:-1.

}
```

### StaticBuffer :: ~StaticBuffer()

#### Description

- `Destructor` of the `class StaticBuffer`
- Copies the `Block Allocation Map` and the dirty blocks from the buffer memory to disk.
- Should be called at the end of the session before the `Disk destructor`.

:::caution Note
The object of the `StaticBuffer class` must be declared after the object of the `Disk class` to ensure that the `StaticBuffer destructor` is called before the `Disk destructor`.
:::

#### Arguments

Nil

#### Return Values

Nil

#### Algorithm

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

- This function is useful in cases where, given a block number, its block type is not known. Hence it is also not known which type of record object (`Record`, `Internal Index`, or `Leaf Index`) needs to be used to store the block.
- This function has been used in the B+ Tree Layer, where the block number of the constituent blocks of a B+ Tree is known, but it is not known whether the block is of type `IndInternal` or `IndLeaf`.
  :::

#### Arguments

| Name     | Type  | Description                                       |
| -------- | ----- | ------------------------------------------------- |
| blockNum | `int` | Block number of the block whose type is required. |

#### Return Values

| Value                        | Description                                                        |
| ---------------------------- | ------------------------------------------------------------------ |
| blockType                    | Block type of the block (`REC`/`IND_INTERNAL`/`IND_LEAF`/`UNUSED`) |
| [`E_OUTOFBOUND`](/constants) | blockNum is outside the valid range                                |

#### Algorithm

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

| Name     | Type  | Description                                                      |
| -------- | ----- | ---------------------------------------------------------------- |
| blockNum | `int` | Block number of the block whose buffer's dirty bit is to be set. |

#### Return Values

| Value                              | Description                                  |
| ---------------------------------- | -------------------------------------------- |
| [`SUCCESS`]/constants              | successfully set dirty bit                   |
| [`E_OUTOFBOUND`](/constants)       | blockNum is outside the valid range          |
| [`E_BLOCKNOTINBUFFER`](/constants) | block with blockNum is not present in Buffer |

#### Algorithm

```cpp
int StaticBuffer::setDirtyBit(int blockNum){
    //find the buffer index corresponding to the block using the getBufferNum().

    // if Buffer is valid, bufferNum != E_BLOCKNOTINBUFFER

        // set the dirty bit of that buffer in the metaInfo to true.

    // else Buffer is ivalid

        // return the returned error code from getBufferNum call

            // E_OUTOFBOUND - blockNum is invalid
            // E_BLOCKNOTINBUFFER - block with blockNum is not present in Buffer

    // return SUCCESS

}
```

### StaticBuffer :: getBufferNum()

#### Description

Returns the buffer number of the buffer to which the block with the given block number is loaded.

#### Arguments

| Name     | Type  | Description                                                |
| -------- | ----- | ---------------------------------------------------------- |
| blockNum | `int` | Block number of the block whose buffer number is required. |

#### Return Values

| Value                        | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| bufferNum                    | Buffer number to which the given block is loaded. |
| [`FAILURE`](/constants)      | Block is not loaded to any buffer.                |
| [`E_OUTOFBOUND`](/constants) | blockNum is outside the valid range               |

#### Algorithm

```cpp
int StaticBuffer::getBufferNum(int blockNum){
    // Check if blockNum is valid (non zero and less than number of disk blocks)
    // and return E_OUTOFBOUND if not valid.

    //traverse through the metaInfo array &
    //	find the buffer number of the buffer to which the block is loaded.

    //if found return buffer number

    // if block not found in buffer return E_BLOCKNOTINBUFFER

}
```

### StaticBuffer :: getFreeBuffer()

#### Description

Assigns a buffer to the block and returns the buffer number. If no free buffer block is found, the least recently used (`LRU`) buffer block is replaced.

:::info note

- This function never fails - a buffer is always assigned to the block.
- The `timeStamp` is reset to `0` each time the buffer block is accessed and incremented when other buffer blocks are accessed. Thus the buffer block with the largest `timeStamp` is the one that is least recently used.
- The function allots a free buffer block, fills its `metaInfo` with relevant information, and updates the `timeStamp`. The caller is responsible for actually loading the block into the buffer.
  :::

#### Arguments

| Name     | Type  | Description                                               |
| -------- | ----- | --------------------------------------------------------- |
| blockNum | `int` | Block number of the block to be loaded to a buffer block. |

#### Return Values

| Value                        | Type                                | Description                                                               |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------------------------- |
| bufferNum                    | `int`                               | Buffer number of the free/freed buffer block assigned to the input block. |
| [`E_OUTOFBOUND`](/constants) | blockNum is outside the valid range |

#### Algorithm

```cpp
int StaticBuffer::getFreeBuffer(int blockNum){
    // Check if blockNum is valid (non zero and less than number of disk blocks)
    // and return E_OUTOFBOUND if not valid.

    // increase the timeStamp in metaInfo of all occupied buffers.

    // let bufferNum be used to store the buffer number of the free/freed buffer.

    // if a free buffer is available, bufferNum is the index of that free buffer.

    // if a free buffer is not available, write back the buffer with the largest timeStamp (if it's dirty) using Disk::writeBlock() and set it as bufferNum.

    // update the metaInfo entry corresponding to bufferNum with free:false, dirty:false, blockNum:the input block number and timeStamp:0.

    // return the bufferNum.
}
```

---

## class BlockBuffer

The `class BlockBuffer` is a generic class for representing a disk block of any type (`Record`, `Internal Index`, or `Leaf Index`). Its only field is `blockNum`. The field `blockNum` stores the disk block number corresponding to the block object. The block has to be loaded and stored in one of the `32` buffers of the `StaticBuffer class` before its data can be accessed. Adding to the complexity is the fact that the block, once loaded, may not even be present in the buffer memory later on because of the **buffer replacement algorithm** implemented by Buffer Layer. In order to work with data of the block, any method of the `BlockBuffer class` or its descendent classes need to know the address of the buffer memory to which the block has been loaded. Hence any method of this class operating on the block data should first get the pointer to the buffer memory that holds the contents of the block. The `getBufferPtr()` method is used for this purpose. The public methods of `BlockBuffer` deal with information like **header** and **block type**, which are generic to all blocks. `RecBuffer` and `IndBuffer` classes extend the `class BlockBuffer`, thereby, inheriting all the fields and methods of `BlockBuffer`.

:::info Note

- If the class definition of a class (say A) declares another class (say B) as a **friend class**, then an instance of class B can access the private fields and methods of class A. **This friendship is, however, not inherited by the child classes of B.**
- As per the NITCbase design, the definition of the `class StaticBuffer` contains the declaration: `friend class BlockBuffer`. Hence, the methods in `BlockBuffer` can access the private fields and methods of the `class StaticBuffer`.
- On the other hand, `RecBuffer` and `IndBuffer` classes can access them only through the public functions of `StaticBuffer class` and through the public and protected functions of `BlockBuffer class`.
  :::

```cpp
class BlockBuffer{
public:
    //methods
    BlockBuffer(char blockType);
    BlockBuffer(int blockNum);
    int getBlockNum();
    int getBlockType();
    int setBlockType(int blockType);
    int getHeader(struct HeadInfo* head);
    int setHeader(struct HeadInfo* head);
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

The following are the specifications for the methods in class BlockBuffer.

### BlockBuffer :: BlockBuffer() (Constructor1)

#### Description

- One of the`Constructors` of the `class BlockBuffer`
- Called if a new block of the input type is to be allocated in the disk.

:::note
If the block already exists on the disk use [constructor 2](#blockbuffer--blockbuffer-constructor-2).
:::

#### Arguments

| Name      | Type   | Description                                                                                                                                                     |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockType | `char` | Type of the new block to be allotted. It can be one of the following: `'R'`,`'I'` or `'L'` where, <br/> `R`-`REC` <br/> `I`-`IND_INTERNAL` <br/> `L`-`IND_LEAF` |

#### Return Values

Nil
:::warning Important
If the block could not be allocatted in the disk, then the `blockNum` field of this class will contain the appropriate error code. The callers of this constructor and the following constructors: [RecBuffer :: RecBuffer() (Constructor 1)](#recbuffer--recbuffer-constructor-1), [IndBuffer :: IndBuffer() (Constructor 1)](#indbuffer--indbuffer-constructor-1), [IndInternal :: IndInternal() (Constructor1)](#indinternal--indinternal-constructor1) and [IndLeaf :: IndLeaf() (Constructor 1)](#indleaf--indleaf-constructor-1) should check the value of `blockNum` field to verify if the disk block was allocatted succesfully.
:::

#### Algorithm

```cpp
BlockBuffer::BlockBuffer(char blockType){
    // allocate a block on the disk and a buffer in memory to hold the new block of given type using getFreeBlock function and get the return error codes if any.

    // set the blockNum field of the object to that of the allocated block number if the method returned a valid block number,
    // otherwise set the error code returned as the block number.
        // The caller must check if the constructor allocatted block successfully by checking the value of block number field.

}
```

### BlockBuffer :: BlockBuffer() (Constructor2)

#### Description

- One of the`Constructors` of the `class BlockBuffer`
- Called when the block already exists on the disk.

:::note
If a new block is to be allocated in the disk use [constructor 1](#blockbuffer--blockbuffer-constructor-1).
:::

#### Arguments

| Name     | Type  | Description                                              |
| -------- | ----- | -------------------------------------------------------- |
| blockNum | `int` | Block number of the block whose object is to be created. |

#### Return Values

Nil

#### Algorithm

```cpp
BlockBuffer::BlockBuffer(int blockNum){

    // set the blockNum field of the object to input argument.
}
```

### BlockBuffer :: getBlockNum()

#### Description

Returns the block number of the block.

#### Arguments

Nil

#### Return Values

| Value    | Description                |
| -------- | -------------------------- |
| blockNum | Block number of the block. |

#### Algorithm

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

| Value     | Description                                        |
| --------- | -------------------------------------------------- |
| blockType | Type of the block(`REC`/`IND_INTERNAL`/`IND_LEAF`) |

#### Algorithm

```cpp
int BlockBuffer::getBlockType(){

    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if the call to loadBlockAndGetBufferPtr(&bufferPtr) return SUCCESS

        // return the first 4 bytes of the buffer that stores the block type. (Hint: cast using int32_t)

    // else load failed due to E_OUTOFBOUND, invalid block number, return the value returned by the call.

}
```

### BlockBuffer :: setBlockType()

#### Description

Sets the type of the block with the input block type. This method sets the type in both the header of the block and also in the block allocation map.

#### Arguments

| Name      | Type  | Description                                        |
| --------- | ----- | -------------------------------------------------- |
| blockType | `int` | Type of the block(`REC`/`IND_INTERNAL`/`IND_LEAF`) |

#### Return Values

Nil

#### Algorithm

```cpp
int BlockBuffer::setBlockType(int blockType){

    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // store the input block type in the first 4 bytes of the buffer.

    // update the StaticBuffer::blockAllocMap entry corresponding to the object's block number.

    // update dirty bit by calling appropriate method of StaticBuffer class.
    // if setDirtyBit() failed
        // return the returned value from the call

    // return SUCCESS
}
```

### BlockBuffer :: getHeader()

#### Description

Gives the header of the block.

:::caution note

- Any type of block(`Record`, `Internal Index`, or `Leaf Index`) of NITCbase has the same header structure. Therefore, `getHeader()` method is kept in abstract `BlockBuffer class`.
- Higher layer must allocate memory for the `struct HeadInfo` variable before calling this function.
  :::

#### Arguments

| Name | Type              | Description                                                            |
| ---- | ----------------- | ---------------------------------------------------------------------- |
| head | struct HeadInfo\* | Pointer to the HeadInfo structure to which the block header is copied. |

#### Return Values

Nil

#### Algorithm

```cpp
int BlockBuffer::getHeader(struct HeadInfo *head){

    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // Use type casting here to cast the returned pointer type to the appropriate struct pointer to get the headInfo

    // copy the header of block to the memory location pointed to by the argument head.
        // not copying reserved

    // return SUCCESS
}
```

### BlockBuffer :: setHeader()

#### Description

Sets the header of the block.

:::caution note

- Any type of block(`Record`, `Internal Index`, or `Leaf Index`) of NITCbase has the same header structure. Therefore, `setHeader()` method is kept in abstract `BlockBuffer class`.
- Higher layer must allocate memory for the `struct HeadInfo` variable before calling this function.
  :::

#### Arguments

| Name | Type              | Description                                                            |
| ---- | ----------------- | ---------------------------------------------------------------------- |
| head | struct HeadInfo\* | Pointer to the HeadInfo structure to which the block header is copied. |

#### Return Values

Nil

#### Algorithm

```cpp
int BlockBuffer::setHeader(struct HeadInfo *head){

    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // Use type casting here to cast the returned pointer type to the appropriate struct pointer to get the headInfo

    //copy the contents of the memory location pointed to by head to the header of block using appropriate.
        // not copying reserved

    //update dirty bit by calling appropriate method of StaticBuffer class.
    // if setDirtyBit() failed, return the error code

    // return SUCCESS;
}
```

### BlockBuffer :: releaseBlock()

#### Description

Deletes the block from both the buffer memory and the disk. The `blockNum` field of the object is invalidated (set to `INVALID_BLOCK` (-1)).

#### Arguments

Nil

#### Return Values

Nil

:::caution note
If `releaseBlock()` method is called again after having successfully released for the first time (or if the `blockNum` field is invalid), then this method will not perform any operation.
:::

#### Algorithm

```cpp
void BlockBuffer::releaseBlock(){

    / if blockNum is INVALID_BLOCK (-1), or it is invalidated already, do nothing

    // else
        // get the buffer number of the buffer assigned to the block using StaticBuffer::getBufferNum().

        // if the buffer number is valid (!=E_BLOCKNOTINBUFFER), free the buffer by setting the free flag of its metaInfo entry to true.

        // free the block in disk by setting the data type of the entry corresponding to the block number in StaticBuffer::blockAllocMap to UNUSED_BLK.

        // set the object's blockNum to INVALID_BLOCK (-1)
    }

}
```

### BlockBuffer :: loadBlockAndGetBufferPtr()

#### Description

Returns a pointer to the first byte of the buffer storing the block.

#### Arguments

Nil

#### Return Values

| Value     | Description                                 |
| --------- | ------------------------------------------- |
| bufferPtr | Pointer to the buffer containing the block. |

:::info Note

- All get and set methods accessing the block's data should call the `getBufferPtr()` method to get the starting address of the buffer block holding the block's data.
- **This also ensures that the block is reloaded back to buffer memory if it had been replaced by the buffer replacement algorithm since the last data access.**
- This function will NOT check if the block already exists in disk or not, rather will copy whatever content is there in that disk block to the buffer.
- Only call this if the Block exists in disk already, otherwise call constructor 1 to allocate space for a new block.
  :::

#### Algorithm

```cpp
/* NOTE: This function will NOT check if the block already exists in disk or not,
   rather will copy whatever content is there in that disk block to the buffer.
   Only call this if the Block exists in disk already, otherwise call constructor 1 to allocate space for a new block.
   Also ensure that all getter and setter methods accessing the block's data should call the loadBlockAndGetBufferPtr().
 */
int BlockBuffer::loadBlockAndGetBufferPtr(unsigned char ** buffPtr) {
    // check whether the block is already present in the buffer using StaticBuffer.getBufferNum()
    int bufferNum = StaticBuffer::getBufferNum(this->blockNum);

       // if present (!=E_BLOCKNOTINBUFFER), set the timestamp of the corresponding buffer to 0 and increment the timpestamps of all other occupied buffers in the BufferMetaInfo.

    // else
        // if not present, get a free buffer using StaticBuffer.getFreeBuffer()

        // if the call returns E_OUTOFBOUND, return E_OUTOFBOUND here as the blockNum is invalid

        // Read the block into the free buffer using readBlock()

        // If the read failed, the block number is invalid return E_OUTOFBOUND;

    // store the pointer to this buffer (blocks[bufferNum]) in *buffPtr

    // return SUCCESS;
}
```

### BlockBuffer :: getFreeBlock()

#### Description

Returns the block number of a free block of the input type in the disk and allots a buffer to that block. If free block is not available FAILURE is returned.

#### Arguments

| Name      | Type  | Description                                                 |
| --------- | ----- | ----------------------------------------------------------- |
| blockType | `int` | Type of the required block(`REC`/`IND_INTERNAL`/`IND_LEAF`) |

#### Return Values

| Value                      | Description                             |
| -------------------------- | --------------------------------------- |
| blockNum                   | Block number of the free block.         |
| [`E_DISKFULL`](/constants) | No free block is available in the disk. |

#### Algorithm

```cpp
int BlockBuffer::getFreeBlock(int blockType){

    //iterate through the StaticBuffer::blockAllocMap and find the block number of a free block in the disk.

    //if no block is free, return E_DISKFULL.

    //set the object's blockNum to the block number of the free block.

    //find a free buffer using StaticBuffer::getFreeBuffer() .

    //initialize the header of the block with pblock: -1, lblock: -1, rblock: -1, numEntries: 0, numAttrs: 0 and numSlots: 0 using setHeader().

    //update the block type of the block to the input block type using setBlockType().

    //return block number of the free block.

}
```

## class RecBuffer

An object of the `RecBuffer class` is associated with a **record block**. In a Record block, a slot can store one record, and each record is a fixed sized set of Attributes. Ordering of data as records and making use of slotmap are done only in a record block. **Public methods** of this class deal with **access/modification of the records and the slotmap**. `RecBuffer class` extends the `BlockBuffer class`. Thus, all its **protected** fields and methods can be accessed by `RecBuffer class`.

```cpp
class RecBuffer : public BlockBuffer{

public:

    //methods
    RecBuffer();
    RecBuffer(int blockNum);
    int getSlotMap(unsigned char *slotMap);
    int setSlotMap(unsigned char *slotMap);
    int getRecord(union Attribute *rec,int slotNum);
    int setRecord(union Attribute *rec,int slotNum);

};
```

The following are the specifications for the methods in `class RecBuffer`.

### RecBuffer :: RecBuffer() (Constructor 1)

#### Description

Called if a new record block is to be allocated in the disk.

#### Arguments

Nil

#### Return Values

Nil

:::note
If the record block already exists on the disk use [constructor 2](#recbuffer--recbuffer-constructor-2).
:::

#### Algorithm

```cpp
RecBuffer::RecBuffer() : BlockBuffer('R'){}
//this is the way to call parent non-default constructor.
// 'R' is used to denote RecBuffer.
```

### RecBuffer :: RecBuffer() (Constructor 2)

#### Description

Called when the record block already exists on the disk.

#### Arguments

| Name     | Type  | Description                      |
| -------- | ----- | -------------------------------- |
| blockNum | `int` | Block number of the record block |

#### Return Values

Nil

:::note
If a new record block is to be allocated in the disk use [constructor 1](#recbuffer--recbuffer-constructor-1).
:::

#### Algorithm

```cpp
RecBuffer::RecBuffer(int blockNum) : BlockBuffer(blockNum){}
//this is the way to call parent non-default constructor.
```

### RecBuffer :: getSlotMap()

#### Description

Gives the slotmap of the block.

#### Arguments

| Name    | Type              | Description                                                            |
| ------- | ----------------- | ---------------------------------------------------------------------- |
| slotMap | `unsigned char *` | Pointer to the array of unsigned char to which the slot map is copied. |

#### Return Values

Nil

:::caution note

- The array of `unsigned char` to which the pointer in the argument points to should have a size equal to the size of the block's slotmap.
- The higher layers must allocate memory for the `unsigned char` array before calling the function.
  :::

#### Algorithm

```cpp
int RecBuffer::getSlotMap(unsigned char *slotMap) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // Use type casting here to cast the returned pointer type to the appropriate struct pointer

    // get the number of slots in the block.

    // using offset range copy the slotmap of the block to the memory pointed by the argument.

    // return SUCCESS
}
```

### RecBuffer :: setSlotMap()

#### Description

Sets the slotmap of the block.

#### Arguments

| Name    | Type              | Description                                                           |
| ------- | ----------------- | --------------------------------------------------------------------- |
| slotMap | `unsigned char *` | Pointer to the array of unsigned char from which the slot map is set. |

#### Return Values

Nil

:::caution note

- The array of `unsigned char` to which the pointer in the argument points to should have a size equal to the size of the block's slotmap.
- The higher layers must allocate memory for the `unsigned char` array before calling the function.
  :::

```cpp
int RecBuffer::setSlotMap(unsigned char *slotMap) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // Use type casting here to cast the returned pointer type to the appropriate struct pointer to access headInfo

    // get the number of slots in the block.

    // using offset range copy the slotmap from the memory pointed by the argument to that of the block.

    // update dirty bit.
    // if setDirtyBit failed, return the value returned by the call

    // return SUCCESS
}
```

#### Algorithm

### RecBuffer :: getRecord()

#### Description

Gives the slotNumth record entry of the block.

#### Arguments

| Name    | Type                | Description                                                                           |
| ------- | ------------------- | ------------------------------------------------------------------------------------- |
| rec     | `union Attribute *` | Pointer to the array of union Attribute elements to which the record entry is copied. |
| slotNum | `int`               | Slot number of the record in the block.                                               |

#### Return Values

| Value                        | Description                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Succesful copy of the record.                                       |
| [`E_OUTOFBOUND`](/constants) | Input slotNum is outside the set of valid slot values of the block. |
| [`E_FREESLOT`](/constants)   | Slot corresponding to the input slotNum is free.                    |

:::caution note

- The array of `union Attribute` elements should have a size equal to the number of attributes in the relation.
- The higher layers must allocate memory for the the array of `union Attribute` elements before calling the function.
  :::

```cpp
int RecBuffer::getRecord(union Attribute *rec, int slotNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // Use type casting here to cast the returned pointer type to the appropriate struct pointer to access headInfo

    // get number of attributes in the block.

    // get the number of slots in the block.

    // if input slotNum is not in the permitted range return E_OUTOFBOUND

    // if slot corresponding to input slotNum is free return E_FREESLOT

    // using offset range copy slotNumth record to the memory pointed by rec.

    // return SUCCESS

}
```

### RecBuffer :: setRecord()

#### Description

Sets the slotNumth record entry of the block with the input record contents.

#### Arguments

| Name    | Type                | Description                                                                          |
| ------- | ------------------- | ------------------------------------------------------------------------------------ |
| rec     | `union Attribute *` | Pointer to the array of union Attribute elements from which the record entry is set. |
| slotNum | `int`               | Slot number of the record in the block.                                              |

#### Return Values

| Value                        | Description                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Succesful copy of the record.                                       |
| [`E_OUTOFBOUND`](/constants) | Input slotNum is outside the set of valid slot values of the block. |

:::caution note

- The array of `union Attribute` elements should have a size equal to the number of attributes in the relation.
- The higher layers must allocate memory for the the array of `union Attribute` elements before calling the function.
  :::

#### Algorithm

```cpp
int RecBuffer::setRecord(union Attribute *rec, int slotNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // Use type casting here to cast the returned pointer type to the appropriate struct pointer to access headInfo

    // get number of attributes in the block.

    // get the number of slots in the block.

    // if input slotNum is not in the permitted range return E_OUTOFBOUND.

    // using offset range copy contents of the memory pointed by rec to slotNumth record.

    // update dirty bit.
    // if setDirtyBit failed, return the value returned by the call

    // return SUCCESS
}
```

## class IndBuffer

_IndBuffer_ class is a generic class for representing an _Index_ block. [B+ Trees](https://en.wikipedia.org/wiki/B%2B_tree) are constructed using _Index_ blocks which can be either [Index Internal blocks](../Design/Physical%20Layer#internal-index-block-structure) or [Index Leaf blocks](../Design/Physical%20Layer#leaf-index-block-structure). B+ Tree helps in faster data access as compared to sequentially accessing the data through [Record](../Design/Physical%20Layer#record-block-structure) blocks.

_IndBuffer_ class extends the [BlockBuffer](#class-blockbuffer) class. Thus, all its protected fields and methods can be accessed by _IndBuffer_ class. In addition to these, _IndBuffer_ class has two [pure virtual methods](https://en.wikipedia.org/wiki/Virtual_function#Abstract_classes_and_pure_virtual_functions)- `getEntry()` and `setEntry()`. These methods take an argument of type `void *` so that arguments of both [`struct InternalEntry`](#internalentry) and [`struct Index`](#index) type can be passed to it. This is based on the fact that a [void pointer](https://en.wikipedia.org/wiki/Void_type) can hold address of any type and can be typcasted to any type.

The children classes, [IndInternal](#class-indinternal) and [IndLeaf](#class-indleaf), extend the class IndBuffer and override the virtual functions. The constructors of _IndBuffer_ class simply calls the constructor of the parent class with the received argument.

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

| Name | Type   | Description                                                                                      |
| ---- | ------ | ------------------------------------------------------------------------------------------------ |
| I    | `char` | New block of [`IND_INTERNAL`](<https://nitcbase.github.io(/constants).html>) type to be alloted. |
| L    | `char` | New block of [`IND_LEAF `](<https://nitcbase.github.io(/constants).html>) type to be alloted.    |

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

| Name     | Type  | Description                      |
| -------- | ----- | -------------------------------- |
| blockNum | `int` | Block number of the index block. |

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

## class IndInternal

An object of the `class IndInternal` is associated with an **Internal Index block**. An Internal Index block stores entries of type `struct InternalEntry` and is used as the **internal nodes of a B+ Tree**. Public methods of this class deal with the access/modification of the InternalEntry entries. `IndInternal class` extends `IndBuffer class` and overrides its virtual methods. The constructor of the IndInternal class calls the constructor of the parent class by passing suitable argument.

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

The following are the specifications for the methods in `class IndInternal`.

### IndInternal :: IndInternal() (Constructor1)

#### Description

Called if a new internal index block is to be allocated in the disk.

#### Arguments

Nil

#### Return Values

Nil

:::note
If the internal index block already exists on the disk use [constructor 2](#indinternal--indinternal-constructor2).
:::

```cpp
IndInternal::IndInternal() : IndBuffer('I'){}
//this is the way to call parent non-default constructor.
// 'I' used to denote IndInternal.
```

### IndInternal :: IndInternal() (Constructor2)

#### Description

Called when the internal index block already exists on the disk.

#### Arguments

| Name     | Type  | Description                               |
| -------- | ----- | ----------------------------------------- |
| blockNum | `int` | Block number of the internal index block. |

#### Return Values

Nil

:::note
If a new internal index block is to be allocated in the disk use [constructor 1](#indinternal--indinternal-constructor1).
:::

```cpp
IndInternal::IndInternal(int blockNum) : IndBuffer(blockNum){}
//this is the way to call parent non-default constructor.
```

### IndInternal :: getEntry()

#### Description

Gives the indexNumth entry of the block.

#### Arguments

| Name     | Type     | Description                                                                                             |
| -------- | -------- | ------------------------------------------------------------------------------------------------------- |
| ptr      | `void *` | Pointer to the struct InternalEntry to which the specified internal index entry of the block is copied. |
| indexNum | `int`    | Index number of the entry in the block.                                                                 |

#### Return Values

| Value                        | Description                                                              |
| ---------------------------- | ------------------------------------------------------------------------ |
| [`SUCCESS`](/constants)      | Successful copy of the internal index entry.                             |
| [`E_OUTOFBOUND`](/constants) | Input indexNum is outside the valid range of index numbers of the block. |

:::caution note

- The `void` pointer is a generic pointer that can be pointed at objects of any data type. However, because the `void` pointer does not know what type of object it is pointing to, it must first be explicitly cast to another pointer type before it is dereferenced.
- The higher layers calling the `getEntry()` function of the `IndInternal class` must ensure that the argument of type `struct InternalEntry *` is passed.
- The higher layers must allocate memory for the `struct InternalEntry` before calling this function.
  :::

#### Algorithm

```cpp
int IndInternal::getEntry(void *ptr, int indexNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // if the indexNum is not in the valid range of 0-(MAX_KEYS_INTERNAL-1), return E_OUTOFBOUND.

    // copy the indexNum'th Internalentry in block to memory ptr(ptr can be type casted appropriately if needed).

    // return SUCCESS.
}
```

### IndInternal :: setEntry()

#### Description

Sets the indexNumth entry of the block with the input struct InternalEntry contents.

#### Arguments

| Name     | Type     | Description                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------ |
| ptr      | `void *` | Pointer to the struct InternalEntry from which the specified internal index entry of the block is set. |
| indexNum | `int`    | Index number of the entry in the block.                                                                |

#### Return Values

| Value                        | Description                                                              |
| ---------------------------- | ------------------------------------------------------------------------ |
| [`SUCCESS`](/constants)      | Successful copy of the internal index entry.                             |
| [`E_OUTOFBOUND`](/constants) | Input indexNum is outside the valid range of index numbers of the block. |

:::caution note

- The `void` pointer is a generic pointer that can be pointed at objects of any data type. However, because the `void` pointer does not know what type of object it is pointing to, it must first be explicitly cast to another pointer type before it is dereferenced.
- The higher layers calling the `setEntry()` method of the `IndInternal class` must ensure that the argument of type `struct InternalEntry *` is passed.
- The higher layers must allocate memory for the `struct InternalEntry` before calling this function.
  :::

#### Algorithm

```cpp
int IndInternal::setEntry(void *ptr, int indexNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // if the indexNum is not in the valid range of 0-(MAX_KEYS_INTERNAL-1), return E_OUTOFBOUND.

    // copy the struct InternalEntry pointed by ptr to indexNum'th entry in block.

    // update dirty bit.
    // if setDirtyBit failed, return the value returned by the call

    // return SUCCESS
}
```

## class IndLeaf

An object of the _IndLeaf_ class will be associated with a [Index Leaf blocks](../Design/Physical%20Layer#leaf-index-block-structure). A Leaf Index block stores entries of type `struct Index` and is used as the leaf nodes of a B+ Tree. Public methods of this class deal with the access/modification of the _Index_ entries. \*_IndLeaf_ class extends [IndBuffer class](#class-indbuffer) and overrides its virtual methods. The constructor of the IndLeaf class calls the constructor of the parent class by passing suitable argument.

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

| Name     | Type  | Description                           |
| -------- | ----- | ------------------------------------- |
| blockNum | `int` | Block number of the leaf index block. |

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

| Name     | Type     | Description                                                                                           |
| -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| ptr      | `void *` | Pointer to the [struct Index](#index) to which the specified leaf index entry of the block is copied. |
| indexNum | `int`    | Index number of the entry in the block.                                                               |

#### Return Values

| Value                        | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Successful getting of the leaf index entry.                                |
| [`E_OUTOFBOUND`](/constants) | Input `indexNum` is outside the valid range of index numbers of the block. |

:::caution note

- The [void pointer](https://en.wikipedia.org/wiki/Void_type) is a generic pointer that can be pointed at objects of any data type. However, because the void pointer does not know what type of object it is pointing to, the void pointer must first be explicitly cast to another pointer type before it is dereferenced.
- The higher layers calling the `getEntry()` function of the _IndLeaf_ class must ensure that the argument of type `struct Index *` is passed.
- The higher layers must allocate memory for the `struct Index` before calling this function.
  :::

#### Algorithm

```cpp
int IndLeaf::getEntry(void *ptr, int indexNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // if the indexNum is not in the valid range of 0-(MAX_KEYS_LEAF-1), return E_OUTOFBOUND.

    // copy the indexNum'th Index entry in block to memory ptr(ptr can be type casted appropriately if needed).

    // return SUCCESS.
}
```

### IndLeaf :: setEntry()

#### Description

Sets the indexNum<sup>th</sup> entry of the block with the input struct Index contents.

#### Arguments

| Name     | Type     | Description                                                                                           |
| -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| ptr      | `void *` | Pointer to the [struct Index](#index) to which the specified leaf index entry of the block is copied. |
| indexNum | `int`    | Index number of the entry in the block.                                                               |

#### Return Values

| Value                        | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Successful setting of the leaf index entry.                                |
| [`E_OUTOFBOUND`](/constants) | Input `indexNum` is outside the valid range of index numbers of the block. |

:::caution note

- The [void pointer](https://en.wikipedia.org/wiki/Void_type) is a generic pointer that can be pointed at objects of any data type. However, because the void pointer does not know what type of object it is pointing to, the void pointer must first be explicitly cast to another pointer type before it is dereferenced.
- The higher layers calling the `setEntry()` function of the IndLeaf class must ensure that the argument of type `struct Index *` is passed.
- The higher layers must allocate memory for the struct Index before calling this function.
  :::

#### Algorithm

```cpp
int IndLeaf::setEntry(void *ptr, int indexNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
            // return the value returned by the call.

    // if the indexNum is not in the valid range of 0-(MAX_KEYS_LEAF-1), return E_OUTOFBOUND.

    // copy the struct Index pointed by ptr to indexNum'th entry in block.

    // update dirty bit.
    // if setDirtyBit failed, return the value returned by the call

    //return SUCCESS
}
```

## Miscellaneous

Given below are the definitions of RecId and IndexId structures. Variables of these structures will be of use in several layers of NITCbase, such as [Cache layer](Cache%20Layer.md), [Block access layer](Block%20Access%20Layer.md) and [B+ tree](B+%20Tree%20Layer.md) layer, to name a few.

:::note
The code for RecId class and IndexId class can be found in the `id.h` file defined inside `define/` directory, **<Link to="/idHeader">the code for which can be can be found here. </Link >**
:::

### RecId

Relations in NITCbase are made up of records. Every record of any relation can be referenced using an id called `RecId`. `RecId` is a combination of the block number of the corresponding record block and the slot number of the slot occupied by the record in the block. It is used to locate where the record is stored in the disk.

```cpp
struct RecId {
    int block;
    int slot;
};
```

### IndexId

The Leaf Index blocks of a B+ Tree are made of [Index](#index) entries. Every _Index_ entry of any _Leaf Index_ block can be referenced using an id called `IndexId`. It is a combination of block number of the corresponding leaf index block and index number, which is the offset of the index in that block. It is used to locate where the index is stored in the disk.

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

| Name     | Type                            | Description                                    |
| -------- | ------------------------------- | ---------------------------------------------- |
| attr1    | [`union Attribute`](#attribute) | First attribute value to be compared.          |
| attr2    | [`union Attribute`](#attribute) | Second attribute value to be compared.         |
| attrType | `int`                           | Type of the attribute [`NUM/STR`](/constants). |

#### Return Values

| Value            | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| Negative integer | Value in `attr1` is **less** than the value in `attr2`.    |
| Zero             | Value in `attr1` is **equal** to the value in `attr2`.     |
| Positive integer | Value in `attr1` is **greater** than the value in `attr2`. |

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

- Both the attributes given as input must be of the same type as the input type.
- For string type, the comparision is performed with respect to _lexicographic order_.
  :::
