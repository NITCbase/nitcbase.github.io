---
sidebar_position: 2
title: 'Installation Guidelines'
tags:
  - Installation
  - Guidelines
  - XFS
---
# XFS Interface Installation Guidelines
## Setup
:::note
The following setup instructions assume that you have a Linux based machine. If you face any difficulties during the setup or you are running Windows or Mac operating system and do not want to set up a linux box, you can try the [Docker based setup given here](#docker-based-setup-for-xfs-interface).
:::
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
  ├── Dockerfile_frontend
  ├── Dockerfile_xfs
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
  ├── build_frontend.sh
  ├── build_xfs.sh
  ├── define
  │   ├── constants.h
  │   ├── enum_constants.h
  │   ├── errors.h
  │   └── id.h
  ├── run_frontend.sh
  └── run_xfs.sh
  ```

## Frontend Interface Setup
1. Ensure you have done till step 3 in the [above setup](#setup).
2. Change directory to `Frontend_Interface/`  as follows:
    ```bash
    cd
    cd NITCbase/Frontend_Interface
    ```
3. Run the following script file to generate the `Frontend-Interface` executable as follows:
    ```bash
    chmod +x build.sh;
    ./build.sh
    ```
4. Run the XFS Interface as follows:
    ```bash
    ./Frontend-Interface
    ```

## Docker based setup for XFS Interface

1. Download and Install docker by following the steps mentioned [here](https://docs.docker.com/get-docker/).
   * You can go through the [Docker quick start quide](https://docs.docker.com/get-started/) to know more about Docker.
2. Open the Docker application and keep it running in the background.
3. Download the NITCbase zip package from [here](https://github.com/Nitcbase/nitcbase-download/raw/main/NITCbase.zip).
4. Extract the `NITCbase.zip` folder and copy it to the `HOME` Directory (Important for build scripts to run properly).
5. Open Terminal and change working directory to `NITCbase/`  as follows:
    ```bash
    cd
    cd NITCbase
    ```
6. Ensure that the `build_xfs.sh` and `run_xfs.sh` have the execute permissions by running the following commands in terminal:
    ```bash
    chmod +x build_xfs.sh;
    chmod +x run_xfs.sh;
    ```
7. Run the following shell script which will build the docker image of XFS Interface:
    ```bash
    ./build_xfs.sh
    ```
8.  To run the Docker Instance of XFS Interface execute the following shell script:
    ```bash
    ./run_xfs.sh
    ```

## Docker based setup for Frontend Interface

1. Ensure that you have done till step 5 in the [above setup](#docker-based-setup-for-xfs-interface) and that Docker application is running the background.
2. Open Terminal and change working directory to `NITCbase/` as follows:
    ```bash
    cd
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