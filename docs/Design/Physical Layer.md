---
sidebar_position: 9
title: 'Physical Layer'
---
import diskModel from '../../static/img/DiskModel.png'; 

OLD DOC - https://nitcbase.github.io/storage-model.html


## Disk Model

Nitcbase assumes that the disk is a sequence of blocks, and a block is a sequence of bytes. The disk consists of **8192 blocks**, and each block is of **2048 bytes**, resulting in a total of 16MB of storage. 

Disk blocks are **indexed from 0 to 8191.** Blocks 0-3 are reserved for storing *Block Allocation Map*, whereas Blocks 4 and 5 are reserved for storing the block of [Relation Catalog](#relation-catalog) and the first block of [Attribute Catalog](#attribute-catalog), respectively. 

Block Allocation Map tells us whether a particular block is free or occupied. If occupied, it stores the type ([`REC` / `IND_INTERNAL` / `IND_LEAF`](https://nitcbase.github.io/constants.html)) of the block. *It requires one byte per each block*. **Hence a total of 8192 / 2048 = 4 blocks are required for Block Allocation Map**. The following figure summarizes the disk structure.

<br/>
<img src={diskModel} alt="DiskModel" width="650"/>
<br/>


## Disk Class

Higher layers access the disk through the disk class. **The class contains a constructor, a destructor, a function to read from the disk, and a function to write to the disk.** 

Out of these functions, the `readBlock` and `writeBlock` are `static`. C++ allows static functions to be accessed using the semantics `classname::functionname()` (instead of `objectinstance -> functionname()` as in the case of methods that are not declared statically), thus enabling to access the disk funcitons without referring to specific class instances / objects.

**These are the only functions through which the disk can be accessed.** These functions are supplied to you in the NITCbase package, and hence you do not need to implement them. A single object of the class needs to be declared at the start of the session, whose sole purpose is to run the constructor and the destructor of the class.

```cpp
class Disk {
public:
    Disk();
    ~Disk();
    static int readBlock(unsigned char *block, int blockNum);
    static int writeBlock(unsigned char *block, int blockNum);
};
```
### Disk :: Disk()

#### Description
Used to make a temporary copy of the disk contents before the starting of a new session. This ensures that if the system has a forced shutdown during the course of the session, the previous state of the disk is not lost.
#### Arguments
Nil

#### Return Values
Nil

---

### Disk :: ~Disk()
#### Description
Used to update the changes made to the disk on graceful termination of the latest session. This ensures that these changes are visible in future sessions.
#### Arguments
Nil

#### Return Values
Nil

---

### Disk :: readBlock()

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
| `E_OUTOFBOUND` | Block number is out of range.                          |


---
### Disk :: writeBlock()

#### Description
Description:
Transfers the contents of the input memory buffer memory buffer to the specified disk block. Used in buffer layer to write buffer contents to disk.

:::note 
Higher layers must allocate memory for the unsigned character array of size 2048 before passing its pointer to the function.
:::
#### Arguments
| Name | Type | Description |
|-----------|------------------|--------------------------------------------------------------------------------|
| buffer   | `unsigned char *` | Memory pointer of the buffer from which contents is to be written to the block. |
| blockNum | `int`             | Block number of the disk block to be written to.                                     |

#### Return Values
|        Value      |                         Description                               |
|--------------|--------------------------------------------------------|
| `SUCCESS`      | Successful writing of the block to the disk. |
| `E_OUTOFBOUND` |Block number is out of range.                          |


---

## Blocks and Block Types
Nitcbase assumes that the disk is a sequence of blocks, and a block is a sequence of bytes. Apart from the four initial blocks (Block Numbers 0 to 3 which are used for the Block Allocation Map), each block can only be one of the following *three* types based on the type of information being stored:
1. [Record Block](#record-block-structure)
2. [Internal Index Block](#internal-index-block-structure)
3. [Leaf Index Block](#leaf-index-block-structure)

The structure and function of each block type is explained below.
### Record block structure

Nitcbase is a collection of relations, and each relation is a collection of records. The DBMS must store relations in the disk and the strategy is to store each relation in a set of blocks in the disk, organized as a linked list. Each block in such a linked list will be called a **record block**. The block will contain some metadata as well, for instance, the indices of the left block and right blocks in the linked list.

Records in a relation are composed of fields known as *attributes*, each of which contains one item of information. **Nitcbase fixes the size of attribute as 16 bytes**, but the **records of a relation can be of variable size** - varying from 16 bytes (for a record with single attribute) to the size of the larget record that can fit into a block.

*A record block stores the actual data records.* In addition to data records, some metadata is also stoerd in the **preamble/header** of each block. 

The following figure shows the record block structure for a relation with `K` attributes. Let L be the number of records stored in a block (given `K`, `L` can be determined, which is explained later.). Since each attribute requires 16 bytes of storage space, to store each record of this relation  `16 * K bytes` must be allocated.


:::note

In real-world database systems, the *size of an attribute will vary depending on the type of the attribute*. For instance, an integer type attribute will require less storage space than a string type attribute. 

In NITCbase, *we fix the size of all attributes to the same value to simplify the implementation.* It is a conceptually straightforward (but cumbersome from the point of implementation) task to modify the DBMS to support variable-sized attributes.

:::


<br/>


!["Record Block"](https://nitcbase.github.io/img/record_block.png)


* First four bytes (0-3) of header are used to identify the type of block (`REC` / `IND_INTERNAL` / `IND_LEAF`) where REC represents a record block.
* Next four bytes (4-7) are used for storing parent block pointer which has no significance for a record block and can be set to `-1`. 
* Bytes 8-11 and 12-15 are used for storing Left and right block numbers respectively. 
* Next four bytes are used for storing number of records currently stored in the block. 
* Bytes 20-23 and 24-27 are used for storing `#Attr` (Number of attributes of the records of the relation that are stored in this block) and `#Slots` (Number of slots in this block) respectively. 
* Bytes 28-31 are reserved for future use.

**Each record block is divided into slots of variable record size. Each slot stores a single record** (and hence requires `16 * K bytes` for a relation with `K` attributes). Each block can have an arbitrary number of slots depending on the number of attributes in the relation. Number of slots (Maximum number of records, `L`) that fits in a block for any given relation can be calculated as:

$$
\(32 + L + L∗ (16  ∗K) ≤ 2048L ∗ (16 ∗ K +1) ≤ 2016)\)
#Slots=L=⌊2016((16∗#Attributes(K))+1)⌋
$$

!["Equation for Number of Slots"](../../static/img/EqnForNumberOfSlots.png)


The **slotmap**, which appears at the end of the header is used for *indicating whether a slot is occupied or free*. Size of the slotmap is equal to the number of slots, `L`, that fits in the block. If a slot is free, its corresponding entry in slotmap will be `0` or else it will be `1`. Slotmap starts from byte 32 of the header followed by slots which store the actual records. Some amount of space may be left unused at the end whose size is less than the size of a record.

The record block must be loaded from the disk to the main memory before its data can be accessed/modified. The Buffer Layer provides the necessary data structures for this purpose. The RecBuffer class is used to access a record block. The header of the block is stored in the struct HeadInfo. Each record in a record block is treated as an array of union Attributes.

QUESTIONS HERE

Q1. Calculate the number of slots and slotmap size for a relation with 5 attributes

Q2. What is the maximum number of attributes possible for a relation in Nitcbase?

Q3. What is the maximum number of slots possible for a record block in Nitcbase?

### Internal Index Block Structure

!["Internal Index Block"](https://nitcbase.github.io/img/internal_index.png)

### Leaf Index Block Structure

!["Leaf Index Block"](https://nitcbase.github.io/img/leaf_node.png)

## Catalog Structures

### Relation Catalog

### Attribute Catalog
