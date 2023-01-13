---
sidebar_position: 2
title: "Docker Based Setup"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker Based Setup

Follow the instructions below to set up your NITCbase work environment in docker.

## Install and setup Docker on host machine

Follow the instructions available [here](https://docs.docker.com/get-docker/) to install docker on your machine.

You could also go through the [Docker quick start quide](https://docs.docker.com/get-started/) to know more about Docker .

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

```Dockerfile
FROM ubuntu:20.04

RUN apt-get update \
    && apt-get install -y libc6-dev vim nano make gcc tar wget build-essential libreadline libreadline-dev

RUN useradd -m nitcbase
USER nitcbase


RUN cd /home/nitcbase \
    && wget https://raw.githubusercontent.com/nitcbase/nitcbase-bootstrap/main/setup.sh \
    && chmod +x setup.sh \
    && mkdir NITCbase

WORKDIR /home/nitcbase/NITCbase
```

The given `Dockerfile` will setup the NITCbase environment.

### Building the container image

We'll now build the container image using the `Dockerfile`

```bash
docker build -t nitcbase:ubuntu20.04 .
```

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

You can now proceed to the [Files and Directories](./Installation%20Guidelines.md#files-and-directories) section of the setup page.
