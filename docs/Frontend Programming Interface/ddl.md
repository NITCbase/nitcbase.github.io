---
sidebar_position: 3
title: 'Data Definition Language Commands'
tags:
  - Data 
  - Definition
  - Commands
  - frontend
  - interface
---

The Data Definition Language commands are used to define the database schema. They are used to create and delete relations, modify the structure of relations in the database and also create and delete indexes on the attributes of relations. 

Following are the method specification and algorithm for each of the DDL commands of the Frontend Class.
Make sure to return the correct value from the methods, preferably sticking to the [global constants mentioned here](https://nitcbase.github.io/constants.html). 

## Frontend::create_table()
#### Description
This command is used to create a relation of the given name, with given attribute names and types. The type of an attribute can only be `NUM` or `STR` for numbers and strings respectively.

#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation/table to be created                               |
| no_attrs   | `int`                       | Number of attributes of the relation to be created                     |
| attributes | `char[no_attrs][ATTR_SIZE]` | Names of each attribute of the relation                                |
| type_attrs | `int[no_attrs]`             | Data type of each attribute, in the same order as the attributes array |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS         | Indicates successful creation of the relation                                   |
| E_RELEXIST      | If a relation of the same name already exists                                   |
| E_DUPLICATEATTR | If two or more attributes of the relation have the same name                    |
| E_DISKFULL      | If there is insufficient disk space to create the relation                      |
| E MAXRELATIONS  | If maximum number of relations possible already exists; currently limited to 20 |

#### Algorithm
```cpp
int Frontend::create_table(char relname[ATTR_SIZE], 
                           int no_attrs, 
                           char attributes[no_attrs][ATTR_SIZE],
                           int type_attrs[no_attrs]) {

    // TODO: Call createRel() method of the Schema Layer with correct arguments

    // TODO: Return Success or Error values appropriately
    
}
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

## Frontend::drop_table()
#### Description
This command is used to delete the relation of the given name. It deletes all the record and index blocks corresponding to the relations, and also deletes the entries corresponding to the relation in the `Relation catalog` and `Attribute catalog`. The entries corresponding to the deleted blocks in the `Block allocation map` are also reset.

#### Arguments


#### Return Values
| Value         | Description                                             |
|---------------|---------------------------------------------------------|
| SUCCESS       | Indicates successful deletion of the relation           |
| E_RELOPEN     | If the relation is open (SUBJECT TO CHANGE)             |
| E_RELNOTEXIST | If the relation with the given name does not exist      |
| E_INVALID     | If the relation name is `RELATIONCAT` or `ATTRIBUTECAT` |

#### Algorithm
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
#### Return Values
| Value         | Description                                                     |
|---------------|-----------------------------------------------------------------|
| relId         | relId is returned upon succesful opening of the relation        |
| E_RELNOTEXIST | If the relation with the given name does not exist              |
| E_CACHEFULL   | If there are no free slots left in the `Open Relation table`    |

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
#### Return Values
| Value     | Description                                                                                                              |
|-----------|--------------------------------------------------------------------------------------------------------------------------|
| SUCCESS   | Indicates successful closing of the relation                                                                             |
| E_NOTOPEN | If relation with the given name is not open                                                                              |
| E_INVALID | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to close either of the catalogs |

:::note Example
The following command will close the relation called `sample`:
```bash
CLOSE TABLE sample
```
:::

### CREATE INDEX
#### Description
This command is used to create an index on the given attribute of a relation. [B+ trees](https://nitcbase.github.io/design/Bplustreedetails.html) are used for creating indexes. Before executing this query, the relation must be opened using the `OPEN TABLE` command.
#### Syntax
```bash
CREATE INDEX ON tablename.attributename
```
#### Return Values
| Value          | Description                                                                                                              |
|----------------|--------------------------------------------------------------------------------------------------------------------------|
| SUCCESS        | Indicates successful creation of B+ tree Index                                                                           |
| E_RELNOTOPEN   | If the relation is not open                                                                                              |
| E_ATTRNOTEXIST | If the given attribute does not exist                                                                                    |
| E_DISKFULL     | If there is not enough space in the disk to create the tree                                                              |
| E_INVALID      | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to create an index for catalogs |

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
#### Return Values
| Value          | Description                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------|
| SUCCESS        | Indicates successful deletion of B+ tree index                                                                          |
| E_RELNOTOPEN   | If the relation is not open                                                                                             |
| E_ATTRNOTEXIST | If the given attribute does not exist                                                                                   |
| E_NOINDEX      | If index on the given attribute of the relation has not been created |
| E_INVALID      | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e when the user tries to create an index for catalogs |

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
#### Return Values
| Value         | Description                                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------------------------|
| SUCCESS       | Indicates successful renaming of the relation                                                                  |
| E_RELOPEN     | If the relation is open                                                                                         |
| E_RELNOTEXIST | If the relation that is to be renamed does not exist                                                            |
| E_RELEXIST    | If another relation already exists with the name new_tablename                                                  |
| E_INVALID     | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to rename the catalogs |

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
#### Return Values
| Value          | Description                                                                                                                       |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| SUCCESS        | Indicates successful renaming of the attribute of the relation                                                                    |
| E_RELOPEN      | If the relation is open                                                                                                           |
| E_RELNOTEXIST  | If the relation with name tablename does not exist                                                                                |
| E_ATTRNOTEXIST | If the attribute with name column_name does not exist                                                                             |
| E_ATTREXIST    | If the attribute with name new_column_name already exists                                                                         |
| E_INVALID      | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to rename the attributes of the catalogs |

:::note Example
The following command will rename the the attribute of an existing relation `sample`  from `CGPA` to `SGPA`:
```bash
ALTER TABLE RENAME sample COLUMN CGPA TO SGPA
```
:::