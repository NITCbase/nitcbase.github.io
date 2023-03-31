"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[7511],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),c=d(n),u=i,h=c["".concat(s,".").concat(u)]||c[u]||p[u]||l;return n?a.createElement(h,r(r({ref:t},m),{},{components:n})):a.createElement(h,r({ref:t},m))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,r=new Array(l);r[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var d=2;d<l;d++)r[d]=n[d];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2115:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const l={sidebar_position:2,title:"Data Definition Language Commands"},r=void 0,o={unversionedId:"User Interface Commands/ddl",id:"User Interface Commands/ddl",title:"Data Definition Language Commands",description:"The Data Definition Language(DDL) commands are used to define the database schema. They are used to create and delete relations, modify the structure of relations in the database and also create and delete indexes on the attributes of relations. DDL Commands are supported by both XFS Interface and Frontend Interface. The following are the DDL commands supported by NITCBase.",source:"@site/docs/User Interface Commands/ddl.md",sourceDirName:"User Interface Commands",slug:"/User Interface Commands/ddl",permalink:"/docs/User Interface Commands/ddl",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Data Definition Language Commands"},sidebar:"Commands",previous:{title:"User Interface Commands",permalink:"/docs/User Interface Commands/"},next:{title:"Data Manipulation Language Commands",permalink:"/docs/User Interface Commands/dml"}},s={},d=[{value:"CREATE TABLE",id:"create-table",level:3},{value:"Description",id:"description",level:4},{value:"Syntax",id:"syntax",level:4},{value:"DROP TABLE",id:"drop-table",level:3},{value:"Description",id:"description-1",level:4},{value:"Syntax",id:"syntax-1",level:4},{value:"OPEN TABLE",id:"open-table",level:3},{value:"Description",id:"description-2",level:4},{value:"Syntax",id:"syntax-2",level:4},{value:"CLOSE TABLE",id:"close-table",level:3},{value:"Description",id:"description-3",level:4},{value:"Syntax",id:"syntax-3",level:4},{value:"CREATE INDEX",id:"create-index",level:3},{value:"Description",id:"description-4",level:4},{value:"Syntax",id:"syntax-4",level:4},{value:"DROP INDEX",id:"drop-index",level:3},{value:"Description",id:"description-5",level:4},{value:"Syntax",id:"syntax-5",level:4},{value:"ALTER TABLE RENAME",id:"alter-table-rename",level:3},{value:"Description",id:"description-6",level:4},{value:"Syntax",id:"syntax-6",level:4},{value:"ALTER TABLE RENAME COLUMN",id:"alter-table-rename-column",level:3},{value:"Description",id:"description-7",level:4},{value:"Syntax",id:"syntax-7",level:4}],m={toc:d};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The Data Definition Language(DDL) commands are used to define the database schema. They are used to create and delete relations, modify the structure of relations in the database and also create and delete indexes on the attributes of relations. DDL Commands are supported by both XFS Interface and Frontend Interface. The following are the DDL commands supported by NITCBase."),(0,i.kt)("h3",{id:"create-table"},"CREATE TABLE"),(0,i.kt)("h4",{id:"description"},"Description"),(0,i.kt)("p",null,"This command is used to create a relation of the given name, with given attribute names and types. The type of an attribute can only be ",(0,i.kt)("inlineCode",{parentName:"p"},"NUM")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"STR")," for numbers and strings respectively."),(0,i.kt)("h4",{id:"syntax"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE tablename(attr1_name attr1_type, attr2_name attr2_type, ... )\n")),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("ul",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ul"},"In NITCBase, the ",(0,i.kt)("strong",{parentName:"li"},"maximum size of an attribute is 16 bytes"),"."),(0,i.kt)("li",{parentName:"ul"},"Since relation names and attribute names are attributes themselves in the catalog structures, the table name and attribute names in the queries must only have a maximum of 15 characters."),(0,i.kt)("li",{parentName:"ul"},"If the length is greater than 16, ",(0,i.kt)("strong",{parentName:"li"},"only the first 15 characters will be taken.")),(0,i.kt)("li",{parentName:"ul"},"All attribute names of the relation must be unique."))),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The following command will create a Relation called ",(0,i.kt)("inlineCode",{parentName:"p"},"sample")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"RollNo"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Name")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"CGPA")," as the attributes of types number, string and number respectively:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE sample(Rollno NUM, Name STR, CGPA NUM)\n"))),(0,i.kt)("h3",{id:"drop-table"},"DROP TABLE"),(0,i.kt)("h4",{id:"description-1"},"Description"),(0,i.kt)("p",null,"This command is used to delete the relation of the given name. It deletes all the record and index blocks corresponding to the relations, and also deletes the entries corresponding to the relation in the relation catalog and attribute catalog. The entries corresponding to the deleted blocks in the block allocation map are also reset."),(0,i.kt)("h4",{id:"syntax-1"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"DROP TABLE tablename\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The following command will delete the relation called ",(0,i.kt)("inlineCode",{parentName:"p"},"sample"),":"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"DROP TABLE sample\n"))),(0,i.kt)("h3",{id:"open-table"},"OPEN TABLE"),(0,i.kt)("h4",{id:"description-2"},"Description"),(0,i.kt)("p",null,"This command is used to open the relation specified for manipulation by updating the Cache/OpenRelTable."),(0,i.kt)("h4",{id:"syntax-2"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"OPEN TABLE tablename\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The following command will open the relation called ",(0,i.kt)("inlineCode",{parentName:"p"},"sample"),":"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"OPEN TABLE sample\n"))),(0,i.kt)("h3",{id:"close-table"},"CLOSE TABLE"),(0,i.kt)("h4",{id:"description-3"},"Description"),(0,i.kt)("p",null,"This command is used to close the relation specified by updating the Cache/OpenRelTable."),(0,i.kt)("h4",{id:"syntax-3"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"CLOSE TABLE tablename\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The following command will close the relation called ",(0,i.kt)("inlineCode",{parentName:"p"},"sample"),":"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"CLOSE TABLE sample\n"))),(0,i.kt)("h3",{id:"create-index"},"CREATE INDEX"),(0,i.kt)("h4",{id:"description-4"},"Description"),(0,i.kt)("p",null,"This command is used to create an index on a given attribute of a relation. ",(0,i.kt)("a",{parentName:"p",href:"https://nitcbase.github.io/design/Bplustreedetails.html"},"B+ trees")," are used for creating indexes. Before executing this query, the relation must be opened using the ",(0,i.kt)("inlineCode",{parentName:"p"},"OPEN TABLE")," command."),(0,i.kt)("h4",{id:"syntax-4"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE INDEX ON tablename.attributename\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The following command will create an index on the ",(0,i.kt)("inlineCode",{parentName:"p"},"Rollno")," attribute of the ",(0,i.kt)("inlineCode",{parentName:"p"},"sample")," relation:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE INDEX ON sample.Rollno\n"))),(0,i.kt)("h3",{id:"drop-index"},"DROP INDEX"),(0,i.kt)("h4",{id:"description-5"},"Description"),(0,i.kt)("p",null,"This command is used to drop/delete the B+ tree indexing on the given attribute of the given relation. Before executing this query, the relation must be opened using the ",(0,i.kt)("inlineCode",{parentName:"p"},"OPEN TABLE")," command."),(0,i.kt)("h4",{id:"syntax-5"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"DROP INDEX ON tablename.attributename\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The following command will drop the index on the ",(0,i.kt)("inlineCode",{parentName:"p"},"Rollno")," attribute of the ",(0,i.kt)("inlineCode",{parentName:"p"},"sample")," relation:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"DROP INDEX ON sample.Rollno\n"))),(0,i.kt)("h3",{id:"alter-table-rename"},"ALTER TABLE RENAME"),(0,i.kt)("h4",{id:"description-6"},"Description"),(0,i.kt)("p",null,"This command is used to rename an existing relation to the given new name."),(0,i.kt)("h4",{id:"syntax-6"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"ALTER TABLE RENAME tablename TO new_tablename\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The following command will rename the existing relation ",(0,i.kt)("inlineCode",{parentName:"p"},"sample")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"Students"),":"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"ALTER TABLE RENAME sample TO Students\n"))),(0,i.kt)("h3",{id:"alter-table-rename-column"},"ALTER TABLE RENAME COLUMN"),(0,i.kt)("h4",{id:"description-7"},"Description"),(0,i.kt)("p",null,"This command is used to rename an attribute of an existing relation to the given new name."),(0,i.kt)("h4",{id:"syntax-7"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"ALTER TABLE RENAME tablename COLUMN column_name TO new_column_name\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The following command will rename the the attribute of an existing relation ",(0,i.kt)("inlineCode",{parentName:"p"},"sample")," from ",(0,i.kt)("inlineCode",{parentName:"p"},"CGPA")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"SGPA"),":"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"ALTER TABLE RENAME sample COLUMN CGPA TO SGPA\n"))))}p.isMDXComponent=!0}}]);