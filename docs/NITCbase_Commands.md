---
sidebar_position: 1
title: 'NITCbase Commands'
tags:
  - NITCbase 
  - Commands
---
NITCbase supports two user interfaces namely, [XFS Interface](./XFS%20Interface/introduction.md) and [Frontend Interface](./Design/Frontend.md). The commands supported by the two interfaces fall into the following **four** categories:
1. [Data Definition Language(DDL) Commands ](#data-definition-language-commands)
2. [Data Manipulation Language(DML) Commands](#data-manipulation-language-commands)
3. [External File System / XFS Commands](#external-file-system-xfs-commands)
4. [Script Commands](#script-commands)

Among the above commands, XFS Interface supports all four categories whereas Frontend Interface supports Data Definition Language(DDL), Data Manipulation Language(DML) and Script commands.

## Data Definition Language Commands
The Data Definition Language(DDL) commands are used to define the database schema. They are used to create and delete relations, modify the structure of relations in the database and also create and delete indexes on the attributes of relations. DDL Commands are supported by both XFS Interface and Frontend Interface. The following are the DDL commands supported by NITCBase.

### CREATE TABLE
#### Description
This command is used to create a relation of the given name, with given attribute names and types. The type of an attribute can only be `NUM` or `STR` for numbers and strings respectively.
#### Syntax
```bash
CREATE TABLE tablename(attr1_name attr1_type, attr2_name attr2_type, ... )
```

:::info
* In NITCBase, the **maximum size of an attribute is 16 bytes**. 
* Since relation names and attribute names are attributes themselves in the catalog structures, the table name and attribute names in the queries must only have a maximum of 15 characters. 
* If the length is greater than 16, **only the first 15 characters will be taken.**
* All attribute names of the relation must be unique.
* A relation cannot be named as `temp`, since it is used for internal operations.
:::

:::note Example

The following command will create a Relation called `sample` with `RollNo`, `Name` and `CGPA` as the attributes of types number, string and number respectively:
```bash
CREATE TABLE sample(Rollno NUM, Name STR, CGPA NUM)
```

:::

### DROP TABLE
#### Description
This command is used to delete the relation of the given name. It deletes all the record and index blocks corresponding to the relations, and also deletes the entries corresponding to the relation in the `Relation catalog` and `Attribute catalog`. The entries corresponding to the deleted blocks in the `Block allocation map` are also reset.
#### Syntax
```bash
DROP TABLE tablename
```

:::note Example
The following command will delete the relation called `sample`:
```bash
DROP TABLE sample
```
:::

### OPEN TABLE
#### Description
This command is used to open the relation specified for manipulation by updating the Cache/OpenRelTable.
#### Syntax
```bash
OPEN TABLE tablename
```

:::note Example
The following command will open the relation called `sample`:
```bash
OPEN TABLE sample
```
:::

### CLOSE TABLE
#### Description
This command is used to close the relation specified by updating the Cache/OpenRelTable.
#### Syntax
```bash
CLOSE TABLE tablename
```

:::note Example
The following command will close the relation called `sample`:
```bash
CLOSE TABLE sample
```
:::

### CREATE INDEX
#### Description
This command is used to create an index on a given attribute of a relation. [B+ trees](https://nitcbase.github.io/design/Bplustreedetails.html) are used for creating indexes. Before executing this query, the relation must be opened using the `OPEN TABLE` command.
#### Syntax
```bash
CREATE INDEX ON tablename.attributename
```

:::note Example
The following command will create an index on the `Rollno` attribute of the `sample` relation:
```bash
CREATE INDEX ON sample.Rollno
```
:::

### DROP INDEX
#### Description
This command is used to drop/delete the B+ tree indexing on the given attribute of the given relation. Before executing this query, the relation must be opened using the `OPEN TABLE` command.
#### Syntax
```bash
DROP INDEX ON tablename.attributename
```

:::note Example
The following command will drop the index on the `Rollno` attribute of the `sample` relation:
```bash
DROP INDEX ON sample.Rollno
```
:::

### ALTER TABLE RENAME
#### Description
This command is used to rename an existing relation to the given new name.
#### Syntax
```bash
ALTER TABLE RENAME tablename TO new_tablename
```

:::note Example
The following command will rename the existing relation `sample`  to `Students`:
```bash
ALTER TABLE RENAME sample TO Students
```
:::

### ALTER TABLE RENAME COLUMN
#### Description
This command is used to rename an attribute of an existing relation to the given new name.
#### Syntax
```bash
ALTER TABLE RENAME tablename COLUMN column_name TO new_column_name
```

:::note Example
The following command will rename the the attribute of an existing relation `sample`  from `CGPA` to `SGPA`:
```bash
ALTER TABLE RENAME sample COLUMN CGPA TO SGPA
```
:::

## Data Manipulation Language Commands
The Data Manipulation Language(DML) commands are used to manipulate the data stored in the relations of the database. DML Commands are supported by both XFS Interface and Frontend Interface. The following are the DML commands supported by NITCBase.

### INSERT INTO TABLE VALUES
#### Description
This command is used to insert a single record into the given relation.

#### Syntax
```bash
INSERT INTO tablename VALUES ( value1, value2, value3, ... )
```

:::info Note
* The attribute values of the record are to be given as comma separated values in the same as the order of attributes in the relation.
* The number and types of the attribute values of the record to be inserted into relation must match.
:::
:::note Example
Given below are the records of the relation `Students`.

| Rollno | Name | CGPA |
|--------|------|------|
| 1      | Anu  | 9.01 |
| 4      | Cody | 7    |

Suppose that we need to insert a new record `2, Amy, 9.5` into the relation `Students`.

The query for doing that will be the following:
```bash
INSERT INTO Students VALUES (2, Amy, 9.5)
```
The records of the relation `Students` will now be:

| Rollno | Name | CGPA |
|--------|------|------|
| 1      | Anu  | 9.01 |
| 4      | Cody | 7    |
| 2      | Amy  | 9.5  |
:::

### INSERT INTO TABLE FROM FILE
#### Description
This command is used to insert multiple records into an already existing relation, `tablename` from a CSV file, `filename.csv` containing values for the attributes of the relation.
#### Syntax
```bash
INSERT INTO tablename VALUES FROM filename
```
:::info Note
* Each line in the CSV file corresponds to a record to be inserted in to the specified relation.
* The order of attribute values in each line of the CSV file must be same as that of the attributes of the relation.
* The number and types of attribute values in each row should match the number and types of the attributes of the specified relation.
* The CSV file should not contain any `null` values.
* The CSV file from which the values are to be inserted, must be stored in the path `NITCBase/Files/Input_Files`.
:::
:::note Example
Here is an example of a CSV file, `students.csv` containing the records for insertion into an already existing relation `Students`:
```c title="/Files/students.csv"
3,Sunny,8
5,Sania,6
7,Ralph,7.5
```

The query to insert all records contained in above file to the `Students` relation will be:
```bash
INSERT INTO Students VALUES FROM students.csv
```
:::

### SELECT * FROM TABLE
#### Description
This command creates a new target relation with the same attributes as that of source relation, and inserts into it all records from the source relation.
#### Syntax
```bash
SELECT * FROM source_relation INTO target_relation
```
:::note Example
```bash
SELECT * FROM Students INTO Target_Students
```
:::

### SELECT Attrlist FROM TABLE
#### Description
This command creates a new target relation with the attributes specified in `Attrlist`, and inserts all records(only the values corresponding to the specified attributes) of the source relation, into the newly created target relation.
#### Syntax
```bash
SELECT Attribute1, Attribute2, ... FROM source_relation INTO target_relation
```
:::note Example
```bash
SELECT Name, CGPA FROM Students INTO Target_Students
```
:::

### SELECT * FROM TABLE WHERE
#### Description
This command is used to retrieve all records of a given source relation, and insert them into a target relation, based on the the given condition. All records in the source relation that satisfy the condition, will be inserted into the newly created target relation.
#### Syntax
```bash
SELECT * FROM source_relation INTO target_relation WHERE attrname OP value
```
:::info Note
* Here, `OP` should only take a value from the set `{ =, >, <, >=, <=, != }`.
:::
:::note Example
```bash
SELECT * FROM Students INTO Target_Students WHERE CGPA > 8
```
:::

### SELECT Attrlist FROM TABLE WHERE
#### Description
This command creates a new target relation with the attributes specified in `Attrlist`, and inserts those records (only the values corresponding to the attributes specified in the `Attrlist`) from the source relation which satisfy the given condition.
#### Syntax
```bash
SELECT Attribute1, Attribute2, ... FROM source_relation INTO target_relation WHERE attrname OP value
```
:::info Note
* Here, `OP` should only take a value from the set `{ =, >, <, >=, <=, != }`.
:::
:::note Example
```bash
SELECT Name, CGPA FROM Students INTO Target_Students WHERE CGPA > 8
```
:::

### SELECT * FROM JOIN WHERE
#### Description
This command creates a new target relation with attributes constituting from both the source relations (excluding specified attribute from second source relation). It inserts the records obtained by `equi-join` of both the source relations (an attribute from each relation specified in arguments are used for `equi-join`) into the target relation.
#### Syntax
```bash
SELECT * FROM source_relation1 JOIN source_relation2 INTO target_relation WHERE source_relation1.attribute1 = source_relation2.attribute2
```
:::info Note
* `attribute1` should belong to `source_relation1` and `attribute2` should belong to `source_relation2`.
* The join attributes (i.e., `attribute1` and `attribute2`) can have the same name.
* **Excluding the join attributes, there should be no other attributes with the same name in these relations.**
:::
:::note Example
Given below are the records of the relation `Student1`.

| Rollno | Name | Batch |
|--------|------|-------|
| 1      | Anu  | A     |
| 2      | Cody | B     |
| 3      | Amy  | B     |

Given below are the records of the relation `Student2`.

| Rollno | Marks |
|--------|-------|
| 1      | 98    |
| 2      | 80    |
| 3      | 97    |
| 4      | 67    |

An example for a join query is:
```bash
SELECT * FROM Students1 JOIN Students2 INTO Students WHERE Students1.Rollno = Students2.Rollno
```
`Equi-join` on these two relations based on the attribute `Rollno` would result in the following target relation, `Students`.

| Rollno | Name | Batch | Marks |
|--------|------|-------|-------|
| 1      | Anu  | A     | 98    |
| 2      | Cody | B     | 80    |
| 3      | Amy  | B     | 97    |
:::

### SELECT Attrlist FROM JOIN WHERE
#### Description
This command creates a new target relation with attributes given in `Attrlist`. It inserts the records (only the values of the specified attributes in `Attrlist` obtained by `equi-join` of both the source relations (an attribute from each relation specified in arguments are used for equi-join) into the target relation.
#### Syntax
```bash
SELECT Attribute1, Attribute2, ... FROM source_relation1 JOIN source_relation2 INTO target_relation WHERE source_relation1.attribute1 = source_relation2.attribute2
```
:::info Note
* `attribute1` should belong to `source_relation1` and `attribute2` should belong to `source_relation2`.
* The join attributes(ie `attribute1` and `attribute2`) can have the same name.
* Excluding the join attributes, there should be no other attributes with the same name in these relations.
:::
:::note Example
Given below are the records of the relation `Student1`.

| Rollno | Name | Batch |
|--------|------|-------|
| 1      | Anu  | A     |
| 2      | Cody | B     |
| 3      | Amy  | B     |

Given below are the records of the relation `Student2`.

| Rollno | Marks |
|--------|-------|
| 1      | 98    |
| 2      | 80    |
| 3      | 97    |
| 4      | 67    |

An example for a join query is:
```bash
SELECT Rollno, Name, Marks FROM Students1 JOIN Students2 INTO Students WHERE Students1.Rollno = Students2.Rollno
```
`Equi-join` on these two relations based on the attribute `Rollno` would result in the following target relation, `Students`.

| Rollno | Name | Marks |
|--------|------|-------|
| 1      | Anu  | 98    |
| 2      | Cody | 80    |
| 3      | Amy  | 97    |
:::


## External File System (XFS) Commands
The External File System commands are used to format the disk, dump disk data structures like Block Allocation Map, Relation Catalog and Attribute Catalog, load / remove relations, list relations and copy the records of a relation on the NITCbase disk to a UNIX file. These commands are only available for the XFS Interface. The following are the External File System commands supported by NITCBase.

### Format Disk
#### Description
This command is used to create a simulated disk or to format the disk if already it already exists. On the newly created/formatted disk, initialization of *disk data structures*, namely - `Block allocation map`, `Relation catalog` and `Attribute catalog` are done according to the specification for disk model given in the [Physical layer](https://nitcbase.github.io/storage-model.html) of NITCBase. The disk is simulated on a binary file called `disk` which is located at `$HOME/NITCBase/Disk/` once it is created.

:::note Important Details
* The **first four blocks of the disk** is used for storing the Block Allocation Map and hence *the first 4 entries in the Block Allocation Map is marked as occupied during the initialization of the disk.*
* Blocks 4 and 5 used for storing relation catalog and attribute catalog are also marked as `REC` type in the newly initialized Block Allocation Map as part of the fdisk routine.
:::


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
* The CSV file must be stored in the path `NITCBase/Files/Input_Files`.
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
* All files to be imported should be stored in the path `NITCBase/Files/Input_Files`.
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

## Script Commands
Script commands are available for both XFS interface and frontend interface. These commands help the user to execute mutliple commands sequentially from a file and also to print out custom useful messages into terminal for debugging and informational purposes.

### Batch Execution
#### Description
This command is used to run multiple commands in sequence by reading the commands line-by-line from an external file. For example the `run` command given below will execute commands present in `filename`. If there is an error on running a command at a given line, all commands after that **will not be excuted** and the `run` command fails by giving the line number of the command in which error occurred.

:::note
* File name given as input to `run` command is fetched from the `/Files/Batch_Execution_Files/` directory and hence are required to be placed in that folder.
:::


#### Syntax
```bash
run filename
```
:::tip
* This is useful to execute multiple commonly used commands while debugging.
* We can use folders within `/Files/Batch_Execution_Files/` to organize the run files. In that case, `run folder_name/run_file` format can be used.
:::

### Echo
#### Description
This command is used to echo back the message given as argument to the command line.

:::tip
This is useful while debugging in combination with the `run` command.
:::

#### Syntax
```bash
echo <any message>
```