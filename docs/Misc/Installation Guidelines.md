---
sidebar_position: 1
title: "Installation Guidelines"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

## Setup

:::info
The following setup instructions assume that you have a Linux based machine. If you face any difficulties during the environment setup or you are running Windows or Mac operating system and do not want to set up a linux box, you can try the [Docker based setup given here](./DockerSetup.md).
Note: Windows installation of docker requires WSL2.
:::
The following are the instructions for installation in linux/unix environments:

<Tabs>
<TabItem value="ubuntu" label="Ubuntu / Debian" default>

1. Install the prerequisites.
   ```bash
   sudo apt update;
   sudo apt-get install -y build-essential cmake gcc wget curl libreadline libreadline-dev
   ```
2. Execute the following line in terminal:

   ```bash
   curl -Sf https://raw.githubusercontent.com/nitcbase/nitcbase-bootstrap/main/setup.sh | sh
   ```

</TabItem>
<TabItem value="fedora" label="Fedora / Red Hat">

1. Install the prerequisites.
   ```bash
   sudo dnf install cmake make automake gcc gcc-c++ kernel-devel wget curl readline readline-devel
   ```
2. Execute the following line in terminal:

   ```bash
    curl -Sf https://raw.githubusercontent.com/nitcbase/nitcbase-bootstrap/main/setup.sh | sh
   ```

</TabItem>
<TabItem value="arch" label="Arch Linux">

1. Install the prerequisites.
   ```bash
   sudo pacman -Syy
   sudo pacman -Sy base-devel cmake gcc wget curl readline
   ```
2. Execute the following line in terminal:

   ```bash
    curl -Sf https://raw.githubusercontent.com/nitcbase/nitcbase-bootstrap/main/setup.sh | sh
   ```

</TabItem>
</Tabs>

On successful execution of the script, a new `NITCbase/` directory will be created containing all the necessary components to start the NITCbase project.

## Files and Directories

When the setup is done, the following directories should be present in your `NITCbase` folder.

```plaintext
  NITCbase
  .
  ├── Disk
  ├── XFS_Interface
  ├── Files
  │   ├── Batch_Execution_Files
  │   ├── Input_Files
  │   └── Output_Files
  └── mynitcbase
      ├── define
      ├── Disk_Class
      ├── Buffer
      ├── Cache
      ├── BPlusTree
      ├── Schema
      ├── Algebra
      ├── Frontend
      ├── Frontend_Interface
      .
      .
      .
```

Notable directories / files include:

- `Disk/` : contains the `disk` binary file on which NITCbase Disk is simulated.
- `XFS_Interface/` : Contains the source files for the xfs interface. Once built succesfully, the `xfs-interface` executable will be present here.
- `mynitcbase` : This is the folder where you'll be working in to implement all the layers of NITCbase. The corresponding folders should be present inside.
- `mynitcbase/Disk_Class/` : contains the `Disk.cpp` file which encompasses the Disk Class described in the Physical Layer. Students should **only** use the Disk Class Object instantiation for doing disk access (read & write and create & destroy)
- `mynitcbase/Frontend_Interface` : contains the full implementation of the frontend interface which is responsible for receiving commands from the user and calling the appropriate method in the `Frontend` class.
- `mynitcbase/define/` : contains the global constants.
- `Files/`: Within this folder, three sub-directories can be found:
  - `/Batch_Execution_FIles` - files taken as input by `run` command is organized and fetched from here (run files).
  - `/Input_Files` - Input data files for commands like `import`, `insert from file` etc. are organized and fetched from here.
  - `/Output_Files` - Output data files generated from `dump` and `export` are organized and placed here.

:::note
We can use sub-directories within `/Files/Batch_Execution_Files` to organize the run files. In that case, `run folder_name/run_file` format can be used.

:::

## Running the XFS Interface

Now that we have all the required files, we can initialise our disk using the [XFS Interface](./XFS%20Interface.md) and start working on NITCbase.

1. Go to the `XFS_Interface` folder and run the following commands.

```bash
./xfs-interface
```

2. You should now be inside the XFS interface prompt. We will run the [fdisk](../User%20Interface%20Commands/efs.md#format-disk) command to create our disk.xfs file.

```
# fdisk
```

You should see the following.

```
# fdisk
Disk formatted
#
```

4. Now that we have our disk file, we can exit the XFS interface by entering exit.

```
# exit
```

With that, you should be ready to start working on NITCbase. Good luck!
