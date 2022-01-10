---
sidebar_position: 1
title: 'Frontend Programming Interface'
tags:
  - introduction
  - frontend
  - interface
---
## Frontend User Interface
NITCbase provides a command line interface to the users (students) in which they can input and execute any database queries. This interface translates the SQL-like queries given as input to a set of lower-layer function calls. Frontend interface supports the following types of commands:
1. [Script Commands](../User%20Interfaces/script-cmds.md)
2. [Data Definition Language(DDL) Commands ](../User%20Interfaces/ddl.md)
3. [Data Manipulation Language(DML) Commands](../User%20Interfaces/dml.md)

Among the above commands, script commands have already been implemented and provided to you. DDL and DML commands have to be implemented as methods in the Frontend Class described below.

## Frontend Class
The C++ Frontend Class given to you is instantiated by the frontend interface runner program. Frontend interface runner program is supplied to you and hence you do not need to implement. It will translate the input SQL-like queries, extracts the arguments and calls the appropriate methods of the Frontend Class. The Frontend Class given has to be implemented by you by following the specification of all the class methods given in this section. All the methods of frontend class are static and it has the following C++ declaration:

```cpp
class Frontend {
public:
    // Data Definition Language (DDL) Commands
    static int create_table(char relname[ATTR_SIZE], 
                            int no_attrs, 
                            char attribute[no_attrs][ATTR_SIZE], 
                            int type_attr[no_attrs]);

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

    // Data Manipulaiton Language (DML) Commands
    static int insert_into_table_from_file(char relname[ATTR_SIZE], 
                                           char filepath[ATTR_SIZE]);

    static int insert_into_table_values(char relname[ATTR_SIZE],
                                        vector<string> attr_values);

    static int select_from_table(char relname_source[ATTR_SIZE], 
                                 char relname_target[ATTR_SIZE]);

    static int select_attrlist_from_table(char relname_source[ATTR_SIZE], 
                                          char relname_target[ATTR_SIZE],
                                          int attr_count, 
                                          char attr_list[attr_count][ATTR_SIZE]);

    static int select_from_table_where(char relname_source[ATTR_SIZE], 
                                       char relname_target[ATTR_SIZE],
                                       char attribute[ATTR_SIZE], 
                                       int op, 
                                       char value[ATTR_SIZE]);

    static int select_attrlist_from_table_where(char relname_source[ATTR_SIZE], 
                                                char relname_target[ATTR_SIZE],
                                                int attr_count, 
                                                char attr_list[attr_count][ATTR_SIZE],
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
                                               char attr_list[attr_count][ATTR_SIZE]);
};
```

The specifications for each method of this class is provided in the following sections.