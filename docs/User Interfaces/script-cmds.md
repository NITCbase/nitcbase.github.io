---
sidebar_position: 2
title: 'Script Commands'
tags:
  - Script
  - commands
---

Script commands are available for both XFS interface and frontend interface. These commands help the user to execute mutliple commands sequentially from a file and also to print out custom useful messages into terminal for debugging and informational purposes.

### Batch Execution
#### Description
This command is used to run multiple commands in sequence by reading the commands line-by-line from an external file. For example the `run` command given below will execute commands present in `filename`. If there is an error on running a command at a given line, all commands after that **will not be excuted** and the `run` command fails by giving the line number of the command in which error occurred.
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