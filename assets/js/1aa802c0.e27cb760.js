"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[3687],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),f=l(n),d=a,u=f["".concat(c,".").concat(d)]||f[d]||p[d]||i;return n?r.createElement(u,o(o({ref:t},m),{},{components:n})):r.createElement(u,o({ref:t},m))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4430:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const i={title:"XFS Interface",sidebar_position:3},o=void 0,s={unversionedId:"Misc/XFS Interface",id:"Misc/XFS Interface",title:"XFS Interface",description:"XFS Interface is an external command-line interface to access the NITCBase filesystem from the host (UNIX) system.",source:"@site/docs/Misc/XFS Interface.md",sourceDirName:"Misc",slug:"/Misc/XFS Interface",permalink:"/docs/Misc/XFS Interface",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"XFS Interface",sidebar_position:3},sidebar:"Misc",previous:{title:"Docker Based Setup",permalink:"/docs/Misc/DockerSetup"},next:{title:"B+ Trees",permalink:"/docs/Misc/B+ Trees"}},c={},l=[],m={toc:l};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"XFS Interface is an external command-line interface to access the NITCBase filesystem from the host (UNIX) system.\nThe filesystem is simulated on a binary file (",(0,a.kt)("inlineCode",{parentName:"p"},"disk"),"). This interface aims to provide the functionality of ",(0,a.kt)("strong",{parentName:"p"},"formatting and initializing the disk and transferring relations from/to the host system to/from the disk"),". This is helpful in debugging the system during its implementation."),(0,a.kt)("p",null,"There are ",(0,a.kt)("strong",{parentName:"p"},"four")," types of commands supported by the XFS interface:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/ddl"},"Data Definition Language(DDL) Commands ")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/dml"},"Data Manipulation Language(DML) Commands")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/efs"},"XFS / External File System Commands")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/script-cmds"},"Script Commands"))),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"XFS interface has been implemented completely and provided to you"),". It is available in the ",(0,a.kt)("inlineCode",{parentName:"p"},"XFS_Interface")," directory. Feel free to follow the ",(0,a.kt)("a",{parentName:"p",href:"/docs/Misc/Installation%20Guidelines"},"installation guidelines provided here")," and familiarize yourself with the commands. Refer to the ",(0,a.kt)("a",{parentName:"p",href:"/docs/User%20Interface%20Commands/introduction"},"NITCbase Commands section")," to get the specifications for each commmand."))}p.isMDXComponent=!0}}]);