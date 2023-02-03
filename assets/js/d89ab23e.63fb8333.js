"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[2278],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),p=l(n),u=a,f=p["".concat(s,".").concat(u)]||p[u]||d[u]||i;return n?r.createElement(f,o(o({ref:t},m),{},{components:n})):r.createElement(f,o({ref:t},m))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},8567:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const i={sidebar_position:5,title:"Script Commands",tags:["Script","commands"]},o=void 0,c={unversionedId:"User Interface Commands/script-cmds",id:"User Interface Commands/script-cmds",title:"Script Commands",description:"Script commands are available for both XFS interface and frontend interface. These commands help the user to execute mutliple commands sequentially from a file and also to print out custom useful messages into terminal for debugging and informational purposes.",source:"@site/docs/User Interface Commands/script-cmds.md",sourceDirName:"User Interface Commands",slug:"/User Interface Commands/script-cmds",permalink:"/docs/User Interface Commands/script-cmds",draft:!1,tags:[{label:"Script",permalink:"/docs/tags/script"},{label:"commands",permalink:"/docs/tags/commands"}],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Script Commands",tags:["Script","commands"]},sidebar:"Commands",previous:{title:"XFS Commands",permalink:"/docs/User Interface Commands/efs"}},s={},l=[{value:"Batch Execution",id:"batch-execution",level:3},{value:"Description",id:"description",level:4},{value:"Syntax",id:"syntax",level:4},{value:"Echo",id:"echo",level:3},{value:"Description",id:"description-1",level:4},{value:"Syntax",id:"syntax-1",level:4}],m={toc:l};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Script commands are available for both XFS interface and frontend interface. These commands help the user to execute mutliple commands sequentially from a file and also to print out custom useful messages into terminal for debugging and informational purposes."),(0,a.kt)("h3",{id:"batch-execution"},"Batch Execution"),(0,a.kt)("h4",{id:"description"},"Description"),(0,a.kt)("p",null,"This command is used to run multiple commands in sequence by reading the commands line-by-line from an external file. For example the ",(0,a.kt)("inlineCode",{parentName:"p"},"run")," command given below will execute commands present in ",(0,a.kt)("inlineCode",{parentName:"p"},"filename"),". If there is an error on running a command at a given line, all commands after that ",(0,a.kt)("strong",{parentName:"p"},"will not be excuted")," and the ",(0,a.kt)("inlineCode",{parentName:"p"},"run")," command fails by giving the line number of the command in which error occurred."),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},"File name given as input to ",(0,a.kt)("inlineCode",{parentName:"li"},"run")," command is fetched from the ",(0,a.kt)("inlineCode",{parentName:"li"},"/Files/Batch_Execution_Files/")," directory and hence are required to be placed in that folder."))),(0,a.kt)("h4",{id:"syntax"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"run filename\n")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},"This is useful to execute multiple commonly used commands while debugging."),(0,a.kt)("li",{parentName:"ul"},"We can use folders within ",(0,a.kt)("inlineCode",{parentName:"li"},"/Files/Batch_Execution_Files/")," to organize the run files. In that case, ",(0,a.kt)("inlineCode",{parentName:"li"},"run folder_name/run_file")," format can be used."))),(0,a.kt)("h3",{id:"echo"},"Echo"),(0,a.kt)("h4",{id:"description-1"},"Description"),(0,a.kt)("p",null,"This command is used to echo back the message given as argument to the command line."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"This is useful while debugging in combination with the ",(0,a.kt)("inlineCode",{parentName:"p"},"run")," command.")),(0,a.kt)("h4",{id:"syntax-1"},"Syntax"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"echo <any message>\n")))}d.isMDXComponent=!0}}]);