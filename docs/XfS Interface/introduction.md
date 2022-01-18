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

1. [Data Definition Language(DDL) Commands ](../NITCbase_Commands#data-definition-language-commands)
2. [Data Manipulation Language(DML) Commands](../NITCbase_Commands#data-manipulation-language-commands)
3. [XFS / External File System Commands](../NITCbase_Commands#external-file-system-xfs-commands)
4. [Script Commands](../NITCbase_Commands#script-commands)

Please refer the [NITCbase Commands section](../NITCbase_Commands) to get specifications for each of these commmands.