"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[2313],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),f=l(r),d=a,m=f["".concat(c,".").concat(d)]||f[d]||u[d]||i;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3917:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const i={sidebar_position:0,title:"Architecture"},o=void 0,s={unversionedId:"Design/Architecture",id:"Design/Architecture",title:"Architecture",description:"NITCbase has a seven layer design. This section provides documentation for each of the seven layers and certain additional design specific details.",source:"@site/docs/Design/Architecture.md",sourceDirName:"Design",slug:"/Design/Architecture",permalink:"/docs/Design/Architecture",draft:!1,tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0,title:"Architecture"},sidebar:"Design",next:{title:"System Design",permalink:"/docs/Design/DesignDiagram"}},c={},l=[],p={toc:l};function u(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"NITCbase has a seven layer design. This section provides documentation for each of the seven layers and certain additional design specific details.\nContents include:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/Design/Algebra%20Layer"},(0,a.kt)("strong",{parentName:"a"},"Algebra Layer"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/Design/Schema%20Layer"},(0,a.kt)("strong",{parentName:"a"},"Schema Layer"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/Design/Cache%20Layer/intro"},(0,a.kt)("strong",{parentName:"a"},"Cache Layer"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/Design/B+%20Tree%20Layer"},(0,a.kt)("strong",{parentName:"a"},"B+ Tree Layer"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/Design/Block%20Access%20Layer"},(0,a.kt)("strong",{parentName:"a"},"Block Access Layer"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/Design/Buffer%20Layer/intro"},(0,a.kt)("strong",{parentName:"a"},"Buffer Layer"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/Design/Physical%20Layer"},(0,a.kt)("strong",{parentName:"a"},"Physical Layer")))),(0,a.kt)("p",null,"In addition to the above layers, NITCbase provides a command line interface called ",(0,a.kt)("a",{parentName:"p",href:"/docs/Design/Frontend"},"Frontend Interface")," to the users in which they can execute any database query.\nThis layer is responsible for translating the SQL-like queries given as input to a set of lower-layer function calls."),(0,a.kt)("p",null,"The following diagram shows the organization of different layers of NITCbase and important C++ classes present within them.\nYou can use this diagram to navigate to different parts of this section by clicking on the relevant layers."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Architecture",src:r(8791).Z,width:"921",height:"1561"})))}u.isMDXComponent=!0},8791:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/Architecture-6c1b96d3bf5e12a84ddbbca2cf051586.svg"}}]);