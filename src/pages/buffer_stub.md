# Buffer Layer Stub Code

## StaticBuffer.cpp

```cpp
#include "StaticBuffer.h"
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

## BlockBuffer.h

```cpp

#ifndef B18_CODE_BLOCKBUFFER_H
#define B18_CODE_BLOCKBUFFER_H

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
	void getSlotMap(unsigned char *slotMap);
	void setSlotMap(unsigned char *slotMap);
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

#endif //B18_CODE_BLOCKBUFFER_H

```