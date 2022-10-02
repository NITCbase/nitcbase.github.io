"use strict";(self.webpackChunknitcbase_beta=self.webpackChunknitcbase_beta||[]).push([[7511],{3905:function(e,t,a){a.d(t,{Zo:function(){return m},kt:function(){return h}});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),d=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},m=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),p=d(a),h=i,u=p["".concat(s,".").concat(h)]||p[h]||c[h]||r;return a?n.createElement(u,l(l({ref:t},m),{},{components:a})):n.createElement(u,l({ref:t},m))}));function h(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,l=new Array(r);l[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var d=2;d<r;d++)l[d]=a[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}p.displayName="MDXCreateElement"},2115:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return m},default:function(){return p}});var n=a(7462),i=a(3366),r=(a(7294),a(3905)),l=["components"],o={sidebar_position:4,title:"Data Definition Language Commands",tags:["Data","Definition","Commands","xfs","interface"]},s=void 0,d={unversionedId:"User Interface Commands/ddl",id:"User Interface Commands/ddl",isDocsHomePage:!1,title:"Data Definition Language Commands",description:"The Data Definition Language(DDL) commands are used to define the database schema. They are used to create and delete relations, modify the structure of relations in the database and also create and delete indexes on the attributes of relations. DDL Commands are supported by both XFS Interface and Frontend Interface. The following are the DDL commands supported by NITCBase.",source:"@site/docs/User Interface Commands/ddl.md",sourceDirName:"User Interface Commands",slug:"/User Interface Commands/ddl",permalink:"/docs/User Interface Commands/ddl",tags:[{label:"Data",permalink:"/docs/tags/data"},{label:"Definition",permalink:"/docs/tags/definition"},{label:"Commands",permalink:"/docs/tags/commands"},{label:"xfs",permalink:"/docs/tags/xfs"},{label:"interface",permalink:"/docs/tags/interface"}],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Data Definition Language Commands",tags:["Data","Definition","Commands","xfs","interface"]}},m=[{value:"CREATE TABLE",id:"create-table",children:[{value:"Description",id:"description",children:[],level:4},{value:"Syntax",id:"syntax",children:[],level:4}],level:3},{value:"DROP TABLE",id:"drop-table",children:[{value:"Description",id:"description-1",children:[],level:4},{value:"Syntax",id:"syntax-1",children:[],level:4}],level:3},{value:"OPEN TABLE",id:"open-table",children:[{value:"Description",id:"description-2",children:[],level:4},{value:"Syntax",id:"syntax-2",children:[],level:4}],level:3},{value:"CLOSE TABLE",id:"close-table",children:[{value:"Description",id:"description-3",children:[],level:4},{value:"Syntax",id:"syntax-3",children:[],level:4}],level:3},{value:"CREATE INDEX",id:"create-index",children:[{value:"Description",id:"description-4",children:[],level:4},{value:"Syntax",id:"syntax-4",children:[],level:4}],level:3},{value:"DROP INDEX",id:"drop-index",children:[{value:"Description",id:"description-5",children:[],level:4},{value:"Syntax",id:"syntax-5",children:[],level:4}],level:3},{value:"ALTER TABLE RENAME",id:"alter-table-rename",children:[{value:"Description",id:"description-6",children:[],level:4},{value:"Syntax",id:"syntax-6",children:[],level:4}],level:3},{value:"ALTER TABLE RENAME COLUMN",id:"alter-table-rename-column",children:[{value:"Description",id:"description-7",children:[],level:4},{value:"Syntax",id:"syntax-7",children:[],level:4}],level:3}],c={toc:m};function p(e){var t=e.components,a=(0,i.Z)(e,l);return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The Data Definition Language(DDL) commands are used to define the database schema. They are used to create and delete relations, modify the structure of relations in the database and also create and delete indexes on the attributes of relations. DDL Commands are supported by both XFS Interface and Frontend Interface. The following are the DDL commands supported by NITCBase."),(0,r.kt)("h3",{id:"create-table"},"CREATE TABLE"),(0,r.kt)("h4",{id:"description"},"Description"),(0,r.kt)("p",null,"This command is used to create a relation of the given name, with given attribute names and types. The type of an attribute can only be ",(0,r.kt)("inlineCode",{parentName:"p"},"NUM")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"STR")," for numbers and strings respectively."),(0,r.kt)("h4",{id:"syntax"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"CREATE TABLE tablename(attr1_name attr1_type, attr2_name attr2_type, ... )\n")),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("ul",{parentName:"div"},(0,r.kt)("li",{parentName:"ul"},"In NITCBase, the ",(0,r.kt)("strong",{parentName:"li"},"maximum size of an attribute is 16 bytes"),"."),(0,r.kt)("li",{parentName:"ul"},"Since relation names and attribute names are attributes themselves in the catalog structures, the table name and attribute names in the queries must only have a maximum of 15 characters."),(0,r.kt)("li",{parentName:"ul"},"If the length is greater than 16, ",(0,r.kt)("strong",{parentName:"li"},"only the first 15 characters will be taken.")),(0,r.kt)("li",{parentName:"ul"},"All attribute names of the relation must be unique."),(0,r.kt)("li",{parentName:"ul"},"A relation cannot be named as ",(0,r.kt)("inlineCode",{parentName:"li"},"temp"),", since it is used for internal operations.\n:::")))),(0,r.kt)("p",null,"The following command will create a Relation called ",(0,r.kt)("inlineCode",{parentName:"p"},"sample")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"RollNo"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Name")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"CGPA")," as the attributes of types number, string and number respectively:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"CREATE TABLE sample(Rollno NUM, Name STR, CGPA NUM)\n")),(0,r.kt)("p",null,":::"),(0,r.kt)("h3",{id:"drop-table"},"DROP TABLE"),(0,r.kt)("h4",{id:"description-1"},"Description"),(0,r.kt)("p",null,"This command is used to delete the relation of the given name. It deletes all the record and index blocks corresponding to the relations, and also deletes the entries corresponding to the relation in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Relation catalog")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Attribute catalog"),". The entries corresponding to the deleted blocks in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Block allocation map")," are also reset."),(0,r.kt)("h4",{id:"syntax-1"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"DROP TABLE tablename\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Example")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The following command will delete the relation called ",(0,r.kt)("inlineCode",{parentName:"p"},"sample"),":"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"DROP TABLE sample\n")))),(0,r.kt)("h3",{id:"open-table"},"OPEN TABLE"),(0,r.kt)("h4",{id:"description-2"},"Description"),(0,r.kt)("p",null,"This command is used to open the relation specified for manipulation by updating the Cache/OpenRelTable."),(0,r.kt)("h4",{id:"syntax-2"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"OPEN TABLE tablename\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Example")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The following command will open the relation called ",(0,r.kt)("inlineCode",{parentName:"p"},"sample"),":"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"OPEN TABLE sample\n")))),(0,r.kt)("h3",{id:"close-table"},"CLOSE TABLE"),(0,r.kt)("h4",{id:"description-3"},"Description"),(0,r.kt)("p",null,"This command is used to close the relation specified by updating the Cache/OpenRelTable."),(0,r.kt)("h4",{id:"syntax-3"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"CLOSE TABLE tablename\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Example")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The following command will close the relation called ",(0,r.kt)("inlineCode",{parentName:"p"},"sample"),":"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"CLOSE TABLE sample\n")))),(0,r.kt)("h3",{id:"create-index"},"CREATE INDEX"),(0,r.kt)("h4",{id:"description-4"},"Description"),(0,r.kt)("p",null,"This command is used to create an index on a given attribute of a relation. ",(0,r.kt)("a",{parentName:"p",href:"https://nitcbase.github.io/design/Bplustreedetails.html"},"B+ trees")," are used for creating indexes. Before executing this query, the relation must be opened using the ",(0,r.kt)("inlineCode",{parentName:"p"},"OPEN TABLE")," command."),(0,r.kt)("h4",{id:"syntax-4"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"CREATE INDEX ON tablename.attributename\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Example")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The following command will create an index on the ",(0,r.kt)("inlineCode",{parentName:"p"},"Rollno")," attribute of the ",(0,r.kt)("inlineCode",{parentName:"p"},"sample")," relation:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"CREATE INDEX ON sample.Rollno\n")))),(0,r.kt)("h3",{id:"drop-index"},"DROP INDEX"),(0,r.kt)("h4",{id:"description-5"},"Description"),(0,r.kt)("p",null,"This command is used to drop/delete the B+ tree indexing on the given attribute of the given relation. Before executing this query, the relation must be opened using the ",(0,r.kt)("inlineCode",{parentName:"p"},"OPEN TABLE")," command."),(0,r.kt)("h4",{id:"syntax-5"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"DROP INDEX ON tablename.attributename\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Example")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The following command will drop the index on the ",(0,r.kt)("inlineCode",{parentName:"p"},"Rollno")," attribute of the ",(0,r.kt)("inlineCode",{parentName:"p"},"sample")," relation:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"DROP INDEX ON sample.Rollno\n")))),(0,r.kt)("h3",{id:"alter-table-rename"},"ALTER TABLE RENAME"),(0,r.kt)("h4",{id:"description-6"},"Description"),(0,r.kt)("p",null,"This command is used to rename an existing relation to the given new name."),(0,r.kt)("h4",{id:"syntax-6"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ALTER TABLE RENAME tablename TO new_tablename\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Example")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The following command will rename the existing relation ",(0,r.kt)("inlineCode",{parentName:"p"},"sample")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"Students"),":"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ALTER TABLE RENAME sample TO Students\n")))),(0,r.kt)("h3",{id:"alter-table-rename-column"},"ALTER TABLE RENAME COLUMN"),(0,r.kt)("h4",{id:"description-7"},"Description"),(0,r.kt)("p",null,"This command is used to rename an attribute of an existing relation to the given new name."),(0,r.kt)("h4",{id:"syntax-7"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ALTER TABLE RENAME tablename COLUMN column_name TO new_column_name\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Example")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The following command will rename the the attribute of an existing relation ",(0,r.kt)("inlineCode",{parentName:"p"},"sample")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"CGPA")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"SGPA"),":"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"ALTER TABLE RENAME sample COLUMN CGPA TO SGPA\n")))))}p.isMDXComponent=!0}}]);