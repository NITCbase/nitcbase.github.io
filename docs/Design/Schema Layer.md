---
sidebar_position: 4
title: 'Schema Layer'
---
https://nitcbase.github.io/archived-site/schema.html

import Link from '@docusaurus/Link';

:::info note 
The Schema Layer code is to be written in `Schema.cpp` and it's header file `Schema.h`


**<Link to="/schema_stub">The stub code for these files can be found here.</Link >**
:::

## Layout

The SQL-Like queries that alter the schema of the database are converted into a sequence of schema layer function calls by front end. These schema layer function calls processes the **basic schema alteration requests to the database.** The functions of Schema layer include `createRel`, `deleteRel`, `renameRel`, `renameAttr`, `createIndex`, `deleteIndex`. The Schema layer function also include `openRel` to the open the relations, `closeRel` to close the relation and `getSchema` to get the schema of the relation.

NITCbase follows an Object-Oriented design for Schema Layer. The class definition is as shown below.
## class Schema

```cpp
class Schema {
    public:
    static int createRel(char relname[],int nAttrs, char attrs[][ATTR_SIZE],int attrtype[])
};
```

## create Relation
#### Description
This method creates a new Relation with the name, attribute/column list as specified in arguments.
#### Arguments
|Name|Type|Description|
|----------|--------------------|-------------------------------------------------------------|
| relName  | `char[ATTR_SIZE]`    | Name of the Relation.                                       |
| nAttrs   | `int`                | No. of attributes in the relation.                          |
| attrs    | `char [][ATTR_SIZE]` | pointer to array of Attribute/column names of the Relation. |
| attrtype | `int []`             | pointer to an array of attribute types.                     |
#### Return value
|Value|Description|
|-----------------|----------------------------------------------------------------|
| `SUCCESS`         | On successful creation of the relation                         |
| `E_RELEXIST`      | If the relation with name relName already exists.              |
| `E_DUPLICATEATTR` | If two any two of the given attributes have same name.         |
| `E_DISKFULL`      | If disk space is not sufficient for creating the new relation. |

#### Algorithm
```cpp
int createRel(char relName[],int nAttrs, char attrs[][ATTR_SIZE],int attrtype[]){

    // let union Attribute relName_val
    // copy the relName into relName_val(type = string)

    // let recId targetrelid
    /* using ba_search() of ba_layer, search the relation relcat (with Openrelid = 0), for attribute value of attribute "RelName" to be
     equal to relName_val. let the return value of ba_search be retval*/

    // if relcat==SUCCESS (i.e "relcat" relation already contains a relation with relation name as relName) 
        // return E_RELEXIST

    // by iterating though all the attributes of attrs[] array 
        // if any two strings of attrs[] array have same string value, return E_DUPLICATEATTR (i.e 2 attributes having same value)

    // let union Attribute relcatrecord[6] (this is the record in relationcatalog corresponding to new relation)
    // fill relcatrecord appropriately with as that of new relation.

    //retval = ba_insert(0,relcatrecord);
    // if ba_insert fails return retval

    // iterate through 0 to nAttrs-1 :
        // let union Attribute attrcatrec[6] (this is the record in attrcatalog corresponding to i'th Attribute)
        /* update attrcatrec corresponding to i'th attribute of the relation
         (Relation name = relName, Attribute name=attrs[i], type= attrtype[i], pflag=-1, rootblock= -1, offset= i).*/

        // retval = ba_insert(1,attrcatrec);
        /* if ba_insert fails:
            delete targetrelation by calling deleterel(targetrel) of schema layer
            return E_DISKFULL
        */

    // return SUCCESS
}
```

## delete Relation
#### Description
This method deletes the Relation with name as specified in arguments.
#### Arguments
|Name|Type|Description|
|----------|--------------------|-------------------------------------------------------------|
| relName  | `char[ATTR_SIZE]`    | Name of the Relation.                                       |
#### Return value
|Value|Description|
|-----------------|----------------------------------------------------------------|
| `SUCCESS`       | On successful deletion of the relation.                                                       |
| `E_RELOPEN`     | If the relation is open.                                                                      |
| `E_RELNOTEXIST` | If the relation does not exist                                                                |
| `E_INVALID`     | If relName is either "relcat" or "attrcat". i.e., when the user tries to delete the catalogs. |

#### Algorithm
```cpp
int deleteRel(char relName[ATTR_SIZE]){
    // get the relation's open relation id(let it be srelid), using getRelId() method of Openreltable
    // if relation is opened in open relation table, return E_RELOPEN

    // retval  = ba_delete(relName);
    // return retval
}
```

## create Index
#### Description
This method creates a bplus indexing on an attribute attr in a relation relName as specified in arguments.
#### Arguments
|Name|Type|Description|
|----------|--------------------|-------------------------------------------------------------|
| relName  | `char[ATTR_SIZE]`    | Name of the Relation.                                       |
| attr	   | `char [ATTR_SIZE]`	| Name of the Attribute.                                      |

#### Return value
|Value|Description|
|----------------|-----------------------------------------------------------------------------------------------------------|
| `SUCCESS`        | On successful creation of B+ tree.                                                                        |
| `E_RELNOTOPEN`   | If the relation is not open.                                                                              |
| `E_ATTRNOTEXIST` | If the attribute with name attr does not exist.                                                           |
| `E_DISKFULL`     | If there is no enough space in the disk to create the tree                                                |
| `E_INVALID`      | If the relName is either "relcat" or "attrcat". i.e, when the user tries to create an index for catalogs. |

#### Algorithm

```cpp
int createIndex(char relName[ATTR_SIZE],char attr[ATTR_SIZE]){
    // get the src relation's open relation id, using getRelId() method of Openreltable.
    // if source not opened in open relation table, return E_RELNOTOPEN

    // retval=bplus_create(relid,attr);
    // return retval
}
```

## drop Index
#### Description
This method drops the bplus indexing on an attribute attr in a relation relName as specified in arguments.
#### Arguments
|Name|Type|Description|
|----------|--------------------|-------------------------------------------------------------|
| relName  | `char[ATTR_SIZE]`    | Name of the Relation.                                       |
| attr	   | `char [ATTR_SIZE]`	| Name of the Attribute.                                      |

#### Return value
|Value|Description|
|------------------|-------------------------------------------------|
| `SUCCESS`        | On successful deletion of the B+ tree           |
| `E_RELNOTOPEN`   | If the relation is not open.                    |
| `E_ATTRNOTEXIST` | If the attribute with name attr does not exist. |
| `E_INVALID`      | If the relName is either "relcat" or "attrcat". |


#### Algorithm
```cpp
int dropIndex(char relName[ATTR_SIZE],char attr[ATTR_SIZE]){
    // get the src relation's open relation id, using getRelId() method of Openreltable.
    // if source opened in open relation table, return E_RELOPEN

    // retval=bplus_destroy(relid,attr);
    // return retval
}
```

## rename Relation
#### Description
This method changes the relation name of specified relation to new name as specified in arguments.
#### Arguments
|Name|Type|Description|
|------------|-----------------|-------------------------------------------------------|
| oldRelName | `char[ATTR_SIZE]` | Old Name of Relation to which name has to be changed. |
| newRelName | `char[ATTR_SIZE`] | New name for the Relation.                            |

#### Return value
|Value|Description|
|---------------|---------------------------------------------------------------------------------------------------------------|
| `SUCCESS`       | On successful renaming of the relation                                                                        |
| `E_RELOPEN`     | If the relation is open.                                                                                      |
| `E_RELNOTEXIST` | If the relation with name oldRelName does not exist                                                           |
| `E_RELEXIST`    | If the relation with name newRelName already exists                                                           |
| `E_INVALID`     | If the oldrelName is either "relcat" or "attrcat". i.e, when the user tries to rename either of the catalogs. |

#### Algorithm
```cpp
int renameRel(char oldRelName[ATTR_SIZE],char newRelName[ATTR_SIZE]){
    // get the relation's open relation id(let it be srelid), using getRelId() method of Openreltable
    // if relation is opened in open relation table, return E_RELOPEN

    //retval= ba_renamerel(OldrelName,NewrelName);
    // return retval
}
```
## rename Attribute
#### Description
This method changes the name of an attribute/column present in a specified relation, to new name as specified in arguments.
#### Arguments
|Name|Type|Description|
|-------------|-----------------|-------------------------|
| relName     | `char[ATTR_SIZE]`  | Name of the Relation.   |
| oldAttrName | `char[ATTR_SIZE]`  | Old Name of attribute.  |
| newAttrName | `char[ATTR_SIZE]` | New name for attribute. |
#### Return value
|Value|Description|
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `SUCCESS`        | On successful renaming of the attribute                                                                                           |
| `E_RELOPEN`      | If the relation is open.                                                                                                          |
| `E_RELNOTEXIST`  | If the relation with name relName does not exist                                                                                  |
| `E_ATTRNOTEXIST` | If the attribute with name oldAttrName does not exist                                                                             |
| `E_ATTREXIST`    | If the attribute with name newAttrName already exists                                                                             |
| `E_INVALID`      | If the relName is either "relcat" or "attrcat". i.e, when the user tries to rename any attribute value of either of the catalogs. |
#### Algorithm
```cpp
int renameAttr(char relName[ATTR_SIZE], char oldAttrName[ATTR_SIZE], char newAttrName[ATTR_SIZE]){
    // get the relation's open relation id(let it be srelid), using getRelId() method of Openreltable
    // if relation is opened in open relation table, return E_RELOPEN
    
    // retval= ba_renameattr(relName,OldAttrName,NewAttrName);
    // return retval
}
```
## open Relation
#### Description
This method Opens the relation specified as name in cache/OpenRelTable.
#### Arguments
|Name|Type|Description|
|----------|--------------------|-------------------------------------------------------------|
| relName  | `char[ATTR_SIZE]`    | Name of the Relation.                                       |
#### Return value
|Value|Description|
|---------------|--------------------------------------------------------------|
| `relId`         | Returns the relId on succesful opening of the relation       |
| `E_RELNOTEXIST` | If the relation with name relName does not exist in the disk |
| `E_CACHEFULL`   | If there are no free slots in the Open Relation table.       |

#### Algorithm
```cpp
int openRel(char relName[16]){
    //retval = openRel(relName) (call to OpenRel of OpenRelTable)
    //return retval;
}
```
## close Relation
#### Description
This method closes the relation specified as name in cache/OpenRelTable.
#### Arguments
|Name|Type|Description|
|----------|--------------------|-------------------------------------------------------------|
| relName  | `char[ATTR_SIZE]`    | Name of the Relation.                                       |
#### Return value
|Value|Description|
|-----------|-----------------------------------------------------------------------------------------------------------|
| `SUCCESS`   | On successful closing of the relation                                                                     |
| `E_NOTOPEN` | If relation with given name is not open                                                                   |
| `E_INVALID` | If the relName is either "relcat" or "attrcat". i.e, when the user tries to close either of the catalogs. |


#### Algorithm

```cpp
int closeRel(char relName[ATTR_SIZE]){
    // get the rel_name relation's open relation id(let it be rel_id), using getRelId() method of Openreltable
    // if relation is not opened in Openreltable, return E_RELNOTOPEN

    //close the rel_id'th relation using closeRel() of OpenRelTable(in cache), let the return value be retval
    //return retval;
}
```
## getSchema
YET TO BE DESIGNED