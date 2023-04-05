---
title: "class AttrCacheTable"
sidebar_position: 3
---

The `class AttrCacheTable` is used to cache _Attribute Catalog_ entries of the attributes of open relations in NITCbase. The first two entries of the _Attribute Cache_ Table corresponding to `RELCAT_RELID` and `ATTRCAT_RELID` are reserved for storing the entries of _Relation Catalog_ relation and _Attribute Catalog_ relation, respectively. **These are loaded into the cache by the _`OpenRelTable` constructor_ at the start of the session. These relations remain in the cache memory throughout the session and can only be closed by the _`OpenRelTable` destructor_ during shutdown.**

The class contains a `private` member field, `attrCache`, which is an array of pointers to `struct AttrCacheEntry` with size `MAX_OPEN`. For each relation opened, an entry is made in the array `attrCache`, at the index given by _relation id_ of the relation. This entry is the head of the linked list of `struct AttrCacheEntry` elements. A linked list is used because a relation can have variable number of attributes (though the maximum number of attributes for a relation is bounded in Nitcbase by 125 - why?). **Each element in the linked list corresponds to an attribute of the relation.**

The class provides `public` _overloaded methods_ - `getAttrCatEntry()` and `setAttrCatEntry()` to retrieve and update the _Attribute Catalog_ entry of a relation's attribute in the _Attribute Cache_ Table. The class also provides _overloaded_ `public` methods - `getSearchIndex()` and `setSearchIndex()` for retrieving and updating the `searchIndex` field of _Attribute Cache_ Entry.

The `private` method `recordToAttrCatEntry()` is used to convert a record (implemented as an array of union Attribute) to `AttrCatEntry` structure. This function is called by the _friend class_, `OpenRelTable`, while opening a relation. Similarly, the `private` method `attrCatEntryToRecord()` is used to convert `AttrCatEntry` structure in to a record. This function is also called from the _friend class_, `OpenRelTable`, while closing a relation.

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
  static void recordToAttrCatEntry(union Attribute record[ATTRCAT_NO_ATTRS], AttrCatEntry *attrCatEntry);
  static void attrCatEntryToRecord(AttrCatEntry *attrCatEntry, union Attribute record[ATTRCAT_NO_ATTRS]);

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

| **Name**              | **Type**                           | **Description**                                                                                                                      |
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table                                                                       |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                                                                                              |
| attrCatBuf            | `AttrCatEntry*`                    | Pointer to struct AttrCatEntry to which the _Attribute Catalog_ entry corresponding to the input relid and attribute is to be copied |

#### Return Values

| **Value**                      | **Description**                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::getAttrCatEntry(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  for(/*all attributes corresponding to relation with relId */)
  {
    if (/* attrName/offset field of the AttrCatEntry
        is equal to the input attrName/attrOffset */)
    {
      // copy that Attribute Catalog entry in the Attribute Cache Table to
      // attrCatBuf.

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

| **Name**              | **Type**                           | **Description**                                                                                                                          |
| --------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table                                                                           |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                                                                                                  |
| attrCatBuf            | `AttrCatEntry*`                    | Pointer to `struct AttrCatEntry` using which the _Attribute Catalog_ entry corresponding to input `relId` and attribute is to be updated |

#### Return Values

| **Value**                      | **Description**                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::setAttrCatEntry(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  for(/*all attributes corresponding to relation with relId */)
  {
    if(/* the attrName/offset field of the AttrCatEntry
       is equal to the input attrName/attrOffset */)
    {
      // copy the attrCatBuf to the corresponding Attribute Catalog entry in
      // the Attribute Cache Table.

      // set the dirty flag of the corresponding Attribute Cache entry in the
      // Attribute Cache Table.

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

| **Name**              | **Type**                           | **Description**                                                                                                                                        |
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table                                                                                         |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                                                                                                                |
| searchIndex           | `IndexId*`                         | Pointer to struct IndexId to which the searchIndex field of the _Attribute Cache_ entry corresponding to the input relid and attribute is to be copied |

#### Return Values

| **Value**                      | **Description**                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::getSearchIndex(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  for(/*all attributes corresponding to relation with relId */)
  {
    if (/* attrName/offset field of the AttrCatEntry
        is equal to the input attrName/attrOffset */)
    {
      //copy the searchIndex field of the corresponding Attribute Cache entry
      //in the Attribute Cache Table to input searchIndex variable.

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

| **Name**              | **Type**                           | **Description**                                                                                                                                            |
| --------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table                                                                                             |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                                                                                                                    |
| searchIndex           | `IndexId*`                         | Pointer to struct IndexId using which the searchIndex field of the _Attribute Cache_ entry corresponding to the input relid and attribute is to be updated |

#### Return Values

| **Value**                      | **Description**                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | Successfully copied the _Attribute Catalog_ entry                                                                                            |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                                |
| [`E_RELNOTOPEN`](/constants)   | Entry corresponding to input relId is free in the _Attribute Cache_ Table. Use OpenRelTable::openRel() to load the relation to cache memory. |
| [`E_ATTRNOTEXIST`](/constants) | No attribute with the input attribute name or offset exists                                                                                  |

#### Algorithm

```cpp
int AttrCacheTable::setSearchIndex(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  for(/*all attributes corresponding to relation with relId */)
  {
    if (/* attrName/offset field of the AttrCatEntry
        is equal to the input attrName/attrOffset */)
    {
      // copy the input searchIndex variable to the searchIndex field of the
      //corresponding Attribute Cache entry in the Attribute Cache Table.

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

| **Name**              | **Type**                           | **Description**                                                |
| --------------------- | ---------------------------------- | -------------------------------------------------------------- |
| relId                 | `int`                              | The relation id of the relation in the _Attribute Cache_ Table |
| attrName / attrOffset | `unsigned char[ATTR_SIZE]` / `int` | The name/offset of the target attribute                        |

#### Return Values

| **Value**                      | **Description**                                                                                                                              |
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

### AttrCacheTable :: recordToAttrCatEntry

#### Description

A utility function that converts a record, implemented as an array of `union Attribute`, to `AttrCatEntry` structure. This function can be used to convert the records in _Attribute Catalog_ block/blocks to the corresponding _Attribute Cache_ entries when caching a relation in _Attribute Cache_ Table. The details of the implementation are left to you.

:::caution note
The caller should allocate memory for the `struct AttrCatEntry` and array of `union Attribute` before calling the function.
:::

#### Arguments

| **Name**     | **Type**                        | **Description**                                                                             |
| ------------ | ------------------------------- | ------------------------------------------------------------------------------------------- |
| record       | `union Attribute[ATTRCAT_SIZE]` | The record which is to be converted to an `AttrCatEntry`.                                   |
| attrCatEntry | `AttrCatEntry*`                 | Pointer to struct `AttrCatEntry` to which the contents of the input record is to be copied. |

#### Return Values

Nil

### AttrCacheTable :: attrCatEntryToRecord

#### Description

A utility function that converts `AttrCatEntry` structure to a record, implemented as an array of `union Attribute`. This function can be used to convert the _Attribute Cache_ entries to corresponding records that can be written back to _Attribute Catalog_ block/blocks when closing a relation in the cache memory. The details of the implementation are left to you.

:::caution note
The caller should allocate memory for the `struct AttrCacheEntry` and array of `union Attribute` before calling the function.
:::

#### Arguments

| **Name**     | **Type**                        | **Description**                                                        |
| ------------ | ------------------------------- | ---------------------------------------------------------------------- |
| attrCatEntry | `AttrCatEntry*`                 | Pointer to struct `AttrCatEntry` which is to be converted to a record. |
| record       | `union Attribute[ATTRCAT_SIZE]` | The record to which the given `AttrCatEntry` entry is to be copied.    |

#### Return Values

Nil

---
