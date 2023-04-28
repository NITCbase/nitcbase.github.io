---
sidebar_position: 1
title: Frontend Programming Interface
---

# Frontend Programming Interface Stub Code

## Frontend.cpp

```cpp
int Frontend::create_table(char relname[ATTR_SIZE],
                           int no_attrs,
                           char attributes[][ATTR_SIZE],
                           int type_attrs[]) {

    // Call createRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}


int Frontend::drop_table(char relname[ATTR_SIZE]) {
    // Call deleteRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}


int Frontend::open_table(char relname[ATTR_SIZE]) {
    // Call openRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}


int Frontend::close_table(char relname[ATTR_SIZE]) {
    // Call closeRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}


int create_index(char relname[ATTR_SIZE], char attrname[ATTR_SIZE]) {
    // Call createIndex() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}


int drop_index(char relname[ATTR_SIZE], char attrname[ATTR_SIZE]) {
    // Call dropIndex() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}


int Frontend::alter_table_rename(char relname_from[ATTR_SIZE], char relname_to[ATTR_SIZE]) {
    // Call renameRel() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}


int Frontend::alter_table_rename_column(char relname[ATTR_SIZE], char attrname_from[ATTR_SIZE],
                                        char attrname_to[ATTR_SIZE]) {
    // Call renameAttr() method of the Schema Layer with correct arguments

    // Return Success and Error values appropriately
}


int Frontend::insert_into_table_values(char relname[ATTR_SIZE], int attr_count,
                                       char attr_values[][ATTR_SIZE]) {


    // Call insert() method of the Algebra Layer with correct arguments

    // Return Success or Error values appropriately
}


int Frontend::select_from_table(char relname_source[ATTR_SIZE], char relname_target[ATTR_SIZE]) {

    // Call appropriate project() method of the Algebra Layer

    // Return Success or Error values appropriately
}


int Frontend::select_attrlist_from_table(char relname_source[ATTR_SIZE],
                                         char relname_target[ATTR_SIZE],
                                         int attr_count,
                                         char attr_list[][ATTR_SIZE]) {

    // Call appropriate project() method of the Algebra Layer

    // Return Success or Error values appropriately
}


int Frontend::select_from_table_where(char relname_source[ATTR_SIZE],
                                      char relname_target[ATTR_SIZE],
                                      char attribute[ATTR_SIZE]
                                      int op, char value[ATTR_SIZE]) {

    // Call select() method of the Algebra Layer with correct arguments

    // Return Success or Error values appropriately
}


int Frontend::select_attrlist_from_table_where(
    char relname_source[ATTR_SIZE], char relname_target[ATTR_SIZE],
    int attr_count, char attr_list[][ATTR_SIZE],
    char attribute[ATTR_SIZE], int op, char value[ATTR_SIZE]) {


    // Call select() method of the Algebra Layer with correct arguments to
    // create a temporary target relation with name ".temp" (use constant TEMP)

    // TEMP will contain all the attributes of the source relation as it is the
    // result of a select operation

    // Return Error values, if not successful

    // Open the TEMP relation using OpenRelTable::openRel()
    // if open fails, delete TEMP relation using Schema::deleteRel() and
    // return the error code

    // On the TEMP relation, call project() method of the Algebra Layer with
    // correct arguments to create the actual target relation. The final
    // target relation contains only those attributes mentioned in attr_list

    // close the TEMP relation using OpenRelTable::closeRel()
    // delete the TEMP relation using Schema::deleteRel()

    // return any error codes from project() or SUCCESS otherwise
}


int Frontend::select_from_join_where(
    char relname_source_one[ATTR_SIZE], char relname_source_two[ATTR_SIZE],
    char relname_target[ATTR_SIZE],
    char join_attr_one[ATTR_SIZE], char join_attr_two[ATTR_SIZE]) {

    // Call join() method of the Algebra Layer with correct arguments

    // Return Success or Error values appropriately
}


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


int Frontend::custom_function(int argc, char argv[][ATTR_SIZE]) {
  // argc gives the size of the argv array
  // argv stores every token delimited by space and comma

  // implement whatever you desire

}
```
