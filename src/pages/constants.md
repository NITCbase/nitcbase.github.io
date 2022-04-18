# Global Constants

The constants used by various algorithms in NITCbase documentation are listed in the files errors.h(error values returned by the algorithms described in the project documentation) and constants.h(other global constants)

## constants.h
```cpp
#ifndef NITCBASE_CONSTANTS_H
#define NITCBASE_CONSTANTS_H
#include <iostream>

// Path to disk
#define DISK_PATH "../Disk/disk"
// Path to run copy of the disk
#define DISK_RUN_COPY_PATH "../Disk/disk_run_copy"
// Path to Files directory
#define Files_Path "../Files/"
// Path to Input_Files directory inside the Files directory
#define INPUT_FILES_PATH "../Files/Input_Files/"
// Path to Output_Files directory inside the Files directory
#define OUTPUT_FILES_PATH "../Files/Output_Files/"
// Path to Batch_Execution_Files directory inside the Files directory
#define BATCH_FILES_PATH "../Files/Batch_Execution_Files/"

// Size of Block in bytes
#define BLOCK_SIZE 2048
// Size of an attribute in bytes
#define ATTR_SIZE 16
// Size of Disk in bytes
#define DISK_SIZE 16 * 1024 * 1024
// Size of Header of a block in bytes (not including slotmap)
#define HEADER_SIZE 32
// Size of field Lchild in bytes
#define LCHILD_SIZE 4
// Size of field Rchild in bytes
#define RCHILD_SIZE 4
// Size of field Pblock in bytes
#define PBLOCK_SIZE 4
// Size of field BlockNum in bytes
#define BLOCKNUM_SIZE 4
// Size of field SlotNum in bytes
#define SLOTNUM_SIZE 4
// Size of unused field in index block (in bytes)
#define INDEX_BLOCK_UNUSED_BYTES 8

// Size of an Internal Index Entry in the Internal Index Block (in bytes)
#define INTERNAL_ENTRY_SIZE 24
// Size of an Leaf Index Entry in the Leaf Index Block (in bytes)
#define LEAF_ENTRY_SIZE 32

// Number of block in disk
#define DISK_BLOCKS 8192
// Total number of blocks available in the Buffer (Capacity of the Buffer in blocks)
#define BUFFER_CAPACITY 32
// Maximum number of relations allowed to be open and cached in Cache Layer.
#define MAX_OPEN 12
// Number of blocks given for Block Allocation Map in the disk
#define BLOCK_ALLOCATION_MAP_SIZE 4

// Number of attributes present in one entry / record of the Relation Catalog
#define RELCAT_NO_ATTRS 6
// Number of attributes present in one entry / record of the Attribute Catalog
#define ATTRCAT_NO_ATTRS 6

// Disk block number for the block of Relation Catalog
#define RELCAT_BLOCK 4
// Disk block number for the first block of Attribute Catalog
#define ATTRCAT_BLOCK 5

// Common variable to indicate the number of attributes present in one entry of Relation Catalog / Attribute Catalog
#define NO_OF_ATTRS_RELCAT_ATTRCAT 6
// Size of slotmap in both Relation Catalog and Attribute Catalog
#define SLOTMAP_SIZE_RELCAT_ATTRCAT 20

// Return variable to indicate Success
#define SUCCESS 0
// Return variable to indicate Failure
#define FAILURE -1
// Return variable to indicate Exit
#define EXIT -2

// Value to mark a slot in Slotmap as Occupied
#define SLOT_OCCUPIED '1'
// Value to mark a slot in Slotmap as Unoccupied
#define SLOT_UNOCCUPIED '0'

// Value to mark an entry in Open relation table of Cache as Occupied
#define OCCUPIED 1
// Value to mark an entry in Open relation table of Cache as Free
#define FREE 0

// Block Types
// Block type for Record Block
#define REC 0
// Block type for Internal Index Block
#define IND_INTERNAL 1
// Block type for Leaf Index Block
#define IND_LEAF 2
// Block type for an Unused (Free) Block
#define UNUSED_BLK 3

// Operators
// Equal to
#define EQ 101
// Less than or equal to
#define LE 102
// Less than
#define LT 103
// Greater than or equal to
#define GE 104
// Greater than
#define GT 105
// Not equal to
#define NE 106 //if considered
// Reset Operator (used to reset the previous hit's search index)
#define RST 100 //reset op.
// Project Operator (used for project operation)
#define PRJCT 107

// Data types
// For an Integer or a Floating point number
#define NUMBER 0
// For a string of characters
#define STRING 1

// Relid for Relation catalog
#define RELCAT_RELID 0
// Relid for Attribute catalog
#define ATTRCAT_RELID 1

// Slot number for relation catalog in relation catalog
#define RELCAT_SLOTNUM_FOR_RELCAT 0
// Slot number for attribute catalog in relation catalog
#define RELCAT_SLOTNUM_FOR_ATTRCAT 1

// Indicates the Block number as Invalid.
#define INVALID_BLOCKNUM -1

// Used for internal purposes
#define TEMP "temp"

// Indexes for Relation Catalog Attributes
// Index for the Relation Name attribute of a relation catalog entry
#define RELCAT_REL_NAME_INDEX 0
// Index for the #Attributes attribute of a relation catalog entry
#define	RELCAT_NO_ATTRIBUTES_INDEX 1
// Index for the #Records attribute of a relation catalog entry
#define	RELCAT_NO_RECORDS_INDEX 2
// Index for the First Block attribute of a relation catalog entry
#define	RELCAT_FIRST_BLOCK_INDEX 3
// Index for the Last Block attribute of a relation catalog entry
#define	RELCAT_LAST_BLOCK_INDEX 4
// Index for the Number of slots per block attribute of a relation catalog entry
#define	RELCAT_NO_SLOTS_PER_BLOCK_INDEX 5

// Indexes for Attribute Catalog Attributes
// Index for Relation Name attribute of an attribute catalog entry
#define ATTRCAT_REL_NAME_INDEX 0
// Index for Attribute Name attribute of an attribute catalog entry
#define	ATTRCAT_ATTR_NAME_INDEX 1
// Index for Attribute Type attribute of an attribute catalog entry
#define	ATTRCAT_ATTR_TYPE_INDEX 2
// Index for Primary Flag attribute of an attribute catalog entry
#define	ATTRCAT_PRIMARY_FLAG_INDEX 3
// Index for Root Block attribute of an attribute catalog entry
#define	ATTRCAT_ROOT_BLOCK_INDEX 4
// Index for Offset attribute of an attribute catalog entry
#define	ATTRCAT_OFFSET_INDEX 5

// Global variables for B+ Tree Layer
// Maximum number of keys allowed in an Internal Node of a B+ tree
#define MAX_KEYS_INTERNAL 100
// Index of the middle element in an Internal Node of a B+ tree
#define MIDDLE_INDEX_INTERNAL 50
// Maximum number of keys allowed in a Leaf Node of a B+ tree
#define MAX_KEYS_LEAF 63
// Index of the middle element in a Leaf Node of a B+ tree
#define MIDDLE_INDEX_LEAF 31

#endif //NITCBASE_CONSTANTS_H
```

## errors.h

```cpp
#ifndef NITCBASE_ERRORS_H
#define NITCBASE_ERRORS_H

// Successful
#define SUCCESS 0
// Error: Command Failed
#define FAILURE -1
// Error: Out of bound
#define E_OUTOFBOUND -2
// Error: Free slot
#define E_FREESLOT -3
// Error: No index
#define E_NOINDEX -4
// Error: Insufficient space in Disk
#define E_DISKFULL -5
// Error: Invalid block
#define E_INVALIDBLOCK -6
// Error: Relation does not exist
#define E_RELNOTEXIST -7
// Error: Relation already exists
#define E_RELEXIST -8
// Error: Attribute does not exist
#define E_ATTRNOTEXIST -9
// Error: Attribute already exists
#define E_ATTREXIST -10
// Error: Cache is full
#define E_CACHEFULL -11
// Error: Relation is not open
#define E_RELNOTOPEN -12
// Error: Mismatch in number of attributes
#define E_NATTRMISMATCH -13
// Error: Duplicate attributes found
#define E_DUPLICATEATTR -14
// Error: Relation is open
#define E_RELOPEN -15
// Error: Mismatch in attribute type
#define E_ATTRTYPEMISMATCH -16
// Error: Invalid index or argument
#define E_INVALID -17
// Error: Maximum number of relations already present
#define E_MAXRELATIONS -18
// Error: Maximum number of attributes allowed for a relation is 125
#define E_MAXATTRS -19
// Error: Operation not permitted
#define E_NOTPERMITTED -20
// Error: Search for requested record unsuccessful
#define E_NOTFOUND -21
// Error: Block not found in buffer
#define E_BLOCKNOTINBUFFER -22
// Due to insufficient disk space, index blocks have been released from the disk
#define E_INDEX_BLOCKS_RELEASED -23

// 'temp' errors
// Error: Cannot create relation named 'temp' as it is used for internal purposes
#define E_CREATETEMP -24
// Error: Cannot create a target relation named 'temp' as it is used for internal purposes
#define E_TARGETNAMETEMP -25
// Error: Cannot rename a relation to 'temp'
#define E_RENAMETOTEMP -26

#endif //NITCBASE_ERRORS_H
```