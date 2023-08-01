---
title: "Installation Guidelines"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import FetchCodeBlock from "@site/src/components/FetchCodeBlock";

The recommended way to work on NITCbase is using a dedicated docker container. Docker allows us to maintain a consistent experience across all the Linux distributions and versions of core utilities you might have installed.

A [manual setup](./ManualSetup.md) guide is also provided, but it is not officially supported and can be followed at your own discretion.

## Install and setup Docker on the host machine

Follow the instructions available [here](https://docs.docker.com/get-docker/) to install docker on your machine. You could also go through the [Docker quick start quide](https://docs.docker.com/get-started/) to know more about Docker.

:::caution WARNING
The following has **not** been tested on _Windows_.
If you encounter any issues or have any suggestions, raise an issue [here](https://github.com/nitcbase/nitcbase.github.io/issues/new)

:::

## Setting up the container

We'll assume the following directory structure

```plaintext
.
├── Dockerfile
└── NITCbase/ # <- files will be stored here and mapped to container
```

We'll store all the required files in `NITCbase` and map the same into the container.

We can create the structure using the below commands

<Tabs>
<TabItem value='unix/linux' label="Unix/Linux" default>

```bash
cd <your directory>
touch Dockerfile
mkdir NITCbase
```

</TabItem>
<TabItem value='windows' label="Windows">

```powershell
cd <your directory>
New-Item Dockerfile
New-Item -path NITCbase -ItemType directory
```

</TabItem>
</Tabs>

The contents of `Dockerfile` are given below

<FetchCodeBlock
  link="https://raw.githubusercontent.com/Nitcbase/nitcbase-bootstrap/main/Dockerfile"
  language="Dockerfile"
/>

The given `Dockerfile` will setup the NITCbase environment.

### Building the container image

We'll now build the container image using the `Dockerfile`

```bash
docker build -t nitcbase:ubuntu20.04 .
```
If it's showing an error like "Got permission denied while trying to connect to the Docker daemon socket at unix", use 
```bash
sudo docker build -t nitcbase:ubuntu20.04 .
```
do the same for upcoming commands also

### Start the container instance

We'll start an instance of the container and map the local folder `NITCbase` into `/home/nitcbase/NITCbase` directory of the container.

<Tabs>
<TabItem value='unix/linux' label="Unix/Linux" default>

```bash
 docker run -v $PWD/NITCbase:/home/nitcbase/NITCbase -d --name nitcbase -i nitcbase:ubuntu20.04
```

</TabItem>
<TabItem value='windows' label="Windows">

```powershell
docker run -v ${PWD}/NITCbase:/home/nitcbase/NITCbase -d --name nitcbase -i nitcbase:ubuntu20.04
```

</TabItem>
</Tabs>

We now have a container instance running in background with the name `nitcbase` and required volume mounts

### Connecting to the container

We can connect to the container instance using the following commands.
**These are the only commands you will need to connect to the container going forward.**

```bash
docker start nitcbase # if the container instance is not already running

docker exec -it nitcbase /bin/bash # to get a bash shell inside the container
```

## Running the setup script

Connect to the container instance as mentioned earlier.

Run the following commands in the terminal connected to the container.

```bash
cd /home/nitcbase
./setup.sh
```

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
      ├── FrontendInterface
      .
      .
      .
```

Notable directories / files include:

- `Disk/` : contains the `disk` binary file on which NITCbase Disk is simulated.
- `XFS_Interface/` : Contains the source files for the xfs interface. Once built succesfully, the `xfs-interface` executable will be present here.
- `mynitcbase` : This is the folder where you'll be working in to implement all the layers of NITCbase. The corresponding folders should be present inside (as described above).
- `mynitcbase/Disk_Class/` : contains the `Disk.cpp` file which encompasses the Disk Class described in the Physical Layer. This class has already been implemented for you. All disk operations(read & write) should only be done using the Disk Class.
- `mynitcbase/FrontendInterface` : The frontend interface is responsible for receiving commands from the user (from the NITCbase prompt on the UNIX system) and calling the appropriate method in the `Frontend` class. This class too has been provided to you. Your task will be to implement the lower layers of NITCbase which will encompass the core functionality of our DBMS.
- `mynitcbase/define/` : contains the global constants.
- `Files/`: This directory will store the external files that will be used/generated by NITCbase and the XFS interface during it's runtime (refer [external filesystem commands](../User%20Interface%20Commands/efs.md) and [utliity commands](../User%20Interface%20Commands/utility.md) for more information). Within this folder, three sub-directories can be found:
  - `/Batch_Execution_Files` - files taken as input by `run` command is organized and fetched from here (run files).
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

With that, you should be ready to start working on NITCbase. The further stages of the roadmap will introduce you to the usage of other XFS-Interface commands. You may now proceed to the roadmap. Good luck!
