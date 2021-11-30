import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
        <p>
            NITCbase is a Relational Database Management System Implementation (RDBMS) project that is intended to help an undergraduate student understand the design and data structures of an elementary RDBMS by implementing one herself.  A step-by-step implementation roadmap of the project guides the students through various stages of implementation of the RDBMS.  The documentation of the project includes tutorials that help the student to assimilate the concepts, data structures and design details that she needs to understand at each phase of the project.   The complete design of the RDBMS and specifications of the various component subsystems are clearly specified and are made available to the student.   The final RDBMS implemented by the student supports elementary SQL queries such as Select,  Project, Equi-Join and provides B+ Tree based Indexing.
        </p>
        <p>
            The database system design has a seven layer <a href="/design/sys_design.html">design</a>, starting from the Physical layer at the bottom  (a disk simulator provided to the student) progressing to Buffer layer, B+tree layer, Block access layer, Cache layer, Algebra layer and Schema layer at the intermediate levels and a Front-end command-line interface for user interface at the top.    All except the front-end and the physical layer completely implemented by the student, following the instructions of the road map (writing around 3000 lines of C++ code). 
        </p> 
        <p>
            The project assumes that the student has adequate background in programming in C/C++ and data structures.
        </p>
        <p> To begin with the project. Continue to the <a href="/roadmap.html">Roadmap</a>
        </p>
        </div>
      </div>
    </section>
  );
}
