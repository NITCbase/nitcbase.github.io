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
1. Install the pre-requisities.
    ```bash
    sudo apt update;
    sudo apt-get install -y build-essential cmake gcc;
    ```
2. Download the NITCbase zip package from [here](https://github.com/Nitcbase/nitcbase-download/raw/main/NITCbase.zip).
3. Extract the `NITCbase.zip` folder and copy it to the `HOME` Directory.
4. Change directory to `XFS_Interface_Code/`  as follows:
    ```bash
    cd
    cd NITCbase/XFS_Interface_Code
    ```
5. ADD A DIRECTORY STRUCTURE HERE FOR THE XFS INTERFACE
6. Run CMake to generate the make files (BEFORE THIS I FEEL WE WOULD CREATE A build DIRECTORY AND THEN do CMAKE.... REFER):
    ```bash
    cmake --clean-first .
    ```
7. Run the build to generate executable as follows:
    ```bash
    make
    ```
8. `XFS-Interface` would be the excutable which can be run by using the following command:
    ```bash
    ./XFS-Interface
    ```

## All Files 

* ADD A DIRECTORY TREE HERE FOR NITCBASE and EXPLAIN ABOUT DISK CLASS AND FRONTEND INTERFACE AS WELL
* Sample data files and run files will be present in the `/Files` directory
* Output files from operations such as: `dump` and `export` will also fetch from from this folder
* Input files for operations such as: `import` and `insert from file` will also be fetched from the above folder



## Docker Method

1. Download and Install docker by following the steps [here](https://docs.docker.com/get-docker/)
2. Run the "pull-docker-image-for-xfs" shell script
3. Run the "run-xfs-docker-image-with-volumes" shell script to run XFS Interface