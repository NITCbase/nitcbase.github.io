---
title: "Stage 5 : Opening Relations"
---

# Stage 5 : Opening Relations (10 hours)

:::note Learning Objectives

- Familiarise with the design of the [Cache Layer](../Design/Cache%20Layer.md) and understand the maintenance of the catalog caches
- Implement the functions for opening a relation and setting up it's cache entries to facilitate searching of records.

:::

:::tip PREREQUISITE READING

- [Data Manipulation Language (DML) Commands](../User%20Interface%20Commands/dml.md)

:::

## Introduction

Your current NITCbase implementation must be able to read the rows and columns of the relations `RELCAT` and `ATTRIBUTECAT` and filter the records based on a certain condition. In this stage, we'll extend all the functionality we have implemented so far to work with any arbitrary relation on the DBMS.

### Open and Closed Relations

A relation that has it's relation and attribute catalog entries stored in the respective caches is called an **open relation**. NITCbase supports opening 12 relations at once. Since the relation catalog and attribute catalog are always open, we can only open 10 other relations. If we want to open any more relations, we will have to **close** some relation. Note that the NITCbase specification does not allow closing of the relation and attribute catalog unless at the time of database exit. **NITCbase requires that a relation be opened before any [DML](../User%20Interface%20Commands/dml.md) commands can be performed on it**.

We discussed the [RelCacheTable](../Design/Cache%20Layer.md#class-relcachetable) and [AttrCacheTable](../Design/Cache%20Layer.md#class-attrcachetable) classes in the preceding stage. Here, we introduce the class [OpenRelTable](../Design/Cache%20Layer.md#class-openreltable). This class manages the opening and closing of relations and handles the caching operations. It has a member `tableMetaInfo` which is a [MAX_OPEN](/constants) sized array of type [struct OpenRelTableMetaInfo](../Design/Cache%20Layer.md#openreltablemetainfo). `tableMetaInfo` is used to store which entries of the caches are free and the relation to which an occupied entry belongs.

For any index `k` that is occupied in the caches, the entries at index `k` in `relCache`, `attrCache` and `tableMetaInfo` will correspond to the same relation. Recall that this index `k` is called the relation's rel-id. These three tables comprise the core functionality of the [Cache Layer](../Design/Cache%20Layer.md) of NITCbase. A table can be opened and closed by the user with the [OPEN TABLE](../User%20Interface%20Commands/ddl.md#open-table) and [CLOSE TABLE](../User%20Interface%20Commands/ddl.md#close-table) commands respectively, both handled by the [Schema Layer](../Design/Schema%20Layer.md).

## Implementation

To open a relation, we need to search through the relation and attribute catalog and fetch the records corresponding to the relation we want to open. To search through the records of a relation, we require that it's catalog entries be present in the caches i.e the relation is open. Hence, NITCbase ensures that the relation catalog and attribute catalog are always kept open.

A sequence diagrams documenting the flow of data between the layers is shown below.

> **NOTE**: The functions are denoted with circles as follows.<br/>
> 🔵 -> methods that are already in their final state<br/>
> 🟢 -> methods that will attain their final state in this stage<br/>
> 🟠 -> methods that we will modify in this stage, and in subsequent stages <br/>

<br/>

```mermaid
 %%{init: { 'sequence': {'mirrorActors':false} } }%%
sequenceDiagram
    actor User
    participant Frontend User Interface
    participant Frontend Programming Interface
    participant Schema Layer
    participant Cache Layer
    participant Block Access Layer
    participant Buffer Layer
    User->>Frontend User Interface: OPEN TABLE
    activate Frontend User Interface
    Frontend User Interface->>Frontend Programming Interface :open_table()🟢
    activate Frontend Programming Interface
    Frontend Programming Interface->>Schema Layer:openRel()🟢
    activate Schema Layer
    Schema Layer->>Cache Layer:openRel()🟢
    activate Cache Layer
    loop until all catalog entries are read
      Cache Layer->>Block Access Layer:linearSearch()🔵
      activate Block Access Layer
      Block Access Layer-->>Cache Layer: recId
      deactivate Block Access Layer
      Cache Layer->>Buffer Layer:getHeader()🔵, getRecord()🔵, getSlotmap()🔵
      activate Buffer Layer
      Buffer Layer-->>Cache Layer: record block info
      deactivate Buffer Layer
    end
    Cache Layer-->>Schema Layer:relId
      deactivate Cache Layer
    Schema Layer-->>User:operation status
    deactivate Schema Layer
    deactivate Frontend Programming Interface
    deactivate Frontend User Interface

```

<br/>

A class diagram showing the methods relevant to this functionality in the [Cache Layer](../Design/Cache%20Layer.md) and [Schema Layer](../Design/Schema%20Layer.md) is shown below.

> Note that we will be using functions from the [Buffer Layer](../Design/Buffer%20Layer.md) and the `linearSearch` function from the [Block Access Layer](../Design/Block%20Access%20Layer.md) that was already implemented by you in the earlier stages. However, these functions do not require any modification at this stage. Hence, their class diagrams are not included below.

**Schema Layer**

```mermaid
classDiagram
  class Schema{
    +openRel(char relName[ATTR_SIZE])$ int🟢
    +closeRel(char relName[ATTR_SIZE])$ int🟢
  }
```

---

**Cache Layer**

```mermaid
classDiagram
direction RL
  RelCacheTable <|.. OpenRelTable : friend
  AttrCacheTable <|.. OpenRelTable : friend
  class RelCacheTable{
    -relCache[MAX_OPEN] : RelCacheEntry*
    -recordToRelCatEntry(union Attribute record[RELCAT_NO_ATTRS], RelCatEntry *relCatEntry)$ void🔵
    +getRelCatEntry(int relId, RelCatEntry *relCatBuf)$ int🔵
    +getSearchIndex(int relId, RecId *searchIndex)$ int🔵
    +setSearchIndex(int relId, RecId *searchIndex)$ int🔵
    +resetSearchIndex(int relId)$ int🔵
  }
  class AttrCacheTable{
    -attrCache[MAX_OPEN] : AttrCacheEntry*
    -recordToAttrCatEntry(union Attribute record[ATTRCAT_NO_ATTRS], AttrCatEntry *attrCatEntry)$ void🔵
    +getAttrCatEntry(int relId, int attrOffset, AttrCatEntry *attrCatBuf)$ int🔵
    +getAttrCatEntry(int relId, char attrName[ATTR_SIZE], AttrCatEntry *attrCatBuf)$ int🔵
  }
  class OpenRelTable{
    -tableMetaInfo[MAX_OPEN] : OpenRelTableMetaInfo
    +OpenRelTable(): 🟢
    +~OpenRelTable(): 🟠
    -getFreeOpenRelTableEntry()$ int🟢
    +getRelId(char relName[ATTR_SIZE])$ int🟢
    +openRel(char relName[ATTR_SIZE])$ int🟢
    +closeRel(int relId)$ int🟠
  }

```

<br/>

As shown in the sequence diagram above, the Frontend User Interface will parse the `OPEN TABLE` command and call the `Frontend::open_table()` function in the Frontend Programming Interface. This call is then transferred along to the [Schema Layer](../Design/Schema%20Layer.md). Hence, the implementation of the `Frontend::open_table()` function only involves a call to the `Schema::openRel()` function. Similarly, the `CLOSE TABLE` command leads to the `Frontend::close_table()` function which in turn transfers control to `Schema::closeRel()`.

<details>
<summary>Frontend/Frontend.cpp</summary>

```cpp
int Frontend::open_table(char relname[ATTR_SIZE]) {
  return Schema::openRel(relname);
}

int Frontend::close_table(char relname[ATTR_SIZE]) {
  return Schema::closeRel(relname);
}
```

</details>

Now, let us implement the functions in the [Schema Layer](../Design/Schema%20Layer.md)

The `Schema::openRel()` function invokes the [Cache Layer](../Design/Cache%20Layer.md) function `OpenRelTable::openRel()`. `Schema::closeRel()` closes a relation if it is open by calling `OpenRelTable::closeRel()` which frees that slot in the caches. Note that this function should not allow the closing of the relation catalog and the attribute catalog.

Closing a relation involves writing back to the disk any changes that have been made to the relation while the relation was open. At this stage, we have not implemented any such update operations and hence, your current implementation of `Schema::closeRel()` does not need to handle the same. We will add this functionality in later stages.

<details>
<summary>Schema/Schema.cpp</summary>

```cpp
int Schema::openRel(char relName[ATTR_SIZE]) {
  int ret = OpenRelTable::openRel(relName);

  // the OpenRelTable::openRel() function returns the rel-id if successful
  // a valid rel-id will be within the range 0 <= relId < MAX_OPEN and any
  // error codes will be negative
  if(ret >= 0){
    return SUCCESS;
  }

  //otherwise it returns an error message
  return ret;
}

int Schema::closeRel(char relName[ATTR_SIZE]) {
  if (/* relation is relation catalog or attribute catalog */) {
    return E_NOTPERMITTED;
  }

  // this function returns the rel-id of a relation if it is open or
  // E_RELNOTOPEN if it is not. we will implement this later.
  int relId = OpenRelTable::getRelId(relName);

  if (/* relation is not open */) {
    return E_RELNOTOPEN;
  }

  return OpenRelTable::closeRel(relId);
}

```

</details>

Next, we implement the functions of the [Cache Layer](../Design/Cache%20Layer.md)

The `OpenRelTable` class will need to be modified to initialise and update the values in the `tableMetaInfo` array. We will also implement the functions for opening and closing relations.

_Note that `tableMetaInfo` is an array of type [struct OpenRelTableMetaInfo](../Design/Cache%20Layer.md#openreltablemetainfo). It is static member of the class and will hence need to be explicitly declared before it can be used._

<details>
<summary>Cache/OpenRelTable.cpp</summary>

```cpp

OpenRelTableMetaInfo OpenRelTable::tableMetaInfo[MAX_OPEN];

OpenRelTable::OpenRelTable() {

  // initialise all values in relCache and attrCache to be nullptr and all entries
  // in tableMetaInfo to be free

  // load the relation and attribute catalog into the relation cache (we did this already)

  // load the relation and attribute catalog into the attribute cache (we did this already)

  /************ Setting up tableMetaInfo entries ************/

  // in the tableMetaInfo array
  //   set free = false for RELCAT_RELID and ATTRCAT_RELID
  //   set relname for RELCAT_RELID and ATTRCAT_RELID
}


OpenRelTable::~OpenRelTable() {

  // close all open relations (from rel-id = 2 onwards. Why?)
  for (int i = 2; i < MAX_OPEN; ++i) {
    if (!tableMetaInfo[i].free) {
      OpenRelTable::closeRel(i); // we will implement this function later
    }
  }

  // free the memory allocated for rel-id 0 and 1 in the caches
}
```

> **TASK**: Implement the following functions looking at their respective design docs
>
> - [`OpenRelTable::getFreeOpenRelTableEntry()`](../Design/Cache%20Layer.md#openreltable--getfreeopenreltableentry)
> - [`OpenRelTable::getRelId()`](../Design/Cache%20Layer.md#openreltable--getrelid)
>
> <sub>
>
> **WARNING**: The `OpenRelTable::openRel()` function involves dynamic memory allocation using `malloc` for creating entries in the relation cache and attribute cache (as a linked list). Please take care to avoid segmentation faults due to mishandling of the associated pointers and such.
> </sub>
>
> - [`OpenRelTable::openRel()`](../Design/Cache%20Layer.md#openreltable--openrel)

```cpp

int OpenRelTable::closeRel(int relId) {
  if (/* rel-id corresponds to relation catalog or attribute catalog*/) {
    return E_NOTPERMITTED;
  }

  if (/* 0 <= relId < MAX_OPEN */) {
    return E_OUTOFBOUND;
  }

  if (/* rel-id corresponds to a free slot*/) {
    return E_RELNOTOPEN;
  }

  // free the memory allocated in the relation and attribute caches which was
  // allocated in the OpenRelTable::openRel() function

  // update `tableMetaInfo` to set `relId` as a free slot
  // update `relCache` and `attrCache` to set the entry at `relId` to nullptr

  return SUCCESS;
}

```

You should now be able to open any relation present in your database and perform the _select_ operation on it.

</details>

## Exercises

**Q1.** Open the relation `Students` and do a select query on the relation with the following commands.

```sql
OPEN TABLE Students;
SELECT * FROM Students INTO null WHERE Batch=J;
CLOSE TABLE Students;
```

**Q2.** Open the relations _Events(`id`: `NUM`, `title`: `STR`, `location`: `STR`), Locations(`name`: `STR`, `capacity`: `NUM`)_ and _Participants(`regNo`: `NUM`, `event`: `STR`)_ that you created earlier and do a _select_ query for all three relations. Ensure that you get the following output.

```plain
# SELECT * FROM Events INTO null WHERE id>0;
| id | title | location |
Selected successfully into null

# SELECT * FROM Locations INTO null WHERE name!=none;
| name | capacity |
Selected successfully into null

# SELECT * FROM Participants INTO null WHERE regNo>0;
| name | capacity |
Selected successfully into null
```
