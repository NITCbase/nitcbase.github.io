---
sidebar_position: 0
title: "Architecture"
---

NITCbase has a seven layer design. This section provides documentation for each of the seven layers and certain additional design specific details.
Contents include:

1. [**Algebra Layer**](../Design/Algebra%20Layer.md)
2. [**Schema Layer**](../Design/Schema%20Layer.md)
3. [**Cache Layer**](../Design/Cache%20Layer/intro.md)
4. [**B+ Tree Layer**](../Design/B+%20Tree%20Layer.md)
5. [**Block Access Layer**](../Design/Block%20Access%20Layer.md)
6. [**Buffer Layer**](../Design/Buffer%20Layer/intro.md)
7. [**Physical Layer**](../Design/Physical%20Layer.md)

In addition to the above layers, NITCbase provides a command line interface called [Frontend Interface](../Design/Frontend.md) to the users in which they can execute any database query.
This layer is responsible for translating the SQL-like queries given as input to a set of lower-layer function calls.

The following diagram shows the organization of different layers of NITCbase and important C++ classes present within them.
You can use this diagram to navigate to different parts of this section by clicking on the relevant layers.

![Architecture](../../static/img/Architecture.svg)
