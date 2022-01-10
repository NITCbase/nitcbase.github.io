---
sidebar_position: 3
title: 'External File System Commands'
tags:
  - External
  - Commands
  - File
  - System
  - fdisk
  - run
  - import
  - export
  - dump
  - exit
  - ls
  - XFS
---

The External File System commands are used to format the disk, dump disk data structures like Block Allocation Map, Relation Catalog and Attribute Catalog, load / remove relations, list relations and copy the records of a relation on the NITCbase disk to a UNIX file. These commands are only available for the XFS Interface. The following are the External File System commands supported by NITCBase.

### Format Disk
#### Description
This command is used to create a simulated disk or to format the disk if already it already exists. On the newly created/formatted disk, initialization of *disk data structures*, namely - `Block allocation map`, `Relation catalog` and `Attribute catalog` are done according to the specification for disk model given in the [Physical layer](https://nitcbase.github.io/storage-model.html) of NITCBase. The disk is simulated on a binary file called `disk` which is located at `$HOME/NITCBase/Disk/` once it is created.
#### Syntax
```bash
fdisk
```

### Import Relation
#### Description
This command is used to load relations from the UNIX filesystem to the NITCbase disk. The argument `filename` specifies the name of the [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) (Comma Separated Values) file which contains the contents of the relation to be uploaded. The file names should **not** contain `whitespaces` or any special characters except `-` or `_`. The command checks the size of the relation in the [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file, allocates the required number of blocks for the relation, updates the `Block allocation map`, `Relation catalog` and `Attribute catalog`.
#### File Fromat
The records to be added in the relation must be in a [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file. 
The CSV file **must follow** the following format:
* The first line must contain the names of the attributes of the relation separated by commas. 
* Second line onwards records are specified as *comma-seperated attribute values*, in the **same order** as the attrbiutes listed in the first line. 
* Only **one record is allowed per line.**
#### Syntax
```bash
import filename
```
:::info
* The data types of the attributes in the first line are inferred from the values of the corresponding attributes on the second line of the CSV file.
* The name of the CSV file must be the same as the relation to be imported to the disk. i.e. the CSV file name should be in the format `relname.csv`, where relname is taken as name of the new relation.
* First **15 characters of name of file is taken as the relation name**. Similarly, only the first 15 characters of attributes listed in first line of the CSV file is taken as the name for each attribute.
* The CSV file **should not contain any null values.**
* If a relation with the same name as that of the CSV file already exists, then the import will *fail, without any changes to disk.*
* All files to be imported should be stored in the path `$HOME/NITCBase/Files/`.
* The _order of attribute values in each line of the CSV file must be same as that of the attributes of the relation._
* The number of attribute values in each row should match the number of attributes specified in the first line of the file.
* The types of attribute values in each row should match the attribute types inferred from the second line of the file.
* All attribute names of the relation must be unique.
:::

:::note Example

Consider the sample `Students.csv` file:   
```c title="/Files/Students.csv"
No,Name,Cgpa
3,Sunny,8.2
5,Sania,6.0
7,Ralph,7.5
```
`import sample.csv` command will import relation `Students` into the disk

The first line in the CSV file represents the list of attributes in the relation which in this case are No, Name, Cgpa. 
The datatypes of the attributes are determined from the values of the attributes in the second line. 
An attribute can be an a number or a string. In this example the datatypes will be number, string and number respectively.

:::

### Export Relation
#### Description
This command is used to export a relation from XFS / NITCbase disk to UNIX file system. All the records corresponding to the relation `tablename` are written to a CSV file named `filename.csv`, located at the following path: `$HOME/NITCBase/Files/`
#### Syntax
```bash
export tablename filename
```
:::info
* The file to which output is to be written must be a CSV file.
* The file names should not contain `whitespaces` or any special characters except `-` or `_`.
:::

:::note Example

To export a relation `Students` present in the NITCbase disk to a CSV file (named `Marks.csv` located at `$HOME/NITCBase/Files/` directory),
execute the following command:
```bash
export Students Marks.csv
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
This command is used to dump the contents of the `Block allocation map` into an external file named `block_allocation_map.txt` located at the following path: `$HOME/NITCBase/Files/`.
#### Syntax
```bash
dump bmap
```

### Dump Relation Catalog
#### Description
This command is used to copy the contents of `Relation catalog` to an external file named `relation_catalog.txt` located at the following path: `$HOME/NITCBase/Files/`.
#### Syntax
```bash
dump relcat
```

### Dump Attribute Catalog
#### Description
This command is used to copy the contents of `Attribute catalog` to an external file named `attribute_catalog.txt` located at the following path: `$HOME/NITCBase/Files/`.
#### Syntax
```bash
dump attrcat
```

### Exit
#### Description
This command is used to exit the XFS Interface.
#### Syntax
```bash
exit
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

### Print B+ Blocks
#### Description
This command is used to print the data stored in `index blocks`(`internal index blocks` and `leaf index blocks`) of the `B+ tree` corresponding to an attribute of a relation. If index does not exist then an error message of `Index does not exist` is returned.
#### Syntax
```bash
print b+ blocks relation_name.attribute_name
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
Assume an index is created on the attribute `key`. Now to print the index blocks corresponding to that index the following command can be used:
`print b+ blocks numbers.key`. This will give the following output:

```c
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