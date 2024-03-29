---
title: "classes IndBuffer, IndInternal, IndLeaf"
sidebar_position: 4
---

## class IndBuffer

_IndBuffer_ class is a generic class for representing an _Index_ block. [B+ Trees](https://en.wikipedia.org/wiki/B%2B_tree) are constructed using _Index_ blocks which can be either [Index Internal blocks](../../Design/Physical%20Layer#internal-index-block-structure) or [Index Leaf blocks](../../Design/Physical%20Layer#leaf-index-block-structure). B+ Tree helps in faster data access as compared to sequentially accessing the data through [Record](../../Design/Physical%20Layer#record-block-structure) blocks.

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

| **Name**  | **Type** | **Description**                                                                                                                                            |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockType | `char`   | The block type indicating whether it is an internal index block ([`IND_INTERNAL`](/docs/constants)) or a leaf index block ([`IND_LEAF`](/docs/constants)). |

#### Return Values

Nil

:::note
If the block already has already been initialised as an index block on the disk, use [constructor 2](#indbuffer--indbuffer-constructor-2).
:::

#### Algorithm

```cpp
// call the corresponding parent constructor
IndBuffer::IndBuffer(char blockType) : BlockBuffer(blockType){}

```

### IndBuffer :: IndBuffer() (Constructor 2)

#### Description

Called when the block has already been initialised as an index block on the disk.

#### Arguments

| **Name** | **Type** | **Description**                  |
| -------- | -------- | -------------------------------- |
| blockNum | `int`    | Block number of the index block. |

#### Return Values

Nil

:::note
If a new index block is to be allocated in the disk use [constructor 1](#indbuffer--indbuffer-constructor-1).
:::

#### Algorithm

```cpp
// call the corresponding parent constructor
IndBuffer::IndBuffer(int blockNum) : BlockBuffer(blockNum){}
```

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
If the block has already been initialised as an internal index block on the disk, use [constructor 2](#indinternal--indinternal-constructor2).
:::

```cpp
IndInternal::IndInternal() : IndBuffer('I'){}
// call the corresponding parent constructor
// 'I' used to denote IndInternal.
```

### IndInternal :: IndInternal() (Constructor2)

#### Description

Called when the block has already been initialised as an internal index block on the disk.

#### Arguments

| **Name** | **Type** | **Description**                           |
| -------- | -------- | ----------------------------------------- |
| blockNum | `int`    | Block number of the internal index block. |

#### Return Values

Nil

:::note
If a new internal index block is to be allocated in the disk use [constructor 1](#indinternal--indinternal-constructor1).
:::

```cpp
IndInternal::IndInternal(int blockNum) : IndBuffer(blockNum){}
// call the corresponding parent constructor
```

### IndInternal :: getEntry()

#### Description

Gives the indexNum<sup>th</sup> entry of the block.

#### Arguments

| **Name** | **Type** | **Description**                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------------------- |
| ptr      | `void *` | Pointer to the struct InternalEntry to which the specified internal index entry of the block is copied. |
| indexNum | `int`    | Index number of the entry in the block.                                                                 |

#### Return Values

| **Value**                         | **Description**                                                          |
| --------------------------------- | ------------------------------------------------------------------------ |
| [`SUCCESS`](/docs/constants)      | Successful copy of the internal index entry.                             |
| [`E_OUTOFBOUND`](/docs/constants) | Input indexNum is outside the valid range of index numbers of the block. |

:::caution note

- The `void` pointer is a generic pointer that can be pointed at objects of any data type. However, because the `void` pointer does not know what type of object it is pointing to, it must first be explicitly cast to another pointer type before it is dereferenced.
- The higher layers calling the `getEntry()` function of the `IndInternal class` must ensure that the argument of type `struct InternalEntry *` is passed.
- The higher layers must allocate memory for the `struct InternalEntry` before calling this function.
- The alignment of the `InternalEntry` structure in memory [might be different](https://en.wikipedia.org/wiki/Data_structure_alignment#Data_structure_padding) from the way it is organized in our disk. Make sure to copy each element of the structure separately with appropriate offset. Using `memcpy` on the whole object can lead to errors.

:::

#### Algorithm

```cpp
int IndInternal::getEntry(void *ptr, int indexNum) {
    // if the indexNum is not in the valid range of [0, MAX_KEYS_INTERNAL-1]
    //     return E_OUTOFBOUND.

    unsigned char *bufferPtr;
    /* get the starting address of the buffer containing the block
       using loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
    //     return the value returned by the call.

    // typecast the void pointer to an internal entry pointer
    struct InternalEntry *internalEntry = (struct InternalEntry *)ptr;

    /*
    - copy the entries from the indexNum`th entry to *internalEntry
    - make sure that each field is copied individually as in the following code
    - the lChild and rChild fields of InternalEntry are of type int32_t
    - int32_t is a type of int that is guaranteed to be 4 bytes across every
      C++ implementation. sizeof(int32_t) = 4
    */

    /* the indexNum'th entry will begin at an offset of
       HEADER_SIZE + (indexNum * (sizeof(int) + ATTR_SIZE) )         [why?]
       from bufferPtr */
    unsigned char *entryPtr = bufferPtr + HEADER_SIZE + (indexNum * 20);

    memcpy(&(internalEntry->lChild), entryPtr, sizeof(int32_t));
    memcpy(&(internalEntry->attrVal), entryPtr + 4, sizeof(Attribute));
    memcpy(&(internalEntry->rChild), entryPtr + 20, 4);

    // return SUCCESS.
}
```

### IndInternal :: setEntry()

#### Description

Sets the indexNum<sup>th</sup> entry of the block with the input struct InternalEntry contents.

#### Arguments

| **Name** | **Type** | **Description**                                                                                        |
| -------- | -------- | ------------------------------------------------------------------------------------------------------ |
| ptr      | `void *` | Pointer to the struct InternalEntry from which the specified internal index entry of the block is set. |
| indexNum | `int`    | Index number of the entry in the block.                                                                |

#### Return Values

| **Value**                         | **Description**                                                          |
| --------------------------------- | ------------------------------------------------------------------------ |
| [`SUCCESS`](/docs/constants)      | Successful copy of the internal index entry.                             |
| [`E_OUTOFBOUND`](/docs/constants) | Input indexNum is outside the valid range of index numbers of the block. |

:::caution note

- The `void` pointer is a generic pointer that can be pointed at objects of any data type. However, because the `void` pointer does not know what type of object it is pointing to, it must first be explicitly cast to another pointer type before it is dereferenced.
- The higher layers calling the `setEntry()` method of the `IndInternal class` must ensure that the argument of type `struct InternalEntry *` is passed.
- The higher layers must allocate memory for the `struct InternalEntry` before calling this function.
- The alignment of the `InternalEntry` structure in memory might be different from the way it is organized in our disk. Make sure to copy each element of the structure separately with appropriate offset. Using `memcpy` on the whole object can lead to errors.

:::

#### Algorithm

```cpp
int IndInternal::setEntry(void *ptr, int indexNum) {
    // if the indexNum is not in the valid range of [0, MAX_KEYS_INTERNAL-1]
    //     return E_OUTOFBOUND.

    unsigned char *bufferPtr;
    /* get the starting address of the buffer containing the block
       using loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
    //     return the value returned by the call.

    // typecast the void pointer to an internal entry pointer
    struct InternalEntry *internalEntry = (struct InternalEntry *)ptr;

    /*
    - copy the entries from *internalEntry to the indexNum`th entry
    - make sure that each field is copied individually as in the following code
    - the lChild and rChild fields of InternalEntry are of type int32_t
    - int32_t is a type of int that is guaranteed to be 4 bytes across every
      C++ implementation. sizeof(int32_t) = 4
    */

    /* the indexNum'th entry will begin at an offset of
       HEADER_SIZE + (indexNum * (sizeof(int) + ATTR_SIZE) )         [why?]
       from bufferPtr */

    unsigned char *entryPtr = bufferPtr + HEADER_SIZE + (indexNum * 20);

    memcpy(entryPtr, &(internalEntry->lChild), 4);
    memcpy(entryPtr + 4, &(internalEntry->attrVal), ATTR_SIZE);
    memcpy(entryPtr + 20, &(internalEntry->rChild), 4);


    // update dirty bit using setDirtyBit()
    // if setDirtyBit failed, return the value returned by the call

    // return SUCCESS
}
```

## class IndLeaf

An object of the _IndLeaf_ class will be associated with a [Index Leaf blocks](../../Design/Physical%20Layer#leaf-index-block-structure). A Leaf Index block stores entries of type `struct Index` and is used as the leaf nodes of a B+ Tree. Public methods of this class deal with the access/modification of the _Index_ entries. \*_IndLeaf_ class extends [IndBuffer class](#class-indbuffer) and overrides its virtual methods. The constructor of the IndLeaf class calls the constructor of the parent class by passing suitable argument.

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

:::note
If the block has already been initialised as a leaf index block on the disk, use [constructor 2](#indleaf-constructor-2).
:::

#### Algorithm

```cpp
IndLeaf::IndLeaf() : IndBuffer('L'){} // this is the way to call parent non-default constructor.
                      // 'L' used to denote IndLeaf.

```

### IndLeaf :: IndLeaf() (Constructor 2)

#### Description

Called when the block has already been initialised as a leaf index block on the disk.

#### Arguments

| **Name** | **Type** | **Description**                       |
| -------- | -------- | ------------------------------------- |
| blockNum | `int`    | Block number of the leaf index block. |

#### Return Values

Nil

:::note
If a new leaf index block is to be allocated in the disk use [constructor 1](#indleaf-constructor-1).
:::

#### Algorithm

```cpp
//this is the way to call parent non-default constructor.
IndLeaf::IndLeaf(int blockNum) : IndBuffer(blockNum){}
```

### IndLeaf :: getEntry()

#### Description

Gives the indexNum<sup>th</sup> entry of the block.

#### Arguments

| **Name** | **Type** | **Description**                                                                                       |
| -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| ptr      | `void *` | Pointer to the [struct Index](#index) to which the specified leaf index entry of the block is copied. |
| indexNum | `int`    | Index number of the entry in the block.                                                               |

#### Return Values

| **Value**                         | **Description**                                                            |
| --------------------------------- | -------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)      | Successful getting of the leaf index entry.                                |
| [`E_OUTOFBOUND`](/docs/constants) | Input `indexNum` is outside the valid range of index numbers of the block. |

:::caution note

- The [void pointer](https://en.wikipedia.org/wiki/Void_type) is a generic pointer that can be pointed at objects of any data type. However, because the void pointer does not know what type of object it is pointing to, the void pointer must first be explicitly cast to another pointer type before it is dereferenced.
- The higher layers calling the `getEntry()` function of the _IndLeaf_ class must ensure that the argument of type `struct Index *` is passed.
- The higher layers must allocate memory for the `struct Index` before calling this function.
- The alignment of the `Index` structure in memory might be different from the way it is organized in our disk. Make sure to copy each element of the structure separately with appropriate offset. Using `memcpy` on the whole object can lead to errors.

:::

#### Algorithm

```cpp
int IndLeaf::getEntry(void *ptr, int indexNum) {

    // if the indexNum is not in the valid range of [0, MAX_KEYS_LEAF-1]
    //     return E_OUTOFBOUND.

    unsigned char *bufferPtr;
    /* get the starting address of the buffer containing the block
       using loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
    //     return the value returned by the call.

    // copy the indexNum'th Index entry in buffer to memory ptr using memcpy

    /* the indexNum'th entry will begin at an offset of
       HEADER_SIZE + (indexNum * LEAF_ENTRY_SIZE)  from bufferPtr */
    unsigned char *entryPtr = bufferPtr + HEADER_SIZE + (indexNum * LEAF_ENTRY_SIZE);
    memcpy((struct Index *)ptr, entryPtr, LEAF_ENTRY_SIZE);

    // return SUCCESS
}
```

### IndLeaf :: setEntry()

#### Description

Sets the indexNum<sup>th</sup> entry of the block with the input struct Index contents.

#### Arguments

| **Name** | **Type** | **Description**                                                                                       |
| -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| ptr      | `void *` | Pointer to the [struct Index](#index) to which the specified leaf index entry of the block is copied. |
| indexNum | `int`    | Index number of the entry in the block.                                                               |

#### Return Values

| **Value**                         | **Description**                                                            |
| --------------------------------- | -------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)      | Successful setting of the leaf index entry.                                |
| [`E_OUTOFBOUND`](/docs/constants) | Input `indexNum` is outside the valid range of index numbers of the block. |

:::caution note

- The [void pointer](https://en.wikipedia.org/wiki/Void_type) is a generic pointer that can be pointed at objects of any data type. However, because the void pointer does not know what type of object it is pointing to, the void pointer must first be explicitly cast to another pointer type before it is dereferenced.
- The higher layers calling the `setEntry()` function of the IndLeaf class must ensure that the argument of type `struct Index *` is passed.
- The higher layers must allocate memory for the struct Index before calling this function.
- The alignment of the `Index` structure in memory might be different from the way it is organized in our disk. Make sure to copy each element of the structure separately with appropriate offset. Using `memcpy` on the whole object can lead to errors.

:::

#### Algorithm

```cpp
int IndLeaf::setEntry(void *ptr, int indexNum) {

    // if the indexNum is not in the valid range of [0, MAX_KEYS_LEAF-1]
    //     return E_OUTOFBOUND.

    unsigned char *bufferPtr;
    /* get the starting address of the buffer containing the block
       using loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
    //     return the value returned by the call.

    // copy the Index at ptr to indexNum'th entry in the buffer using memcpy

    /* the indexNum'th entry will begin at an offset of
       HEADER_SIZE + (indexNum * LEAF_ENTRY_SIZE)  from bufferPtr */
    unsigned char *entryPtr = bufferPtr + HEADER_SIZE + (indexNum * LEAF_ENTRY_SIZE);
    memcpy(entryPtr, (struct Index *)ptr, LEAF_ENTRY_SIZE);

    // update dirty bit using setDirtyBit()
    // if setDirtyBit failed, return the value returned by the call

    //return SUCCESS
}
```
