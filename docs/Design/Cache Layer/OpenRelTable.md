---
title: "class OpenRelTable"
sidebar_position: 4
---

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
- All the relation and attribute cache entries need to be dynamically allocated using `malloc`

:::

#### Arguments

Nil

#### Return Values

Nil

#### Algorithm

```cpp
OpenRelTable::OpenRelTable() {

    /* initialize tableMetaInfo of all the entries of the Open Relation Table with
    free as true and relName as an empty string. also set all entries in
    AttrCacheTable::attrCache to nullptr */

    /************ Setting up the Relation Cache ************/

    /**** setting up Relation Catalog relation in the Relation Cache ****/

    /* read the record entry at index 0 from block 4, the block corresponding to
     Relation Catalog in the disk, and create a Relation Cache entry on it
     using RecBuffer::getRecord() and RelCacheTable::recordToRelCatEntry().
     update the recId field of this Relation Cache entry to {4,0}.
     use it to set the 0th index entry of the RelCacheTable. */
    // NOTE: use malloc to create the RelCacheEntry

    /**** setting up Attribute Catalog relation in the Relation Cache ****/

    /* read the record entry at index 1 from block 4, the block corresponding to
     Relation Catalog in the disk, and create a Relation Cache entry on it
     using RecBuffer::getRecord() and RelCacheTable::recordToRelCatEntry().
     update the recId field of this Relation Cache entry to {4,1}.
     use it to set the 1st index entry of the RelCacheTable.*/


    /************ Setting up the Attribute cache ************/

    /**** setting up Relation Catalog relation in the Attribute Cache ****/

    // listHead will hold the head of the linked list of Attribute Cache entries.
    AttrCacheEntry* listHead;

    for i from 0 to 5:
    {
      /* read the ith record entry from block 5, the block corresponding to
      Attribute Catalog in the disk, and create an Attribute Cache entry on it
      using RecBuffer::getRecord() and AttrCacheTable::recordToAttrCatEntry().
      update the recId field of this Attribute Cache entry to {5,i}.
      add the Attribute Cache entry to the linked list of listHead .*/
      // NOTE: use malloc to create the AttrCacheTable entries
    }

    // set the 0th entry of the AttrCacheTable to listHead.


    /**** setting up Attribute Catalog relation in the Attribute Cache ****/

    for i from 6 to 11:
    {
      /* read the ith record entry from block 5, the block corresponding to
      Attribute Catalog in the disk, and create an Attribute Cache entry on it
      using RecBuffer::getRecord() and AttrCacheTable::recordToAttrCatEntry().
      update the recId field of this Attribute Cache entry to {5,i}.
      add the Attribute Cache entry to the linked list of listHead .*/
    }

    // set the 1st entry of the AttrCacheTable to listHead.


    /************ Setting up the Open Relation table ************/

    /**** setting up Relation Catalog relation in the Open Relation Table ****/

    //update the 0th entry of the tableMetaInfo with free as false and relName
    // as 'RELATIONCAT'.

    /**** setting up Attribute Catalog relation in the Open Relation Table ****/

    //update the 1st entry of the tableMetaInfo with free as false and relName
    // as 'ATTRIBUTECAT'.

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

    /**** Closing the catalog relations in the relation cache ****/

    //releasing the relation cache entry of the attribute catalog

    if (/* RelCatEntry of the ATTRCAT_RELID-th RelCacheEntry has been modified */) {

        /* Get the Relation Catalog entry from RelCacheTable::relCache
        Then convert it to a record using RelCacheTable::relCatEntryToRecord(). */

        // declaring an object of RecBuffer class to write back to the buffer
        RecBuffer relCatBlock(recId.block);

        // Write back to the buffer using relCatBlock.setRecord() with recId.slot
    }
    // free the memory dynamically allocated to this RelCacheEntry


    //releasing the relation cache entry of the relation catalog

    if(/* RelCatEntry of the RELCAT_RELID-th RelCacheEntry has been modified */) {

        /* Get the Relation Catalog entry from RelCacheTable::relCache
        Then convert it to a record using RelCacheTable::relCatEntryToRecord(). */

        // declaring an object of RecBuffer class to write back to the buffer
        RecBuffer relCatBlock(recId.block);

        // Write back to the buffer using relCatBlock.setRecord() with recId.slot
    }
    // free the memory dynamically allocated for this RelCacheEntry


    // free the memory allocated for the attribute cache entries of the
    // relation catalog and the attribute catalog
}
```

<details>
<summary>

**NOTE**: Currently, neither the attribute cache entry of the relation catalog nor the attribute cache entry of the attribute catalog can have runtime modifications. This is because the attribute cache is only updated when an index is created/deleted for a relation (and `rootBlock` is set). This operation is not permitted for the catalogs. If, in a future design update, the attribute cache entries of the catalogs are modified, the following code can be included in the destructor to handle write-back for the same.

(click to view code)

</summary>

```cpp
    /************ Closing the catalog relations in the attribute cache ************/

    /****** releasing the entry corresponding to Attribute Catalog relation from Attribute Cache Table ******/

    // for all the entries in the linked list of the ATTRCAT_RELIDth Attribute Cache entry.
    {
        if (/* the entry has been modified */)
        {
            /* Get the Attribute Catalog entry from Cache using AttrCacheTable::attrCatEntryToRecord().
            Write back that entry by instantiating RecBuffer class. Use recId member
            field and recBuffer.setRecord() */
        }

        // free the memory dynamically alloted to this entry in Attribute Cache linked list.
    }

    /****** releasing the entry corresponding to Relation Catalog relation from Attribute Cache Table ******/

    // for all the entries in the linked list of the RELCAT_RELIDth Attribute Cache entry.
    {
        if (/* the entry has been modified */) {

            /* Get the Attribute Catalog entry from Cache using AttrCacheTable::attrCatEntryToRecord().
            Write back that entry by instantiating RecBuffer class. Use recId
            member field and recBuffer.setRecord() */
        }

        // free the memory dynamically alloted to this entry in Attribute Cache linked list.
    }
```

</details>

### OpenRelTable :: getRelId

#### Description

Returns the _relation id_, that is, the _index_, of the entry corresponding to the input relation in the _Open Relation_ Table.

#### Arguments

| Name    | Type                        | Description                                                                   |
| ------- | --------------------------- | ----------------------------------------------------------------------------- |
| relName | `unsigned char [ATTR_SIZE]` | Name of the relation whose relation id in the Open Relation Table is required |

#### Return Values

| Value                        | Description                                                                                                                                                        | cache entries |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `relId`                      | The relation id of the relation in the Open Relation Table                                                                                                         |
| [`E_RELNOTOPEN`](/constants) | The relation corresponding to relationName do not have an open entry in the Open Relation Table. Use OpenRelTable::openRel() to load the relation to cache memory. |

#### Algorithm

```cpp
int OpenRelTable::getRelId(unsigned char relName[ATTR_SIZE]) {

  /* traverse through the tableMetaInfo array,
    find the entry in the Open Relation Table corresponding to relName.*/

  // if found return the relation id, else indicate that the relation do not
  // have an entry in the Open Relation Table.
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

| Value                         | Description                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `relId`                       | Relation id of the relation in the Open Relation Table. This is a value between 0 and [MAX_OPEN](/constants) |
| [`E_RELNOTEXIST`](/constants) | No relation with name, relName, exists in the disk                                                           |
| [`E_CACHEFULL`](/constants)   | No free entries left in the Open Relation Table                                                              |

#### Algorithm

```cpp
int OpenRelTable::openRel(unsigned char relName[ATTR_SIZE]) {

  if(/* the relation `relName` already has an entry in the Open Relation Table */){
    // (checked using OpenRelTable::getRelId())

    // return that relation id;
  }

  /* find a free slot in the Open Relation Table
     using OpenRelTable::getFreeOpenRelTableEntry(). */

  if (/* free slot not available */){
    return E_CACHEFULL;
  }

  // let relId be used to store the free slot.
  int relId;

  /****** Setting up Relation Cache entry for the relation ******/

  /* search for the entry with relation name, relName, in the Relation Catalog using
      BlockAccess::linearSearch().
      Care should be taken to reset the searchIndex of the relation RELCAT_RELID
      before calling linearSearch().*/

  // relcatRecId stores the rec-id of the relation `relName` in the Relation Catalog.
  RecId relcatRecId;

  if (/* relcatRecId == {-1, -1} */) {
    // (the relation is not found in the Relation Catalog.)
    return E_RELNOTEXIST;
  }

  /* read the record entry corresponding to relcatRecId and create a relCacheEntry
      on it using RecBuffer::getRecord() and RelCacheTable::recordToRelCatEntry().
      update the recId field of this Relation Cache entry to relcatRecId.
      use the Relation Cache entry to set the relId-th entry of the RelCacheTable.
    NOTE: make sure to allocate memory for the RelCacheEntry using malloc()
  */

  /****** Setting up Attribute Cache entry for the relation ******/

  // let listHead be used to hold the head of the linked list of attrCache entries.
  AttrCacheEntry* listHead;

  /*iterate over all the entries in the Attribute Catalog corresponding to each
  attribute of the relation relName by multiple calls of BlockAccess::linearSearch()
  care should be taken to reset the searchIndex of the relation, ATTRCAT_RELID,
  corresponding to Attribute Catalog before the first call to linearSearch().*/
  {
      /* let attrcatRecId store a valid record id an entry of the relation, relName,
      in the Attribute Catalog.*/
      RecId attrcatRecId;

      /* read the record entry corresponding to attrcatRecId and create an
      Attribute Cache entry on it using RecBuffer::getRecord() and
      AttrCacheTable::recordToAttrCatEntry().
      update the recId field of this Attribute Cache entry to attrcatRecId.
      add the Attribute Cache entry to the linked list of listHead .*/
      // NOTE: make sure to allocate memory for the AttrCacheEntry using malloc()
  }

  // set the relIdth entry of the AttrCacheTable to listHead.

  /****** Setting up metadata in the Open Relation Table for the relation******/

  // update the relIdth entry of the tableMetaInfo with free as false and
  // relName as the input.

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

    if (/* RelCatEntry of the relIdth Relation Cache entry has been modified */)
    {
        /* Get the Relation Catalog entry from RelCacheTable::relCache
        Then convert it to a record using RelCacheTable::relCatEntryToRecord(). */

        // declaring an object of RecBuffer class to write back to the buffer
        RecBuffer relCatBlock(recId.block);

        // Write back to the buffer using relCatBlock.setRecord() with recId.slot
    }

    // free the memory dynamically alloted to this Relation Cache entry
    // and assign nullptr to that entry

    /****** Releasing the Attribute Cache entry of the relation ******/

    // for all the entries in the linked list of the relIdth Attribute Cache entry.
    {
        if the entry has been modified:
        {
            /* Get the Attribute Catalog entry from attrCache
             Then convert it to a record using AttrCacheTable::attrCatEntryToRecord().
             Write back that entry by instantiating RecBuffer class. Use recId
             member field and recBuffer.setRecord() */
        }

        // free the memory dynamically alloted to this entry in Attribute
        // Cache linked list and assign nullptr to that entry
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
