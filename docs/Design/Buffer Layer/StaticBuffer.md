---
title: "class StaticBuffer"
sidebar_position: 1
---

The `class StaticBuffer` contains as its member field, `blocks[BUFFER_CAPACITY][BLOCK_SIZE]`, a two-dimensional array of unsigned characters with size sufficient to store `32` disk blocks in memory at any given time. Logically `blocks[i]` can be used to buffer one disk block for each `0 ≤ i ≤ 31`. Each entry of blocks, i.e., `blocks[i]`, is referred to as buffer block in the NITCbase documentation. Buffer blocks will be committed back to the `disk` as and when required. In addition to storing the data of a block, `class StaticBuffer` also maintains meta-information for each loaded block in an array of `BufferMetaInfo` structures through the `metaInfo[BUFFER_CAPACITY]` field. `StaticBuffer class` also maintains a copy of the **Block Allocation Map** in its `blockAllocMap[DISK_BLOCKS]` field. The ith entry of the Block Allocation Map specifies whether the ith block is occupied or free. If occupied, it stores the type (`REC`/`IND_INTERNAL`/`IND_LEAF`) of the block, else it stores `UNUSED_BLK`.

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

    /* iterate through all the metaInfo entries,
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

| Value                        | Description                                                            |
| ---------------------------- | ---------------------------------------------------------------------- |
| blockType                    | Block type of the block (`REC`/`IND_INTERNAL`/`IND_LEAF`/`UNUSED_BLK`) |
| [`E_OUTOFBOUND`](/constants) | blockNum is outside the valid range                                    |

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
| [`SUCCESS`](/constants)            | successfully set dirty bit                   |
| [`E_OUTOFBOUND`](/constants)       | blockNum is outside the valid range          |
| [`E_BLOCKNOTINBUFFER`](/constants) | block with blockNum is not present in Buffer |

#### Algorithm

```cpp
int StaticBuffer::setDirtyBit(int blockNum){
    // find the buffer index corresponding to the block using getBufferNum().

    // if block is not present in the buffer (bufferNum = E_BLOCKNOTINBUFFER)
    //     return E_BLOCKNOTINBUFFER

    // if blockNum is out of bound (bufferNum = E_OUTOFBOUND)
    //     return E_OUTOFBOUND

    // else
    //     (the bufferNum is valid)
    //     set the dirty bit of that buffer to true in metainfo

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

| Value                              | Description                                       |
| ---------------------------------- | ------------------------------------------------- |
| bufferNum                          | Buffer number to which the given block is loaded. |
| [`E_OUTOFBOUND`](/constants)       | blockNum is outside the valid range               |
| [`E_BLOCKNOTINBUFFER`](/constants) | block with blockNum is not present in Buffer      |

#### Algorithm

```cpp
int StaticBuffer::getBufferNum(int blockNum){
    // Check if blockNum is valid (non zero and less than number of disk blocks)
    // and return E_OUTOFBOUND if not valid.

    // traverse through the metaInfo array and
    //	find the buffer number of the buffer to which the block is loaded.

    // if found return buffer number

    // if block not found in buffer return E_BLOCKNOTINBUFFER

}
```

### StaticBuffer :: getFreeBuffer()

#### Description

Assigns a buffer to the block and returns the buffer number. If no free buffer block is found, the least recently used (`LRU`) buffer block is replaced.

:::info note

- This function never fails - a buffer is always assigned to the block.
- The `timeStamp` is reset to `0` each time the buffer block is accessed and incremented when other buffer blocks are accessed. Thus the buffer block with the largest `timeStamp` is the one that is least recently used.
- The function allots a free buffer block, fills its `metaInfo` with relevant information, and updates the `timeStamp`.
- This function will only allocate a buffer and will not load the disk block into the buffer. That task is expected to be handled by the caller.
- This function does not check whether the argument blockNum is already present in the buffer. The caller is expected to validate that before this function is called.

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
    // Check if blockNum is valid (non zero and less than DISK_BLOCKS)
    // and return E_OUTOFBOUND if not valid.

    // increase the timeStamp in metaInfo of all occupied buffers.

    // let bufferNum be used to store the buffer number of the free/freed buffer.
    int bufferNum;

    // iterate through metainfo and check if there is any buffer free

    // if a free buffer is available, set bufferNum = index of that free buffer.

    // if a free buffer is not available,
    //     find the buffer with the largest timestamp
    //     IF IT IS DIRTY, write back to the disk using Disk::writeBlock()
    //     set bufferNum = index of this buffer

    // update the metaInfo entry corresponding to bufferNum with
    // free:false, dirty:false, blockNum:the input block number, timeStamp:0.

    // return the bufferNum.
}
```

---
