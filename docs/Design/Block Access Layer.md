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
        static int search(relId relid, Attribute *record, char attrName[ATTR_SIZE], Attribute attrval, int op)

        static int insert(int relid, union Attribute *record);

		static int renameRelation(char oldName[ATTR_SIZE], char newName[ATTR_SIZE]);
		
		static int renameAttribute(char relName[ATTR_SIZE], char oldName[ATTR_SIZE], char newName[ATTR_SIZE]);

        static int deleteRelation(char relName[ATTR_SIZE]);
    
    private:
        static struct recId linearSearch(relId relid, char attrName[ATTR_SIZE], Attribute attrval, int op);

}
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
| RecId (block#, slot#) |	returns (block#, slot#) of the record corresponding to the next hit.
 |(-1, -1) |	If no valid next hit is found.

#### Algorithm
```cpp
struct recId BlockAccess::linearSearch(relId relid, char attrName[ATTR_SIZE], union Attribute attrval, int op) {
	//get the previous record id from the relation cache corresponding to the relation with Id=relid
	OpenRelTabel::getPrevRecId(relid, prev_recid);
	if(prev_recid == {-1, -1}){ //It is the first time that linear search search for the record with the attribute value attrval
		//get the first record block of the relation from the relation cache 
		//using getRelCatEntry() method of OpenRelTable in cache layer
		//block = the first record block of the relation
		//slot = 0
	}
	else{ //if the linear search knows the  hit from previous search
		// block = the previous record id block
		// slot = the previous record id slot
	}
	
	//The following code searches for the next record in the relation that satisfies the given condition
	//Start from block and iterate over the records of the relation{
		//get the record of the relation using the following buffer layer functions
		rec_buffer = Buffer::getRecBuffer(block);
		rec_buffer->getRecord(record, slot);
		//If slot is free skip the loop and continue to the next record slot
		
		//compare record's attribute value to the the given attrval as below:
		//storing the outcome of comparision in the variable flag
		//flag = compare(AttrVal, record[attr_offset], attr_type);
		
		//cond = UNSET
		
		//Next task is to check whether this record satisfies the given condition.
		//It is determined based on the output of previous comparision and the op value received.
		//The following code sets the cond variable if the condition is satisfied.
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
			OpenRelTable::setPrevRecId(relid, recid);
			return recid;
		}
		
		//get the next record id by adjusting the block and slot
	//}
	
	return {-1, -1}; //i.e., no record in the relation with Id relid satisfies the given condition
}
```


### BlockAccess :: search()

#### Description
This method searches the relation specified to find the next record that satisfies the specified condition on attribute attrval and updates the recId of next record satisfying the condition in cache.(uses the b+ tree if target attribute is indexed, otherwise, it does linear search).

#### Arguments
| Name | Type | Description |
|-----------|------------------|-----------------------|
| relid	| `int`	| Relation Id of Relation to which search has to be made. | 
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
	  to the relation with Id=relid and with attribute_name=attrName using
	  OpenRelTable::getAttrCatEntry(relid, attrName, &attrcat_entry); of cache layer */
	//get root_block from the attribute catalog entry (attrcat_entry)
	
	if(root_block == -1){ //if Index does not exist for the attribute
		if(op == RST){ //the op is reset
			//assign the previous record id (prev_recid) to {block_num=-1, slot_num=-1}
			/*update the previous record id (prev_recid) in the relation cache corresponding to the relation with Id=relid
			 using OpenRelTable::setPrevRecId(relid, prev_recid); of cache layer */
			return SUCCESS;
		}
		
		//search for the record id (recid) correspoding to the attribute with attribute name attrName and with value attrval  
		recid = linear_search(relid, attrName, attrVal, op);
	}
	else{ //if Index exists for the attribute
		if(op == RST){ // the op is reset
			//assign the previous index id (prev_indexid) to {block_num=-1, index_num=-1}
			/*update the previous index id (prev_recid) in the attribute cache corresponding 
			  to the relation with Id relid and attribute name with attrName
			  using OpenRelTable::setPrevIndexId(relid, attrName, prev_indexid); of cache layer */
			return SUCCESS;
		}
		//search for the record id (recid) correspoding to the attribute with attribute name attrName and with value attrval
		recid = bplus_search(relid, attrName, attval, op);
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
| relid	| `int`	| Relation Id of Relation to which record is to be inserted | 
| record	| `union Attribute*`	| Pointer to Record(containing values for all the attributes), Record is an array of Attribute type | 


#### Return Values
| Value | Description |
|-----------|-----------------|
| [`SUCCESS`](/constants)	| On successful insert of the given record | 
| [`E_DISKFULL`](/constants)	| If disk space is not sufficient for inserting the record / index |

#### Algorithm
```cpp
int BlockAccess::insert(int relid, union Attribute *record){
	//get the relaction catalog entry from relation cache
	RelCatEntry relcat_entry;
	OpenRelTable::getRelCatEntry(relid, &relcat_entry);
	
	//get a free slot from the existing record blocks of the relation with Id=relid
	//This can be done by performing a linear search on the linked list of records and checking slotmap.

	if(no free slot is found in existing record blocks){
		//get a new record block and free slot of the new record  from disk by calling
		rec_buffer = Buffer::getFreeRecBuffer();
		if(rec_buffer == NULL){ //disk is full (i.e unable to get new record block from the disk)
			return E_DISKFULL;
		}
		//Update the header of the new record block such that it links with existing record blocks of the relation 
	} 
	
	// The next action is to get the pointer to the RecBuffer object containing the free slot
	// and store it into rec_buffer using getRecBuffer() method of the class Buffer.
	//Insert the record into the free slot by calling
	rec_buffer->setRecord(record,free_slot);

	//update the slotmap of the block (contains free slot)
	
	//update the num_entries field in the header of the block (to which record was inserted) by increasing the number of entries by 1
	//Incremet the number of records in the relation cache entry for the relation.
	
	//Iterate over all the attributes of the relation{
		//get the attribute catalog entry for the attribute from the attribute cache
		AttrCatEntry attrcat_entry;
		OpenRelTable::getAttrCatEntry(relid, attr_offset, &attrcat_entry);
		//get the root block from the attribute catalog entry
		if(root_block != -1){ //if index exists for the attribute
			bplus_insert(relid, attrcat_entry.attrName, attrval, recid); 
			       //where recid specifies the block# and slot# of the newly inserted record.
		}
	//}
	
	return SUCCESS;
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
	//search for the relation with name newName in relation catalog 
	relcat_recid = linear_search(RELCAT_RELID, "RelName", newName, EQ);
	if(relcat_recid != {-1,-1}){ //If relation with name newName already exits
		return E_RELEXIST;
	}
	
	//search for the relation with name oldName in relation catalog 
	relcat_recid = linear_search(RELCAT_RELID, "RelName", oldName, EQ);
	if(relcat_recid == {-1,-1}){ //If relation with name relName does not exits
		return E_RELNOTEXIST;
	}
	
	//get the relation catalog record from the relation catalog (recid of the relation catalog record = relcat_recid)
	rec_buffer = Buffer::getRecBuffer(relcat_recid.block);
	rec_buffer->getRecord(relcat_record, relcat_recid.slot);
	
	//update the relation catalog record in the relation catalog with relation name newName
	rec_buffer->setRecord(relcat_record, attrcat_recid.slot);
	
	/*update all the attribute catalog entries in the attribute catalog corresponding to the 
	  relation with relation name oldName to the relation name newName*/
	
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

