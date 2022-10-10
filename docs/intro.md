---
sidebar_position: 1
title: "Introduction"
tags:
  - overall design
  - introduction
  - design
  - diagram
---

## Overall Design/Architecture

The following diagram gives an idea of the system that we are building and it's components on a higher level.

![Design Diagram](../static/img/overall-design.png)

There are two command line interfaces, a disk and the Seven Layers. Since NITCbase is a relational database, it supports execution of SQL-like queries on the commandline interfaces. Disk is the single storage unit for for all data present in NITCbase.
