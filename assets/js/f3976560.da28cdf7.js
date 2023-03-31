"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[2844],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),m=p(a),u=r,h=m["".concat(l,".").concat(u)]||m[u]||c[u]||i;return a?n.createElement(h,o(o({ref:t},d),{},{components:a})):n.createElement(h,o({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},672:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=a(7462),r=(a(7294),a(3905));const i={},o=void 0,s={type:"mdx",permalink:"/",source:"@site/src/pages/index.md",description:"Nitcbase Intro Pic",frontMatter:{}},l=[{value:"Introduction",id:"introduction",level:2},{value:"What are you building",id:"what-are-you-building",level:2},{value:"What are you given",id:"what-are-you-given",level:2}],p={toc:l};function d(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Nitcbase Intro Pic",src:a(8716).Z,width:"3708",height:"2228"})),(0,r.kt)("hr",null),(0,r.kt)("h1",{id:"nitcbase--rdbms-implementation-project"},"NITCbase : RDBMS Implementation Project"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"NITCbase is a Relational Database Management System Implementation (RDBMS) project that is intended to help an undergraduate student understand the design and data structures of an elementary RDBMS by implementing one herself."),(0,r.kt)("p",null,"A step-by-step implementation roadmap of the project guides you through various stages of implementation of the RDBMS. The documentation of the project includes tutorials that help you to assimilate the concepts as well as the data structures and design details that you need to understand at each phase of the project. The complete design and specification of the RDBMS and its various component subsystems are also documented and made available."),(0,r.kt)("p",null,"NITCbase follows a seven layer design, with the basic capabilities of a standard relational database management system which includes, creation and deletion of tables, inserting records, selection queries and indexing using B+ Tree. The final RDBMS implemented by you will support elementary SQL queries such as create, drop, alter, insert, select, project, equi-join and also the queries for B+ Tree based Indexing such as create index and drop index. Currently NITCbase does not support concurrency."),(0,r.kt)("h2",{id:"what-are-you-building"},"What are you building"),(0,r.kt)("p",null,"The seven layer design of NITCbase starts with the Physical layer at the bottom, progresses to Buffer layer, B+tree layer, Block access layer, Cache layer, Algebra layer and Schema layer at the intermediate levels and a Front-end command-line interface for interacting with the users at the top."),(0,r.kt)("p",null,"The following diagram gives an idea of the system that we are building and its components on a high level."),(0,r.kt)("br",null),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Basic Overview",src:a(6643).Z,width:"550",height:"621"})),(0,r.kt)("p",null,"A more detailed overview is given below."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Overview Diagram",src:a(1822).Z,width:"1015",height:"795"})),(0,r.kt)("p",null,"An even more detailed diagram can be found on the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Architecture"},"architecture page"),"."),(0,r.kt)("p",null,"An ",(0,r.kt)("strong",{parentName:"p"},"even even more")," detailed diagram can be found on the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/DesignDiagram"},"system design page"),"."),(0,r.kt)("p",null,"There are two command-line interfaces for NITCbase:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Frontend"},"Frontend Interface")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Misc/XFS%20Interface"},"XFS Interface"))),(0,r.kt)("p",null,"Since NITCbase is a relational database, it supports execution of SQL-like queries on these command-line interfaces. The NITCbase Disk is the single storage unit for all data present in NITCbase. In addition to storing the relations, records and indexes, the disk also stores meta data necessary for organizing, accessing, indexing and modifying the data."),(0,r.kt)("h2",{id:"what-are-you-given"},"What are you given"),(0,r.kt)("p",null,"This project assumes that you are working on a Unix/Linux system. The documentation specifies how the NITCBase RDBMS system can be implemented in C++ Language.\nThe following are provided to you to get started on the project:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"A complete implementation of a command line user interface called XFS-interface")," that allows a user to ",(0,r.kt)("em",{parentName:"p"},"access the system\u2019s simulated disk from the host")," (Linux/Unix environment) and allows operations such as"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"formatting the disk to the NITCbase file system format"),(0,r.kt)("li",{parentName:"ul"},"transferring files to and from the host system to the NITCbase file system"),(0,r.kt)("li",{parentName:"ul"},"supporting standard NITCBase - ",(0,r.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/ddl"},"Data Definition language (DDL)")," and ",(0,r.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/dml"},"Data Manipulation language (DML)")," operations on the database file system and so on.")),(0,r.kt)("br",null)),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"A complete implementation of the Disk class"),", implemented in ",(0,r.kt)("inlineCode",{parentName:"p"},"Disk.cpp"),", that provides a bare minimum C++ programming interface to the NITCBase disk. The code for the methods ",(0,r.kt)("inlineCode",{parentName:"p"},"write()")," & ",(0,r.kt)("inlineCode",{parentName:"p"},"read()")," in this class, that allows for the transfer of one block of data between a C++ program and the disk, is given to you.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Class definitions for various intermediate layers")," of the database system are provided. These are"),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"Buffer Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"StaticBuffer.cpp"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"BlockBuffer.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"Block Access Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"BlockAccess.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"Cache Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"OpenRelTable.cpp"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"RelCacheTable.cpp"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"AttrCacheTable.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"B+ Tree Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"BPlusTree.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"Schema Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"Schema.cpp"),")"),(0,r.kt)("li",{parentName:"ol"},"Algebra Layer (",(0,r.kt)("inlineCode",{parentName:"li"},"Algebra.cpp"),")",(0,r.kt)("br",null),(0,r.kt)("br",null))),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"The code for the methods in these classes are not supplied."))," However, the documentation provides detailed descriptions of the algorithms corresponding to the non-trivial methods in these classes so that you can read and understand the algorithms and translate them to working C++ code.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"A partial implementation of the top-most layer of NITCbase design - the Frontend Interface"),". The front-end interface of NITCbase is divided into two sub-modules: (a) Frontend user interface (",(0,r.kt)("inlineCode",{parentName:"p"},"FrontendInterface.cpp"),") and (b) Frontend programming interface (",(0,r.kt)("inlineCode",{parentName:"p"},"Frontend.cpp"),"). The frontend user interface code is completely given to you. ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"However, only the class declaration and functional specification of the frontend programming interface sub-module is provided")),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Architecture"},"Documentation")," containing detailed specification and design of each of the above modules, specification of the database disk organization, specification of the system\u2019s high-level user-interface, descriptions of the algorithms used in various modules, and a detailed tutorial on B+tree implementation are provided. ",(0,r.kt)("em",{parentName:"p"},"You will be required to refer to appropriate parts of the documentation while implementing various components of the RDBMS."))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"A ",(0,r.kt)("a",{parentName:"p",href:"/docs/Roadmap"},"roadmap")," that guides you in implementing the system through a sequence of stages. The stages are of roughly ascending complexity. Each stage builds on the previous stages and guides you to relevant parts of the documentation which you need to read and understand for the implementation of the stage. You will have built a fully functional implementation of the RDBMS at the end of all the stages."))),(0,r.kt)("p",null,"The project assumes that you have adequate background in programming in C/C++ and data structures.\nAt the end of the project, your code(approximately 3000 lines of C++ code) will allow the user to execute all NITCbase commands through the front-end interface."),(0,r.kt)("p",null,"Though not required to be read to get started on the project, a detailed design of the NITCbase system that will eventually be built at the end of all the stages is given in the design documentation linked ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Architecture"},"here"),"."),(0,r.kt)("p",null,"To begin with the project, continue to the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Roadmap"},"Roadmap"),"."))}d.isMDXComponent=!0},8716:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/FrontBannerLogo-2d1948667b9b13df9ab57f6b34668134.png"},1822:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/HomepageFigure-3caab8b424c41a15c0958e84619dc2c0.svg"},6643:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/archibasic-df34b752fb444770d77676542295d3ea.png"}}]);