---
sidebar_position: 4
title: "Utility Commands"
---

Utility commands are available for both XFS interface and Frontend Interface. These commands are used to provide information, or perform actions that might be useful for the user while using the system.

### Help

#### Description

This command is used to list all the available commands and a short description of each.

#### Syntax

```bash
help
```

### Exit

#### Description

This command is used to exit the system.

#### Syntax

```bash
exit
```

### Run (Batch Execution Command)

#### Description

This command is used to run multiple commands in sequence by reading the commands line-by-line from an external file. For example the `run` command given below will execute commands present in `filename`. If there is an error on running a command at a given line, all commands after that **will not be executed** and the `run` command fails by giving the line number of the command in which error occurred.

:::note

- File name given as input to `run` command is fetched from the `/Files/Batch_Execution_Files/` directory and hence are required to be placed in that folder.

:::

#### Syntax

```bash
run <filename>
```

:::tip

- This is useful to execute multiple commonly used commands while debugging.
- We can use folders within `/Files/Batch_Execution_Files/` to organize the run files. In that case, `run folder_name/run_file` format can be used.

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
