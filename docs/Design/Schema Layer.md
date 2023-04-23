---
sidebar_position: 4
title: "Schema Layer"
---

:::info note
The files corresponding to this layer can be found in the `Schema` directory. The code is to be written in the file `Schema.cpp`. The declaration for the functions can be found in the header file `Schema.h`.

[**The stub code for this layer can be found here.**](../Misc/stub/schema.md)
:::

## Layout

The SQL-Like queries that alter the schema of the database are converted into a sequence of schema layer function calls by front end. These schema layer function calls processes the **basic schema alteration requests to the database.**

The functions of Schema layer include:

1. [**createRel**](#schema--createrel)
2. [**deleteRel**](#schema--deleterel)
3. [**renameRel**](#schema--renamerel)
4. [**renameAttr**](#schema--renameattr)
5. [**createIndex**](#schema--createindex)
6. [**deleteIndex**](#schema--dropindex)
7. [**openRel**](#schema--openrel)
8. [**closeRel**](#schema--closerel)

The method `openRel` is used to the open a relations for access, `closeRel` to close a relation and `getSchema` to get the schema of the relation. NITCbase follows an Object-Oriented design for Schema Layer. The class definition is as shown below:

---

## class Schema

```cpp
class Schema {
public:
    static int createRel(char relName[], int numOfAttributes, char attrNames[][ATTR_SIZE], int attrType[]);
    static int deleteRel(char relName[ATTR_SIZE]);
    static int createIndex(char relName[ATTR_SIZE], char attrName[ATTR_SIZE]);
    static int dropIndex(char relName[ATTR_SIZE], char attrName[ATTR_SIZE]);
    static int renameRel(char oldRelName[ATTR_SIZE], char newRelName[ATTR_SIZE]);
    static int renameAttr(char relName[ATTR_SIZE], char oldAttrName[ATTR_SIZE], char newAttrName[ATTR_SIZE]);
    static int openRel(char relName[ATTR_SIZE]);
    static int closeRel(char relName[ATTR_SIZE]);
    static int getSchema(char relName[ATTR_SIZE], AttrCatEntry** attributesPtr, int* numAttrsPtr);
};
```

### Schema :: createRel()

#### Description

This method creates a new relation with the name, attribute/column list as specified in arguments. Verifying the maximum number of attributes in a relation is to be checked by the caller of this function (Frontend Interface) and is not handled by this function.

#### Arguments

| **Name** | **Type**            | **Description**                                                     |
| -------- | ------------------- | ------------------------------------------------------------------- |
| relName  | `char[ATTR_SIZE]`   | Name of the relation/table to be created                            |
| nAttrs   | `int`               | Number of attributes of the relation to be created                  |
| attrs    | `char[][ATTR_SIZE]` | Names of each attribute of the relation                             |
| attrtype | `int[]`             | Data type of each attribute, in the same order as the `attrs` array |

#### Return value

| **Value**                       | **Description**                                                |
| ------------------------------- | -------------------------------------------------------------- |
| [`SUCCESS`](/constants)         | On successful creation of the relation                         |
| [`E_RELEXIST`](/constants)      | If the relation with name relName already exists.              |
| [`E_DUPLICATEATTR`](/constants) | If two of any two of the given attributes have same name.      |
| [`E_DISKFULL`](/constants)      | If disk space is not sufficient for creating the new relation. |
| [E_MAXRELATIONS](/constants)    | If maximum number of relations possible already exists         |

#### Algorithm

```cpp
int createRel(char relName[],int nAttrs, char attrs[][ATTR_SIZE],int attrtype[]){

    // declare variable relNameAsAttribute of type Attribute
    // copy the relName into relNameAsAttribute.sVal

    // declare a variable targetRelId of type RecId

    /*
        Reset the searchIndex using RelCacheTable::resetSearhIndex()
        Search the relation catalog (relId given by the constant RELCAT_RELID)
        for attribute value attribute "RelName" = relNameAsAttribute using
        BlockAccess::linearSearch() with OP = EQ
    */

    // if a relation with name `relName` already exists  ( linearSearch() does
    //                                                     not return {-1,-1} )
    //     return E_RELEXIST;

    // compare every pair of attributes of attrNames[] array
    // if any attribute names have same string value,
    //     return E_DUPLICATEATTR (i.e 2 attributes have same value)

    /* declare relCatRecord of type Attribute which will be used to store the
       record corresponding to the new relation which will be inserted
       into relation catalog */
    Attribute relCatRecord[RELCAT_NO_ATTRS];
    // fill relCatRecord fields as given below
    // offset RELCAT_REL_NAME_INDEX: relName
    // offset RELCAT_NO_ATTRIBUTES_INDEX: numOfAttributes
    // offset RELCAT_NO_RECORDS_INDEX: 0
    // offset RELCAT_FIRST_BLOCK_INDEX: -1
    // offset RELCAT_LAST_BLOCK_INDEX: -1
    // offset RELCAT_NO_SLOTS_PER_BLOCK_INDEX: floor((2016 / (16 * nAttrs + 1)))
    // (number of slots is calculated as specified in the physical layer docs)

    // retVal = BlockAccess::insert(RELCAT_RELID(=0), relCatRecord);
    // if BlockAccess::insert fails return retVal
    // (this call could fail if there is no more space in the relation catalog)

    // iterate through 0 to numOfAttributes - 1 :
    {
        /* declare Attribute attrCatRecord[6] to store the attribute catalog
           record corresponding to i'th attribute of the argument passed*/
        // (where i is the iterator of the loop)
        // fill attrCatRecord fields as given below
        // offset ATTRCAT_REL_NAME_INDEX: relName
        // offset ATTRCAT_ATTR_NAME_INDEX: attrNames[i]
        // offset ATTRCAT_ATTR_TYPE_INDEX: attrTypes[i]
        // offset ATTRCAT_PRIMARY_FLAG_INDEX: -1
        // offset ATTRCAT_ROOT_BLOCK_INDEX: -1
        // offset ATTRCAT_OFFSET_INDEX: i

        // retVal = BlockAccess::insert(ATTRCAT_RELID(=1), attrCatRecord);
        /* if attribute catalog insert fails:
             delete the relation by calling deleteRel(targetrel) of schema layer
             return E_DISKFULL
             // (this is necessary because we had already created the
             //  relation catalog entry which needs to be removed)
        */
    }

    // return SUCCESS
}
```

---

### Schema :: deleteRel()

#### Description

This method deletes the relation with name as specified in arguments.

#### Arguments

| **Name** | **Type**          | **Description**                    |
| -------- | ----------------- | ---------------------------------- |
| relName  | `char[ATTR_SIZE]` | Name of the relation to be deleted |

#### Return value

| **Value**                      | **Description**                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful deletion of the relation.                                                                     |
| [`E_RELOPEN`](/constants)      | If the relation is open.                                                                                    |
| [`E_RELNOTEXIST`](/constants)  | If the relation does not exist                                                                              |
| [`E_NOTPERMITTED`](/constants) | If relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e., when the user tries to delete the catalogs. |

#### Algorithm

```cpp
int Schema::deleteRel(char *relName) {
    // if the relation to delete is either Relation Catalog or Attribute Catalog,
    //     return E_NOTPERMITTED
        // (check if the relation names are either "RELATIONCAT" and "ATTRIBUTECAT".
        // you may use the following constants: RELCAT_NAME and ATTRCAT_NAME)

    // get the rel-id using appropriate method of OpenRelTable class by
    // passing relation name as argument

    // if relation is opened in open relation table, return E_RELOPEN

    // Call BlockAccess::deleteRelation() with appropriate argument.

    // return the value returned by the above deleteRelation() call

    /* the only that should be returned from deleteRelation() is E_RELNOTEXIST.
       The deleteRelation call may return E_OUTOFBOUND from the call to
       loadBlockAndGetBufferPtr, but if your implementation so far has been
       correct, it should not reach that point. That error could only occur
       if the BlockBuffer was initialized with an invalid block number.
    */
}
```

---

### Schema :: createIndex()

#### Description

This method creates a bplus indexing on an attribute attrName in a relation relName as specified in arguments.

#### Arguments

| **Name** | **Type**           | **Description**                                                     |
| -------- | ------------------ | ------------------------------------------------------------------- |
| relName  | `char[ATTR_SIZE]`  | Name of the relation that contains the attribute to create index on |
| attrName | `char [ATTR_SIZE]` | Attribute to create index on                                        |

#### Return value

| **Value**                      | **Description**                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful creation of B+ tree.                                                                                      |
| [`E_RELNOTOPEN`](/constants)   | If the relation is not open.                                                                                            |
| [`E_ATTRNOTEXIST`](/constants) | If the attribute with name attrName does not exist.                                                                     |
| [`E_DISKFULL`](/constants)     | If there is no enough space in the disk to create the tree                                                              |
| [`E_NOTPERMITTED`](/constants) | If the relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e, when the user tries to create an index for catalogs. |

#### Algorithm

```cpp
int createIndex(char relName[ATTR_SIZE],char attrName[ATTR_SIZE]){
    // if the relName is either Relation Catalog or Attribute Catalog,
        // return E_NOTPERMITTED
        // (check if the relation names are either "RELATIONCAT" and "ATTRIBUTECAT".
        // you may use the following constants: RELCAT_NAME and ATTRCAT_NAME)

    // get the relation's rel-id using OpenRelTable::getRelId() method

    // if relation is not open in open relation table, return E_RELNOTOPEN
    // (check if the value returned from getRelId function call = E_RELNOTOPEN)

    // create a bplus tree using BPlusTree::bPlusCreate() and return the value
    return BPlusTree::bPlusCreate(relId, attrName);
}
```

---

### Schema :: dropIndex()

#### Description

This method drops the bplus indexing on an attribute attrName in a relation relName as specified in arguments.

#### Arguments

| **Name** | **Type**           | **Description**                                                     |
| -------- | ------------------ | ------------------------------------------------------------------- |
| relName  | `char[ATTR_SIZE]`  | Name of the relation that contains the attribute to remove index of |
| attrName | `char [ATTR_SIZE]` | Attribute to remove index of                                        |

#### Return value

| **Value**                      | **Description**                                               |
| ------------------------------ | ------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful deletion of the B+ tree                         |
| [`E_RELNOTOPEN`](/constants)   | If the relation is not open.                                  |
| [`E_ATTRNOTEXIST`](/constants) | If the attribute with name attrName does not exist.           |
| [`E_NOINDEX`](/constants)      | If there is no index on the given attribute of the relation   |
| [`E_NOTPERMITTED`](/constants) | If the relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. |

#### Algorithm

```cpp
int Schema::dropIndex(char *relName, char *attrName) {
    // if the relName is either Relation Catalog or Attribute Catalog,
        // return E_NOTPERMITTED
        // (check if the relation names are either "RELATIONCAT" and "ATTRIBUTECAT".
        // you may use the following constants: RELCAT_NAME and ATTRCAT_NAME)

    // get the rel-id using OpenRelTable::getRelId()

    // if relation is not open in open relation table, return E_RELNOTOPEN
    // (check if the value returned from getRelId function call = E_RELNOTOPEN)

    // get the attribute catalog entry corresponding to the attribute
    // using AttrCacheTable::getAttrCatEntry()

    // if getAttrCatEntry() fails, return E_ATTRNOTEXIST

    int rootBlock = /* get the root block from attrcat entry */;

    if (/* attribute does not have an index (rootBlock = -1) */) {
        return E_NOINDEX;
    }

    // destroy the bplus tree rooted at rootBlock using BPlusTree::bPlusDestroy()
    BPlusTree::bPlusDestroy(rootBlock);

    // set rootBlock = -1 in the attribute cache entry of the attribute using
    // AttrCacheTable::setAttrCatEntry()

    return SUCCESS;
}
```

---

### Schema :: renameRel()

#### Description

This method changes the relation name of specified relation to new name as specified in arguments.

#### Arguments

| **Name**   | **Type**          | **Description**                                       |
| ---------- | ----------------- | ----------------------------------------------------- |
| oldRelName | `char[ATTR_SIZE]` | Old Name of relation of which name has to be changed. |
| newRelName | `char[ATTR_SIZE]` | New name for the relation.                            |

#### Return value

| **Value**                      | **Description**                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful renaming of the relation                                                                                      |
| [`E_RELOPEN`](/constants)      | If the relation is open.                                                                                                    |
| [`E_RELNOTEXIST`](/constants)  | If the relation with name oldRelName does not exist                                                                         |
| [`E_RELEXIST`](/constants)     | If the relation with name newRelName already exists                                                                         |
| [`E_NOTPERMITTED`](/constants) | If the oldRelName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e, when the user tries to rename either of the catalogs. |

#### Algorithm

```cpp
int renameRel(char oldRelName[ATTR_SIZE], char newRelName[ATTR_SIZE]) {
    // if the oldRelName or newRelName is either Relation Catalog or Attribute Catalog,
        // return E_NOTPERMITTED
        // (check if the relation names are either "RELATIONCAT" and "ATTRIBUTECAT".
        // you may use the following constants: RELCAT_NAME and ATTRCAT_NAME)

    // if the relation is open
    //    (check if OpenRelTable::getRelId() returns E_RELNOTOPEN)
    //    return E_RELOPEN

    // retVal = BlockAccess::renameRelation(oldRelName, newRelName);
    // return retVal
}
```

---

### Schema :: renameAttr()

#### Description

This method changes the name of an attribute/column present in a specified relation, to new name as specified in arguments.

#### Arguments

| **Name**    | **Type**          | **Description**         |
| ----------- | ----------------- | ----------------------- |
| relName     | `char[ATTR_SIZE]` | Name of the relation.   |
| oldAttrName | `char[ATTR_SIZE]` | Old Name of attribute.  |
| newAttrName | `char[ATTR_SIZE]` | New name for attribute. |

#### Return value

| **Value**                      | **Description**                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful renaming of the attribute                                                                                                         |
| [`E_RELOPEN`](/constants)      | If the relation is open.                                                                                                                        |
| [`E_RELNOTEXIST`](/constants)  | If the relation with name relName does not exist                                                                                                |
| [`E_ATTRNOTEXIST`](/constants) | If the attribute with name oldAttrName does not exist                                                                                           |
| [`E_ATTREXIST`](/constants)    | If the attribute with name newAttrName already exists                                                                                           |
| [`E_NOTPERMITTED`](/constants) | If the relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e, when the user tries to rename any attribute value of either of the catalogs. |

#### Algorithm

```cpp
int Schema::renameAttr(char *relName, char *oldAttrName, char *newAttrName) {
    // if the relName is either Relation Catalog or Attribute Catalog,
        // return E_NOTPERMITTED
        // (check if the relation names are either "RELATIONCAT" and "ATTRIBUTECAT".
        // you may use the following constants: RELCAT_NAME and ATTRCAT_NAME)

    // if the relation is open
        //    (check if OpenRelTable::getRelId() returns E_RELNOTOPEN)
        //    return E_RELOPEN

    // Call BlockAccess::renameAttribute with appropriate arguments.

    // return the value returned by the above renameAttribute() call
}
```

---

### Schema :: openRel()

#### Description

This method opens the relation specified as name in cache/OpenRelTable.

#### Arguments

| **Name** | **Type**          | **Description**                   |
| -------- | ----------------- | --------------------------------- |
| relName  | `char[ATTR_SIZE]` | Name of the relation to be opened |

#### Return value

| **Value**                     | **Description**                                                |
| ----------------------------- | -------------------------------------------------------------- |
| [`SUCCESS`](/constants)       | On successful opening of the relation                          |
| [`E_RELNOTEXIST`](/constants) | If the relation with name `relName` does not exist in the disk |
| [`E_CACHEFULL`](/constants)   | If there are no free slots in the Open Relation table.         |

#### Algorithm

```cpp
int Schema::openRel(char *relName) {
    // Call openRelation method of OpenRelTable by passing appropriate arguments
    int relId = OpenRelTable::openRel(relName);

    // if relId is valid (>= 0) return SUCCESS
    // else return the error
}
```

---

### Schema :: closeRel()

#### Description

This method closes the relation specified as name in cache/OpenRelTable.

#### Arguments

| **Name** | **Type**          | **Description**                   |
| -------- | ----------------- | --------------------------------- |
| relName  | `char[ATTR_SIZE]` | Name of the relation to be closed |

#### Return value

| **Value**                      | **Description**                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful closing of the relation                                                                                   |
| [`E_RELNOTOPEN`](/constants)   | If relation with given name is not open                                                                                 |
| [`E_NOTPERMITTED`](/constants) | If the relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e, when the user tries to close either of the catalogs. |

#### Algorithm

```cpp
int closeRel(char relName[ATTR_SIZE]) {
    // if the relName is either Relation Catalog or Attribute Catalog,
        // return E_NOTPERMITTED
        // (check if the relation names are either "RELATIONCAT" and "ATTRIBUTECAT".
        // you may use the following constants: RELCAT_NAME and ATTRCAT_NAME)

    // get the relation's rel-id using OpenRelTable::getRelationId() method

    // if relation is not open in open relation table, return E_RELNOTOPEN
    // (check if the value returned from getRelId function call = E_RELNOTOPEN)

    // close the relId'th relation using OpenRelTable::closeRelation()
    // let the return value be retVal
    // return retVal;
}
```
