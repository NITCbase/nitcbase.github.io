# Disk Class Code

## Disk.cpp

```cpp

#include <iostream>
#include <fstream>
#include "../define(/constants).h"
#include "../define/errors.h"
#include "Disk.h"

/*
 * Used to make a temporary copy of the disk contents before the starting of a new session.
 * This ensures that if the system has a forced shutdown during the course of the session,
 * the previous state of the disk is not lost.
 */
Disk::Disk() {
	/* An efficient method to copy files */
	/* Copy Disk to Disk Run Copy */
	std::ifstream src(DISK_PATH, std::ios::binary);
	std::ofstream dst(DISK_RUN_COPY_PATH, std::ios::binary);

	dst << src.rdbuf();
	src.close();
	dst.close();
}

/*
 * Used to update the changes made to the disk on graceful termination of the latest session.
 * This ensures that these changes are visible in future sessions.
 */
Disk::~Disk() {
	/* An efficient method to copy files */
	/* Copy Disk Run Copy to Disk */
	std::ifstream src(DISK_RUN_COPY_PATH, std::ios::binary);
	std::ofstream dst(DISK_PATH, std::ios::binary);

	dst << src.rdbuf();
	src.close();
	dst.close();
}

/*
 * Used to Read a specified block from disk
 * block - Memory pointer of the buffer to which the block contents is to be loaded/read.
 *         (MUST be Allocated by caller)
 * blockNum - Block number of the disk block to be read.
 */
int Disk::readBlock(unsigned char *block, int blockNum) {
	FILE *disk = fopen(DISK_RUN_COPY_PATH, "rb");
	if (blockNum < 0 || blockNum > 8191) {
		return E_OUTOFBOUND;
	}
	const int offset = blockNum * BLOCK_SIZE;
	fseek(disk, offset, SEEK_SET);
	fread(block, BLOCK_SIZE, 1, disk);
	fclose(disk);
	return SUCCESS;
}

/*
 * Used to Write a specified block from disk
 * block - Memory pointer of the buffer to which contain the contents to be written.
 *         (MUST be Allocated by caller)
 * blockNum - Block number of the disk block to be written into.
 */
int Disk::writeBlock(unsigned char *block, int blockNum) {
	FILE *disk = fopen(DISK_RUN_COPY_PATH, "wb");
	if (blockNum < 0 || blockNum > 8191) {
		return E_OUTOFBOUND;
	}
	const int offset = blockNum * BLOCK_SIZE;
	fseek(disk, offset, SEEK_SET);
	fwrite(block, BLOCK_SIZE, 1, disk);
	fclose(disk);
	return SUCCESS;
}
```

## Disk.h

```cpp
#ifndef FRONTEND_INTERFACE_H
#define FRONTEND_INTERFACE_H
class Disk {
public:
    Disk();
    ~Disk();
    static int readBlock(unsigned char *block, int blockNum);
    static int writeBlock(unsigned char *block, int blockNum);
};
#endif //FRONTEND_INTERFACE_H
```