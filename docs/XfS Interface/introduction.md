---
sidebar_position: 1
title: 'XFS Interface'
tags:
  - introduction
  - xfs
  - interface
---
XFS Interface is an external command line interface to access the NITCBase filesystem from the host (UNIX) system. 
The filesystem is simulated on a binary file (`disk`). This interface aims to provide the functionality of **formatting and initializing the disk and transferring relations from/to the host system to/from the disk**. This is helpful in debugging the system during its implementation. 

There are **four** types of commands supported by the XFS interface:

1. [Script Commands](../User%20Interfaces/script-cmds.md)
2. [External File System Commands](../User%20Interfaces/efs.md)
3. [Data Definition Language(DDL) Commands ](../User%20Interfaces/ddl.md)
4. [Data Manipulation Language(DML) Commands](../User%20Interfaces/dml.md)

Please refer the [User Interfaces section](../User%20Interfaces/introduction.md) to get specifications for each of these commmands.