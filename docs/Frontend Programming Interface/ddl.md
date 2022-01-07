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

The specifications for DDL methods of the Frontend Class is given below. 
Make sure to return the correct value from the methods, preferably sticking to the [global constants mentioned here](https://nitcbase.github.io/constants.html). 

### Frontend :: create_table()
#### Description
* The `CREATE TABLE` command is translated to this method call. 
* This method calls the appropriate methods from the lower layer (Schema Layer) to create a table with the arguments given below.
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

    // TODO: Return Success and Error values appropriately
    
}
```

### Frontend :: drop_table()
#### Description
* The `DROP TABLE` command is translated to this method call.
* This method calls the appropriate methods from the lower layer (Schema Layer) to delete the table with the arguments given below and also returns the error values accordingly.
  
#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation/table to be deleted                               |

#### Return Values
| Value         | Description                                             |
|---------------|---------------------------------------------------------|
| SUCCESS       | Indicates successful deletion of the relation           |
| E_RELOPEN     | If the relation is open (SUBJECT TO CHANGE)             |
| E_RELNOTEXIST | If the relation with the given name does not exist      |
| E_INVALID     | If the relation name is `RELATIONCAT` or `ATTRIBUTECAT` |

#### Algorithm
```cpp
int Frontend::drop_table(char relname[ATTR_SIZE]) {
    // TODO: Call deleteRel() method of the Schema Layer with correct arguments
    
    // TODO: Return Success and Error values appropriately
}
```

### Frontend :: open_table()
#### Description
* The `OPEN TABLE` command is translated to this method call.
* This method calls the appropriate methods from the lower layer (Schema Layer) to open the table with the arguments given below and also returns the error values accordingly.

#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation/table to be opened                                |

#### Return Values
| Value         | Description                                                     |
|---------------|-----------------------------------------------------------------|
| relId         | relId is returned upon succesful opening of the relation        |
| E_RELNOTEXIST | If the relation with the given name does not exist              |
| E_CACHEFULL   | If there are no free slots left in the `Open Relation table`    |

#### Algorithm
```cpp
int Frontend::open_table(char relname[ATTR_SIZE]) {
    // TODO: Call openRel() method of the Schema Layer with correct arguments
    
    // TODO: Return Success and Error values appropriately
}
```

### Frontend :: close_table()
#### Description
* The `CLOSE TABLE` command is translated to this method call.
* This method calls the appropriate methods from the lower layer (Schema Layer) to close the table with the arguments given below and also returns the error values accordingly.
#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation/table to be opened                                |

#### Return Values
| Value     | Description                                                                                                              |
|-----------|--------------------------------------------------------------------------------------------------------------------------|
| SUCCESS   | Indicates successful closing of the relation                                                                             |
| E_NOTOPEN | If relation with the given name is not open                                                                              |
| E_INVALID | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to close either of the catalogs |

#### Algorithm
```cpp
int Frontend::close_table(char relname[ATTR_SIZE]) {
    // TODO: Call closeRel() method of the Schema Layer with correct arguments
    
    // TODO: Return Success and Error values appropriately
}
```

### Frontend :: create_index()
#### Description
* The `CREATE INDEX` command is translated to this method call.
* This method calls the appropriate methods from the lower layer (Schema Layer) to create index on the attribute of the relation given as argument and also returns the error values accordingly.
* [B+ trees](https://nitcbase.github.io/design/Bplustreedetails.html) are used for creating indexes. Before executing this query, the relation must be opened using the `OPEN TABLE` command.

#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation that contains the attribute to create index on    |
| attrname   | `char[ATTR_SIZE]`           | Attribute to create index on                                           |

#### Return Values
| Value          | Description                                                                                                              |
|----------------|--------------------------------------------------------------------------------------------------------------------------|
| SUCCESS        | Indicates successful creation of B+ tree Index                                                                           |
| E_RELNOTOPEN   | If the relation is not open                                                                                              |
| E_ATTRNOTEXIST | If the given attribute does not exist                                                                                    |
| E_DISKFULL     | If there is not enough space in the disk to create the tree                                                              |
| E_INVALID      | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to create an index for catalogs |

#### Algorithm
```cpp
int create_index(char relname[ATTR_SIZE], char attrname[ATTR_SIZE]) {
    // TODO: Call createInd() method of the Schema Layer with correct arguments
    
    // TODO: Return Success and Error values appropriately
}
```
### Frontend :: drop_index()
#### Description
* The `DROP INDEX` command is translated to this method call.
* This method calls the appropriate methods from the lower layer (Schema Layer) to drop index on the attribute of the relation given as argument and also returns the error values accordingly.
#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation that remove the attribute to create index on      |
| attrname   | `char[ATTR_SIZE]`           | Attribute to create index on                                           |
#### Return Values
| Value          | Description                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------|
| SUCCESS        | Indicates successful deletion of B+ tree index                                                                          |
| E_RELNOTOPEN   | If the relation is not open                                                                                             |
| E_ATTRNOTEXIST | If the given attribute does not exist                                                                                   |
| E_NOINDEX      | If index on the given attribute of the relation has not been created |
| E_INVALID      | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e when the user tries to create an index for catalogs |
#### Algorithm
```cpp
int drop_index(char relname[ATTR_SIZE], char attrname[ATTR_SIZE]) {
    // TODO: Call deleteRel() method of the Schema Layer with correct arguments
    
    // TODO: Return Success and Error values appropriately
}
```
### Frontend :: alter_table_rename()
#### Description
* The `ALTER TABLE RENAME` command is translated to this method call.
* This method calls the appropriate methods from the lower layer (Schema Layer) to rename the table and also returns the error values accordingly.


char relname_from[ATTR_SIZE], char relname_to[ATTR_SIZE]
#### Arguments
| Attribute       | Type                        | Description                                                            |
|-----------------|-----------------------------|------------------------------------------------------------------------|
| relname_from    | `char[ATTR_SIZE]`           | Name of the relation to be renamed      |
| relname_to      | `char[ATTR_SIZE]`           | New name of the relation                                        |

#### Return Values
| Value         | Description                                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------------------------|
| SUCCESS       | Indicates successful renaming of the relation                                                                  |
| E_RELOPEN     | If the relation is open                                                                                         |
| E_RELNOTEXIST | If the relation that is to be renamed does not exist                                                            |
| E_RELEXIST    | If another relation already exists with the name new_tablename                                                  |
| E_INVALID     | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to rename the catalogs |

#### Algorithm
```cpp
int Frontend::alter_table_rename(char relname_from[ATTR_SIZE], char relname_to[ATTR_SIZE]) {
    // TODO: Call renameRel() method of the Schema Layer with correct arguments
    
    // TODO: Return Success and Error values appropriately
}
```
### Frontend :: alter_table_rename_column()
#### Description
* The `ALTER TABLE RENAME COLUMN` command is translated to this method call.
* This method calls the appropriate methods from the lower layer (Schema Layer) to rename the column of the table given as argument and also returns the error values accordingly.
#### Arguments
| Attribute       | Type                        | Description                                                            |
|-----------------|-----------------------------|------------------------------------------------------------------------|
| relname         | `char[ATTR_SIZE]`           | Name of the relation containing the attribute to be renamed            |
| attrname_from   | `char[ATTR_SIZE]`           | Name of the attribute to be renamed                                    |
| attrname_to     | `char[ATTR_SIZE]`           | New name of the attribute                                              |
#### Return Values
| Value          | Description                                                                                                                       |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| SUCCESS        | Indicates successful renaming of the attribute of the relation                                                                    |
| E_RELOPEN      | If the relation is open                                                                                                           |
| E_RELNOTEXIST  | If the relation with name tablename does not exist                                                                                |
| E_ATTRNOTEXIST | If the attribute with name column_name does not exist                                                                             |
| E_ATTREXIST    | If the attribute with name new_column_name already exists                                                                         |
| E_INVALID      | If the relation name is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to rename the attributes of the catalogs |
#### Algorithm
```cpp
int Frontend::alter_table_rename_column(char relname[ATTR_SIZE], char attrname_from[ATTR_SIZE],
                                        char attrname_to[ATTR_SIZE]) {
    // TODO: Call renameAttr() method of the Schema Layer with correct arguments
    
    // TODO: Return Success and Error values appropriately
}
```