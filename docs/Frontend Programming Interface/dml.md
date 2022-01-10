---
sidebar_position: 4
title: 'Data Manipulation Language Commands'
tags:
  - Data 
  - Manipulation
  - Commands
  - frontend
  - interface
---

The Data Manipulation Language commands are used to manipulate the data stored in the relations of the database. The following are the DML commands supported by NITCBase:

## Frontend :: insert_into_table_values()
#### Description
* The `INSERT INTO TABLE VALUES` command is translated to this method call.
* This method inserts the given record into the specified Relation. This function inserts a record into the Relation, only if the Relation is opened.

#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation into which insert operation has to be performed                               |
| attr_values   | `vector<string>`                       | Vector of type string, whose each string contains value of the corresponding attribute                     |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS            | Indicating successful insertion of the record                                                                       |
| E_RELNOTOPEN       | If the relation is not open                                                                                         |
| E_NATTRMISMATCH    | If the actual number of attributes in the relation is different from the provided number of attributes              |
| E_ATTRTYPEMISMATCH | If the actual type of the attribute in the relation is different from the type of provided attribute in the record. |
| E_DISKFULL         | If disk space is not sufficient for inserting the record / index                                                    |
#### Algorithm
```cpp
int Frontend::insert_into_table_values(char relname[ATTR_SIZE], 
  vector<string> attr_values) {


    // TODO: Call insert() method of the Algebra Layer with correct arguments

    // TODO: Return Success or Error values appropriately
    
}
```

## Frontend :: insert_into_table_from_file()
#### Description
* The `INSERT INTO TABLE FROM FILE` command is translated to this method call.
* This method is used to insert multiple records into the relation from a csv file containing the values for the corresponding attributes. The order of values in the csv file must be the same as the attributes of the relation. Each line in the csv file corresponds to a record to be inserted in to the relation.
#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation into which insert operation has to be performed                               |
| attr_values   | `vector<string>`                       | Vector of type string, whose each string contains value of the corresponding attribute                     |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS           | Indicating successful insertion of all records in the file |
| E_RELNOTOPEN      | If the relation is not open                                |
| E_FILEFORMATERROR | If the CSV file is not in the correct format               |
#### Algorithm
```cpp
int Frontend::insert_into_table_from_file(char relname[ATTR_SIZE], char filepath[ATTR_SIZE]) {

    // TODO: Call insert() method of the Algebra Layer with correct arguments

    // TODO: Return Success or Error values appropriately
    
}
```

## Frontend :: select_from_table()
#### Description
* The `SELECT * FROM TABLE` command is translated to this method call.
* This command creates a new target relation with the same attributes as that of source relation,and inserts into it all records from the source relation
#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname    | `char[ATTR_SIZE]`           | Name of the relation into which insert operation has to be performed                               |
| attr_values   | `vector<string>`                       | Vector of type string, whose each string contains value of the corresponding attribute                     |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS      | Indicating successful selection into the new target relation relation.                                                                 |
| E_RELNOTOPEN | If the source relation is not open                                                                                                     |
| E_RELEXIST   | If a relation with name targetrel already exists                                                                                       |
| E_CACHEFULL  | If the `openRel()` fails because of no free slots in open relation table                                                               |
| E_DISKFULL   | If disk space is not sufficient for creating the new relation                                                                          |
| E_INVALID    | If the target relation is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e., when the user tries to select records into any of the catalogs |
#### Algorithm
```cpp
int Frontend::select_from_table(char relname_source[ATTR_SIZE], char relname_target[ATTR_SIZE]) {

    // TODO: Call insert() method of the Algebra Layer with correct arguments

    // TODO: Return Success or Error values appropriately
    
}
```

## Frontend :: select_attrlist_from_table()
#### Description
* The `SELECT Attrlist FROM TABLE` command is translated to this method call.
* This command creates a new target relation with the attributes specified in Attrlist,and inserts all records(only the values corresponding to the specified attributes) of the source relation, into the newly created target relation.
#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname_source    | `char[ATTR_SIZE]`           | Name of Source Relation  |
| relname_target    | `char[ATTR_SIZE]`           | Name of the Target Relation  |
| attr_count | `int`    | No. of attributes that have to be projected from source relation to target relation.  |
| attr_list    | `char[][ATTR_SIZE]`           | Pointer to attribute names array, (array of attributes that have to be projected from source relation to target relation.) |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS            | Indicating successful selection into the new target relation relation.                                                                 |
| E_RELNOTOPEN       | If the source relation is not open                                                                                                    |
| E_RELEXIST         | If a relation with name targetrel already exists                                                                                      |
| E_ATTRNOTEXIST     | If any of the attributes in Attrlist does not exist                                                                                   |
| E_CACHEFULL        | If the `openRel()` fails because of no free slots in open relation table                                                                |
| E_DISKFULL         | If disk space is not sufficient for creating the new relation                                                                         |
| E_INVALID          | If the target relation is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e., when the user tries to select records into any of the catalogs|
#### Algorithm
```cpp
int Frontend::select_attrlist_from_table(char relname_source[ATTR_SIZE], 
char relname_target[ATTR_SIZE],
int attr_count, 
char attr_list[attr_count][ATTR_SIZE]) {


    // TODO: Call project() method of the Algebra Layer with correct arguments

    // TODO: Return Success or Error values appropriately
    
}
```

## Frontend :: select_from_table_where()
#### Description
* The `SELECT * FROM TABLE WHERE` command is translated to this method call.
* This command is used to retrieve all records of a given source relation, and insert them into a target relation, based on the the given condition. All records in the source relation that satisfy the condition, will be inserted into the newly created target relation.
#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname_source    | `char[ATTR_SIZE]`           | Name of Source Relation  |
| relname_target    | `char[ATTR_SIZE]`           | Name of the Target Relation  |
| attribute   | `char[ATTR_SIZE]`    | Attribute/column name to which 'select' condition need to be checked with.  |
| op | `int`    | Conditional Operator(can be one among EQ,LE,LT,GE,GT,NE corresponding to equal,lesthan equal, lessthan ,greaterthan equal, greaterthan, Not equal respectively).  |
| value    | `char[ATTR_SIZE]`           | value of attribute |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS            | Indicating successful selection into the new target relation relation.                                                                 |
| E_RELNOTOPEN       | If the source relation is not open                                                                                                   |
| E_RELEXIST         | If a relation with name targetrel already exists                                                                                     |
| E_ATTRNOTEXIST     | If the attribute given by attrnamedoes not exist                                                                                     |
| E_ATTRTYPEMISMATCH | If the actual type of the attribute in the relation is different from the type of provided attribute                                 |
| E_CACHEFULL        | If the `openRel()` fails because of no free slots in open relation table                                                               |
| E_DISKFULL         | If disk space is not sufficient for creating the new relation                                                                        |
| E_INVALID          | If the target relation is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e., when the user tries to select records into any of the catalogs |
#### Algorithm
```cpp
int Frontend::select_from_table_where(char relname_source[ATTR_SIZE], 
char relname_target[ATTR_SIZE], 
char attribute[ATTR_SIZE], int op, char value[ATTR_SIZE]) {


    // TODO: Call select() method of the Algebra Layer with correct arguments

    // TODO: Return Success or Error values appropriately
    
}
```

## Frontend :: select_attrlist_from_table_where()
#### Description
* The `SELECT Attrlist FROM TABLE WHERE` command is translated to this method call.
* This command creates a new target relation with the attributes specified in Attrlist ,and inserts those records(only the values corresponding to the attributes specified in the Attrlist) from the source relation which satisfy the given condition.
#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname_source    | `char[ATTR_SIZE]`           | Name of Source Relation  |
| relname_target    | `char[ATTR_SIZE]`           | Name of the Target Relation  |
| attribute   | `char[ATTR_SIZE]`    | Attribute/column name to which 'select' condition need to be checked with.  |
| op | `int`    | Conditional Operator(can be one among EQ,LE,LT,GE,GT,NE corresponding to equal,lesthan equal, lessthan ,greaterthan equal, greaterthan, Not equal respectively).  |
| value    | `char[ATTR_SIZE]`           | value of attribute |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS            | Indicating successful selection into the new target relation relation.                                                                 |
| E_RELNOTOPEN       | If the source relation is not open                                                                                                   |
| E_RELEXIST         | If a relation with name targetrel already exists                                                                                     |
| E_ATTRNOTEXIST     | If the attribute given by attrnamedoes not exist                                                                                     |
| E_ATTRTYPEMISMATCH | If the actual type of the attribute in the relation is different from the type of provided attribute                                 |
| E_CACHEFULL        | If the `openRel()` fails because of no free slots in open relation table                                                               |
| E_DISKFULL         | If disk space is not sufficient for creating the new relation                                                                        |
| E_INVALID          | If the target relation is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e., when the user tries to select records into any of the catalogs |
#### Algorithm
```cpp
nt Frontend::select_attrlist_from_table_where(
    char relname_source[ATTR_SIZE], char relname_target[ATTR_SIZE],
    int attr_count, char attr_list[attr_count][ATTR_SIZE], 
    char attribute[ATTR_SIZE], int op, char value[ATTR_SIZE]) {


    // TODO: Step 1- Call select() method of the Algebra Layer with correct arguments to create a temporary target relation with name "temp". 
    // "temp" results from the select operation on the source relation (and hence it contains all attributes of the source relations)
    
    // TODO: Return Error values, if not successful
    
    // TODO: Step 2- Call project() method of the Algebra Layer with correct arguments to create the actual target relation from the "temp" relation.
    // The final target relation contains only those attributes mentioned in attr_list)
    
    // TODO: Return Success or Error values appropriately
}
```

## Frontend :: select_from_join_where()
#### Description
* The `SELECT * FROM JOIN WHERE` command is translated to this method call.
* This command creates a new target relation with attributes constituting from both the source relations(excluding specified attribute from 2nd src relation).It inserts the records obtained by equi-join of both the source relations(an attribute from each relation specified in arguments are used for equi-join) into the target relation.

Note that attribute1 should belong to source_relation1 and attribute2 should belong to source_relation2.

#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname_source_one    | `char[ATTR_SIZE]`           | Name of 1st Source Relation. |
| relname_source_two    | `char[ATTR_SIZE]`           | Name of 2nd Source Relation. |
| targetrel    | `char[ATTR_SIZE]`           | Name of the target Relation |
| join_attr_one   | `char[ATTR_SIZE]`        | Join attribute/column name in 1st Source Relation.  |
| join_attr_two   | `char[ATTR_SIZE]`        | Join attribute/column name in 2nd Source Relation.  |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS            | Indicating successful selection into the new target relation relation resulting from join.                                                                 |
| E_RELNOTOPEN       | If the source relation is not open                                                                                    |
| E_RELEXIST         | If a relation with name target_relation already exists                                                                |
| E_ATTRNOTEXIST     | If attribute1 or attribute2does not exist                                                                             |
| E_ATTRTYPEMISMATCH | If the actual type of any of the attributes in the source relations is different from the type of provided attribute. |
| E_DUPLICATEATTR | If one or more pairs of attributes(other than join attributes) in the source relations have the same name |
| E_CACHEFULL        | If the `openRel()` fails because of no free slots in open relation table                                              |
| E_DISKFULL         | If disk space is not sufficient for creating the new relation                                                         |
| E_INVALID          | If the target relation is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e., when the user tries to select records into any of the catalogs |
#### Algorithm
```cpp
int Frontend::select_from_join_where(char relname_source_one[ATTR_SIZE], 
char relname_source_two[ATTR_SIZE], char relname_target[ATTR_SIZE], 
char join_attr_one[ATTR_SIZE], char join_attr_two[ATTR_SIZE]) {


    // TODO: Call join() method of the Algebra Layer with correct arguments

    // TODO: Return Success or Error values appropriately
    
}
```

## Frontend :: select_attrlist_from_join_where()
#### Description
* The `SELECT Attrlist FROM JOIN WHERE` command is translated to this method call.
* This command creates a new target relation with attributes given in Attrlist.It inserts the records(only the values of the specified attributes in Attrlist obtained by equi-join of both the source relations(an attribute from each relation specified in arguments are used for equi-join) into the target relation.

Note that attribute1 should belong to source_relation1 and attribute2 should belong to source_relation2.

#### Arguments
| Attribute  | Type                        | Description                                                            |
|------------|-----------------------------|------------------------------------------------------------------------|
| relname_source_one    | `char[ATTR_SIZE]`           | Name of 1st Source Relation. |
| relname_source_two    | `char[ATTR_SIZE]`           | Name of 2nd Source Relation. |
| targetrel    | `char[ATTR_SIZE]`           | Name of the target Relation |
| join_attr_one   | `char[ATTR_SIZE]`        | Join attribute/column name in 1st Source Relation.  |
| join_attr_two   | `char[ATTR_SIZE]`        | Join attribute/column name in 2nd Source Relation.  |

#### Return Values
| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| SUCCESS            | Indicating successful selection into the new target relation relation resulting from join.                                                                 |
| E_RELNOTOPEN       | If the source relation is not open                                                                                    |
| E_RELEXIST         | If a relation with name target_relation already exists                                                                |
| E_ATTRNOTEXIST     | If attribute1 or attribute2does not exist                                                                             |
| E_ATTRTYPEMISMATCH | If the actual type of any of the attributes in the source relations is different from the type of provided attribute. |
| E_DUPLICATEATTR | If one or more pairs of attributes(other than join attributes) in the source relations have the same name |
| E_CACHEFULL        | If the `openRel()` fails because of no free slots in open relation table                                              |
| E_DISKFULL         | If disk space is not sufficient for creating the new relation                                                         |
| E_INVALID          | If the target relation is either `RELATIONCAT` or `ATTRIBUTECAT`. i.e., when the user tries to select records into any of the catalogs |
#### Algorithm
```cpp
int Frontend::select_attrlist_from_join_where(
    char relname_source_one[ATTR_SIZE], char relname_source_two[ATTR_SIZE],
    char relname_target[ATTR_SIZE], char join_attr_one[ATTR_SIZE], 
    char join_attr_two[ATTR_SIZE], int attr_count, char attr_list[attr_count][ATTR_SIZE]) {

    // TODO: Step 1- Call join() method of the Algebra Layer with correct arguments to create a temporary target relation with name "temp". 
    // "temp" results from the join of the two source relation (and hence it contains all attributes of the source relations except the join attribute of the second source relation)
    
    // TODO: Return Error values, if not successful
    
    // TODO: Step 2- Call project() method of the Algebra Layer with correct arguments to create the actual target relation from the "temp" relation.
    // The final target relation contains only those attributes mentioned in attr_list)

    // TODO: Return Success or Error values appropriately
}
```