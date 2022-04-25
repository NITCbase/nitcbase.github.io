# Schema Layer Stub Code

## Schema.cpp
```cpp
#include "Schema.h"
#include "../Cache/OpenRelTable.h"
#include "../BlockAccess/BlockAccess.h"

int Schema::deleteRel(char *relName) {
    // if the relation to delete is either Relation Catalog or Attribute Catalog, return E_NOTPERMITTED
        // compare the input relName with "RELATIONCAT" and "ATTRIBUTECAT"
        // OR use the following constants: RELCAT_NAME and ATTRCAT_NAME


	// get the open relation id using appropriate method of OpenRelTable class by passing relation name as argument

	// if relation is opened in open relation table, return E_RELOPEN

	// Call ba_deleteRelation method of the Block Access Layer by passing appropriate argument.

	// return the value returned by the above ba_deleteRelation() call
    // Errors from ba_deleteRelation -> E_RELNOTEXIST
        // TODO: AS OF NOW, It can return E_OUT_OF_BOUND from loadBlockAndGetBufferPtr call,
        //  but if done properly we will not reach this point
        //  this comes up only when BlockBuffer(or RecBuffer) was initialized with an Invalid Block Number
}

int Schema::dropIndex(char *relName, char *attr) {
	// get the open relation id using appropriate method of OpenRelTable class by passing relation name as argument

	// if relation is opened in open relation table, return E_RELOPEN

	// ret = bplus_destroy(relid,attr);
	// return ret
}

int Schema::renameAttr(char *relName, char *oldAttrName, char *newAttrName) {
	// get the open relation id using appropriate method of OpenRelTable class by passing relation name as argument

	// if relation is opened in open relation table, return E_RELOPEN

	// Call ba_renameAttribute method of Block Access Layer by passing appropriate arguments.

	// return the value returned by the above ba_renameAttribute() call
}

int Schema::openRel(char *relName) {
	// Call openRelation method of OpenRelTable by passing appropriate arguments

	// return the value returned by the above openRelation() call
}

int Schema::createRel(char relName[], int numOfAttributes, char attrNames[][ATTR_SIZE], int attrTypes[]) {
	// let Attribute relNameAsAttribute
	// copy the relName into relNameAsAttribute.sVal

	// let recId targetrelid
	RecId targetRelId{};

	/*
		Search the relation RELCAT(relId RELCAT_RELID,which is equal to 0) for attribute value attribute "RelName" = relName_val
	    using ba_search() of Block Access Layer with OP = EQ
	    Let the return value of ba_search be retVal
	*/
	Attribute relCatSearchResultRecord[6];
	int retVal = BlockAccess::ba_search(RELCAT_RELID, relCatSearchResultRecord, "RelName", relNameAsAttribute, EQ);

	// if retVal == SUCCESS (i.e relation with relation name as relName already exists), return E_RELEXIST;

	// compare every pair of attributes of attrNames[] array
	// if any attribute names have same string value, return E_DUPLICATEATTR (i.e 2 attributes have same value)

	// let Attribute relCatRecord[6] be the new record to be inserted into relation catalog corresponding to new relation)
	// fill relCatRecord fields as given below:
	// offset RELCAT_REL_NAME_INDEX: relName
	// offset RELCAT_NO_ATTRIBUTES_INDEX: numOfAttributes
	// offset RELCAT_NO_RECORDS_INDEX: 0
	// offset RELCAT_FIRST_BLOCK_INDEX: -1
	// offset RELCAT_LAST_BLOCK_INDEX: -1
	// offset RELCAT_NO_SLOTS_PER_BLOCK_INDEX: floor((2016 / (16 * nAttrs + 1)))

	// retVal = ba_insert(RELCAT_RELID(=0), relCatRecord);
	// if ba_insert fails return retVal


	// iterate through 0 to numOfAttributes - 1 :
	for (int i = 0; i < numOfAttributes; ++i)
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

		// retval = ba_insert(ATTRCAT_RELID(=1), attrCatRecord);
		/* if ba_insert fails:
			delete the relation by calling deleteRel(targetrel) of schema layer
			return E_DISKFULL
		*/

	}

	// return SUCCESS
}

int Schema::createIndex(char relName[ATTR_SIZE],char attr[ATTR_SIZE]) {
	// get the relation's open relation id using OpenRelTable::getRelationId() method

	// if relation is not open in open relation table, return E_RELNOTOPEN
	// (check if the value returned from getRelationId function call = E_RELNOTOPEN)

	// retVal = bplus_create(relId, attr);
	// return retVal
}

int Schema::renameRel(char oldRelName[ATTR_SIZE],char newRelName[ATTR_SIZE]) {
	// get the relation's open relation id using OpenRelTable::getRelationId() method

	// if relation is open in open relation table, return E_RELOPEN
	// (check if the value returned from getRelationId function call != E_RELNOTOPEN)

	// retVal = BlockAccess::ba_renameRelation(oldRelName, newRelName);
	// return retVal
}

int Schema::closeRel(char *relName) {
	// get the relation's open relation id using OpenRelTable::getRelationId() method

	// if relation is not open in open relation table, return E_RELNOTOPEN
	// (check if the value returned from getRelationId function call = E_RELNOTOPEN)

	// close the relId'th relation using OpenRelTable::closeRelation(relId) of Cache Layer
	// let the return value be retVal
	// return retVal;
}

```
## Schema.h
```cpp
#ifndef NITCBASE_SCHEMA_H
#define NITCBASE_SCHEMA_H

#include "../define/constants.h"
#include "../define/errors.h"

class Schema {
public:

	static int createRel(char relName[], int numOfAttributes, char attrs[][ATTR_SIZE], int attrType[]);
	static int deleteRel(char relName[ATTR_SIZE]);
	static int createIndex(char relName[ATTR_SIZE], char attr[ATTR_SIZE]);
	static int dropIndex(char relName[ATTR_SIZE], char attr[ATTR_SIZE]);
	static int renameRel(char oldRelName[ATTR_SIZE], char newRelName[ATTR_SIZE]);
	static int renameAttr(char relName[ATTR_SIZE], char oldAttrName[ATTR_SIZE], char newAttrName[ATTR_SIZE]);
	static int openRel(char relName[ATTR_SIZE]);
	static int closeRel(char relName[ATTR_SIZE]);
};

#endif //NITCBASE_SCHEMA_H
```