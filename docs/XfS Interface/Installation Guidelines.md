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

## All Files 
* Sample data files and run files will be present in the `/Files` directory
* Output files from operations such as: `dump` and `export` will also fetch from from this folder
* Input files for operations such as: `import` and `insert from file` will also be fetched from the above folder
* The folder structure is as follows:
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