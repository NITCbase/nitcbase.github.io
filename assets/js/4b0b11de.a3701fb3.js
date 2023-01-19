"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[3136],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),m=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=m(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=m(n),f=a,u=d["".concat(c,".").concat(f)]||d[f]||p[f]||o;return n?r.createElement(u,i(i({ref:t},l),{},{components:n})):r.createElement(u,i({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var m=2;m<o;m++)i[m]=n[m];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2784:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>m});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:1,title:"User Interface Commands",tags:["introduction"]},i=void 0,s={unversionedId:"User Interface Commands/introduction",id:"User Interface Commands/introduction",title:"User Interface Commands",description:"NITCbase supports two user interfaces namely, XFS Interface and Frontend Interface. The commands supported by the two interfaces fall into the following four categories:",source:"@site/docs/User Interface Commands/introduction.md",sourceDirName:"User Interface Commands",slug:"/User Interface Commands/introduction",permalink:"/docs/User Interface Commands/introduction",draft:!1,tags:[{label:"introduction",permalink:"/docs/tags/introduction"}],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"User Interface Commands",tags:["introduction"]},sidebar:"Commands",next:{title:"Data Definition Language Commands",permalink:"/docs/User Interface Commands/ddl"}},c={},m=[],l={toc:m};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"NITCbase supports two user interfaces namely, ",(0,a.kt)("a",{parentName:"p",href:"/docs/Misc/XFS%20Interface"},"XFS Interface")," and ",(0,a.kt)("a",{parentName:"p",href:"/docs/Design/Frontend"},"Frontend Interface"),". The commands supported by the two interfaces fall into the following ",(0,a.kt)("strong",{parentName:"p"},"four")," categories:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/ddl"},"Data Definition Language(DDL) Commands ")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/dml"},"Data Manipulation Language(DML) Commands")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/efs"},"XFS + External File System Commands")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"/docs/User%20Interface%20Commands/script-cmds"},"Script Commands"))),(0,a.kt)("p",null,"Among the above commands, XFS Interface supports all four categories whereas Frontend Interface supports Data Definition Language(DDL), Data Manipulation Language(DML) and Script commands."))}p.isMDXComponent=!0}}]);