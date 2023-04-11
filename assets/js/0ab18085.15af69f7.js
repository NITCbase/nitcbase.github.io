"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[408],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>p});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),f=s(n),p=a,m=f["".concat(u,".").concat(p)]||f[p]||d[p]||l;return n?r.createElement(m,o(o({ref:t},c),{},{components:n})):r.createElement(m,o({ref:t},c))}));function p(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=f;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9098:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const l={title:"class RecBuffer",sidebar_position:3},o=void 0,i={unversionedId:"Design/Buffer Layer/RecBuffer",id:"Design/Buffer Layer/RecBuffer",title:"class RecBuffer",description:"An object of the RecBuffer class is associated with a record block. In a Record block, a slot can store one record, and each record is a fixed sized set of Attributes. Ordering of data as records and making use of slotmap are done only in a record block. Public methods of this class deal with access/modification of the records and the slotmap. RecBuffer class extends the BlockBuffer class. Thus, all its protected fields and methods can be accessed by RecBuffer class.",source:"@site/docs/Design/Buffer Layer/RecBuffer.md",sourceDirName:"Design/Buffer Layer",slug:"/Design/Buffer Layer/RecBuffer",permalink:"/docs/Design/Buffer Layer/RecBuffer",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"class RecBuffer",sidebar_position:3},sidebar:"Design",previous:{title:"class BlockBuffer",permalink:"/docs/Design/Buffer Layer/BlockBuffer"},next:{title:"classes IndBuffer, IndInternal, IndLeaf",permalink:"/docs/Design/Buffer Layer/IndBuffer"}},u={},s=[{value:"RecBuffer :: RecBuffer() (Constructor 1)",id:"recbuffer--recbuffer-constructor-1",level:3},{value:"Description",id:"description",level:4},{value:"Arguments",id:"arguments",level:4},{value:"Return Values",id:"return-values",level:4},{value:"Algorithm",id:"algorithm",level:4},{value:"RecBuffer :: RecBuffer() (Constructor 2)",id:"recbuffer--recbuffer-constructor-2",level:3},{value:"Description",id:"description-1",level:4},{value:"Arguments",id:"arguments-1",level:4},{value:"Return Values",id:"return-values-1",level:4},{value:"Algorithm",id:"algorithm-1",level:4},{value:"RecBuffer :: getSlotMap()",id:"recbuffer--getslotmap",level:3},{value:"Description",id:"description-2",level:4},{value:"Arguments",id:"arguments-2",level:4},{value:"Return Values",id:"return-values-2",level:4},{value:"Algorithm",id:"algorithm-2",level:4},{value:"RecBuffer :: setSlotMap()",id:"recbuffer--setslotmap",level:3},{value:"Description",id:"description-3",level:4},{value:"Arguments",id:"arguments-3",level:4},{value:"Return Values",id:"return-values-3",level:4},{value:"Algorithm",id:"algorithm-3",level:4},{value:"RecBuffer :: getRecord()",id:"recbuffer--getrecord",level:3},{value:"Description",id:"description-4",level:4},{value:"Arguments",id:"arguments-4",level:4},{value:"Return Values",id:"return-values-4",level:4},{value:"RecBuffer :: setRecord()",id:"recbuffer--setrecord",level:3},{value:"Description",id:"description-5",level:4},{value:"Arguments",id:"arguments-5",level:4},{value:"Return Values",id:"return-values-5",level:4},{value:"Algorithm",id:"algorithm-4",level:4}],c={toc:s};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"An object of the ",(0,a.kt)("inlineCode",{parentName:"p"},"RecBuffer class")," is associated with a ",(0,a.kt)("strong",{parentName:"p"},"record block"),". In a Record block, a slot can store one record, and each record is a fixed sized set of Attributes. Ordering of data as records and making use of slotmap are done only in a record block. ",(0,a.kt)("strong",{parentName:"p"},"Public methods")," of this class deal with ",(0,a.kt)("strong",{parentName:"p"},"access/modification of the records and the slotmap"),". ",(0,a.kt)("inlineCode",{parentName:"p"},"RecBuffer class")," extends the ",(0,a.kt)("inlineCode",{parentName:"p"},"BlockBuffer class"),". Thus, all its ",(0,a.kt)("strong",{parentName:"p"},"protected")," fields and methods can be accessed by ",(0,a.kt)("inlineCode",{parentName:"p"},"RecBuffer class"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cpp"},"class RecBuffer : public BlockBuffer{\n\npublic:\n\n    //methods\n    RecBuffer();\n    RecBuffer(int blockNum);\n    int getSlotMap(unsigned char *slotMap);\n    int setSlotMap(unsigned char *slotMap);\n    int getRecord(union Attribute *rec,int slotNum);\n    int setRecord(union Attribute *rec,int slotNum);\n\n};\n")),(0,a.kt)("p",null,"The following are the specifications for the methods in ",(0,a.kt)("inlineCode",{parentName:"p"},"class RecBuffer"),"."),(0,a.kt)("h3",{id:"recbuffer--recbuffer-constructor-1"},"RecBuffer :: RecBuffer() (Constructor 1)"),(0,a.kt)("h4",{id:"description"},"Description"),(0,a.kt)("p",null,"Called if a new record block is to be allocated in the disk."),(0,a.kt)("h4",{id:"arguments"},"Arguments"),(0,a.kt)("p",null,"Nil"),(0,a.kt)("h4",{id:"return-values"},"Return Values"),(0,a.kt)("p",null,"Nil"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"If the record block already has already been initialised as a record block on the disk, use ",(0,a.kt)("a",{parentName:"p",href:"#recbuffer--recbuffer-constructor-2"},"constructor 2"),".")),(0,a.kt)("h4",{id:"algorithm"},"Algorithm"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cpp"},"RecBuffer::RecBuffer() : BlockBuffer('R'){}\n// call parent non-default constructor with 'R' denoting record block.\n")),(0,a.kt)("h3",{id:"recbuffer--recbuffer-constructor-2"},"RecBuffer :: RecBuffer() (Constructor 2)"),(0,a.kt)("h4",{id:"description-1"},"Description"),(0,a.kt)("p",null,"Called when the record block already has already been initialised as a record on the disk."),(0,a.kt)("h4",{id:"arguments-1"},"Arguments"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Name")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Type")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"blockNum"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"int")),(0,a.kt)("td",{parentName:"tr",align:null},"Block number of the record block")))),(0,a.kt)("h4",{id:"return-values-1"},"Return Values"),(0,a.kt)("p",null,"Nil"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"If a new record block is to be allocated in the disk use ",(0,a.kt)("a",{parentName:"p",href:"#recbuffer--recbuffer-constructor-1"},"constructor 1"),".")),(0,a.kt)("h4",{id:"algorithm-1"},"Algorithm"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cpp"},"RecBuffer::RecBuffer(int blockNum) : BlockBuffer(blockNum){}\n//call parent non-default constructor with blockNum\n")),(0,a.kt)("h3",{id:"recbuffer--getslotmap"},"RecBuffer :: getSlotMap()"),(0,a.kt)("h4",{id:"description-2"},"Description"),(0,a.kt)("p",null,"Gives the slotmap of the block."),(0,a.kt)("h4",{id:"arguments-2"},"Arguments"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Name")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Type")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"slotMap"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"unsigned char *")),(0,a.kt)("td",{parentName:"tr",align:null},"Pointer to the array of unsigned char to which the slot map is copied.")))),(0,a.kt)("h4",{id:"return-values-2"},"Return Values"),(0,a.kt)("p",null,"Nil"),(0,a.kt)("admonition",{title:"note",type:"caution"},(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},"The array of ",(0,a.kt)("inlineCode",{parentName:"li"},"unsigned char")," to which the pointer in the argument points to should have a size equal to the size of the block's slotmap."),(0,a.kt)("li",{parentName:"ul"},"The higher layers must allocate memory for the ",(0,a.kt)("inlineCode",{parentName:"li"},"unsigned char")," array before calling the function."))),(0,a.kt)("h4",{id:"algorithm-2"},"Algorithm"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cpp"},"int RecBuffer::getSlotMap(unsigned char *slotMap) {\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block using\n       loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // get the header of the block using the getHeader() function\n\n    int numSlots = /* the number of slots in the block */;\n\n    // the slotmap starts at bufferPtr + HEADER_SIZE. Copy the contents of the\n    // slotmap in the buffer to the argument `slotMap`.\n    // Note that size of slotmap is `numSlots`\n\n    // return SUCCESS\n}\n")),(0,a.kt)("h3",{id:"recbuffer--setslotmap"},"RecBuffer :: setSlotMap()"),(0,a.kt)("h4",{id:"description-3"},"Description"),(0,a.kt)("p",null,"Sets the slotmap of the block."),(0,a.kt)("h4",{id:"arguments-3"},"Arguments"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Name")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Type")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"slotMap"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"unsigned char *")),(0,a.kt)("td",{parentName:"tr",align:null},"Pointer to the array of unsigned char from which the slot map is set.")))),(0,a.kt)("h4",{id:"return-values-3"},"Return Values"),(0,a.kt)("p",null,"Nil"),(0,a.kt)("admonition",{title:"note",type:"caution"},(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},"The array of ",(0,a.kt)("inlineCode",{parentName:"li"},"unsigned char")," to which the pointer in the argument points to should have a size equal to the size of the block's slotmap."),(0,a.kt)("li",{parentName:"ul"},"The higher layers must allocate memory for the ",(0,a.kt)("inlineCode",{parentName:"li"},"unsigned char")," array before calling the function."))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cpp"},"int RecBuffer::setSlotMap(unsigned char *slotMap) {\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block using\n       loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // get the header of the block using the getHeader() function\n\n    int numSlots = /* the number of slots in the block */;\n\n    // the slotmap starts at bufferPtr + HEADER_SIZE. Copy the contents of the\n    // argument `slotMap` to the buffer replacing the existing slotmap.\n    // Note that size of slotmap is `numSlots`\n\n    // update dirty bit using StaticBuffer::setDirtyBit\n    // if setDirtyBit failed, return the value returned by the call\n\n    // return SUCCESS\n}\n")),(0,a.kt)("h4",{id:"algorithm-3"},"Algorithm"),(0,a.kt)("h3",{id:"recbuffer--getrecord"},"RecBuffer :: getRecord()"),(0,a.kt)("h4",{id:"description-4"},"Description"),(0,a.kt)("p",null,"Gives the slotNumth record entry of the block."),(0,a.kt)("h4",{id:"arguments-4"},"Arguments"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Name")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Type")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rec"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"union Attribute *")),(0,a.kt)("td",{parentName:"tr",align:null},"Pointer to the array of union Attribute elements to which the record entry is copied.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"slotNum"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"int")),(0,a.kt)("td",{parentName:"tr",align:null},"Slot number of the record in the block.")))),(0,a.kt)("h4",{id:"return-values-4"},"Return Values"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Value")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/constants"},(0,a.kt)("inlineCode",{parentName:"a"},"SUCCESS"))),(0,a.kt)("td",{parentName:"tr",align:null},"Succesful copy of the record.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/constants"},(0,a.kt)("inlineCode",{parentName:"a"},"E_OUTOFBOUND"))),(0,a.kt)("td",{parentName:"tr",align:null},"Input slotNum is outside the set of valid slot values of the block.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/constants"},(0,a.kt)("inlineCode",{parentName:"a"},"E_FREESLOT"))),(0,a.kt)("td",{parentName:"tr",align:null},"Slot corresponding to the input slotNum is free.")))),(0,a.kt)("admonition",{title:"note",type:"caution"},(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},"The array of ",(0,a.kt)("inlineCode",{parentName:"li"},"union Attribute")," elements should have a size equal to the number of attributes in the relation."),(0,a.kt)("li",{parentName:"ul"},"The higher layers must allocate memory for the the array of ",(0,a.kt)("inlineCode",{parentName:"li"},"union Attribute")," elements before calling the function."))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cpp"},"int RecBuffer::getRecord(union Attribute *rec, int slotNum) {\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // get the header using the getHeader() function\n\n    // get number of attributes in the block.\n\n    // get the number of slots in the block.\n\n    // if input slotNum is not in the permitted range return E_OUTOFBOUND\n\n    // if slot corresponding to input slotNum is free return E_FREESLOT\n\n    /* offset bufferPtr to point to the beginning of the record at required\n       slot. the block contains the header, the slotmap, followed by all\n       the records. so, for example,\n       record at slot x will be at bufferPtr + HEADER_SIZE + (x*recordSize)\n       copy the record from buffer to `rec` using memcpy\n       (hint: a record will be of size ATTR_SIZE * numAttrs)\n    */\n\n    // return SUCCESS\n\n}\n")),(0,a.kt)("h3",{id:"recbuffer--setrecord"},"RecBuffer :: setRecord()"),(0,a.kt)("h4",{id:"description-5"},"Description"),(0,a.kt)("p",null,"Sets the ",(0,a.kt)("inlineCode",{parentName:"p"},"slotNum"),"th record entry of the block with the input record contents."),(0,a.kt)("h4",{id:"arguments-5"},"Arguments"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Name")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Type")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rec"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"union Attribute *")),(0,a.kt)("td",{parentName:"tr",align:null},"Pointer to the array of union Attribute elements from which the record entry is set.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"slotNum"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"int")),(0,a.kt)("td",{parentName:"tr",align:null},"Slot number of the record in the block.")))),(0,a.kt)("h4",{id:"return-values-5"},"Return Values"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Value")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/constants"},(0,a.kt)("inlineCode",{parentName:"a"},"SUCCESS"))),(0,a.kt)("td",{parentName:"tr",align:null},"Succesful copy of the record.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"/constants"},(0,a.kt)("inlineCode",{parentName:"a"},"E_OUTOFBOUND"))),(0,a.kt)("td",{parentName:"tr",align:null},"Input slotNum is outside the set of valid slot values of the block.")))),(0,a.kt)("admonition",{title:"note",type:"caution"},(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},"The array ",(0,a.kt)("inlineCode",{parentName:"li"},"rec")," (an array of type ",(0,a.kt)("inlineCode",{parentName:"li"},"union Attribute"),") should have a size equal to the number of attributes in the relation."),(0,a.kt)("li",{parentName:"ul"},"The higher layers must allocate memory for ",(0,a.kt)("inlineCode",{parentName:"li"},"rec")," before calling the function."))),(0,a.kt)("h4",{id:"algorithm-4"},"Algorithm"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cpp"},"int RecBuffer::setRecord(union Attribute *rec, int slotNum) {\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    /* get the header of the block using the getHeader() function */\n\n    // get number of attributes in the block.\n\n    // get the number of slots in the block.\n\n    // if input slotNum is not in the permitted range return E_OUTOFBOUND.\n\n    /* offset bufferPtr to point to the beginning of the record at required\n       slot. the block contains the header, the slotmap, followed by all\n       the records. so, for example,\n       record at slot x will be at bufferPtr + HEADER_SIZE + (x*recordSize)\n       copy the record from `rec` to buffer using memcpy\n       (hint: a record will be of size ATTR_SIZE * numAttrs)\n    */\n\n    // update dirty bit using setDirtyBit()\n\n    /* (the above function call should not fail since the block is already\n       in buffer and the blockNum is valid. If the call does fail, there\n       exists some other issue in the code) */\n\n    // return SUCCESS\n}\n")))}d.isMDXComponent=!0}}]);