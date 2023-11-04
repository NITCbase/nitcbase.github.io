---
sidebar_position: 3
title: "Algebra Layer"
---

:::info note
The files corresponding to this layer can be found in the `Algebra` directory. The code is to be written in the file `Algebra.cpp`. The declaration for the functions can be found in the header file `Algebra.h`.

[**The stub code for this layer can be found here.**](../Misc/stub/algebra.md)

:::

## Layout

The Front End parses SQL-Like queries and converts them into a sequence of algebra layer and schema layer method calls.
The algebra layer functions process the basic **insert** and **retrieval** requests **to** and **from** the database.
_Retrieval functions will create a **target relation** into which the retrieved data will be stored._

The functions of the Algebra layer are:

1. [**Insert**](#insert)
2. [**Project**](#project)
3. [**Select**](#select)
4. [**Join**](#join)

NITCbase follows an Object-Oriented design for Algebra Layer. The class definition is as shown below:

## class Algebra

```cpp
class Algebra {
public:
    static int insert(char relName[ATTR_SIZE], int numberOfAttributes, char record[][ATTR_SIZE]);

    static int select(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], char attr[ATTR_SIZE], int op, char strVal[ATTR_SIZE]);

    static int project(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE]); // project all(copy)

    static int project(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], int tar_nAttrs, char tar_Attrs[][ATTR_SIZE]);

    static int join(char srcRelOne[ATTR_SIZE], char srcRelTwo[ATTR_SIZE], char targetRel[ATTR_SIZE],
                    char attrOne[ATTR_SIZE], char attrTwo[ATTR_SIZE]);
};

```

---

## Insert

#### Description

This method **inserts the given record** into the specified Relation. Insertion is only done if the Relation is open and attribute number and types match.

#### Arguments

| **Name** | **Type**            | **Description**                                                                                                                     |
| -------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| relName  | `char[ATTR_SIZE]`   | Name of the relation into which insert operation has to be performed.                                                               |
| nAttrs   | `int`               | Number of attributes in the inserting record(which has to match with `numAttrs` field in the relation cache entry for the relation) |
| record   | `char[][ATTR_SIZE]` | An array of strings with each string containing value of corresponding attribute.                                                   |

#### Return values

| **Value**                               | **Description**                                                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)            | On successful insert of the given record into the relation                                                                 |
| [`E_RELNOTOPEN`](/docs/constants)       | If the relation is not open.                                                                                               |
| [`E_NATTRMISMATCH`](/docs/constants)    | If the actual number of attributes in the relation is different from the provided number of attributes                     |
| [`E_ATTRTYPEMISMATCH`](/docs/constants) | If the actual type of the attribute in the relation is different from the type of provided attribute in the record.        |
| [`E_DISKFULL`](/docs/constants)         | If disk space is not sufficient for inserting the record / index                                                           |
| [`E_NOTPERMITTED`](/docs/constants)     | If relName is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to insert a record into any of the catalogs |

#### Algorithm

```cpp
int Algebra::insert(char relName[ATTR_SIZE], int nAttrs, char record[][ATTR_SIZE]){
    // if relName is equal to "RELATIONCAT" or "ATTRIBUTECAT"
    // return E_NOTPERMITTED;

    // get the relation's rel-id using OpenRelTable::getRelId() method
    int relId = OpenRelTable::getRelId(relName);

    // if relation is not open in open relation table, return E_RELNOTOPEN
    // (check if the value returned from getRelId function call = E_RELNOTOPEN)
    // get the relation catalog entry from relation cache
    // (use RelCacheTable::getRelCatEntry() of Cache Layer)

    /* if relCatEntry.numAttrs != numberOfAttributes in relation,
       return E_NATTRMISMATCH */

    // let recordValues[numberOfAttributes] be an array of type union Attribute

    /*
        Converting 2D char array of record values to Attribute array recordValues
     */
    // iterate through 0 to nAttrs-1: (let i be the iterator)
    {
        // get the attr-cat entry for the i'th attribute from the attr-cache
        // (use AttrCacheTable::getAttrCatEntry())

        // let type = attrCatEntry.attrType;

        if (type == NUMBER)
        {
            // if the char array record[i] can be converted to a number
            // (check this using isNumber() function)
            {
                /* convert the char array to numeral and store it
                   at recordValues[i].nVal using atof() */
            }
            // else
            {
                return E_ATTRTYPEMISMATCH;
            }
        }
        else if (type == STRING)
        {
            // copy record[i] to recordValues[i].sVal
        }
    }

    // insert the record by calling BlockAccess::insert() function
    // let retVal denote the return value of insert call

    return retVal;
}
```

---

## Select

#### Description

This function creates a new target relation with attributes as that of source relation. It inserts the records of source relation which **satisfies the given condition** into the target Relation.

#### Arguments

| **Name**  | **Type**           | **Description**                                                                                                                                                                                                                   |
| --------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| srcRel    | `char[ATTR_SIZE]`  | Name of Source Relation.                                                                                                                                                                                                          |
| targetRel | `char [ATTR_SIZE]` | Name of the target Relation                                                                                                                                                                                                       |
| attr      | `char [ATTR_SIZE]` | Attribute/column name to which 'select' condition need to be checked with.                                                                                                                                                        |
| op        | `int`              | The conditional operator (which can be one among `EQ`, `LE`, `LT`, `GE`, `GT`, `NE` corresponding to the following operators: _equal to, less than or equal to, less than, greater than or equal to, greater than, not equal to_) |
| strVal    | `char [ATTR_SIZE]` | value of attribute.                                                                                                                                                                                                               |

#### Return values

| **Value**                               | **Description**                                                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)            | On successful completion of the select operation.                                                                             |
| [`E_RELNOTOPEN`](/docs/constants)       | If the source relation is not open.                                                                                           |
| [`E_RELEXIST`](/docs/constants)         | If a relation with name `targetRel` already exists.                                                                           |
| [`E_ATTRNOTEXIST`](/docs/constants)     | If a attribute with name `attr` does not exist.                                                                               |
| [`E_ATTRTYPEMISMATCH`](/docs/constants) | If the actual type of the attribute in the relation is different from the type of provided attribute (the argument `strVal`). |
| [`E_CACHEFULL`](/docs/constants)        | If target relation cannot be operated on due to lack of free slots in open relation table                                     |
| [`E_DISKFULL`](/docs/constants)         | If disk space is not sufficient for creating the new relation.                                                                |

#### Algorithm

```cpp
int Algebra::select(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], char attr[ATTR_SIZE], int op, char strVal[ATTR_SIZE]) {
    // get the srcRel's rel-id (let it be srcRelid), using OpenRelTable::getRelId()
    // if srcRel is not open in open relation table, return E_RELNOTOPEN

    // get the attr-cat entry for attr, using AttrCacheTable::getAttrCatEntry()
    // if getAttrcatEntry() call fails return E_ATTRNOTEXIST


    /*** Convert strVal to an attribute of data type NUMBER or STRING ***/

    Attribute attrVal;
    int type = attrCatEntry.attrType;

    if (type == NUMBER)
    {
        // if the input argument strVal can be converted to a number
        // (check this using isNumber() function)
        {
            // convert strVal to double and store it at attrVal.nVal using atof()
        }
        // else
        {
            return E_ATTRTYPEMISMATCH;
        }
    }
    else if (type == STRING)
    {
        // copy strVal to attrVal.sVal
    }

    /*** Creating and opening the target relation ***/
    // Prepare arguments for createRel() in the following way:
    // get RelcatEntry of srcRel using RelCacheTable::getRelCatEntry()
    int src_nAttrs = /* the no. of attributes present in src relation */ ;


    /* let attr_names[src_nAttrs][ATTR_SIZE] be a 2D array of type char
        (will store the attribute names of rel). */
    // let attr_types[src_nAttrs] be an array of type int

    /*iterate through 0 to src_nAttrs-1 :
        get the i'th attribute's AttrCatEntry using AttrCacheTable::getAttrCatEntry()
        fill the attr_names, attr_types arrays that we declared with the entries
        of corresponding attributes
    */


    /* Create the relation for target relation by calling Schema::createRel()
       by providing appropriate arguments */
    // if the createRel returns an error code, then return that value.

    /* Open the newly created target relation by calling OpenRelTable::openRel()
       method and store the target relid */
    /* If opening fails, delete the target relation by calling Schema::deleteRel()
       and return the error value returned from openRel() */

    /*** Selecting and inserting records into the target relation ***/
    /* Before calling the search function, reset the search to start from the
       first using RelCacheTable::resetSearchIndex() */

    Attribute record[src_nAttrs];

    /*
        The BlockAccess::search() function can either do a linearSearch or
        a B+ tree search. Hence, reset the search index of the relation in the
        relation cache using RelCacheTable::resetSearchIndex().
        Also, reset the search index in the attribute cache for the select
        condition attribute with name given by the argument `attr`. Use
        AttrCacheTable::resetSearchIndex().
        Both these calls are necessary to ensure that search begins from the
        first record.
    */
    RelCacheTable::resetSearchIndex(/* fill arguments */);
    AttrCacheTable::resetSearchIndex(/* fill arguments */);

    // read every record that satisfies the condition by repeatedly calling
    // BlockAccess::search() until there are no more records to be read

    while (/* BlockAccess::search() returns success */) {

        // ret = BlockAccess::insert(targetRelId, record);

        // if (insert fails) {
        //     close the targetrel(by calling Schema::closeRel(targetrel))
        //     delete targetrel (by calling Schema::deleteRel(targetrel))
        //     return ret;
        // }
    }

    // Close the targetRel by calling closeRel() method of schema layer

    // return SUCCESS.
}
```

---

## Project

### Project Specified Attributes

#### Description

This function creates a new target relation with list of attributes specified in the arguments. For each record of the source relation, it inserts a new record into the target relation **with the attribute values corresponding to the attributes specified in the attribute list.**

#### Arguments

| **Name**   | **Type**            | **Description**                                                                             |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------- |
| srcRel     | `char[ATTR_SIZE]`   | Name of source relation.                                                                    |
| targetRel  | `char [ATTR_SIZE]`  | Name of the target relation(target relation is the Project of source relation)              |
| tar_nAttrs | `int`               | Number of attributes that have to be projected from source relation to target relation.     |
| tar_attrs  | `char[][ATTR_SIZE]` | Array of attribute names that have to be projected from source relation to target relation. |

#### Return values

| **Value**                           | **Description**                                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)        | On successful completion of the project operation.                                        |
| [`E_RELNOTOPEN`](/docs/constants)   | If the source relation is not open.                                                       |
| [`E_RELEXIST`](/docs/constants)     | If a relation with name `targetRel` already exists.                                       |
| [`E_ATTRNOTEXIST`](/docs/constants) | If any attribute with name given in attribute name array does not exist.                  |
| [`E_DISKFULL`](/docs/constants)     | If disk space is not sufficient for creating the new relation.                            |
| [`E_CACHEFULL`](/docs/constants)    | If target relation cannot be operated on due to lack of free slots in open relation table |

#### Algorithm

```cpp
int Algebra::project(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], int tar_nAttrs, char tar_Attrs[][ATTR_SIZE]) {

    int srcRelId = /*srcRel's rel-id (use OpenRelTable::getRelId() function)*/

    // if srcRel is not open in open relation table, return E_RELNOTOPEN

    // get RelCatEntry of srcRel using RelCacheTable::getRelCatEntry()

    // get the no. of attributes present in relation from the fetched RelCatEntry.

    // declare attr_offset[tar_nAttrs] an array of type int.
    // where i-th entry will store the offset in a record of srcRel for the
    // i-th attribute in the target relation.

    // let attr_types[tar_nAttrs] be an array of type int.
    // where i-th entry will store the type of the i-th attribute in the
    // target relation.


    /*** Checking if attributes of target are present in the source relation
         and storing its offsets and types ***/

    /*iterate through 0 to tar_nAttrs-1 :
        - get the attribute catalog entry of the attribute with name tar_attrs[i].
        - if the attribute is not found return E_ATTRNOTEXIST
        - fill the attr_offset, attr_types arrays of target relation from the
          corresponding attribute catalog entries of source relation
    */


    /*** Creating and opening the target relation ***/

    // Create a relation for target relation by calling Schema::createRel()

    // if the createRel returns an error code, then return that value.

    // Open the newly created target relation by calling OpenRelTable::openRel()
    // and get the target relid

    // If opening fails, delete the target relation by calling Schema::deleteRel()
    // and return the error value from openRel()


    /*** Inserting projected records into the target relation ***/

    // Take care to reset the searchIndex before calling the project function
    // using RelCacheTable::resetSearchIndex()

    Attribute record[src_nAttrs];

    while (/* BlockAccess::project(srcRelId, record) returns SUCCESS */) {
        // the variable `record` will contain the next record

        Attribute proj_record[tar_nAttrs];

        //iterate through 0 to tar_attrs-1:
        //    proj_record[attr_iter] = record[attr_offset[attr_iter]]

        // ret = BlockAccess::insert(targetRelId, proj_record);

        if (/* insert fails */) {
            // close the targetrel by calling Schema::closeRel()
            // delete targetrel by calling Schema::deleteRel()
            // return ret;
        }
    }

    // Close the targetRel by calling Schema::closeRel()

    // return SUCCESS.
}
```

### Project All Attributes (Copy Relation)

#### Description

This function creates a copy of the source relation in the target relation. **Every record** of the source relation is inserted into the target relation.

#### Arguments

| **Name**  | **Type**           | **Description**                                                                 |
| --------- | ------------------ | ------------------------------------------------------------------------------- |
| srcRel    | `char[ATTR_SIZE]`  | Name of source relation.                                                        |
| targetRel | `char [ATTR_SIZE]` | Name of the target relation (target relation is the Project of source relation) |

#### Return values

| **Value**                         | **Description**                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)      | On successful completion of the project operation.                                        |
| [`E_RELNOTOPEN`](/docs/constants) | If the source relation is not open.                                                       |
| [`E_RELEXIST`](/docs/constants)   | If a relation with name `targetRel` already exists.                                       |
| [`E_DISKFULL`](/docs/constants)   | If disk space is not sufficient for creating the new relation.                            |
| [`E_CACHEFULL`](/docs/constants)  | If target relation cannot be operated on due to lack of free slots in open relation table |

#### Algorithm

```cpp
int Algebra::project(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE]) {

    int srcRelId = /*srcRel's rel-id (use OpenRelTable::getRelId() function)*/

    // if srcRel is not open in open relation table, return E_RELNOTOPEN

    // get RelCatEntry of srcRel using RelCacheTable::getRelCatEntry()

    // get the no. of attributes present in relation from the fetched RelCatEntry.

    // attrNames and attrTypes will be used to store the attribute names
    // and types of the source relation respectively
    char attrNames[numAttrs][ATTR_SIZE];
    int attrTypes[numAttrs];

    /*iterate through every attribute of the source relation :
        - get the AttributeCat entry of the attribute with offset.
          (using AttrCacheTable::getAttrCatEntry())
        - fill the arrays `attrNames` and `attrTypes` that we declared earlier
          with the data about each attribute
    */


    /*** Creating and opening the target relation ***/

    // Create a relation for target relation by calling Schema::createRel()

    // if the createRel returns an error code, then return that value.

    // Open the newly created target relation by calling OpenRelTable::openRel()
    // and get the target relid

    // If opening fails, delete the target relation by calling Schema::deleteRel() of
    // return the error value returned from openRel().


    /*** Inserting projected records into the target relation ***/

    // Take care to reset the searchIndex before calling the project function
    // using RelCacheTable::resetSearchIndex()

    Attribute record[numAttrs];


    while (/* BlockAccess::project(srcRelId, record) returns SUCCESS */)
    {
        // record will contain the next record

        // ret = BlockAccess::insert(targetRelId, proj_record);

        if (/* insert fails */) {
            // close the targetrel by calling Schema::closeRel()
            // delete targetrel by calling Schema::deleteRel()
            // return ret;
        }
    }

    // Close the targetRel by calling Schema::closeRel()

    // return SUCCESS.
}
```

---

## Join

#### Description

This function creates a new target relation with _attributes constituting from both the source relations (excluding the specified join-attribute from the second source relation)_. It inserts the records obtained by **_Equi-join_** of both the source relations into the target relation. An attribute from each relation specified in arguments is used for _equi-join called the join-attributes._ Note that both the relations are expected to have distinct attribute names for all attributes aside from the join attribute.

:::caution
This operation results in the creation of index on the join attribute for the second relation if it does not already exist. This index is not deleted at the end of the operation and will persist on the disk (even in some cases where the join operation were to fail).
:::

:::info NOTE

The resulting relation will have columns ordered such that all the columns of `srcRelOne` come first followed by the columns of `srcRelTwo` excluding the join attribute `attrTwo`.

An example for the join operation can be seen [here](../User%20Interface%20Commands/dml.md#select--from-join-where).

:::

#### Arguments

| **Name**  | **Type**           | **Description**                   |
| --------- | ------------------ | --------------------------------- |
| srcRelOne | `char[ATTR_SIZE]`  | Name of 1st Source Relation.      |
| srcRelTwo | `char[ATTR_SIZE]`  | Name of 2nd Source Relation.      |
| targetRel | `char [ATTR_SIZE]` | Name of the target Relation       |
| attrOne   | `char [ATTR_SIZE]` | Attribute/column name in srcrel1. |
| attrTwo   | `char [ATTR_SIZE]` | Attribute/column name in srcrel2. |

#### Return values

| **Value**                               | **Description**                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/docs/constants)            | On successful completion of the join operation.                                                                       |
| [`E_RELNOTOPEN`](/docs/constants)       | If any of the source relations is not open.                                                                           |
| [`E_RELEXIST`](/docs/constants)         | If a relation with name `targetRel` already exists.                                                                   |
| [`E_ATTRNOTEXIST`](/docs/constants)     | If an attribute with name attr1 in srcrel1 or attr2 in srcrel2 does not exist.                                        |
| [`E_DISKFULL`](/docs/constants)         | If disk space is not sufficient for creating the new relation.                                                        |
| [`E_ATTRTYPEMISMATCH`](/docs/constants) | If the actual type of any of the attributes in the source relations is different from the type of provided attribute. |
| [`E_DUPLICATEATTR`](/docs/constants)    | If there are duplicate attribute names between srcrel1 and srcrel2 aside from the join attributes.                    |
| [`E_CACHEFULL`](/docs/constants)        | If target relation cannot be operated on due to lack of free slots in open relation table                             |

#### Algorithm

```cpp
int join(char srcRelation1[ATTR_SIZE], char srcRelation2[ATTR_SIZE], char targetRelation[ATTR_SIZE], char attribute1[ATTR_SIZE], char attribute2[ATTR_SIZE]) {

    // get the srcRelation1's rel-id using OpenRelTable::getRelId() method

    // get the srcRelation2's rel-id using OpenRelTable::getRelId() method

    // if either of the two source relations is not open
    //     return E_RELNOTOPEN

    AttrCatEntry attrCatEntry1, attrCatEntry2;
    // get the attribute catalog entries for the following from the attribute cache
    // (using AttrCacheTable::getAttrCatEntry())
    // - attrCatEntry1 = attribute1 of srcRelation1
    // - attrCatEntry2 = attribute2 of srcRelation2

    // if attribute1 is not present in srcRelation1 or attribute2 is not
    // present in srcRelation2 (getAttrCatEntry() returned E_ATTRNOTEXIST)
    //     return E_ATTRNOTEXIST.

    // if attribute1 and attribute2 are of different types return E_ATTRTYPEMISMATCH

    // iterate through all the attributes in both the source relations and check if
    // there are any other pair of attributes other than join attributes
    // (i.e. attribute1 and attribute2) with duplicate names in srcRelation1 and
    // srcRelation2 (use AttrCacheTable::getAttrCatEntry())
    // If yes, return E_DUPLICATEATTR

    // get the relation catalog entries for the relations from the relation cache
    // (use RelCacheTable::getRelCatEntry() function)

    int numOfAttributes1 = /* number of attributes in srcRelation1 */;
    int numOfAttributes2 = /* number of attributes in srcRelation2 */;

    // if rel2 does not have an index on attr2
    //     create it using BPlusTree:bPlusCreate()
    //     if call fails, return the appropriate error code
    //     (if your implementation is correct, the only error code that will
    //      be returned here is E_DISKFULL)

    int numOfAttributesInTarget = numOfAttributes1 + numOfAttributes2 - 1;
    // Note: The target relation has number of attributes one less than
    // nAttrs1+nAttrs2 (Why?)

    // declare the following arrays to store the details of the target relation
    char targetRelAttrNames[numOfAttributesInTarget][ATTR_SIZE];
    int targetRelAttrTypes[numOfAttributesInTarget];

    // iterate through all the attributes in both the source relations and
    // update targetRelAttrNames[],targetRelAttrTypes[] arrays excluding attribute2
    // in srcRelation2 (use AttrCacheTable::getAttrCatEntry())

    // create the target relation using the Schema::createRel() function

    // if createRel() returns an error, return that error

    // Open the targetRelation using OpenRelTable::openRel()

    // if openRel() fails (No free entries left in the Open Relation Table)
    {
        // delete target relation by calling Schema::deleteRel()
        // return the error code
    }

    Attribute record1[numOfAttributes1];
    Attribute record2[numOfAttributes2];
    Attribute targetRecord[numOfAttributesInTarget];

    // this loop is to get every record of the srcRelation1 one by one
    while (BlockAccess::project(srcRelId1, record1) == SUCCESS) {

        // reset the search index of `srcRelation2` in the relation cache
        // using RelCacheTable::resetSearchIndex()

        // reset the search index of `attribute2` in the attribute cache
        // using AttrCacheTable::resetSearchIndex()

        // this loop is to get every record of the srcRelation2 which satisfies
        //the following condition:
        // record1.attribute1 = record2.attribute2 (i.e. Equi-Join condition)
        while (BlockAccess::search(
            srcRelId2, record2, attribute2, record1[attrCatEntry1.offset], EQ
        ) == SUCCESS ) {

            // copy srcRelation1's and srcRelation2's attribute values(except
            // for attribute2 in rel2) from record1 and record2 to targetRecord

            // insert the current record into the target relation by calling
            // BlockAccess::insert()

            if(/* insert fails (insert should fail only due to DISK being FULL) */) {

                // close the target relation by calling OpenRelTable::closeRel()
                // delete targetRelation (by calling Schema::deleteRel())
                return E_DISKFULL;
            }
        }
    }

    // close the target relation by calling OpenRelTable::closeRel()
    return SUCCESS;
}
```

---

## Miscellaneous

Given below are the definitions of two functions which have been used in this layer for validation of various inputs.

### isNumber()

#### Description

This function takes a string and checks whether it can be parsed as a floating point number. Leading and trailing whitespace is ignored. It can be used to validate if a given input corresponds to the `NUMBER` type.

#### Arguments

| **Name** | **Type**          | **Description**          |
| -------- | ----------------- | ------------------------ |
| str      | `char[ATTR_SIZE]` | The string to be checked |

#### Return Values

| **Value** | **Description**                                 |
| --------- | ----------------------------------------------- |
| true      | Value in `str` is parse-able as a `NUMBER`.     |
| false     | Value in `str` is not parse-able as a `NUMBER`. |

```cpp
bool isNumber(char *str) {
    int len;
    float ignore;
    /*
        sscanf returns the number of elements read, so if there is no float matching
        the first %f, ret will be 0, else it'll be 1

        %n gets the number of characters read. this scanf sequence will read the
        first float ignoring all the whitespace before and after. and the number of
        characters read that far will be stored in len. if len == strlen(str), then
        the string only contains a float with/without whitespace. else, there's other
        characters.
    */
    int ret = sscanf(str, "%f %n", &ignore, &len);
    return ret == 1 && len == strlen(str);
}
```
