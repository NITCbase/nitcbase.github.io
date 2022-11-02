---
sidebar_position: 3
title: "Algebra Layer"
---

https://nitcbase.github.io/archived-site/design/algebra.html

## Layout

The Front End parses SQL-Like queries and converts them into a sequence of algebra layer and schema layer method calls.
The algebra layer functions process the basic **insert** and **retrieval** requests **to** and **from** the database.
_Retrieval functions will create a **target relation** into which the retrieved data will be stored._

The functions of the Algebra layer are:

1. [**Insert**](#insert)
2. [**Project**](#select)
3. [**Select**](#project)
4. [**Join**](#join)

The _Join_ function of NITCbase supports only [Equi-Join](<https://en.wikipedia.org/wiki/Join_(SQL)#Equi-join>) of the two relations. NITCbase follows an Object-Oriented design for Algebra Layer. The class definition is as shown below:

## class Algebra

```cpp
class Algebra {
public:
    static int insert(char relName[ATTR_SIZE], int numberOfAttributes, char record[][ATTR_SIZE]);

    static int select(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], char attr[ATTR_SIZE], int op, char strVal[ATTR_SIZE]);

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

| **Attribute** | **Type**            | **Description**                                                                                                                            |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| relName       | `char[ATTR_SIZE]`   | Name of the relation into which insert operation has to be performed.                                                                      |
| nAttrs        | `int`               | Number of attributes in the inserting record.(which has to match with no.of attributes field in the relation cache entry for the relation) |
| record        | `char[][ATTR_SIZE]` | each string containing value of corresponding attribute.                                                                                   |

#### Return values

| **Value**                          | **Description**                                                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)            | On successful insert of the given record into the relation                                                                  |
| [`E_RELNOTOPEN`](/constants)       | If the relation is not open.                                                                                                |
| [`E_NATTRMISMATCH`](/constants)    | If the actual number of attributes in the relation is different from the provided number of attributes                      |
| [`E_ATTRTYPEMISMATCH`](/constants) | If the actual type of the attribute in the relation is different from the type of provided attribute in the record.         |
| [`E_DISKFULL`](/constants)         | If disk space is not sufficient for inserting the record / index                                                            |
| [`E_NOTPERMITTED`](/constants)     | If relName is either "RELATIONCAT" or "ATTRIBUTECAT". i.e, when the user tries to insert a record into any of the catalogs. |

#### Algorithm

```cpp
int insert(char relName[ATTR_SIZE], int nAttrs, char record[][ATTR_SIZE]){
    // if relName is equal to "RELATIONCAT" or "ATTRIBUTECAT"
    // return E_NOTPERMITTED;

    // get the relation's open relation id using OpenRelTable::getRelId() method
    int relId = OpenRelTable::getRelId(relName);

    // if relation is not open in open relation table, return E_RELNOTOPEN
    // (check if the value returned from getRelId function call = E_RELNOTOPEN)
    // get the relation catalog entry from relation cache
    // (use RelCacheTable::getRelCatEntry() of Cache Layer)

    // if relCatEntry.numAttrs != numberOfAttributes in relation, return E_NATTRMISMATCH

    // let recordValues[numberOfAttributes] be an array of type union Attribute

    /*
        Converting 2D char array of record values to Attribute array recordValues
     */
    // iterate through 0 to nAttrs-1: (let i be the iterator)
    {
        // get the attribute catalog entry for the i'th attribute from the attribute cache
        // (use AttrCacheTable::getAttrCatEntry() function with arguments relId and i)

        // let type = attrCatEntry.attrType;

        if (type == NUMBER)
        {
            // if the char array record[i] can be converted to a number
            // (check this using isNumber() function)
            {
                // convert the char array to numeral and store it at recordValues[i].nVal using atof()
            }
            // else
            {
                return E_ATTRTYPEMISMATCH;
            }
        }
        else if (type == STRING)
        {
            // iterate through 0 to ATTR_SIZE-1: (let charIndex be the iterator)
            {
                // let ch be the character at index (i, charIndex) of record array

                // if ch == null character(i.e. '\0') exit the loop

                // if ch is an invalid character return E_NOTPERMITTED;
                // (check this using isInvalidCharacter() function)
            }
            // copy record[i] to recordValues[i].sVal
        }
    }

    // insert the record by calling BlockAccess::insert() function of Block Access Layer
    // let retVal denote the return value of insert call

    return retVal;
}
```

---

## Select

#### Description

This function creates a new target relation with attributes as that of source relation. It inserts the records of source relation which **satisfies the given condition** into the target Relation.

#### Arguments

| **Attribute** | **Type**           | **Description**                                                                                                                                                  |
| ------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| srcRel        | `char[ATTR_SIZE]`  | Name of Source Relation.                                                                                                                                         |
| targetRel     | `char [ATTR_SIZE]` | Name of the target Relation                                                                                                                                      |
| attr          | `char [ATTR_SIZE]` | Attribute/column name to which 'select' condition need to be checked with.                                                                                       |
| op            | `int`              | Conditional Operator(can be one among EQ,LE,LT,GE,GT,NE corresponding to equal,lesthan equal, lessthan ,greaterthan equal, greaterthan, Not equal respectively). |
| strVal        | `char [ATTR_SIZE]` | value of attribute.                                                                                                                                              |

#### Return values

| **Value**                          | **Description**                                                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)            | On successful creation of new relation.                                                                                         |
| [`E_RELNOTOPEN`](/constants)       | If the source relation is not open.                                                                                             |
| [`E_RELEXIST`](/constants)         | If a relation with name targetrel already exists.                                                                               |
| [`E_ATTRNOTEXIST`](/constants)     | If a attribute with name attr does not exist.                                                                                   |
| [`E_ATTRTYPEMISMATCH`](/constants) | If the actual type of the attribute in the relation is different from the type of provided attribute.                           |
| [`E_CACHEFULL`](/constants)        | If the openRel() fails because of no free slots in open relation table                                                          |
| [`E_DISKFULL`](/constants)         | If disk space is not sufficient for creating the new relation.                                                                  |
| [`E_NOTPERMITTED`](/constants)     | If the relName is either "RELATIONCAT" or "ATTRIBUTECAT". i.e, when the user tries to insert a record into any of the catalogs. |

#### Algorithm

```cpp
int Algebra::select(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], char attr[ATTR_SIZE], int op, char strVal[ATTR_SIZE]) {
    // get the srcRel's open relation id(let it be srcRelid), using getRelId() method of cache layer
    // if srcRel is not open in open relation table, return E_RELNOTOPEN

    // get the attribute catalog entry for attr, using getAttrcatEntry() method of AttrCacheTable in cache layer.
    // if getAttrcatEntry() call fails return E_ATTRNOTEXIST


    /*** Convert strVal (c-string) to an attribute of data type NUMBER or STRING as given in the following code. ***/
    int type = attrCatEntry.attrType;
    Attribute attrVal;
    if (type == NUMBER) {
        try {
            attrVal.nVal = std::stof(strVal);
        } catch (std::invalid_argument &e) {
            // if convert fails, return E_ATTRTYPEMISMATCH
            return E_ATTRTYPEMISMATCH;
        }
    } else if (type == STRING) {
        strcpy(attrVal.sVal, strVal);
    }

    /*** Creating and opening the target relation ***/
    // Prepare arguments for createRel() in the following way:
    // get RelcatEntry of srcRel from cache using getRelCatEntry() method of RelCacheTable in cache layer.
    // get the no. of attributes present in src relation, from RelcatEntry. (let it be nAttrs)


    // let attr_names[src_nAttrs][ATTR_SIZE] be a 2D array of type char(attribute names of rel).
    // let attr_types[src_nAttrs] be an array of type int

    /*iterate through 0 to src_nAttrs-1 :
        get the i'th attribute's AttrCatEntry (using getAttrcatEntry() method of AttrCacheTable in cache layer)
        fill attr_names, attr_types of corresponding attributes using Attribute catalog found.
    */


    // Create the relation for target relation by calling createRel() method of Schema layer by providing appropriate arguments
    // if the createRel returns an error code, then return that value.
    // Hint: ret = Schema::createRel(targetrel,src_nAttrs,attr_name,attr_type)


    // Open the newly created target relation by calling openRel() method of OpenRelTable and store the target relid
    // If opening fails, delete the target relation by calling deleteRel() of Schema Layer and return the error value.

    /*** Selecting and inserting records into the target relation ***/
    // Before calling the search function, reset the search to start from the first using RelCacheTable::resetSearchIndex

    Attribute record[src_nAttrs];
    Attribute val;
    strcpy(val.sVal, "RST");

    // Hint: do BlockAccess::search(srcRelId, record, attr, val, RST);

    /*
    while (true) {
        // For doing projection call search of Block Access layer with the following arguments:
        // int ret = BlockAccess::search(srcRelId, record, attr, attrVal, op)

        if (search call returns SUCCESS):
            ret = BlockAccess::insert(targetRelId, record);
            if (insert fails) {
                close the targetrel(by calling closeRel(targetrel) method of schema layer)
                delete targetrel (by calling deleteRel(targetrel) of schema layer)
                return ret;
            }
        else:
            break;
    }

    */

    // Close the targetRel by calling closeRel() method of schema layer

    // return SUCCESS.
}
```

---

## Project

#### Description

This function creates a new target relation with list of attributes specified in the arguments. For each record of the source relation, it inserts a new record into the target relation **with the attribute values corresponding to the attributes specified in the attribute list.**

#### Arguments

| **Attribute** | **Type**            | **Description**                                                                                                            |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| srcRel        | `char[ATTR_SIZE]`   | Name of Source Relation.                                                                                                   |
| targetRel     | `char [ATTR_SIZE]`  | Name of the target Relation(target relation is the Project of source Relation)                                             |
| tar_nAttrs    | `int`               | No. of attributes that have to be projected from source relation to target relation.                                       |
| tar_attrs     | `char[][ATTR_SIZE]` | Pointer to attribute names array, (array of attributes that have to be projected from source relation to target relation.) |

#### Return values

| **Value**                       | **Description**                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)         | On successful creation of new relation.                                                                                         |
| [`E_RELNOTOPEN`](/constants)    | If the source relation is not open.                                                                                             |
| [`E_RELEXIST`](/constants)      | If a relation with name targetrel already exists.                                                                               |
| [`E_ATTRNOTEXIST`](/constants)  | If any attribute with name given in attr array does not exist.                                                                  |
| [`E_DUPLICATEATTR`](/constants) | If two any two attributes have same name in the target relation                                                                 |
| [`E_DISKFULL`](/constants)      | If disk space is not sufficient for creating the new relation.                                                                  |
| [`E_CACHEFULL`](/constants)     | If the openRel() fails because of no free slots in open relation table                                                          |
| [`E_NOTPERMITTED`](/constants)  | If the relName is either "RELATIONCAT" or "ATTRIBUTECAT". i.e, when the user tries to insert a record into any of the catalogs. |

#### Algorithm

```cpp
int Algebra::project(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], int tar_nAttrs, char tar_Attrs[][ATTR_SIZE]) {
    // get the srcRel's open relation id(let it be srcrelid), using getRelId() method of cache layer
    // if srcRel is not open in open relation table, return E_RELNOTOPEN


    // get RelCatEntry of srcRel using getRelCatEntry() of RelCacheTable in Cache layer

    // get the no. of attributes present in relation from the fetched RelCatEntry.


    // let attr_offset[tar_nAttrs] be an array of type int.
    // where ith entry corresponds to the offset in the srcRel of ith attribute in the target relation.
    // let attr_types[tar_nAttrs] be an array of type int.
    // where ith entry corresponds to the type ith attribute in the target relation.


    /*** Checking if attributes of target are present in the source relation and storing its offsets and types ***/
    /*iterate through 0 to tar_nAttrs-1 :
        - get the AttributeCat entry (using getAttrCatEntry() of AttrCacheTable in cache layer)
        of the attribute with name tar_attrs[i].
        - if the attribute is not found return E_ATTRNOTEXIST
        - fill the attr_offset, attr_types arrays of target relation from the corresponding Attribute catalog entries
            * idea -> each attribute in targetRel corresponds to which attributes of source relation
    */


    /*** Creating and opening the target relation ***/

    // Create a relation for target relation by calling createRel() method of Schema layer by providing appropriate arguments
    // if the createRel returns an error code, then return that value.


    // Open the newly created target relation by calling openRel() method of OpenRelTable and store the target relid
    // If opening fails, delete the target relation by calling deleteRel() of Schema Layer and return the error value.


    /*** Inserting projected records into the target relation ***/
    // Before calling the search function, reset the search to start from the first hit

    Attribute record[src_nAttrs];

    /*
    while (true) :

        if (BlockAccess::project(srcRelId, record) returns SUCCESS):
            // record will contain the next record
            Attribute proj_record[tar_nAttrs];

            iterate through 0 to tar_attrs-1:
                proj_record[attr_iter] = record[attr_offset[attr_iter]];

            ret = BlockAccess::insert(targetRelId, proj_record);

            if (insert fails) {
                close the targetrel by calling closeRel() method of schema layer
                delete targetrel by calling deleteRel() of schema layer
                return ret;
            }
        else:
            break;
    */

    // Close the targetRel by calling closeRel() method of schema layer

    // return SUCCESS.
}
```

---

## Join

#### Description

This function creates a new target relation with _attributes constituting from both the source relations (excluding the specified join-attribute from the second source relation)_. It inserts the records obtained by **_Equi-join_** of both the source relations into the target relation. An attribute from each relation specified in arguments is used for _equi-join called the join-attributes._

#### Arguments

| **Attribute** | **Type**           | **Description**                   |
| ------------- | ------------------ | --------------------------------- |
| srcRelOne     | `char[ATTR_SIZE]`  | Name of 1st Source Relation.      |
| srcRelTwo     | `char[ATTR_SIZE]`  | Name of 2nd Source Relation.      |
| targetRel     | `char [ATTR_SIZE]` | Name of the target Relation       |
| attrOne       | `char [ATTR_SIZE]` | Attribute/column name in srcrel1. |
| attrTwo       | `char [ATTR_SIZE]` | Attribute/column name in srcrel2. |

#### Return values

| **Value**                          | **Description**                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)            | On successful creation of new relation.                                                                               |
| [`E_RELNOTOPEN`](/constants)       | If any of the source relations is not open.                                                                           |
| [`E_RELEXIST`](/constants)         | If a relation with name targetrel already exists.                                                                     |
| [`E_ATTRNOTEXIST`](/constants)     | If an attribute with name attr1 in srcrel1 or attr2 in srcrel2 does not exist.                                        |
| [`E_DISKFULL`](/constants)         | If disk space is not sufficient for creating the new relation.                                                        |
| [`E_ATTRTYPEMISMATCH`](/constants) | If the actual type of any of the attributes in the source relations is different from the type of provided attribute. |
| [`E_CACHEFULL`](/constants)        | If the openRel() fails because of no free slots in open relation table                                                |

#### Algorithm

```cpp
int join(char srcRelation1[ATTR_SIZE], char srcRelation2[ATTR_SIZE], char targetRelation[ATTR_SIZE], char attribute1[ATTR_SIZE], char attribute2[ATTR_SIZE]) {

    // get the srcRelation1's open relation id using OpenRelTable::getRelId() method

    // get the srcRelation2's open relation id using OpenRelTable::getRelId() method

    // if either of the two source relations is not open in open relation table, return E_RELNOTOPEN
    // (check if the value returned from getRelId function call = E_RELNOTOPEN)

    // get the attribute catalog entries for the following from the attribute cache
    // - attribute1 of srcRelation1 (call AttrCacheTable::getAttrCatEntry() function with arguments srcRel1Id and attribute1)
    // - attribute2 of srcRelation2 (call AttrCacheTable::getAttrCatEntry() function with arguments srcRel2Id and attribute2)
    // Let retVal1 & retVal2 denote the return values of the above function calls respectively

    // if attribute1 is not present in srcRelation1 or attribute2 is not present in srcRelation2
    // (check using return values retVal1, retVal2)
    // return E_ATTRNOTEXIST.

    // if attribute1 and attribute2 are of different types return E_ATTRTYPEMISMATCH

    // get the relation catalog entries for the relations from the relation cache
    // (use RelCacheTable::getRelCatEntry() function)

    // let numOfAttributes1, numOfAttributes2 be the number of attributes in srcRelation1 and srcRelation2 respectively
    // (note: the number of attributes field is present in relation catalog entry)

    // Next step ensures that an index exists for atleast one of the relations
    /* if both the attributes of src rels have B+ tree:
          if rel1 has more records than rel2, swap srcRelation1 and srcRelation2 (and all associated variables)
        else if none of target attrs has bplus tree:
          if rel1 has more records than rel2, swap srcRelation1 and srcRelation2 (and all associated variables)
          create bplus tree on attr2 in rel2 (using BPlusTree:bPlusCreate())
          If create fails return E_DISKFULL
    */

    // let numOfAttributesInTarget = numOfAttributes1 + numOfAttributes2 - 1
    // let targetRelAttrNames[numOfAttributesInTarget][ATTR_SIZE] be an array of type char
    // let targetRelAttrTypes[numOfAttributesInTarget] be an array of type int
    // Note: The target relation has number of attributes one less than nAttrs1+nAttrs2 (Why?)

    /*
        iterate through all the attributes in both the source relations and
        update targetRelAttrNames[],targetRelAttrTypes[] arrays (except for attribute2 in srcRelation2),
        by getting attribute catalog of each attribute from attribute cache
        (using method AttrCacheTable::getAttrCatEntry() of Cache Layer)
        Also check if there are any other pair attributes other than join attributes(i.e. attribute1 and attribute2)
        with the same name in srcRelation1 and srcRelation2.
        If yes, return error code E_DUPLICATEATTR (as this will lead to duplicate attribute names
        in the target relation)
    */

    // retVal = Schema::createRel(targetRelation, numOfAttributesInTarget, targetRelAttrNames , targetRelAttrTypes);

    // if create fails return retVal

    // Open the targetRelation in OpenRelTable using OpenRelTable::openRel() function

    // if openRel() fails (No free entries left in the Open Relation Table)
    {
        // delete target relation by calling deleteRel(targetRelation) of schema layer
        // return error value targetRelId
    }

    Attribute record1[numOfAttributes1];
    Attribute record2[numOfAttributes2];
    Attribute targetRecord[numOfAttributesInTarget];

    // this loop is to get every record of the srcRelation1 one by one
    while (BlockAccess::project(srcRelId1, record1) == SUCCESS) {

        // this loop is to get every record of the srcRelation2 which satisfies the following condition:
        // record1.attribute1 = record2.attribute2 (i.e. Equi-Join condition)
        while (BlockAccess::search(srcRelId2, record2, attribute2, record1[attrCatEntry1.offset], EQ) == SUCCESS) {

            // copy srcRelation1's and srcRelation2's attribute values(except for attribute2 in rel2) from
            // record1 and record2 to targetRecord
            // (iterate offset from 0 to numOfAttributes1-1 in record1 and 0 to numOfAttributes2-1 in record2

            // insert the current record into the target relation by calling BlockAccess::insert()

            // if insert fails (insert should fail only due to DISK being FULL)
            {
                // close the target relation by calling OpenRelTable::closeRel() of Cache layer
                // delete targetRelation (by calling Schema::deleteRel() of Schema layer)
                return E_DISKFULL;
            }
        }
    }

    // close the target relation by calling OpenRelTable::closeRel() of Cache layer
    // return SUCCESS;
}
```

## Miscellaneous

Given below are the definitions of two functions which have been used in this layer for validation of various inputs.

### isNumber()

#### Description

This function takes a string and checks whether it can be parsed as a floating point number. Leading and trailing whitespace is ignored. It can be used to validate if a given input corresponds to the `NUMBER` type.

#### Arguments

| Name | Type              | Description              |
| ---- | ----------------- | ------------------------ |
| str  | `char[ATTR_SIZE]` | The string to be checked |

#### Return Values

| Value | Description                                     |
| ----- | ----------------------------------------------- |
| true  | Value in `str` is parse-able as a `NUMBER`.     |
| false | Value in `str` is not parse-able as a `NUMBER`. |

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

### isInvalidCharacter()

#### Description

This function takes a character and checks if it is allowed as part of a record value.

#### Arguments

| Name      | Type   | Description                 |
| --------- | ------ | --------------------------- |
| character | `char` | The character to be checked |

#### Return Values

| Value | Description                                 |
| ----- | ------------------------------------------- |
| true  | character is allowed in a record value.     |
| false | character is not allowed in a record value. |

```cpp
bool isInvalidCharacter(char character) {
    // check if the character satisfies any of the below conditions
    // '0' <= character <= '9'
    // 'A' <= character <= 'Z'
    // 'a' <= character <= 'z'
    // character = '-'
    // character = '_'
    // and return true. else return false
}
```
