---
title: "Manual Setup"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
The following setup instructions assume that you have a Linux based machine.
:::

<Tabs>
<TabItem value="ubuntu" label="Ubuntu / Debian" default>

1. Install the prerequisites.
   ```bash
   sudo apt-get update
   sudo apt-get install -y build-essential gcc wget curl libreadline libreadline-dev
   ```
2. Execute the following line in terminal:

   ```bash
   curl -Sf https://raw.githubusercontent.com/nitcbase/nitcbase-bootstrap/main/setup.sh | sh
   ```

</TabItem>
<TabItem value="fedora" label="Fedora / Red Hat">

1. Install the prerequisites.
   ```bash
   sudo dnf install make gcc gcc-c++ kernel-devel wget curl readline readline-devel
   ```
2. Execute the following line in terminal:

   ```bash
    curl -Sf https://raw.githubusercontent.com/nitcbase/nitcbase-bootstrap/main/setup.sh | sh
   ```

</TabItem>
<TabItem value="arch" label="Arch Linux">

1. Install the prerequisites.
   ```bash
   sudo pacman -Syy
   sudo pacman -Sy base-devel make gcc wget curl readline
   ```
2. Execute the following line in terminal:

   ```bash
    curl -Sf https://raw.githubusercontent.com/nitcbase/nitcbase-bootstrap/main/setup.sh | sh
   ```

</TabItem>
</Tabs>

On successful execution of the script, a new `NITCbase/` directory will be created containing all the necessary components to start the NITCbase project.

You can now proceed to the [Files and Directories](./Installation%20Guidelines.md#files-and-directories) section of the setup page.
