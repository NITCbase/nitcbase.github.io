"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[8770],{3905:(t,e,a)=>{a.d(e,{Zo:()=>p,kt:()=>N});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var m=n.createContext({}),d=function(t){var e=n.useContext(m),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},p=function(t){var e=d(t.components);return n.createElement(m.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},u=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,m=t.parentName,p=o(t,["components","mdxType","originalType","parentName"]),u=d(a),N=r,k=u["".concat(m,".").concat(N)]||u[N]||s[N]||l;return a?n.createElement(k,i(i({ref:e},p),{},{components:a})):n.createElement(k,i({ref:e},p))}));function N(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=u;var o={};for(var m in e)hasOwnProperty.call(e,m)&&(o[m]=e[m]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var d=2;d<l;d++)i[d]=a[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},3566:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>m,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var n=a(7462),r=(a(7294),a(3905));const l={sidebar_position:3,title:"Data Manipulation Language Commands",tags:["Data","Manipulation","Commands","xfs","interface"]},i=void 0,o={unversionedId:"User Interface Commands/dml",id:"User Interface Commands/dml",title:"Data Manipulation Language Commands",description:"The Data Manipulation Language(DML) commands are used to manipulate the data stored in the relations of the database. DML Commands are supported by both XFS Interface and Frontend Interface. The following are the DML commands supported by NITCBase.",source:"@site/docs/User Interface Commands/dml.md",sourceDirName:"User Interface Commands",slug:"/User Interface Commands/dml",permalink:"/docs/User Interface Commands/dml",draft:!1,tags:[{label:"Data",permalink:"/docs/tags/data"},{label:"Manipulation",permalink:"/docs/tags/manipulation"},{label:"Commands",permalink:"/docs/tags/commands"},{label:"xfs",permalink:"/docs/tags/xfs"},{label:"interface",permalink:"/docs/tags/interface"}],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Data Manipulation Language Commands",tags:["Data","Manipulation","Commands","xfs","interface"]},sidebar:"Commands",previous:{title:"Data Definition Language Commands",permalink:"/docs/User Interface Commands/ddl"},next:{title:"XFS Commands",permalink:"/docs/User Interface Commands/efs"}},m={},d=[{value:"INSERT INTO TABLE VALUES",id:"insert-into-table-values",level:3},{value:"Description",id:"description",level:4},{value:"Syntax",id:"syntax",level:4},{value:"INSERT INTO TABLE FROM FILE",id:"insert-into-table-from-file",level:3},{value:"Description",id:"description-1",level:4},{value:"Syntax",id:"syntax-1",level:4},{value:"SELECT * FROM TABLE",id:"select--from-table",level:3},{value:"Description",id:"description-2",level:4},{value:"Syntax",id:"syntax-2",level:4},{value:"SELECT Attrlist FROM TABLE",id:"select-attrlist-from-table",level:3},{value:"Description",id:"description-3",level:4},{value:"Syntax",id:"syntax-3",level:4},{value:"SELECT * FROM TABLE WHERE",id:"select--from-table-where",level:3},{value:"Description",id:"description-4",level:4},{value:"Syntax",id:"syntax-4",level:4},{value:"SELECT Attrlist FROM TABLE WHERE",id:"select-attrlist-from-table-where",level:3},{value:"Description",id:"description-5",level:4},{value:"Syntax",id:"syntax-5",level:4},{value:"SELECT * FROM JOIN WHERE",id:"select--from-join-where",level:3},{value:"Description",id:"description-6",level:4},{value:"Syntax",id:"syntax-6",level:4},{value:"SELECT Attrlist FROM JOIN WHERE",id:"select-attrlist-from-join-where",level:3},{value:"Description",id:"description-7",level:4},{value:"Syntax",id:"syntax-7",level:4}],p={toc:d};function s(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The Data Manipulation Language(DML) commands are used to manipulate the data stored in the relations of the database. DML Commands are supported by both XFS Interface and Frontend Interface. The following are the DML commands supported by NITCBase."),(0,r.kt)("h3",{id:"insert-into-table-values"},"INSERT INTO TABLE VALUES"),(0,r.kt)("h4",{id:"description"},"Description"),(0,r.kt)("p",null,"This command is used to insert a single record into the given relation."),(0,r.kt)("h4",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"INSERT INTO tablename VALUES ( value1, value2, value3, ... )\n")),(0,r.kt)("admonition",{title:"Note",type:"info"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"The attribute values of the record are to be given as comma separated values in the same as the order of attributes in the relation."),(0,r.kt)("li",{parentName:"ul"},"The number and types of the attribute values of the record to be inserted into relation must match.\n:::",(0,r.kt)("admonition",{parentName:"li",title:"Example",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Given below are the records of the relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Students"),".")))),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Rollno"),(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"CGPA"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"Anu"),(0,r.kt)("td",{parentName:"tr",align:null},"9.01")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"4"),(0,r.kt)("td",{parentName:"tr",align:null},"Cody"),(0,r.kt)("td",{parentName:"tr",align:null},"7")))),(0,r.kt)("p",{parentName:"admonition"},"Suppose that we need to insert a new record ",(0,r.kt)("inlineCode",{parentName:"p"},"2, Amy, 9.5")," into the relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Students"),"."),(0,r.kt)("p",{parentName:"admonition"},"The query for doing that will be the following:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"INSERT INTO Students VALUES (2, Amy, 9.5)\n")),(0,r.kt)("p",{parentName:"admonition"},"The records of the relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Students")," will now be:"),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Rollno"),(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"CGPA"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"Anu"),(0,r.kt)("td",{parentName:"tr",align:null},"9.01")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"4"),(0,r.kt)("td",{parentName:"tr",align:null},"Cody"),(0,r.kt)("td",{parentName:"tr",align:null},"7")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"Amy"),(0,r.kt)("td",{parentName:"tr",align:null},"9.5"))))),(0,r.kt)("h3",{id:"insert-into-table-from-file"},"INSERT INTO TABLE FROM FILE"),(0,r.kt)("h4",{id:"description-1"},"Description"),(0,r.kt)("p",null,"This command is used to insert multiple records into an already existing relation, ",(0,r.kt)("inlineCode",{parentName:"p"},"tablename")," from a CSV file, ",(0,r.kt)("inlineCode",{parentName:"p"},"filename.csv")," containing values for the attributes of the relation."),(0,r.kt)("h4",{id:"syntax-1"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"INSERT INTO tablename VALUES FROM filename\n")),(0,r.kt)("admonition",{title:"Note",type:"info"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Each line in the CSV file corresponds to a record to be inserted in to the specified relation."),(0,r.kt)("li",{parentName:"ul"},"The order of attribute values in each line of the CSV file must be same as that of the attributes of the relation."),(0,r.kt)("li",{parentName:"ul"},"The number and types of attribute values in each row should match the number and types of the attributes of the specified relation."),(0,r.kt)("li",{parentName:"ul"},"The CSV file should not contain any ",(0,r.kt)("inlineCode",{parentName:"li"},"null")," values."),(0,r.kt)("li",{parentName:"ul"},"The CSV file from which the values are to be inserted, must be stored in the path ",(0,r.kt)("inlineCode",{parentName:"li"},"NITCBase/Files/Input_Files"),".\n:::",(0,r.kt)("admonition",{parentName:"li",title:"Example",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Here is an example of a CSV file, ",(0,r.kt)("inlineCode",{parentName:"p"},"students.csv")," containing the records for insertion into an already existing relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Students"),":")))),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-c",metastring:'title="/Files/students.csv"',title:'"/Files/students.csv"'},"3,Sunny,8\n5,Sania,6\n7,Ralph,7.5\n")),(0,r.kt)("p",{parentName:"admonition"},"The query to insert all records contained in above file to the ",(0,r.kt)("inlineCode",{parentName:"p"},"Students")," relation will be:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"INSERT INTO Students VALUES FROM students.csv\n"))),(0,r.kt)("h3",{id:"select--from-table"},"SELECT ","*"," FROM TABLE"),(0,r.kt)("h4",{id:"description-2"},"Description"),(0,r.kt)("p",null,"This command creates a new target relation with the same attributes as that of source relation, and inserts into it all records from the source relation."),(0,r.kt)("h4",{id:"syntax-2"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT * FROM source_relation INTO target_relation\n")),(0,r.kt)("admonition",{title:"Example",type:"note"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT * FROM Students INTO Target_Students\n"))),(0,r.kt)("h3",{id:"select-attrlist-from-table"},"SELECT Attrlist FROM TABLE"),(0,r.kt)("h4",{id:"description-3"},"Description"),(0,r.kt)("p",null,"This command creates a new target relation with the attributes specified in ",(0,r.kt)("inlineCode",{parentName:"p"},"Attrlist"),", and inserts all records(only the values corresponding to the specified attributes) of the source relation, into the newly created target relation."),(0,r.kt)("h4",{id:"syntax-3"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT Attribute1, Attribute2, ... FROM source_relation INTO target_relation\n")),(0,r.kt)("admonition",{title:"Example",type:"note"},(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT Name, CGPA FROM Students INTO Target_Students\n"))),(0,r.kt)("h3",{id:"select--from-table-where"},"SELECT ","*"," FROM TABLE WHERE"),(0,r.kt)("h4",{id:"description-4"},"Description"),(0,r.kt)("p",null,"This command is used to retrieve all records of a given source relation, and insert them into a target relation, based on the the given condition. All records in the source relation that satisfy the condition, will be inserted into the newly created target relation."),(0,r.kt)("h4",{id:"syntax-4"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT * FROM source_relation INTO target_relation WHERE attrname OP value\n")),(0,r.kt)("admonition",{title:"Note",type:"info"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Here, ",(0,r.kt)("inlineCode",{parentName:"li"},"OP")," should only take a value from the set ",(0,r.kt)("inlineCode",{parentName:"li"},"{ =, >, <, >=, <=, != }"),".\n:::\n:::note Example")),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT * FROM Students INTO Target_Students WHERE CGPA > 8\n"))),(0,r.kt)("h3",{id:"select-attrlist-from-table-where"},"SELECT Attrlist FROM TABLE WHERE"),(0,r.kt)("h4",{id:"description-5"},"Description"),(0,r.kt)("p",null,"This command creates a new target relation with the attributes specified in ",(0,r.kt)("inlineCode",{parentName:"p"},"Attrlist"),", and inserts those records (only the values corresponding to the attributes specified in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Attrlist"),") from the source relation which satisfy the given condition."),(0,r.kt)("h4",{id:"syntax-5"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT Attribute1, Attribute2, ... FROM source_relation INTO target_relation WHERE attrname OP value\n")),(0,r.kt)("admonition",{title:"Note",type:"info"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Here, ",(0,r.kt)("inlineCode",{parentName:"li"},"OP")," should only take a value from the set ",(0,r.kt)("inlineCode",{parentName:"li"},"{ =, >, <, >=, <=, != }"),".\n:::\n:::note Example")),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT Name, CGPA FROM Students INTO Target_Students WHERE CGPA > 8\n"))),(0,r.kt)("h3",{id:"select--from-join-where"},"SELECT ","*"," FROM JOIN WHERE"),(0,r.kt)("h4",{id:"description-6"},"Description"),(0,r.kt)("p",null,"This command creates a new target relation with attributes constituting from both the source relations (excluding specified attribute from second source relation). It inserts the records obtained by ",(0,r.kt)("inlineCode",{parentName:"p"},"equi-join")," of both the source relations (an attribute from each relation specified in arguments are used for ",(0,r.kt)("inlineCode",{parentName:"p"},"equi-join"),") into the target relation."),(0,r.kt)("h4",{id:"syntax-6"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT * FROM source_relation1 JOIN source_relation2 INTO target_relation WHERE source_relation1.attribute1 = source_relation2.attribute2\n")),(0,r.kt)("admonition",{title:"Note",type:"info"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"attribute1")," should belong to ",(0,r.kt)("inlineCode",{parentName:"li"},"source_relation1")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"attribute2")," should belong to ",(0,r.kt)("inlineCode",{parentName:"li"},"source_relation2"),"."),(0,r.kt)("li",{parentName:"ul"},"The join attributes (i.e., ",(0,r.kt)("inlineCode",{parentName:"li"},"attribute1")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"attribute2"),") can have the same name."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Excluding the join attributes, there should be no other attributes with the same name in these relations."),"\n:::",(0,r.kt)("admonition",{parentName:"li",title:"Example",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Given below are the records of the relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Student1"),".")))),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Rollno"),(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Batch"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"Anu"),(0,r.kt)("td",{parentName:"tr",align:null},"A")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"Cody"),(0,r.kt)("td",{parentName:"tr",align:null},"B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"Amy"),(0,r.kt)("td",{parentName:"tr",align:null},"B")))),(0,r.kt)("p",{parentName:"admonition"},"Given below are the records of the relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Student2"),"."),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Rollno"),(0,r.kt)("th",{parentName:"tr",align:null},"Marks"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"98")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"80")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"97")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"4"),(0,r.kt)("td",{parentName:"tr",align:null},"67")))),(0,r.kt)("p",{parentName:"admonition"},"An example for a join query is:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT * FROM Students1 JOIN Students2 INTO Students WHERE Students1.Rollno = Students2.Rollno\n")),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"Equi-join")," on these two relations based on the attribute ",(0,r.kt)("inlineCode",{parentName:"p"},"Rollno")," would result in the following target relation, ",(0,r.kt)("inlineCode",{parentName:"p"},"Students"),"."),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Rollno"),(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Batch"),(0,r.kt)("th",{parentName:"tr",align:null},"Marks"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"Anu"),(0,r.kt)("td",{parentName:"tr",align:null},"A"),(0,r.kt)("td",{parentName:"tr",align:null},"98")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"Cody"),(0,r.kt)("td",{parentName:"tr",align:null},"B"),(0,r.kt)("td",{parentName:"tr",align:null},"80")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"Amy"),(0,r.kt)("td",{parentName:"tr",align:null},"B"),(0,r.kt)("td",{parentName:"tr",align:null},"97"))))),(0,r.kt)("h3",{id:"select-attrlist-from-join-where"},"SELECT Attrlist FROM JOIN WHERE"),(0,r.kt)("h4",{id:"description-7"},"Description"),(0,r.kt)("p",null,"This command creates a new target relation with attributes given in ",(0,r.kt)("inlineCode",{parentName:"p"},"Attrlist"),". It inserts the records (only the values of the specified attributes in ",(0,r.kt)("inlineCode",{parentName:"p"},"Attrlist")," obtained by ",(0,r.kt)("inlineCode",{parentName:"p"},"equi-join")," of both the source relations (an attribute from each relation specified in arguments are used for equi-join) into the target relation."),(0,r.kt)("h4",{id:"syntax-7"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT Attribute1, Attribute2, ... FROM source_relation1 JOIN source_relation2 INTO target_relation WHERE source_relation1.attribute1 = source_relation2.attribute2\n")),(0,r.kt)("admonition",{title:"Note",type:"info"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"attribute1")," should belong to ",(0,r.kt)("inlineCode",{parentName:"li"},"source_relation1")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"attribute2")," should belong to ",(0,r.kt)("inlineCode",{parentName:"li"},"source_relation2"),"."),(0,r.kt)("li",{parentName:"ul"},"The join attributes(ie ",(0,r.kt)("inlineCode",{parentName:"li"},"attribute1")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"attribute2"),") can have the same name."),(0,r.kt)("li",{parentName:"ul"},"Excluding the join attributes, there should be no other attributes with the same name in these relations.\n:::",(0,r.kt)("admonition",{parentName:"li",title:"Example",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Given below are the records of the relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Student1"),".")))),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Rollno"),(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Batch"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"Anu"),(0,r.kt)("td",{parentName:"tr",align:null},"A")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"Cody"),(0,r.kt)("td",{parentName:"tr",align:null},"B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"Amy"),(0,r.kt)("td",{parentName:"tr",align:null},"B")))),(0,r.kt)("p",{parentName:"admonition"},"Given below are the records of the relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Student2"),"."),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Rollno"),(0,r.kt)("th",{parentName:"tr",align:null},"Marks"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"98")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"80")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"97")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"4"),(0,r.kt)("td",{parentName:"tr",align:null},"67")))),(0,r.kt)("p",{parentName:"admonition"},"An example for a join query is:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SELECT Rollno, Name, Marks FROM Students1 JOIN Students2 INTO Students WHERE Students1.Rollno = Students2.Rollno\n")),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"Equi-join")," on these two relations based on the attribute ",(0,r.kt)("inlineCode",{parentName:"p"},"Rollno")," would result in the following target relation, ",(0,r.kt)("inlineCode",{parentName:"p"},"Students"),"."),(0,r.kt)("table",{parentName:"admonition"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Rollno"),(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Marks"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"Anu"),(0,r.kt)("td",{parentName:"tr",align:null},"98")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"Cody"),(0,r.kt)("td",{parentName:"tr",align:null},"80")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"Amy"),(0,r.kt)("td",{parentName:"tr",align:null},"97"))))))}s.isMDXComponent=!0}}]);