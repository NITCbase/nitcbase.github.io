---
title: "Stage 3 : The Disk Buffer and Catalog Caches(Pending)"
---

# The Disk Buffer and Catalog Caches(6 hours)

:::note Learning Objectives

- Learn about the operations in NITCbase and the XFS interface
- Learn about the NITCbase architecture

:::

## Introduction

We have seen record blocks, the way they are represented on the NITCbase disk, and how to read and write from them. However, disk operations are quite slow and a bottleneck to the efficient functioning of our database. Memory operations are much more efficient, but are subject to space constraints. We should ensure that our system makes optimum use of memory wherever possible to build a fast and responsive database.

### Disk Buffer

Following the [principle of locality](https://en.wikipedia.org/wiki/Locality_of_reference), NITCbase buffers all the disk i/o operations. We will be pre-allocating memory for holding 32 disk blocks in memory at a given time. Whenever a disk block is accessed for the first time, it will be loaded into the buffer. All subsequent operations on that block will be done on that buffer until that disk block is swapped out by a more recently required disk block. All the changes done to the buffer will be commited back to the disk at that point.

However, in the present stage, we will not be implementing the write-back functionality. Here, we will modify our disk read operations to work from a buffer instdad of the disk directly.

mention about StaticBuffer class

### Caches

Almost all operations on a relation require access to its corresponding relation catalog and attribute catalog entries. We will be pre-allocating memory to cache the catalogs of 12 relations at a given time. The relation and attribute catalog entries for the relation and attribute catalogs are always cached during the running of our database. Cince the values stored in these relations will be frequently used and it's beneficial to avoid the overhead of loading it to memory as required.

## Caching the catalogs

Now, let us modify our program to read the catalog details into the respective caches.

load the relation cache, open relation table, and attr cache table

The relation catalog and attribute catalog are always _open_ and have a rel-id of **0** and **1** respectively. Let's modify our `main.cpp` file to read this data from the cache.

```cpp title=main.cpp
int main(int argc, char *argv[]) {
  Disk disk_run;

  for (/* for i = 0 and i = 1*/) {
    struct RelCatEntry relCatEntry;

    // get the relation catalog entry for rel-id i in relCatEntry
    // using RelCacheTable::getRelCatEntry()

    printf("Relation: %s\n", relCatEntry.relName);

    for (/* j = 0 to numAttrs of the relation - 1 */) {
      struct AttrCatEntry attrCatEntry;

      // get the attribute catalog entry for (rel-id i, attribute offset j)
      // in attrCatEntry using AttrCacheTable::getAttrCatEntry()

      const char *attrType = (/* check the type of the attribute */) ? "NUM" : "STR";
      printf("  %s: %s\n", attrCatEntry.attrName, attrType);
    }
    printf("\n");
  }

  return 0;
}
```

On running this program, we should see identical output as you saw in the last for the relations RELCAT and ATTRCAT.

## Buffering the disk operations

if possible, update the read operations to use static buffer

## Exercises

insert questions here

**Don't forget to undo your changes and revert the `main.c` file to it's [original state](https://github.com/Nitcbase/nitcbase/blob/master/main.cpp) before proceeding further.**
