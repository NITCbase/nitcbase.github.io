---
title: "class RecBuffer"
sidebar_position: 3
---

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
If the record block already has already been initialised as a record block on the disk, use [constructor 2](#recbuffer--recbuffer-constructor-2).
:::

#### Algorithm

```cpp
RecBuffer::RecBuffer() : BlockBuffer('R'){}
// call parent non-default constructor with 'R' denoting record block.
```

### RecBuffer :: RecBuffer() (Constructor 2)

#### Description

Called when the record block already has already been initialised as a record on the disk.

#### Arguments

| **Name** | **Type** | **Description**                  |
| -------- | -------- | -------------------------------- |
| blockNum | `int`    | Block number of the record block |

#### Return Values

Nil

:::note
If a new record block is to be allocated in the disk use [constructor 1](#recbuffer--recbuffer-constructor-1).
:::

#### Algorithm

```cpp
RecBuffer::RecBuffer(int blockNum) : BlockBuffer(blockNum){}
//call parent non-default constructor with blockNum
```

### RecBuffer :: getSlotMap()

#### Description

Gives the slotmap of the block.

#### Arguments

| **Name** | **Type**          | **Description**                                                        |
| -------- | ----------------- | ---------------------------------------------------------------------- |
| slotMap  | `unsigned char *` | Pointer to the array of unsigned char to which the slot map is copied. |

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
    /* get the starting address of the buffer containing the block using
       loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // get the header of the block using the getHeader() function

    int numSlots = /* the number of slots in the block */;

    // the slotmap starts at bufferPtr + HEADER_SIZE. Copy the contents of the
    // slotmap in the buffer to the argument `slotMap`.
    // Note that size of slotmap is `numSlots`

    // return SUCCESS
}
```

### RecBuffer :: setSlotMap()

#### Description

Sets the slotmap of the block.

#### Arguments

| **Name** | **Type**          | **Description**                                                       |
| -------- | ----------------- | --------------------------------------------------------------------- |
| slotMap  | `unsigned char *` | Pointer to the array of unsigned char from which the slot map is set. |

#### Return Values

Nil

:::caution note

- The array of `unsigned char` to which the pointer in the argument points to should have a size equal to the size of the block's slotmap.
- The higher layers must allocate memory for the `unsigned char` array before calling the function.

:::

```cpp
int RecBuffer::setSlotMap(unsigned char *slotMap) {
    unsigned char *bufferPtr;
    /* get the starting address of the buffer containing the block using
       loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // get the header of the block using the getHeader() function

    int numSlots = /* the number of slots in the block */;

    // the slotmap starts at bufferPtr + HEADER_SIZE. Copy the contents of the
    // argument `slotMap` to the buffer replacing the existing slotmap.
    // Note that size of slotmap is `numSlots`

    // update dirty bit using StaticBuffer::setDirtyBit
    // if setDirtyBit failed, return the value returned by the call

    // return SUCCESS
}
```

#### Algorithm

### RecBuffer :: getRecord()

#### Description

Gives the slotNumth record entry of the block.

#### Arguments

| **Name** | **Type**            | **Description**                                                                       |
| -------- | ------------------- | ------------------------------------------------------------------------------------- |
| rec      | `union Attribute *` | Pointer to the array of union Attribute elements to which the record entry is copied. |
| slotNum  | `int`               | Slot number of the record in the block.                                               |

#### Return Values

| **Value**                    | **Description**                                                     |
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
    /* get the starting address of the buffer containing the block
       using loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    // get the header using the getHeader() function

    // get number of attributes in the block.

    // get the number of slots in the block.

    // if input slotNum is not in the permitted range return E_OUTOFBOUND

    // if slot corresponding to input slotNum is free return E_FREESLOT

    /* offset bufferPtr to point to the beginning of the record at required
       slot. the block contains the header, the slotmap, followed by all
       the records. so, for example,
       record at slot x will be at bufferPtr + HEADER_SIZE + (x*recordSize)
       copy the record from buffer to `rec` using memcpy
       (hint: a record will be of size ATTR_SIZE * numAttrs)
    */

    // return SUCCESS

}
```

### RecBuffer :: setRecord()

#### Description

Sets the `slotNum`th record entry of the block with the input record contents.

#### Arguments

| **Name** | **Type**            | **Description**                                                                      |
| -------- | ------------------- | ------------------------------------------------------------------------------------ |
| rec      | `union Attribute *` | Pointer to the array of union Attribute elements from which the record entry is set. |
| slotNum  | `int`               | Slot number of the record in the block.                                              |

#### Return Values

| **Value**                    | **Description**                                                     |
| ---------------------------- | ------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Succesful copy of the record.                                       |
| [`E_OUTOFBOUND`](/constants) | Input slotNum is outside the set of valid slot values of the block. |

:::caution note

- The array `rec` (an array of type `union Attribute`) should have a size equal to the number of attributes in the relation.
- The higher layers must allocate memory for `rec` before calling the function.

:::

#### Algorithm

```cpp
int RecBuffer::setRecord(union Attribute *rec, int slotNum) {
    unsigned char *bufferPtr;
    /* get the starting address of the buffer containing the block
       using loadBlockAndGetBufferPtr(&bufferPtr). */

    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
        // return the value returned by the call.

    /* get the header of the block using the getHeader() function */

    // get number of attributes in the block.

    // get the number of slots in the block.

    // if input slotNum is not in the permitted range return E_OUTOFBOUND.

    /* offset bufferPtr to point to the beginning of the record at required
       slot. the block contains the header, the slotmap, followed by all
       the records. so, for example,
       record at slot x will be at bufferPtr + HEADER_SIZE + (x*recordSize)
       copy the record from `rec` to buffer using memcpy
       (hint: a record will be of size ATTR_SIZE * numAttrs)
    */

    // update dirty bit using setDirtyBit()

    /* (the above function call should not fail since the block is already
       in buffer and the blockNum is valid. If the call does fail, there
       exists some other issue in the code) */

    // return SUCCESS
}
```
