---
sidebar_position: 5
title: "Block Access Layer"
---

:::info note
The Block Access Layer code is to be written in `BlockAccess.cpp` and it's header file `BlockAccess.h`

[**The stub code for these files can be found here.**](/stub/block_access_stub)
:::

## Layout

In any database management system, in order to retrieve data from the database or to alter the schema of the relations in the database, the system has to work with the disk blocks. _Block Access layer provides an abstraction that hides the disk structures to the above layers ([Algebra layer](Algebra%20Layer.md) and [Schema layer](Schema%20Layer.md))_.

The _block access layer also provides an interface to the above layers in terms of records instead of disk blocks._ Hence, the Block Access layer processes the requests for update/retrieval from the algebra and schema layers and works with disk blocks that are buffered by the [_Buffer layer_](Buffer%20Layer.md).

NITCbase follows an Object-Oriented design for Block Access Layer. The class definition is as shown below.

---

## class BlockAccess

```cpp
class BlockAccess {
public:

    static int search(int relId, Attribute *record, char attrName[ATTR_SIZE], Attribute attrVal, int op,
        int flagValidAttrName);

    static int insert(int relId, union Attribute *record);

    static int renameRelation(char oldName[ATTR_SIZE], char newName[ATTR_SIZE]);

    static int renameAttribute(char relName[ATTR_SIZE], char oldName[ATTR_SIZE], char newName[ATTR_SIZE]);

    static int deleteRelation(char relName[ATTR_SIZE]);

    static RecId linearSearch(int relId, char attrName[ATTR_SIZE], Attribute attrVal, int op);

    static int project(int relId, Attribute *record);

};
```

### BlockAccess :: linearSearch()

#### Description

This method searches the relation specified linearly to find the next record that satisfies the specified condition on attribute attrVal and returns the recId of the next record satisfying the condition.
The function checks for

```
value-in-record `op` attrVal
```

#### Arguments

| Name     | Type              | Description                                                                                                                                                                                                            |
| -------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| relId    | `int`             | Relation Id of Relation to which search has to be made.                                                                                                                                                                |
| attrName | `char[ATTR_SIZE]` | Attribute/column name to which condition need to be checked against.                                                                                                                                                   |
| attrVal  | `union Attribute` | value of attribute that has to be checked against the value in the record.                                                                                                                                             |
| op       | `int`             | The conditional operator (which can be one among `EQ, LE, LT, GE, GT, NE` corresponding to the following operators: _equal to, less than or equal to, less than, greater than or equal to, greater than, not equal to_ |

#### Return Values

| Value             | Description                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `{block#, slot#}` | returns the _block number and slot number_ of the record corresponding to the next hit. This corresponds to type `RecId`. |
| `{-1, -1}`        | If no valid next hit is found. This corresponds to type `RecId`.                                                          |

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
        // (there is a hit from previous search; search should start from the record next to the search index record)

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
            continue;  // continue to the beginning of this while loop
        }

        // if slot is free skip the loop
        // (i.e. check if slot'th entry in slot map of block contains SLOT_UNOCCUPIED)
        {
            // increment slot and continue to the next record slot
        }

        // compare record's attribute value to the the given attrVal as below:
        /*
            firstly get the attribute offset for the attrName attribute
            from the attribute cache entry of the relation using AttrCacheTable::getAttrCatEntry
        */
        // use the attribute offset to get the value of the attribute from current record

        int cmpVal;  // will store the difference between the attributes
        // set cmpVal using compareAttrs()

        // Next task is to check whether this record satisfies the given condition.
        // It is determined based on the output of previous comparison and the op value received.
        // The following code sets the cond variable if the condition is satisfied.
        if (
            (op == NE && cmpVal != 0) ||    // if op is "not equal to"
            (op == LT && cmpVal < 0) ||     // if op is "less than"
            (op == LE && cmpVal <= 0) ||    // if op is "less than or equal to"
            (op == EQ && cmpVal == 0) ||    // if op is "equal to"
            (op == GT && cmpVal > 0) ||     // if op is "greater than"
            (op == GE && cmpVal >= 0)       // if op is "greater than or equal to"
        ) {
            /*
            set the search index in the relation cache as
            the record id of the record that satisfies the given condition
            (use RelCacheTable::setSearchIndex function)
            */

            return RecId{block, slot};
        }

        slot++;
    }

    // no record in the relation with Id relid satisfies the given condition
    return RecId{-1, -1};
}
```

### BlockAccess :: search()

#### Description

This method searches the relation specified to find the next record that satisfies the specified condition on attribute attrVal and updates the recId of next record satisfying the condition in cache.(uses the b+ tree if target attribute is indexed, otherwise, it does linear search).

#### Arguments

| Name     | Type               | Description                                                                                                                                                                                                   |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| relId    | `int`              | Relation Id of Relation to which search has to be made.                                                                                                                                                       |
| record   | `union Attribute*` | pointer to record where next found record satisfying given condition is to be placed.                                                                                                                         |
| attrName | `char[ATTR_SIZE]`  | Attribute/column name to which condition need to be checked with.                                                                                                                                             |
| attrVal  | `union Attribute`  | value of attribute that has to be checked against the operater.                                                                                                                                               |
| op       | `int`              | Conditional Operator (can be one among `EQ` , `LE` , `LT` , `GE` , `GT` , `NE` corresponding to equal, less or than equal, less than ,greater than or equal, greater than, not equal operators respectively). |

#### Return Values

| Value                      | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| [`SUCCESS`](/constants)    | On successful copy of record to record                      |
| [`E_NOTFOUND`](/constants) | If it fails to find a record satisfying the given condition |

#### Algorithm

```cpp
int BlockAccess::search(int relId, Attribute *record, char attrName[ATTR_SIZE], Attribute attrVal, int op) {
    // Declare a variable called recid to store the searched record
    RecId recId;

    /* get the attribute catalog entry from the attribute cache corresponding
    to the relation with Id=relid and with attribute_name=attrName  */

    // get rootBlock from the attribute catalog entry
    /* if Index does not exist for the attribute (check rootBlock == -1) */ {

        // search for the record id (recid) corresponding to the attribute with attribute name attrName, with value attrval
        // and satisfying the condition op using linearSearch()
    }

    /* else */ {
        // (index exists for the attribute)

        // search for the record id (recid) correspoding to the attribute with attribute name attrName and with value attrval
        // and satisfying the condition op using BPlusTree::bPlusSearch()
    }


    // if it fails to find a record satisfying the given condition (recId = {-1, -1}) return E_NOTFOUND;

    /* Copy the record with record id (recId) to the record buffer (record)
       For this Instantiate a RecBuffer class object by passing the recId and
       call the appropriate method to fetch the record
    */

    return SUCCESS;
}
```

### BlockAccess :: insert()

#### Description

This method inserts the Record into Relation as specified in arguments.

#### Arguments

| Name   | Type               | Description                                                                                       |
| ------ | ------------------ | ------------------------------------------------------------------------------------------------- |
| relId  | `int`              | Relation Id of Relation to which record is to be inserted                                         |
| record | `union Attribute*` | Pointer to Record(containing values for all the attributes), Record is an array of Attribute type |

#### Return Values

| Value                                   | Description                                                                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)                 | On successful insert of the given record                                                                                            |
| [`E_INDEX_BLOCKS_RELEASED`](/constants) | Record was inserted successfully, but the index existing on one or more attributes had to be deleted due to insufficient disk space |
| [`E_DISKFULL`](/constants)              | If disk space is not sufficient for inserting the record / index                                                                    |

#### Algorithm

```cpp
int BlockAccess::insert(int relId, Attribute *record) {
    // get the relation catalog entry from relation cache
    // ( use RelCacheTable::getRelCatEntry() of Cache Layer)

    // let blockNum denote the first record block of the relation (obtained from relation catalog entry)

    // Let rec_id denote the record id of the slot where the new record will be inserted
    RecId rec_id = {-1, -1};

    // let numOfSlots denote the number of slots per record block (obtained from relation catalog entry)
    // let numOfAttributes denote the number of attributes of the relation (obtained from relation catalog entry)

    // let prevBlockNum denote the block number of the last element in the linked list = -1;

    /*
        Traversing the linked list of existing record blocks of the relation
        until a free slot is found OR
        until the end of the list is reached
    */
    while (blockNum != -1) {
        // create a RecBuffer object for blockNum(use constructor for existing block)

        // get header of block(blockNum) using RecBuffer::getHeader() function

        // get slot map of block(blockNum) using RecBuffer::getSlotMap() function

        // search for free slot in the block 'blockNum' and store it's record id in rec_id
        // (Free slot can be found by iterating over the slot map of the block)
        // slot map stores SLOT_UNOCCUPIED if slot is free and SLOT_OCCUPIED if slot is occupied)

        // if a free slot is found, discontinue the traversal of the linked list of record blocks

        // otherwise, continue to check the next block by updating the block numbers as follows:
        // update prevBlockNum = blockNum
        // update blockNum = header.rblock (next element in the linked list of record blocks)
    }

    //  if no free slot is found in existing record blocks
    {
        // if relation is RELCAT, do not allocate any more blocks (i.e. if relId = RELCAT_RELID)
        //     return E_MAXRELATIONS;

        // Otherwise,
        // get a new record block by calling RecBuffer Constructor for new block
        // get the block number of the newly allocated block
        // (use BlockBuffer::getBlockNum() function)
        // let ret be the return value of getBlockNum() function call
        if (ret == E_DISKFULL) {
            return E_DISKFULL;
        }

        // Assign rec_id.block = new block number(i.e. ret) and rec_id.slot = 0

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

        // if prevBlockNum != -1
        {
            // create a RecBuffer object for prevBlockNum(use constructor for existing block)
            // get the header of the block prevBlockNum
            // update the rblock field of the header to the new block number(i.e. rec_id.block)
            // (use BlockBuffer::setHeader() function)
        }
        // else
        {
            // update first block field in the relation catalogue entry to the new block(i.e. rec_id.block)
            // (use RelCacheTable::setRelCatEntry() function of Cache Layer)
        }

        // update last block field in the relation catalogue entry to the new block(i.e. rec_id.block)
        // (use RelCacheTable::setRelCatEntry() function of Cache Layer)
    }

    // create a RecBuffer object for rec_id.block(use constructor for existing block)
    // insert the record into rec_id'th slot by calling RecBuffer::setRecord() function)

    // update the slot map of the block by marking entry of the slot to which record was inserted as occupied)
    // (ie store SLOT_OCCUPIED in free_slot'th entry of slot map)
    // (use RecBuffer::getSlotMap() and RecBuffer::setSlotMap() functions)

    // increment the num_entries field in the header of the block (to which record was inserted)
    // (use BlockBuffer::getHeader() and BlockBuffer::setHeader() functions)

    // Increment the number of records field in the relation cache entry for the relation.
    // (use RelCacheTable::setRelCatEntry function)

    /*
        B+ tree insertions
     */
    int flag = SUCCESS;
    // Iterate over all the attributes of the relation
    // Let attrOffset be iterator ranging from 0 to numOfAttributes-1
    {
        // get the attribute catalog entry for the attribute from the attribute cache
        // (use AttrCacheTable::getAttrCatEntry() function with arguments relId and attrOffset)

        // get the root block field from the attribute catalog entry

        // if index exists for the attribute(i.e. rootBlock != -1)
        {
            /* insert the new record into the attribute's bplus tree using
             BPlusTree::bPlusInsert()*/
            int retVal = BPlusTree::bPlusInsert(relId, attrCatEntry.attrName, record[attrOffset], rec_id);

            if (retVal == E_DISKFULL) {
                //(index for this attribute has been destroyed)
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

| Name    | Type              | Description                                          |
| ------- | ----------------- | ---------------------------------------------------- |
| oldName | `char[ATTR_SIZE]` | Old Name of Relation to which name has to be changed |
| newName | `char[ATTR_SIZE]` | New name for the Relation                            |

#### Return Values

| Value                         | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| [`SUCCESS`](/constants)       | On successful renaming of the relation           |
| [`E_RELNOTEXIST`](/constants) | If the relation with name oldName does not exist |
| [`E_RELEXIST`](/constants)    | If the relation with name newName already exists |

#### Algorithm

```cpp
int BlockAccess::renameRelation(char oldName[ATTR_SIZE], char newName[ATTR_SIZE]){
    // reset the searchIndex of the relation catalog using RelCacheTable::resetSearchIndex()

    Attribute newRelationName;

    // search if the attribute "RelName" of relation catalog equals(EQ) newRelationName using linearSearch

    // If relation with name newName already exists (result of linearSearch is not {-1, -1})
    //    return E_RELEXIST;


    // reset the searchIndex of the relation catalog using RelCacheTable::resetSearchIndex()

    Attribute oldRelationName;

    // search if the attribute "RelName" of relation catalog equals(EQ) oldRelationName

    // If relation with name oldName does not exist (result of linearSearch is {-1, -1})
    //    return E_RELNOTEXIST;

    /* get the relation catalog record of the relation to rename using a RecBuffer
       on the relation catalog [RELCAT_BLOCK] and RecBuffer.getRecord function
    */
    // update the relation name attribute in the record with newName. (use RELCAT_REL_NAME_INDEX)
    // set back the record value using RecBuffer.setRecord

    /*
    update all the attribute catalog entries in the attribute catalog corresponding
    to the relation with relation name oldName to the relation name newName
    */

    // reset the searchIndex of the attribute catalog using RelCacheTable::resetSearchIndex()

    //for i = 0 to numberOfAttributes :
    //    linearSearch on the attribute catalog for relName = oldRelationName
    //    get the record using RecBuffer.getRecord
    //
    //    update the relName field in the record to newName
    //    set back the record using RecBuffer.setRecord

    return SUCCESS;
}
```

### BlockAccess :: renameAttribute()

#### Description

This method changes the name of an attribute/column present in a specified relation, to the new name specified in arguments.

#### Arguments

| Name    | Type              | Description            |
| ------- | ----------------- | ---------------------- |
| relName | `char[ATTR_SIZE]` | Name of the Relation   |
| oldName | `char[ATTR_SIZE]` | Old Name of attribute  |
| newName | `char[ATTR_SIZE]` | New name for attribute |

#### Return Values

| Value                          | Description                                       |
| ------------------------------ | ------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful renaming of the attribute           |
| [`E_RELNOTEXIST`](/constants)  | If the relation with name relName does not exist  |
| [`E_ATTRNOTEXIST`](/constants) | If the attribute with name oldName does not exist |
| [`E_ATTREXIST`](/constants)    | If the attribute with name newName already exists |

#### Algorithm

```cpp
int BlockAccess::renameAttribute(char relName[ATTR_SIZE], char oldName[ATTR_SIZE], char newName[ATTR_SIZE]) {

    // reset the searchIndex of the relation catalog using RelCacheTable::resetSearchIndex()

    Attribute relNameAttr;

    // Search for the relation with name relName in relation catalog using Linear Search
    // If relation with name relName does not exits (relcatRecId == {-1,-1})
    //    return E_RELNOTEXIST;

    /***
        Iterating over all Attribute Catalog Entry record corresponding to relation to find the required attribute
    ***/
    // reset the searchIndex of the attribute catalog using RelCacheTable::resetSearchIndex()

    // declare attrToRenameRecId used to store the attr-cat recId of the attribute to rename
    RecId attrToRenameRecId{-1, -1};
    Attribute attrCatEntryRecord[ATTRCAT_NO_ATTRS];

    while (true) {
        // linear search on the attribute catalog for RelName = relNameAttr

        // if there are no more attributes left to check (linearSearch returned {-1,-1})
        //     break;

        // Get the record from the attribute catalog using RecBuffer.getRecord into attrCatEntryRecord

        // if attrCatEntryRecord.attrName = oldName
        //     attrToRenameRecId = block and slot of this record

        // if attrCatEntryRecord.attrName = newName
        //     return E_ATTREXIST;
    }

    // if attrToRenameRecId == {-1, -1}
    //     return E_ATTRNOTEXIST;

    /*
     Update the entry corresponding to the attribute in the Attribute Catalog Relation.
    */
    // declare a RecBuffer for attrToRenameRecId.block and get the record at attrToRenameRecId.slot
    // update the AttrName of the record with newName
    // set back the record with RecBuffer.setRecord

    return SUCCESS;
}

```

### BlockAccess :: deleteRelation()

#### Description

This method deletes the Relation with the name specified in arguments.

#### Arguments

| Name    | Type              | Description                |
| ------- | ----------------- | -------------------------- |
| relName | `char[ATTR_SIZE]` | Name of Relation to delete |

#### Return Values

| Value                         | Description                                  |
| ----------------------------- | -------------------------------------------- |
| [`SUCCESS`](/constants)       | On successful deletion of the given relation |
| [`E_RELNOTEXIST`](/constants) | If the relation does not exist               |

#### Algorithm

:::note
If at any point getHeader(), setHeader(), getRecord(), setRecord(), getSlotMap() or setSlotMap() methods of Block access layer are being called, make sure to get the return value and if it is not success, then to return the error code from the method.
:::

```cpp
int BlockAccess::deleteRelation(char relName[ATTR_SIZE]) {
    // reset the searchIndex of the relation catalog using RelCacheTable::resetSearchIndex()

    Attribute relNameAttr;

    //  linearSearch on the relation catalog for RelName = relNameAttr

    // if the relation does not exist (linearSearch returned {-1, -1})
    //     return E_RELNOTEXIST

    Attribute relCatEntryRecord[RELCAT_NO_ATTRS];
    // store the relation catalog record corresponding to the relation in relCatEntryRecord using RecBuffer.getRecord

    // get the first record block of the relation (firstBlock) using the relation catalog entry record
    // get the number of attributes corresponding to the relation (numAttrs) using the relation catalog entry record

    /*
     Delete all the record blocks of the relation
    */
    // for each record block of the relation:
    //     get block header using BlockBuffer.getHeader
    //     get the next block from the header (rblock)
    //     release the block using BlockBuffer.releaseBlock
    //
    //     Hint: to know if we reached the end, check if nextBlock = -1

    /***
        Deleting attribute catalog entries corresponding the relation and index blocks corresponding to the relation with relName on its attributes
    ***/
    // reset the searchIndex of the attribute catalog using RelCacheTable::resetSearchIndex()

    // store the number of attributes deleted, because in case all the attributes were not successfully
    // added, we need to keep track of the deleted attributes
    int numberOfAttributesDeleted = 0;

    while(true) {
        RecId attrCatRecId;
        // attrCatRecId = linearSearch on attribute catalog for RelName = relNameAttr

        // if no more attributes to iterate over (attrCatRecId == {-1, -1})
        //     break;

        numberOfAttributesDeleted++;

        // create a RecBuffer for attrCatRecId.block
        // get the header of the block
        // get the record corresponding to attrCatRecId.slot

        // get root block from the attribute catalog record.
        // This will be used later to delete any indexes if it exists
        int rootBlock;

        // Update the Slotmap for the block by indicating the slot as SLOT_UNOCCUPIED
        // Hint: use RecBuffer.getSlotMap and RecBuffer.setSlotMap

        // Decrement the numEntries in the header of the block corresponding to the attribute catalog entry
        // set back the header using RecBuffer.setHeader

        // If number of entries become 0, releaseBlock is called after fixing the Linked List.
        // Hint: Update to the linked list involves setting the left and right pointers of block
        // adjacent to the released block appropriately.
        if (/*   header.numEntries == 0  */) {
            /* Standard Linked List Delete for a Block */
            // Get the header of the left block and set it's rblock to this block's rblock
            // create a RecBuffer for lblock and call appropriate methods

            if (/* header.rblock != -1 */) {
                // Get the header of the right block and set it's lblock to this block's lblock
                // create a RecBuffer for rblock and call appropriate methods

            } else {
                // (the block being released is the "Last Block" of the relation.)
                // update the Relation Catalog entry's LastBlock field for this relation with the block number of the previous block.
            }

            // (no need to check for empty lblock since attr catalog will never be empty)

            // call releaseBlock()
        }

        // if index exists for the attribute (rootBlock != -1), call bplus destroy
        if (rootBlock != -1) {
            // delete the bplus tree rooted at rootBlock using BPlusTree::bPlusDestroy()
        }
    }

    /*** Delete the relation catalog entry corresponding to the relation from relation catalog ***/
    // Fetch the header of Relcat block

    // Decrement the numEntries in the header of the block corresponding to the relation catalog entry and set it back

    // Get the slotmap in relation catalog, update it by marking the slot as free(SLOT_UNOCCUPIED) and set it back.

    /*** Updating the Relation Cache Table ***/
    /** Update relation catalog record entry (number of records in relation catalog is decreased by 1) **/
    // Hint: Get the entry corresponding to relation catalog from the relation cache and update the number of records and set it back

    /** Update attribute catalog entry (number of records in attribute catalog is decreased by numberOfAttributesDeleted) **/
    // i.e., #Records = #Records - numberOfAttributesDeleted

    // Hint: Get the entry corresponding to attribute catalog from the relation cache and update the number of records and set it back

    return SUCCESS;
}
```

### BlockAccess :: project()

#### Description

This method iterates over the relation specified to fetch the next record (until all records are fetched) and updates the recId of next record in cache.

#### Arguments

| Name   | Type               | Description                                                 |
| ------ | ------------------ | ----------------------------------------------------------- |
| relId  | `int`              | Relation Id of Relation to which projection has to be done. |
| record | `union Attribute*` | pointer to record where next record is to be placed.        |

#### Return Values

| Value                      | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| [`SUCCESS`](/constants)    | On successful copy of record to _record_                    |
| [`E_NOTFOUND`](/constants) | If there are no more records to be fetched for the relation |

#### Algorithm

```cpp
int BlockAccess::project(int relId, Attribute *record) {
    // get the previous search index of the relation relId from the relation cache
    // (use RelCacheTable::getSearchIndex() function)

    // let block and slot denote the record id of the record being currently checked

    // if the current search index record is invalid(i.e. both block and slot = -1)
    if (prevRecId.block == -1 && prevRecId.slot == -1)
    {
        // (new project operation. start from beginning)

        // get the first record block of the relation from the relation cache
        // (use RelCacheTable::getRelCatEntry() function of Cache Layer)

        // block = first record block of the relation
        // slot = 0
    }
    else
    {
        // (a project operation is already in progress)

        // block = previous search index's block
        // slot = previous search index's slot + 1
    }


    // The following code finds the next record of the relation
    // Start from the record id (block, slot) and iterate over the remaining records of the relation
    while (block != -1)
    {
        // create a RecBuffer object for block (use RecBuffer Constructor for existing block)

        // get header of the block using RecBuffer::getHeader() function
        // get slot map of the block using RecBuffer::getSlotMap() function

        if(/* slot >= the number of slots per block*/)
        {
            // (no more slots in this block)
            // update block = right block of block
            // update slot = 0
        }
        else if (/* slot is free (i.e slot-th entry in slotMap contains SLOT_UNOCCUPIED) */)
        {
            // increment slot
        }
        else {
            // (the next occupied slot / record has been found)
            break;
        }
    }

    if (block == -1){
        // (a record was not found. all records exhausted)
        return E_NOTFOUND;
    }

    // declare nextRecId to store the RecId of the record found
    RecId nextRecId{block, slot};

    // set the search index to nextRecId using RelCacheTable::setSearchIndex

    /* Copy the record with record id (nextRecId) to the record buffer (record)
       For this Instantiate a RecBuffer class object by passing the recId and
       call the appropriate method to fetch the record
    */

    return SUCCESS;
}
```
