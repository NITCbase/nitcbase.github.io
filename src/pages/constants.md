# Global Constants

The constants used by various algorithms in NITCbase documentation are listed in the files errors.h(error values returned by the algorithms described in the project documentation) and constants.h(other global constants)

## constants.h
```cpp
#ifndef NITCBASE_CONSTANTS_H
#define NITCBASE_CONSTANTS_H

#define DISK_PATH "../Disk/disk"
#define DISK_RUN_COPY_PATH "../Disk/disk_run_copy"
#define Files_Path "../Files/"
#define INPUT_FILES_PATH "../Files/Input_Files/"
#define OUTPUT_FILES_PATH "../Files/Output_Files/"
#define BATCH_FILES_PATH "../Files/Batch_Execution_Files/"

#define BLOCK_SIZE 2048
#define ATTR_SIZE 16
#define DISK_SIZE 16 * 1024 * 1024
#define HEADER_SIZE 32
#define LCHILD_SIZE 4
#define RCHILD_SIZE 4
#define PBLOCK_SIZE 4
#define BLOCKNUM_SIZE 4
#define SLOTNUM_SIZE 4
#define INDEX_BLOCK_UNUSED_BYTES 8

#define INTERNAL_ENTRY_SIZE 24
#define LEAF_ENTRY_SIZE 32

#define DISK_BLOCKS 8192
#define BUFFER_CAPACITY 32
#define MAX_OPEN 12
#define BLOCK_ALLOCATION_MAP_SIZE 4

#define RELCAT_NO_ATTRS 6
#define ATTRCAT_NO_ATTRS 6

#define RELCAT_BLOCK 4
#define ATTRCAT_BLOCK 5

#define NO_OF_ATTRS_RELCAT_ATTRCAT 6
#define SLOTMAP_SIZE_RELCAT_ATTRCAT 20

#define SUCCESS 0
#define FAILURE -1
#define EXIT -2

#define SLOT_OCCUPIED '1'
#define SLOT_UNOCCUPIED '0'

#define OCCUPIED 1
#define FREE 0

// TODO : add type for slot map blocks
#define REC 0
#define IND_INTERNAL 1
#define IND_LEAF 2
#define UNUSED_BLK 3

#define EQ 101
#define LE 102
#define LT 103
#define GE 104
#define GT 105
#define NE 106 //if considered
#define RST 100 //reset op.
#define PRJCT 107

#define NUMBER 0
#define STRING 1

#define RELCAT_RELID 0
#define ATTRCAT_RELID 1

#define RELCAT_SLOTNUM_FOR_RELCAT 0
#define RELCAT_SLOTNUM_FOR_ATTRCAT 1

#define INVALID_BLOCKNUM -1

#define TEMP "temp"

#define RELCAT_REL_NAME_INDEX 0
#define	RELCAT_NO_ATTRIBUTES_INDEX 1
#define	RELCAT_NO_RECORDS_INDEX 2
#define	RELCAT_FIRST_BLOCK_INDEX 3
#define	RELCAT_LAST_BLOCK_INDEX 4
#define	RELCAT_NO_SLOTS_PER_BLOCK_INDEX 5

#define ATTRCAT_REL_NAME_INDEX 0
#define	ATTRCAT_ATTR_NAME_INDEX 1
#define	ATTRCAT_ATTR_TYPE_INDEX 2
#define	ATTRCAT_PRIMARY_FLAG_INDEX 3
#define	ATTRCAT_ROOT_BLOCK_INDEX 4
#define	ATTRCAT_OFFSET_INDEX 5

#define MAX_KEYS_INTERNAL 100
#define MIDDLE_INDEX_INTERNAL 50
#define MAX_KEYS_LEAF 63
#define MIDDLE_INDEX_LEAF 31

#endif //NITCBASE_CONSTANTS_H
```

## errors.h

```cpp
#ifndef NITCBASE_ERRORS_H
#define NITCBASE_ERRORS_H

#define SUCCESS 0
#define FAILURE -1
#define E_OUTOFBOUND -2
#define E_FREESLOT -3
#define E_NOINDEX -4
#define E_DISKFULL -5
#define E_INVALIDBLOCK -6
#define E_RELNOTEXIST -7
#define E_RELEXIST -8
#define E_ATTRNOTEXIST -9
#define E_ATTREXIST -10
#define E_CACHEFULL -11
#define E_NOTOPEN -12
#define E_RELNOTOPEN -13
#define E_NATTRMISMATCH -14
#define E_DUPLICATEATTR -15
#define E_RELOPEN -16
#define E_ATTRTYPEMISMATCH -17
#define E_INVALID -18
#define E_MAXRELATIONS -19
#define E_MAXATTRS -20
#define E_NOTPERMITTED -21
#define E_NOTFOUND -22

// 'temp' errors
#define E_CREATETEMP -21
#define E_TARGETNAMETEMP -22
#define E_RENAMETOTEMP -23

#endif //NITCBASE_ERRORS_H
```