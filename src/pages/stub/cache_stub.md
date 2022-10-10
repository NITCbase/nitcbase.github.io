# Cache Layer Stub Code

## RelCacheTable.cpp

```cpp
#include "RelCacheTable.h"
#include "OpenRelTable.h"

RelCacheEntry *RelCacheTable::relCache[MAX_OPEN];

int RelCacheTable::getRelCatEntry(int relId, RelCatEntry *relCatBuf) {
    // if relId is outside the range [0, MAX_OPEN-1] return E_OUTOFBOUND

    // if entry corresponding to the relId in the Relation Cache Table is free

    //copy the corresponding Relation Catalog entry in the Relation Cache Table to relCatBuf.

    // return SUCCESS
}

int RelCacheTable::setRelCatEntry(int relId, RelCatEntry *relCatBuf) {
    // if relId is outside the range [0, MAX_OPEN-1] return E_OUTOFBOUND

    // if entry corresponding to the relId in the Relation Cache Table is free

    //copy the relCatBuf to the corresponding Relation Catalog entry in the Relation Cache Table.

    //set the dirty flag of the corresponding Relation Cache entry in the Relation Cache Table.

    // return SUCCESS
}

int RelCacheTable::getSearchIndex(int relId, RecId *searchIndex) {
    // if relId is outside the range [0, MAX_OPEN-1] return E_OUTOFBOUND

    // if entry corresponding to the relId in the Relation Cache Table is free

    // copy the searchIndex field of the Relation Cache entry corresponding to input relId to searchIndex variable.

    // return SUCCESS
}

int RelCacheTable::setSearchIndex(int relId, RecId *searchIndex) {
    // if relId is outside the range [0, MAX_OPEN-1] return E_OUTOFBOUND

    // if entry corresponding to the relId in the Relation Cache Table is free

    // copy the searchIndex variable to the searchIndex field of the Relation Cache entry corresponding to input relId.

    // return SUCCESS
}

void RelCacheTable::recordToRelCacheEntry(union Attribute record[RELCAT_NO_ATTRS], RelCacheEntry *relCacheEntry) {
    /*
     * The dirty, recId, and searchIndex fields are initialised with default values of
     * false, {-1, -1}, and {-1, -1}, respectively
     */
    // The record content is used to populate the relCatEntry field
}

void RelCacheTable::relCacheEntryToRecord(union Attribute record[RELCAT_NO_ATTRS], RelCacheEntry *relCacheEntry) {
    //  The record is populated with the contents of the relCatEntry field.
    //  The dirty, recId, and searchIndex fields are used only during runtime and are not written to the disk.
}

```

## RelCacheTable.h

```cpp
#ifndef NITCBASE_RELCACHETABLE_H
#define NITCBASE_RELCACHETABLE_H

#include "../define/constants.h"
#include "../Buffer/BlockBuffer.h"

typedef struct RelCatEntry {

	unsigned char relName[ATTR_SIZE];
	int numAttrs;
	int numRecs;
	int firstBlk;
	int lastBlk;
	int numSlotsPerBlk;

} RelCatEntry;

typedef struct RelCacheEntry {

	RelCatEntry relCatEntry;
	bool dirty;
	RecId recId;
	RecId searchIndex;

} RelCacheEntry;

class RelCacheTable {

	friend class OpenRelTable;

public:
	//methods
	static int getRelCatEntry(int relId, RelCatEntry *relCatBuf);
	static int setRelCatEntry(int relId, RelCatEntry *relCatBuf);
	static int getSearchIndex(int relId, RecId *searchIndex);
	static int setSearchIndex(int relId, RecId *searchIndex);

private:
	//field
	static RelCacheEntry* relCache[MAX_OPEN];

	//methods
	static void recordToRelCacheEntry(union Attribute record[RELCAT_NO_ATTRS], RelCacheEntry* relCacheEntry);
	static void relCacheEntryToRecord(union Attribute record[RELCAT_NO_ATTRS], RelCacheEntry* relCacheEntry);

};
#endif //NITCBASE_RELCACHETABLE_H
```

## AttrCacheTable.cpp

```cpp
#include "AttrCacheTable.h"
#include "../define/constants.h"
#include "../define/errors.h"

AttrCacheEntry * AttrCacheTable::attrCache[MAX_OPEN];

int AttrCacheTable::getAttrCatEntry(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {
    
    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }
    
    if entry corresponding to the relId in the Attribute Cache Table is free:
    {
        return E_NOTOPEN;
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

int AttrCacheTable::setAttrCatEntry(relId relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {
    
    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }
    
    if entry corresponding to the relId in the Attribute Cache Table is free:
    {
        return E_NOTOPEN;
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

int AttrCacheTable::getSearchIndex(int relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {
    
    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }
    
    if entry corresponding to the relId in the Attribute Cache Table is free:
    {
        return E_NOTOPEN;
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

int AttrCacheTable::setSearchIndex(relId relId, unsigned char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {
    
    if relId is outside the range [0, MAX_OPEN-1]:
    {
        return E_OUTOFBOUND;
    }
    
    if entry corresponding to the relId in the Attribute Cache Table is free:
    {
        return E_NOTOPEN;
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

void AttrCacheTable::recordToAttrCacheEntry(union Attribute record[ATTRCAT_NO_ATTRS], AttrCacheEntry *attrCacheEntry) {
}


void AttrCacheTable::attrCacheEntryToRecord(union Attribute record[ATTRCAT_NO_ATTRS], AttrCacheEntry *attrCacheEntry) {
}

```

## AttrCacheTable.h

```cpp
#ifndef NITCBASE_ATTRCACHETABLE_H
#define NITCBASE_ATTRCACHETABLE_H

#include "../define/constants.h"
#include "../Buffer/BlockBuffer.h"

typedef struct AttrCatEntry {

	unsigned char relName[ATTR_SIZE];
	unsigned char attrName[ATTR_SIZE];
	int attrType;
	bool primaryFlag;
	int rootBlock;
	int offset;

} AttrCatEntry;

typedef struct AttrCacheEntry {

	AttrCatEntry attrCatEntry;
	bool dirty;
	RecId recId;
	IndexId searchIndex;
	struct AttrCacheEntry *next;

} AttrCacheEntry;

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
	static void recordToAttrCacheEntry(union Attribute record[ATTRCAT_NO_ATTRS], AttrCacheEntry *attrCacheEntry);
	static void attrCacheEntryToRecord(union Attribute record[ATTRCAT_NO_ATTRS], AttrCacheEntry *attrCacheEntry);

};

#endif //NITCBASE_ATTRCACHETABLE_H
```

## OpenRelTable.cpp

```cpp
#include "OpenRelTable.h"
#include "RelCacheTable.h"
#include "AttrCacheTable.h"

OpenRelTableMetaInfo OpenRelTable::tableMetaInfo[MAX_OPEN];

OpenRelTable::OpenRelTable() {

	// initialize tableMetaInfo of all the entries of the Open Relation Table with free as true and relName as an empty string.

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

		/* read the ith record entry from bock 5, the block corresponding to Attribute Catalog in the disk, and create an Attribute Cache entry on it
	   using RecBuffer::getRecord() and AttrCacheTable::recordToAttrCacheEntry().
	   update the recId field of this Attribute Cache entry to {5,i}.
	   add the Attribute Cache entry to the linked list of listHead .*/
	}

	// set the 0th entry of the AttrCacheTable to listHead.

	/**** setting up Relation Catalog relation in the Open Relation Table ****/

	//update the 0th entry of the tableMetaInfo with free as false and relName as the 'RelCatalog'.

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

	//update the 1st entry of the tableMetaInfo with free as false and relName as the 'AttrCatalog'.

}

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

int OpenRelTable::getRelId(unsigned char relName[ATTR_SIZE]) {

	/* traverse through the tableMetaInfo array,
		find the entry in the Open Relation Table corresponding to relName.*/

	// if found return the relation id, else indicate that the relation do not have an entry in the Open Relation Table.

}

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
		return E_NOTOPEN;
	}

	/****** Releasing the Relation Cache entry of the relation ******/

	// if the Relation Catalog entry of the relIdth Relation Cache entry has been modified:
	{
		/* Get the Relation Catalog entry from Cache using RelCacheTable::relCacheEntryToRecord().
        Write back that entry by instantiating RecBuffer class. Use recId member field and recBuffer.setRecord() */
	}

	/****** Releasing the Attribute Cache entry of the relation ******/

	// iterate over all the entries in the linked list of the relIdth Attribute Cache entry.
	{
		if the entry has been modified:
		{
			/* Get the Attribute Catalog entry from Cache using AttrCacheTable::attrCacheEntryToRecord().
             Write back that entry by instantiating RecBuffer class. Use recId member field and recBuffer.setRecord() */

		}

		// free the memory dynamically alloted to this entry in Attribute Cache linked list.
	}

	/****** Updating metadata in the Open Relation Table of the relation  ******/

	//free the relIdth entry of the tableMetaInfo.

	return SUCCESS;

}

int OpenRelTable::getFreeOpenRelTableEntry() {

	/* traverse through the tableMetaInfo array,
		find a free entry in the Open Relation Table.*/

	// if found return the relation id, else return E_CACHEFULL.

}

```

## OpenRelTable.h

```cpp
#ifndef NITCBASE_OPENRELTABLE_H
#define NITCBASE_OPENRELTABLE_H

#include "../define(/constants).h"
#include "../define/errors.h"

typedef struct OpenRelTableMetaInfo {

	bool free;
	unsigned char rel_name[ATTR_SIZE];

} OpenRelTableMetaInfo;

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

#endif //NITCBASE_OPENRELTABLE_H

```
