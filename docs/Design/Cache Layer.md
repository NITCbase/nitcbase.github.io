---
sidebar_position: 6
title: "Cache Layer"
---

:::info note
The Cache Layer code is to be written in 3 pairs of files:

- `RelCacheTable.cpp` and it's header file `RelCacheTable.h`
- `AttrCacheTable.cpp` and it's header file `AttrCacheTable.h`
- `OpenRelTable.cpp` and it's header file `OpenRelTable.h`

**[The stub code for these files can be found here](/stub/cache_stub)**
:::

## Layout

Almost all operations on a relation require access to its corresponding **Relation Catalog** and **Attribute Catalog** entries. NITCbase stores these catalogs as relations in the disk. To prevent multiple reads and write backs of the catalog blocks, the _Cache Layer_ **caches** the catalog blocks along with some extra metadata associated with the relation that allows faster and easier processing of operations such as search. The Cache Layer, thus, provides an interface for catalog access to the higher layers by hiding the storage and maintenance details of the catalogs. Cache Layer can cache a maximum of [MAX_OPEN](/constants) number of relations at any given time.
**NITCbase requires that the relation be first loaded to cache memory before any operation is performed on it.**

Three tables are used by NITCbase for caching Catalogs - the **Relation Cache Table** for _Relation Catalog_ entries, the **Attribute Cache Table** for _Attribute Catalog_ entries and the **Open Relation Table** for operations that include both _Relation_ and _Attribute_ Catalogs.

NITCbase follows an Object-Oriented design for Cache Layer. The class diagram is as shown below.
![CacheClasses](../../static/img/cache_classes.png)

---

Various structures used in the cache layer are outlined in the below diagrams.

## ![CacheStructures](../../static/img/cache_structures.png)

## relId

Any relation that is stored in the cache memory will have an entry in each of the three tables- **Relation Cache Table**, **Attribute Cache Table**, and **Open Relation Table**. An _open relation_ is a relation that has been loaded to the cache memory while a _closed relation_ is one that is not loaded to the cache memory (hence it is only present in the disk). NITCbase is designed in such a way that the entries in all the three tables will be stored at the **same index**.

_This common index is called the **`relId`** of the relation and all further operations on the relation require this `relId`._

---

## Relation Cache Table Structures

The Relation Catalog block in the disk **stores metadata corresponding to all the relations in the database**. In addition to this, the _Relation Catalog_ entry of every open relation is loaded to the cache memory for easy access and for better performance. This is implemented using _Relation Cache_ Table. _Each entry in the Relation Cache Table stores all the attribute values of the relation's entry from the Relation Catalog block along with some additional meta-data._

NITCbase caches _Relation Catalog_ using two structures: `RelCatEntry` and `RelCacheEntry`.

### RelCatEntry

The structure `RelCatEntry` stores all the attribute values in the relation's record entry from the _Relation Catalog_ block in its data fields.

```cpp
typedef struct RelCatEntry {

    unsigned char relName[ATTR_SIZE];
    int numAttrs;
    int numRecs;
    int firstBlk;
    int lastBlk;
    int numSlotsPerBlk;

} RelCatEntry;
```

### RelCacheEntry

The structure `RelCacheEntry` stores the _Relation Catalog_ entry of the relation along with some additonal information needed during runtime.

The `RelCacheEntry` data field details are as follows:

- `relCatEntry`: Stores the relation's cached _Relation Catalog_ entry.
- `dirty`: Indicates whether the _Relation Catalog_ entry has been modified. The _Relation Catalog_ entries with the set dirty bit are written back to disk when an open relation is closed in the cache memory.
- `recId`: Stores the _record id_ `{blockNum, slotNum}` of the relation's entry in the _Relation Catalog_ block on the disk. This is useful during the write back of the catalog entry to disk if it had been modified.
- `searchIndex`: Stores the _record id_ `{blockNum, slotNum}` of the record block corresponding to the last (previous) search hit in the relation. Linear search algorithm of the Block Access Layer starts searching for the next hit from the previous hit location. The entries are initialized to `{-1, -1}` each time the relation is loaded to the cache memory. When every record of the relation has been searched, the linear search algorithm resets the `searchIndex` value to `{-1, -1}`.

```cpp
typedef struct RelCacheEntry {

    RelCatEntry relCatEntry;
    bool dirty;
    RecId recId;
    RecId searchIndex;

} RelCacheEntry;
```

---

## Attribute Cache Table Structures

The _Attribute Catalog_ blocks, analogous to the _Relation Catalog_ block, stores the **meta information of the attributes of all the relations in the database**. In addition to this, the _Attribute Catalog_ entries of every open relation is also loaded to the cache memory. This is implemented using _Attribute Cache_ Table. _Each entry in the Attribute Cache Table stores the entries corresponding to each attribute of the relation in the form a **linked list** along with some additional meta-data._

NITCbase caches _Attribute Catalog_ using two structures: `AttrCatEntry` and `AttrCacheEntry`.

### AttrCatEntry

The structure `AttrCatEntry` stores in its data fields all the attribute values in the record entry corresponding to one of the relation's attribute from an _Attribute Catalog_ block.

```cpp
typedef struct AttrCatEntry {

    unsigned char relName[ATTR_SIZE];
    unsigned char attrName[ATTR_SIZE];
    int attrType;
    bool primaryFlag;
    int rootBlock;
    int offset;

} AttrCatEntry;
```

### AttrCacheEntry

The structure `AttrCacheEntry` stores the _Attribute Catalog_ entry of an attribute of the relation along with some additonal information used during runtime. Since a relation can have variable number of attributes, a linked list of `struct AttributeCacheEntry` elements is maintained to cache all the _Attribute Catalog_ entries together.

The `AttrCacheEntry` data field details are as follows:

- `attrCatEntry`: Stores the cached _Attribute Catalog_ entry corresponding to an attribute of the relation.
- `dirty`: Indicates whether the _Attribute Catalog_ entry has been modified. The _Attribute Catalog_ entries with the set dirty bit are written back to disk when an open relation is closed in the cache memory.
- `recId`: Stores the _record id_ `{blockNum, slotNum}` of the record entry corresponding to the relation's attribute in the _Attribute Catalog_ block on the disk. This is useful during the write back of the catalog entry to disk if it had been modified.
- `searchIndex`: Stores the index id `{blockNum, indexNum}` of the leaf index block corresponding to the last (previous) search hit for the attribute. This entry is used only if there is a B+ Tree created on the attribute. B+ Tree search algorithm of the B+ Tree Layer starts searching from the previous hit location for the next hit. The entries are initialized to `{-1, -1}` each time the relation is opened in the cache memory. When every Index Leaf Block entry of the B+ Tree has been searched, B+ Tree search resets the searchIndex value to `{-1, -1}`.
- `next`: Gives the pointer to the next `AttrCacheEntry` element in the linked list.

```cpp
typedef struct AttrCacheEntry {

    AttrCatEntry attrCatEntry;
    bool dirty;
    RecId recId;
    IndexId searchIndex;
    struct AttrCacheEntry *next;

} AttrCacheEntry;
```

---

## Open Relation Table Structure

A relation must have an entry in the _Open Relation Table_ for its _Relation Catalog_ and _Attribute Catalog_ entries to be cached in the _Relation Cache Table_ and _Attribute Cache Table_, respectively.

### OpenRelTableMetaInfo

The `struct OpenRelTableMetaInfo` stores whether the given entry in the `OpenRelTable`, the _Relation Cache Table_, and _Attribute Cache Table_ is occupied and also stores the name of the relation if occupied.

```cpp
typedef struct OpenRelTableMetaInfo {

    bool free;
    unsigned char rel_name[ATTR_SIZE];

} OpenRelTableMetaInfo;
```

---

The following diagram summarizes the design of this module.
![CacheTables](../../static/img/cache_tables.png)

---

## class RelCacheTable

The class RelCacheTable is used to cache _Relation Catalog_ entries of all the **open** relations in NITCbase. The first two entries of the _Relation Cache_ Table corresponding to `RELCAT_RELID` and `ATTRCAT_RELID` are reserved for storing the entries of _Relation Catalog_ relation and _Attribute Catalog_ relation, respectively. **These are loaded into the cache by the _`OpenRelTable` constructor_ at the start of the session. These relations remain in the cache memory throughout the session and can only be closed by the _`OpenRelTable` destructor_ during shutdown.**

The class contains a `private` member field, `relCache`, which is an array of pointers to `struct RelCacheEntry` with size `MAX_OPEN`. For each relation opened, an entry is made in the array `relCache`, at the index corresponding to the _relation id_ of the relation. This entry points to the `struct RelCacheEntry` that stores all the attribute values of the relation's entry from the _Relation Catalog_ block along with other meta-data of the relation.

The class provides `public` methods - `getRelCatEntry()` and `setRelCatEntry()` to retrieve and update the _Relation Catalog_ Entry of a relation in the _Relation Cache_ Table. The class also provides `public` methods `getSearchIndex()` and `setSearchIndex()` for retrieving and updating the `searchIndex` field of _Relation Cache_ Entry.

The `private` method `recordToRelCacheEntry()` is used to convert a _record_ (implemented as an array of `union Attribute`) to `RelCacheEntry` structure. This function is called by the friend class, `OpenRelTable`, while opening a relation. Similarly, the `private` method `relCacheEntryToRecord()` is used to convert `RelCacheEntry` structure to a record. This function is also called from the friend class, `OpenRelTable`, while closing a relation.

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
    static void RecordToRelCacheEntry(union Attribute record[RELCAT_SIZE], RelCacheEntry* relCacheEntry);
    static void RelCacheEntryToRecord(union Attribute record[RELCAT_SIZE], RelCacheEntry* relCacheEntry);

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

| Name      | Type           | Description                                                                                                      |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| relId     | `int`          | The relation id of the relation in the _Relation Cache_ Table                                                    |
| relCatBuf | `RelCatEntry*` | Pointer to struct RelCatEntry to which the _Relation Catalog_ entry corresponding to input relId is to be copied |

#### Return Values

| Value                        | Description                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Successfully copied the _Relation Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants) | Input relId is outside the valid set of possible relation ids                                                                               |
| [`E_RELNOTOPEN`](/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |

#### Algorithm

```cpp
int RelCacheTable::getRelCatEntry(int relId, RelCatEntry *relCatBuf) {

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Relation Cache Table is free:
    {
        return E_RELNOTOPEN;
    }

    //copy the corresponding Relation Catalog entry in the Relation Cache Table to relCatBuf.

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

| Name      | Type           | Description                                                                                                          |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| relId     | `int`          | The relation id of the relation in the _Relation Cache_ Table                                                        |
| relCatBuf | `RelCatEntry*` | Pointer to struct RelCatEntry using which the _Relation Catalog_ entry corresponding to input relId is to be updated |

#### Return Values

| Value                        | Description                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Successfully copied the _Relation Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants) | Input relId is outside the valid set of possible relation ids                                                                               |
| [`E_RELNOTOPEN`](/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |

#### Algorithm

```cpp
int RelCacheTable::setRelCatEntry(int relId, RelCatEntry *relCatBuf) {

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Relation Cache Table is free:
    {
        return E_RELNOTOPEN;
    }

    //copy the relCatBuf to the corresponding Relation Catalog entry in the Relation Cache Table.

    //set the dirty flag of the corresponding Relation Cache entry in the Relation Cache Table.

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

| Name        | Type     | Description                                                                                                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| relId       | `int`    | The relation id of the relation in the _Relation Cache_ Table                                                                     |
| searchIndex | `RecId*` | Pointer to struct RecId to which the searchIndex field of the _Relation Cache_ entry corresponding to input relId is to be copied |

#### Return Values

| Value                        | Description                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Successfully copied the _Relation Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants) | Input relId is outside the valid set of possible relation ids                                                                               |
| [`E_RELNOTOPEN`](/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |

#### Algorithm

```cpp
int relCacheTable::getSearchIndex(int relid, recId *recidbuff_ptr) {

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Relation Cache Table is free:
    {
        return E_RELNOTOPEN;
    }

    // copy the searchIndex field of the Relation Cache entry corresponding to input relId to searchIndex variable.

    return SUCCESS;
}
```

### RelCacheTable :: setSearchIndex

#### Description

Sets the value of `searchIndex` field of the given relation in _Relation Cache_ Table. This is used by the linear search algorithm to set the location of the previous hit so that the search can be resumed from the next record.

:::caution note
The caller should allocate memory for the struct RecId before calling the function.
:::

#### Arguments

| Name        | Type     | Description                                                                                                                           |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| relId       | `int`    | The relation id of the relation in the _Relation Cache_ Table                                                                         |
| searchIndex | `RecId*` | Pointer to struct RecId using which the searchIndex field of the _Relation Cache_ entry corresponding to input relId is to be updated |

#### Return Values

| Value                        | Description                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Successfully copied the _Relation Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants) | Input relId is outside the valid set of possible relation ids                                                                               |
| [`E_RELNOTOPEN`](/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |

#### Algorithm

```cpp
int RelCacheTable::setSearchIndex(int relId, recId *searchIndex) {

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Relation Cache Table is free:
    {
        return E_RELNOTOPEN;
    }

    // copy the searchIndex variable to the searchIndex field of the Relation Cache entry corresponding to input relId.

    return SUCCESS;

}
```

### RelCacheTable :: resetSearchIndex

#### Description

Resets the value of `searchIndex` field of the given relation in _Relation Cache_ Table to {-1, -1}. This is used so that the linear search can be restarted from the first record.

#### Arguments

| Name  | Type  | Description                                                   |
| ----- | ----- | ------------------------------------------------------------- |
| relId | `int` | The relation id of the relation in the _Relation Cache_ Table |

#### Return Values

| Value                        | Description                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | Successfully copied the _Relation Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants) | Input relId is outside the valid set of possible relation ids                                                                               |
| [`E_RELNOTOPEN`](/constants) | Entry corresponding to input relId is free in the _Relation Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |

#### Algorithm

```cpp
int RelCacheTable::resetSearchIndex(int relId) {

    // declare a RecId having value {-1, -1}
    // set the search index to {-1, -1} using RelCacheTable::setSearchIndex
    // return the value returned by setSearchIndex
}
```

### RelCacheTable :: recordToRelCacheEntry

#### Description

A utility function that converts a record, implemented as an array of `union Attribute`, to `RelCacheEntry` structure. The record content is used to populate the `relCatEntry` field. The `dirty`, `recId`, and `searchIndex `fields are initialised with default values of `false`, `{-1, -1}`, and `{-1, -1}`, respectively. This function can be used to convert a record in a _Relation Catalog_ block to the corresponding _Relation Cache_ entry when caching a relation in _Relation Cache_ Table. The details of the implementation are left to you.

:::caution note
The caller should allocate memory for the `struct RelCacheEntry` and array of `union Attribute` before calling the function.
:::

#### Arguments

| Name          | Type                            | Description                                                                               |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------------------- |
| record        | `union Attribute[RELCAT_SIZE`]` | The record which is to be converted to a _Relation Cache_ Entry                           |
| RelCacheEntry | `RelCacheEntry*`                | Pointer to struct RelCacheEntry to which the contents of the input record is to be copied |

#### Return Values

Nil

### RelCacheTable :: relCacheEntryToRecord

#### Description

A utility function that converts `RelCacheEntry` structure to a record, implemented as an array of `union Attribute`. The record is populated with the contents of the `relCatEntry` field. The `dirty`, `recId`, and `searchIndex` fields are used only during runtime and are not written to the disk. This function can be used to convert the _Relation Cache_ entry to the corresponding record that can be written back to _Relation Catalog_ block when closing a relation in the cache memory. The details of the implementation are left to you.

:::caution note
The caller should allocate memory for the struct RelCacheEntry and array of union Attribute before calling the function.
:::

#### Arguments

| Name          | Type                           | Description                                                                          |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| record        | `union Attribute[RELCAT_SIZE]` | The record to which the contents of the input _Relation Cache_ Entry is to be copied |
| RelCacheEntry | `RelCacheEntry*`               | Pointer to struct RelCacheEntry which is to be converted to a record.                |

#### Return Values

Nil

---

## class AttrCacheTable

The `class AttrCacheTable` is used to cache _Attribute Catalog_ entries of the attributes of open relations in NITCbase. The first two entries of the _Attribute Cache_ Table corresponding to `RELCAT_RELID` and `ATTRCAT_RELID` are reserved for storing the entries of _Relation Catalog_ relation and _Attribute Catalog_ relation, respectively. **These are loaded into the cache by the _`OpenRelTable` constructor_ at the start of the session. These relations remain in the cache memory throughout the session and can only be closed by the _`OpenRelTable` destructor_ during shutdown.**

The class contains a `private` member field, `attrCache`, which is an array of pointers to `struct AttrCacheEntry` with size `MAX_OPEN`. For each relation opened, an entry is made in the array `attrCache`, at the index given by _relation id_ of the relation. This entry is the head of the linked list of `struct AttrCacheEntry` elements. A linked list is used because a relation can have variable number of attributes (though the maximum number of attributes for a relation is bounded in Nitcbase by 125 - why?). **Each element in the linked list corresponds to an attribute of the relation.**

The class provides `public` _overloaded methods_ - `getAttrCatEntry()` and `setAttrCatEntry()` to retrieve and update the _Attribute Catalog_ entry of a relation's attribute in the _Attribute Cache_ Table. The class also provides _overloaded_ `public` methods - `getSearchIndex()` and `setSearchIndex()` for retrieving and updating the `searchIndex` field of _Attribute Cache_ Entry.

The `private` method `recordToAttrCacheEntry()` is used to convert a record (implemented as an array of union Attribute) to `AttrCacheEntry` structure. This function is called by the _friend class_, `OpenRelTable`, while opening a relation. Similarly, the `private` method `attrCacheEntryToRecord()` is used to convert `AttrCacheEntry` structure in to a record. This function is also called from the _friend class_, `OpenRelTable`, while closing a relation.

:::info C++ STATIC CLASSES
AttrCacheTable is a _static class_, i.e., all member fields and methods are declared static. Memory is allocated statically for all member fields of the class. This class uses _static methods_ to access the _static member fields_. C++ allows static methods to be accessed using the semantics `class_name :: function_name()`.
:::

:::note Note
The class OpenRelTable is a _friend class_ to `AttrCacheTable` class. This allows all methods in `OpenRelTable` to access the `private` fields and methods of the `AttrCacheTable` class.
:::

The class definition of `AttrCacheTable` is as given below.

```cpp
class AttrCacheTable {

friend class OpenRelTable;

public:
    //methods
    static int getAttrCatEntry(int relId, unsigned char attrName[ATTR_SIZE], AttrCatEntry *attrCatBuf);
    static int getAttrCatEntry(int relId, int attrOffset, AttrCatEntry *attrCatBuf);
    static int setAttrCatEntry(int relId, unsigned char attrName[ATTR_SIZE], AttrCatEntry *attrCatBuf);
    static int setAttrCatEntry(int relId, int attrOffset, AttrCatEntry *attrCatBuf);
    static int getSearchIndex(int relId, unsigned char attrName[ATTR_SIZE], IndexId *searchIndex);
    static int getSearchIndex(int relId, int attrOffset, IndexId *searchIndex);
    static int setSearchIndex(int relId, unsigned char attrName[ATTR_SIZE], IndexId *searchIndex);
    static int setSearchIndex(int relId, int attrOffset, IndexId *searchIndex);

private:
    //field
    static AttrCacheEntry* attrCache[MAX_OPEN];

    //methods
    static void recordToAttrCacheEntry(union Attribute record[ATTRCAT_SIZE], AttrCacheEntry *attrCacheEntry);
    static void attrCacheEntryToRecord(union Attribute record[ATTRCAT_SIZE], AttrCacheEntry *attrCacheEntry);

};
```

The following are the specifications for the methods in `class AttrCacheTable`.

### AttrCacheTable :: getAttrCatEntry

#### Description

Gives the _Attribute Catalog_ entry corresponding to the given attribute of the specified relation in the _Attribute Cache_ Table.

:::caution note

- The caller should allocate memory for the `struct AttrCatEntry` before calling the function.
- This method is overloaded in type of the second argument.

:::

#### Arguments

| Name                  | Type                               | Description                                                                                                                          |
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table                                                                       |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                                                                                              |
| attrCatBuf            | `AttrCatEntry*`                    | Pointer to struct AttrCatEntry to which the _Attribute Catalog_ entry corresponding to the input relid and attribute is to be copied |

#### Return Values

| Value                          | Description                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::getAttrCatEntry(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Attribute Cache Table is free:
    {
        return E_RELNOTOPEN;
    }

    // iterate over all the attributes in the Attribute Cache Table corresponding to the relation with relId.
    {
        // if the attrName/offset field of the Attribute Catalog entry is equal to the input attrName/attrOffset:
        {
            // copy that Attribute Catalog entry in the Attribute Cache Table to attrCatBuf.

            return SUCCESS;
        }
    }

    return E_ATTRNOTEXIST;

}
```

### AttrCacheTable :: setAttrCatEntry

#### Description

Sets the _Attribute Catalog_ entry corresponding to the given attribute of the specified relation in the _Attribute Cache_ Table.

:::caution note

- The caller should allocate memory to the pointer to `struct AttrCatEntry` before calling the function.
- This method is overloaded in type of the second argument.

:::

#### Arguments

| Name                  | Type                               | Description                                                                                                                              |
| --------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table                                                                           |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                                                                                                  |
| attrCatBuf            | `AttrCatEntry*`                    | Pointer to `struct AttrCatEntry` using which the _Attribute Catalog_ entry corresponding to input `relId` and attribute is to be updated |

#### Return Values

| Value                          | Description                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::setAttrCatEntry(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Attribute Cache Table is free:
    {
        return E_RELNOTOPEN;
    }

    // iterate over all the attributes in the Attribute Cache Table corresponding to the relation with relId.
    {
        // if the attrName/offset field of the Attribute Catalog entry is equal to the input attrName/attrOffset:
        {
            // copy the attrCatBuf to the corresponding Attribute Catalog entry in the Attribute Cache Table.

            // set the dirty flag of the corresponding Attribute Cache entry in the Attribute Cache Table.

            return SUCCESS;
        }
    }

    return E_ATTRNOTEXIST;

}
```

### AttrCacheTable :: getSearchIndex

#### Description

Gives the value of `searchIndex` field of the given attribute in the specified relation from _Attribute Cache_ Table. This is used by the _B+ Tree_ search algorithm to find the **location of the previous hit** so that the search can be resumed from the next _leaf index_ entry.

:::caution note

- This method is overloaded in type of the second argument.
- The caller should allocate memory for the `struct IndexId` before calling the function.

:::

#### Arguments

| Name                  | Type                               | Description                                                                                                                                            |
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table                                                                                         |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                                                                                                                |
| searchIndex           | `IndexId*`                         | Pointer to struct IndexId to which the searchIndex field of the _Attribute Cache_ entry corresponding to the input relid and attribute is to be copied |

#### Return Values

| Value                          | Description                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::getSearchIndex(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Attribute Cache Table is free:
    {
        return E_RELNOTOPEN;
    }

    // iterate over all the attributes in the Attribute Cache Table corresponding to the relation with relId.
    {
        // if the attrName/offset field of the Attribute Catalog entry is equal to the input attrName/attrOffset:
        {

            //copy the searchIndex field of the corresponding Attribute Cache entry in the Attribute Cache Table to input searchIndex variable.

            return SUCCESS;
        }
    }

    return E_ATTRNOTEXIST;

}
```

### AttrCacheTable :: setSearchIndex

#### Description

Sets the value of `searchIndex` field of the given attribute in the specified relation from _Attribute Cache_ Table. This is used by the _B+ Tree_ search algorithm to set the **location of the previous hit** so that the search can be resumed from the next _leaf index_ entry.

:::caution note

- This method is overloaded in type of the second argument
- The caller should allocate memory for the `struct IndexId` before calling the function.

:::

#### Arguments

| Name                  | Type                               | Description                                                                                                                                                |
| --------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table                                                                                             |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                                                                                                                    |
| searchIndex           | `IndexId*`                         | Pointer to struct IndexId using which the searchIndex field of the _Attribute Cache_ entry corresponding to the input relid and attribute is to be updated |

#### Return Values

| Value                          | Description                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::setSearchIndex(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Attribute Cache Table is free:
    {
        return E_RELNOTOPEN;
    }

    // iterate over all the attributes in the Attribute Cache Table corresponding to the relation with relId.
    {
        // if the attrName/offset field of the Attribute Catalog entry is equal to the input attrName/attrOffset:
        {
            // copy the input searchIndex variable to the searchIndex field of the corresponding Attribute Cache entry in the Attribute Cache Table.

            return SUCCESS;
        }
    }

    return E_ATTRNOTEXIST;

}
```

### AttrCacheTable :: resetSearchIndex

#### Description

Resets the value of `searchIndex` field of the given attribute in the specified relation from _Attribute Cache_ Table to `{-1, -1}`. This is used so that the B+ tree search can be restarted from the root.

:::caution note

- This method is overloaded in type of the second argument

:::

#### Arguments

| Name                  | Type                               | Description                                                    |
| --------------------- | ---------------------------------- | -------------------------------------------------------------- |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                        |

#### Return Values

| Value                          | Description                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::resetSearchIndex(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset) {

    // declare an IndexId having value {-1, -1}
    // set the search index to {-1, -1} using AttrCacheTable::setSearchIndex
    // return the value returned by setSearchIndex
}
```

### AttrCacheTable :: recordToAttrCacheEntry

#### Description

A utility function that converts a record, implemented as an array of `union Attribute`, to `AttrCacheEntry` structure. The record content is used to populate the `attrCatEntry` field. The `dirty`, `recId`, `searchIndex`, and next fields are initialized with default values of `false`, `{-1, -1}`, `{-1, -1}`, and `NULL`, respectively. This function can be used to convert the records in _Attribute Catalog_ block/blocks to the corresponding _Attribute Cache_ entries when caching a relation in _Attribute Cache_ Table. The details of the implementation are left to you.

:::caution note
The caller should allocate memory for the `struct AttrCacheEntry` and array of `union Attribute` before calling the function.
:::

#### Arguments

| Name           | Type                            | Description                                                                                 |
| -------------- | ------------------------------- | ------------------------------------------------------------------------------------------- |
| record         | `union Attribute[ATTRCAT_SIZE]` | The record which is to be converted to a _Attribute Cache_ entry.                           |
| attrCacheEntry | `AttrCacheEntry*`               | Pointer to struct AttrCacheEntry to which the contents of the input record is to be copied. |

#### Return Values

Nil

### AttrCacheTable :: attrCacheEntryToRecord

#### Description

A utility function that converts `AttrCacheEntry` structure to a record, implemented as an array of `union Attribute`. The record is populated with the contents of the `attrCatEntry` field. The `dirty`, `recId`, `searchIndex`, and next fields are used only during runtime and are not written to the disk. This function can be used to convert the _Attribute Cache_ entries to corresponding records that can be written back to _Attribute Catalog_ block/blocks when closing a relation in the cache memory. The details of the implementation are left to you.

:::caution note
The caller should allocate memory for the `struct AttrCacheEntry` and array of `union Attribute` before calling the function.
:::

#### Arguments

| Name           | Type                            | Description                                                            |
| -------------- | ------------------------------- | ---------------------------------------------------------------------- |
| attrCacheEntry | `AttrCacheEntry*`               | Pointer to struct AttrCacheEntry which is to be converted to a record. |
| record         | `union Attribute[ATTRCAT_SIZE]` | The record to which the given _Attribute Cache_ entry is to be copied. |

#### Return Values

Nil

---

## class OpenRelTable

NITCbase requires that a relation be **cached** for the duration it is accessed to improve the processing time. The _Open Relation Table_ is a data structure used as an interface for operations that accesses both _Relation Cache_ and _Attribute Cache_ together. The `OpenRelTable` class is used for this purpose. As per the NITCbase design, the ith entry of the OpenRelTable corresponds to the i<sup>th</sup> entry of the `RelCacheTable` and `AttrCacheTable` and is used to store the data of a single relation whose _relation id_ is `i`. The `public getRelId()` method of the `OpenRelTable` returns the _relation id_ of the input relation name.

The _class OpenRelTable_ contains as its `private` member field - `tableMetaInfo`, an array of `struct OpenRelTableMetaInfo` that stores the meta information of the entries of the table. The `OpenRelTable` allows `MAX_OPEN` number of entries in the cache at any given time. The first two entries of the Open Relation Table corresponding to `RELCAT_RELID` and `ATTRCAT_RELID` are reserved for storing the entries of _Relation Catalog_ relation and _Attribute Catalog_ relation, respectively. **These relations remain in cache memory throughout the session and can be closed only during shutdown.** The _`OpenRelTable` constructor_ initializes the `tableMetaInfo` field and populates the _Relation Cache_ Table and _Attribute Cache_ Table with entries of both _Relation Catalog_ relation and _Attribute Catalog_ relation. The _`OpenRelTable` destructor_ closes any open relation remaining, including the _Relation Catalog_ and _Attribute Catalog_ relations, when the system is shut down. The `public openRel()` and `public closeRel()` functions are used to open and close an entry in the _Open Relation_ Table respectively. `OpenRelTable` class is a _friend class_ to both `RelCacheTable` class, and `AtrrCacheTable` class. _This allows it to access the private fields and methods of the two classes._

:::info C++ Static Classes
`OpenRelTable` is a _static class_, i.e., all member fields and methods are declared `static`. Memory is allocated statically for all member fields of the class. This class uses _static methods_ to access the _static member fields_._Static methods_ are accessed using the semantics `class_name :: function_name()`. Only a **single static object** of the class needs to be created when NITCbase is running, whose sole purpose is to run the constructor and the destructor.
:::

The class definition of OpenRelTable is as given below:

```cpp
class OpenRelTable {

public:

    //methods
    OpenRelTable();
    ~OpenRelTable();
    static int getRelId(unsigned char relName[ATTR_SIZE]);
    static int openRel(unsigned char relName[ATTR_SIZE]);
    static int closeRel(int relId);

private:
    //field
    static OpenRelTableMetaInfo tableMetaInfo[MAX_OPEN];

    //method
    static int getFreeOpenRelTableEntry();

};
```

The following are the specifications for the methods in `class OpenRelTable`.

### OpenRelTable :: OpenRelTable (Constructor)

#### Description

Initializes the meta information of each entry of the _Open Relation_ Table to initial empty conditions. It also loads the entries of the _Relation Catalog_ relation and _Attribute Catalog_ relation to the _Relation Cache_ Table and _Attribute Cache_ Table. The first two entries corresponding to `RELCAT_RELID` and `ATTRCAT_RELID` in the all the three tables are reserved for _Relation Catalog_ relation and _Attribute Catalog_ relation, respectively.

:::caution Implementation Note

- The object of the `OpenRelTable` class must be declared **after** the objects of the Physical Layer and the Buffer Layer to ensure that the main memory is properly set up before the constructor initializes cache memory.
- This function should be called at the **beginning** of the session.

:::

#### Arguments

Nil

#### Return Values

Nil

#### Algorithm

```cpp
OpenRelTable::OpenRelTable() {

    // initialize tableMetaInfo of all the entries of the Open Relation Table with free as true and relName as an empty string. also set all entries in AttrCacheTable::attrCache to nullptr

    /************ Setting up Relation Catalog relation in the cache ************/

    /**** setting up Relation Catalog relation in the Relation Cache Table ****/

    /* read the record entry at index 0 from block 4, the block corresponding to Relation Catalog in the disk, and create a Relation Cache entry on it
       using RecBuffer::getRecord() and RelCacheTable::recordToRelCacheEntry().
       update the recId field of this Relation Cache entry to {4,0}.
       use it to set the 0th index entry of the RelCacheTable.*/

    /**** setting up Relation Catalog relation in the Attribute Cache Table ****/

    // let listHead be used to hold the head of the linked list of Attribute Cache entries.
    AttrCacheEntry listHead;

    for i from 0 to 5:
    {

             /* read the ith record entry from block 5, the block corresponding to Attribute Catalog in the disk, and create an Attribute Cache entry on it
           using RecBuffer::getRecord() and AttrCacheTable::recordToAttrCacheEntry().
           update the recId field of this Attribute Cache entry to {5,i}.
           add the Attribute Cache entry to the linked list of listHead .*/
    }

    // set the 0th entry of the AttrCacheTable to listHead.

    /**** setting up Relation Catalog relation in the Open Relation Table ****/

    //update the 0th entry of the tableMetaInfo with free as false and relName as the 'RELATIONCAT'.

    /************ Setting up Attribute Catalog relation in the cache ************/

    /**** setting up Attribute Catalog relation in the Relation Cache Table ****/

    /* read the record entry at index 1 from block 4, the block corresponding to Relation Catalog in the disk, and create a Relation Cache entry on it
       using RecBuffer::getRecord() and RelCacheTable::recordToRelCacheEntry().
       update the recId field of this Relation Cache entry to {4,1}.
       use it to set the 1st index entry of the RelCacheTable.*/

    /**** setting up Attribute Catalog relation in the Attribute Cache Table ****/

    // use listHead  to hold the head of the linked list of Attribute Cache entries.

    for i from 6 to 11:
    {

             /* read the ith record entry from bock 5, the block corresponding to Attribute Catalog in the disk, and create an Attribute Cache entry on it
           using RecBuffer::getRecord() and AttrCacheTable::recordToAttrCacheEntry().
           update the recId field of this Attribute Cache entry to {5,i}.
           add the Attribute Cache entry to the linked list of listHead .*/
    }

    // set the 1st entry of the AttrCacheTable to listHead.

    /**** setting up Attribute Catalog relation in the Open Relation Table ****/

    //update the 1st entry of the tableMetaInfo with free as false and relName as the 'ATTRIBUTECAT'.

}
```

### OpenRelTable :: ~OpenRelTable (Destructor)

#### Description

Closes the still open relations in the _Open Relation_ Table at the end of the current session.

:::caution Implementation Note
The object of the `OpenRelTable` class must be declared **after** the objects of the Physical Layer and the Buffer Layer to ensure that the destructor writes the cache contents to the main memory before the main memory is commited back to the disk.
:::

#### Arguments

Nil

#### Return Values

Nil

#### Algorithm

```cpp
OpenRelTable::~OpenRelTable() {

    for i from 2 to MAX_OPEN-1:
    {
        if ith relation is still open:
        {

            // close the relation using openRelTable::closeRel().

        }
    }

    /************ Closing Attribute Catalog relation in the cache ************/

    /****** releasing the entry corresponding to Attribute Catalog relation from Relation Cache Table ******/

    // if the Relation Catalog entry of the ATTRCAT_RELIDth Relation Cache entry has been modified:
    {
        /* Get the Relation Catalog entry from Cache using RelCacheTable::relCacheEntryToRecord().
        Write back that entry by instantiating RecBuffer class. Use recId member field and recBuffer.setRecord() */
    }

    /****** releasing the entry corresponding to Attribute Catalog relation from Attribute Cache Table ******/

    // iterate over all the entries in the linked list of the ATTRCAT_RELIDth Attribute Cache entry.
    {
        if the entry has been modified:
        {
            /* Get the Attribute Catalog entry from Cache using AttrCacheTable::attrCacheEntryToRecord().
             Write back that entry by instantiating RecBuffer class. Use recId member field and recBuffer.setRecord() */

        }

        // free the memory dynamically alloted to this entry in Attribute Cache linked list.
    }

    /****** updating metadata corresponding to Attribute Catalog relation in the Open Relation Table ******/

    //free the ATTRCAT_RELIDth entry of the tableMetaInfo.

    /************ Closing Relation Catalog relation in the cache ************/

    /****** releasing the entry corresponding to Relation Catalog relation from Relation Cache Table ******/

    // if the Relation Catalog entry of the RELCAT_RELIDth Relation Cache entry has been modified:
    {
        /* Get the Relation Catalog entry from Cache using RelCacheTable::relCacheEntryToRecord().
        Write back that entry by instantiating RecBuffer class. Use recId member field and recBuffer.setRecord() */
    }

    /****** releasing the entry corresponding to Relation Catalog relation from Attribute Cache Table ******/

    // iterate over all the entries in the linked list of the RELCAT_RELIDth Attribute Cache entry.
    {
        if the entry has been modified:
        {
            /* Get the Attribute Catalog entry from Cache using AttrCacheTable::attrCacheEntryToRecord().
            Write back that entry by instantiating RecBuffer class. Use recId member field and recBuffer.setRecord() */


        }

        // free the memory dynamically alloted to this entry in Attribute Cache linked list.
    }

    /****** updating metadata corresponding to Relation Catalog relation in the Open Relation Table ******/

    //free the RELCAT_RELIDth entry of the tableMetaInfo.

}
```

### OpenRelTable :: getRelId

#### Description

Returns the _relation id_, that is, the _index_, of the entry corresponding to the input relation in the _Open Relation_ Table.

#### Arguments

| Name    | Type                        | Description                                                                   |
| ------- | --------------------------- | ----------------------------------------------------------------------------- |
| relName | `unsigned char [ATTR_SIZE]` | Name of the relation whose relation id in the Open Relation Table is required |

#### Return Values

| Value                        | Description                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `relId`                      | The relation id of the relation in the Open Relation Table                                                                                                         |
| [`E_RELNOTOPEN`](/constants) | The relation corresponding to relationName do not have an open entry in the Open Relation Table. Use OpenRelTable::openRel() to load the relation to cache memory. |

#### Algorithm

```cpp
int OpenRelTable::getRelId(unsigned char relName[ATTR_SIZE]) {

    /* traverse through the tableMetaInfo array,
        find the entry in the Open Relation Table corresponding to relName.*/

    // if found return the relation id, else indicate that the relation do not have an entry in the Open Relation Table.

}
```

### OpenRelTable :: openRel

#### Description

Creates an entry for the input relation in the _Open Relation_ Table and returns the corresponding _relation id_.

#### Arguments

| Name    | Type                        | Description                                                                  |
| ------- | --------------------------- | ---------------------------------------------------------------------------- |
| relName | `unsigned char [ATTR_SIZE]` | Name of the relation whose entry is to be created in the Open Relation Table |

#### Return Values

| Value                         | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `relId`                       | Relation id of the relation in the Open Relation Table |
| [`E_RELNOTEXIST`](/constants) | No relation with name, relName, exists in the disk     |
| [`E_CACHEFULL`](/constants)   | No free entries left in the Open Relation Table        |

#### Algorithm

```cpp
int OpenRelTable::openRel(unsigned char relName[ATTR_SIZE]) {

    if the relation, relName, already has an entry in the Open Relation Table:
    { // checked using OpenRelTable::getRelId().

        // return that relation id;
    }

    // find a free slot in the Open Relation Table using OpenRelTable::getFreeOpenRelTableEntry().
    if free slot not available:
    {
        return E_CACHEFULL;
    }

    // let relId be used to store the free slot.
    int relId;

    /****** Setting up Relation Cache entry for the relation ******/

    /* search for the entry with relation name, relName, in the Relation Catalog using linear_search() of the Block Access Layer.
       care should be taken to reset the searchIndex of the relation, RELCAT_RELID, corresponding to
       Relation Catalog before calling linear_search().*/

    // let relcatRecId store the record id of the relation, relName, in the Relation Catalog.
    RecId relcatRecId;

    if relcatRecId == {-1, -1}:
    {
        // the relation is not found in the Relation Catalog.
        return E_RELNOTEXIST;
    }

    /* read the record entry corresponding to relcatRecId and create a Relation Cache entry on it
       using RecBuffer::getRecord() and RelCacheTable::recordToRelCacheEntry().
       update the recId field of this Relation Cache entry to relcatRecId.
       use the Relation Cache entry to set the relIdth entry of the RelCacheTable.*/

    /****** Setting up Attribute Cache entry for the relation ******/

    // let listHead be used to hold the head of the linked list of Attribute Cache entries.
    AttrCacheEntry listHead;

    /* iterate over all the entries in the Attribute Catalog corresponding to each attribute of
       the relation, relName by multiple calls of linear_search() of the Block Access Layer.
       care should be taken to reset the searchIndex of the relation, ATTRCAT_RELID, corresponding to
       Attribute Catalog before the first call to linear_search().*/
    {
                /* let attrcatRecId store a valid record id an entry of the relation, relName,
           in the Attribute Catalog.*/
        RecId attrcatRecId;

             /* read the record entry corresponding to attrcatRecId and create an Attribute Cache entry on it
           using RecBuffer::getRecord() and AttrCacheTable::recordToAttrCacheEntry().
           update the recId field of this Attribute Cache entry to attrcatRecId.
           add the Attribute Cache entry to the linked list of listHead .*/
    }

    // set the relIdth entry of the AttrCacheTable to listHead.

    /****** Setting up metadata in the Open Relation Table for the relation******/

    //update the relIdth entry of the tableMetaInfo with free as false and relName as the input.

    return relId;

}
```

### OpenRelTable :: closeRel

#### Description

Closes the entry of the input relation in the _Open Relation_ Table. **This function cannot close the _Relation Catalog_ relation and _Attribute Catalog_ relation**.

:::caution Note
This function cannot close the entries corresponding to `RELCAT_RELID` and `ATTRCAT_RELID`. These relations remain in the cache memory throughout the session and can only be closed at shutdown by the `OpenRelTable` destructor.
:::

#### Arguments

| Name  | Type  | Description                                           |
| ----- | ----- | ----------------------------------------------------- |
| relId | `int` | Relation id of a relation in the Open Relation Table. |

#### Return Values

| Value                          | Description                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully closed the entry of the relation in the Open Relation Table                                                                |
| [`E_NOTPERMITTED`](/constants) | _Relation Catalog_ and _Attribute Catalog_ relations cannot be closed during the session                                                |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                           |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the Open Relation Table. Use OpenRelTable::openRel() to load the relation to cache memory |

#### Algorithm

```cpp
int OpenRelTable::closeRel(int relId) {

    if relId is either RELCAT_RELID or ATTRCAT_RELID:
    {
        return E_NOTPERMITTED;
    }

    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }

    if entry corresponding to the relId in the Open Relation Table is free:
    {
        return E_RELNOTOPEN;
    }

    /****** Releasing the Relation Cache entry of the relation ******/

    // if the Relation Catalog entry of the relIdth Relation Cache entry has been modified:
    {
        /* Get the Relation Catalog entry from Cache using RelCacheTable::relCacheEntryToRecord().
        Write back that entry by instantiating RecBuffer class. Use recId member field and recBuffer.setRecord() */
    }

    // free the memory dynamically alloted to this Relation Cache entry
    // and assign nullptr to that entry

    /****** Releasing the Attribute Cache entry of the relation ******/

    // iterate over all the entries in the linked list of the relIdth Attribute Cache entry.
    {
        if the entry has been modified:
        {
            /* Get the Attribute Catalog entry from Cache using AttrCacheTable::attrCacheEntryToRecord().
             Write back that entry by instantiating RecBuffer class. Use recId member field and recBuffer.setRecord() */

        }

        // free the memory dynamically alloted to this entry in Attribute Cache linked list
        // and assign nullptr to that entry
    }

    /****** Updating metadata in the Open Relation Table of the relation  ******/

    //free the relIdth entry of the tableMetaInfo.

    return SUCCESS;

}
```

### OpenRelTable :: getFreeOpenRelTableEntry

#### Description

Returns _index_ of an **unoccupied entry** in the _Open Relation_ Table.

#### Arguments

Nil

#### Return Values

| Value                       | Description                                      |
| --------------------------- | ------------------------------------------------ |
| relId                       | Index of a free entry in the Open Relation Table |
| [`E_CACHEFULL`](/constants) | No free entries left in the Open Relation Table  |

#### Algorithm

```cpp
int OpenRelTable::getFreeOpenRelTableEntry() {

    /* traverse through the tableMetaInfo array,
        find a free entry in the Open Relation Table.*/

    // if found return the relation id, else return E_CACHEFULL.

}
```
