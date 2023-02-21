"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[1530],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),s=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),h=s(a),m=r,u=h["".concat(c,".").concat(m)]||h[m]||d[m]||o;return a?n.createElement(u,i(i({ref:t},p),{},{components:a})):n.createElement(u,i({ref:t},p))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=h;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},6685:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var n=a(7462),r=(a(7294),a(3905));const o={title:"Stage 5 : Working With More Relations"},i="Stage 4",l={unversionedId:"Roadmap/Stage05",id:"Roadmap/Stage05",title:"Stage 5 : Working With More Relations",description:"- Learn",source:"@site/docs/Roadmap/Stage05.md",sourceDirName:"Roadmap",slug:"/Roadmap/Stage05",permalink:"/docs/Roadmap/Stage05",draft:!1,tags:[],version:"current",frontMatter:{title:"Stage 5 : Working With More Relations"},sidebar:"Roadmap",previous:{title:"Stage 4 : Looking at the Records",permalink:"/docs/Roadmap/Stage04"}},c={},s=[{value:"Introduction",id:"introduction",level:2},{value:"Open and Closed Relations",id:"open-and-closed-relations",level:3},{value:"Implementation",id:"implementation",level:2},{value:"Exercises",id:"exercises",level:2}],p={toc:s};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"stage-4"},"Stage 4"),(0,r.kt)("admonition",{title:"Learning Objectives",type:"note"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Learn"))),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"Your implementation must now be able to read the rows and columns of the relations ",(0,r.kt)("inlineCode",{parentName:"p"},"RELCAT")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"ATTRIBUTECAT")," and filter the records based on a certain condition. In this stage, we'll extend all the functionality we have so far to work with any relation on the DBMS."),(0,r.kt)("h3",{id:"open-and-closed-relations"},"Open and Closed Relations"),(0,r.kt)("p",null,"A relation that has it's relation and attribute catalog entries stored in the respective caches is called an ",(0,r.kt)("strong",{parentName:"p"},"open relation"),". NITCbase supports opening 12 relations at once (10 in practice. Why?). If we want to open any more relations, we will have to ",(0,r.kt)("strong",{parentName:"p"},"close")," some relation. ",(0,r.kt)("strong",{parentName:"p"},"NITCbase requires that a relation be opened before any operations can be performed on it"),"."),(0,r.kt)("p",null,"We discussed about the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Cache%20Layer#class-relcachetable"},"RelCacheTable")," and ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Cache%20Layer#class-attrcachetable"},"AttrCacheTable")," classes in the preceeding stage. Here, we introduce the class ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Cache%20Layer#class-openreltable"},"OpenRelTable")," class. This class manages the open and closing of relations and handles the caching operations. It has a member ",(0,r.kt)("inlineCode",{parentName:"p"},"tableMetaInfo")," which is a ",(0,r.kt)("a",{parentName:"p",href:"/constants"},"MAX_OPEN")," sized array of type ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Cache%20Layer#openreltablemetainfo"},"struct OpenRelTableMetaInfo"),". ",(0,r.kt)("inlineCode",{parentName:"p"},"tableMetaInfo")," is used to store which entries of the caches are free and the relation to which an occupied entry belongs."),(0,r.kt)("p",null,"For any index ",(0,r.kt)("inlineCode",{parentName:"p"},"i")," that is occupied in the caches, the entries at index ",(0,r.kt)("inlineCode",{parentName:"p"},"i")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"relCache"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"attrCache")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"tableMetaInfo")," will correspond to the same relation. Recall that this index ",(0,r.kt)("inlineCode",{parentName:"p"},"i")," is called the relation's rel-id. These three tables comprise the core functionality of the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Design/Cache%20Layer"},"Cache Layer")," of NITCbase. A table can be opened by the user with the ",(0,r.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/ddl#open-table"},"OPEN TABLE")," command."),(0,r.kt)("h2",{id:"implementation"},"Implementation"),(0,r.kt)("p",null,"Opening a relation requires us to search for the corresponding records in the catalogs. To search through the records of a relation, we require that the relation be open. You must see now why the relation catalog and attribute catalog are always kept open."),(0,r.kt)("p",null,"A sequence diagrams documenting the flow of data between the layers is shown below."),(0,r.kt)("br",null),(0,r.kt)("mermaid",{value:" %%{init: { 'sequence': {'mirrorActors':false} } }%%\nsequenceDiagram\n    actor User\n    participant Frontend Interface\n    participant Frontend\n    participant Schema Layer\n    participant Cache Layer\n    participant Block Access Layer\n    participant Buffer Layer\n    User->>Frontend Interface: OPEN TABLE\n    activate Frontend Interface\n    Frontend Interface->>Frontend:open_table()\ud83d\udfe2\n    activate Frontend\n    Frontend->>Schema Layer:openRel()\ud83d\udfe0\n    activate Schema Layer\n    Schema Layer->>Cache Layer:openRel()\ud83d\udfe2\n    activate Cache Layer\n    loop until all catalog entries are read\n      Cache Layer->>Block Access Layer:linearSearch()\ud83d\udd35\n      activate Block Access Layer\n      Block Access Layer--\x3e>Cache Layer: recId\n      deactivate Block Access Layer\n      Cache Layer->>Buffer Layer:getHeader()\ud83d\udd35, getRecord()\ud83d\udd35, getSlotmap()\ud83d\udd35\n      activate Buffer Layer\n      Buffer Layer--\x3e>Cache Layer: record block info\n      deactivate Buffer Layer\n    end\n    Cache Layer--\x3e>User:operation status\n    deactivate Cache Layer\n    deactivate Schema Layer\n    deactivate Frontend\n    deactivate Frontend Interface\n"}),(0,r.kt)("br",null),(0,r.kt)("p",null,"A class diagram showing the methods relevant to this functionality in the Cache Layer is shown below."),(0,r.kt)("mermaid",{value:"classDiagram\n  class OpenRelTable{\n    -tableMetaInfo[MAX_OPEN] : OpenRelTableMetaInfo\n    +OpenRelTable(): \ud83d\udfe2\n    +~OpenRelTable(): \ud83d\udfe0\n    -getFreeOpenRelTableEntry()$ int\ud83d\udfe2\n    +getRelId(char relName[ATTR_SIZE])$ int\ud83d\udfe2\n    +openRel(char relName[ATTR_SIZE])$ int\ud83d\udfe2\n    +closeRel(int relId)$ int\ud83d\udfe0\n  }\n"}),(0,r.kt)("br",null),(0,r.kt)("h2",{id:"exercises"},"Exercises"))}d.isMDXComponent=!0}}]);