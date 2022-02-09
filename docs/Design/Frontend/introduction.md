---
sidebar_position: 1
title: 'Frontend Introduction'
tags:
  - introduction
  - frontend
  - interface
---
import FrontendExplanationSrc from '../../../static/img/FrontendExplanation.png';


The RDBMS code must include a frontend code that interacts with the user and accepts user commands to the RDBMS.  This frontend code needs to translate the Data Definition Language (DDL), Data Manipulation Language (DML) and script commands from the user to function calls at the lower layers. The code for the frontend of NITCbase is divided into two sub-modules - **Frontend user interface** and **Frontend programming interface**.  

The part of the frontend that interacts with the user directly is already implemented and is supplied to you along with the documentation for the project. This part is called the frontend user interface submodule and its implementation can be found in the file `frontend-runner.cpp`. 

*The frontend user interface translates each high level DDL and DML commands from the user to invocations of specific functions which are part of the second submodule called front-end programming interface*. A C++ class file that contains the declarations of various functions of the frontend programming interface can be found in the file `Frontend.cpp`.  

The code implementing the functions of the front end programming interface submodule is **not** supplied as part of the documentation. Each function of this submodule must be designed by the student to invoke lower layer functions of schema layer and algebra layer for meeting their functional requirements, and must return appropriate values to the front end user interface submodule.  



<img src={FrontendExplanationSrc} alt="FrontendExplanation" width="700"/>


Frontend user interface is supplied to you and hence you do not need to implement. It will translate the input SQL-like queries, extracts the arguments and calls the appropriate methods of the Frontend Class / Frontend Programming Interface. Refer to the [Frontend Programming Interface](Frontend%20Programming%20Interface) section for specifications of the C++ Frontend Class.

