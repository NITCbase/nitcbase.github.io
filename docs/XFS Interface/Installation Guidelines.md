---
sidebar_position: 2
title: 'Installation Guidelines'
tags:
  - Installation
  - Guidelines
  - XFS
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# XFS Interface Installation Guidelines
## Setup
:::note
The following setup instructions assume that you have a Linux based machine. If you face any difficulties during the environment setup or you are running Windows or Mac operating system and do not want to set up a linux box, you can try the [Docker based setup given here](#docker-based-setup-for-xfs-interface). Note: Windows installation of docker requires WSL2.
:::
The following are the instructions for installation in linux/unix environments:

<Tabs>
<TabItem value="ubuntu" label="Ubuntu / Debian" default>

1. Install the prerequisites.
    ```bash
    sudo apt update;
    sudo apt-get install -y build-essential cmake gcc wget curl
    ```
2. Execute the following line in terminal:
    ```bash
     curl -Sf https://raw.githubusercontent.com/Nitcbase/nitcbase/master/install/install.sh | sh
    ``` 
    On successful execution of the script, a new `NITCbase/` directory will be created containing all the necessary components to start the NITCbase project.

3. Change directory to `XFS_Interface/`  as follows:
    ```bash
    cd NITCbase/XFS_Interface
    ```
4. Run the following script file to generate the `XFS-Interface` executable as follows:
    ```bash
    chmod +x build.sh;
    ./build.sh
    ```
5. Run the XFS Interface as follows:
    ```bash
    ./XFS-Interface
    ```

</TabItem>
<TabItem value="fedora" label="Fedora / Red Hat">

1. Install the prerequisites.
    ```bash
    sudo dnf install cmake make automake gcc gcc-c++ kernel-devel wget curl
    ```
2. Execute the following line in terminal:
    ```bash
     curl -Sf https://raw.githubusercontent.com/Nitcbase/nitcbase/master/install/install.sh | sh
    ``` 
    On successful execution of the script, a new `NITCbase/` directory will be created containing all the necessary components to start the NITCbase project.

3. Change directory to `XFS_Interface/`  as follows:
    ```bash
    cd NITCbase/XFS_Interface
    ```
4. Run the following script file to generate the `XFS-Interface` executable as follows:
    ```bash
    chmod +x build.sh;
    ./build.sh
    ```
5. Run the XFS Interface as follows:
    ```bash
    ./XFS-Interface
    ```

</TabItem>
<TabItem value="arch" label="Arch Linux">

1. Install the prerequisites.
    ```bash
    sudo pacman -Syy
    sudo pacman -Sy base-devel cmake gcc wget curl
    ```
2. Execute the following line in terminal:
    ```bash
     curl -Sf https://raw.githubusercontent.com/Nitcbase/nitcbase/master/install/install.sh | sh
    ``` 
    On successful execution of the script, a new `NITCbase/` directory will be created containing all the necessary components to start the NITCbase project.

3. Change directory to `XFS_Interface/`  as follows:
    ```bash
    cd NITCbase/XFS_Interface
    ```
4. Run the following script file to generate the `XFS-Interface` executable as follows:
    ```bash
    chmod +x build.sh;
    ./build.sh
    ```
5. Run the XFS Interface as follows:
    ```bash
    ./XFS-Interface
    ```

</TabItem>
</Tabs>



## Files and Directories

* Notable directories / files include:
  * `Disk/` : contains the `disk` binary file on which NITCbase Disk is simulated.
  *  `Disk_Class/` : contains the `Disk.cpp` file which encompasses the Disk Class described in the Physical Layer. Students should **only** use the Disk Class Object instantiation for doing disk acceess (read & write and create & destroy)
  *  `define/` : contains the global constants.
  *  `Files/`: Within this folder, three sub-directories can be found: 
     *  `/Batch_Execution_FIles` - files taken as input by `run` command is organized and fetched from here (run files).
     *  `/Input_Files` - Input data files for commands like `import`, `insert from file` etc. are organized and fetched from here.
     *  `/Output_Fies` - Output data files generated from `dump` and `export`  are organized and fetched from here.
  *  `Frontend_Interface/` : contains the `Frontend.cpp` and `frontend-runner.cpp` files. Refer [Frontend Interface section](../Design/Frontend.md) to know more. Students need not edit the `frontend-runner.cpp` file rather, can start from the methods of Frontend C++ Class in `Frontend.cpp` for lower layer function call invocations. To build Frontend-Interface executable locally in Linux Environment, `build.sh` script present in this folder can be executed.
  *  `XFS_Interface/` : contains the `build.sh` script file for building XFS Interface. Once built succesfully, the `XFS-Interface` executable will be present here.
  *  Dockerfiles (To be noted if you are following the Docker method of installation given [here](#docker-based-setup-for-xfs-interface)):
     *  `Dockerfile_frontend`
     *  `Dockerfile_xfs`
     *  `build_frontend.sh` - To build the docker image for Frontend Interface from `Dockerfile_frontend`.
     *  `build_xfs.sh` - To build the docker image for XFS Interface from `Dockerfile_xfs`.
     *  `run_frontend.sh` - To run the docker image of Frontend Interface.
     *  `run_xfs.sh` - To run the docker image of XFS Interface.
  * `install.sh`: contains build scripts for local linux based installation of NITCbase.


:::note
  We can use sub-directories within `/Files/Batch_Execution_Files` to organize the run files. In that case, `run folder_name/run_file` format can be used.
:::


* The entire folder structure is as follows:
  ```bash
  NITCbase
  .
  ├── Disk
  │   ├── README.txt
  │   └── disk
  ├── Disk_Class
  │   ├── Disk.cpp
  │   └── Disk.h
  ├── Dockerfile_frontend
  ├── Dockerfile_xfs
  ├── Files
  │   ├── Batch_Execution_Files
  │   ├── Input_Files
  │   ├── Output_Files
  │   .
  │   .
  │   .
  ├── Frontend_Interface
  │   ├── CMakeLists.txt
  │   ├── build.sh
  │   ├── Frontend.cpp
  │   ├── Frontend.h
  │   ├── frontend-runner.cpp
  │   └── frontend-runner.h
  ├── XFS_Interface
  │   ├── BPlusTree.cpp
  │   ├── BPlusTree.h
  │   ├── CMakeLists.txt
  │   ├── Disk.cpp
  │   ├── Disk.h
  │   ├── OpenRelTable.cpp
  │   ├── OpenRelTable.h
  │   ├── algebra.cpp
  │   ├── algebra.h
  │   ├── block_access.cpp
  │   ├── block_access.h
  │   ├── build.sh
  │   ├── disk_structures.h
  │   ├── external_fs_commands.cpp
  │   ├── external_fs_commands.h
  │   ├── interface.cpp
  │   ├── interface.h
  │   ├── schema.cpp
  │   └── schema.h
  ├── build_frontend.sh
  ├── build_xfs.sh
  ├── define
  │   ├── constants.h
  │   ├── enum_constants.h
  │   ├── errors.h
  │   └── id.h
  ├── install
  │   ├── install.sh
  ├── run_frontend.sh
  └── run_xfs.sh
  ```

## Frontend Interface Setup
1. Ensure you have done till step 2 in the [above setup](#setup).
2. Change directory to `Frontend_Interface/`  as follows:
    ```bash
    cd nitcbase/Frontend_Interface
    ```
3. Run the following script file to generate the `Frontend-Interface` executable as follows:
    ```bash
    chmod +x build.sh;
    ./build.sh
    ```
4. Run the Frontend Interface as follows:
    ```bash
    ./Frontend-Interface
    ```

## Docker based setup for XFS Interface

1. Download and Install docker by following the steps mentioned [here](https://docs.docker.com/get-docker/).
   * You can go through the [Docker quick start quide](https://docs.docker.com/get-started/) to know more about Docker.
2. Open the Docker application and keep it running in the background.


<Tabs>
<TabItem value="mac" label="Mac" default>


3. Download the compressed NITCbase package from ***either one*** of the following options and extract the compressed file:
   1. [zip](https://github.com/Nitcbase/nitcbase-download/raw/main/NITCbase.zip)
   2. [tar.gz](https://github.com/Nitcbase/nitcbase-download/raw/main/NITCbase.tar.gz)
4. Open Terminal Application change working directory to `NITCbase/`  as follows:
   
    ```bash
    cd NITCbase
    ```
   
5. Ensure that the `build_xfs.sh` and `run_xfs.sh` have the execute permissions by running the following commands in terminal:
   
    ```bash
    chmod +x build_xfs.sh;
    chmod +x run_xfs.sh;
    ```

6. Run the following shell script which will build the docker image of XFS Interface:
   
    ```bash
    ./build_xfs.sh
    ```
   
7.  To run the Docker Instance of XFS Interface execute the following shell script:
   
    ```bash
    ./run_xfs.sh
    ```

</TabItem>
<TabItem value="win" label="Windows (WSL2)" default>


3. Open WSL Linux terminal and run the following command to download the NITCbase package:
   ```bash
   curl -Sf https://raw.githubusercontent.com/Nitcbase/nitcbase/master/install/install.sh | sh
   ```

4. Change working directory to `NITCbase/`  as follows:
    ```bash
    cd NITCbase
    ```
5. Ensure that the `build_xfs.sh` and `run_xfs.sh` have the execute permissions by running the following commands in terminal:
    ```bash
    chmod +x build_xfs.sh;
    chmod +x run_xfs.sh;
    ```
6. Run the following shell script which will build the docker image of XFS Interface:
    ```bash
    ./build_xfs.sh
    ```
7.  To run the Docker Instance of XFS Interface execute the following shell script:
    ```bash
    ./run_xfs.sh
    ```

</TabItem>
</Tabs>

## Docker based setup for Frontend Interface

1. Ensure that you have done till step 4 in the [above setup](#docker-based-setup-for-xfs-interface) and that Docker application is running the background.
2. Open Terminal and change working directory to `NITCbase/` as follows:
    ```bash
    cd NITCbase
    ```
3. Ensure that the `build_frontend.sh` and `run_frontend.sh` have the execute permissions by running the following commands in terminal:
    ```bash
    chmod +x build_frontend.sh;
    chmod +x run_frontend.sh;
    ```
4. Run the following shell script which will build the docker image of Frontend Interface:
    ```bash
    ./build_frontend.sh
    ```
5.  To run the Docker Instance of Frontend Interface execute the following shell script:
    ```bash
    ./run_frontend.sh
    ```