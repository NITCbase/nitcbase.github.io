# About Us

## NITCbase Philosophy

The NITCbase project is a pedagogical RDBMS implementation project designed for use as an instructional system for undergraduate (typically junior level) CS engineering students. The project asks the student to develop a simple single user relational database management system that supports basic query operations (select, project and equijoin). The RDBMS only supports two simple data types - number and string. Many of the standard operations such as creation and deletion of relations, adding tuples to relations, renaming attributes etc. are supported. However, the present system does not support deletion of a tuple from a relation. The user can create/drop indices. Indexing is performed using B+ trees.

The project is designed to help the student understand how data storage and retrieval happens in a relational database at the low level by implementing the RDBMS herself.

The whole project involves writing nearly 3000 lines of C++ code, and is suitable for a one semester DBMS laboratory course, or as a programming project associated with an undergraduate DBMS course. Before attempting the project, the student is expected to have some proficiency in C++ programming and data structures, at the level of a junior year undergraduate CS student . An appreciation for software engineering concepts, object oriented design concepts, or some added proficiency in C++ programming could be a useful by-product of doing the project, but not the project’s principal goal.

The idea here is not to build a system for practical use, but instead build one for learning how an RDBMS works. Further, we had set for ourselves with the following conflicting constraints:

- Most of the code in the project must be written by the student.
- The project must be doable with around 120-150 hours of work from a student (so that the project can be used for a one semester course).
- A student with prior training in data structures and C++ programming must be able to do the project by following only the roadmap without having to do a database systems course (though such a course is a desirable co-requisite). Hence, we need to provide learning material that explains only the necessary theoretical concepts needed to understand what is being done at each stage of the project.

Consequently, several RDBMS features that are necessary in practice, but which we thought are not sufficiently adding to the student’s learning experience beyond what is already done, have been dropped from the project. For instance, the project allows adding a tuple to a relation, but not deleting a tuple from a relation. This design choice is made because implementing the insertion operation would have already familiarized the student to the standard record and index (B+ tree) operations, and reading from a text about deletion may be sufficient from there; as a full B+ tree deletion implementation would take too much time and effort which may be better utilized for learning other important concepts. As yet another design choice, the RDBMS does not support a primary key to be defined (but allows indices to be created on any attribute). Features such as support for concurrent access, transaction management, crash recovery and so forth could not be included, as those would stretch the project far beyond what can be done in a term/semester.

Even a small RDBMS like NITCbase is a moderately large software system, deploying several data structures and algorithms and software design ideas. Hence, it is necessary to break down the whole work into a sequence of manageable steps for the student, so that she is not overwhelmed by the project. To this end, a step by step development guide called the [project roadmap](/docs/Roadmap) is provided to the student. The roadmap divides the project into 12 stages. The student works through the stages, and completes the implementation of the whole system, typically by the end of a semester/term. The approximate amount of work (in terms of the number of hours required, as well as lines of code to be written) needed to complete each stage is indicated in the roadmap. The stages are organized approximately in increasing order of complexity. In each stage, the student adds more code to her own code for the previous stage.

To keep the student continuously motivated, it is important that the student is given a feeling that she has achieved something visible at each stage. Most stages (except the initial easy stages) involve the implementation of some RDBMS command. By the end of Stage 4, the student would have added support for extracting records in an existing relation with linear search (without indexing); Stage 5 implements opening and closing operations on relations. In Stage 6 she implements commands for renaming relations and attribute names (on existing relations); Stage 7 supports insertion of tuples into an existing relation. In Stage 8 she implements creation and deletion of relations; Stage 9 implements select and project operations and so on. The relatively hard stages - Stage 10 and Stage 11 asks her to implement indexing (B+ tree) operations and Stage 12 concludes the project with the implementation of equi-join query support. Test cases are given at the end of each stage to aid the student in verifying her implementation.

We do not expect every student taking up the project to complete it. The project is designed in such a way that a student who stops the project mid way still achieves proportional learning outcomes and insights about an RDBMS system at the level of her work. This also allows the teacher to grade the student based on the stage she has completed satisfactorily.

The project comes with extensive documentation providing detailed specification and explanations for various data structures and algorithms used. In each stage of the roadmap, links are provided at appropriate points to read the pre-requisite documentation on the algorithms/data structures needed for completing the particular stage. Details not relevant to the implementation of the present stage are not introduced till they are needed later. As already noted, we have tried to introduce concepts in an ascending scale of complexity.

It is hoped that a student doing the project will gain sufficient confidence to work on the actual source code of real database systems as she moves forward in her professional life.

The project is built on the same pedagogical principles as some of our previous undergraduate instructional systems for teaching Operating Systems ([the eXpOSNITC project](https://exposnitc.github.io)) and Compiler Design ([the SILCNITC project](https://silcnitc.github.io)). The design of the NITCbase system was inspired by the [Minirel](https://research.cs.wisc.edu/coral/minibase/logMgr/report/node3.html) instructional DBMS developed by [Prof. David Witt](https://en.wikipedia.org/wiki/David_DeWitt). However, our system is not a replica of Minirel. We chose to develop a similar system of our own, with the hope of building one that is more accessible to an average student. If you are looking for a more ambitious student project than ours, we refer you to the [Minibase](https://research.cs.wisc.edu/coral/mini_doc/minibase.html) system by Prof. Mike Carey and Prof. Raghu Ramakrishnan.

## Authors

The content in the website and the documentation has been authored in the [Department of Computer Science and Engineering](https://minerva.nitc.ac.in/),
[National Institute of Technology Calicut](http://nitc.ac.in/) under the guidance of [Dr. Murali Krishnan K](https://people.cse.nitc.ac.in/muralikrishnan/). The project's activity started in the year 2018. [Dr. Gopakumar G](https://people.cse.nitc.ac.in/gopakumar) joined the project in 2023. Below is a list of co-authors and contributors of the project.

### 2018 - 2019

|                                                                                                               👤 Team Members                                                                                                               |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [Rohith Vishnumolakala](https://www.linkedin.com/in/rohithvishnumolakala/), [Bhavani Venkata Krishna Padavala](https://www.linkedin.com/in/krishna-padavala), [Priyatam Sai Samudrala](https://www.linkedin.com/in/priyatam-sai-64ab47123/) |

### 2019 - 2020

|                                                                                   👤 Team Members                                                                                   |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   [Aparna Manoj](https://www.linkedin.com/in/aparna-manoj-65b9a117b/), [Visakh Suku](https://nitcbase.github.io/about.html), [Vrindha K](https://www.linkedin.com/in/vrindha-k/)    |
| [Nileena P C](https://www.linkedin.com/in/nileena-p-c/), [Reema Sebi](https://www.linkedin.com/in/reema-sebi/), [Neema George](https://www.linkedin.com/in/neema-george-93a174175/) |
|             [Athira Dileep](https://www.linkedin.com/in/athira-dileepkumar-96a331154/), [Pravitha Sathyavan](https://www.linkedin.com/in/pravitha-sathyavan-3b6b37130/)             |

### 2021 - 2022

|                                                               👤 Team Members                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------: |
| [Jessiya Joy](https://www.linkedin.com/in/jessiya-joy-03184b198/), [Gokul Sreekumar](https://www.linkedin.com/in/gokul-sreekumar-63581b174/) |
|                                            [Shiva Hegde](https://www.linkedin.com/in/shivahegde/)                                            |

### 2022 - 2023

|           👤 Team Members            |
| :----------------------------------: |
| [Cliford Joshy](https://cliford.net) |
