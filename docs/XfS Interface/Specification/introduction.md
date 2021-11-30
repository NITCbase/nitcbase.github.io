---
sidebar_position: 1
title: 'Introduction'
tags:
  - introduction
  - xfs
  - interface
---
XFS Interface is an external command line interface to access the NITCBase filesystem from the host (UNIX) system. 
The filesystem is simulated on a binary file (`disk`). This interface aims to provide the functionality of **formatting and initializing the disk and transferring relations from/to the host system to/from the disk**. This is helpful in debugging the system during its implementation. 

There are **three** types of commands supported by the XFS interface:

1. [External File System Commands](./ext-int-cmds.md)
2. [Data Definition Language Commands ](./ext-int-cmds.md)
3. [Data Manipulation Language Commands](./ext-int-cmds.md)