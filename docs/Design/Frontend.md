---
sidebar_position: 2
title: "Frontend Interface"
---

## Introduction

The RDBMS code must include a frontend code that interacts with the user and accepts user commands to the RDBMS. This frontend code needs to translate the Data Definition Language (DDL), Data Manipulation Language (DML) and script commands from the user to function calls at the lower layers.

The code for the frontend of NITCbase is divided into two sub-modules:

- **Frontend user interface**
- **Frontend programming interface**

The part of the frontend that interacts with the user directly is already implemented and is supplied to you along with the documentation for the project. This part is called the frontend user interface sub-module and its implementation can be found in the file `frontend-runner.cpp`.

_The frontend user interface translates each high level DDL and DML commands from the user to invocations of specific functions which are part of the second sub-module called front-end programming interface_. A C++ class file that contains the declarations of various functions of the frontend programming interface can be found in the file `Frontend.cpp`.

The code implementing the functions of the front end programming interface sub-module is **not** supplied as part of the documentation. Each function of this sub-module must be designed by the student to invoke lower layer functions of schema layer and algebra layer for meeting their functional requirements, and must return appropriate values to the front end user interface sub-module.

![FrontendExplanation](../../static/img/FrontendExplanation.svg)

## Frontend User Interface

The Frontend user interface sub-module supplied to you interacts with the user and translates the SQL-like queries given as input to a set of lower-layer function calls by extracting the arguments and calling the appropriate methods of the Frontend Class / Frontend Programming Interface sub-module.
Frontend User Interface supports the following types of commands:

1. [Data Definition Language(DDL) Commands ](../User%20Interface%20Commands/ddl.md)
2. [Data Manipulation Language(DML) Commands](../User%20Interface%20Commands/dml.md)
3. [Script Commands](../User%20Interface%20Commands/script-cmds.md)

All the above command documents are linked to various sections of the [NITCbase Commands page](../User%20Interface%20Commands).

Among the above commands, the script command `run` helps the user to execute a sequence of commands from a file - hence translating them into a sequence of calls to other commands supported by Frontend interface. The echo command simply echoes back the message typed in by the user back to the console. **The translation and execution of lower layer method calls corresponding to these script commands have already been implemented and provided to you**. Hence further documentation for Frontend Class focusses only on the specifications for DDL and DML commands.

## Frontend Programming Interface

Frontend programming interface sub-module is implemented as a C++ Class called `Frontend`. The code for the same is available in `Frontend.cpp` file. Methods of this class are invoked corresponding to each command given as input to the Frontend user interface sub-module.

### Frontend Class

The implementations for Frontend class methods are not provided. The specification for the same is given in this section, based on which you will have to do the implementation.

All the methods of frontend class are static and it has the following C++ declaration:

```cpp
class Frontend {
public:
    // Data Definition Language (DDL) Commands
    static int create_table(char relname[ATTR_SIZE],
                            int no_attrs,
                            char attributes[][ATTR_SIZE],
                            int type_attrs[]);

    static int drop_table(char relname[ATTR_SIZE]);

    static int open_table(char relname[ATTR_SIZE]);

    static int close_table(char relname[ATTR_SIZE]);

    static int create_index(char relname[ATTR_SIZE],
                            char attrname[ATTR_SIZE]);

    static int drop_index(char relname[ATTR_SIZE],
                          char attrname[ATTR_SIZE]);

    static int alter_table_rename(char relname_from[ATTR_SIZE],
                                  char relname_to[ATTR_SIZE]);

    static int alter_table_rename_column(char relname[ATTR_SIZE],
                                         char attrname_from[ATTR_SIZE],
                                         char attrname_to[ATTR_SIZE]);

    // Data Manipulation Language (DML) Commands
    static int insert_into_table_values(char relname[ATTR_SIZE],
                                        int attr_count, char attr_values[][ATTR_SIZE]);

    static int select_from_table(char relname_source[ATTR_SIZE],
                                 char relname_target[ATTR_SIZE]);

    static int select_attrlist_from_table(char relname_source[ATTR_SIZE],
                                          char relname_target[ATTR_SIZE],
                                          int attr_count,
                                          char attr_list[][ATTR_SIZE]);

    static int select_from_table_where(char relname_source[ATTR_SIZE],
                                       char relname_target[ATTR_SIZE],
                                       char attribute[ATTR_SIZE],
                                       int op,
                                       char value[ATTR_SIZE]);

    static int select_attrlist_from_table_where(char relname_source[ATTR_SIZE],
                                                char relname_target[ATTR_SIZE],
                                                int attr_count,
                                                char attr_list[][ATTR_SIZE],
                                                char attribute[ATTR_SIZE],
                                                int op,
                                                char value[ATTR_SIZE]);

    static int select_from_join_where(char relname_source_one[ATTR_SIZE],
                                      char relname_source_two[ATTR_SIZE],
                                      char relname_target[ATTR_SIZE],
                                      char join_attr_one[ATTR_SIZE],
                                      char join_attr_two[ATTR_SIZE]);

    static int select_attrlist_from_join_where(char relname_source_one[ATTR_SIZE],
                                               char relname_source_two[ATTR_SIZE],
                                               char relname_target[ATTR_SIZE],
                                               char join_attr_one[ATTR_SIZE],
                                               char join_attr_two[ATTR_SIZE],
                                               int attr_count,
                                               char attr_list[][ATTR_SIZE]);
};
```

The specifications for each method of this class is provided in the following sections.

:::note
Make sure to return the correct value from the methods, preferably sticking to the [global constants mentioned here](/constants).
:::

### Frontend :: create_table()

#### Description

- The `CREATE TABLE` command is translated to this method call.
- This method calls the appropriate methods from the lower layer (Schema Layer) to create a table with the arguments given below.

#### Arguments

| **Name**   | **Type**            | **Description**                                                        |
| ---------- | ------------------- | ---------------------------------------------------------------------- |
| relname    | `char[ATTR_SIZE]`   | Name of the relation/table to be created                               |
| no_attrs   | `int`               | Number of attributes of the relation to be created                     |
| attributes | `char[][ATTR_SIZE]` | Names of each attribute of the relation                                |
| type_attrs | `int[]`             | Data type of each attribute, in the same order as the attributes array |

#### Return Values

| **Value**                       | **Description**                                                |
| ------------------------------- | -------------------------------------------------------------- |
| [`SUCCESS`](/constants)         | On successful creation of the relation                         |
| [`E_RELEXIST`](/constants)      | If the relation with name relName already exists.              |
| [`E_DUPLICATEATTR`](/constants) | If two of any two of the given attributes have same name.      |
| [`E_DISKFULL`](/constants)      | If disk space is not sufficient for creating the new relation. |
| [E_MAXRELATIONS](/constants)    | If maximum number of relations possible already exists         |

#### Algorithm

```cpp
int Frontend::create_table(char relname[ATTR_SIZE],
                           int no_attrs,
                           char attributes[][ATTR_SIZE],
                           int type_attrs[]) {

    // Call createRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately

}
```

---

### Frontend :: drop_table()

#### Description

- The `DROP TABLE` command is translated to this method call.
- This method calls the appropriate methods from the lower layer (Schema Layer) to delete the table with the arguments given below and also returns the error values accordingly.

#### Arguments

| **Name** | **Type**          | **Description**                          |
| -------- | ----------------- | ---------------------------------------- |
| relname  | `char[ATTR_SIZE]` | Name of the relation/table to be deleted |

#### Return Values

| **Value**                      | **Description**                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful deletion of the relation.                                                                     |
| [`E_RELOPEN`](/constants)      | If the relation is open.                                                                                    |
| [`E_RELNOTEXIST`](/constants)  | If the relation does not exist                                                                              |
| [`E_NOTPERMITTED`](/constants) | If relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e., when the user tries to delete the catalogs. |

#### Algorithm

```cpp
int Frontend::drop_table(char relname[ATTR_SIZE]) {
    // Call deleteRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}
```

---

### Frontend :: open_table()

#### Description

- The `OPEN TABLE` command is translated to this method call.
- This method calls the appropriate methods from the lower layer (Schema Layer) to open the table with the arguments given below and also returns the error values accordingly.

#### Arguments

| **Name** | **Type**          | **Description**                         |
| -------- | ----------------- | --------------------------------------- |
| relname  | `char[ATTR_SIZE]` | Name of the relation/table to be opened |

#### Return Values

| **Value**                     | **Description**                                                |
| ----------------------------- | -------------------------------------------------------------- |
| [`SUCCESS`](/constants)       | On successful opening of the relation                          |
| [`E_RELNOTEXIST`](/constants) | If the relation with name `relName` does not exist in the disk |
| [`E_CACHEFULL`](/constants)   | If there are no free slots in the Open Relation table.         |

#### Algorithm

```cpp
int Frontend::open_table(char relname[ATTR_SIZE]) {
    // Call openRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}
```

---

### Frontend :: close_table()

#### Description

- The `CLOSE TABLE` command is translated to this method call.
- This method calls the appropriate methods from the lower layer (Schema Layer) to close the table with the arguments given below and also returns the error values accordingly.

#### Arguments

| **Name** | **Type**          | **Description**                         |
| -------- | ----------------- | --------------------------------------- |
| relname  | `char[ATTR_SIZE]` | Name of the relation/table to be opened |

#### Return Values

| **Value**                      | **Description**                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful closing of the relation                                                                                   |
| [`E_RELNOTOPEN`](/constants)   | If relation with given name is not open                                                                                 |
| [`E_NOTPERMITTED`](/constants) | If the relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e, when the user tries to close either of the catalogs. |

#### Algorithm

```cpp
int Frontend::close_table(char relname[ATTR_SIZE]) {
    // Call closeRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}
```

---

### Frontend :: create_index()

#### Description

- The `CREATE INDEX` command is translated to this method call.
- This method calls the appropriate methods from the lower layer (Schema Layer) to create index on the attribute of the relation given as argument and also returns the error values accordingly.
- [B+ trees](../Misc/B%2B%20Trees.md) are used for creating indexes. Before executing this query, the relation must be opened using the `OPEN TABLE` command.

#### Arguments

| **Name** | **Type**          | **Description**                                                     |
| -------- | ----------------- | ------------------------------------------------------------------- |
| relname  | `char[ATTR_SIZE]` | Name of the relation that contains the attribute to create index on |
| attrname | `char[ATTR_SIZE]` | Attribute to create index on                                        |

#### Return Values

| **Value**                      | **Description**                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful creation of B+ tree.                                                                                      |
| [`E_RELNOTOPEN`](/constants)   | If the relation is not open.                                                                                            |
| [`E_ATTRNOTEXIST`](/constants) | If the attribute with name attrName does not exist.                                                                     |
| [`E_DISKFULL`](/constants)     | If there is no enough space in the disk to create the tree                                                              |
| [`E_NOTPERMITTED`](/constants) | If the relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e, when the user tries to create an index for catalogs. |

#### Algorithm

```cpp
int create_index(char relname[ATTR_SIZE], char attrname[ATTR_SIZE]) {
    // Call createIndex() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}
```

---

### Frontend :: drop_index()

#### Description

- The `DROP INDEX` command is translated to this method call.
- This method calls the appropriate methods from the lower layer (Schema Layer) to drop index on the attribute of the relation given as argument and also returns the error values accordingly.

#### Arguments

| **Name** | **Type**          | **Description**                                                     |
| -------- | ----------------- | ------------------------------------------------------------------- |
| relname  | `char[ATTR_SIZE]` | Name of the relation that contains the attribute to remove index of |
| attrname | `char[ATTR_SIZE]` | Attribute to remove index of                                        |

#### Return Values

| **Value**                      | **Description**                                               |
| ------------------------------ | ------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful deletion of the B+ tree                         |
| [`E_RELNOTOPEN`](/constants)   | If the relation is not open.                                  |
| [`E_ATTRNOTEXIST`](/constants) | If the attribute with name attrName does not exist.           |
| [`E_NOINDEX`](/constants)      | If there is no index on the given attribute of the relation   |
| [`E_NOTPERMITTED`](/constants) | If the relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. |

#### Algorithm

```cpp
int drop_index(char relname[ATTR_SIZE], char attrname[ATTR_SIZE]) {
    // Call dropIndex() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}
```

---

### Frontend :: alter_table_rename()

#### Description

- The `ALTER TABLE RENAME` command is translated to this method call.
- This method calls the appropriate methods from the lower layer (Schema Layer) to rename the table and also returns the error values accordingly.

char relname_from[ATTR_SIZE], char relname_to[ATTR_SIZE]

#### Arguments

| **Name**     | **Type**          | **Description**                    |
| ------------ | ----------------- | ---------------------------------- |
| relname_from | `char[ATTR_SIZE]` | Name of the relation to be renamed |
| relname_to   | `char[ATTR_SIZE]` | New name of the relation           |

#### Return Values

| **Value**                      | **Description**                                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful renaming of the relation                                                                                                  |
| [`E_RELOPEN`](/constants)      | If the relation is open.                                                                                                                |
| [`E_RELNOTEXIST`](/constants)  | If the relation with name `relname_from` does not exist                                                                                 |
| [`E_RELEXIST`](/constants)     | If the relation with name `relname_to` already exists                                                                                   |
| [`E_NOTPERMITTED`](/constants) | If the relation to be renamed is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e, when the user tries to rename either of the catalogs. |

#### Algorithm

```cpp
int Frontend::alter_table_rename(char relname_from[ATTR_SIZE], char relname_to[ATTR_SIZE]) {
    // Call renameRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}
```

---

### Frontend :: alter_table_rename_column()

#### Description

- The `ALTER TABLE RENAME COLUMN` command is translated to this method call.
- This method calls the appropriate methods from the lower layer (Schema Layer) to rename the column of the table given as argument and also returns the error values accordingly.

#### Arguments

| **Name**      | **Type**          | **Description**                                             |
| ------------- | ----------------- | ----------------------------------------------------------- |
| relname       | `char[ATTR_SIZE]` | Name of the relation containing the attribute to be renamed |
| attrname_from | `char[ATTR_SIZE]` | Name of the attribute to be renamed                         |
| attrname_to   | `char[ATTR_SIZE]` | New name of the attribute                                   |

#### Return Values

| **Value**                      | **Description**                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful renaming of the attribute                                                                                                         |
| [`E_RELOPEN`](/constants)      | If the relation is open.                                                                                                                        |
| [`E_RELNOTEXIST`](/constants)  | If the relation with name relName does not exist                                                                                                |
| [`E_ATTRNOTEXIST`](/constants) | If the attribute with name `attrname_from` does not exist                                                                                       |
| [`E_ATTREXIST`](/constants)    | If the attribute with name `attrname_to` already exists                                                                                         |
| [`E_NOTPERMITTED`](/constants) | If the relName is either _"RELATIONCAT"_ or _"ATTRIBUTECAT"_. i.e, when the user tries to rename any attribute value of either of the catalogs. |

#### Algorithm

```cpp
int Frontend::alter_table_rename_column(char relname[ATTR_SIZE], char attrname_from[ATTR_SIZE],
                                        char attrname_to[ATTR_SIZE]) {
    // Call renameAttr() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}
```

---

### Frontend :: insert_into_table_values()

#### Description

- The `INSERT INTO TABLE VALUES` command is translated to this method call.
- This method inserts the given record into the specified Relation. This function inserts a record into the Relation, only if the Relation is opened.

#### Arguments

| **Name**    | **Type**                   | **Description**                                                                                                 |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| relname     | `char[ATTR_SIZE]`          | Name of the relation into which insert operation has to be performed                                            |
| attr_count  | `int`                      | Number of values in the record input by the user                                                                |
| attr_values | `attr_values[][ATTR_SIZE]` | An array of strings storing the values input by the user for the new record. The size is given by `attr_count`. |

#### Return Values

| **Value**                          | **Description**                                                                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)            | On successful insert of the given record into the relation                                                                 |
| [`E_RELNOTOPEN`](/constants)       | If the relation is not open.                                                                                               |
| [`E_NATTRMISMATCH`](/constants)    | If the actual number of attributes in the relation is different from the provided number of attributes                     |
| [`E_ATTRTYPEMISMATCH`](/constants) | If the actual type of the attribute in the relation is different from the type of provided attribute in the record.        |
| [`E_DISKFULL`](/constants)         | If disk space is not sufficient for inserting the record / index                                                           |
| [`E_NOTPERMITTED`](/constants)     | If relName is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e, when the user tries to insert a record into any of the catalogs |

#### Algorithm

```cpp
int Frontend::insert_into_table_values(char relname[ATTR_SIZE], int attr_count,
                                       char attr_values[][ATTR_SIZE]) {


    // Call insert() method of the Algebra Layer with correct arguments

    // Return Success or Error values appropriately

}
```

---

### Frontend :: select_from_table()

#### Description

- The `SELECT * FROM TABLE` command is translated to this method call.
- This command creates a new target relation with the same attributes as that of source relation,and inserts into it all records from the source relation

#### Arguments

| **Name**       | **Type**          | **Description**             |
| -------------- | ----------------- | --------------------------- |
| relname_source | `char[ATTR_SIZE]` | Name of the source relation |
| relname_target | `char[ATTR_SIZE]` | Name of the target relation |

#### Return Values

| **Value**                    | **Description**                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)      | On successful creation of new relation.                                                   |
| [`E_RELNOTOPEN`](/constants) | If the source relation is not open.                                                       |
| [`E_RELEXIST`](/constants)   | If a relation with name `relname_target` already exists.                                  |
| [`E_DISKFULL`](/constants)   | If disk space is not sufficient for creating the new relation.                            |
| [`E_CACHEFULL`](/constants)  | If target relation cannot be operated on due to lack of free slots in open relation table |

#### Algorithm

```cpp
int Frontend::select_from_table(char relname_source[ATTR_SIZE], char relname_target[ATTR_SIZE]) {

    // Call project() method of the Algebra Layer

    // Return Success or Error values appropriately

}
```

---

### Frontend :: select_attrlist_from_table()

#### Description

- The `SELECT Attrlist FROM TABLE` command is translated to this method call.
- This command creates a new target relation with the attributes specified in Attrlist,and inserts all records(only the values corresponding to the specified attributes) of the source relation, into the newly created target relation.

#### Arguments

| **Name**       | **Type**            | **Description**                                                                         |
| -------------- | ------------------- | --------------------------------------------------------------------------------------- |
| relname_source | `char[ATTR_SIZE]`   | Name of Source Relation                                                                 |
| relname_target | `char[ATTR_SIZE]`   | Name of the Target Relation                                                             |
| attr_count     | `int`               | Number of attributes that have to be projected from source relation to target relation. |
| attr_list      | `char[][ATTR_SIZE]` | Array of attributes that have to be projected from source relation to target relation.  |

#### Return Values

| **Value**                      | **Description**                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)        | On successful creation of new relation.                                                   |
| [`E_RELNOTOPEN`](/constants)   | If the source relation is not open.                                                       |
| [`E_RELEXIST`](/constants)     | If a relation with name `relname_target` already exists.                                  |
| [`E_ATTRNOTEXIST`](/constants) | If any attribute with name given in attribute name array does not exist.                  |
| [`E_DISKFULL`](/constants)     | If disk space is not sufficient for creating the new relation.                            |
| [`E_CACHEFULL`](/constants)    | If target relation cannot be operated on due to lack of free slots in open relation table |

#### Algorithm

```cpp
int Frontend::select_attrlist_from_table(char relname_source[ATTR_SIZE],
char relname_target[ATTR_SIZE],
int attr_count,
char attr_list[][ATTR_SIZE]) {


    // Call project() method of the Algebra Layer

    // Return Success or Error values appropriately

}
```

---

### Frontend :: select_from_table_where()

#### Description

- The `SELECT * FROM TABLE WHERE` command is translated to this method call.
- This command is used to retrieve all records of a given source relation, and insert them into a target relation, based on the the given condition. All records in the source relation that satisfy the condition, will be inserted into the newly created target relation.

#### Arguments

| **Name**       | **Type**          | **Description**                                                                                                                                                                                                                   |
| -------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| relname_source | `char[ATTR_SIZE]` | Name of Source Relation                                                                                                                                                                                                           |
| relname_target | `char[ATTR_SIZE]` | Name of the Target Relation                                                                                                                                                                                                       |
| attribute      | `char[ATTR_SIZE]` | Attribute/column name to which 'select' condition need to be checked with.                                                                                                                                                        |
| op             | `int`             | The conditional operator (which can be one among `EQ`, `LE`, `LT`, `GE`, `GT`, `NE` corresponding to the following operators: _equal to, less than or equal to, less than, greater than or equal to, greater than, not equal to_) |
| value          | `char[ATTR_SIZE]` | value of attribute                                                                                                                                                                                                                |

#### Return Values

| **Value**                          | **Description**                                                                                       |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)            | On successful creation of new relation.                                                               |
| [`E_RELNOTOPEN`](/constants)       | If the source relation is not open.                                                                   |
| [`E_RELEXIST`](/constants)         | If a relation with name `relname_target` already exists.                                              |
| [`E_ATTRNOTEXIST`](/constants)     | If a attribute with name `attribute` does not exist.                                                  |
| [`E_ATTRTYPEMISMATCH`](/constants) | If the actual type of the attribute in the relation is different from the type of provided attribute. |
| [`E_CACHEFULL`](/constants)        | If target relation cannot be operated on due to lack of free slots in open relation table             |
| [`E_DISKFULL`](/constants)         | If disk space is not sufficient for creating the new relation.                                        |

#### Algorithm

```cpp
int Frontend::select_from_table_where(char relname_source[ATTR_SIZE],
char relname_target[ATTR_SIZE],
char attribute[ATTR_SIZE], int op, char value[ATTR_SIZE]) {

    // Call select() method of the Algebra Layer with correct arguments

    // Return Success or Error values appropriately

}
```

---

### Frontend :: select_attrlist_from_table_where()

#### Description

- The `SELECT Attrlist FROM TABLE WHERE` command is translated to this method call.
- This command creates a new target relation with the attributes specified in Attrlist ,and inserts those records(only the values corresponding to the attributes specified in the Attrlist) from the source relation which satisfy the given condition.

#### Arguments

| **Name**       | **Type**            | **Description**                                                                                                                                                  |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| relname_source | `char[ATTR_SIZE]`   | Name of Source Relation                                                                                                                                          |
| relname_target | `char[ATTR_SIZE]`   | Name of the Target Relation                                                                                                                                      |
| attr_count     | `int`               | Number of attributes that have to be projected from source relation to target relation.                                                                          |
| attr_list      | `char[][ATTR_SIZE]` | Array of attributes that have to be projected from source relation to target relation.                                                                           |
| attribute      | `char[ATTR_SIZE]`   | Attribute/column name to which 'select' condition need to be checked with.                                                                                       |
| op             | `int`               | Conditional Operator(can be one among EQ,LE,LT,GE,GT,NE corresponding to equal,lesthan equal, lessthan ,greaterthan equal, greaterthan, Not equal respectively). |
| value          | `char[ATTR_SIZE]`   | value of attribute                                                                                                                                               |

#### Return Values

| **Value**                          | **Description**                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)            | Indicating successful selection into the new target relation relation.                                                |
| [`E_RELNOTOPEN`](/constants)       | If the source relation is not open                                                                                    |
| [`E_RELEXIST`](/constants)         | If a relation with name `relname_target` already exists                                                               |
| [`E_ATTRNOTEXIST`](/constants)     | If any attribute with name given in attribute name array does not exist or attribute in the condition does not exist. |
| [`E_ATTRTYPEMISMATCH`](/constants) | If the actual type of the attribute in the relation is different from the type of provided attribute                  |
| [`E_CACHEFULL`](/constants)        | If target relation cannot be operated on due to lack of free slots in open relation table                             |
| [`E_DISKFULL`](/constants)         | If disk space is not sufficient for creating the new relation                                                         |

#### Algorithm

```cpp
int Frontend::select_attrlist_from_table_where(
    char relname_source[ATTR_SIZE], char relname_target[ATTR_SIZE],
    int attr_count, char attr_list[][ATTR_SIZE],
    char attribute[ATTR_SIZE], int op, char value[ATTR_SIZE]) {


    // Call select() method of the Algebra Layer with correct arguments to
    // create a temporary target relation with name ".temp" (use constant TEMP)

    // TEMP results from the select operation on the source relation (and hence
    // it contains all attributes of the source relations)

    // Return Error values, if not successful

    // Open the TEMP relation using OpenRelTable::openRel()
    // if open fails, delete TEMP relation using Schema::deleteRel() and
    // return the error code

    // Call project() method of the Algebra Layer with correct arguments to
    // create the actual target relation from the TEMP relation. The final
    // target relation contains only those attributes mentioned in attr_list

    // close the TEMP relation using OpenRelTable::closeRel()
    // delete the TEMP relation using Schema::deleteRel()

    // Return Success or Error values appropriately
}
```

---

### Frontend :: select_from_join_where()

#### Description

- The `SELECT * FROM JOIN WHERE` command is translated to this method call.
- This command creates a new target relation with attributes constituting from both the source relations(excluding specified attribute from 2nd src relation).It inserts the records obtained by equi-join of both the source relations(an attribute from each relation specified in arguments are used for equi-join) into the target relation.

Note that attribute1 should belong to source_relation1 and attribute2 should belong to source_relation2.

#### Arguments

| **Name**           | **Type**          | **Description**                                    |
| ------------------ | ----------------- | -------------------------------------------------- |
| relname_source_one | `char[ATTR_SIZE]` | Name of 1st Source Relation.                       |
| relname_source_two | `char[ATTR_SIZE]` | Name of 2nd Source Relation.                       |
| targetrel          | `char[ATTR_SIZE]` | Name of the target Relation                        |
| join_attr_one      | `char[ATTR_SIZE]` | Join attribute/column name in 1st Source Relation. |
| join_attr_two      | `char[ATTR_SIZE]` | Join attribute/column name in 2nd Source Relation. |

#### Return Values

| **Value**                          | **Description**                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)            | On successful creation of new relation.                                                                               |
| [`E_RELNOTOPEN`](/constants)       | If any of the source relations is not open.                                                                           |
| [`E_RELEXIST`](/constants)         | If a relation with name `targetRel` already exists.                                                                   |
| [`E_ATTRNOTEXIST`](/constants)     | If an attribute with name attr1 in srcrel1 or attr2 in srcrel2 does not exist.                                        |
| [`E_DISKFULL`](/constants)         | If disk space is not sufficient for creating the new relation.                                                        |
| [`E_ATTRTYPEMISMATCH`](/constants) | If the actual type of any of the attributes in the source relations is different from the type of provided attribute. |
| [`E_DUPLICATEATTR`](/constants)    | If there are duplicate attribute names between srcrel1 and srcrel2 aside from the join attributes.                    |
| [`E_CACHEFULL`](/constants)        | If target relation cannot be operated on due to lack of free slots in open relation table                             |

#### Algorithm

```cpp
int Frontend::select_from_join_where(char relname_source_one[ATTR_SIZE],
char relname_source_two[ATTR_SIZE], char relname_target[ATTR_SIZE],
char join_attr_one[ATTR_SIZE], char join_attr_two[ATTR_SIZE]) {

    // Call join() method of the Algebra Layer with correct arguments

    // Return Success or Error values appropriately

}
```

---

### Frontend :: select_attrlist_from_join_where()

#### Description

- The `SELECT Attrlist FROM JOIN WHERE` command is translated to this method call.
- This command creates a new target relation with attributes given in Attrlist.It inserts the records(only the values of the specified attributes in Attrlist obtained by equi-join of both the source relations(an attribute from each relation specified in arguments are used for equi-join) into the target relation.

Note that attribute1 should belong to source_relation1 and attribute2 should belong to source_relation2.

#### Arguments

| **Name**           | **Type**            | **Description**                                                                                               |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| relname_source_one | `char[ATTR_SIZE]`   | Name of 1st Source Relation.                                                                                  |
| relname_source_two | `char[ATTR_SIZE]`   | Name of 2nd Source Relation.                                                                                  |
| targetrel          | `char[ATTR_SIZE]`   | Name of the target Relation                                                                                   |
| join_attr_one      | `char[ATTR_SIZE]`   | Join attribute/column name in 1st Source Relation.                                                            |
| join_attr_two      | `char[ATTR_SIZE]`   | Join attribute/column name in 2nd Source Relation.                                                            |
| attr_count         | `int`               | Number of attributes that have to be projected from source relations to target relation                       |
| attr_list          | `char[][ATTR_SIZE]` | Array of attributes across both relations that have to be projected from source relations to target relation. |

#### Return Values

| **Value**                          | **Description**                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`SUCCESS`](/constants)            | Indicating successful selection into the new target relation relation resulting from join.                            |
| [`E_RELNOTOPEN`](/constants)       | If the source relation is not open                                                                                    |
| [`E_RELEXIST`](/constants)         | If a relation with name target_relation already exists                                                                |
| [`E_ATTRNOTEXIST`](/constants)     | If attribute1 or attribute2 does not exist                                                                            |
| [`E_ATTRTYPEMISMATCH`](/constants) | If the actual type of any of the attributes in the source relations is different from the type of provided attribute. |
| [`E_DUPLICATEATTR`](/constants)    | If one or more pairs of attributes(other than join attributes) in the source relations have the same name             |
| [`E_CACHEFULL`](/constants)        | If target relation cannot be operated on due to lack of free slots in open relation table                             |
| [`E_DISKFULL`](/constants)         | If disk space is not sufficient for creating the new relation                                                         |

#### Algorithm

```cpp
int Frontend::select_attrlist_from_join_where(
    char relname_source_one[ATTR_SIZE], char relname_source_two[ATTR_SIZE],
    char relname_target[ATTR_SIZE], char join_attr_one[ATTR_SIZE],
    char join_attr_two[ATTR_SIZE], int attr_count, char attr_list[][ATTR_SIZE]) {

    // Call join() method of the Algebra Layer with correct arguments to
    // create a temporary target relation with name TEMP.

    // TEMP results from the join of the two source relation (and hence it
    // contains all attributes of the source relations except the join attribute
    // of the second source relation)

    // Return Error values, if not successful

    // Open the TEMP relation using OpenRelTable::openRel()
    // if open fails, delete TEMP relation using Schema::deleteRel() and
    // return the error code

    // Call project() method of the Algebra Layer with correct arguments to
    // create the actual target relation from the TEMP relation.
    // (The final target relation contains only those attributes mentioned in attr_list)

    // close the TEMP relation using OpenRelTable::closeRel()
    // delete the TEMP relation using Schema::deleteRel()

    // Return Success or Error values appropriately
}
```
