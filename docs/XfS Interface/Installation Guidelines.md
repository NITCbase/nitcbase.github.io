---
sidebar_position: 1
title: 'Installation Guidelines'
tags:
  - Installation
  - Guidelines
  - XFS
---
# XFS Interface Installation Guidelines
XFS Interface is a command line external interface to access the NITCBase filesystem from the host (UNIX) system. The filesystem is simulated on a binary file. This interface aims to provide the functionality of transferring relations from/to the host system to/from the disk and can be helpful in debugging the system during implementation.

There are three types of commands that can be given as input to the XFS interface:

1. External File System Commands
2. Data Definition Language Commands
3. Data Manipulation Language Commands

## Set Up

The following are the instructions for installation in linux/unix environments:

1. Download the NITCBase XFS Interface package from here **ATTACH LINK HERE**
2. Copy the tar file to your home directory 
    ```bash
    cp NITCBase.tar.xz $HOME/
    cd $HOME
    ```
3. Extract the contents
    ```bash
    tar -xvf NITCBase.tar.xz
    ```
4. Install prerequisites such as g++
    ```bash
    sudo apt install g++
    ```
5. Change directory to XFS_Interface_Code.
    ```bash
    cd $HOME/NITCBase/XFS_Interface_Code
    ```  
6. Cmake and then make
    ```bash
    cmake
    make
    ```

## Running XFS Interface

To run the xfs interface do the following:
   ```bash
   ./xfs-interface
   ```

## All Files 

* Sample data files and run files will be present in the `/Files` directory
* Output files from operations such as: `dump` and `export` will also fetch from from this folder
* Input files for operations such as: `import` and `insert from file` will also be fetched from the above folder



## Docker Method

1. Download and Install docker by following the steps [here](https://docs.docker.com/get-docker/)
2. Run the "pull-docker-image-for-xfs" shell script
3. Run the "run-xfs-docker-image-with-volumes" shell script to run XFS Interface