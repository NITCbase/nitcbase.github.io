# Buffer Layer Stub Code

## StaticBuffer.cpp

```cpp
#include "staticBuffer.h"
#include "../define/constants.h"
#include "../disk/disksimulator.cpp"

StaticBuffer::StaticBuffer(){
// copy blockAllocMap blocks from disk to buffer (using readblock() of disk)

//initialise metainfo of all the buffer blocks with dirty:false, free:true, timestamp:-1 and blockNum:-1    
}

StaticBuffer::~StaticBuffer(){
    // copy blockAllocMap blocks from buffer to disk(using writeblock() of disk)

    /*iterate through all the buffer blocks, 
    	write back blocks with meta info as free:false,dirty:true (using writeblock() of disk)*/
}

int StaticBuffer::getFreeBuffer(int blockNum){
    // increase the time stamps in metainfo of all the occupied buffers.
    
    // if free buffer is available, bufferIndex is the index of the free buffer.
    
    // if free buffer is not available, replace the buffer with the largest timestamp and set it as bufferIndex.
    
    // update the metainfo array corresponding to the buffer index. 
    
    // return the buffer index
}

int StaticBuffer::getBufferNum(int blockNum){
    //traverse through the metainfo array,
    	find the buffer index of the buffer to which the block is loaded.
    
    //if found return buffer index, else indicate failure.
}

int StaticBuffer::getStaticBlockType(int blockNum){
    //traverse the blockAllocMap to find the type corresponding to blockNum.
    
    //return the blockType obtained(REC/IND_INTERNAL/IND_LEAF/UNUSED)
}

void StaticBuffer::setDirtyBit(int blockNum){
    //find the buffer index corresponding to the block using the getBufferNum().
    
    //set the dirty bit of that buffer in the metaInfo to true.
}
```

## StaticBuffer.h

```cpp
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
	static unsigned char blocks[32][BLOCK_SIZE];
	static struct BufferMetaInfo metainfo[32];
	static unsigned char blockAllocMap[DISK_BLOCKS];

	//methods
	static int getFreeBuffer(int blockNum);
	static int getBufferNum(int blockNum);
	
public:
	//methods	
	static int getStaticBlockType(int blockNum);
	static void setDirtyBit(int blockNum);
	StaticBuffer();
	~StaticBuffer();
	
};
```

## BlockBuffer.cpp

```cpp
#include "blockBuffer.h"
#include "staticBuffer.h"
#include "../define/constants.h"
#include "../define/error.h"
using namespace std;

BlockBuffer::BlockBuffer(int blockNum){
// set the blockNum field of the object to input argument.

// copy the block into buffer using getBlock function.

}

BlockBuffer::BlockBuffer(char blockType){
// allocate a block on the disc and a buffer in memory to hold the new block of given type using getFreeBlock function.

// set the blockNum field of the object to that of the allocated block number.

}

unsigned char * BlockBuffer::getBufferPtr(){
	//find the buffer index of the block using getBlock() 
	
	// return the pointer to this buffer (blocks[bufferIndex]).
}

void BlockBuffer::getHeader(struct HeadInfo *head){	
// get the starting address of the buffer containing the block using getBufferPtr. 
        
//copy the header of block to the memory location pointed to by the argument head using appropriate type casting

}

void BlockBuffer::setHeader(struct HeadInfo *head){
// get the starting address of the buffer containing the block using getBufferPtr.

//copy the contents of the memory location pointed to by the argument head to the header of block using appropriate type casting

//update dirty bit
}

int BlockBuffer::getBlock(){						
     //check whether the block is already present in the buffer using StaticBuffer.getBufferNum() .
     
     //if present, set the timestamp of the corresponding buffer to 0 and increment the timpestamps of all other occupied buffers in the BufferMetaInfo.
     
     //if not present, get a free buffer using StaticBuffer.getFreeBuffer() and read the block into the free buffer using readBlock().
   
}

int BlockBuffer::getFreeBlock(int blockType){
//iterate through the StaticBuffer.blockAllocMap and find the index of a free block in the disk.
   
//if no block is free, return FAILURE.
   
//find a free buffer using StaticBuffer.getFreeBuffer() 

//update StaticBuffer.blockAllocMap.
   
//update the block type of the block to the input block type using setBlockType().
   
//return block number of the free block.

}

int BlockBuffer::getBlockNum(){

//return corresponding block number
	
}

int BlockBuffer::getBlockType(int bufferIndex){
//blocks[bufferIndex] gives the staring address of the buffer						

//retrieve the first 4 bytes of the buffer that stores the block type.
	
}

void BlockBuffer::setBlockType(int blockType){						
//find the starting address of the buffer using getBufferPtr()

//store the given block type in the first 4 bytes of the buffer

//update the BlockAllocMap 

//update dirty bit
	
}

RecBuffer::RecBuffer(int blockNum) : BlockBuffer(blockNum){}

RecBuffer::RecBuffer() : BlockBuffer('R'){}

void RecBuffer::getSlotMap(unsigned char *slotMap){ 
    // get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr(). 
    
    // get the number of slots in the block.
    
    // using offset range copy the slotmap of the block to the memory pointed by the argument.
    
}

void RecBuffer::setSlotMap(unsigned char *slotMap){ 
    // get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr(). 
    
    // get the number of slots in the block.
    
    // using offset range copy the slotmap from the memory pointed by the argument to that of the block.
    
    //update dirty bit.
    
}

int RecBuffer::getRecord(union Attribute *rec,int slotNum){ 
    // get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr(). 

    // get number of attributes in the block.
    
    // get the number of slots in the block.

    // if input slotNum is not in the permitted range return E_OUTOFBOUND
    
    // if slot corresponding to input slotNum is free return E_FREESLOT

    // using offset range copy slotNumth record to the memory pointed by rec.

    // return SUCCESS
	
}

int RecBuffer::setRecord(union Attribute *rec,int slotNum){ 
     // get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr(). 
    
    // get number of attributes in the block.
    
    // get the number of slots in the block.

    // if input slotNum is not in the permitted range return E_OUTOFBOUND.
    
    // using offset range copy contents of the memory pointed by rec to slotNumth record.

    // update dirty bit.
    
    // return SUCCESS
	
}

IndBuffer::IndBuffer(int blockNum) : BlockBuffer(blockNum){}

IndBuffer::IndBuffer(char blockType) : BlockBuffer(blockType){} 

IndInternal::IndInternal() : IndBuffer('I'){}

IndInternal::IndInternal(int blockNum) : IndBuffer(blockNum){}

int IndInternal::getEntry(void *ptr, int indexNum){
	
// get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr().
  
// if the indexNum is not in range of 0-(#Entries(in block)-1) return E_OUTOFBOUND

// copy the indexNum'th Internalentry in block to memory ptr(ptr can be type casted appropriately if needed). 
    
// return SUCCESS.
	
}

int IndInternal::setEntry(void *ptr, int indexNum){
						
// get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr().

// if the indexNum is not in range of 0-(#Entries(in block)-1) return E_OUTOFBOUND

// copy the struct InternalEntry pointed by ptr to indexNum'th entry in block. 

//update dirty bit.

//return SUCCESS
	
}

IndLeaf::IndLeaf() : IndBuffer('L'){}

IndLeaf::IndLeaf(int blockNum) : IndBuffer(blockNum){}

int IndLeaf::getEntry(void *ptr, int indexNum){
						
// get the starting address of the buffer containing the block using getBufferPtr().

// if the indexNum is not in range of 0-(#Entries(in block)-1), return E_OUTOFBOUND

// copy the indexNum'th Index entry in block to memory ptr(ptr can be type casted appropriately if needed). 
    
// return SUCCESS.

}

int IndLeaf::setEntry(void *ptr, int indexNum){
						
// get the starting address of the buffer containing the block using BlockBuffer.getBufferPtr().

// if the index_num is not in range of 0-(#Entries(in block)-1), return E_OUTOFBOUND

// copy the struct Index pointed by ptr to indexNum'th entry in block.

//update dirty bit.

//return SUCCESS

}
```

## BlockBuffer.h

```cpp
#include "../define/constants.h"
#include <cstdint>


struct HeadInfo{
	int32_t blockType;
	int32_t pblock;
	int32_t lblock;
	int32_t rblock;
	int32_t numEntries;
	int32_t numAttrs; 
	int32_t numSlots;
	unsigned char reserved[4];
};

typedef union Attribute{
	int ival;
	float fval;
	char strval[ATTR_SIZE];
}Attribute;

struct InternalEntry{
	int32_t lChild;
	union Attribute attrVal;
	int32_t rChild;
};

struct Index{
	union Attribute attrVal;
	int32_t block;
	int32_t slot;
	unsigned char unused[8];
};

class BlockBuffer{
protected:
	//field
	int blockNum;
	
	//methods
	unsigned char *getBufferPtr();
	int getBlock();
	int getFreeBlock(int BlockType);

public:
	//methods
	BlockBuffer(int blockNum);
	BlockBuffer(char blockType);
	int getBlockNum();
	void getHeader(struct HeadInfo* head);
	void setHeader(struct HeadInfo* head);
	int getBlockType(int bufferIndex);
	void setBlockType(int blockType);
};

class RecBuffer : public BlockBuffer{
public:

	//methods
	RecBuffer();
	RecBuffer(int blockNum);
	void getSlotmap(unsigned char *slotMap);
	void setSlotmap(unsigned char *slotMap);
	int getRecord(union Attribute *rec,int slotNum);
	int setRecord(union Attribute *rec,int slotNum);
};

class IndBuffer : public BlockBuffer{
public:
	IndBuffer(int blockNum);
	IndBuffer(char blockType);
	virtual int getEntry(void *ptr, int indexNum) = 0; 
	virtual int setEntry(void *ptr, int indexNum) = 0; 
};

class IndInternal : public IndBuffer{
public:
	IndInternal();//update in documentation
	IndInternal(int blockNum);
	int getEntry(void *ptr, int indexNum) ;
	int setEntry(void *ptr, int indexNum) ;
};

class IndLeaf : public IndBuffer{
public:
	IndLeaf();
	IndLeaf(int blockNum);
	int getEntry(void *ptr, int indexNum) ;
	int setEntry(void *ptr, int indexNum) ;
};
```