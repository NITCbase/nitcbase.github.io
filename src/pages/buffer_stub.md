# Buffer Layer Stub Code

## StaticBuffer.cpp

```cpp
#include "StaticBuffer.h"

#include "StaticBuffer.h"
#include "../define(/constants).h"
#include "../Disk_Class/Disk.cpp"

unsigned char StaticBuffer::blocks[BUFFER_CAPACITY][BLOCK_SIZE];
struct BufferMetaInfo StaticBuffer::metainfo[BUFFER_CAPACITY];
unsigned char StaticBuffer::blockAllocMap[DISK_BLOCKS];

StaticBuffer::StaticBuffer() {

    // copy blockAllocMap blocks from disk to buffer (using readblock() of disk)

    //initialise metainfo of all the buffer blocks with dirty:false, free:true, timestamp:-1 and blockNum:-1

}

StaticBuffer::~StaticBuffer() {
    // copy blockAllocMap blocks from buffer to disk(using writeblock() of disk)

    /*iterate through all the buffer blocks,
        write back blocks with meta info as free:false,dirty:true (using writeblock() of disk)*/

}

int StaticBuffer::getStaticBlockType(int blockNum) {
    // Check if blockNum is valid (non zero and less than number of disk blocks)
    // and return E_OUTOFBOUND if not valid.


    // Access the entry in block allocation map corresponding to the blockNum argument
    // and return the block type after type casting to integer.
}

int StaticBuffer::setDirtyBit(int blockNum) {
    // Check if blockNum is valid (non zero and less than number of disk blocks)
    // and return E_OUTOFBOUND if not valid.

    //find the buffer index corresponding to the block using the getBufferNum().

    //set the dirty bit of that buffer in the metaInfo to true.

}

int StaticBuffer::getBufferNum(int blockNum) {
    // Check if blockNum is valid (non zero and less than number of disk blocks)
    // and return E_OUTOFBOUND if not valid.

    //traverse through the metainfo array,
    // find the buffer index of the buffer to which the block is loaded.


    //if found return buffer index, else indicate failure.

}

int StaticBuffer::getFreeBuffer(int blockNum) {
    // Check if blockNum is valid (non zero and less than number of disk blocks)
    // and return E_OUTOFBOUND if not valid.

    // increase the time stamps in metainfo of all the occupied buffers.
 
    // if free buffer is available, bufferIndex is the index of the free buffer.

    // if free buffer is not available, replace the buffer with the largest timestamp and set it as bufferIndex.

    // update the metainfo array corresponding to the buffer index.

    // return the buffer index

}



```

## StaticBuffer.h

```cpp
#ifndef NITCBASE_STATICBUFFER_H
#define NITCBASE_STATICBUFFER_H

#include "../define(/constants).h"

struct BufferMetaInfo {
	bool free;
	bool dirty;
	int blockNum;
	int timeStamp;
};

class StaticBuffer {

	friend class BlockBuffer;

private:
	//fields
	static unsigned char blocks[BUFFER_CAPACITY][BLOCK_SIZE];
	static struct BufferMetaInfo metainfo[BUFFER_CAPACITY];
	static unsigned char blockAllocMap[DISK_BLOCKS];

	//methods
	static int getFreeBuffer(int blockNum);

	static int getBufferNum(int blockNum);

public:
	//methods
	static int getStaticBlockType(int blockNum);

	static int setDirtyBit(int blockNum);

	StaticBuffer();

	~StaticBuffer();

};

#endif //NITCBASE_STATICBUFFER_H

```

## BlockBuffer.cpp

```cpp
#include "BlockBuffer.h"
#include "StaticBuffer.h"
#include "../Disk_Class/Disk.h"

using namespace std;

// Constructor 1
BlockBuffer::BlockBuffer(char blockType) {
	// allocate a block on the disc and a buffer in memory to hold the new block of given type using getFreeBlock function.

	// set the blockNum field of the object to that of the allocated block number.
	// TODO: what happens if disk full..note down
}

// Constructor 2
BlockBuffer::BlockBuffer(int blockNum) {
	// set the blockNum field of the object to input argument.
}

int BlockBuffer::getBlockNum() {
	// return corresponding block number
}

int BlockBuffer::getBlockType() {
	unsigned char *bufferPtr;
	// get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).
	
	// if the call to loadBlockAndGetBufferPtr(&bufferPtr) return SUCCESS 
	
		// return the first 4 bytes of the buffer that stores the block type. (Hint: cast using int32_t)
	
	// else load failed due to E_OUTOFBOUND, invalid block number, return the value returned by the call.
	
}

int BlockBuffer::setBlockType(int blockType) {
	unsigned char *bufferPtr;
	// get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// store the input block type in the first 4 bytes of the buffer.

	// update the StaticBuffer::blockAllocMap entry corresponding to the object's block number.

	// update dirty bit by calling appropriate method of StaticBuffer class.
	// if setDirtyBit() failed
		// return thr returned value from the call

	// return SUCCESS
}

int BlockBuffer::getHeader(struct HeadInfo *head) {
	unsigned char *bufferPtr;
	// get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// Use type casting here to cast the returned pointer type to the appropriate struct pointer to get the headInfo

	// copy the header of block to the memory location pointed to by the argument head.
		// not copying reserved

	// return SUCCESS
}

int BlockBuffer::setHeader(struct HeadInfo *head) {
	unsigned char *bufferPtr;
	// get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).
	
	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// Use type casting here to cast the returned pointer type to the appropriate struct pointer to get the headInfo

	//copy the contents of the memory location pointed to by head to the header of block using appropriate.
		// not copying reserved

	//update dirty bit by calling appropriate method of StaticBuffer class.

	// return SUCCESS;
}

void BlockBuffer::releaseBlock() {
	// if blockNum is INVALID_BLOCK (-1), or it is invalidated already, do nothing
		
	// else
		// get the buffer number of the buffer assigned to the block using StaticBuffer::getBufferNum().

		// if the buffer number is valid, free the buffer by setting the free flag of its metaInfo entry to true.

		// free the block in disk by setting the data type of the entry corresponding to the block number in StaticBuffer::blockAllocMap to UNUSED_BLK.

		// set the object's blockNum to INVALID_BLOCK (-1)
	}
}

/* NOTE: This function will NOT check if the block already exists in disk or not,
   rather will copy whatever content is there in that disk block to the buffer.
   Only call this if the Block exists in disk already, otherwise call constructor 1 to allocate space for a new block.
   Also ensure that all getter and setter methods accessing the block's data should call the loadBlockAndGetBufferPtr().
 */
int BlockBuffer::loadBlockAndGetBufferPtr(unsigned char ** buffPtr) {
	// check whether the block is already present in the buffer using StaticBuffer.getBufferNum()
	int bufferNum = StaticBuffer::getBufferNum(this->blockNum);

	// if present, set the timestamp of the corresponding buffer to 0 and increment the timpestamps of all other occupied buffers in the BufferMetaInfo.
	
	// else
		// if not present, get a free buffer using StaticBuffer.getFreeBuffer()

		// if the call returns E_OUTOFBOUND, return E_OUTOFBOUND here as the blockNum is invalid
		
		// Read the block into the free buffer using readBlock()
		
		// If the read failed, the block number is invalid return E_OUTOFBOUND;

	// store the pointer to this buffer (blocks[bufferNum]) in *buffPtr

	// return SUCCESS;
}

int BlockBuffer::getFreeBlock(int blockType) {
	//iterate through the StaticBuffer.blockAllocMap and find the index of a free block in the disk.

	//if no block is free, return FAILURE.

	//set the object's blockNum to the block number of the free block.

	//find a free buffer using StaticBuffer.getFreeBuffer()

	//initialize the header of the block with pblock: -1, lblock: -1, rblock: -1, numEntries: 0, numAttrs: 0 and numSlots: 0 using setHeader().

	//update the block type of the block to the input block type using setBlockType().

	//return block number of the free block.

}

//this is the way to call parent non-default constructor.
// 'R' is used to denote RecBuffer.
RecBuffer::RecBuffer() : BlockBuffer('R') {}

//this is the way to call parent non-default constructor.
RecBuffer::RecBuffer(int blockNum) : BlockBuffer(blockNum) {}

int RecBuffer::getSlotMap(unsigned char *slotMap) {
	unsigned char *bufferPtr;
	// get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// Use type casting here to cast the returned pointer type to the appropriate struct pointer

	// get the number of slots in the block.

	// using offset range copy the slotmap of the block to the memory pointed by the argument.

	// return SUCCESS
}

int RecBuffer::setSlotMap(unsigned char *slotMap) {
	unsigned char *bufferPtr;
	// get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// Use type casting here to cast the returned pointer type to the appropriate struct pointer to access headInfo

	// get the number of slots in the block.

	// using offset range copy the slotmap from the memory pointed by the argument to that of the block.

	// update dirty bit.
	// if setDirtyBit failed, return the value returned by the call

	// return SUCCESS
}

int RecBuffer::getRecord(union Attribute *rec, int slotNum) {
	unsigned char *bufferPtr;
	// get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// Use type casting here to cast the returned pointer type to the appropriate struct pointer to access headInfo

	// get number of attributes in the block.

	// get the number of slots in the block.

	// if input slotNum is not in the permitted range return E_OUTOFBOUND

	// if slot corresponding to input slotNum is free return E_FREESLOT

	// using offset range copy slotNumth record to the memory pointed by rec.

	// return SUCCESS

}

int RecBuffer::setRecord(union Attribute *rec, int slotNum) {
	unsigned char *bufferPtr;
	// get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).
	
	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

    // Use type casting here to cast the returned pointer type to the appropriate struct pointer to access headInfo

	// get number of attributes in the block.

	// get the number of slots in the block.

	// if input slotNum is not in the permitted range return E_OUTOFBOUND.

	// using offset range copy contents of the memory pointed by rec to slotNumth record.

	// update dirty bit.
	// if setDirtyBit failed, return the value returned by the call

	// return SUCCESS
}


IndBuffer::IndBuffer(char blockType) : BlockBuffer(blockType) {}

IndBuffer::IndBuffer(int blockNum) : BlockBuffer(blockNum) {}


IndInternal::IndInternal() : IndBuffer('I') {}

IndInternal::IndInternal(int blockNum) : IndBuffer(blockNum) {}

int IndInternal::getEntry(void *ptr, int indexNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).
	
	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// if the indexNum is not in the valid range of 0-(MAX_KEYS_INTERNAL-1), return E_OUTOFBOUND.

	// copy the indexNum'th Internalentry in block to memory ptr(ptr can be type casted appropriately if needed).

	// return SUCCESS.
}

int IndInternal::setEntry(void *ptr, int indexNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).
	
	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// if the indexNum is not in the valid range of 0-(MAX_KEYS_INTERNAL-1), return E_OUTOFBOUND.

	// copy the struct InternalEntry pointed by ptr to indexNum'th entry in block.

	// update dirty bit.
	// if setDirtyBit failed, return the value returned by the call

	// return SUCCESS
}

IndLeaf::IndLeaf() : IndBuffer('L') {}

IndLeaf::IndLeaf(int blockNum) : IndBuffer(blockNum) {}

int IndLeaf::getEntry(void *ptr, int indexNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).
	
	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.

	// if the indexNum is not in the valid range of 0-(MAX_KEYS_LEAF-1), return E_OUTOFBOUND.

	// copy the indexNum'th Index entry in block to memory ptr(ptr can be type casted appropriately if needed).

	// return SUCCESS.
}

int IndLeaf::setEntry(void *ptr, int indexNum) {
    unsigned char *bufferPtr;
    // get the starting address of the buffer containing the block using loadBlockAndGetBufferPtr(&bufferPtr).

	// if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS
		// return the value returned by the call.


	// if the indexNum is not in the valid range of 0-(MAX_KEYS_LEAF-1), return E_OUTOFBOUND.

	// copy the struct Index pointed by ptr to indexNum'th entry in block.

	//update dirty bit.

	//return SUCCESS
}
```

## BlockBuffer.h
```cpp
#ifndef NITCBASE_BLOCKBUFFER_H
#define NITCBASE_BLOCKBUFFER_H

#include "../define/constants.h"
#include "../define/errors.h"
#include <cstdint>


struct HeadInfo {
    int32_t blockType;
    int32_t pblock;
    int32_t lblock;
    int32_t rblock;
    int32_t numEntries;
    int32_t numAttrs;
    int32_t numSlots;
    unsigned char reserved[4];
};

typedef union Attribute {
    float nVal;
    char sVal[ATTR_SIZE];
} Attribute;

struct InternalEntry {
    int32_t lChild;
    union Attribute attrVal;
    int32_t rChild;
};

struct Index {
    union Attribute attrVal;
    int32_t block;
    int32_t slot;
    unsigned char unused[8];
};

class BlockBuffer {
protected:
    // field
    int blockNum;

    // methods
    int loadBlockAndGetBufferPtr(unsigned char **buffPtr);

    int getFreeBlock(int BlockType);

public:
    // methods
    BlockBuffer(char blockType);

    BlockBuffer(int blockNum);

    int getBlockNum();

    int getBlockType();

    int setBlockType(int blockType);

    int getHeader(struct HeadInfo *head);

    int setHeader(struct HeadInfo *head);

    void releaseBlock();
};

class RecBuffer : public BlockBuffer {
public:

    //methods
    RecBuffer();

    RecBuffer(int blockNum);

    int getSlotMap(unsigned char *slotMap);

    int setSlotMap(unsigned char *slotMap);

    int getRecord(union Attribute *rec, int slotNum);

    int setRecord(union Attribute *rec, int slotNum);
};

class IndBuffer : public BlockBuffer {
public:
    IndBuffer(int blockNum);

    IndBuffer(char blockType);

    virtual int getEntry(void *ptr, int indexNum) = 0;

    virtual int setEntry(void *ptr, int indexNum) = 0;
};

class IndInternal : public IndBuffer {
public:
    IndInternal();//update in documentation
    IndInternal(int blockNum);

    int getEntry(void *ptr, int indexNum);

    int setEntry(void *ptr, int indexNum);
};

class IndLeaf : public IndBuffer {
public:
    IndLeaf();

    IndLeaf(int blockNum);

    int getEntry(void *ptr, int indexNum);

    int setEntry(void *ptr, int indexNum);
};

#endif //NITCBASE_BLOCKBUFFER_H
```