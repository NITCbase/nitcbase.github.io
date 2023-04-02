"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[2002],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>h});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),p=c(a),h=r,u=p["".concat(s,".").concat(h)]||p[h]||d[h]||o;return a?n.createElement(u,l(l({ref:t},m),{},{components:a})):n.createElement(u,l({ref:t},m))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=p;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var c=2;c<o;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}p.displayName="MDXCreateElement"},1157:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=a(7462),r=(a(7294),a(3905));const o={title:"Stage 9 : Selection and Projection on Relations"},l="Stage 9 : Selection and Projection on Relations (10 hours)",i={unversionedId:"Roadmap/Stage09",id:"Roadmap/Stage09",title:"Stage 9 : Selection and Projection on Relations",description:"- Complete the implementation of the NITCbase commands that do the following operations",source:"@site/docs/Roadmap/Stage09.md",sourceDirName:"Roadmap",slug:"/Roadmap/Stage09",permalink:"/docs/Roadmap/Stage09",draft:!1,tags:[],version:"current",frontMatter:{title:"Stage 9 : Selection and Projection on Relations"},sidebar:"Roadmap",previous:{title:"Stage 8 : Creating and Deleting Relations",permalink:"/docs/Roadmap/Stage08"}},s={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Implementation",id:"implementation",level:2},{value:"Exercises",id:"exercises",level:2}],m={toc:c};function d(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,n.Z)({},m,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"stage-9--selection-and-projection-on-relations-10-hours"},"Stage 9 : Selection and Projection on Relations (10 hours)"),(0,r.kt)("admonition",{title:"Learning Objectives",type:"note"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Complete the implementation of the NITCbase commands that do the following operations",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"selection"),(0,r.kt)("li",{parentName:"ul"},"projection"),(0,r.kt)("li",{parentName:"ul"},"a combination of both selection and projection"))))),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"In previous stages, you had implemented linear search on relations and a rudimentary version of the ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/dml#select--from-table-where"},"SELECT")," command to select records from a relation. In this stage, we will complete the implementation of the select operation and the projection operation."),(0,r.kt)("p",null,"As discussed earlier, a selection operation in relational algebra involves fetching all records that satisfy some condition. Our previous implementation would select records from a relation and print them to the console. The actual NITCbase specification defines the select operation as selecting records from a relation and creating a new relation with that subset of records. Since we have now implemented relation creation, we can finish our implementation of the ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/dml#select--from-table-where"},"SELECT ","*"," FROM TABLE WHERE")," command."),(0,r.kt)("p",null,"A projection operation is used to pick a subset of columns from the relation. In NITCbase, doing a project operation on a relation would result in the creation of a new relation with a subset of the attributes of the source relation. The required attributes will be picked from each record and inserted into the new relation."),(0,r.kt)("p",null,"Once you implement the ",(0,r.kt)("inlineCode",{parentName:"p"},"select()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"project()")," operations in the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Algebra%20Layer"},"Algebra Layer"),", you will be able to add the following commands to your NITCbase using a combination of the two functions."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Frontend User Interface Command"),(0,r.kt)("th",{parentName:"tr",align:null},"Operation"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/User%20Interface%20Commands/dml#select--from-table-where"},"SELECT ","*"," FROM RelName INTO TargetName WHERE Attribute ",(0,r.kt)("inlineCode",{parentName:"a"},"op")," value")),(0,r.kt)("td",{parentName:"tr",align:null},"selection")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/User%20Interface%20Commands/dml#select--from-table"},"SELECT ","*"," FROM RelName INTO TargetName")),(0,r.kt)("td",{parentName:"tr",align:null},"projection (clone relation)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/User%20Interface%20Commands/dml#select-attrlist-from-table"},"SELECT Attr1,Attr2 FROM RelName INTO TargetName")),(0,r.kt)("td",{parentName:"tr",align:null},"projection")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/User%20Interface%20Commands/dml#select-attrlist-from-table-where"},"SELECT Attr1,Attr2 FROM RelName INTO TargetName WHERE Attr ",(0,r.kt)("inlineCode",{parentName:"a"},"op")," value")),(0,r.kt)("td",{parentName:"tr",align:null},"selection ",(0,r.kt)("strong",{parentName:"td"},"and")," projection")))),(0,r.kt)("h2",{id:"implementation"},"Implementation"),(0,r.kt)("p",null,"A sequence diagram documenting the call sequence involved in a call to the ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/dml##select-attrlist-from-table-where"},"SELECT AttrList FROM TABLE WHERE")," command is shown below. The calls to the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Cache%20Layer/intro"},"Cache Layer")," and ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Buffer%20Layer/intro"},"Buffer Layer")," are omitted for the sake of clarity."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"NOTE"),": The functions are denoted with circles as follows.",(0,r.kt)("br",null),"\n\ud83d\udd35 -> methods that are already in their final state",(0,r.kt)("br",null),"\n\ud83d\udfe2 -> methods that will attain their final state in this stage",(0,r.kt)("br",null),"\n\ud83d\udfe4 -> methods that we built earlier and require more work later, but will leave as is in this stage")),(0,r.kt)("br",null),(0,r.kt)("mermaid",{value:" %%{init: { 'sequence': {'mirrorActors':false} } }%%\nsequenceDiagram\n    actor User\n    participant Frontend User Interface\n    participant Frontend Programming Interface\n    participant Algebra Layer\n    participant Schema Layer\n    participant Block Access Layer\n    User->>Frontend User Interface: SELECT attr1,attr2 FROM table\n    activate Frontend User Interface\n    Frontend User Interface->>Frontend Programming Interface:select_attrlist_from_table()\ud83d\udfe2\n    activate Frontend Programming Interface\n    Frontend Programming Interface->>Algebra Layer:project()\ud83d\udfe2\n    activate Algebra Layer\n\t\tAlgebra Layer->>Schema Layer:createRel()\ud83d\udd35\n\t\tactivate Schema Layer\n\t\tSchema Layer--\x3e>Algebra Layer: operation status\n\t\tdeactivate Schema Layer\n\t\tnote right of Algebra Layer: open new relation for insertion of records\n    loop for every record of source relation\n      Algebra Layer->>Block Access Layer:project()\ud83d\udfe2\n      activate Block Access Layer\n\t\t\tnote over Block Access Layer, Block Access Layer: fetch record from buffer<br/>and update search index\n\t\t\tBlock Access Layer--\x3e>Algebra Layer: a record\n\t\t\tdeactivate Block Access Layer\n\t\t\tnote right of Algebra Layer: create copy of record with only required attributes\n\t\t\tAlgebra Layer->>Block Access Layer: insert()\ud83d\udd35\n\t\t\tactivate Block Access Layer\n\t\t\tnote over Block Access Layer,Block Access Layer: insert records to buffer<br/>and update cache\n\t\t\tBlock Access Layer--\x3e>Algebra Layer:operation status\n\t\t\tdeactivate Block Access Layer\n    end\n    Algebra Layer--\x3e>User:operation status\n    deactivate Algebra Layer\n    deactivate Frontend Programming Interface\n    deactivate Frontend User Interface\n"}),(0,r.kt)("br",null),(0,r.kt)("p",null,"A class diagram highlighting the methods relevant to this stage is shown below."),(0,r.kt)("mermaid",{value:"classDiagram\n  class Algebra{\n    +insert(char relName[ATTR_SIZE], int nAttrs, char record[][ATTR_SIZE])$ int\ud83d\udd35\n    +select(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], char attr[ATTR_SIZE], int op, char strVal[ATTR_SIZE])$ int\ud83d\udfe2\n\t\t+project(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE])$ int\ud83d\udfe2\n\t\t+project(char srcRel[ATTR_SIZE], char targetRel[ATTR_SIZE], int tar_nAttrs, char tar_Attrs[][ATTR_SIZE])$ int\ud83d\udfe2\n  }"}),(0,r.kt)("mermaid",{value:"classDiagram\n  class BlockAccess{\n    +linearSearch(int relId, char attrName[ATTR_SIZE], Attribute attrVal, int op)$ RecId\ud83d\udd35\n    +renameRelation(char oldName[ATTR_SIZE], char newName[ATTR_SIZE])$ int\ud83d\udd35\n    +renameAttribute(char relName[ATTR_SIZE], char oldName[ATTR_SIZE], char newName[ATTR_SIZE])$ int\ud83d\udd35\n    +insert(int relId, union Attribute* record)$ int\ud83d\udfe4\n    +search(int relId, Attribute *record, char attrName[ATTR_SIZE], Attribute attrVal, int op)$ int\ud83d\udfe4\n    +deleteRelation(char relName[ATTR_SIZE])$ int\ud83d\udfe4\n\t\t+project(int relId, Attribute *record)$ int\ud83d\udfe2\n  }"}),(0,r.kt)("br",null),(0,r.kt)("p",null,"In the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Block%20Access%20Layer"},"Block Access Layer"),", we implement the ",(0,r.kt)("inlineCode",{parentName:"p"},"project()")," function. This function is used to fetch every record of the relation one by one. Similar to the ",(0,r.kt)("inlineCode",{parentName:"p"},"linearSearch()")," function you implemented earlier, ",(0,r.kt)("inlineCode",{parentName:"p"},"project()")," makes use of the ",(0,r.kt)("inlineCode",{parentName:"p"},"searchIndex")," in the relation cache to keep track of the last read record. As a result of this, ",(0,r.kt)("inlineCode",{parentName:"p"},"RelCacheTable::resetSearchIndex()")," will need to be called before a project operation is done."),(0,r.kt)("details",null,(0,r.kt)("summary",null,"BlockAccess/BlockAccess.cpp"),(0,r.kt)("p",null,"Implement this function by looking at the algorithm given in the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Block%20Access%20Layer#blockaccess--project"},"design docs"),".")),(0,r.kt)("p",null,"In the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Algebra%20Layer"},"Algebra Layer"),", you had already implemented part of the ",(0,r.kt)("inlineCode",{parentName:"p"},"select()")," function in previous stages. In this stage, you will modify the function to create a new relation and insert the selected records into the new relation. This will be the final state of this function."),(0,r.kt)("p",null,"We also add two new overloaded functions ",(0,r.kt)("inlineCode",{parentName:"p"},"project(srcRel, targetRel)")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"project(srcRel, targetRel, numAttrs, attrs)")," which are responsible for the ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/dml#select--from-table"},"SELECT ","*"," FROM TABLE")," and ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/dml#select-attrlist-from-table"},"SELECT AttrList FROM TABLE")," commands respectively. Note that the ",(0,r.kt)("inlineCode",{parentName:"p"},"project(relId, record)")," function is used to create a copy of the source relation."),(0,r.kt)("details",null,(0,r.kt)("summary",null,"Algebra/Algebra.cpp"),(0,r.kt)("p",null,"Implement the following functions looking at their respective design docs"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Algebra%20Layer#all-attributes-copy-relation"},(0,r.kt)("inlineCode",{parentName:"a"},"Algebra::project(srcRel, targetRel)"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Algebra%20Layer#specified-attributes"},(0,r.kt)("inlineCode",{parentName:"a"},"Algebra::project(srcRel, targetRel, numAttrs, attrs)"))))),(0,r.kt)("p",null,"Finally, in the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Frontend#frontend-programming-interface"},"Frontend Programming Interface"),", we update the handlers of the functions to call the respective ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Algebra%20Layer"},"Algebra Layer")," methods."),(0,r.kt)("p",null,"Contrary to what we are used to, the implementation of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Frontend::select_attrlist_from_table_where()")," function involves more than just a call to a lower layer method. Since this operation is a combination of both selection and projection, it requires calls to both the corresponding methods."),(0,r.kt)("p",null,"The function implementation involves creating an intermediate relation which holds the result of one of the operations. The second operation is done on this intermediate relation, following which the intermediate relation is deleted. NITCbase reserves the name of this intermediate relation as ",(0,r.kt)("inlineCode",{parentName:"p"},".temp")," (available to you as the constant ",(0,r.kt)("a",{parentName:"p",href:"/constants"},"TEMP"),")."),(0,r.kt)("details",null,(0,r.kt)("summary",null,"Frontend/Frontend.cpp"),(0,r.kt)("p",null,"Implement the following functions looking at their respective design docs"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Frontend#frontend--select_from_table"},(0,r.kt)("inlineCode",{parentName:"a"},"Frontend::select_from_table()"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Frontend#frontend--select_attrlist_from_table"},(0,r.kt)("inlineCode",{parentName:"a"},"Frontend::select_attrlist_from_table()"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Frontend#frontend--select_from_table_where"},(0,r.kt)("inlineCode",{parentName:"a"},"Frontend::select_from_table_where()"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/Design/Frontend#frontend--select_attrlist_from_table_where"},(0,r.kt)("inlineCode",{parentName:"a"},"Frontend::select_attrlist_from_table_where()"))))),(0,r.kt)("h2",{id:"exercises"},"Exercises"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Q1"),". Create a relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Toys(id NUM, name STR, colour STR, stock NUM)")," and insert the values from ",(0,r.kt)("a",{target:"_blank",href:a(2027).Z},"this file")," into it. Then, run the following commands in your NITCbase."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT name,colour FROM Toys INTO ToyColours;\nSELECT * FROM Toys INTO ToysForSale WHERE stock>10;\nSELECT * FROM Toys INTO ToysCopy;\nSELECT id,name FROM Toys INTO BlueToys WHERE colour=blue;\n")),(0,r.kt)("p",null,"Verify the contents of the new relations in the XFS Interface using either the ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/efs#print-relation"},"PRINT TABLE")," command or ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/efs#export-relation"},"EXPORT")," command."))}d.isMDXComponent=!0},2027:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/files/s9toys-d2bd1f098f139a7b802a97abcb17cf30.txt"}}]);