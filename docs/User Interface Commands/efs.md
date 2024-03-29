---
sidebar_position: 6
title: "XFS Commands"
---

The XFS commands are used to format the disk, dump disk data structures like Block Allocation Map, Relation Catalog and Attribute Catalog, load / remove relations, list relations and copy the records of a relation on the NITCbase disk to a UNIX file. These commands are only available for the XFS Interface. The following are the XFS commands supported by NITCbase.

### Format Disk

#### Description

This command is used to create a simulated disk or to format the disk if already it already exists. On the newly created/formatted disk, initialization of _disk data structures_, namely - `Block allocation map`, `Relation catalog` and `Attribute catalog` are done according to the specification for disk model given in the [Physical layer](../Design/Physical%20Layer.md) of NITCbase. The disk is simulated on a binary file called `disk` which is located at `Disk/` once it is created.

:::note Important Details

- The **first four blocks of the disk** is used for storing the Block Allocation Map and hence _the first 4 entries in the Block Allocation Map is marked as occupied during the initialization of the disk._
- Blocks 4 and 5 used for storing relation catalog and attribute catalog are also marked as `REC` type in the newly initialized Block Allocation Map as part of the fdisk routine.

:::

#### Syntax

```bash
fdisk
```

### Import Relation

#### Description

This command is used to load relations from the UNIX filesystem to the NITCbase disk. The argument `filename` specifies the name of the [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) (Comma Separated Values) file which contains the contents of the relation to be uploaded. The file names should **not** contain `whitespaces` or any special characters except `-` or `_`. The command checks the size of the relation in the [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file, allocates the required number of blocks for the relation, updates the `Block allocation map`, `Relation catalog` and `Attribute catalog`.

#### File Format

The records to be added in the relation must be in a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file.
The CSV file **must follow** the following format:

- The first line must contain the names of the attributes of the relation separated by commas.
- Second line onwards records are specified as _comma-seperated attribute values_, in the **same order** as the attributes listed in the first line.
- Only **one record is allowed per line.**
- The CSV file must be stored in the path `Files/Input_Files`.

:::caution
This command will create a relation and insert records into it. The information required to create the relation (metadata) is obtained from the first line of the csv file. The information for the record values (actual data) are found in the subsequent lines of the csv file.

There is also a DML command [INSERT INTO TABLE FROM FILE](dml.md#insert-into-table-from-file) which is used to insert records into a relation from a csv file. This command is used to insert records into an existing relation and hence only expects the record values (actual data) in the csv file. That is, unlike the csv file here, the other file does not have its first line describing the attributes of the relation (metadata).

:::

#### Syntax

```bash
import filename
```

:::info

- The data types of the attributes in the first line are inferred from the values of the corresponding attributes on the second line of the CSV file.
- The name of the CSV file must be the same as the relation to be imported to the disk. i.e. the CSV file name should be in the format `relname.csv`, where relname is taken as name of the new relation.
- First **15 characters of name of file is taken as the relation name**. Similarly, only the first 15 characters of attributes listed in first line of the CSV file is taken as the name for each attribute.
- The CSV file **should not contain any null values.**
- If a relation with the same name as that of the CSV file already exists, then the import will _fail, without any changes to disk._
- All files to be imported should be stored in the path `Files/Input_Files`.
- The _order of attribute values in each line of the CSV file must be same as that of the attributes of the relation._
- The number of attribute values in each row should match the number of attributes specified in the first line of the file.
- The types of attribute values in each row should match the attribute types inferred from the second line of the file.
- All attribute names of the relation must be unique.

:::

:::note Example

Consider the sample `Students.csv` file:

```plain title="Files/Input_Files/Students.csv"
No,Name,Cgpa
3,Sunny,8.2
5,Sania,6.0
7,Ralph,7.5

```

`import Students.csv` command will import relation `Students` into the disk

The first line in the CSV file represents the list of attributes in the relation which in this case are No, Name, Cgpa.
The datatypes of the attributes are determined from the values of the attributes in the second line.
An attribute can be an a number or a string. In this example the datatypes will be number, string and number respectively.

:::

### Show Schema

#### Description

This command is used to view the schema of a relation from XFS / NITCbase disk. All the attributes of the relation as well as their type and whether they have an index is printed to the console.

#### Syntax

```bash
schema tablename
```

:::note Example

To see the schema of a relation `Students` present in the NITCbase disk, execute the following command:

```bash
schema Students
```

:::

### Export Relation

#### Description

This command is used to export a relation from XFS / NITCbase disk to UNIX file system. All the records corresponding to the relation `tablename` are written to a CSV file named `filename.csv`, located at `Files/Output_Files`

#### Syntax

```bash
export tablename filename
```

:::info

- The file to which output is to be written must be a CSV file.
- The file names should not contain `whitespaces` or any special characters except `-` or `_`.

:::

:::note Example

To export a relation `Students` present in the NITCbase disk to a CSV file (named `Marks.csv` located at `Files/Output_Files` directory),
execute the following command:

```bash
export Students Marks.csv
```

:::

### Print Relation

#### Description

This command is used to print the records of a relation from XFS / NITCbase disk. All the records corresponding to the relation `tablename` are written to the console.

#### Syntax

```bash
print table tablename
```

:::note Example

To print a relation `Students` present in the NITCbase disk, execute the following command:

```bash
print table Students
```

:::

### List Relation Names

#### Description

This command is used to list the names of all relations in present in NITCbase / XFS Disk to the command line.

#### Syntax

```bash
ls
```

### Dump Block Allocation Map

#### Description

This command is used to dump the contents of the `Block allocation map` into an external file named `block_allocation_map.txt` located at 'Files/Output_Files`.

#### Syntax

```bash
dump bmap
```

### Dump Relation Catalog

#### Description

This command is used to copy the contents of `Relation catalog` to an external file named `relation_catalog.txt` located at `Files/Output_Files`.

#### Syntax

```bash
dump relcat
```

### Dump Attribute Catalog

#### Description

This command is used to copy the contents of `Attribute catalog` to an external file named `attribute_catalog.txt` located at `Files/Output_Files`.

#### Syntax

```bash
dump attrcat
```

### Print B+ Tree

#### Description

This command is used to print the `B+ tree`(in a level order manner) corresponding to the index created on an attribute of a relation. If index does not exist then an error message of `Index does not exist` is returned.

#### Syntax

```bash
print b+ tree relation_name.attribute_name
```

:::note Example

Consider the sample `numbers.csv` file:

```c title="/Files/numbers.csv"
key
10
5
75
20
.
.
.
```

Assume an index is created on the attribute `key`. Now to print the B+ tree corresponding to that index the following command can be used:
`print b+ tree numbers.key`. This will give the following output:

```
LEVEL 0
40
LEVEL 1
10,20   55,65
LEVEL 2
5,10   15,20   25,40,40   45,55   60,65   70,75
```

> The tree is printed in a level-order manner.
> In the above B+ tree, `40` is the root node and it's left and right child nodes are `10,20` and `55,65` respectively

:::

:::caution
In the above example, output shown is for a B+ tree which allows that maximum `4` keys in the internal node and maximum `3` keys in the leaf nodes. In NITCbase B+ tree design, maximum `100` keys are allowed in the internal node and maximum `63` keys are allowed in the leaf node.
:::

### Export B+ Blocks

#### Description

This command is used to export the data stored in `index blocks`(`internal index blocks` and `leaf index blocks`) of the `B+ tree` corresponding to an attribute of a relation. If index does not exist then an error message of `Index does not exist` is returned. All the blocks corresponding to the index are written to a TXT file named `filename.txt`, located at `Files/Output_Files`

#### Syntax

```bash
export b+ blocks relation_name.attribute_name filename.txt
```

:::note Example

Consider the sample `numbers.csv` file:

```c title="Files/Input_Files/numbers.csv"
key
10
5
75
20
.
.
.
```

Assume an index is created on the attribute `key`. Now to print the index blocks corresponding to that index the following command can be used:
`export b+ blocks numbers.key numbers.txt`. This will give the following file.

```plain title="Files/Output_Files/numbers.txt"
----- B+ TREE BLOCKS -----
BLOCK 15
Block Type: IND_INTERNAL
Parent Block: -1
No of entries: 1
lchild: 9, key_val: 40, rchild: 14
---------
BLOCK 9
Block Type: IND_INTERNAL
Parent Block: 15
No of entries: 2
lchild: 7, key_val: 10, rchild: 8
lchild: 8, key_val: 20, rchild: 11
---------
BLOCK 7
Block Type: IND_LEAF
Parent Block: 9
No of entries: 2
left node: -1, right node: 8
key_val: 5
key_val: 10
---------
BLOCK 8
Block Type: IND_LEAF
Parent Block: 9
No of entries: 2
left node: 7, right node: 11
key_val: 15
key_val: 20
---------
BLOCK 11
Block Type: IND_LEAF
Parent Block: 9
No of entries: 3
left node: 8, right node: 13
key_val: 25
key_val: 40
key_val: 40
---------
BLOCK 14
Block Type: IND_INTERNAL
Parent Block: 15
No of entries: 2
lchild: 13, key_val: 55, rchild: 10
lchild: 10, key_val: 65, rchild: 12
---------
BLOCK 13
Block Type: IND_LEAF
Parent Block: 14
No of entries: 2
left node: 11, right node: 10
key_val: 45
key_val: 55
---------
BLOCK 10
Block Type: IND_LEAF
Parent Block: 14
No of entries: 2
left node: 13, right node: 12
key_val: 60
key_val: 65
---------
BLOCK 12
Block Type: IND_LEAF
Parent Block: 14
No of entries: 2
left node: 10, right node: -1
key_val: 70
key_val: 75
---------
```

> The b+ tree blocks is printed in a level-order manner.

:::

:::caution
In the above example, output shown is for a B+ tree which allows that maximum `4` keys in the internal node and maximum `3` keys in the leaf nodes. In NITCbase B+ tree design, maximum `100` keys are allowed in the internal node and maximum `63` keys are allowed in the leaf node.
:::
