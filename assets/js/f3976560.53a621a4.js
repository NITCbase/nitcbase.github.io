"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[2844],{3905:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},h=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),p=c(a),m=r,u=p["".concat(l,".").concat(m)]||p[m]||d[m]||i;return a?n.createElement(u,o(o({ref:t},h),{},{components:a})):n.createElement(u,o({ref:t},h))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}p.displayName="MDXCreateElement"},672:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=a(7462),r=(a(7294),a(3905));const i={},o=void 0,s={type:"mdx",permalink:"/",source:"@site/src/pages/index.md",description:"Nitcbase Intro Pic",frontMatter:{}},l=[{value:"Introduction",id:"introduction",level:2},{value:"What are you building",id:"what-are-you-building",level:2},{value:"What are you given",id:"what-are-you-given",level:2},{value:"To the teacher",id:"to-the-teacher",level:2},{value:"Presentation Slides",id:"presentation-slides",level:2}],c={toc:l};function h(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Nitcbase Intro Pic",src:a(8716).Z,width:"1854",height:"1114"})),(0,r.kt)("hr",null),(0,r.kt)("h1",{id:"nitcbase--rdbms-implementation-project"},"NITCbase : RDBMS Implementation Project"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"NITCbase is a Relational Database Management System (RDBMS) implementation project that is intended to help an undergraduate student understand the design and data structures of an elementary RDBMS by implementing one herself."),(0,r.kt)("p",null,"A step-by-step implementation roadmap of the project guides you through various stages of implementation of the RDBMS. The documentation of the project includes tutorials that help you to assimilate the concepts as well as the data structures and design details that you need to understand at each phase of the project. The complete design and specification of the RDBMS and its various component subsystems are also documented and made available."),(0,r.kt)("p",null,"NITCbase follows an eight layer design, with the basic capabilities of a standard relational database management system which includes, creation and deletion of tables, inserting records, selection queries and indexing using B+ Tree. The final RDBMS implemented by you will support elementary SQL queries such as create, drop, alter, insert, select, project, equi-join and also the queries for B+ Tree based indexing such as ",(0,r.kt)("em",{parentName:"p"},"create index")," and ",(0,r.kt)("em",{parentName:"p"},"drop index"),". Currently, NITCbase does not support concurrency."),(0,r.kt)("h2",{id:"what-are-you-building"},"What are you building"),(0,r.kt)("p",null,"The eight layer design of NITCbase starts with the Physical Layer at the bottom, progresses to Buffer Layer, B+ Tree Layer, Block Access Layer, Cache Layer, Algebra Layer and Schema Layer at the intermediate levels and a Frontend Interface for interacting with the users at the top."),(0,r.kt)("p",null,"The following diagram gives an idea of the system that we are building and its components on a high level."),(0,r.kt)("br",null),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Basic Overview",src:a(6643).Z,width:"550",height:"621"})),(0,r.kt)("p",null,"A more detailed overview is given below."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Overview Diagram",src:a(1822).Z,width:"1015",height:"795"})),(0,r.kt)("p",null,"An even more detailed diagram can be found on the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Architecture"},"architecture page"),"."),(0,r.kt)("p",null,"A still more detailed diagram can be found on the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/DesignDiagram"},"system design page"),"."),(0,r.kt)("p",null,"There are two command-line interfaces for NITCbase:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Frontend"},"Frontend Interface")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/XFS%20Interface"},"XFS Interface"))),(0,r.kt)("p",null,"Since NITCbase is a relational database, it supports execution of SQL-like queries on these command-line interfaces. The XFS Disk is the single storage unit for all data present in NITCbase. In addition to storing the relations, records and indexes, the disk also stores meta data necessary for organizing, accessing, indexing and modifying the data."),(0,r.kt)("h2",{id:"what-are-you-given"},"What are you given"),(0,r.kt)("p",null,"This project assumes that you are working on a Unix/Linux system. The documentation specifies how the NITCbase RDBMS system can be implemented in the C++ programming language. The following are provided to you to get started on the project:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"A complete implementation of a command line user interface called XFS Interface")," that allows a user to ",(0,r.kt)("em",{parentName:"p"},"access the system\u2019s simulated disk from the host")," (Linux/Unix environment) and allows operations such as"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"formatting the disk to the NITCbase file system format"),(0,r.kt)("li",{parentName:"ul"},"transferring files to and from the host system to the NITCbase file system"),(0,r.kt)("li",{parentName:"ul"},"supporting standard NITCbase - ",(0,r.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/ddl"},"Data Definition Language (DDL)")," and ",(0,r.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/dml"},"Data Manipulation Language (DML)")," operations on the database file system and so on.")),(0,r.kt)("br",null)),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"A complete implementation of the Disk class"),", implemented in ",(0,r.kt)("inlineCode",{parentName:"p"},"Disk.cpp"),", that provides a bare minimum C++ programming interface to the NITCbase disk. The methods ",(0,r.kt)("inlineCode",{parentName:"p"},"readBlock()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"writeBlock()")," in this class allow for the transfer of one block of data from and to the XFS disk.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Class definitions for various intermediate layers")," of the database system are provided. These are"),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"Buffer Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"StaticBuffer.cpp"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"BlockBuffer.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"Block Access Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"BlockAccess.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"Cache Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"OpenRelTable.cpp"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"RelCacheTable.cpp"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"AttrCacheTable.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"B+ Tree Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"BPlusTree.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"Schema Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"Schema.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"Algebra Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"Algebra.cpp"),")",(0,r.kt)("br",null),(0,r.kt)("br",null))),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"The code for the methods in these classes are not supplied.")," However, the documentation provides detailed descriptions of the algorithms corresponding to the non-trivial methods in these classes so that you can read and understand the algorithms and translate them to working C++ code.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"A partial implementation of the top-most layer of NITCbase - the Frontend Interface"),". The Frontend Interface of NITCbase is divided into two sub-modules: (a) Frontend User Interface (",(0,r.kt)("inlineCode",{parentName:"p"},"FrontendInterface.cpp"),") and (b) Frontend Programming Interface (",(0,r.kt)("inlineCode",{parentName:"p"},"Frontend.cpp"),"). The frontend user interface code is completely given to you. ",(0,r.kt)("strong",{parentName:"p"},"However, only the class declaration and functional specification of the frontend programming interface sub-module is provided"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Architecture"},"Documentation")," containing detailed specification and design of each of the above modules, specification of the database disk organization, specification of the system\u2019s high-level user interface, descriptions of the algorithms used in various modules, and a detailed tutorial on B+ tree operations are provided. ",(0,r.kt)("em",{parentName:"p"},"You will be required to refer to appropriate parts of the documentation while implementing various components of the RDBMS."))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"A ",(0,r.kt)("a",{parentName:"p",href:"/docs/Roadmap"},"roadmap")," that guides you in implementing the system through a sequence of stages. The stages are of roughly ascending complexity. Each stage builds on the previous stages and guides you to relevant parts of the documentation which you need to read and understand for the implementation of the stage. You will have built a fully functional implementation of the RDBMS at the end of all the stages."))),(0,r.kt)("p",null,"The project assumes that you have adequate background in programming in C/C++ and data structures.\nAt the end of the project, your code(approximately 3000 lines of C++ code) will allow the user to execute all NITCbase commands through the Frontend Interface."),(0,r.kt)("p",null,"Though not required to be read to get started on the project, a detailed design of the NITCbase system that will eventually be built at the end of all the stages is given in the design documentation linked ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Architecture"},"here"),"."),(0,r.kt)("p",null,"To begin with the project, continue to the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Roadmap"},"Roadmap"),"."),(0,r.kt)("h2",{id:"to-the-teacher"},"To the teacher"),(0,r.kt)("p",null,"We provide here a quick technical overview of the work involved in various layers of the NITCbase design. This section assumes that the reader is familiar with the theory of RDBMS, and hence is primarily written for the teacher to quickly find out what is done in the project. Please note that, although the NITCbase design organizes it into several layers, the roadmap does not ask the student to implement the project in a layer-by-layer manner. For a discussion of pedagogical principles on which the roadmap has been designed, we refer you to the writeup ",(0,r.kt)("a",{parentName:"p",href:"/AboutUs#nitcbase-philosophy"},"here"),"."),(0,r.kt)("p",null,"A brief functional description of the layers:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Frontend User Interface Sub-layer"),": This layer interacts with the user, and translates high level SQL-like queries from the user into calls to appropriate C++ functions in the Frontend Programming Interface Sub-layer."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The student is given the complete code for this layer (around 650 lines of C++ code) in the ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/tree/master/FrontendInterface"},(0,r.kt)("inlineCode",{parentName:"a"},"FrontendInterface")," folder"),".",(0,r.kt)("br",null),(0,r.kt)("br",null))),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Frontend Programming Interface Sub-layer"),": This is a layer of wrapper functions. Most of the functions of this layer just redirects the call to an appropriate function of the Algebra/Schema Layer. (Some complex queries such as the ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/dml#select--from-join-where"},"SELECT FROM JOIN WHERE")," command require a combination of calls to the lower layers). DDL commands are redirected to corresponding Schema Layer functions and DML commands are redirected to corresponding Algebra Layer functions. The student needs to complete around 100 lines of C++ code for completing this layer."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The design of the layer is given ",(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Frontend#frontend-programming-interface"},"here"),"."),(0,r.kt)("li",{parentName:"ol"},"The student has to complete the code for this layer in the ",(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/stub/frontend"},"stub file"),"."),(0,r.kt)("li",{parentName:"ol"},"The header file ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Frontend/Frontend.h"},(0,r.kt)("inlineCode",{parentName:"a"},"Frontend.h"))," must be included.",(0,r.kt)("br",null),(0,r.kt)("br",null)))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Schema Layer"),": All DDL commands of NITCbase - such as commands for creating, deleting, opening, closing and renaming relations; commands for renaming attributes of a relation and so on - are implemented in this layer. Thus, the layer contains important functions of the database system. While the main logic behind each DDL command is implemented here, all disk data access is made by invoking functions of the following lower layers: (1) Cache Layer - for accessing meta-data associated with open relations (2) Block Access Layer - for accessing disk data of relations and (3) B+ Tree Layer - for creating indices. Hence the implementation of most of the functions (except that of creating a new relation) is quite straightforward. The student needs to write around 200 lines of C++ code for completing this layer."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The design of the layer is given ",(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Schema%20Layer"},"here"),"."),(0,r.kt)("li",{parentName:"ol"},"The student has to complete the code for this layer in the ",(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/stub/schema"},"stub file"),"."),(0,r.kt)("li",{parentName:"ol"},"The header file ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Schema/Schema.h"},(0,r.kt)("inlineCode",{parentName:"a"},"Schema.h"))," must be included.",(0,r.kt)("br",null),(0,r.kt)("br",null)))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Algebra Layer"),": Data Manipulation Language (DML) commands - Insert, Select, Project and Join - gets directed to this layer. However, this layer essentially performs some preprocessing of steps and eventually calls the Block Access Layer functions implementing select and project, and hence has relatively low implementation complexity aside from the join operation. The student needs to write around 400 lines of C++ code for completing this layer."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The design of the layer is given ",(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Algebra%20Layer"},"here"),"."),(0,r.kt)("li",{parentName:"ol"},"The student has to complete the code for this layer in the ",(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/stub/algebra"},"stub file"),"."),(0,r.kt)("li",{parentName:"ol"},"The header file ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Algebra/Algebra.h"},(0,r.kt)("inlineCode",{parentName:"a"},"Algebra.h"))," must be included.",(0,r.kt)("br",null),(0,r.kt)("br",null)))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Cache Layer"),": This layer implements the run time memory data structures associated with open relations of the database (the relation cache and the attribute cache), and involves mostly implementation of the cache data structures and access functions. The layer uses functions of the Buffer Layer below for accessing disk data. The student needs to write around 500 lines of C++ code for completing this layer."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The design of the layer is given ",(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Cache%20Layer/intro"},"here"),"."),(0,r.kt)("li",{parentName:"ol"},"The student has to complete the code for this layer in the ",(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/stub/cache"},"stub files"),"."),(0,r.kt)("li",{parentName:"ol"},"The header files ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Cache/AttrCacheTable.h"},(0,r.kt)("inlineCode",{parentName:"a"},"AttrCacheTable.h")),", ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Cache/RelCacheTable.h"},(0,r.kt)("inlineCode",{parentName:"a"},"RelCacheTable.h")),", ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Cache/OpenRelTable.h"},(0,r.kt)("inlineCode",{parentName:"a"},"OpenRelTable.h"))," must be included.",(0,r.kt)("br",null),(0,r.kt)("br",null)))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Block Access Layer"),": This layer contains the implementation of the fundamental DML operations - select and project - on relations. (It turns out that equi-join implementation can be implemented with select and project, and hence easily handled by the Algebra Layer by calling appropriate Block Access Layer functions). This is one of the most important modules that implements the core functionality of the database system and involves substantial implementation work. The student needs to write around 500 lines of C++ code for completing this layer."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The design of the layer is given ",(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Block%20Access%20Layer"},"here"),"."),(0,r.kt)("li",{parentName:"ol"},"The student has to complete the code for this layer in the ",(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/stub/block_access"},"stub file"),"."),(0,r.kt)("li",{parentName:"ol"},"The header file ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/BlockAccess/BlockAccess.h"},(0,r.kt)("inlineCode",{parentName:"a"},"BlockAccess.h"))," must be included.",(0,r.kt)("br",null),(0,r.kt)("br",null)))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"B+ Tree Layer"),": This layer handles indexing operations with B+ trees. The primary purpose of this layer is to simplify the work in the Block Access Layer by separating all B+ tree operations into a separate layer. The two main operations - B+ tree search and insertion are somewhat sophisticated operations and involve substantial implementation work. Hence, we provide several tutorials to aid learning and implementation (",(0,r.kt)("a",{parentName:"p",href:"docs/Misc/B+%20Trees"},"B+ Trees")," and ",(0,r.kt)("a",{parentName:"p",href:"/docs/Misc/Indexing#create-index"},"Indexing in NITCbase"),"). The student needs to write around 500 lines of C++ code for completing this layer."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The design of the layer is given ",(0,r.kt)("a",{parentName:"li",href:"/docs/Design/B+%20Tree%20Layer"},"here"),"."),(0,r.kt)("li",{parentName:"ol"},"The student has to complete the code for this layer in the ",(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/stub/bplus"},"stub file"),"."),(0,r.kt)("li",{parentName:"ol"},"The header file ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/BPlusTree/BPlusTree.h"},(0,r.kt)("inlineCode",{parentName:"a"},"BPlusTree.h"))," must be included.",(0,r.kt)("br",null),(0,r.kt)("br",null)))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Buffer Layer"),": The buffer layer is the lowest layer which is to be implemented by the student and handles the low level access to the disk (using the low disk read/write functions that is already implemented and given). The Block Access Layer, Cache Layer and B+ Tree Layer functions invoke these functions to perform disk access and update operations. The Buffer Layer maintains a disk buffer that can cache up to 32 disk blocks at a time. The layer contains several access functions that help higher layers to access the disk in suitable format. Buffer replacement is carried out using least recently (LRU) scheme. This layer contains quite a bit of code, as it hides the low level disk details and provides a clean interface to the higher layers. The student needs to write around 500 lines of C++ code for completing this layer."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The design of the layer is given ",(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Buffer%20Layer/intro"},"here"),"."),(0,r.kt)("li",{parentName:"ol"},"The student has to complete the code for this layer in the ",(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/stub/buffer"},"stub files"),"."),(0,r.kt)("li",{parentName:"ol"},"The header files ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Buffer/BlockBuffer.h"},(0,r.kt)("inlineCode",{parentName:"a"},"BlockBuffer.h"))," and ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Buffer/StaticBuffer.h"},(0,r.kt)("inlineCode",{parentName:"a"},"StaticBuffer.h"))," must be included.",(0,r.kt)("br",null),(0,r.kt)("br",null)))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Physical Layer"),": This is the lowest layer of the NITCbase design and mainly contains two low level disk access routines. The disk read function allows a disk block to be written into a memory buffer. The disk write function transfers data in a memory buffer into a specified disk block."),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"The student is given the complete code for this layer (around 70 lines of C++ code) in the ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Disk_Class/Disk.cpp"},(0,r.kt)("inlineCode",{parentName:"a"},"Disk.cpp"))," file."),(0,r.kt)("li",{parentName:"ol"},"The header file ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/NITCbase/nitcbase/blob/master/Disk/Disk.h"},(0,r.kt)("inlineCode",{parentName:"a"},"Disk.h"))," must be included.")))),(0,r.kt)("h2",{id:"presentation-slides"},"Presentation Slides"),(0,r.kt)("p",null,"A supplementary presentation which may aid the teacher in introducing the NITCbase project to students can be found ",(0,r.kt)("a",{target:"_blank",href:a(3382).Z},"here"),"."))}h.isMDXComponent=!0},3382:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/slides-71cebdf9b8b10dff41dcb0a05b0e6e47.pdf"},8716:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/FrontBannerLogo-0073fc4a8e9ba1da89480779ce0131e0.png"},1822:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/HomepageFigure-3caab8b424c41a15c0958e84619dc2c0.svg"},6643:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/archibasic-df34b752fb444770d77676542295d3ea.png"}}]);