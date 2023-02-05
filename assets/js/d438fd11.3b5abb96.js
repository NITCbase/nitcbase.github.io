"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[4562],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),s=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),d=s(n),m=r,b=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return n?a.createElement(b,o(o({ref:t},c),{},{components:n})):a.createElement(b,o({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var u={};for(var i in t)hasOwnProperty.call(t,i)&&(u[i]=t[i]);u.originalType=e,u.mdxType="string"==typeof e?e:r,o[1]=u;for(var s=2;s<l;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7294),r=n(6010);const l="tabItem_Ymn6";function o(e){let{children:t,hidden:n,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(l,o),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>N});var a=n(7462),r=n(7294),l=n(6010),o=n(2466),u=n(6550),i=n(1980),s=n(7392),c=n(12);function p(e){return function(e){return r.Children.map(e,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??p(n);return function(e){const t=(0,s.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:n}=e;const a=(0,u.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,l=d(e),[o,u]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[i,s]=b({queryString:n,groupId:a}),[p,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),g=(()=>{const e=i??p;return m({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{g&&u(g)}),[g]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);u(e),s(e),h(e)}),[s,h,l]),tabValues:l}}var g=n(2389);const f="tabList__CuJ",y="tabItem_LNqP";function v(e){let{className:t,block:n,selectedValue:u,selectValue:i,tabValues:s}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,o.o5)(),d=e=>{const t=e.currentTarget,n=c.indexOf(t),a=s[n].value;a!==u&&(p(t),i(a))},m=e=>{var t;let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;n=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;n=c[t]??c[c.length-1];break}}null==(t=n)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},s.map((e=>{let{value:t,label:n,attributes:o}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:u===t?0:-1,"aria-selected":u===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:d},o,{className:(0,l.Z)("tabs__item",y,null==o?void 0:o.className,{"tabs__item--active":u===t})}),n??t)})))}function k(e){let{lazy:t,children:n,selectedValue:a}=e;if(n=Array.isArray(n)?n:[n],t){const e=n.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function w(e){const t=h(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",f)},r.createElement(v,(0,a.Z)({},e,t)),r.createElement(k,(0,a.Z)({},e,t)))}function N(e){const t=(0,g.Z)();return r.createElement(w,(0,a.Z)({key:String(t)},e))}},3706:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>u,metadata:()=>s,toc:()=>p});var a=n(7462),r=(n(7294),n(3905)),l=n(4866),o=n(5162);const u={title:"GNU Debugger(GDB)"},i=void 0,s={unversionedId:"Misc/GDB",id:"Misc/GDB",title:"GNU Debugger(GDB)",description:"Introduction",source:"@site/docs/Misc/GDB.md",sourceDirName:"Misc",slug:"/Misc/GDB",permalink:"/docs/Misc/GDB",draft:!1,tags:[],version:"current",frontMatter:{title:"GNU Debugger(GDB)"}},c={},p=[{value:"Introduction",id:"introduction",level:2},{value:"Installation",id:"installation",level:2},{value:"Using GDB",id:"using-gdb",level:2}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"A debugger is a program that runs other programs, allowing the user to exercise control over these programs, and to examine variables when problems arise. GDB allows you to run the program up to a certain point, then stop and print out the values of certain variables at that point, or step through the program one line at a time and print out the values of each variable after executing each line."),(0,r.kt)("p",null,"Errors like segmentation faults may be easier to find with the help of gdb."),(0,r.kt)("p",null,"GDB allows you to:-"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Pause and continue its execution"),(0,r.kt)("li",{parentName:"ul"},'Set "break points" or conditions where the execution pauses so you can look at its state (the value of the variables at that point).'),(0,r.kt)("li",{parentName:"ul"},'View and "watch" variable values'),(0,r.kt)("li",{parentName:"ul"},"Step through the program line-by-line (or instruction by instruction)")),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("p",null,"Before you install GDB, check whether you have already installed it."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"gdb -help\n")),(0,r.kt)("p",null,'If you have already installed GDB, then it will display all the available options within your GDB,\nElse if the terminal says "command not found", then you can proceed with the installation process.'),(0,r.kt)(l.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"ubuntu",label:"Ubuntu / Debian",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt update\nsudo apt-get install -y gdb\n"))),(0,r.kt)(o.Z,{value:"fedora",label:"Fedora / Red Hat",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yum install gdb\n"))),(0,r.kt)(o.Z,{value:"arch",label:"Arch Linux",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pacman -Sy gdb\n")))),(0,r.kt)("p",null,"Now you can confirm the installation of GDB by executing the command ",(0,r.kt)("inlineCode",{parentName:"p"},"gdb -help")," again."),(0,r.kt)("h2",{id:"using-gdb"},"Using GDB"),(0,r.kt)("p",null,"You have to tell your compiler to compile your code with symbolic debugging information included. Here's how to do it with gcc, with the -g switch:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"g++ -g nitcbase.cpp -o nitcbase\n")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"The Makefile provided with NITCbase supports compiling in debug mode by running it as"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make mode=debug\n"))),(0,r.kt)("p",null,"Once you've done that, you should be able to view program listings in the debugger."),(0,r.kt)("p",null,"Your text editor/IDE might already come with debug functionality built-in. You can find below config for various text editors and IDEs to take advantage of their frontends."),(0,r.kt)(l.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"vscode",label:"VSCode",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".vscode/launch.json"',title:'".vscode/launch.json"'},'{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "name": "Debug nitcbase",\n      "cwd": "${workspaceFolder}",\n      "type": "cppdbg",\n      "request": "launch",\n      "program": "${workspaceFolder}/nitcbase", // Binary to exec\n      "stopAtEntry": false,\n      "environment": [],\n      "externalConsole": false,\n      "MIMode": "gdb",\n      "setupCommands": [\n        {\n          "description": "Enable pretty-printing for gdb",\n          "text": "-enable-pretty-printing",\n          "ignoreFailures": true\n        }\n      ],\n      "preLaunchTask": "${defaultBuildTask}",\n      "miDebuggerPath": "/usr/bin/gdb"\n    }\n  ]\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title=".vscode/tasks.json"',title:'".vscode/tasks.json"'},'{\n  "tasks": [\n    {\n      "type": "shell",\n      "label": "Build debug nitcbase",\n      "command": "/usr/bin/make",\n      "args": ["debug=true"],\n      "group": {\n        "kind": "build",\n        "isDefault": true\n      },\n      "problemMatcher": []\n    }\n  ],\n  "version": "2.0.0"\n}\n')),(0,r.kt)("p",null,'The "Debug nitcbase" task can be launched from the "Run and Debug" menu.')),(0,r.kt)(o.Z,{value:"tui",label:"Terminal",mdxType:"TabItem"},(0,r.kt)("p",null,"If you prefer to keep it within the terminal itself, you can use gdb with the ",(0,r.kt)("inlineCode",{parentName:"p"},"-tui")," flag."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"gdb -tui nitcbase\n# nitcbase is the executable here\n"))),(0,r.kt)(o.Z,{value:"emacs",label:"Emacs",mdxType:"TabItem"},(0,r.kt)("p",null,"looking for contributions"))),(0,r.kt)("hr",null),(0,r.kt)("p",null,"There's also the possibility of using the gdb prompt (i.e ",(0,r.kt)("inlineCode",{parentName:"p"},"dumb terminal mode"),") which might be harder to use than the earlier mentioned options."),(0,r.kt)("p",null,"You can most definitely find online documentation for how to use the debugger in your editor of choice, or just jump right into it and figure it out as you go."),(0,r.kt)("p",null,"If you feel you need a general overview of the usage of GDB, I'd recommend reading ",(0,r.kt)("a",{parentName:"p",href:"https://beej.us/guide/bggdb/"},"Beej's Quick Guide to GDB"),"."))}m.isMDXComponent=!0}}]);