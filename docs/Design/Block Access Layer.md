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

NITCbase follows an Object-Oriented design for Block Access Layer. The class diagram is as shown below.

---

## class BlockAccess

```cpp
class BlockAccess {
    public:
        static int search(int relId, Attribute *record, char attrName[ATTR_SIZE], Attribute attrval, int op);

        static int insert(int relId, union Attribute *record);

		static int renameRelation(char oldName[ATTR_SIZE], char newName[ATTR_SIZE]);
		
		static int renameAttribute(char relName[ATTR_SIZE], char oldName[ATTR_SIZE], char newName[ATTR_SIZE]);

        static int deleteRelation(char relName[ATTR_SIZE]);
    
        static RecId linearSearch(int relId, char attrName[ATTR_SIZE], Attribute attrval, int op);

};
```

### BlockAccess :: linearSearch()

#### Description
This method searches the relation specified linearly to find the next record that satisfies the specified condition on attribute attrval and returns the recId of the next record satisfying the condition.

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| relId |	`int` |	Relation Id of Relation to which search has to be made. |
| attrName |	`char[ATTR_SIZE]` |	Attribute/column name to which condition need to be checked with. |
| attrval |	`union Attribute` |	value of attribute that has to be checked against the operater. |
| op |	`int` |	Conditional Operator(can be one among `EQ,LE,LT,GE,GT,NE,RST,PRJCT` corresponding to *equal,less than or equal, less than ,greater than or equal, greater than, not equal, reset, projet operators respectively). |

#### Return Values
| Value | Description |
|-----------|-----------------|
| recId (block#, slot#) |	returns (block#, slot#) of the record corresponding to the next hit.
 |(-1, -1) |	If no valid next hit is found.

#### Algorithm
```cpp
RecId BlockAccess::linearSearch(int relId, char attrName[ATTR_SIZE], union Attribute attrVal, int op) {
	// get the previous record id from the relation cache corresponding to the relation with Id=relId
	RelCacheTable::getSearchIndex(relId, prev_recid);
	if(prev_recid == {-1, -1}) { 
		// It is the first time that linear search search for the record with the attribute value attrval
		// get the first record block of the relation from the relation cache using the appropriate function of Cache Layer

		block = first record block of the relation
		slot = 0
	}
	else { //if the linear search knows the  hit from previous search
		block = previous record id's block
		slot = previous record id's slot
	}
	
	// The following code searches for the next record in the relation that satisfies the given condition
	// Start from block and iterate over the records of the relation{
		//get the record of the relation using the following buffer layer functions
		RecBuffer recBuffer = new RecBuffer(block);
		recBuffer.getRecord(record, slot);

		// If slot is free skip the loop and continue to the next record slot
		
		// compare record's attribute value to the the given attrval as below:
		// storing the outcome of comparison in the variable flag
		flag = compare(attrval, record[attr_offset], attr_type);
		
		// cond = UNSET
		
		// Next task is to check whether this record satisfies the given condition.
		// It is determined based on the output of previous comparison and the op value received.
		// The following code sets the cond variable if the condition is satisfied.
		switch(op){
		
			case NE: //if op is "not equal to"
				if(flag != 0){ //i.e if the record's attribute value is not equal to the given attrval
					//SET the cond variable
				}
				break;
				
			case LT: //if op is "less than"
				if(flag < 0){ //i.e if the record's attribute value is less than the given attrval
					//SET the cond variable 
				}
				break;
			
			case LE: //if op is "less than or equal to"
				if(flag <= 0){ //i.e if the record's attribute value is less than or equal to the given attrval
					//SET the cond variable 
				}
				break;
			
			case EQ: //if op is "equal to"
				if(flag == 0){ //i.e if the record's attribute value is equal to the given attrval
					//SET the cond variable 
				}
				break;
			
			case GT: //if op is "greater than"
				if(flag > 0){ //i.e if the record's attribute value is greater than the given attrval
					//SET the cond variable 
				}
				break;
			
			case GE: //if op is "greater than or equal to"
				if(flag >= 0){ //i.e if the record's attribute value is greater than or equal to the given attrval
					//SET the cond variable 
				}
				break;
		}
		
		if(cond == SET){
			recid = {block, slot} //record id of the record that satisfies the given condition
			/*set the previous record id in the relation cache as 
			the record id of the record that sastifies the given condition*/		
			OpenRelTable::setPrevRecId(relId, recid);
			return recid;
		}
		
		//get the next record id by adjusting the block and slot
	//}
	
	return {-1, -1}; //i.e., no record in the relation with Id relId satisfies the given condition
}
```


### BlockAccess :: search()

#### Description
This method searches the relation specified to find the next record that satisfies the specified condition on attribute attrval and updates the recId of next record satisfying the condition in cache.(uses the b+ tree if target attribute is indexed, otherwise, it does linear search).

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| relId	| `int`	| Relation Id of Relation to which search has to be made. | 
| record	| `union Attribute*`	| pointer to record where next found record satisfying given condition is to be placed. | 
| attrname	| `char[ATTR_SIZE]`	| Attribute/column name to which condition need to be checked with. | 
| attrval	| `union Attribute`	| value of attribute that has to be checked against the operater. | 
| op	| `int`	| Conditional Operator(can be one among EQ,LE,LT,GE,GT,NE,RST,PRJCT corresponding to equal,lesthan equal, lessthan ,greaterthan equal, greaterthan, Not equal, reset, projet operators respectively). | 

#### Return Values
| Value | Description |
|-----------|-----------------|
| [`SUCCESS`](/constants)	| On successful copy of record to record | 
| [`E_NOTFOUND`](/constants)	| If it fails to find a record satisfying the given condition | 

#### Algorithm
```cpp
int BlockAccess::search(){ 
												
     /*get the attribute catalog entry from the attribute cache corresponding 
	  to the relation with Id=relId and with attribute_name=attrName using
	  OpenRelTable::getAttrCatEntry(relId, attrName, &attrcat_entry); of cache layer */
	//get root_block from the attribute catalog entry (attrcat_entry)
	
	if(root_block == -1){ //if Index does not exist for the attribute
		if(op == RST){ //the op is reset
			//assign the previous record id (prev_recid) to {block_num=-1, slot_num=-1}
			/*update the previous record id (prev_recid) in the relation cache corresponding to the relation with Id=relId
			 using OpenRelTable::setPrevRecId(relId, prev_recid); of cache layer */
			return SUCCESS;
		}
		
		//search for the record id (recid) correspoding to the attribute with attribute name attrName and with value attrval  
		recid = linear_search(relId, attrName, attrVal, op);
	}
	else{ //if Index exists for the attribute
		if(op == RST){ // the op is reset
			//assign the previous index id (prev_indexid) to {block_num=-1, index_num=-1}
			/*update the previous index id (prev_recid) in the attribute cache corresponding 
			  to the relation with Id relId and attribute name with attrName
			  using OpenRelTable::setPrevIndexId(relId, attrName, prev_indexid); of cache layer */
			return SUCCESS;
		}
		//search for the record id (recid) correspoding to the attribute with attribute name attrName and with value attrval
		recid = bplus_search(relId, attrName, attval, op);
	}
	
	if(recid == {-1, -1}){ //if it fails to find a record satisfying the given condition
		return E_NOTFOUND;
	}
	
	//copying the record with record id (recid) to the record (buffer)
	rec_buffer = Buffer::getRecBuffer(recid.block); //recid.block is the block that contains record
	rec_buffer->getRecord(record, recid.slot); //recid.slot is the slot that contains record
	delete rec_buffer;

	return SUCCESS;
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
	RelCatEntry relcatEntry;
	RelCacheTable::getRelCatEntry(relId, &relcatEntry);

	// Let rec_id = {free_block, free_slot} denotes the record id for the new record to be inserted

	/*
		traverse the linked list of existing record blocks of the relation until a free slot is found(to be stored in rec_id)
	    or until the end of the list is reached
		Free slot can be found by checking the slotmap of a block;
	    slotmap stores SLOT_UNOCCUPIED for free entry and SLOT_OCCUPIED for occupied entry)
	*/

	RecBuffer recBuffer;
	if(no free slot is found in existing record blocks) {
		// if relation is RELCAT, do not allocate any more blocks
		//	return E_MAXRELATIONS;

		//get a new record block and free slot of the new record  from disk by calling
		recBuffer = RecBuffer();
		if(recBuffer.getBlockNum() == E_DISKFULL){ // disk is full (i.e unable to get new record block from the disk)
			return E_DISKFULL;
		}
		free_block = recBuffer.getBlockNum();
		free_slot = 0;
		// let prev_block_num denote the block number of the last element in the linked list

		/*
			set the header of the new record block such that it links with existing record blocks of the relation
			set the block's header as blockType: REC, pblock: -1,
		    lblock
		            = -1 (if linked list of existing record blocks was empty)
					= prev_block_num (otherwise),
		    rblock: -1, numEntries: 1,
			numAttrs and numSlots can be filled from the relation catalog entry
		*/
		/*
			set block's slotmap with all slots marked as free
			(i.e. store SLOT_UNOCCUPIED for all the entries)
		*/

		/*
			get the header of the block prev_block_num
		    update the rblock field of the header to the new block number(i.e. free_block)
		 */

		// update last block field in the relation catalogue entry to the new block
		// (use setRelCatEntry function)
	}

	// The next action is to get the pointer to the RecBuffer object containing the free slot
	// and store it into rec_buffer using getRecBuffer() method of the class Buffer.
	// Insert the record into the free slot by calling
	recBuffer.setRecord(record, free_slot);

	// update the slotmap of the block by marking entry of the slot to which record was inserted as occupied)
	// (ie store SLOT_OCCUPIED in free_slot'th entry of slotmap)

	// increment the num_entries field in the header of the block (to which record was inserted)
	// (use getHeader and setHeader functions)

	// Increment the number of records field in the relation cache entry for the relation.
	// (use setRelCatEntry function)

	/*
	    B+ tree insert
	 */
	// flag = SUCCESS
	// Iterate over all the attributes of the relation
	{
		// get the attribute catalog entry for the attribute from the attribute cache
		AttrCatEntry attrcat_entry;
		AttrCacheTable::getAttrCatEntry(relId, attr_offset, &attrcat_entry);
		// get the root block from the attribute catalog entry
		if(root_block != -1) { // if index exists for the attribute
			// bplus_insert(relId, attrcat_entry.attrName, attrval, recid);
			// BPlusTree bPlusTree = BPlusTree(relId, attrName);
			int retVal = bPlusTree.bPlusInsert(record[attribute_offset], rec_id);
			if (retVal == E_DISKFULL) {
				// delete the b+ tree for the attribute
				// flag = E_INDEX_BLOCKS_RELEASED
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
	// search for the relation with name newName in relation catalog using linearSearch()
	relcat_recid = linearSearch(RELCAT_RELID, "RelName", newRelationName, EQ ); 
	// note: newRelationName is of type Attribute (to be constructed from newName)
	
	// If relation with name newName already exits
	if(relcat_recid != {-1,-1}){ 
		return E_RELEXIST;
	}
	
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
int BlockAccess::renameAttribute(char relName[ATTR_SIZE], char oldName[ATTR_SIZE], char newName[ATTR_SIZE]){
	//search for the relation with name relName in relation catalog 
	relcat_recid = linear_search(RELCAT_RELID, "RelName", relName, EQ);
	
	if(relcat_recid == {-1,-1}){ //If relation with name relName does not exits
		return E_RELNOTEXIST;
	}
	
	//Iterate over all the attributes corresponding to the relation{
		//search for the attributes with relation name relName in attribute catalog 
		attrcat_recid = linear_search(ATTRCAT_RELID, "RelName", relName, EQ);
		
		//get the attribute catalog record from the attribute catalog (recid of the attribute catalog record = attrcat_recid)
		rec_buffer = Buffer::getRecBuffer(attrcat_recid.block);
		rec_buffer->getRecord(attrcat_record, attrcat_recid.slot);
		
		//get attrName from attrcat_record
		if(attrName == newName){ //if the attribute with name newName already exists
			return E_ATTREXIST;
		}	
	//}
	
	//Iterate over all the attributes corresponding to the relation{
		//search for the attributes with relation name relName in attribute catalog 
		attrcat_recid = linear_search(ATTRCAT_RELID, "RelName", relName, EQ);
		
		//get the attribute catalog record from the attribute catalog (recid of the attribute record = attrcat_recid)
		rec_buffer = Buffer::getRecBuffer(attrcat_recid.block);
		rec_buffer->getRecord(attrcat_record, attrcat_recid.slot);
		
		//get attrName from attrcat_record
		if(attrName == oldName){ //if the attribute is attribute with oldName
			//update the attribute catalog record in the attribute catalog with attribute name newName
			rec_buffer->setRecord(attrcat_record, attrcat_recid.slot);
			return SUCCESS;
		}
	//}	
	return E_ATTRNOTEXIST;
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
```cpp
int BlockAccess::deleteRelation(char relName[ATTR_SIZE]){
	/* search for relation with name relName in relation catalog */
	relcat_recid = linear_search(RELCAT_RELID, "RelName", relName, EQ);
	
	if(relcat_recid == {-1,-1}){ //If relation with relName does not exits
		return E_RELNOTEXIST;
	}
	
	/*getting the relation catalog entry corresponding to relation with relName*/
	rec_buffer = Buffer::getRecBuffer(relcat_recid.block);
	rec_buffer->getRecord(relcat_rec, relcat_recid.slot);
	
	//get the first record block of the relation (first_block)
	//get the number of attributes corresponding to the relation (num_attrs)
	
	//Delete all the record blocks of the relation by getting the next record blocks (rblock) from header and by calling
	Buffer::deleteBlock(block_num);
	
	
	/*deleting index blocks corresponding to the the relation with relName and 
	attribute catalog entries corresponding the relation*/
	//Iterate over all the attributes corresponding to the relation{
		//search for all the attributes corresponding to the relation with relName in attribute catalog
		//delete the attribute catalog entry corresponding to the attribute from attribute catalog
		//Adjusting the number of entries in the block (decrease by 1) corresponding to the attribute catalog entry
	
		//get the root_block from attribute catalog 
		if(root_block != -1){ //index exists for the attribute
			bplus_destroy(root_block); //delete the index blocks corresponding to the attribute
		}
	//}
	
	//delete the relation catalog entry corresponding to the relation from relation catalog
	//Adjusting the number of entries in the block (decrease by 1) corresponding to the relation catalog entry
	
	//update relation catalog (i.e number of records in relation catalog is decreased by 1)
	//update attribute catalog (i.e number of records in attribute catalog is decreased by num_attrs)
	return SUCCESS;
}
```

