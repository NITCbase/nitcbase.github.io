---
title: "class RelCacheTable"
sidebar_position: 2
---

The class RelCacheTable is used to cache _Relation Catalog_ entries of all the **open** relations in NITCbase. The first two entries of the _Relation Cache_ Table corresponding to `RELCAT_RELID` and `ATTRCAT_RELID` are reserved for storing the entries of _Relation Catalog_ relation and _Attribute Catalog_ relation, respectively. **These are loaded into the cache by the _`OpenRelTable` constructor_ at the start of the session. These relations remain in the cache memory throughout the session and can only be closed by the _`OpenRelTable` destructor_ during shutdown.**

The class contains a `private` member field, `relCache`, which is an array of pointers to `struct RelCacheEntry` with size `MAX_OPEN`. For each relation opened, an entry is made in the array `relCache`, at the index corresponding to the _relation id_ of the relation. This entry points to the `struct RelCacheEntry` that stores all the attribute values of the relation's entry from the _Relation Catalog_ block along with other meta-data of the relation.

The class provides `public` methods - `getRelCatEntry()` and `setRelCatEntry()` to retrieve and update the _Relation Catalog_ Entry of a relation in the _Relation Cache_ Table. The class also provides `public` methods `getSearchIndex()` and `setSearchIndex()` for retrieving and updating the `searchIndex` field of _Relation Cache_ Entry.

The `private` method `recordToRelCatEntry()` is used to convert a _record_ (implemented as an array of `union Attribute`) to `RelCatEntry` structure. This function is called by the friend class, `OpenRelTable`, while opening a relation. Similarly, the `private` method `relCatEntryToRecord()` is used to convert `RelCatEntry` structure to a record. This function is also called from the friend class, `OpenRelTable`, while closing a relation.

:::note C++ Static Classes
`RelCacheTable` is a _static class_, that is, all member fields and methods are declared `static`. Memory is allocated statically for all member fields of the class. This _static methods_ in this class is used to access its _static member fields_. C++ allows static methods to be accessed using the semantics `class_name :: function_name()`.
:::

:::info note
The class `OpenRelTable` is a friend class to the `RelCacheTable` class. This allows all methods in `OpenRelTable` to access the private fields and methods of the `RelCacheTable` class.
:::

The class definition of `RelCacheTable` is given below.

```cpp
class RelCacheTable {

friend class OpenRelTable;

public:
  //methods
  static int getRelCatEntry(int relId, RelCatEntry *relCatBuf);
  static int setRelCatEntry(int relId, RelCatEntry *relCatBuf);
  static int getSearchIndex(int relId, RecId *searchIndex);
  static int setSearchIndex(int relId, RecId *searchIndex);
  static int resetSearchIndex(int relId);

private:
  //field
  static RelCacheEntry* relCache[MAX_OPEN];

  //methods
  static void recordToRelCatEntry(union Attribute record[RELCAT_NO_ATTRS], RelCatEntry *relCatEntry);
  static void relCatEntryToRecord(RelCatEntry *relCatEntry, union Attribute record[RELCAT_NO_ATTRS]);

};
```

The following are the specifications for the methods in `class RelCacheTable`.

### RelCacheTable :: getRelCatEntry

#### Description

Gives the _Relation Catalog_ entry corresponding to the specified relation from _Relation Cache_ Table.

:::caution note
The caller should allocate memory for the `struct RelCatEntry` before calling the function.
:::

#### Arguments

| **Name**  | **Type**       | **Description**                                                                                                  |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| relId     | `int`          | The relation id of the relation in the _Relation Cache_ Table                                                    |
| relCatBuf | `RelCatEntry*` | Pointer to struct RelCatEntry to which the _Relation Catalog_ entry corresponding to input relId is to be copied |

#### Return Values

| **Value**                         | **Description**                                                           |
| --------------------------------- | ------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)      | Successfully copied the _Relation Catalog_ entry                          |
| [`E_OUTOFBOUND`](/docs/constants) | Input relId is outside the valid set of possible relation ids             |
| [`E_RELNOTOPEN`](/docs/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. |

#### Algorithm

```cpp
int RelCacheTable::getRelCatEntry(int relId, RelCatEntry *relCatBuf) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Relation Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  // copy the corresponding Relation Catalog entry in the Relation Cache Table
  // to relCatBuf.

  return SUCCESS;
}
```

### RelCacheTable :: setRelCatEntry

#### Description

Sets the _Relation Catalog_ entry corresponding to the specified relation in the _Relation Cache_ Table.

:::caution note
The caller should allocate memory for the `struct RelCatEntry` before calling the function.
:::

#### Arguments

| **Name**  | **Type**       | **Description**                                                                                                      |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| relId     | `int`          | The relation id of the relation in the _Relation Cache_ Table                                                        |
| relCatBuf | `RelCatEntry*` | Pointer to struct RelCatEntry using which the _Relation Catalog_ entry corresponding to input relId is to be updated |

#### Return Values

| **Value**                         | **Description**                                                           |
| --------------------------------- | ------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)      | Successfully copied the _Relation Catalog_ entry                          |
| [`E_OUTOFBOUND`](/docs/constants) | Input relId is outside the valid set of possible relation ids             |
| [`E_RELNOTOPEN`](/docs/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. |

#### Algorithm

```cpp
int RelCacheTable::setRelCatEntry(int relId, RelCatEntry *relCatBuf) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Relation Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  // copy the relCatBuf to the corresponding Relation Catalog entry in
  // the Relation Cache Table.

  // set the dirty flag of the corresponding Relation Cache entry in
  // the Relation Cache Table.

  return SUCCESS;
}
```

### RelCacheTable :: getSearchIndex

#### Description

Gives the value of `searchIndex` field of the given relation from _Relation Cache_ Table. This is used by the linear search algorithm to find the **location of the previous hit** so that the search can be resumed from the next record.

:::caution note
The caller should allocate memory for the struct RecId before calling the function.
:::

#### Arguments

| **Name**    | **Type** | **Description**                                                                                                                   |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| relId       | `int`    | The relation id of the relation in the _Relation Cache_ Table                                                                     |
| searchIndex | `RecId*` | Pointer to struct RecId to which the searchIndex field of the _Relation Cache_ entry corresponding to input relId is to be copied |

#### Return Values

| **Value**                         | **Description**                                                           |
| --------------------------------- | ------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)      | Successfully copied the search index to the argument.                     |
| [`E_OUTOFBOUND`](/docs/constants) | Input relId is outside the valid set of possible relation ids             |
| [`E_RELNOTOPEN`](/docs/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. |

#### Algorithm

```cpp
int relCacheTable::getSearchIndex(int relid, recId *recidbuff_ptr) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Relation Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  // copy the searchIndex field of the Relation Cache entry corresponding to
  // input relId to searchIndex variable.

  return SUCCESS;
}
```

### RelCacheTable :: setSearchIndex

#### Description

Sets the value of `searchIndex` field of the given relation in _Relation Cache_ Table. This is used by the linear search algorithm to set the location of the previous hit so that the search can be resumed from the next record.

:::caution note

- The value of the search index is expected to be verified by the caller. This function does not check the validity of the search index before setting it into the cache entry.

:::

#### Arguments

| **Name**    | **Type** | **Description**                                                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| relId       | `int`    | The relation id of the relation in the _Relation Cache_ Table                                                                         |
| searchIndex | `RecId*` | Pointer to struct RecId using which the searchIndex field of the _Relation Cache_ entry corresponding to input relId is to be updated |

#### Return Values

| **Value**                         | **Description**                                                           |
| --------------------------------- | ------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)      | Successfully set the search index in the relation cache                   |
| [`E_OUTOFBOUND`](/docs/constants) | Input relId is outside the valid set of possible relation ids             |
| [`E_RELNOTOPEN`](/docs/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. |

#### Algorithm

```cpp
int RelCacheTable::setSearchIndex(int relId, recId *searchIndex) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Relation Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  // copy the searchIndex variable to the searchIndex field of the Relation
  // Cache entry corresponding to input relId.

  return SUCCESS;
}
```

### RelCacheTable :: resetSearchIndex

#### Description

Resets the value of `searchIndex` field of the given relation in _Relation Cache_ Table to {-1, -1}. This is used so that the linear search can be restarted from the first record.

#### Arguments

| **Name** | **Type** | **Description**                                               |
| -------- | -------- | ------------------------------------------------------------- |
| relId    | `int`    | The relation id of the relation in the _Relation Cache_ Table |

#### Return Values

| **Value**                         | **Description**                                                           |
| --------------------------------- | ------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)      | Successfully reset the search index in the relation cache.                |
| [`E_OUTOFBOUND`](/docs/constants) | Input relId is outside the valid set of possible relation ids             |
| [`E_RELNOTOPEN`](/docs/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. |

#### Algorithm

```cpp
int RelCacheTable::resetSearchIndex(int relId) {

  // declare a RecId having value {-1, -1}
  // set the search index to {-1, -1} using RelCacheTable::setSearchIndex
  // return the value returned by setSearchIndex
}
```

### RelCacheTable :: recordToRelCatEntry

#### Description

A utility function that converts a record, implemented as an array of `union Attribute`, to `RelCatEntry` structure. This function can be used to convert a record in a _Relation Catalog_ block to the corresponding _Relation Cache_ entry when caching a relation in _Relation Cache_ Table. The details of the implementation are left to you.

:::caution note
The caller should allocate memory for the `struct RelCatEntry` and array of `union Attribute` before calling the function.
:::

#### Arguments

| **Name**    | **Type**                       | **Description**                                                                           |
| ----------- | ------------------------------ | ----------------------------------------------------------------------------------------- |
| record      | `union Attribute[RELCAT_SIZE`] | The record which is to be converted to a `RelCatEntry`                                    |
| RelCatEntry | `RelCatEntry*`                 | Pointer to struct `RelCatEntry` to which the contents of the input record is to be copied |

#### Return Values

Nil

### RelCacheTable :: relCatEntryToRecord

#### Description

A utility function that converts `RelCatEntry` structure to a record, implemented as an array of `union Attribute`. This function can be used to convert the _Relation Cache_ entry to the corresponding record that can be written back to _Relation Catalog_ block when closing a relation in the cache memory. The details of the implementation are left to you.

:::caution note
The caller should allocate memory for the struct RelCatEntry and array of union Attribute before calling the function.
:::

#### Arguments

| **Name**    | **Type**                       | **Description**                                                             |
| ----------- | ------------------------------ | --------------------------------------------------------------------------- |
| RelCatEntry | `RelCatEntry*`                 | Pointer to struct `RelCatEntry` which is to be converted to a record.       |
| record      | `union Attribute[RELCAT_SIZE]` | The record to which the contents of the input `RelCatEntry` is to be copied |

#### Return Values

Nil

---
