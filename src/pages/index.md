![Nitcbase Intro Pic](../../static/img/FrontBannerLogo.png)

---

import BufferClassesSvg from '../../static/img/buffer_classes.svg';


<BufferClassesSvg/>

## Introduction
NITCbase is a Relational Database Management System Implementation (RDBMS) project that is intended to help an undergraduate student understand the design and data structures of an elementary RDBMS by implementing one herself.

A step-by-step implementation roadmap of the project guides the students through various stages of implementation of the RDBMS. The documentation of the project includes tutorials that help the student to assimilate the concepts as well as the data structures and design details that she needs to understand at each phase of the project. The complete design specifications of the RDBMS and its various component subsystems are also documented and made available to the student. 

NITCbase follows a seven layer design, with the basic capabilities of a standard relational database management system which includes, creation and deletion of tables, inserting records, selection queries and indexing using B+ Tree. The final RDBMS implemented by the student supports elementary SQL queries such as create, drop, alter, insert, select, project, equi-join and also the queries for B+ Tree based Indexing such as create index and drop index.
## What we are building

The seven layer design of NITCbase starts with the Physical layer at the bottom, progresses to Buffer layer, B+tree layer, Block access layer, Cache layer, Algebra layer and Schema layer at the intermediate levels and a Front-end command-line interface for interacting with the users at the top.

The following diagram gives an idea of the system that we are building and it's components on a high level.

![Design Diagram](../../static/img/overall-design.png)

There are two command-line interfaces for NITCbase:
* [Frontend Interface](/docs/Design/Frontend)
* [XFS Interface](/docs/XFS%20Interface/introduction)

Since NITCbase is a relational database, it supports execution of SQL-like queries on these command-line interfaces. **The NITCbase Disk is the single storage unit for all data present in NITCbase**, *which in addition to storing the relations, records and indexes, also stores meta data necessary for organizing, accessing, indexing and modiying the data.*

## What you are given
This project assumes that the student is working on a Unix/Linux system. The documentation specifies how the NITCBase RDBMS system can be implemented in C++ Language.
The following are provided to the students to get started on the project: 
 
1. **A complete implementation of a command line user interface called XFS-interface** that allows a user to *access the system’s simulated disk from the host* (Linux/Unix environment) and allows operations such as - <br/> (a) formatting the disk to the NITCbase file system format<br/>  (b) transferring  files to and from the host system to the NITCbase file system<br/>  (c) supporting standard NITCBase - [Data Definition language (DDL)](/docs/NITCbase_Commands#data-definition-language-commands) and [Data Manipulation language (DML)](/docs/NITCbase_Commands#data-manipulation-language-commands) operations on the database file system and so on.

2. **A complete implementation of the Disk class**, implemented in `Disk.cpp`, that provides a bare minimum C++ programming interface to the NITCBase disk. The code for the methods `write()` & `read()` in this class, that allows for the transfer of one block of data between a C++ program and the disk, is given to the student. 

3. **Class definitions for various intermediate layers** of the database system are provided. These are:  (a) Buffer layer (Buffer.cpp), (b) Block Access layer (BlockAccess.cpp), (c) Cache layer (Cache.cpp), (d) B+ Tree layer (BPlusTree.cpp), (e) Schema layer (Schema.cpp) and (f) Algebra layer (Algebra.cpp).  The code for the methods in these classes are not supplied.  However, the documentation provides detailed descriptions of the algorithms corresponding to the non-trivial methods in these classes so that the student can read and understand the algorithms and translate them to working C++ code herself.  

4. **A partial implementation of the top-most layer of NITCbase design - the Frontend Interface**.  The front-end interface of NITCbase is divided into two sub-modules: (a) Frontend user interface (`frontend-runner.cpp`) and (b) Frontend programming interface (`Frontend.cpp`). The frontend user interface code is completely given. However, only the class declaration and functional specification of the frontend programming interface sub-module is provided.  

5. [Documentation](/docs/Design/Architecture) containing detailed specification and design of each of the above modules, specification of the database disk organization,  specification of the system’s high-level user-interface,  descriptions of the algorithms used in various modules, and a detailed tutorial on B+tree implementation are provided.  *The student will be required to refer to appropriate parts of the documentation while implementing various components of the RDBMS.*

6. A [roadmap](/docs/Roadmap/Introduction) that guides the student in implementing the system through a sequence of stages.   The stages are of roughly ascending complexity. Each stage builds on the previous stages and guides the student to relevant parts of the documentation which she needs to read and understand for the  implementation of the stage.  The student completes a complete  functional implementation of the RDBMS at the end of all the stages.     

The project assumes that the student has adequate background in programming in C/C++ and data structures.
At the end of the project, the code written by the student (approximately 3000 lines of C++ code) will allow the user to execute all NITCbase commands from the front-end interface.


Though not required to be read to get started on the project, a  detailed design of the NITCbase system that will eventually be built at the end of all the stages is given in the design documentation linked [here](/docs/Design/Architecture).

The code for the remaining layers is to be completely implemented by the student, following the instructions in the road map (writing around 3000 lines of C++ code).

To begin with the project, continue to the [Roadmap](/docs/Roadmap/Introduction).