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