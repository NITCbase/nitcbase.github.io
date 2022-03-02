# Buffer Layer Stub Code

## StaticBuffer.cpp

```cpp
#include "StaticBuffer.h"

#include "StaticBuffer.h"
#include "../define/constants.h"
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

#include "../define/constants.h"

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

#include "../define/constants.h"
#include "../define/errors.h"
#include "../Disk_Class/Disk.h"

using namespace std;

// Constructor 1
BlockBuffer::BlockBuffer(char blockType) {
	// allocate a block on the disc and a buffer in memory to hold the new block of given type using getFreeBlock function.

	// set the blockNum field of the object to that of the allocated block number.

}

// Constructor 2
BlockBuffer::BlockBuffer(int blockNum) {
	// set the blockNum field of the object to input argument.

	// copy the block into buffer using getBlock function.

}

int BlockBuffer::getBlockNum() {
	// return corresponding block number
}

int BlockBuffer::getBlockType() {
	// get the starting address of the buffer containing the block using getBufferPtr().


	// return the first 4 bytes of the buffer that stores the block type. (Hint: cast using int32_t)

}

void BlockBuffer::setBlockType(int blockType) {
	// get the starting address of the buffer containing the block using getBufferPtr().

	//store the input block type in the first 4 bytes of the buffer.

	//update the StaticBuffer::blockAllocMap entry corresponding to the object's block number.

	//update dirty bit by calling appropriate method of StaticBuffer class.
}

void BlockBuffer::getHeader(struct HeadInfo *head) {
	// get the starting address of the buffer containing the block using getBufferPtr.
	// (Use type casting here to cast the returned pointer type to the appropriate struct pointer)

	// copy the header of block to the memory location pointed to by the argument head.
        // (we can assume the memory for head pointer is allocated by higher or same levels.)
}

void BlockBuffer::setHeader(struct HeadInfo *head) {
	// get the starting address of the buffer containing the block using getBufferPtr.
	// (Use type casting here to cast the returned pointer type to the appropriate struct pointer)

	//copy the contents of the memory location pointed to by head to the header of block using appropriate.


	//update dirty bit by calling appropriate method of StaticBuffer class.
}

void BlockBuffer::releaseBlock() {
	// get the buffer number of the buffer assigned to the block using StaticBuffer::getBufferNum().

	// if the buffer number is valid, free the buffer by setting the free flag of its metaInfo entry to true.

	// free the block in disk by setting the data type of the entry corresponding to the block number in StaticBuffer::blockAllocMap to UNUSED_BLK.

	// set the object's blockNum to -1.
}

unsigned char *BlockBuffer::getBufferPtr() {
	//find the buffer index of the block using getBlock()

	// return the pointer to this buffer (blocks[bufferIndex]).
}


int BlockBuffer::getBlock() {
	// get the buffer number of the buffer assigned to the block using StaticBuffer::getBufferNum().

	// if present, set the timestamp of the corresponding buffer to 0 and increment the timpestamps of all other occupied buffers in the BufferMetaInfo.

	// if not present, get a free buffer using StaticBuffer::getFreeBuffer() and read the block into the free buffer using readBlock().
	
	// return the bufferNum;
}

int BlockBuffer::getFreeBlock(int blockType) {
	//iterate through the StaticBuffer.blockAllocMap and find the index of a free block in the disk.

	//if no block is free, return FAILURE.

	//set the object's blockNum to the block number of the free block.

	//find a free buffer using StaticBuffer::getFreeBuffer()

	//initialize the header of the block with pblock: -1, lblock: -1, rblock: -1, numEntries: 0, numAttrs: 0 and numSlots: 0 using setHeader().

	//update StaticBuffer.blockAllocMap to indicate the occupancy of the free block with corresponding input type

	//update the block type of the block to the input block type using setBlockType().

	//return block number of the free block.

}

//this is the way to call parent non-default constructor.
// 'R' is used to denote RecBuffer.
RecBuffer::RecBuffer() : BlockBuffer('R') {}

//this is the way to call parent non-default constructor.
RecBuffer::RecBuffer(int blockNum) : BlockBuffer(blockNum) {}


void RecBuffer::getSlotMap(unsigned char *slotMap) {
	// get the starting address of the buffer containing the block using BlockBuffer::getBufferPtr().

	// get the number of slots in the block.

	// using offset range copy the slotmap of the block to the memory pointed by the argument.

}

void RecBuffer::setSlotMap(unsigned char *slotMap) {
	// get the starting address of the buffer containing the block using BlockBuffer::getBufferPtr().

	// get the number of slots in the block.

	// using offset range copy the slotmap from the memory pointed by the argument to that of the block.

	//update dirty bit using StaticBuffer::setDirtyBit().
}

int RecBuffer::getRecord(union Attribute *rec, int slotNum) {
	// get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr().

	// get number of attributes in the block.

	// get the number of slots in the block.

	// if input slotNum is not in the permitted range return E_OUTOFBOUND

	// if slot corresponding to input slotNum is free return E_FREESLOT

	// using offset range copy slotNumth record to the memory pointed by rec.

	// return SUCCESS

}

int RecBuffer::setRecord(union Attribute *rec, int slotNum) {
	// get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr().

	// get number of attributes in the block.

	// get the number of slots in the block.

	// if input slotNum is not in the permitted range return E_OUTOFBOUND.

	// using offset range copy contents of the memory pointed by rec to slotNumth record.

	// update dirty bit.

	// return SUCCESS

}


IndBuffer::IndBuffer(char blockType) : BlockBuffer(blockType) {}

IndBuffer::IndBuffer(int blockNum) : BlockBuffer(blockNum) {}


IndInternal::IndInternal() : IndBuffer('I') {}

IndInternal::IndInternal(int blockNum) : IndBuffer(blockNum) {}

int IndInternal::getEntry(void *ptr, int indexNum) {

	// get the starting address of the buffer containing the block using BlockBuffer::getBufferPtr() &

	// if the indexNum is not in the valid range of 0-(MAX_KEYS_INTERNAL-1), return E_OUTOFBOUND.

	// copy the indexNum'th Internalentry in block to memory ptr(ptr can be type casted appropriately if needed).

	// return SUCCESS.
}

int IndInternal::setEntry(void *ptr, int indexNum) {

	// get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr().

	// if the indexNum is not in the valid range of 0-(MAX_KEYS_INTERNAL-1), return E_OUTOFBOUND.

	// using offset range, copy contents of the memory pointed to by ptr to indexNum'th entry.

	// update dirty bit using StaticBuffer::setDirtyBit().

	// return SUCCESS
}

IndLeaf::IndLeaf() : IndBuffer('L') {}

IndLeaf::IndLeaf(int blockNum) : IndBuffer(blockNum) {}

int IndLeaf::getEntry(void *ptr, int indexNum) {

	// get the starting address of the buffer containing the block using getBufferPtr().

	// if the indexNum is not in the valid range of 0-(MAX_KEYS_LEAF-1), return E_OUTOFBOUND.

	// using offset range, copy the indexNum'th entry to memory pointed to by ptr.

	// return SUCCESS.
}

int IndLeaf::setEntry(void *ptr, int indexNum) {

	// get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr().

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

struct RecId {
	int block;
	int slot;
};

struct IndexId {
	int block;
	int index;
};

class BlockBuffer {
protected:
	// field
	int blockNum;

	// methods
	unsigned char *getBufferPtr();

	int getBlock();

	int getFreeBlock(int BlockType);

public:
	// methods
	BlockBuffer(char blockType);

	BlockBuffer(int blockNum);

	int getBlockNum();

	int getBlockType();

	void setBlockType(int blockType);

	void getHeader(struct HeadInfo *head);

	void setHeader(struct HeadInfo *head);

	void releaseBlock();
};

class RecBuffer : public BlockBuffer {
public:

	//methods
	RecBuffer();

	RecBuffer(int blockNum);

	void getSlotMap(unsigned char *slotMap);

	void setSlotMap(unsigned char *slotMap);

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