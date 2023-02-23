---
title: "GNU Debugger(GDB)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

A debugger is a program that runs other programs, allowing the user to exercise control over these programs, and to examine variables when problems arise. GDB allows you to run the program up to a certain point, then stop and print out the values of certain variables at that point, or step through the program one line at a time and print out the values of each variable after executing each line.

Errors like segmentation faults may be easier to find with the help of gdb.

GDB allows you to:-

- Pause and continue its execution
- Set "break points" or conditions where the execution pauses so you can look at its state (the value of the variables at that point).
- View and "watch" variable values
- Step through the program line-by-line (or instruction by instruction)

## Installation

Before you install GDB, check whether you have already installed it.

```bash
gdb -help
```

If you have already installed GDB, then it will display all the available options within your GDB,
Else if the terminal says "command not found", then you can proceed with the installation process.

<Tabs>
<TabItem value="ubuntu" label="Ubuntu / Debian" default>

```bash
sudo apt update
sudo apt-get install -y gdb
```

</TabItem>
<TabItem value="fedora" label="Fedora / Red Hat">

```bash
yum install gdb
```

</TabItem>
<TabItem value="arch" label="Arch Linux">

```bash
pacman -Sy gdb
```

</TabItem>
</Tabs>

Now you can confirm the installation of GDB by executing the command `gdb -help` again.

## Using GDB

You have to tell your compiler to compile your code with symbolic debugging information included. Here's how to do it with gcc, with the -g switch:

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

Once you've done that, you should be able to view program listings in the debugger.

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
      "preLaunchTask": "${defaultBuildTask}",
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
# nitcbase is the executable here
```

</TabItem>

<TabItem value="emacs" label="Emacs">

looking for contributions

</TabItem>

</Tabs>

---

There's also the possibility of using the gdb prompt (i.e `dumb terminal mode`) which might be harder to use than the earlier mentioned options.

You can most definitely find online documentation for how to use the debugger in your editor of choice, or just jump right into it and figure it out as you go.

If you feel you need a general overview of the usage of GDB, I'd recommend reading [Beej's Quick Guide to GDB](https://beej.us/guide/bggdb/).
