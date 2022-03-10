# Global Constants

The constants used by various algorithms in NITCbase documentation are listed in the files errors.h(error values returned by the algorithms described in the project documentation) and constants.h(other global constants)

## constants.h
```cpp
#define BLOCK_SIZE 2048
#define ATTR_SIZE 16
#define DISK_BLOCKS 8192
#define MAXOPEN 12

#define USED 1 
#define UNUSED -1
#define ALLOTED 2

#define REC 0
#define IND_INTERNAL 1
#define IND_LEAF 2

#define EQ 101
#define LE 102
#define LT 103
#define GE 104
#define GT 105
#define NE 106
#define RST 100 //reset op.

#define INT 0
#define STRING 1
#define FLOAT 2

#define RELCAT_RELID 0
#define ATTRCAT_RELID 1
```

## errors.h

```cpp
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
#define E_NOTPERMITTED -17
```