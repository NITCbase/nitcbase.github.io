---
sidebar_position: 5
title: 'Block Access Layer'
---
https://nitcbase.github.io/archived-site/blockaccess.html

import Link from '@docusaurus/Link';

:::info note 
The Block Access Layer code is to be written in `BlockAccess.cpp` and it's header file `BlockAccess.h`


**<Link to="/block_access_stub">The stub code for these files can be found here.</Link >**
:::

## Layout
In any database management system, in order to retrieve data from the database or to alter the schema of the relations in the database, the system has to work with the disk blocks. *Block Access layer provides an abstraction that hides the disk structures to the above layers* (*<Link to="/docs/Design/Algebra%20Layer"> Algebra layer </Link>*  and *<Link to="/docs/Design/Schema%20Layer"> Schema layer </Link>)*. 


The *block access layer also provides an interface to the above layers in terms of records instead of disk blocks*. Hence, the Block Access layer processes the requests for update/retrieval from the algebra and schema layers and works with disk blocks that are buffered by the *<Link to="/docs/Design/Buffer%20Layer"> Buffer layer </Link>)*.

NITCbase follows an Object-Oriented design for Block Access Layer. The class definition is as shown below.

---

## class BlockAccess

```cpp
class BlockAccess {
public:

	static int search(int relId, Attribute *record, char *attrName, Attribute attrVal, int op, int flagValidAttrName);

	static int insert(int relId, union Attribute *record);

	static int renameRelation(char *oldName, char *newName);

	static int renameAttribute(char *relName, char *oldName, char *newName);

	static int deleteRelation(char *relName);

	static RecId linearSearch(int relId, char *attrName, Attribute attrVal, int op);

};
```

### BlockAccess :: linearSearch()

#### Description
This method searches the relation specified linearly to find the next record that satisfies the specified condition on attribute attrVal and returns the recId of the next record satisfying the condition.

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| relId |	`int` |	Relation Id of Relation to which search has to be made. |
| attrName |	`char[ATTR_SIZE]` |	Attribute/column name to which condition need to be checked with. |
| attrVal |	`union Attribute` |	value of attribute that has to be checked against the operater. |
| op |	`int` |	Conditional Operator(can be one among `EQ,LE,LT,GE,GT,NE,RST,PRJCT` corresponding to *equal,less than or equal, less than ,greater than or equal, greater than, not equal, reset, projet operators respectively). |

#### Return Values
| Value | Description |
|-----------|-----------------|
| recId (block#, slot#) |	returns (block#, slot#) of the record corresponding to the next hit.
 |(-1, -1) |	If no valid next hit is found.

#### Algorithm
```cpp
RecId BlockAccess::linearSearch(int relId, char attrName[ATTR_SIZE], union Attribute attrVal, int op) {
	// get the previous search index of the relation relId from the relation cache
	// (use RelCacheTable::getSearchIndex() function)

	// let block and slot denote the record id of the record being currently checked

	// if the current search index record is invalid(i.e. both block and slot = -1)
	if (prevRecId.block == -1 && prevRecId.slot == -1)
	{
		// (no hits from previous search; search should start from the first record itself)

		// get the first record block of the relation from the relation cache
		// (use RelCacheTable::getRelCatEntry() function of Cache Layer)

		// block = first record block of the relation
		// slot = 0
	}
	else 
	{
		//	(there is a hit from previous search; search should start from the record next to the search index record)

		// block = search index's block
		// slot = search index's slot + 1
	}

	// The following code searches for the next record in the relation that satisfies the given condition
	// Start from the record id (block, slot) and iterate over the remaining records of the relation
	while (block != -1)
	{

		// create a RecBuffer object for block (use RecBuffer Constructor for existing block)

		// get the record with id (block, slot) using RecBuffer::getRecord() function
		// get header of the block using RecBuffer::getHeader() function
		// get slot map of the block using RecBuffer::getSlotMap() function

		// If slot >= the number of slots per block(i.e. no more slots in this block)
		{
			// update block = right block of block
			// update slot = 0
		}

		// if slot is free skip the loop
		// (i.e. check if slot'th entry in slot map of block contains SLOT_UNOCCUPIED)
		{
			// and continue to the next record slot
			// (i.e. increment slot and continue)
		}

		// let cond be a variable of int type
		
		if ( op != PRJCT ) 
		{
			// compare record's attribute value to the the given attrVal as below:
			/*
				firstly get the attribute offset for the attrName attribute
				from the attribute cache entry of the relation using AttrCacheTable::getAttrCatEntry
			*/
			// use the attribute offset to get the value of the attribute from current record
			// perform comparison using compare function and store the outcome of comparison in the variable flag

			// initialize cond = UNSET

		
			// Next task is to check whether this record satisfies the given condition.
			// It is determined based on the output of previous comparison and the op value received.
			// The following code sets the cond variable if the condition is satisfied.
			switch (op) {

				case NE:
					// if op is "not equal to"
					// if the record's attribute value is not equal to the given attrVal
					if (flag != 0) {
						// SET the cond variable (i.e. cond = SET)
					}
					break;

				case LT:
					// if op is "less than"
					// if the record's attribute value is less than the given attrVal
					if (flag < 0) {
						// SET the cond variable (i.e. cond = SET)
					}
					break;

				case LE:
					// if op is "less than or equal to"
					// if the record's attribute value is less than or equal to the given attrVal
					if (flag <= 0) {
						// SET the cond variable (i.e. cond = SET)
					}
					break;

				case EQ:
					// op is "equal to"
					// if the record's attribute value is equal to the given attrVal
					if (flag == 0) {
						// SET the cond variable (i.e. cond = SET)
					}
					break;

				case GT:
					// if op is "greater than"
					// if the record's attribute value is greater than the given attrVal
					if (flag > 0) {
						// SET the cond variable (i.e. cond = SET)
					}
					break;

				case GE:
					// if op is "greater than or equal to"
					// if the record's attribute value is greater than or equal to the given attrVal
					if (flag >= 0) {
						// SET the cond variable (i.e. cond = SET)
					}
					break;
			}
		}

		if (cond == SET || op == PRJCT) {
			/*
				set the search index in the relation cache as
			    the record id of the record that satisfies the given condition
			    (use RelCacheTable::setSearchIndex function)
		    */

			return RecId{block, slot};
		}

	}

	// no record in the relation with Id relid satisfies the given condition
	return {-1, -1};
```


### BlockAccess :: search()

#### Description
This method searches the relation specified to find the next record that satisfies the specified condition on attribute attrVal and updates the recId of next record satisfying the condition in cache.(uses the b+ tree if target attribute is indexed, otherwise, it does linear search).

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| relId	| `int`	| Relation Id of Relation to which search has to be made. | 
| record	| `union Attribute*`	| pointer to record where next found record satisfying given condition is to be placed. | 
| attrName	| `char[ATTR_SIZE]`	| Attribute/column name to which condition need to be checked with. | 
| attrVal	| `union Attribute`	| value of attribute that has to be checked against the operater. | 
| op	| `int`	| Conditional Operator (can be one among `EQ` , `LE` , `LT` , `GE` , `GT` , `NE` , `RST` , `PRJCT` corresponding to equal, less or than equal, less than ,greater than or equal, greater than, not equal, reset and projet operators respectively). | 
| flagValidAttrName | `int` | Specifies whether the attrName passed as argument is a valid one or not. For example, for resetting the search hit before doing a search using project operator, we will be required to pass dummy attrName (and a dummy attrVal) in which case this flag is set to `false` |

#### Return Values
| Value | Description |
|-----------|-----------------|
| [`SUCCESS`](/constants)	| On successful copy of record to record | 
| [`E_NOTFOUND`](/constants)	| If it fails to find a record satisfying the given condition | 

#### Algorithm
```cpp
int BlockAccess::search(int relId, Attribute *record, char *attrName, Attribute attrVal, int op, int flagValidAttrName) {
    // Declare a variable called recid to store the searched record
    RecId recId;

    // If op = PRJCT:
        // search for the next record id (recid) corresponding for the relation
        // by passing op = PRJCT and dummy attrName, attrVal.
        recId = linearSearch(relId, attrName, attrVal, op);

    // else {
        // if (flagValidAttrName == false && op == RST):
            // assign the previous record id (prevRecId) to {block_num=-1, slot_num=-1}
            
            /* update the previous record id (prev_recid) in the relation cache entry
             * corresponding to the relation with Id = relid by using method from the cache layer */
            

            // return SUCCESS;
        }

        /* get the attribute catalog entry from the attribute cache corresponding
        to the relation with Id=relid and with attribute_name=attrName  */

        // get rootBlock from the attribute catalog entry (attrcat_entry)
        // if Index does not exist for the attribute (check rootBlock == -1)
        // if (attrCatEntry.rootBlock == -1) :
            // if the op is reset
            if (op == RST) {
                // assign the previous record id (prevRecId) to {block_num=-1, slot_num=-1}

                /* update the previous record id (prev_recid) in the relation cache entry
                 * corresponding to the relation with Id = relid by using method from the cache layer */
               
                // return SUCCESS;
            }

            // search for the record id (recid) corresponding to the attribute with attribute name attrName, with value attrval
            // and satisfying the condition op using linearSearch()
            
        // else:
            // else Index exists for the attribute
            // if (op == RST):
                // assign the previous index id (prevIndexId variable) to {block_num=-1, index_num=-1}
                
                /* update the previous index id (prev_recid) in the attribute cache corresponding
                   to the relation with Id relid and attribute name with attrName
                   using appropriate method of cache layer */
                

                // return SUCCESS
            
            // search for the record id (recid) correspoding to the attribute with attribute name attrName and with value attrval
            
			// recid = bplus_search(relId, attrName, attval, op);
	}

	// if it fails to find a record satisfying the given condition (recId = {-1, -1}) return E_NOTFOUND;

	/* Copy the record with record id (recId) to the record buffer (record)
	   For this Instantiate a RecBuffer class object by passing the recId and
	   call the appropriate method to fetch the record
	*/

	// return SUCCESS
}
```


### BlockAccess :: insert()

#### Description
This method inserts the Record into Relation as specified in arguments.

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| relId	| `int`	| Relation Id of Relation to which record is to be inserted | 
| record	| `union Attribute*`	| Pointer to Record(containing values for all the attributes), Record is an array of Attribute type | 


#### Return Values
| Value | Description |
|-----------|-----------------|
| [`SUCCESS`](/constants)	| On successful insert of the given record | 
| [`E_INDEX_BLOCKS_RELEASED`](/constants)	| Record was inserted successfully, but the index existing on one or more attributes had to be deleted due to insufficient disk space | 
| [`E_DISKFULL`](/constants)	| If disk space is not sufficient for inserting the record / index |

#### Algorithm
```cpp
int BlockAccess::insert(int relId, union Attribute *record){
	// get the relation catalog entry from relation cache
	// ( use RelCacheTable::getRelCatEntry() of Cache Layer)
	
	// let blockNum denote the first record block of the relation (obtained from relation catalog entry)

	// Let rec_id denote the record id for the new record to be inserted

	// let numOfSlots denote the number of slots per record block (obtained from relation catalog entry)
	// let numOfAttributes denote the number of attributes of the relation (obtained from relation catalog entry)

	// let prevBlockNum = -1;

	/*
		Traversing the linked list of existing record blocks of the relation
	    until a free slot is found OR
	    until the end of the list is reached
	*/
	{
		// create a RecBuffer object for blockNum(use constructor for existing block)

		// get header of block(blockNum) using RecBuffer::getHeader() function

		// get slot map of block(blockNum) using RecBuffer::getSlotMap() function

		// search for free slot in block(blockNum) and store it's record id in rec_id
		// (Free slot can be found by checking the slot map of a block;
		// slot map stores SLOT_UNOCCUPIED if slot is free and SLOT_OCCUPIED if slot is occupied)

		// if a free slot is found,
		// update the slot map with SLOT_OCCUPIED for this slot
		// and exit the loop

		// otherwise, continue to check the next block by updating the block as follows:
		// (i.e. the block next to the current block in the linked list of record blocks)
		// (stored as rblock field in the header of block)
		// update prevBlockNum = blockNum
		// update blockNum = header.rblock
	}

	//	if(no free slot is found in existing record blocks)
	{
		// if relation is RELCAT, do not allocate any more blocks (i.e. if relId = RELCAT_RELID)
		//	return E_MAXRELATIONS;

		// get a new record block by calling RecBuffer Constructor for new block

		// get the block number of the newly allocated block 
		// (use BlockBuffer::getBlockNum() function)
		// let ret denote the return value of getBlockNum function

		// if ret = E_DISKFULL
		{
			// disk is full
			return E_DISKFULL;
		}

		// Let rec_id store block = ret and slot = 0

		// note: prevBlockNum now stores the block number of the last element in the linked list

		/*
			set the header of the new record block such that it links with existing record blocks of the relation
			set the block's header as follows:
		    blockType: REC, pblock: -1
		    lblock
		            = -1 (if linked list of existing record blocks was empty)
					= prevBlockNum (otherwise),
		    rblock: -1, numEntries: 0,
			numSlots: numOfSlots, numAttrs: numOfAttributes
		    (use BlockBuffer::setHeader() function)
		*/

		/*
			set block's slot map with all slots marked as free
			(i.e. store SLOT_UNOCCUPIED for all the entries)
		    (use RecBuffer::setSlotMap() function)
		*/

		// create a RecBuffer object for blockNum(use constructor for existing block)
		// get the header of the block prevBlockNum
		// update the rblock field of the header to the new block number(i.e. rec_id.block)
		// (use BlockBuffer::getHeader() and BlockBuffer::setHeader() functions)

		// update last block field in the relation catalogue entry to the new block
		// (use RelCacheTable::setRelCatEntry() function of Cache Layer)
	}

	// create a RecBuffer object for rec_id.block(use constructor for existing block)
	
	// insert the record into rec_id'th slot by calling RecBuffer::setRecord() function)

	// update the slot map of the block by marking entry of the slot to which record was inserted as occupied)
	// (ie store SLOT_OCCUPIED in free_slot'th entry of slot map)
	// (use RecBuffer::getSlotMap() RecBuffer::setSlotMap() functions)

	// increment the numEntries field in the header of the block (to which record was inserted)
	// (use BlockBuffer::getHeader() and BlockBuffer::setHeader() functions)

	// Increment the number of records field in the relation cache entry for the relation.
	// (use RelCacheTable::setRelCatEntry function)

	/*
	    B+ tree insert
	 */
	// Let flag = SUCCESS
	
	// Iterate over all the attributes of the relation
	// Let attrOffset be the iterator that ranges from 0 to numOfAttributes-1
	{
		// get the attribute catalog entry for the attribute from the attribute cache
		// (use AttrCacheTable::getAttrCatEntry() function with arguments relId and attrOffset)

		// Let rootBlock be the root block field from the attribute catalog entry

		// if index exists for the attribute(i.e. rootBlock != -1)
		{
			// TODO: Update once BPlus Layer algorithms are completed
			// BPlusTree bPlusTree = BPlusTree(relId, attrName);
			int retVal = bPlusTree.bPlusInsert(record[attrOffset], rec_id);
			// if (retVal == E_DISKFULL) 
			{
				// delete the b+ tree for the attribute using ? function

				flag = E_INDEX_BLOCKS_RELEASED
			}
		}
	}

	return flag;
}
```

### BlockAccess :: renameRelation()

#### Description
This method changes the relation name of specified relation to the new name specified in arguments.

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| oldName	| `char[ATTR_SIZE`	| Old Name of Relation to which name has to be changed | 
| newName	| `char[ATTR_SIZE]`	| New name for the Relation | 
 

#### Return Values
| Value | Description |
|-----------|-----------------|
| [`SUCCESS`](/constants)	| On successful renaming of the relation | 
| [`E_RELNOTEXIST`](/constants)	| If the relation with name oldName does not exist | 
| [`E_RELEXIST`](/constants)	| If the relation with name newName already exists | 


#### Algorithm
```cpp
int BlockAccess::renameRelation(char oldName[ATTR_SIZE], char newName[ATTR_SIZE]){
	Attribute newRelationName;
	strcpy(newRelationName.sVal, newName);

	// Reset the Search Index by using RelCacheTable and setting value to {-1, -1}
    RecId searchIndex = {-1, -1};
    RelCacheTable::setSearchIndex(RELCAT_RELID, &searchIndex);
	// search for the relation with name newName in relation catalog using linearSearch()
	relcat_recid = linearSearch(RELCAT_RELID, "RelName", newRelationName, EQ ); 
	// note: newRelationName is of type Attribute (to be constructed from newName)
	
	// If relation with name newName already exits
	if(relcat_recid != {-1,-1}){ 
		return E_RELEXIST;
	}

	Attribute oldRelationName;
	strcpy(oldRelationName.sVal, oldName);
	
	// Reset the Search Index by using RelCacheTable and setting value to {-1, -1}
    searchIndex = {-1, -1};
    RelCacheTable::setSearchIndex(RELCAT_RELID, &searchIndex);
	// search for the relation with name oldName in relation catalog 
	relcat_recid = linearSearch( ---fill the arguments--- );

	// If relation with name relName does not exits
	if(relcat_recid == {-1,-1}) {
		return E_RELNOTEXIST;
	}
	
	// get the relation catalog record from the relation catalog (recid of the relation catalog record = relcat_recid)
	RecBuffer recBuffer = RecBuffer(relcat_recid.block);
	recBuffer.getRecord(relcat_record, relcat_recid.slot);
	
	// update the relation catalog record in the relation catalog with relation name newName
	recBuffer.setRecord(record, relcat_recid.slot);
	
	/* 
		update all the attribute catalog entries in the attribute catalog corresponding to the 
	  	relation with relation name oldName to the relation name newName 
	*/
	// NOTE: Reset the Search Index by using RelCacheTable and setting value to {-1, -1}
    searchIndex = {-1, -1};
    RelCacheTable::setSearchIndex(ATTRCAT_RELID, &searchIndex);
	
	
	return SUCCESS;
}
```


### BlockAccess :: renameAttribute()

#### Description
This method changes the name of an attribute/column present in a specified relation, to the new name specified in arguments.

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| relName	| `char[ATTR_SIZE`	| Name of the Relation | 
| oldName	| `char[ATTR_SIZE`	| Old Name of attribute | 
| newName	| `char[ATTR_SIZE]`	| New name for attribute | 


#### Return Values
| Value | Description |
|-----------|-----------------|
| [`SUCCESS`](/constants)	| On successful renaming of the attribute | 
| [`E_RELNOTEXIST`](/constants)	| If the relation with name relName does not exist | 
| [`E_ATTRNOTEXIST`](/constants) | If the attribute with name oldName does not exist | 
| [`E_ATTREXIST`](/constants)	| If the attribute with name newName already exists | 

#### Algorithm
```cpp
int BlockAccess::renameAttribute(char *relName, char *oldName, char *newName) {
	// Search for the relation with name relName in relation catalog using Linear Search
	Attribute attrValueRelName;
	strcpy(attrValueRelName.sVal, relName);
    RecId searchIndex = {-1, -1};
    RelCacheTable::setSearchIndex(RELCAT_RELID, &searchIndex);
	RecId relcatRecId = linearSearch(RELCAT_RELID, "RelName", attrValueRelName, EQ);

	// If relation with name relName does not exits (relcatRecId == {-1,-1})
	//    return E_RELNOTEXIST;

	/*** 
		Iterating over all Attribute Catalog Entry record corresponding to relation to find the required attribute 
	***/
	// Reset the Search Index by using RelCacheTable and setting value to {-1, -1}
	searchIndex = {-1, -1};
	RelCacheTable::setSearchIndex(ATTRCAT_RELID, &searchIndex);
	
	// Define RecId attrId {-1, -1} - used to check if an attribute of oldName exists or not.
 	RecId attrId{-1, -1};
	Attribute attrcatEntryRecord[ATTRCAT_NO_ATTRS];
  	while (true) {
		RecId attrcatEntryRecId = linearSearch(ATTRCAT_RELID, "RelName", relationName, EQ);

		if (attrcatEntryRecId.block == -1) {
			break;
		}

		// Get the attribute catalog record from the attribute catalog
		// Hint: instantiate RecBuffer Class with appropriate block number and use getRecord method to store the record into attrcatEntryRecord.

    	// if (strcmp(attrcatEntryRecord[1].sVal, oldName) == 0) attrId = attrcatEntryRecId;

    	// if (strcmp(attrcatEntryRecord[1].sVal, newName) == 0) return E_ATTREXIST;

    	
  	}
	
	// if (attrId.block == -1) return E_ATTRNOTEXIST;

	// Update the entry corresponding to the attribute in the Attribute Catalog Relation.
	/* Hint: Instantiate RecBuffer class by passing appropriate block number = attrId.block
		Get the record corresponding to the entry by using getRecord method by passing attrId.slot
		as argument.
		Use setRecord method to set the record back after updating the entry appropriately.
	*/


	// return SUCCESS
}
 
```


### BlockAccess :: deleteRelation()

#### Description
This method deletes the Relation with the name specified in arguments.

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| relName	| `char[ATTR_SIZE]`	| Name of Relation to delete | 

#### Return Values
| Value | Description |
|-----------|-----------------|
| [`SUCCESS`](/constants) | On successful deletion of the given relation |
| [`E_RELNOTEXIST`](/constants) | If the relation does not exist |

#### Algorithm
:::note
If at any point getHeader(), setHeader(), getRecord(), setRecord(), getSlotMap() or setSlotMap() methods of Block access layer are being called, make sure to get the return value and if it is not success, then to return the error code from the method.
:::

```cpp
int BlockAccess::deleteRelation(char *relName) {
	/* search for relation with name relName in relation catalog using Linear Search and store the relcatRecId */
	// Hint: relid is RELCAT_RELID attribute name to search will be "RelName" op = EQ
	// Also make an Attribute (attrValueRelName) with sval = relName and then pass that as the argument to linear search
	// NOTE: Reset the Search Index by using RelCacheTable and setting value to {-1, -1} before callign the linearSearch()
	RecId searchIndex = {-1, -1};
    RelCacheTable::setSearchIndex(RELCAT_RELID, &searchIndex);
	
	RecId relcatRecId = linearSearch(RELCAT_RELID, "RelName", attrvalRelName, EQ);

	// If relation with relName does not exits (relcatRecId == {-1, -1}), return E_RELNOTEXIST

	// Declare Attribute* relcatEntryRecord to store the relation catalog entry corresponding to the relcat entry.
	Attribute *relcatEntryRecord;

	/* Get the relation catalog entry record corresponding to relation with relName using the relcatRecId */
	// Hint: instantiate RecBuffer class using relcatRecId.block and then use appropriate class method to get the record.

	// get the first record block of the relation (firstBlock) using the relation catalog entry record
	// get the number of attributes corresponding to the relation (numAttrs) using the relation catalog entry record

	// Delete all the record blocks of the relation by getting the next record blocks (rblock) from header
	// and by calling releaseBlock() method
	/* 
		Hint: instantiate a BlockBuffer class object by giving appropriate arguments to constructor 
		(which is block number of the first block),
		get the header of the block by calling appropriate method of the class to fetch 'next' record block number,
		delete the existing block and repeat for the next block.
		Also note that to check if we reached the end either use lastBlock number field for currBlock OR check if nextBlock number is -1
	 */
	while (true) {
		// Call releaseBlock()

		// if currBlock == lastBlock || nextBlock == -1, break

		// get the BlockBuffer instance for 'nextBlock'

		// update current and next block numbers

	}

	/*** 
		Deleting attribute catalog entries corresponding the relation and index blocks corresponding to the relation with relName on its attributes
	***/ 
	/*
	   Declare attrcatRecId and attractEntryRecord variables to store
	   record id of the attrcat entry and to store the attrcat entry record respectively.
	   Also make an Attribute (attrValueRelName) with sval = relName and then pass that as the argument to linear search
	 */
	RecId attrcatRecId;
	Attribute *attrcatEntryRecord;
	Attribute attrValueRelName;
	strcpy(attrValueRelName.sVal, relName);

	// Reset the Search Index by using RelCacheTable and setting value to {-1, -1}
    searchIndex = {-1, -1};
    RelCacheTable::setSearchIndex(ATTRCAT_RELID, &searchIndex);

	int numberOfAttributesDeleted = 0;
	// Iterate over all the attributes corresponding to the relation
    while (true) {
        // search for all the attributes corresponding to the relation with relName in attribute catalog
        attrcatRecId = linearSearch(ATTRCAT_RELID, "RelName", attrValueRelName, EQ);
        if (attrcatRecId.block == -1 && attrcatRecId.slot == -1) {
            // No more attributes to iterate over.
			break;
        }

		numberOfAttributesDeleted++;

        /*** 
			Deleting the attribute catalog entry corresponding to the attribute from attribute catalog 
		***/

        // Get the header by Instantiating a RecBuffer instance (attrcatRecBuffer) and calling appropriate methods
        RecBuffer attrcatRecBuffer = RecBuffer(attrcatRecId.block);
        HeadInfo attrcatRecBufferBlockHeader;
        int ret = attrcatRecBuffer.getHeader(&attrcatRecBufferBlockHeader);

        // get the rootBlock from attribute catalog (use attrcatRecBuffer object to call appropriate method
        // to get record corresponding to the attribute catalog entry)
        // This will be used later to delete any indexes if it exists
        attrcatRecBuffer.getRecord(attrcatEntryRecord, attrcatRecId.slot);
        int rootBlock = (int) attrcatEntryRecord[ATTRCAT_ROOT_BLOCK_INDEX].nVal;

        // Update the Slotmap for the block by indicating the slot as free(use SLOT_UNOCCUPIED)
        slotMap[attrcatRecId.slot] = SLOT_UNOCCUPIED;

        // Adjust the number of entries in the block (decrease by 1) corresponding to the attribute catalog entry 
				// and set it back using setHeader()

        // If number of entries become 0, releaseBlock is called after fixing the Linked List.
        // Hint: Update to the linked list involves setting the left and right pointers of block
        // adjacent to the released block appropriately.
        if (attrcatRecBufferBlockHeader.numEntries == 0) {
            /* Standard Linked List Delete for a Block */
            // Get the header of the previous block (left block)
            // Hint: instantiate a RecBuffer class corresponding to the lblock and call appropriate methods
            
            // Set the previous header's rblock to the block's header's rblock

            if (attrcatRecBufferBlockHeader.rblock != -1) {
				// Get the header of the next block (right block)
				// Hint: instantiate a RecBuffer class corresponding to the lblock and call appropriate methods
					
				// Set the next block's header's lblock to the block's header's lblock

            } else {
				// the block being released is the "Last Block" of the relation.
				// Update the Relation Catalog entry's LastBlock field for this relation with the block number of the previous block.
			}

            // call releaseBlock()

        }

        // if index exists for the attribute (rootBlock != -1), call bplus destroy
        if (rootBlock != -1) {
            // bplus_destroy(rootBlock); //delete the index blocks corresponding to the attribute
        }
    }

	/*** Delete the relation catalog entry corresponding to the relation from relation catalog ***/
	// Fetch the header of Relcat block

	// Adjust the number of entries in the header of the block (decrease by 1) corresponding to the relation catalog entry
		// and set it back

	// Get the slotmap in relation catalog, update it by marking the slot as free(use SLOT_UNOCCUPIED) and set it back.
		
	/*** Updating the Relation Cache Table ***/
	/** Update relation catalog record entry (number of records in relation catalog is decreased by 1) **/
	// Hint: Get the entry corresponding to relation catalog from the relation cache and update the number of records
	// and set it back

	/** Update attribute catalog entry (number of records in attribute catalog is decreased by numberOfAttributesDeleted) **/
	i.e., #Records = #Records - numberOfAttributesDeleted

	// Hint: Get the entry corresponding to attribute catalog from the relation cache and update the number of records
	// and set it back

	// return SUCCESS;
}
```

