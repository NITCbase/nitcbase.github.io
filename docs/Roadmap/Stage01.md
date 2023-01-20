---
title: "Stage 1 : Understanding NITCbase and its filesystem"
---

# Stage 1 : Understanding NITCbase and its filesystem (4 hours)

:::note Learning Objectives

- Understand the fundamentals of a relational DBMS.
- Understand the different types of blocks on our XFS disk - record and index blocks.
- Learn about the catalog data structures used in NITCbase - relation and attribute catalog.
- Learn to read and write from the XFS disk.

:::

A database management system is a software that allows us to easily store, organize and retrieve data. Databases can be classified into [various types](https://en.wikipedia.org/wiki/Database_model) depending on the logical structure of data within them. Here, we will only be talking about relational databases.

A [relational database](https://en.wikipedia.org/wiki/Relational_database) models data as rows and columns in a series of tables. Three key terms are used extensively in relational database models: _relations_, _attributes_, and _domains_. A **relation** is a table with columns and rows. The named columns of the relation are called **attributes**, and the domain is the set of values the attributes are allowed to take.

A relation in a production database might consist of millions of rows. These records spread across several blocks when stored in the disk. On developing a database of our own, it is essential that we have access to records stored in the disk without much time delay. Disk access is a high-latency operation. Therefore, as the size of relation increases, searching records that satisfy certain conditions by accessing every record in the disk blocks, can adversely affect the performance. This necessitates indexing.

In essence, a relational database will contain a collection of records corresponding to many relations and a proportional number of indexes to facilitate searching and other operations on the database. There's also need for a data structure to store the schema and metadata of the relations stored in the database. In NITCbase, we have the relation catalog and attribute catalog for these purposes.

We will get into the implementation details of all these parts as we go further into the roadmap.

## The Filesystem

In the previous stage, we created the `disk.xfs` file. This file represents a disk in our experimental setup. Similar to a physical disk, the XFS disk too is divided into blocks. As mentioned earlier, we'll be organising the blocks into 2 main types: **record blocks** and index blocks. Index blocks are further classified as **leaf index blocks** and **internal index blocks**.

**Read the documentation for [Disk Model](../Design/Physical%20Layer.md#disk-model) before proceeding further.**

## XFS Interface

XFS Interface is a tool that will allow you to interface with the NITCbase filesystem (on `disk.xfs`) from the host system. We can use it to initialize the disk, transfer relations between the host system and the XFS disk, and a variety of other operations. It will be immensely useful for debugging purposes throughout our implementation of NITCbase.

This tool is provided to you and is available in the `XFS_Interface` directory. We will look into the commands provided by the XFS Interface in the next stage. Note that all the filesystem operations that you will be implementing in the course of this project are already made available to you in the XFS Interface. This will aid you in verifying your own implementation.

## The Disk Class

Now, we finally begin working on NITCbase. At the lowest level, our database will need to interface with the filesystem. Similar to how an OS would provide you with read/write functionalities in it's standard library, here too you are provided with an API to access the XFS disk. The Disk Class exposes to you functions to read and write disk blocks.

Read the section on [Disk Class](../Design/Physical%20Layer.md#disk-class) before proceeding further.

An important thing to note about NITCbase is it's runtime disk. **While nitcbase is running, all the disk operations are done on a copy of the disk. All the updates to the disk are only copied to the actual disk on successful termination of the program. This helps us to avoid issues where the actual disk is an indeterminate state due to runtime errors in the program.**

The [Disk class](../Design/Physical%20Layer.md#disk-class) has a constructor and destructor that is meant to be run on beginning and end of execution of the program respectively. These functions are responsible for copying to and from the runtime disk as mentioned earlier. So, we will be declaring a single instance of the disk at the very top of our program. The `readBlock` and `writeBlock` methods are static and can be accessed as `Disk::readBlock()`.

## Reading and Writing

In this stage, we will try to use the provided Disk functions to do I/O operations on the disk.In your `mynitcbase` folder, you'll find a `main.c` file. We'll be editing this file to read and write from a random block on the disk. In the very first line of the `main` function, you'll find a declaration of an instance of `Disk` class for reasons we mentioned earlier. The commented-out lines following this declaration are relevant only in later stages and will be covered in due time.

As you read in [Disk model](../Design/Physical%20Layer.md#disk-model), each block of the disk is 2048 bytes. The disk functions expect two arguments: a buffer of size 2048 bytes and the block number that we want to work with.

These 2048 bytes of memory/disk will have to be managed by us. We know that in C/C++, an `unsigned char` is a type that can hold one byte and can hold a value between 0 and 255. So, we can declare the memory buffer for the disk block as this type.

```c
unsigned char buffer[BLOCK_SIZE];
//BLOCK_SIZE is a constant that has value 2048
```

Now, we can read into this buffer using the `Disk::readBlock()` function.

```cpp
Disk::readBlock(buffer, 7000);
// 7000 is a random block number that's unused.
```

Let's edit a few bytes of the buffer and write it back to the disk. We'll be using the `memcpy` function provided in the `cstring` header for this. The function takes three arguments; the destination pointer, the source pointer, and the number of bytes. It copies the required number of bytes from the source to the destination.

```cpp
char message[] = "hello";
memcpy(buffer + 20, message, 6);
//Now, buffer[20] = 'h', buffer[21] = 'e' ...
Disk::writeBlock(buffer, 7000);
```

Now, our modified buffer has been written to the disk. Let's try reading this back from the disk into a new buffer to see if our changes have been made.

```cpp
unsigned char buffer2[BLOCK_SIZE];
char message2[6];
Disk::readBlock(buffer2, 7000);
memcpy(message2, buffer2 + 20, 6);
std::cout << message2;
```

Additionally comment out the call to the `handleFrontend` function for now. We will be looking into it later.

So, in summary, your main function should look like so.

```cpp title="the modified main.c file"
int main(int argc, char *argv[]) {
  Disk disk_run;

  unsigned char buffer[BLOCK_SIZE];
  Disk::readBlock(buffer, 7000);
  char message[] = "hello";
  memcpy(buffer + 20, message, 6);
  Disk::writeBlock(buffer, 7000);

  unsigned char buffer2[BLOCK_SIZE];
  char message2[6];
  Disk::readBlock(buffer2, 7000);
  memcpy(message2, buffer2 + 20, 6);
  std::cout << message2;

  return 0;
}
```

A Makefile has been provided to you with this project. So, to build NITCbase, open a terminal and execute `make` in the `mynitcbase` directory. This will create an executable file with name `nitcbase` in the same directory. We can run this file to see if our message is being printed.

```bash title="In your terminal"
cd mynitcbase
make
./nitcbase
```

You should be seeing the following output.

```
hello
```

What we've covered now will form the lowest layer of NITCbase, **the physical layer**.

**Don't forget to undo your changes and revert the `main.c` file to it's [original state](https://github.com/Nitcbase/nitcbase/blob/master/main.cpp) before proceeding further.**
