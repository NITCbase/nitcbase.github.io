---
title: "Stage 3 : The Frontend Interface"
---

# The Frontend Interface (6 hours)

:::note Learning Objectives

- Learn about the operations in NITCbase and the XFS interface
- Learn about the NITCbase architecture

:::

We've now got a bottom-up view of how NITCbase stores and uses the data. Let's take a top-down look at all the operations our database will support and how we'll implement them.

# The Commands

### Schema Operations

- **Table Creation and Deletion**<br/>
  Creating a table is a fundamental operation in a database. In NITCbase, table creation entails the following steps;

  1.  Ensure that a relation with the same name does not already exist by iterating through the relation catalog
  2.  Insert a new entry into the relation catalog. We will have to do this operation on the relation catalog disk block directly since we do not have a relation cache entry(Why?)
  3.  Insert entries for all the new attributes into the appropriate attribute catalog disk block. This too will have to be done to the disk block directly.

  Deleting a table involves removing all the entries created during the table creation and freeing all the record blocks used by the relation.

- **Table Opening and Closing**<br/>
  As we mentioned earlier, a table needs to be open for any operation to be done on it. Opening a relation involves loading the relation and attribute catalog entries for the relation into the relation and attribute cache respectively. <br/>
  Closing a relation involves writing back any changes that occured to the cache to the disk block and freeing the memory allocated during opening. <br/>
  The relation catalog and attribute catalog will always be open and cannot be closed.

- **Index Creation and Deletion**<br/>
  A high-end database might automatically create and dispose of indexes as required by the program without user intervention. In NITCbase, the user is expected to decide when the index is to be created and dropped. Creating an index on an attribute involves iterating through all the records of the relation and inserting the attribute value as well as a pointer to the record into a B+ tree.<br/>
  Index deletion involves recursively deleting all the nodes of the B+ tree.

- **Table and Column Rename**<br/>
  NITCbase allows us to rename existing relations and their attributes. This is done by updating the relation/attribute cache.

**Read through the documentation for [DDL Commands](../User%20Interface%20Commands/ddl.md) before proceeding further.** We'll look into detail about the implementation of these features as we develop the [Schema Layer](../Design/Schema%20Layer.md).

### Algebra Operations

- **Insertion**<br/>
  Any database will have to support the basic operation of inserting records. Inserting records into a relation in NITCbase involves the following steps.

  1.  ensuring that the relation is open and not the relation/attribute catalog
  2.  fetch the relation catalog entry from the relation cache
  3.  get the first record block for the relation from the relation catalog entry
  4.  iterate through all the slots of the block and every subsequent record block until a free slot is found (using the slot map)
  5.  if a free slot is not found, allocate a new record block for the relation and update the relation cache and the block headers to add it to the linked list.
  6.  set the record values in the free slot found and update the `numEntries` in the relation cache and other fields in the header of the block.
  7.  do a b+ tree insertion if any index exists for this relation

- **Selection**<br/>
  A selection operation on a relation is used to select a subset of the records satisfying a certain condition. NITCbase supports selection with the following operators: `=`, `!=`, `>`, `>=`, `<` `>=`. We will be able to select the records that fit the condition into a new relation.

- **Projection**<br/>
  A projection operation is used to pick a subset of attributes from a relation. The specified attributes from all the records of the relation will be projected. NITCbase supports projection into a new relation.

- **Joins**<br/>
  The join operation is used to combine two relations with respect to a condition on two columns from the respective relations. NITCbase allows us to combine two relations into a new relation with the `=` condition. This is called an [equijoin](https://en.wikipedia.org/wiki/Relational_algebra#%CE%B8-join_and_equijoin).

NITCbase also allows you to do any combination of selection, projection and join together in a single command to create a new target relation with the specified properties.

**Read through the documentation for [DML Commands](../User%20Interface%20Commands/dml.md) before proceeding further.** We'll look into detail about the implementation of these features as we develop the [Algebra Layer](../Design/Algebra%20Layer.md).

<details>
<summary>

Q. Consider we have a relation `Events` with the attributes (`id`: NUM, `title`: STR, `location`: STR) and a relation `Locations` with the attributes name(`name`: STR, `capacity`: NUM). There are no index blocks on the disk. We run the following commands on our frontend interface.

```
OPEN TABLE Events;
SELECT * FROM Events INTO Lectures WHERE location=ELHC;
OPEN TABLE Locations;
OPEN TABLE Lectures;
SELECT title, location, capacity FROM Lectures JOIN INTO LectureCapacities Locations WHERE Lectures.location = Locations.name;
DROP TABLE Lectures;
ALTER TABLE RENAME LectureCapacities TO Lectures;
```

1. What are the entries in the relation cache and attribute cache for the new relation?
2. What commands could we have run to speed up these operations?
3. Suppose we add a relation `Participants` with attributes (`regNo`: NUM, `event`: STR). Write commands to filter only the students who are attending the event happening in the location _Auditorium_.

(click to view answer)

</summary>

**Answer**(Pending)

1. relation lectures with combined attrs
2. create indexes on join attrs (mention that we'll auto create indexes)
3. join + select + project operations

</details>

## Architecture

You must now have an understanding of the functionalities provided to you by NITCbase and how they are represented in a lower level. We can now get into the finer details of our architecture. NITCbase has a 7-layer object-oriented architecture with each layer specialising in some operation. **Take a look at the [architecture](../Design/Architecture.md) page before proceeding further**. You don't need to understand everything mentioned there at this point. You could also take a look at the [system design](../Design/DesignDiagram.md) to get a detailed idea about the flow of information between layers.

## The XFS Interface

The XFS interface also supports all these commands. pending.
