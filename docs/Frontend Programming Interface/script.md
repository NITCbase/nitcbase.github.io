---
sidebar_position: 5
title: 'Script Commands'
tags:
  - Script
  - Commands
  - run
  - echo
  - front end interface
---

The Script commands supported by the Front-end interface are used for (1) batch execution from a file and (2) printing messages to the command line; This is a smaller subset of the external file system commands supported by XFS interface because idea of seperation of concern is being followed, i.e., Front-end interface is not concerned with the loading/copying/moving data and relations from/to the host system.

### Batch Execution
#### Description
This command is used to run multiple XFS commands in sequence by reading the commands line-by-line from an external file. For example the `run` command given below will execute commands present in `filename`. If there is an error on running a command at a given line, all commands after that **will not be excuted** and the `run` command fails by giving the line number of the command in which error occurred.
#### Syntax
```bash
run filename
```
:::tip
This is useful to execute multiple commonly used commands while debugging.
:::

### Echo
#### Description
This command is used to echo back the message given as argument to the command line.

:::tip
This is useful while debugging in combination with the `run` command.
:::

#### Syntax
```bash
echo <any message>
```