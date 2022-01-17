---
sidebar_position: 4
title: 'Data Definition Language Commands'
tags:
  - Data 
  - Definition
  - Commands
  - xfs
  - interface
---

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