---
sidebar_position: 5
title: 'Data Manipulation Language Commands'
tags:
  - Data 
  - Manipulation
  - Commands
  - xfs
  - interface
---

The Data Manipulation Language(DML) commands are used to manipulate the data stored in the relations of the database. DML Commands are supported by both XFS Interface and Frontend Interface. The following are the DML commands supported by NITCBase:

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
* The CSV file from which the values are to be inserted, must be stored in the path `$HOME/NITCBase/Files/`.
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