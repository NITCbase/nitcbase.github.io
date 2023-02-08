---
title: "Stage 2: Disk Data Structures and Operations"
---

# Stage 2: Disk Data Structures and Operations (6 hours)

:::note Learning Objectives

- Understand in detail about the different types of blocks on our XFS disk - record and index blocks
- Learn in detail about the catalog data structures used in NITCbase - relation and attribute catalog
- Learn the fundamentals of indexing
- Learn about the runtime data structures used in NITCbase

:::

**WARNING!** _make sure that you don't get lost in the links as you follow along in this stage_. You're not expected to read any links other than the ones mentioned specifically on this page. You'll be able to understand all the layers in more detail as we go further.

## What's on the disk?

You must now be familiar with basic disk operations on the XFS disk. Here, we will discuss in detail the classification of blocks and other data structures that are used in NITCbase.

### Records and Catalogs

The main purpose of a relational database is to store and retrieve records. When we initially start adding entries to a database, we can obtain a random free disk block and start dumping the values into it one after another and we can traverse it just as easily. But, we are soon going to run out of space on the disk block. What will we do then? We'll get another random disk block and continue our process. But there's now a complication. How will we traverse between these two disk blocks while reading these entries. Clearly, we'll need to store the preceding and following disk block as some metadata in each block. You might've realized that this is in fact just a linked list and you're right. Records in NITCbase are stored in a linked list of disk blocks.

Now, what exactly is a **record**? It is just an array of **attribute values**. Each relation can have a different number of attributes and the total number of records per disk block of a relation varies based on that. Each record block is divided into **slots** of variable record size and each slot stores a single record.

So, now we have a lot of relations each having their own records stored on the disk across multiple blocks. How do we identify and organise these blocks? The **relation catalog** solves this problem in NITCbase. It stores the relation name, the number of attributes and other information related to the record blocks for all the relations in the database.

We now have a provision to keep track of the list of relations that we have stored in the database. But we don't have any information regarding the attributes of each relation. In a production database, an attribute can be one of a myriad of possible types, but here in NITCbase, we'll restrict that to two possible **types**: `NUM` and `STR`. Numbers and strings, as the name would suggest. Both of these types are fixed at a size **16 bytes** for the sake of simplicity. The **attribute catalog** stores these details of all the attributes of every relation in the database. It also stores details about indices created on attributes. We'll get into the details of indexing later.

The relation catalog and attribute catalog together allows us to get all the relations and their respective schemas from our disk. If you didn't realise it yet, the relation and attribute catalog themselves are just relations on our disk! And as such, the blocks storing all the data we mentioned are just record blocks. The first entries in the relation catalog are for itself and the attribute catalog. And the first entries in the attribute catalog are the attributes of the relation catalog and the attributes of itself. Recall the [Disk Model](../Design/Physical%20Layer.md#disk-model) where you read that the first few blocks are reserved for these data structures.

**Read the documentation for [record blocks](../Design/Physical%20Layer.md#record-block-structure) and [catalog structures](../Design/Physical%20Layer.md#catalog-structures) before proceeding further.**

<details>
<summary>
Q. Consider the following catalog entries and record for a relation.

<table>
<thead>
  <tr><th colspan="6">Relation Catalog Entry</th></tr>
</thead>
<tbody>
  <tr>
    <th>RelName</th> <th>#Attrs</th> <th>#Records</th> <th>FirstBlock</th> <th>LastBlock</th> <th>#Slots</th>
  </tr>
  <tr>
    <td>Students</td> <td>?</td> <td>?</td> <td>34</td> <td>35</td> <td>?</td>
  </tr>
</tbody>
</table>
<table>
<thead>
  <tr><th colspan="6">Attribute Catalog Entry</th></tr>
</thead>
<tbody>
  <tr>
    <th>RelName</th> <th>AttrName</th> <th>AttrType</th> <th>PrimaryFlag</th> <th>RootBlock</th> <th>Offset</th>
  </tr>
  <tr>
    <td>Students</td> <td>Name</td> <td>?</td> <td>-</td> <td>-1</td> <td>?</td>
  </tr>
  <tr>
    <td>Students</td> <td>RollNo</td> <td>?</td> <td>-</td> <td>-1</td> <td>?</td>
  </tr>
  <tr>
    <td>Students</td> <td>Marks</td> <td>?</td> <td>-</td> <td>-1</td> <td>?</td>
  </tr>
</tbody>
</table>

<table>
<thead>
  <tr><th colspan="6">section from the record block</th></tr>
</thead>
<tbody>
  <tr>
    <td>...</td> <td>B190539CS</td> <td>Jacques</td> <td>91.08</td> <td>...</td>
  </tr>
</tbody>
</table>

Assume that the relation has only two record blocks and both are fully filled. Find all the missing values (marked with `?`).<br/>
(click to view answer)<br/>

</summary>
pending answer. how to: 3 attrs -> 41 slots -> 82 records. attr type and offset from record.

</details>

### Indexes

We'd discussed the necessity of indexing in the earlier stage. NITCbase uses the B+ tree data structure for this purpose. **Read the section about [B+ trees](../Misc/B%2B%20Trees.md) before proceeding further.**

We now know about B+ trees and operations on them. How exactly does NITCbase use them?<br/>
As we mentioned earlier, a relation in a production database can contain millions or records and might span over a large number of disk blocks. This relation will be made up of some number of attributes. If we find ourselves frequently doing operations on the values of one specific attribute, then it would be wise to create an index on that attribute for that relation.

For example, consider the relation `Student` having 5 attributes (`Roll No`, `Name`, `Marks`, `Grade`, `Attendance`). As an administrator, we might have to frequently get the subset of students having `Marks` greater than some amount `M`. Instead of going through each and every record and checking if it satisfies our condition, the index allows us to easily reach the first record with `Marks` > `M`. We know that in a B+ tree, every subsequent leaf node will also satisfy this condition (Why?). You can see how this would save us a lot of time.

In NITCbase, indexes are B+ trees with **internal nodes of size 100**, and **leaf nodes of size 63**. Each of these nodes will be stored in a separate disk block. A fully filled internal node would consist of a 100 attribute values from various records and 101 pointers to their respective children. A pointer here refers to the block number of the corresponding internal or leaf index block. A fully filled leaf node would consist of 63 attribute values from various records along with the block number and slot number where the record containing this attribute can be found.

The [attribute catalog](../Design/Physical%20Layer.md#attribute-catalog) stores whether a particular attribute of a relation has an index. If it does, the `RootBlock` field of the attribute catalog will store the block number of the root block of the index.

**Read the documentation for [internal index blocks](../Design/Physical%20Layer.md#internal-index-block-structure) and [leaf index blocks](../Design/Physical%20Layer.md#leaf-index-block-structure) before proceeding further.**

## What's in memory?

You now know all about the [Physical Layer](../Design/Physical%20Layer.md) of NITCbase and how the data is represented on the disk. However, disk operations are quite slow and a bottleneck to the efficient functioning of our database. Memory operations are much more efficient, but are subject to space constraints. We should ensure that our system makes optimum use of memory wherever possible to build a fast and responsive database.

### Buffers

Following the [principle of locality](https://en.wikipedia.org/wiki/Locality_of_reference), NITCbase buffers all the disk i/o operations. We will be pre-allocating memory for holding 32 disk blocks in memory at a given time. Whenever a disk block is accessed for the first time, it will be loaded into the buffer. All subsequent operations on that block will be done on that buffer until that disk block is swapped out by a more recently required disk block. All the changes done to the buffer will be commited back to the disk at that point.

We'll learn in detail about this as we implement the [Buffer Layer](../Design/Buffer%20Layer.md).

### Caches

Almost all operations on a relation require access to its corresponding Relation Catalog and Attribute Catalog entries. We will be pre-allocating memory to cache the catalogs of 12 relations at a given time. A relation is said to be **open** if it's catalog entries are loaded into memory. The **relation catalog and attribute catalog are always open** (recall that the relation and attribute catalog too are just relations in our database) since the values stored in these relations will be frequently used and it's beneficial to avoid the overhead of loading it to memory as required. Any other relation will have to be _opened_ before any operation can be done on it.

We have three data structures to store this information: **the relation cache**, the **attribute cache** and the **open relation table**. The open relation table stores details about the currently open relations. A relation needs to have an entry in the open relation table for it to be considered _open_. The relation cache stores the relation catalog entry of an open relation. The attribute cache stores details about all the attributes of an open relation as a linked list of attribute catalog entries. These caches also store a `searchIndex` field which saves the block and slot of the last search hit (we'll cover this field later).

We'll learn in detail about this as we implement the [Cache Layer](../Design/Cache%20Layer.md).

## What comes next?

We now understand the low level representation of data in the disk blocks. How is this data saved as so? What do we do with this data? We'll find out.

### Allocating New Blocks

A new block can be obtained by looking at the [Block Allocation Map](../Design/Physical%20Layer.md#disk-model) for a free entry. We can then load this new block into the buffer and initialise the header with the required header values. If it's a record block, we need to make sure that we add it to the linked list by setting `LBlock` and `RBlock`. An index block will have to be added as the appropriate left or right child and `PBlock` needs to be set.

### Search Operations

A search operation involves fetching all records that satisfy some condition. In NITCbase, search can proceed in one of two ways. If an index is present on our search condition attribute, we can do a B+ search; else we'll have to do a linear search on all the records of the relation. We'll implement a function that will do the appropriate search and return to us a record that satisfies our condition each time it's called. Higher levels can call this function until a null condition to fetch all the records satisfying the condition. You will implement this while working on the [Block Access Layer](../Design/Block%20Access%20Layer.md).

You might've realized that the above function would require some global state to work as intended. We'll need to keep track of the previously found record so that we can fetch the next record that satisfies the condition. And that is exactly what the `searchIndex` field in the relation and attribute cache do. `searchIndex` in the relation cache is used to store the last hit during linear search on that relation. `searchIndex` in the attribute cache is used to store the last hit during a B+ search on the index of that attribute. A value of `{-1, -1}` indicates that the search should start over from the beginning again.

**Read through the documentation for [indexing](../Misc/Indexing.md) to learn about the insertion and search operations on indexes.** You will be implementing this while working on the [B+ Tree Layer](../Design/B%2B%20Tree%20Layer.md).

### Update Operations

All updates to the data are done on the buffer and commited to the disk as required. For a record/index block, the changes in the buffer will be written to the disk when the block is swapped out of the buffer to free up the slot. For operations which require modifications to the relation or attribute catalog, the changes will be written to their respective caches and written back to the disk when an NITCbase session terminates.

### Freeing Blocks

To free a block, we update the block allocation map for that block index to be free and remove the reference to that block from any referencing blocks. Since NITCbase does not support a partial delete operation, we will not need to implement individual freeing of blocks and will only have to free all associated blocks at once.

<details>
<summary>

Q. Assume we have an empty database with no relations. We start it and create a table `LibraryBooks` with attributes (`name`: STR, `id`: NUM, `shelf`: NUM, `borrower`: STR).We then insert 1000 records into the relation `LibraryBooks` in descending order of their `id` (id from 1000 to 1).

1. If we were to do a search for a book with `id` < 500, which book would we get? What's the corresponding _record-id=(block, slot)_?
2. We then create an index on `id` for `LibraryBooks`. How many index blocks would be created?
3. How many entries does the root block have? What is the rightmost value in the root block?
4. If we were to again do a search for a book with `id` > 500, which book would we get? What's the corresponding _record-id=(block, slot)_?
5. What are the contents of the relation cache and the attribute cache?
6. What are the contents of the relation catalog and attribute catalog on the disk?

(click to view answer)

</summary>

**Answer**(pending rewrite)

1. book with `id` 1000 because that's the first record
2. 31 index blocks. 1 internal index.
3. 30 entries. rightmost value is 969.
4. we would get the book with `id` 501 because it's in ascending order
5. it would contain entries for the relation with the appropriate search index filled in.
6. it would be as if the relation was not created because we have not written back to the disk.

</details>

## Exercises

<details>
<summary>
Q1. Insert question here
</summary>
only final answers.
</details>
