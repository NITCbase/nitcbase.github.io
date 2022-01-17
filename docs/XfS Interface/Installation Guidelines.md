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
1. Download the NITCbase package from [here](https://github.com/Nitcbase/nitcbase-download/blob/main/NITCbase.zip)
2. Install pre-requisities
    ```bash
    sudo apt update;
    sudo apt-get install -y build-essential cmake gcc;
    ```
3. Extract the NITCbase.zip folder and copy it to the HOME folder
4. Change directory into XFS Interface.
5. Run `cmake .`
6. Run `cmake --build .`
7. ./XFSInterface would be the excutable.
    
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