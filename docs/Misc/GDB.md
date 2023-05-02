---
title: "GNU Debugger(GDB)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

A debugger is a program that runs other programs, allowing the user to exercise control over these programs, and to examine variables when problems arise. GDB allows you to run the program up to a certain point, then stop and print out the values of certain variables at that point, or step through the program one line at a time and print out the values of each variable after executing each line.

Errors like segmentation faults may be easier to find with the help of GDB.

GDB allows you to:-

- Pause and continue its execution
- Set "break points" or conditions where the execution pauses so you can look at its state (the value of the variables at that point).
- View and "watch" variable values
- Step through the program line-by-line (or instruction by instruction)

## Installation

### Docker Based Setup

If you followed the Docker-based setup, GDB should have already been included in the docker image you built and will be available in the container. You can proceed to the section on [using GDB](#using-gdb).

### Manual Setup

If you followed the manual setup process, you might have to install GDB. Before you do, check whether it is already present in your system by running the following command.

```bash
gdb -help
```

If you have already installed GDB, then it will display all the available options within your GDB, else if the terminal says "command not found", then you can proceed with the installation process.

<Tabs>
<TabItem value="ubuntu" label="Ubuntu / Debian" default>

```bash
sudo apt update
sudo apt-get install -y gdb
```

</TabItem>
<TabItem value="fedora" label="Fedora / Red Hat">

```bash
sudo yum install gdb
```

</TabItem>
<TabItem value="arch" label="Arch Linux">

```bash
sudo pacman -Sy gdb
```

</TabItem>
</Tabs>

Now you can confirm the installation of GDB by executing the command `gdb -help` again.

## Using GDB

You have to tell your compiler to compile your code with symbolic debugging information included. Here's how to do it with gcc, using the -g flag.

```bash
g++ -g nitcbase.cpp -o nitcbase
```

:::tip

The Makefile provided with NITCbase supports compiling in debug mode by running it as

```bash
make mode=debug
```

This will create the `nitcbase-debug` executable.

:::

Once you've done that, you should be able to debug your program in the debugger.

Your text editor/IDE might already come with debug functionality built-in. You can find below config for various text editors and IDEs to take advantage of their frontends.

<Tabs>
<TabItem value="vscode" label="VSCode" default>

```json title=".vscode/launch.json"
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug nitcbase",
      "cwd": "${workspaceFolder}",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/nitcbase-debug", // Binary to exec
      "stopAtEntry": false,
      "environment": [],
      "externalConsole": false,
      "MIMode": "gdb",
      "setupCommands": [
        {
          "description": "Enable pretty-printing for gdb",
          "text": "-enable-pretty-printing",
          "ignoreFailures": true
        }
      ],
      "preLaunchTask": "Build debug nitcbase",
      "miDebuggerPath": "/usr/bin/gdb"
    }
  ]
}
```

```json title=".vscode/tasks.json"
{
  "tasks": [
    {
      "type": "shell",
      "label": "Build debug nitcbase",
      "command": "/usr/bin/make",
      "args": ["mode=debug"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

The "Debug nitcbase" task can be launched from the "Run and Debug" menu.

</TabItem>

<TabItem value="tui" label="Terminal">

If you prefer to keep it within the terminal itself, you can use gdb with the `-tui` flag.

```bash
gdb -tui nitcbase-debug
# nitcbase-debug is the executable here
```

</TabItem>

<TabItem value="emacs" label="Emacs">

looking for contributions

</TabItem>

</Tabs>

---

There's also the possibility of using the gdb prompt (that is, the "dumb terminal mode") which might be harder to use than the earlier mentioned options.

You could find online documentation for how to use the debugger in your editor of choice, or just jump right into it and figure it out as you go.

If you feel you need a general overview of the usage of GDB, [Beej's Quick Guide to GDB](https://beej.us/guide/bggdb/) will be helpful.

### Using GDB in a Docker Container

This section explains how to use GDB from within a docker container. If you followed the Docker-based setup, it is recommended to keep reading.

For working with the VSCode frontend for GDB, you will need to [attach to the nitcbase container](https://code.visualstudio.com/docs/devcontainers/attach-container) and then launch the debugger from [within the container](https://code.visualstudio.com/docs/devcontainers/containers#_debugging-in-a-container). You might be prompted to install the [C/C++ VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) the first time you run the debugger.

For terminal-based usage, gdb can be accessed from [a shell in the container](./Installation%20Guidelines#connecting-to-the-container).
