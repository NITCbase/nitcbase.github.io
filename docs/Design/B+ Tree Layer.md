---
sidebar_position: 6
title: "B+ Tree Layer"
---

:::caution PREREQUISITE READING

- [B+ Trees](../Misc/B%2B%20Trees.md)
- [Indexing in NITCbase](../Misc/Indexing.md)

:::

:::info note
The B+ Tree Layer code is to be written in `BPlusTree.cpp` and it's header file `BPlusTree.h`

[**The stub code for these files can be found here.**](/stub/bplus_stub)
:::

## Layout

Indexing is used to quickly locate and access the data in a database. It reduces the number of disk accesses needed when a search query is processed. NITCbase uses B+ Trees for the purpose of indexing an attribute in a relation. The B+ Tree Layer provides specifications for the creation/ usage of B+ Trees.

For each internal entry in the B+ tree, the attribute values in the left child are smaller or equal to, and the attribute values in the right child are larger than the attribute value of its parent. This property allows systematic traversal of the B+ Tree. <br/>
The leaf entries are ordered in ascending order of attribute values. The Leaf Index blocks are also connected as a linked list. This allows easy access to an entry in the next Leaf Index block rather than traversing the entire B+ Tree from the root to reach that entry.

NITCbase follows Object Oriented design for implementing B+ Tree. The class diagram is as shown below.

---

## class BPlusTree

```cpp
class BPlusTree {
public:
    static int bPlusCreate(int relId, char attrName[ATTR_SIZE]);
    static int bPlusInsert(int relId, char attrName[ATTR_SIZE], union Attribute attrVal, RecId recordId);
    static RecId bPlusSearch(int relId, char attrName[ATTR_SIZE], union Attribute attrVal, int op);
    static int bPlusDestroy(int rootBlockNum);
};

```

### BPlusTree::bPlusCreate

#### Description

This method creates a B+ Tree (Indexing) for the input attribute of the specified relation. It inserts the attribute value corresponding to attrName of all entries in the relation into the B+Tree using [bPlusInsert()](#bplusinsert).<br/>
If in between the insertion, the disk runs out of space, then the B+ Tree will not be created.

#### Arguments

| **Name** | **Type**          | **Description**                                                             |
| -------- | ----------------- | --------------------------------------------------------------------------- |
| relId    | `int`             | Relation Id of the relation whose attribute a B+ tree is to be created for. |
| attrName | `char[ATTR_SIZE]` | Attribute/column name for which B+ tree (index) is to be created.           |

#### Return values

| **Value**                      | **Description**                                                                                                                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful creation of a B+ tree for the attribute                                                                                  |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids                                                                          |
| [`E_RELNOTOPEN`](/constants)   | If the relation is not open                                                                                                            |
| [`E_ATTRNOTEXIST`](/constants) | If attribute with name attrName does not exist                                                                                         |
| [`E_DISKFULL`](/constants)     | If disk space is not sufficient for creating the index                                                                                 |
| [`E_NOTPERMITTED`](/constants) | If an index is being created for the catalog relations. The catalog relations are only linear searched and hence should not be indexed |

#### Algorithm

```cpp
int BPlusTree::bPlusCreate(int relId, char attrName[ATTR_SIZE]) {

    // if relId is either RELCAT_RELID or ATTRCAT_RELID:
    //     return E_NOTPERMITTED;


    // get the attribute catalog entry of attribute `attrName`
    // using AttrCacheTable::getAttrCatEntry()

    // if getAttrCatEntry fails
    //     return the error code from getAttrCatEntry

    if (/* an index already exists for the attribute (check rootBlock field) */) {
        return SUCCESS;
    }

    /******Creating a new B+ Tree ******/

    // get a free leaf block using constructor 1 to allocate a new block
    IndLeaf rootBlockBuf;

    // (if the block could not be allocated, the appropriate error code
    //  will be stored in the blockNum member field of the object)

    // declare rootBlock to store the blockNumber of the new leaf block
    int rootBlock = rootBlockBuf.getBlockNum();

    // if there is no more disk space for creating an index
    if (rootBlock == E_DISKFULL) {
        return E_DISKFULL;
    }

    RelCatEntry relCatEntry;

    // load the relation catalog entry into relCatEntry
    // using RelCacheTable::getRelCatEntry().

    int block = /* first record block of the relation */;

    /***** Traverse all the blocks in the relation and insert them one
           by one into the B+ Tree *****/
    while (block != -1) {

        // declare a RecBuffer object for `block` (using appropriate constructor)

        unsigned char slotMap[relCatEntry.numSlotsPerBlk];

        // load the slot map into slotMap using RecBuffer::getSlotMap().

        // for every occupied slot of the block
        {
            Attribute record[relCatEntry.numAttrs];
            // load the record corresponding to the slot into `record`
            // using RecBuffer::getRecord().

            // declare recId and store the rec-id of this record in it
            // RecId recId{block, slot};

            // insert the attribute value corresponding to attrName from the record
            // into the B+ tree using bPlusInsert.
            // (note that bPlusInsert will destroy any existing bplus tree if
            // insert fails i.e when disk is full)
            // retVal = bPlusInsert(relId, attrName, attribute value, recId);

            // if (retVal == E_DISKFULL) {
            //     // (unable to get enough blocks to build the B+ Tree.)
            //     return E_DISKFULL;
            // }
        }

        // get the header of the block using BlockBuffer::getHeader()

        // set block = rblock of current block (from the header)
    }

    return SUCCESS;
}
```

---

### BPlusTree::bPlusInsert

#### Description

Inserts an Index entry corresponding to the input attribute value and record id into the B+ tree.

:::info NOTE

During insertion of an entry to a valid B+ Tree, the disk may run out of memory. In such a case, the existing B+ Tree will be destroyed and the attribute catalog entry for the attribute will have rootBlock set to -1. Any operation on the B+ Tree must ensure that the object instance has a valid rootBlock.

:::

#### Arguments

| **Name** | **Type**          | **Description**                                                                      |
| -------- | ----------------- | ------------------------------------------------------------------------------------ |
| relId    | `int`             | Relation Id of the relation containing the attribute.                                |
| attrName | `char[ATTR_SIZE]` | Attribute/column name to whose B+ tree (index) an entry is to be added               |
| attrVal  | `union Attribute` | Attribute value corresponding to attrName in the target record.                      |
| recId    | `struct RecId`    | The record id of the target record whose Index entry is to be inserted into B+ Tree. |

#### Return values

| **Value**                      | **Description**                                                |
| ------------------------------ | -------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful insertion into the B+ tree of the attribute      |
| [`E_RELNOTOPEN`](/constants)   | If the relation is not open                                    |
| [`E_OUTOFBOUND`](/constants)   | Input relId is outside the valid set of possible relation ids  |
| [`E_ATTRNOTEXIST`](/constants) | If attribute with name attrName does not exist                 |
| [`E_NOINDEX`](/constants)      | Attribute `attrName` does not have an index                    |
| [`E_DISKFULL`](/constants)     | If disk space is not sufficient for insertion into the B+ tree |

#### Algorithm

```cpp
int BPlusTree::bPlusInsert(int relId, char attrName[ATTR_SIZE], Attribute attrVal, RecId recId) {

    // get the attribute cache entry corresponding to attrName
    // using AttrCacheTable::getAttrCatEntry().

    // if getAttrCatEntry() failed
    //     return the error code

    int blockNum = /* rootBlock of B+ Tree (from attrCatEntry) */;

    if (/* there is no index on attribute (rootBlock is -1) */) {
        return E_NOINDEX;
    }

    /****** Traverse the B+ Tree to reach the appropriate leaf where
            insertion can be done ******/

    while (/*block is not of type IND_LEAF */) { //use StaticBuffer::getStaticBlockType()

        // declare an IndInternal object for block using appropriate constructor

        // get header of the block using BlockBuffer::getHeader()

        /* iterate through all the entries, to find the first entry whose
           attribute value >= value to be inserted.
           NOTE: the helper function compareAttrs() can be used to compare
                 two Attribute values. */

        if (/*no such entry is found*/) {
            // set blockNum = rChild of (nEntries-1)'th entry of the block
            // (i.e. rightmost child of the block)

        } else {
            // set blockNum = lChild of the entry that was found
        }
    }

    // NOTE: blockNum now stores the leaf index block to which insertion
    //       of val is to be done.

    /******Insertion of entry in the appropriate leaf block******/

    // declare an IndLeaf instance for the block.
    // (it will become evident why we are doing a dynamic instantiation as
    // you continue with the implementation)
    IndLeaf* leafBuf = new IndLeaf(blockNum);

    HeadInfo blockHeader;
    // store the header of the leaf index block into blockHeader
    // using BlockBuffer::getHeader()

    // declare indexToInst which will store the Index entry to be inserted into B+ Tree.
    Index indexToIns;
    // set recId and attrVal in indexToIns

    // declare indices which will store the existing indices + the new index to insert
    Index indices[blockHeader.numEntries + 1];

    /*iterate through all the entries in the block and copy them to the array indices.
      Also insert indexval at appropriate position in the indices array maintaining
      the ascending order.*/

    if (blockHeader.numEntries != MAX_KEYS_LEAF) {
        // (leaf block has not reached max limit.)
        // increment blockHeader.numEntries and update the header of block
        // using BlockBuffer::setHeader().

        // iterate through all the entries of indices array and populate the
        // entries of block with them using IndLeaf::setEntry().

        delete leafBuf;
        return SUCCESS;
    }

    // (leaf block is full- need a new leaf to make the entry; split the
    //  entries between the two blocks.)

    // obtain new leaf index block to be used as the right block in the splitting
    // using constructor 1 for IndLeaf
    IndBuffer* newRightBlk = new IndLeaf();

    // assign the existing block as the left block in the splitting.
    IndBuffer* leftBlk = leafBuf;

    int newRightBlkNum = /* block num of right block */; // (use getBlockNum())
    int leftBlkNum = /* block num of left block */ ;  // (use getBlockNum())

    if (newRightBlkNum == E_DISKFULL) {
        //(failed to obtain a new leaf index block because the disk is full)

        // destroy the existing B+ tree by passing the rootBlock to bPlusDestroy().
        bPlusDestroy(attrCatEntry.rootBlock);

        // update the rootBlock of attribute catalog cache entry to -1 using
        // AttrCacheTable::setAttrCatEntry().

        delete newRightBlk;
        delete leftBlk;
        return E_DISKFULL;
    }

    HeadInfo leftBlkHeader = /* header of the left block */;

    // declare newRightBlkHeader to be the header of the new right block.
    HeadInfo newRightBlkHeader;

    // load the header of newRightBlk in newRightBlkHeader using
    // BlockBuffer::getHeader().

    /*update number of entries in newRightBlkHeader as (MAX_KEYS_LEAF+1)/2,
        pblock as the pblock of leftBlk, lblock as leftBlkNum and its
        rblock as the rblock of leftBlk
        and set the header of newRightBlk using BlockBuffer::setHeader()*/

    /* update number of entries in leftBlkHeader as (MAX_KEYS_LEAF+1)/2,
        rblock as newRightBlkNum and set the header using BlockBuffer::setHeader() */

    /* set the first 32 entries of leftBlk = the first 32 entries of indices array
        and set the first 32 entries of newRightBlk = the next 32 entries of
        indices array using IndLeaf::setEntry().*/

    delete leftBlk;
    delete newRightBlk;

    /****** Traverse the internal index blocks of the B+ Tree bottom up making
            insertions wherever required ******/

    int parBlkNum = /* pblock of leftBlk/newRightBlk */;

    Attribute newAttrVal;
    /* store the attribute value of indices[MIDDLE_INDEX_LEAF] in newAttrVal.
       this is attribute value which needs to be inserted in the parent block */

    /** internal node traversal loop starts here **/
    while (/* not at the root block ( parBlkNum != -1 ) */) {
        // declare an IndInternal instance for parBlkNum
        IndInternal* parBlk = new IndInternal(parBlkNum);

        HeadInfo parHeader;
        // load parHeader with header of parBlk using BlockBuffer::getHeader().

        // declare internalEntries to store all existing entries + the new entry
        InternalEntry internalEntries[parHeader.numEntries + 1];

        /*
        - iterate through all the entries of parBlk and copy them to the array
          internalEntries.
        - Also insert an InternalEntry entry with attrVal as newAttrVal,
          lChild as leftBlkNum, rChild as newRightBlkNum at an appropriate
          position in the internalEntries array maintaining the ascending order.
        - Update the lChild of the internalEntry at the next position in the
          internalEntries array to rightBlkNum
        */

        if (parHeader.numEntries != MAX_KEYS_INTERNAL) {
            // (parBlk has not reached max limit)

            // increment parheader.numEntries and update it as header of parBlk
            // using BlockBuffer::setHeader().

            /* iterate through all entries in internalEntries array and populate the
            entries of parBlk with them using IndInternal::setEntry(). */

            delete parBlk;

            return SUCCESS;
        }

        // (parBlk is full. needs to be split)

        // obtain new internal index block to be used as the right block in
        // the splitting
        newRightBlk = new IndInternal();

        // assign parBlk as the left block in the splitting.
        leftBlk = parBlk;ute

        // set leftBlkNum = parBlkNum.
        // set newRightBlkNum = block number of newRightBlk

        if (newRightBlkNum == E_DISKFULL) {
            // (failed to obtain an empty internal index because the disk is full)

            /* destroy the right subtree, given by newRightBlkNum, build up till
               now that has not yet been connected to the existing B+ Tree,
               using bPlusDestroy(). */

            // destroy the existing B+ tree by passing rootBlock to bPlusDestroy().

            // update the rootBlock of attribute cache entry to -1 using
            // AttrCacheTable::setAttrCatEntry().

            delete leftBlk;
            delete newRightBlk;

            return E_DISKFULL;
        }

        // set leftBlkHeader = parHeader.

        // set newRightBlkHeader = header of new right block
        //                         (using BlockBuffer::getHeader() )

        // update number of entries of leftBlkHeader as MAX_KEYS_INTERNAL/2 (50)
        // using BlockBuffer::setHeader().

        // update number of entries of newRightBlkHeader as MAX_KEYS_INTERNAL/2
        // using BlockBuffer::setHeader().

        /*
        - set the first 50 entries of leftBlk = index 0 to 49 of internalEntries
          array
        - set the first 50 entries of newRightBlk = entries from index 51 to 100
          of internalEntries array using IndInternal::setEntry().
          (index 50 will be moving to the parent internal index block)
        */

        int type = /* block type of a child of any entry (say, the rchild of
                      50th entry) of the internalEntries array in type, using
                      StaticBuffer::getStaticBlockType(). */

        // ** update the pblock of all the children of the new right block **
        for (/*i = 50 to 100*/) {
            IndBuffer* childBuff;

            // assign the rchild block of ith index in internalEntries of the
            // appropriate type to childBuff.
            if (type == IND_LEAF)
                childBuff = new IndLeaf(internalEntries[i].rChild);
            else
                childBuff = new IndInternal(internalEntries[i].rChild);

            /*update pblock of the childBuff block to newRightBlkNum using
                BlockBuffer::getHeader() and BlockBuffer::setHeader().*/

            delete childBuff;
        }

        delete leftBlk;
        delete newRightBlk;

        // update parBlkNum as the pblock of leftBlk.

        /* set newAttrVal = attribute value of 50th entry of internalEntries array.
        (this is attribute value which needs to be inserted in the parent block) */
    }
    /** internal node traversal loop ends here **/


    // (root block has been split)

    // Need to allot a new block which would be the new root of the B+ Tree.

    // load a new internal index block to newRootBlk using IndInternal::IndInternal().
    IndInternal newRootBlk;

    int newRootBlkNum = /* block number of newRootBlk */;

    if (newRootBlkNum == E_DISKFULL) {
        // (failed to obtain an empty internal index block because the disk is full)

        /* destroy the right subtree, given by newRightBlkNum, build up till now that
        has not yet been connected to the existing B+ Tree, using bPlusDestroy(). */

        // destroy the existing B+ tree by passing rootBlock to bPlusDestroy().

        // update the rootBlock of attribute cache entry to -1 using
        // AttrCacheTable::setAttrCatEntry().

        return E_DISKFULL;
    }

    // let newRootHeader be the header of newRootBlk.
    HeadInfo newRootHeader;

    // update number of entries in newRootBlk as 1 using
    // BlockBuffer::getHeader() and BlockBuffer::setHeader().

    /* add the struct InternalEntry entry with lChild as leftBlkNum,
       attrVal as newAttrVal, rChild as newRightBlkNum as the first entry to
       newRootBlk using IndInternal::setEntry(). */

    /* obtain new record buffers for leftBlkNum and newRightBlkNum and store it
       in leftBlk and newRightBlk
       the type of leftBlkNum and newRightBlkNum has to be checked and appropriate
       IndLeaf or IndInternal instance needs to be used*/

    /* update the pblock of leftBlk and newRightBlk to newRootBlkNum
       using BlockBuffer::getHeader() and BlockBuffer::setHeader().*/

    // update rootBlock of attribute catalog cache entry as newBlkNum
    // using AttrCacheTable::setAttrCatEntry().

    delete leftBlk;
    delete newRightBlk;

    return SUCCESS;
}
```

---

### BPlusTree::bPlusSearch

#### Description

This method searches the relation specified using a B+ tree to find the next record that satisfies the specified condition. The condition value is given by the argument `attrVal`. This function returns the recId of the next record satisfying the condition. The condition that is checked for is the following.

```
value-in-record `op` attrVal
```

:::info note

- This function reads the "next" record from the given relation that satisfies a given condition. The search index of the attribute (stored in the [AttrCacheTable](Cache%20Layer/AttrCacheTable.md) entry of the relation) is used to identify the location of the previous record that was returned. This function reads the next record and updates the value of the search index to the position of the newly read record, before passing the record to the caller.

- If `searchIndex` was reset to `{-1,-1}` before the call, this function starts reading from the beginning and returns the first record of the relation that satisfies the condition. The `AttrCacheTable::resetSearchIndex()` function may be used to reset the value of the search index.

- If the `searchIndex` value of a relation corresponds to the last record of the relation that satisfies the condition, this function will return `{-1, -1}`, as there is no "next" record to be read.

- If `searchIndex` has reached the last record of the relation, it is the responsibility of the caller to reset the search index if it is required that the function starts reading from the beginning of the relation again. If not done, every subsequent call to this function will return `{-1, -1}`.

:::

#### Arguments

| **Name** | **Type**          | **Description**                                                                                                                                                                                               |
| -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| relId    | `int`             | Relation Id of the relation containing the attribute with index.                                                                                                                                              |
| attrName | `char[ATTR_SIZE]` | Attribute/column name (which has an index) to which condition need to be checked with.                                                                                                                        |
| attrVal  | `union Attribute` | value of attribute that has to be checked against the operater.                                                                                                                                               |
| op       | `int`             | Conditional Operator (can be one among `EQ` , `LE` , `LT` , `GE` , `GT` , `NE` corresponding to equal, less or than equal, less than ,greater than or equal, greater than, not equal operators respectively). |

#### Return values

| **Value**          | **Description**                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `{block#, index#}` | returns the _block number and slot number_ of the record corresponding to the next hit. This corresponds to type `RecId`. |
| `{-1, -1}`         | If no valid next hit is found or if a B+ tree does not exist for the attribute. This corresponds to type `RecId`.         |

#### Algorithm

```cpp
RecId BPlusTree::bPlusSearch(int relId, char attrName[ATTR_SIZE], Attribute attrVal, int op) {
    // declare searchIndex which will be used to store search index for attrName.
    IndexId searchIndex;

    /* get the search index corresponding to attribute with name attrName
       using AttrCacheTable::getSearchIndex(). */

    AttrCatEntry attrCatEntry;
    /* load the attribute cache entry into attrCatEntry using
     AttrCacheTable::getAttrCatEntry(). */

    // declare variables block and index which will be used during search
    int block, index;

    if (/* searchIndex == {-1, -1}*/) {
        // (search is done for the first time)

        // start the search from the first entry of root.
        block = attrCatEntry.rootBlock;
        index = 0;

        if (/* attrName doesn't have a B+ tree (block == -1)*/) {
            return RecId{-1, -1};
        }

    } else {
        /*a valid searchIndex points to an entry in the leaf index of the attribute's
        B+ Tree which had previously satisfied the op for the given attrVal.*/

        block = searchIndex.block;
        index = searchIndex.index + 1;  // search is resumed from the next index.

        // load block into leaf using IndLeaf::IndLeaf().
        IndLeaf leaf(block);

        // declare leafHead which will be used to hold the header of leaf.
        HeadInfo leafHead;

        // load header into leafHead using BlockBuffer::getHeader().

        if (index >= leafHead.numEntries) {
            /* (all the entries in the block has been searched; search from the
            beginning of the next leaf index block. */

            // update block to rblock of current block and index to 0.

            if (block == -1) {
                // (end of linked list reached - the search is done.)
                return RecId{-1, -1};
            }
        }
    }

    /******  Traverse through all the internal nodes according to value
             of attrVal and the operator op                             ******/

    /* (This section is only needed when
        - search restarts from the root block (when searchIndex is reset by caller)
        - root is not a leaf
        If there was a valid search index, then we are already at a leaf block
        and the test condition in the following loop will fail)
    */

    while(/* block is of type IND_INTERNAL */) {  //use StaticBuffer::getStaticBlockType()

        // load the block into internalBlk using IndInternal::IndInternal().
        IndInternal internalBlk(block);

        HeadInfo intHead;

        // load the header of internalBlk into intHead using BlockBuffer::getHeader()

        // declare intEntry which will be used to store an entry of internalBlk.
        InternalEntry intEntry;

        if (/* op is one of NE, LT, LE */) {
            /*
            - NE: need to search the entire linked list of leaf indices of the B+ Tree,
            starting from the leftmost leaf index. Thus, always move to the left.

            - LT and LE: the attribute values are arranged in ascending order in the
            leaf indices of the B+ Tree. Values that satisfy these conditions, if
            any exist, will always be found in the left-most leaf index. Thus,
            always move to the left.
            */

            // load entry in the first slot of the block into intEntry
            // using IndInternal::getEntry().

            block = intEntry.lChild;

        } else {
            /*
            - EQ, GT and GE: move to the left child of the first entry that is
            greater than (or equal to) attrVal
            (we are trying to find the first entry that satisfies the condition.
            since the values are in ascending order we move to the left child which
            might contain more entries that satisfy the condition)
            */

            /*
             traverse through all entries of internalBlk and find an entry that
             satisfies the condition.
             if op == EQ or GE, then intEntry.attrVal >= attrVal
             if op == GT, then intEntry.attrVal > attrVal
             Hint: the helper function compareAttrs() can be used for comparing
            */

            if (/* such an entry is found*/) {
                // move to the left child of that entry
                block =  // left child of the entry

            } else {
                // move to the right child of the last entry of the block
                // i.e numEntries - 1 th entry of the block

                block =  // right child of last entry
            }
        }
    }

    // NOTE: `block` now has the block number of a leaf index block.

    /******  Identify the first leaf index entry from the current position
                that satisfies our condition (moving right)             ******/

    while (block != -1) {
        // load the block into leafBlk using IndLeaf::IndLeaf().
        IndLeaf leafBlk(block);
        HeadInfo leafHead;

        // load the header to leafHead using BlockBuffer::getHeader().

        // declare leafEntry which will be used to store an entry from leafBlk
        Index leafEntry;

        //highlight-start
        while (/*index < numEntries in leafBlk*/) {

            // load entry corresponding to block and index into leafEntry
            // using IndLeaf::getEntry().

            int cmpVal = /* comparison between leafEntry's attribute value
                            and input attrVal using compareAttrs()*/

            if (
                (op == EQ && cmpVal == 0) ||
                (op == LE && cmpVal <= 0) ||
                (op == LT && cmpVal < 0) ||
                (op == GT && cmpVal > 0) ||
                (op == GE && cmpVal >= 0) ||
                (op == NE && cmpVal != 0)
            ) {
                // (entry satisfying the condition found)

                // set search index to {block, index}

                // return the recId {leafEntry.block, leafEntry.slot}.

            } else if ((op == EQ || op == LE || op == LT) && cmpVal > 0) {
                /*future entries will not satisfy EQ, LE, LT since the values
                    are arranged in ascending order in the leaves */

                // return RecId {-1, -1};
            }

            // search next index.
            ++index;
        }
        //highlight-end

        /*only for NE operation do we have to check the entire linked list;
        for all the other op it is guaranteed that the block being searched
        will have an entry, if it exists, satisying that op. */
        if (op != NE) {
            break;
        }

        // block = next block in the linked list, i.e., the rblock in leafHead.
        // update index to 0.
    }

    // no entry satisying the op was found; return the recId {-1,-1}
}
```

---

### BPlusTree::bPlusDestroy

#### Description

Used to delete a B+ Tree. The caller passes the root block of the B+ Tree as input to the method. The method recursively deletes the constituent index blocks, both internal and leaf index blocks, until the full B+ Tree is deleted.

This method is called in a situation where no further disk blocks can be allotted during the creation of/ insertion to a B+ Tree. This function is also called while deleting an entire relation in NITCbase.

:::info NOTE

The caller is responsible for updating the rootBlock field in the corresponding attribute catalog after deletion.

:::

#### Arguments

| **Name**     | **Type** | **Description**                                         |
| ------------ | -------- | ------------------------------------------------------- |
| rootBlockNum | `int`    | block number of the root of the B+ tree to be destroyed |

#### Return values

| **Value**                      | **Description**                                               |
| ------------------------------ | ------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful deletion of the B+ tree rooted at rootBlockNum  |
| [`E_OUTOFBOUND`](/constants)   | if `rootBlockNum` is outside the valid range of block numbers |
| [`E_INVALIDBLOCK`](/constants) | if `rootBlockNum` does not correspond to an index block       |

#### Algorithm

```cpp
int BPlusTree::bPlusDestroy(int rootBlockNum) {
    if (/*rootBlockNum lies outside the valid range [0,DISK_BLOCKS-1]*/) {
        return E_OUTOFBOUND;
    }

    int type = /* type of block (using StaticBuffer::getStaticBlockType())*/;

    if (type == IND_LEAF) {
        // declare an instance of IndLeaf for rootBlockNum using appropriate
        // constructor

        // release the block using BlockBuffer::releaseBlock().

        return SUCCESS;

    } else if (type == IND_INTERNAL) {
        // declare an instance of IndInternal for rootBlockNum using appropriate
        // constructor

        // load the header of the block using BlockBuffer::getHeader().

        /*iterate through all the entries of the internalBlk and destroy the lChild
        of the first entry and rChild of all entries using BPlusTree::bPlusDestroy().
        (the rchild of an entry is the same as the lchild of the next entry.
         take care not to delete overlapping children more than once ) */

        // release the block using BlockBuffer::releaseBlock().

        return SUCCESS;

    } else {
        // (block is not an index block.)
        return E_INVALIDBLOCK;
    }
}
```
