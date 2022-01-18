---
sidebar_position: 2
title: 'Installation Guidelines'
tags:
  - Installation
  - Guidelines
  - XFS
---
# XFS Interface Installation Guidelines
## Set Up

The following are the instructions for installation in linux/unix environments:
1. Install the prerequisites.
    ```bash
    sudo apt update;
    sudo apt-get install -y build-essential cmake gcc
    ```
2. Download the NITCbase zip package from [here](https://github.com/Nitcbase/nitcbase-download/raw/main/NITCbase.zip).
3. Extract the `NITCbase.zip` folder and copy it to the `HOME` Directory.
4. Change directory to `XFS_Interface/`  as follows:
    ```bash
    cd
    cd NITCbase/XFS_Interface
    ```
5. Run the following script file to generate the `XFS-Interface` executable as follows:
    ```bash
    chmod +x build.sh;
    ./build.sh
    ```
6. Run the XFS Interface as follows:
    ```bash
    ./XFS-Interface
    ```

## Files and Directories
* Sample data files and run files will be present in the `/Files` directory
* Output files from operations such as: `dump` and `export` will be created at  `/Files` directory
* Input files for operations such as: `import` and `insert from file` will also be fetched from the `/Files` directory

  :::note
    We can use folders within `/Files` to organize the run files. In that case, `run folder_name/run_file` format can be used.
  :::

* Notable directories include:
  * `Disk/` : contains the `disk` binary file on which NITCbase Disk is simulated.
  *  `Disk_Class/` : contains the `Disk.cpp` file which encompasses the Disk Class described in the Physical Layer. Students should **only** use the Disk Class Object instantiation for doing disk acceess (read & write and create & destroy)
  *  `define/` : contains the global constants.
  *  `Frontend_Interface/` : contains the `Frontend.cpp` and `frontend-runner.cpp` files. Refer [Frontend Interface section](../Design/Frontend/introduction.md) to know more. Students need not edit the `frontend-runner.cpp` file rather, can start from the methods of Frontend C++ Class in `Frontend.cpp` for lower layer function call invocations.
  *  `XFS_Interface/` : contains the `build.sh` script file for building XFS Interface. Once built succesfully, the `XFS-Interface` executable will be present here.

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
  ├── Dockerfile
  ├── Dockerfile_1
  ├── Files
  │   ├── 10000nums.csv
  │   ├── 10000nums_1.csv
  │   ├── 10000nums_2.csv
  │   .
  │   .
  │   .
  ├── Frontend_Interface
  │   ├── CMakeLists.txt
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
  ├── build.sh
  ├── build_run.sh
  ├── build_run_fint.sh
  ├── define
  │   ├── constants.h
  │   ├── enum_constants.h
  │   ├── errors.h
  │   └── id.h
  ├── run.sh
  └── run_fint.sh
  ```

## Docker Method

1. Download and Install docker by following the steps [here](https://docs.docker.com/get-docker/)
2. Run the "pull-docker-image-for-xfs" shell script
3. Run the "run-xfs-docker-image-with-volumes" shell script to run XFS Interface