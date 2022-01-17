---
sidebar_position: 1
title: 'System Design'
tags:
  - Design
  - System
---
NITCbase has a seven layer design. This section provides documentation for each of the seven layers and certain additional design specific details.
Contents include:
1. Algrbra Layer
2. Schema Layer
3. Cache Layer
4. Block Access Layer
5. B+ tree Layer
6. Buffer Layer
7. Physical Layer

NITCbase provides a command line interface called [Frontend Interface](../Design/Frontend/Frontend%20User%20Interface) to the users (students) in which they can input and execute any database queries which forms part of the Frontend Layer. This layer is responsible for translating the SQL-like queries given as input to a set of lower-layer function calls.

---
The following System Design Diagram shows the commands / functions to be implemented by students at each layer and also shows their invocation order:
![Design Diagram](../../static/img/design.png)
