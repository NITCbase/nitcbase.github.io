---
sidebar_position: 6
title: Cache Layer
---

# Cache Layer Stub Code

## RelCacheTable.cpp

```cpp
int RelCacheTable::getRelCatEntry(int relId, RelCatEntry *relCatBuf) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Relation Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  // copy the corresponding Relation Catalog entry in the Relation Cache Table
  // to relCatBuf.

  return SUCCESS;

}


int RelCacheTable::setRelCatEntry(int relId, RelCatEntry *relCatBuf) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Relation Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  // copy the relCatBuf to the corresponding Relation Catalog entry in
  // the Relation Cache Table.

  // set the dirty flag of the corresponding Relation Cache entry in
  // the Relation Cache Table.

  return SUCCESS;
}


int relCacheTable::getSearchIndex(int relid, recId *recidbuff_ptr) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Relation Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  // copy the searchIndex field of the Relation Cache entry corresponding to
  // input relId to searchIndex variable.

  return SUCCESS;
}


int RelCacheTable::setSearchIndex(int relId, recId *searchIndex) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Relation Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  // copy the searchIndex variable to the searchIndex field of the Relation
  // Cache entry corresponding to input relId.

  return SUCCESS;
}


int RelCacheTable::resetSearchIndex(int relId) {

  // declare a RecId having value {-1, -1}
  // set the search index to {-1, -1} using RelCacheTable::setSearchIndex
  // return the value returned by setSearchIndex
}

void RelCacheTable::recordToRelCatEntry(union Attribute record[RELCAT_NO_ATTRS], RelCatEntry *relCatEntry){
	// left to you
}


void relCatEntryToRecord(RelCatEntry *relCatEntry, union Attribute record[RELCAT_NO_ATTRS]){
	// left to you
}
```

## AttrCacheTable.cpp

```cpp
int AttrCacheTable::getAttrCatEntry(int relId, char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  for(/* each attribute corresponding to relation with relId */)
  {
    if (/* attrName/offset field of the AttrCatEntry
        is equal to the input attrName/attrOffset */)
    {
      // copy that Attribute Catalog entry in the Attribute Cache Table to
      // attrCatBuf.

      return SUCCESS;
    }
  }

  return E_ATTRNOTEXIST;
}


int AttrCacheTable::setAttrCatEntry(int relId, char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  for(/* each attribute corresponding to relation with relId */)
  {
    if(/* the attrName/offset field of the AttrCatEntry
       is equal to the input attrName/attrOffset */)
    {
      // copy the attrCatBuf to the corresponding Attribute Catalog entry in
      // the Attribute Cache Table.

      // set the dirty flag of the corresponding Attribute Cache entry in the
      // Attribute Cache Table.

      return SUCCESS;
    }
  }

  return E_ATTRNOTEXIST;
}


int AttrCacheTable::getSearchIndex(int relId, char attrName[ATTR_SIZE], IndexId *searchIndex) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  for(/* each attribute corresponding to relation with relId */)
  {
    if (/* attrName/offset field of the AttrCatEntry
        is equal to the input attrName/attrOffset */)
    {
      //copy the searchIndex field of the corresponding Attribute Cache entry
      //in the Attribute Cache Table to input searchIndex variable.

      return SUCCESS;
    }
  }

  return E_ATTRNOTEXIST;

}


int AttrCacheTable::setSearchIndex(int relId, char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {

  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {
    return E_OUTOFBOUND;
  }

  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {
    return E_RELNOTOPEN;
  }

  for(/* each attribute corresponding to relation with relId */)
  {
    if (/* attrName/offset field of the AttrCatEntry
        is equal to the input attrName/attrOffset */)
    {
      // copy the input searchIndex variable to the searchIndex field of the
      //corresponding Attribute Cache entry in the Attribute Cache Table.

      return SUCCESS;
    }
  }

  return E_ATTRNOTEXIST;
}


int AttrCacheTable::resetSearchIndex(int relId, char attrName[ATTR_SIZE]/int attrOffset) {

  // declare an IndexId having value {-1, -1}
  // set the search index to {-1, -1} using AttrCacheTable::setSearchIndex
  // return the value returned by setSearchIndex
}


void recordToAttrCatEntry(union Attribute record[ATTRCAT_NO_ATTRS], AttrCatEntry *attrCatEntry){
	// left to you
}


void attrCatEntryToRecord(AttrCatEntry *attrCatEntry, union Attribute record[ATTRCAT_NO_ATTRS]){
	// left to you
}
```

## OpenRelTable.cpp

```cpp
OpenRelTable::OpenRelTable() {

    /* initialize tableMetaInfo of all the entries of the Open Relation Table with
    free as true and relName as an empty string. also set all entries in
    AttrCacheTable::attrCache to nullptr */

    /************ Setting up the Relation Cache ************/

    /**** setting up Relation Catalog relation in the Relation Cache ****/

    /* read the record entry at index 0 from block 4, the block corresponding to
     Relation Catalog in the disk, and create a Relation Cache entry on it
     using RecBuffer::getRecord() and RelCacheTable::recordToRelCatEntry().
     update the recId field of this Relation Cache entry to {4,0}.
     use it to set the 0th index entry of the RelCacheTable. */
    // NOTE: use malloc to create the RelCacheEntry

    /**** setting up Attribute Catalog relation in the Relation Cache ****/

    /* read the record entry at index 1 from block 4, the block corresponding to
     Relation Catalog in the disk, and create a Relation Cache entry on it
     using RecBuffer::getRecord() and RelCacheTable::recordToRelCatEntry().
     update the recId field of this Relation Cache entry to {4,1}.
     use it to set the 1st index entry of the RelCacheTable.*/


    /************ Setting up the Attribute cache ************/

    /**** setting up Relation Catalog relation in the Attribute Cache ****/

    // listHead will hold the head of the linked list of Attribute Cache entries.
    AttrCacheEntry* listHead;

    for i from 0 to 5:
    {
      /* read the ith record entry from block 5, the block corresponding to
      Attribute Catalog in the disk, and create an Attribute Cache entry on it
      using RecBuffer::getRecord() and AttrCacheTable::recordToAttrCatEntry().
      update the recId field of this Attribute Cache entry to {5,i}.
      add the Attribute Cache entry to the linked list of listHead .*/
      // NOTE: use malloc to create the AttrCacheTable entries
    }

    // set the 0th entry of the AttrCacheTable to listHead.


    /**** setting up Attribute Catalog relation in the Attribute Cache ****/

    for i from 6 to 11:
    {
      /* read the ith record entry from block 5, the block corresponding to
      Attribute Catalog in the disk, and create an Attribute Cache entry on it
      using RecBuffer::getRecord() and AttrCacheTable::recordToAttrCatEntry().
      update the recId field of this Attribute Cache entry to {5,i}.
      add the Attribute Cache entry to the linked list of listHead .*/
    }

    // set the 1st entry of the AttrCacheTable to listHead.


    /************ Setting up the Open Relation table ************/

    /**** setting up Relation Catalog relation in the Open Relation Table ****/

    //update the 0th entry of the tableMetaInfo with free as false and relName
    // as 'RELATIONCAT'.

    /**** setting up Attribute Catalog relation in the Open Relation Table ****/

    //update the 1st entry of the tableMetaInfo with free as false and relName
    // as 'ATTRIBUTECAT'.

}


OpenRelTable::~OpenRelTable() {

    for i from 2 to MAX_OPEN-1:
    {
        if ith relation is still open:
        {
            // close the relation using openRelTable::closeRel().
        }
    }

    /**** Closing the catalog relations in the relation cache ****/

    //releasing the relation cache entry of the attribute catalog

    if (/* RelCatEntry of the ATTRCAT_RELID-th RelCacheEntry has been modified */) {

        /* Get the Relation Catalog entry from RelCacheTable::relCache
        Then convert it to a record using RelCacheTable::relCatEntryToRecord(). */

        // declaring an object of RecBuffer class to write back to the buffer
        RecBuffer relCatBlock(recId.block);

        // Write back to the buffer using relCatBlock.setRecord() with recId.slot
    }
    // free the memory dynamically allocated to this RelCacheEntry


    //releasing the relation cache entry of the relation catalog

    if(/* RelCatEntry of the RELCAT_RELID-th RelCacheEntry has been modified */) {

        /* Get the Relation Catalog entry from RelCacheTable::relCache
        Then convert it to a record using RelCacheTable::relCatEntryToRecord(). */

        // declaring an object of RecBuffer class to write back to the buffer
        RecBuffer relCatBlock(recId.block);

        // Write back to the buffer using relCatBlock.setRecord() with recId.slot
    }
    // free the memory dynamically allocated for this RelCacheEntry


    // free the memory allocated for the attribute cache entries of the
    // relation catalog and the attribute catalog
}


int OpenRelTable::getRelId(unsigned char relName[ATTR_SIZE]) {

  /* traverse through the tableMetaInfo array,
    find the entry in the Open Relation Table corresponding to relName.*/

  // if found return the relation id, else indicate that the relation do not
  // have an entry in the Open Relation Table.
}


int OpenRelTable::openRel(unsigned char relName[ATTR_SIZE]) {

  if(/* the relation `relName` already has an entry in the Open Relation Table */){
    // (checked using OpenRelTable::getRelId())

    // return that relation id;
  }

  /* find a free slot in the Open Relation Table
     using OpenRelTable::getFreeOpenRelTableEntry(). */

  if (/* free slot not available */){
    return E_CACHEFULL;
  }

  // let relId be used to store the free slot.
  int relId;

  /****** Setting up Relation Cache entry for the relation ******/

  /* search for the entry with relation name, relName, in the Relation Catalog using
      BlockAccess::linearSearch().
      Care should be taken to reset the searchIndex of the relation RELCAT_RELID
      before calling linearSearch().*/

  // relcatRecId stores the rec-id of the relation `relName` in the Relation Catalog.
  RecId relcatRecId;

  if (/* relcatRecId == {-1, -1} */) {
    // (the relation is not found in the Relation Catalog.)
    return E_RELNOTEXIST;
  }

  /* read the record entry corresponding to relcatRecId and create a relCacheEntry
      on it using RecBuffer::getRecord() and RelCacheTable::recordToRelCatEntry().
      update the recId field of this Relation Cache entry to relcatRecId.
      use the Relation Cache entry to set the relId-th entry of the RelCacheTable.
    NOTE: make sure to allocate memory for the RelCacheEntry using malloc()
  */

  /****** Setting up Attribute Cache entry for the relation ******/

  // let listHead be used to hold the head of the linked list of attrCache entries.
  AttrCacheEntry* listHead;

  /*iterate over all the entries in the Attribute Catalog corresponding to each
  attribute of the relation relName by multiple calls of BlockAccess::linearSearch()
  care should be taken to reset the searchIndex of the relation, ATTRCAT_RELID,
  corresponding to Attribute Catalog before the first call to linearSearch().*/
  {
      /* let attrcatRecId store a valid record id an entry of the relation, relName,
      in the Attribute Catalog.*/
      RecId attrcatRecId;

      /* read the record entry corresponding to attrcatRecId and create an
      Attribute Cache entry on it using RecBuffer::getRecord() and
      AttrCacheTable::recordToAttrCatEntry().
      update the recId field of this Attribute Cache entry to attrcatRecId.
      add the Attribute Cache entry to the linked list of listHead .*/
      // NOTE: make sure to allocate memory for the AttrCacheEntry using malloc()
  }

  // set the relIdth entry of the AttrCacheTable to listHead.

  /****** Setting up metadata in the Open Relation Table for the relation******/

  // update the relIdth entry of the tableMetaInfo with free as false and
  // relName as the input.

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
        return E_RELNOTOPEN;
    }

    /****** Releasing the Relation Cache entry of the relation ******/

    if (/* RelCatEntry of the relIdth Relation Cache entry has been modified */)
    {
        /* Get the Relation Catalog entry from RelCacheTable::relCache
        Then convert it to a record using RelCacheTable::relCatEntryToRecord(). */

        // declaring an object of RecBuffer class to write back to the buffer
        RecBuffer relCatBlock(recId.block);

        // Write back to the buffer using relCatBlock.setRecord() with recId.slot
    }

    // free the memory dynamically alloted to this Relation Cache entry
    // and assign nullptr to that entry

    /****** Releasing the Attribute Cache entry of the relation ******/

    // for all the entries in the linked list of the relIdth Attribute Cache entry.
    {
        if the entry has been modified:
        {
            /* Get the Attribute Catalog entry from attrCache
             Then convert it to a record using AttrCacheTable::attrCatEntryToRecord().
             Write back that entry by instantiating RecBuffer class. Use recId
             member field and recBuffer.setRecord() */
        }

        // free the memory dynamically alloted to this entry in Attribute
        // Cache linked list and assign nullptr to that entry
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
