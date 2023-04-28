"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[7558],{3905:(t,e,a)=>{a.d(e,{Zo:()=>s,kt:()=>c});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},i=Object.keys(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var d=n.createContext({}),p=function(t){var e=n.useContext(d),a=e;return t&&(a="function"==typeof t?t(e):l(l({},e),t)),a},s=function(t){var e=p(t.components);return n.createElement(d.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},h=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,i=t.originalType,d=t.parentName,s=o(t,["components","mdxType","originalType","parentName"]),h=p(a),c=r,u=h["".concat(d,".").concat(c)]||h[c]||m[c]||i;return a?n.createElement(u,l(l({ref:e},s),{},{components:a})):n.createElement(u,l({ref:e},s))}));function c(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=a.length,l=new Array(i);l[0]=h;var o={};for(var d in e)hasOwnProperty.call(e,d)&&(o[d]=e[d]);o.originalType=t,o.mdxType="string"==typeof t?t:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},971:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>d,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={title:"class AttrCacheTable",sidebar_position:3},l=void 0,o={unversionedId:"Design/Cache Layer/AttrCacheTable",id:"Design/Cache Layer/AttrCacheTable",title:"class AttrCacheTable",description:"The class AttrCacheTable is used to cache Attribute Catalog entries of the attributes of open relations in NITCbase. The first two entries of the Attribute Cache Table corresponding to RELCATRELID and ATTRCATRELID are reserved for storing the entries of Relation Catalog relation and Attribute Catalog relation, respectively. These are loaded into the cache by the _OpenRelTable constructor_ at the start of the session. These relations remain in the cache memory throughout the session and can only be closed by the _OpenRelTable destructor_ during shutdown.",source:"@site/docs/Design/Cache Layer/AttrCacheTable.md",sourceDirName:"Design/Cache Layer",slug:"/Design/Cache Layer/AttrCacheTable",permalink:"/docs/Design/Cache Layer/AttrCacheTable",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"class AttrCacheTable",sidebar_position:3},sidebar:"Design",previous:{title:"class RelCacheTable",permalink:"/docs/Design/Cache Layer/RelCacheTable"},next:{title:"class OpenRelTable",permalink:"/docs/Design/Cache Layer/OpenRelTable"}},d={},p=[{value:"AttrCacheTable :: getAttrCatEntry",id:"attrcachetable--getattrcatentry",level:3},{value:"Description",id:"description",level:4},{value:"Arguments",id:"arguments",level:4},{value:"Return Values",id:"return-values",level:4},{value:"Algorithm",id:"algorithm",level:4},{value:"AttrCacheTable :: setAttrCatEntry",id:"attrcachetable--setattrcatentry",level:3},{value:"Description",id:"description-1",level:4},{value:"Arguments",id:"arguments-1",level:4},{value:"Return Values",id:"return-values-1",level:4},{value:"Algorithm",id:"algorithm-1",level:4},{value:"AttrCacheTable :: getSearchIndex",id:"attrcachetable--getsearchindex",level:3},{value:"Description",id:"description-2",level:4},{value:"Arguments",id:"arguments-2",level:4},{value:"Return Values",id:"return-values-2",level:4},{value:"Algorithm",id:"algorithm-2",level:4},{value:"AttrCacheTable :: setSearchIndex",id:"attrcachetable--setsearchindex",level:3},{value:"Description",id:"description-3",level:4},{value:"Arguments",id:"arguments-3",level:4},{value:"Return Values",id:"return-values-3",level:4},{value:"Algorithm",id:"algorithm-3",level:4},{value:"AttrCacheTable :: resetSearchIndex",id:"attrcachetable--resetsearchindex",level:3},{value:"Description",id:"description-4",level:4},{value:"Arguments",id:"arguments-4",level:4},{value:"Return Values",id:"return-values-4",level:4},{value:"Algorithm",id:"algorithm-4",level:4},{value:"AttrCacheTable :: recordToAttrCatEntry",id:"attrcachetable--recordtoattrcatentry",level:3},{value:"Description",id:"description-5",level:4},{value:"Arguments",id:"arguments-5",level:4},{value:"Return Values",id:"return-values-5",level:4},{value:"AttrCacheTable :: attrCatEntryToRecord",id:"attrcachetable--attrcatentrytorecord",level:3},{value:"Description",id:"description-6",level:4},{value:"Arguments",id:"arguments-6",level:4},{value:"Return Values",id:"return-values-6",level:4}],s={toc:p};function m(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},s,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"class AttrCacheTable")," is used to cache ",(0,r.kt)("em",{parentName:"p"},"Attribute Catalog")," entries of the attributes of open relations in NITCbase. The first two entries of the ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Table corresponding to ",(0,r.kt)("inlineCode",{parentName:"p"},"RELCAT_RELID")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"ATTRCAT_RELID")," are reserved for storing the entries of ",(0,r.kt)("em",{parentName:"p"},"Relation Catalog")," relation and ",(0,r.kt)("em",{parentName:"p"},"Attribute Catalog")," relation, respectively. ",(0,r.kt)("strong",{parentName:"p"},"These are loaded into the cache by the ",(0,r.kt)("em",{parentName:"strong"},(0,r.kt)("inlineCode",{parentName:"em"},"OpenRelTable")," constructor")," at the start of the session. These relations remain in the cache memory throughout the session and can only be closed by the ",(0,r.kt)("em",{parentName:"strong"},(0,r.kt)("inlineCode",{parentName:"em"},"OpenRelTable")," destructor")," during shutdown.")),(0,r.kt)("p",null,"The class contains a ",(0,r.kt)("inlineCode",{parentName:"p"},"private")," member field, ",(0,r.kt)("inlineCode",{parentName:"p"},"attrCache"),", which is an array of pointers to ",(0,r.kt)("inlineCode",{parentName:"p"},"struct AttrCacheEntry")," with size ",(0,r.kt)("inlineCode",{parentName:"p"},"MAX_OPEN"),". For each relation opened, an entry is made in the array ",(0,r.kt)("inlineCode",{parentName:"p"},"attrCache"),", at the index given by ",(0,r.kt)("em",{parentName:"p"},"relation id")," of the relation. This entry is the head of the linked list of ",(0,r.kt)("inlineCode",{parentName:"p"},"struct AttrCacheEntry")," elements. A linked list is used because a relation can have variable number of attributes (though the maximum number of attributes for a relation is bounded in Nitcbase by 125 - why?). ",(0,r.kt)("strong",{parentName:"p"},"Each element in the linked list corresponds to an attribute of the relation.")),(0,r.kt)("p",null,"The class provides ",(0,r.kt)("inlineCode",{parentName:"p"},"public")," ",(0,r.kt)("em",{parentName:"p"},"overloaded methods")," - ",(0,r.kt)("inlineCode",{parentName:"p"},"getAttrCatEntry()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"setAttrCatEntry()")," to retrieve and update the ",(0,r.kt)("em",{parentName:"p"},"Attribute Catalog")," entry of a relation's attribute in the ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Table. The class also provides ",(0,r.kt)("em",{parentName:"p"},"overloaded")," ",(0,r.kt)("inlineCode",{parentName:"p"},"public")," methods - ",(0,r.kt)("inlineCode",{parentName:"p"},"getSearchIndex()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"setSearchIndex()")," for retrieving and updating the ",(0,r.kt)("inlineCode",{parentName:"p"},"searchIndex")," field of ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Entry."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"private")," method ",(0,r.kt)("inlineCode",{parentName:"p"},"recordToAttrCatEntry()")," is used to convert a record (implemented as an array of union Attribute) to ",(0,r.kt)("inlineCode",{parentName:"p"},"AttrCatEntry")," structure. This function is called by the ",(0,r.kt)("em",{parentName:"p"},"friend class"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"OpenRelTable"),", while opening a relation. Similarly, the ",(0,r.kt)("inlineCode",{parentName:"p"},"private")," method ",(0,r.kt)("inlineCode",{parentName:"p"},"attrCatEntryToRecord()")," is used to convert ",(0,r.kt)("inlineCode",{parentName:"p"},"AttrCatEntry")," structure in to a record. This function is also called from the ",(0,r.kt)("em",{parentName:"p"},"friend class"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"OpenRelTable"),", while closing a relation."),(0,r.kt)("admonition",{title:"C++ STATIC CLASSES",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"AttrCacheTable is a ",(0,r.kt)("em",{parentName:"p"},"static class"),", i.e., all member fields and methods are declared static. Memory is allocated statically for all member fields of the class. This class uses ",(0,r.kt)("em",{parentName:"p"},"static methods")," to access the ",(0,r.kt)("em",{parentName:"p"},"static member fields"),". C++ allows static methods to be accessed using the semantics ",(0,r.kt)("inlineCode",{parentName:"p"},"class_name :: function_name()"),".")),(0,r.kt)("admonition",{title:"Note",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"The class OpenRelTable is a ",(0,r.kt)("em",{parentName:"p"},"friend class")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"AttrCacheTable")," class. This allows all methods in ",(0,r.kt)("inlineCode",{parentName:"p"},"OpenRelTable")," to access the ",(0,r.kt)("inlineCode",{parentName:"p"},"private")," fields and methods of the ",(0,r.kt)("inlineCode",{parentName:"p"},"AttrCacheTable")," class.")),(0,r.kt)("p",null,"The class definition of ",(0,r.kt)("inlineCode",{parentName:"p"},"AttrCacheTable")," is as given below."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"class AttrCacheTable {\n\nfriend class OpenRelTable;\n\npublic:\n  //methods\n  static int getAttrCatEntry(int relId, char attrName[ATTR_SIZE], AttrCatEntry *attrCatBuf);\n  static int getAttrCatEntry(int relId, int attrOffset, AttrCatEntry *attrCatBuf);\n  static int setAttrCatEntry(int relId, char attrName[ATTR_SIZE], AttrCatEntry *attrCatBuf);\n  static int setAttrCatEntry(int relId, int attrOffset, AttrCatEntry *attrCatBuf);\n  static int getSearchIndex(int relId, char attrName[ATTR_SIZE], IndexId *searchIndex);\n  static int getSearchIndex(int relId, int attrOffset, IndexId *searchIndex);\n  static int setSearchIndex(int relId, char attrName[ATTR_SIZE], IndexId *searchIndex);\n  static int setSearchIndex(int relId, int attrOffset, IndexId *searchIndex);\n\nprivate:\n  //field\n  static AttrCacheEntry* attrCache[MAX_OPEN];\n\n  //methods\n  static void recordToAttrCatEntry(union Attribute record[ATTRCAT_NO_ATTRS], AttrCatEntry *attrCatEntry);\n  static void attrCatEntryToRecord(AttrCatEntry *attrCatEntry, union Attribute record[ATTRCAT_NO_ATTRS]);\n\n};\n")),(0,r.kt)("p",null,"The following are the specifications for the methods in ",(0,r.kt)("inlineCode",{parentName:"p"},"class AttrCacheTable"),"."),(0,r.kt)("h3",{id:"attrcachetable--getattrcatentry"},"AttrCacheTable :: getAttrCatEntry"),(0,r.kt)("h4",{id:"description"},"Description"),(0,r.kt)("p",null,"Gives the ",(0,r.kt)("em",{parentName:"p"},"Attribute Catalog")," entry corresponding to the given attribute of the specified relation in the ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Table."),(0,r.kt)("admonition",{title:"note",type:"caution"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"The caller should allocate memory for the ",(0,r.kt)("inlineCode",{parentName:"li"},"struct AttrCatEntry")," before calling the function."),(0,r.kt)("li",{parentName:"ul"},"This method is overloaded in type of the second argument."))),(0,r.kt)("h4",{id:"arguments"},"Arguments"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Name")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"relId"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The relation id of the relation in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrName / attrOffset"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"char[ATTR_SIZE]")," / ",(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The name/offset of the target attribute")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrCatBuf"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AttrCatEntry*")),(0,r.kt)("td",{parentName:"tr",align:null},"Pointer to struct AttrCatEntry to which the ",(0,r.kt)("em",{parentName:"td"},"Attribute Catalog")," entry corresponding to the input relid and attribute is to be copied")))),(0,r.kt)("h4",{id:"return-values"},"Return Values"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Value")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"SUCCESS"))),(0,r.kt)("td",{parentName:"tr",align:null},"Successfully copied the ",(0,r.kt)("em",{parentName:"td"},"Attribute Catalog")," entry")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_OUTOFBOUND"))),(0,r.kt)("td",{parentName:"tr",align:null},"Input relId is outside the valid set of possible relation ids")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_RELNOTOPEN"))),(0,r.kt)("td",{parentName:"tr",align:null},"Entry corresponding to input relId is free in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_ATTRNOTEXIST"))),(0,r.kt)("td",{parentName:"tr",align:null},"No attribute with the input attribute name or offset exists")))),(0,r.kt)("h4",{id:"algorithm"},"Algorithm"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"int AttrCacheTable::getAttrCatEntry(int relId, char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {\n\n  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {\n    return E_OUTOFBOUND;\n  }\n\n  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {\n    return E_RELNOTOPEN;\n  }\n\n  for(/* each attribute corresponding to relation with relId */)\n  {\n    if (/* attrName/offset field of the AttrCatEntry\n        is equal to the input attrName/attrOffset */)\n    {\n      // copy that Attribute Catalog entry in the Attribute Cache Table to\n      // attrCatBuf.\n\n      return SUCCESS;\n    }\n  }\n\n  return E_ATTRNOTEXIST;\n}\n")),(0,r.kt)("h3",{id:"attrcachetable--setattrcatentry"},"AttrCacheTable :: setAttrCatEntry"),(0,r.kt)("h4",{id:"description-1"},"Description"),(0,r.kt)("p",null,"Sets the ",(0,r.kt)("em",{parentName:"p"},"Attribute Catalog")," entry corresponding to the given attribute of the specified relation in the ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Table."),(0,r.kt)("admonition",{title:"note",type:"caution"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"The caller should allocate memory to the pointer to ",(0,r.kt)("inlineCode",{parentName:"li"},"struct AttrCatEntry")," before calling the function."),(0,r.kt)("li",{parentName:"ul"},"This method is overloaded in type of the second argument."))),(0,r.kt)("h4",{id:"arguments-1"},"Arguments"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Name")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"relId"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The relation id of the relation in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrName / attrOffset"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"char[ATTR_SIZE]")," / ",(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The name/offset of the target attribute")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrCatBuf"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AttrCatEntry*")),(0,r.kt)("td",{parentName:"tr",align:null},"Pointer to ",(0,r.kt)("inlineCode",{parentName:"td"},"struct AttrCatEntry")," using which the ",(0,r.kt)("em",{parentName:"td"},"Attribute Catalog")," entry corresponding to input ",(0,r.kt)("inlineCode",{parentName:"td"},"relId")," and attribute is to be updated")))),(0,r.kt)("h4",{id:"return-values-1"},"Return Values"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Value")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"SUCCESS"))),(0,r.kt)("td",{parentName:"tr",align:null},"Successfully copied the ",(0,r.kt)("em",{parentName:"td"},"Attribute Catalog")," entry")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_OUTOFBOUND"))),(0,r.kt)("td",{parentName:"tr",align:null},"Input relId is outside the valid set of possible relation ids")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_RELNOTOPEN"))),(0,r.kt)("td",{parentName:"tr",align:null},"Entry corresponding to input relId is free in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_ATTRNOTEXIST"))),(0,r.kt)("td",{parentName:"tr",align:null},"No attribute with the input attribute name or offset exists")))),(0,r.kt)("h4",{id:"algorithm-1"},"Algorithm"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"int AttrCacheTable::setAttrCatEntry(int relId, char attrName[ATTR_SIZE]/int attrOffset, AttrCatEntry *attrCatBuf) {\n\n  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {\n    return E_OUTOFBOUND;\n  }\n\n  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {\n    return E_RELNOTOPEN;\n  }\n\n  for(/* each attribute corresponding to relation with relId */)\n  {\n    if(/* the attrName/offset field of the AttrCatEntry\n       is equal to the input attrName/attrOffset */)\n    {\n      // copy the attrCatBuf to the corresponding Attribute Catalog entry in\n      // the Attribute Cache Table.\n\n      // set the dirty flag of the corresponding Attribute Cache entry in the\n      // Attribute Cache Table.\n\n      return SUCCESS;\n    }\n  }\n\n  return E_ATTRNOTEXIST;\n}\n")),(0,r.kt)("h3",{id:"attrcachetable--getsearchindex"},"AttrCacheTable :: getSearchIndex"),(0,r.kt)("h4",{id:"description-2"},"Description"),(0,r.kt)("p",null,"Gives the value of ",(0,r.kt)("inlineCode",{parentName:"p"},"searchIndex")," field of the given attribute in the specified relation from ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Table. This is used by the ",(0,r.kt)("em",{parentName:"p"},"B+ Tree")," search algorithm to find the ",(0,r.kt)("strong",{parentName:"p"},"location of the previous hit")," so that the search can be resumed from the next ",(0,r.kt)("em",{parentName:"p"},"leaf index")," entry."),(0,r.kt)("admonition",{title:"note",type:"caution"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"This method is overloaded in type of the second argument."),(0,r.kt)("li",{parentName:"ul"},"The caller should allocate memory for the ",(0,r.kt)("inlineCode",{parentName:"li"},"struct IndexId")," before calling the function."))),(0,r.kt)("h4",{id:"arguments-2"},"Arguments"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Name")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"relId"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The relation id of the relation in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrName / attrOffset"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"char[ATTR_SIZE]")," / ",(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The name/offset of the target attribute")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"searchIndex"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"IndexId*")),(0,r.kt)("td",{parentName:"tr",align:null},"Pointer to struct IndexId to which the searchIndex field of the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," entry corresponding to the input relid and attribute is to be copied")))),(0,r.kt)("h4",{id:"return-values-2"},"Return Values"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Value")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"SUCCESS"))),(0,r.kt)("td",{parentName:"tr",align:null},"Successfully copied the search index to the argument searchIndex.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_OUTOFBOUND"))),(0,r.kt)("td",{parentName:"tr",align:null},"Input relId is outside the valid set of possible relation ids")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_RELNOTOPEN"))),(0,r.kt)("td",{parentName:"tr",align:null},"Entry corresponding to input relId is free in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_ATTRNOTEXIST"))),(0,r.kt)("td",{parentName:"tr",align:null},"No attribute with the input attribute name or offset exists")))),(0,r.kt)("h4",{id:"algorithm-2"},"Algorithm"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"int AttrCacheTable::getSearchIndex(int relId, char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {\n\n  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {\n    return E_OUTOFBOUND;\n  }\n\n  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {\n    return E_RELNOTOPEN;\n  }\n\n  for(/* each attribute corresponding to relation with relId */)\n  {\n    if (/* attrName/offset field of the AttrCatEntry\n        is equal to the input attrName/attrOffset */)\n    {\n      //copy the searchIndex field of the corresponding Attribute Cache entry\n      //in the Attribute Cache Table to input searchIndex variable.\n\n      return SUCCESS;\n    }\n  }\n\n  return E_ATTRNOTEXIST;\n}\n")),(0,r.kt)("h3",{id:"attrcachetable--setsearchindex"},"AttrCacheTable :: setSearchIndex"),(0,r.kt)("h4",{id:"description-3"},"Description"),(0,r.kt)("p",null,"Sets the value of ",(0,r.kt)("inlineCode",{parentName:"p"},"searchIndex")," field of the given attribute in the specified relation's ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Table entry. This is used by the ",(0,r.kt)("em",{parentName:"p"},"B+ Tree")," search algorithm to set the ",(0,r.kt)("strong",{parentName:"p"},"location of the previous hit")," so that the search can be resumed from the next ",(0,r.kt)("em",{parentName:"p"},"leaf index")," entry."),(0,r.kt)("admonition",{title:"note",type:"caution"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"This method is overloaded in type of the second argument"),(0,r.kt)("li",{parentName:"ul"},"The value of the search index is expected to be verified by the caller. This function does not check the validity of the search index before setting it into the cache entry."))),(0,r.kt)("h4",{id:"arguments-3"},"Arguments"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Name")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"relId"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The relation id of the relation in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrName / attrOffset"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"char[ATTR_SIZE]")," / ",(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The name/offset of the target attribute")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"searchIndex"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"IndexId*")),(0,r.kt)("td",{parentName:"tr",align:null},"Pointer to struct IndexId which contains the value to which the ",(0,r.kt)("inlineCode",{parentName:"td"},"searchIndex")," field is to be updated")))),(0,r.kt)("h4",{id:"return-values-3"},"Return Values"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Value")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"SUCCESS"))),(0,r.kt)("td",{parentName:"tr",align:null},"Successfully set the search index in the attribute cache.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_OUTOFBOUND"))),(0,r.kt)("td",{parentName:"tr",align:null},"Input relId is outside the valid set of possible relation ids")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_RELNOTOPEN"))),(0,r.kt)("td",{parentName:"tr",align:null},"Entry corresponding to input relId is free in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_ATTRNOTEXIST"))),(0,r.kt)("td",{parentName:"tr",align:null},"No attribute with the input attribute name or offset exists")))),(0,r.kt)("h4",{id:"algorithm-3"},"Algorithm"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"int AttrCacheTable::setSearchIndex(int relId, char attrName[ATTR_SIZE]/int attrOffset, IndexId *searchIndex) {\n\n  if(/*relId is outside the range [0, MAX_OPEN-1]*/) {\n    return E_OUTOFBOUND;\n  }\n\n  if(/*entry corresponding to the relId in the Attribute Cache Table is free*/) {\n    return E_RELNOTOPEN;\n  }\n\n  for(/* each attribute corresponding to relation with relId */)\n  {\n    if (/* attrName/offset field of the AttrCatEntry\n        is equal to the input attrName/attrOffset */)\n    {\n      // copy the input searchIndex variable to the searchIndex field of the\n      //corresponding Attribute Cache entry in the Attribute Cache Table.\n\n      return SUCCESS;\n    }\n  }\n\n  return E_ATTRNOTEXIST;\n}\n")),(0,r.kt)("h3",{id:"attrcachetable--resetsearchindex"},"AttrCacheTable :: resetSearchIndex"),(0,r.kt)("h4",{id:"description-4"},"Description"),(0,r.kt)("p",null,"Resets the value of ",(0,r.kt)("inlineCode",{parentName:"p"},"searchIndex")," field of the given attribute in the specified relation from ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Table to ",(0,r.kt)("inlineCode",{parentName:"p"},"{-1, -1}"),". This is used so that the B+ tree search can be restarted from the root."),(0,r.kt)("admonition",{title:"note",type:"caution"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"This method is overloaded in type of the second argument"))),(0,r.kt)("h4",{id:"arguments-4"},"Arguments"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Name")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"relId"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The relation id of the relation in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrName / attrOffset"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"char[ATTR_SIZE]")," / ",(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:null},"The name/offset of the target attribute")))),(0,r.kt)("h4",{id:"return-values-4"},"Return Values"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Value")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"SUCCESS"))),(0,r.kt)("td",{parentName:"tr",align:null},"Successfully reset the search index in the cache")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_OUTOFBOUND"))),(0,r.kt)("td",{parentName:"tr",align:null},"Input relId is outside the valid set of possible relation ids")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_RELNOTOPEN"))),(0,r.kt)("td",{parentName:"tr",align:null},"Entry corresponding to input relId is free in the ",(0,r.kt)("em",{parentName:"td"},"Attribute Cache")," Table.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/constants"},(0,r.kt)("inlineCode",{parentName:"a"},"E_ATTRNOTEXIST"))),(0,r.kt)("td",{parentName:"tr",align:null},"No attribute with the input attribute name or offset exists")))),(0,r.kt)("h4",{id:"algorithm-4"},"Algorithm"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},"int AttrCacheTable::resetSearchIndex(int relId, char attrName[ATTR_SIZE]/int attrOffset) {\n\n  // declare an IndexId having value {-1, -1}\n  // set the search index to {-1, -1} using AttrCacheTable::setSearchIndex\n  // return the value returned by setSearchIndex\n}\n")),(0,r.kt)("h3",{id:"attrcachetable--recordtoattrcatentry"},"AttrCacheTable :: recordToAttrCatEntry"),(0,r.kt)("h4",{id:"description-5"},"Description"),(0,r.kt)("p",null,"A utility function that converts a record, implemented as an array of ",(0,r.kt)("inlineCode",{parentName:"p"},"union Attribute"),", to ",(0,r.kt)("inlineCode",{parentName:"p"},"AttrCatEntry")," structure. This function can be used to convert the records in ",(0,r.kt)("em",{parentName:"p"},"Attribute Catalog")," block/blocks to the corresponding ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," entries when caching a relation in ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," Table. The details of the implementation are left to you."),(0,r.kt)("admonition",{title:"note",type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The caller should allocate memory for the ",(0,r.kt)("inlineCode",{parentName:"p"},"struct AttrCatEntry")," and array of ",(0,r.kt)("inlineCode",{parentName:"p"},"union Attribute")," before calling the function.")),(0,r.kt)("h4",{id:"arguments-5"},"Arguments"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Name")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"record"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"union Attribute[ATTRCAT_SIZE]")),(0,r.kt)("td",{parentName:"tr",align:null},"The record which is to be converted to an ",(0,r.kt)("inlineCode",{parentName:"td"},"AttrCatEntry"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrCatEntry"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AttrCatEntry*")),(0,r.kt)("td",{parentName:"tr",align:null},"Pointer to struct ",(0,r.kt)("inlineCode",{parentName:"td"},"AttrCatEntry")," to which the contents of the input record is to be copied.")))),(0,r.kt)("h4",{id:"return-values-5"},"Return Values"),(0,r.kt)("p",null,"Nil"),(0,r.kt)("h3",{id:"attrcachetable--attrcatentrytorecord"},"AttrCacheTable :: attrCatEntryToRecord"),(0,r.kt)("h4",{id:"description-6"},"Description"),(0,r.kt)("p",null,"A utility function that converts ",(0,r.kt)("inlineCode",{parentName:"p"},"AttrCatEntry")," structure to a record, implemented as an array of ",(0,r.kt)("inlineCode",{parentName:"p"},"union Attribute"),". This function can be used to convert the ",(0,r.kt)("em",{parentName:"p"},"Attribute Cache")," entries to corresponding records that can be written back to ",(0,r.kt)("em",{parentName:"p"},"Attribute Catalog")," block/blocks when closing a relation in the cache memory. The details of the implementation are left to you."),(0,r.kt)("admonition",{title:"note",type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The caller should allocate memory for the ",(0,r.kt)("inlineCode",{parentName:"p"},"struct AttrCacheEntry")," and array of ",(0,r.kt)("inlineCode",{parentName:"p"},"union Attribute")," before calling the function.")),(0,r.kt)("h4",{id:"arguments-6"},"Arguments"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Name")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"attrCatEntry"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AttrCatEntry*")),(0,r.kt)("td",{parentName:"tr",align:null},"Pointer to struct ",(0,r.kt)("inlineCode",{parentName:"td"},"AttrCatEntry")," which is to be converted to a record.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"record"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"union Attribute[ATTRCAT_SIZE]")),(0,r.kt)("td",{parentName:"tr",align:null},"The record to which the given ",(0,r.kt)("inlineCode",{parentName:"td"},"AttrCatEntry")," entry is to be copied.")))),(0,r.kt)("h4",{id:"return-values-6"},"Return Values"),(0,r.kt)("p",null,"Nil"),(0,r.kt)("hr",null))}m.isMDXComponent=!0}}]);