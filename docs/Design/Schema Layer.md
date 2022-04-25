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

## Schema :: createRel()
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

    // let relNameAsAttribute be of type Attribute
	// copy the relName into relNameAsAttribute.sVal

	// let targetRelId be of type recId

	/*
		Search the relation RELCAT(relId RELCAT_RELID,which is equal to 0) for attribute value attribute "RelName" = relNameAsAttribute
	    using ba_search() of Block Access Layer with OP = EQ and flagValidAttrName = True
	    Let the return value of ba_search be retVal
		Hint: retVal = BlockAccess::ba_search(RELCAT_RELID, relCatSearchResultRecord, "RelName",
                                        relNameAsAttribute, EQ, true);
	*/
	
	// if retVal == SUCCESS (i.e relation with relation name as relName already exists)
	// return E_RELEXIST;

	// compare every pair of attributes of attrNames[] array
	// if any attribute names have same string value, return E_DUPLICATEATTR (i.e 2 attributes have same value)

	// let Attribute relCatRecord[6] be the new record to be inserted into relation catalog corresponding to new relation)
	// fill relCatRecord fields as given below
	// offset RELCAT_REL_NAME_INDEX: relName
	// offset RELCAT_NO_ATTRIBUTES_INDEX: numOfAttributes
	// offset RELCAT_NO_RECORDS_INDEX: 0
	// offset RELCAT_FIRST_BLOCK_INDEX: -1
	// offset RELCAT_LAST_BLOCK_INDEX: -1
	// offset RELCAT_NO_SLOTS_PER_BLOCK_INDEX: floor((2016 / (16 * nAttrs + 1)))

	// retVal = ba_insert(RELCAT_RELID(=0), relCatRecord);
	// if ba_insert fails return retVal

	// iterate through 0 to numOfAttributes - 1 :
	{
		// let Attribute attrCatRecord[6] be the record in attribute catalog corresponding to i'th Attribute)
		// (where i is the iterator of the loop)
		// fill attrCatRecord fields(corresponding to i'th attribute of the relation) as given below
		// offset ATTRCAT_REL_NAME_INDEX: relName
		// offset ATTRCAT_ATTR_NAME_INDEX: attrNames[i]
		// offset ATTRCAT_ATTR_TYPE_INDEX: attrTypes[i]
		// offset ATTRCAT_PRIMARY_FLAG_INDEX: -1
		// offset ATTRCAT_ROOT_BLOCK_INDEX: -1
		// offset ATTRCAT_OFFSET_INDEX: i

		// retVal = BlockAccess::ba_insert(ATTRCAT_RELID(=1), attrCatRecord);
		/* if ba_insert fails:
			delete the relation by calling deleteRel(targetrel) of schema layer
			return E_DISKFULL
		*/
	}

	// return SUCCESS
}
```

## Schema :: deleteRel()
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
| `E_NOTPERMITTED`     | If relName is either "RELATIONCAT" or "ATTRIBUTECAT". i.e., when the user tries to delete the catalogs. |

#### Algorithm
```cpp
int Schema::deleteRel(char *relName) {
    // if the relation to delete is either Relation Catalog or Attribute Catalog, return E_NOTPERMITTED
        // compare the input relName with "RELATIONCAT" and "ATTRIBUTECAT"
        // OR use the following constants: RELCAT_NAME and ATTRCAT_NAME


	// get the open relation id using appropriate method of OpenRelTable class by passing relation name as argument

	// if relation is opened in open relation table, return E_RELOPEN

	// Call ba_deleteRelation method of the Block Access Layer by passing appropriate argument.

	// return the value returned by the above ba_deleteRelation() call
    // Errors from ba_deleteRelation -> E_RELNOTEXIST
        //  AS OF NOW, It can return E_OUT_OF_BOUND from loadBlockAndGetBufferPtr call,
        //  but if done properly we will not reach this point
        //  this comes up only when BlockBuffer(or RecBuffer) was initialized with an Invalid Block Number

}
```

## Schema :: createIndex()
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
    // get the relation's open relation id using OpenRelTable::getRelId() method

	// if relation is not open in open relation table, return E_RELNOTOPEN
	// (check if the value returned from getRelationId function call = E_RELNOTOPEN)

	// TODO: Update once BPlus Layer algorithms are completed
	// BPlusTree bPlusTree = BPlusTree(relId, attrName);
	// if(bPlusTree.blockNum == DISK_FULL)
	// return DISK_FULL;
}
```

## Schema :: dropIndex()
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
int Schema::dropIndex(char *relName, char *attr) {
	// get the open relation id using appropriate method of OpenRelTable class by passing relation name as argument

	// if relation is opened in open relation table, return E_RELOPEN

	// ret = bplus_destroy(relid,attr);
    
	// return ret
}
```

## Schema :: renameRel()
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
	// get the relation's open relation id using OpenRelTable::getRelId() method

	// if relation is open in open relation table, return E_RELOPEN
	// (check if the value returned from getRelId function call != E_RELNOTOPEN)

	// retVal = BlockAccess::ba_renameRelation(oldRelName, newRelName);
	// return retVal
}
```
## Schema :: renameAttr()
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
int Schema::renameAttr(char *relName, char *oldAttrName, char *newAttrName) {
	// get the open relation id using appropriate method of OpenRelTable class by passing relation name as argument

	// if relation is opened in open relation table, return E_RELOPEN

	// Call ba_renameAttribute method of Block Access Layer by passing appropriate arguments.

	// return the value returned by the above ba_renameAttribute() call
}
```
## Schema :: openRel()
#### Description
This method opens the relation specified as name in cache/OpenRelTable.
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
int Schema::openRel(char *relName) {
	// Call openRelation method of OpenRelTable by passing appropriate arguments
	int ret = OpenRelTable::openRel(relName);

	// return the value returned by the above openRelation() call
	return ret;
}
```
## Schema :: closeRel()
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
int closeRel(char relName[ATTR_SIZE]) {
    // get the relation's open relation id using OpenRelTable::getRelationId() method

	// if relation is not open in open relation table, return E_RELNOTOPEN
	// (check if the value returned from getRelationId function call = E_RELNOTOPEN)

	// close the relId'th relation using OpenRelTable::closeRelation(relId) of Cache Layer
	// let the return value be retVal
	// return retVal;
}
```
## Schema :: getSchema()
YET TO BE DESIGNED