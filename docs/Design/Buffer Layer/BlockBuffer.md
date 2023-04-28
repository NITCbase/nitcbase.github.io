---
title: "class BlockBuffer"
sidebar_position: 2
---

The `class BlockBuffer` is a generic class for representing a disk block of any type (`Record`, `Internal Index`, or `Leaf Index`). Its only field is `blockNum`. The field `blockNum` stores the disk block number corresponding to the block object. The block has to be loaded and stored in one of the `32` buffers of the `StaticBuffer class` before its data can be accessed. Adding to the complexity is the fact that the block, once loaded, may not even be present in the buffer memory later on because of the **buffer replacement algorithm** implemented by Buffer Layer. In order to work with data of the block, any method of the `BlockBuffer class` or its descendent classes need to know the address of the buffer memory to which the block has been loaded. Hence any method of this class operating on the block data should first get the pointer to the buffer memory that holds the contents of the block. The `loadBlockAndGetBufferPtr()` method is used for this purpose. The public methods of `BlockBuffer` deal with information like **header** and **block type**, which are generic to all blocks. `RecBuffer` and `IndBuffer` classes extend the `class BlockBuffer`, thereby, inheriting all the fields and methods of `BlockBuffer`.

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
    int getHeader(struct HeadInfo* head);
    int setHeader(struct HeadInfo* head);
    void releaseBlock();

protected:
    //field
    int blockNum;

    //methods
    unsigned char *getBufferPtr();
    int getBlock();
    int getFreeBlock(int blockType);
    int setBlockType(int blockType);
};
```

The following are the specifications for the methods in class BlockBuffer.

### BlockBuffer :: BlockBuffer() (Constructor1)

#### Description

- One of the`Constructors` of the `class BlockBuffer`
- Called if a new block of the input type is to be allocated in the disk.

:::note
If the block has already been initialised as a record or index block, use [constructor 2](#blockbuffer--blockbuffer-constructor-2).
:::

#### Arguments

| **Name**  | **Type** | **Description**                                                                                                                                                 |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockType | `char`   | Type of the new block to be allotted. It can be one of the following: `'R'`,`'I'` or `'L'` where, <br/> `R`-`REC` <br/> `I`-`IND_INTERNAL` <br/> `L`-`IND_LEAF` |

#### Return Values

Nil
:::warning Important
If the block could not be allocatted in the disk, then the `blockNum` field of this class will contain the appropriate error code. The callers of this constructor and the following constructors: [RecBuffer :: RecBuffer() (Constructor 1)](#recbuffer--recbuffer-constructor-1), [IndBuffer :: IndBuffer() (Constructor 1)](#indbuffer--indbuffer-constructor-1), [IndInternal :: IndInternal() (Constructor1)](#indinternal--indinternal-constructor1) and [IndLeaf :: IndLeaf() (Constructor 1)](#indleaf--indleaf-constructor-1) should check the value of `blockNum` field to verify if the disk block was allocatted succesfully.
:::

#### Algorithm

```cpp
BlockBuffer::BlockBuffer(char blockType){
    // allocate a block on the disk and a buffer in memory to hold the new block of
    // given type using getFreeBlock function and get the return error codes if any.

    // set the blockNum field of the object to that of the allocated block
    // number if the method returned a valid block number,
    // otherwise set the error code returned as the block number.

    // (The caller must check if the constructor allocatted block successfully
    // by checking the value of block number field.)
}
```

### BlockBuffer :: BlockBuffer() (Constructor2)

#### Description

- One of the`Constructors` of the `class BlockBuffer`
- Called when the block has already been initialised as a record or index block on the disk.

:::note
If a new block is to be allocated in the disk use [constructor 1](#blockbuffer--blockbuffer-constructor-1).
:::

#### Arguments

| **Name** | **Type** | **Description**                                          |
| -------- | -------- | -------------------------------------------------------- |
| blockNum | `int`    | Block number of the block whose object is to be created. |

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

Returns the block number of the block. Defined to access the private member field `blockNum` of the class.

#### Arguments

Nil

#### Return Values

| **Value** | **Description**            |
| --------- | -------------------------- |
| blockNum  | Block number of the block. |

#### Algorithm

```cpp
int BlockBuffer::getBlockNum(){

    //return corresponding block number.
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

| **Name** | **Type**          | **Description**                                                        |
| -------- | ----------------- | ---------------------------------------------------------------------- |
| head     | struct HeadInfo\* | Pointer to the HeadInfo structure to which the block header is copied. |

#### Return Values

Nil

#### Algorithm

```cpp
int BlockBuffer::getHeader(struct HeadInfo *head){

    unsigned char *bufferPtr;
    /* get the starting address of the buffer containing the block
       using loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // cast bufferPtr to type HeadInfo*
    struct HeadInfo *bufferHeader = (struct HeadInfo *)bufferPtr;

    // copy all the values except reserved in the header (from bufferHeader)
    // to the argument `head`
    // (hint: head->numEntries = bufferHeader->numEntries)

    // return SUCCESS
}
```

### BlockBuffer :: setHeader()

#### Description

Sets the header of the block.

:::caution note

- Any type of block(`Record`, `Internal Index`, or `Leaf Index`) of NITCbase has the same header structure. Therefore, `setHeader()` method is kept in abstract `BlockBuffer class`.
- Higher layer must allocate memory for the `struct HeadInfo` variable before calling this function.
- After the `blockType` is set at block allocation, the `setHeader()` function should not be used to change the `blockType`. The block will need to freed and reallocated to reuse it as a different block type.

:::

#### Arguments

| **Name** | **Type**          | **Description**                                                        |
| -------- | ----------------- | ---------------------------------------------------------------------- |
| head     | struct HeadInfo\* | Pointer to the HeadInfo structure to which the block header is copied. |

#### Return Values

Nil

#### Algorithm

```cpp
int BlockBuffer::setHeader(struct HeadInfo *head){

    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using
    // loadBlockAndGetBufferPtr(&bufferPtr).

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // cast bufferPtr to type HeadInfo*
    struct HeadInfo *bufferHeader = (struct HeadInfo *)bufferPtr;

    // copy the fields of the HeadInfo pointed to by head (except reserved) to
    // the header of the block (pointed to by bufferHeader)
    //(hint: bufferHeader->numSlots = head->numSlots )

    // update dirty bit by calling StaticBuffer::setDirtyBit()
    // if setDirtyBit() failed, return the error code

    // return SUCCESS;
}
```

### BlockBuffer :: releaseBlock()

#### Description

The block number to which this instance of `BlockBuffer` is associated (given by the `blockNum` member field) is freed from the buffer and the disk. The `blockNum` field of the object is invalidated (set to `INVALID_BLOCK` (-1)).

#### Arguments

Nil

#### Return Values

Nil

:::caution note

- The `BlockBuffer` class is a higher level abstraction to the disk blocks. It makes use of the `StaticBuffer` to access/modify the values in the disk block. When `releaseBlock()` is called, the corresponding disk block is freed from the buffer(if present) and set as an unused block in the disk. However, the `BlockBuffer` object itself remains as is with its `blockNum` set to `INVALID_BLOCK`. This object is only deallocated at the end of it's lifetime.
- If `releaseBlock()` method is called again after having successfully released for the first time (or if the `blockNum` field is invalid), then this method will not perform any operation.

:::

#### Algorithm

```cpp
void BlockBuffer::releaseBlock(){

    // if blockNum is INVALID_BLOCK (-1), or it is invalidated already, do nothing

    // else
        /* get the buffer number of the buffer assigned to the block
           using StaticBuffer::getBufferNum().
           (this function return E_BLOCKNOTINBUFFER if the block is not
           currently loaded in the buffer)
            */

        // if the block is present in the buffer, free the buffer
        // by setting the free flag of its StaticBuffer::tableMetaInfo entry
        // to true.

        // free the block in disk by setting the data type of the entry
        // corresponding to the block number in StaticBuffer::blockAllocMap
        // to UNUSED_BLK.

        // set the object's blockNum to INVALID_BLOCK (-1)
}
```

> When a block is released, only the block allocation map is updated to store `UNUSED_BLK`. However, the header of the block still has its block type set to its previous value. This does not cause any inconsistencies because the allocation of a block is done only using the block allocation map. Once a block is allocated, it's header will be updated with the appropriate value. If the design of NITCbase were to change such that the block type in the header is used, then the above function can be modified to use the `getHeader()` and `setHeader()` functions to update the block type.

### BlockBuffer :: loadBlockAndGetBufferPtr()

#### Description

Returns a pointer to the first byte of the buffer storing the block. This function will load the block to the buffer if it is not already present.

#### Arguments

Nil

#### Return Values

| **Value**      | **Description**                                 |
| -------------- | ----------------------------------------------- |
| bufferPtr      | Pointer to the buffer containing the block.     |
| [E_OUTOFBOUND] | If `blockNum` is not a valid disk block number. |

:::info Note

- The block number that is to be loaded is already available as a member field in the `BlockBuffer` instance.
- All get and set methods accessing the block's data should call the `loadBlockAndGetBufferPtr()` method to get the starting address of the buffer block holding the block's data. **This ensures that the block is reloaded back to buffer memory if it had been replaced by the buffer replacement algorithm since the last data access.**
- This function will NOT check if the block has been initialised as a record or an index block. It will copy whatever content is there in that disk block to the buffer.

:::

#### Algorithm

```cpp
/* NOTE: This function will NOT check if the block has been initialised as a
   record or an index block. It will copy whatever content is there in that
   disk block to the buffer.
   Also ensure that all the methods accessing and updating the block's data
   should call the loadBlockAndGetBufferPtr() function before the access or
   update is done. This is because the block might not be present in the
   buffer due to LRU buffer replacement. So, it will need to be bought back
   to the buffer before any operations can be done.
 */
int BlockBuffer::loadBlockAndGetBufferPtr(unsigned char ** buffPtr) {
    /* check whether the block is already present in the buffer
       using StaticBuffer.getBufferNum() */
    int bufferNum = StaticBuffer::getBufferNum(this->blockNum);

    // if present (!=E_BLOCKNOTINBUFFER),
        // set the timestamp of the corresponding buffer to 0 and increment the
        // timestamps of all other occupied buffers in BufferMetaInfo.

    // else
        // get a free buffer using StaticBuffer.getFreeBuffer()

        // if the call returns E_OUTOFBOUND, return E_OUTOFBOUND here as
        // the blockNum is invalid

        // Read the block into the free buffer using readBlock()

    // store the pointer to this buffer (blocks[bufferNum]) in *buffPtr

    // return SUCCESS;
}
```

### BlockBuffer :: getFreeBlock()

#### Description

Returns the block number of a free block. It sets up the header of the block with the input block type and updates the block allocation map with the same. A buffer is also allocated to the block. If a free block is not available, [E_DISKFULL](/docs/constants) is returned.

#### Arguments

| **Name**  | **Type** | **Description**                                             |
| --------- | -------- | ----------------------------------------------------------- |
| blockType | `int`    | Type of the required block(`REC`/`IND_INTERNAL`/`IND_LEAF`) |

#### Return Values

| **Value**                       | **Description**                         |
| ------------------------------- | --------------------------------------- |
| blockNum                        | Block number of the free block.         |
| [`E_DISKFULL`](/docs/constants) | No free block is available in the disk. |

#### Algorithm

```cpp
int BlockBuffer::getFreeBlock(int blockType){

    // iterate through the StaticBuffer::blockAllocMap and find the block number
    // of a free block in the disk.

    // if no block is free, return E_DISKFULL.

    // set the object's blockNum to the block number of the free block.

    // find a free buffer using StaticBuffer::getFreeBuffer() .

    // initialize the header of the block passing a struct HeadInfo with values
    // pblock: -1, lblock: -1, rblock: -1, numEntries: 0, numAttrs: 0, numSlots: 0
    // to the setHeader() function.

    // update the block type of the block to the input block type using setBlockType().

    // return block number of the free block.
}
```

### BlockBuffer :: setBlockType()

#### Description

Sets the type of the block with the input block type. This method sets the type in both the header of the block and also in the block allocation map.

#### Arguments

| **Name**  | **Type** | **Description**                                    |
| --------- | -------- | -------------------------------------------------- |
| blockType | `int`    | Type of the block(`REC`/`IND_INTERNAL`/`IND_LEAF`) |

#### Return Values

Nil

#### Algorithm

```cpp
int BlockBuffer::setBlockType(int blockType){

    unsigned char *bufferPtr;
    /* get the starting address of the buffer containing the block
       using loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // store the input block type in the first 4 bytes of the buffer.
    // (hint: cast bufferPtr to int32_t* and then assign it)
    // *((int32_t *)bufferPtr) = blockType;

    // update the StaticBuffer::blockAllocMap entry corresponding to the
    // object's block number to `blockType`.

    // update dirty bit by calling StaticBuffer::setDirtyBit()
    // if setDirtyBit() failed
        // return the returned value from the call

    // return SUCCESS
}
```
