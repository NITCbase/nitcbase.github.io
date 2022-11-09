"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[108],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(h,i(i({ref:t},u),{},{components:n})):a.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294),r=n(6010);const o="tabItem_Ymn6";function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,i),hidden:n},t)}},5488:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(7462),r=n(7294),o=n(6010),i=n(2389),l=n(7392),s=n(7094),c=n(2466);const u="tabList__CuJ",p="tabItem_LNqP";function d(e){var t;const{lazy:n,block:i,defaultValue:d,values:m,groupId:h,className:b}=e,k=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=m??k.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),f=(0,l.l)(g,((e,t)=>e.value===t.value));if(f.length>0)throw new Error(`Docusaurus error: Duplicate values "${f.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const v=null===d?d:d??(null==(t=k.find((e=>e.props.default)))?void 0:t.props.value)??k[0].props.value;if(null!==v&&!g.some((e=>e.value===v)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${v}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:N}=(0,s.U)(),[w,T]=(0,r.useState)(v),I=[],{blockElementScrollPositionUntilNextRender:D}=(0,c.o5)();if(null!=h){const e=y[h];null!=e&&e!==w&&g.some((t=>t.value===e))&&T(e)}const C=e=>{const t=e.currentTarget,n=I.indexOf(t),a=g[n].value;a!==w&&(D(t),T(a),null!=h&&N(h,String(a)))},x=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=I.indexOf(e.currentTarget)+1;n=I[t]??I[0];break}case"ArrowLeft":{const t=I.indexOf(e.currentTarget)-1;n=I[t]??I[I.length-1];break}}null==(t=n)||t.focus()};return r.createElement("div",{className:(0,o.Z)("tabs-container",u)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":i},b)},g.map((e=>{let{value:t,label:n,attributes:i}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>I.push(e),onKeyDown:x,onFocus:C,onClick:C},i,{className:(0,o.Z)("tabs__item",p,null==i?void 0:i.className,{"tabs__item--active":w===t})}),n??t)}))),n?(0,r.cloneElement)(k.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},k.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function m(e){const t=(0,i.Z)();return r.createElement(d,(0,a.Z)({key:String(t)},e))}},874:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var a=n(7462),r=(n(7294),n(3905)),o=n(5488),i=n(5162);const l={sidebar_position:2,title:"Docker Based Setup"},s="Docker Based Setup",c={unversionedId:"Misc/DockerSetup",id:"Misc/DockerSetup",title:"Docker Based Setup",description:"Follow the instructions below to set up your NITCbase work environment in docker.",source:"@site/docs/Misc/DockerSetup.md",sourceDirName:"Misc",slug:"/Misc/DockerSetup",permalink:"/docs/Misc/DockerSetup",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Docker Based Setup"},sidebar:"Misc",previous:{title:"Installation Guidelines",permalink:"/docs/Misc/Installation Guidelines"},next:{title:"XFS Interface",permalink:"/docs/Misc/XFS Interface"}},u={},p=[{value:"Install and setup Docker on host machine",id:"install-and-setup-docker-on-host-machine",level:2},{value:"Setting up the container",id:"setting-up-the-container",level:2},{value:"Building the container image",id:"building-the-container-image",level:3},{value:"Start the container instance",id:"start-the-container-instance",level:3},{value:"Connecting to the container",id:"connecting-to-the-container",level:3},{value:"Running the setup script",id:"running-the-setup-script",level:2}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"docker-based-setup"},"Docker Based Setup"),(0,r.kt)("p",null,"Follow the instructions below to set up your NITCbase work environment in docker."),(0,r.kt)("h2",{id:"install-and-setup-docker-on-host-machine"},"Install and setup Docker on host machine"),(0,r.kt)("p",null,"Follow the instructions available ",(0,r.kt)("a",{parentName:"p",href:"https://docs.docker.com/get-docker/"},"here")," to install docker on your machine."),(0,r.kt)("p",null,"You could also go through the ",(0,r.kt)("a",{parentName:"p",href:"https://docs.docker.com/get-started/"},"Docker quick start quide")," to know more about Docker ."),(0,r.kt)("admonition",{title:"WARNING",type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The following has ",(0,r.kt)("strong",{parentName:"p"},"not")," been tested on ",(0,r.kt)("em",{parentName:"p"},"Windows"),".\nIf you encounter any issues or have any suggestions, raise an issue ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/nitcbase/nitcbase.github.io/issues/new"},"here"))),(0,r.kt)("h2",{id:"setting-up-the-container"},"Setting up the container"),(0,r.kt)("p",null,"We'll assume the following directory structure"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-plaintext"},".\n\u251c\u2500\u2500 Dockerfile\n\u2514\u2500\u2500 NITCbase/ # <- files will be stored here and mapped to container\n")),(0,r.kt)("p",null,"We'll store all the required files in ",(0,r.kt)("inlineCode",{parentName:"p"},"NITCbase")," and map the same into the container."),(0,r.kt)("p",null,"We can create the structure using the below commands"),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(i.Z,{value:"unix/linux",label:"Unix/Linux",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd <your directory>\ntouch Dockerfile\nmkdir NITCbase\n"))),(0,r.kt)(i.Z,{value:"windows",label:"Windows",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-powershell"},"cd <your directory>\nNew-Item Dockerfile\nNew-Item -path NITCbase -ItemType directory\n")))),(0,r.kt)("p",null,"The contents of ",(0,r.kt)("inlineCode",{parentName:"p"},"Dockerfile")," are given below"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-Dockerfile"},"FROM ubuntu:20.04\n\nRUN apt-get update \\\n    && apt-get install -y libc6-dev vim nano make gcc git build-essential\n\nRUN useradd -m nitcbase\nUSER nitcbase\n\n\nRUN cd /home/nitcbase \\\n    && wget https://raw.githubusercontent.com/nitcbase/nitcbase-bootstrap/main/setup.sh \\\n    && mkdir NITCbase\n\nWORKDIR /home/nitcbase/NITCbase\n")),(0,r.kt)("p",null,"The given ",(0,r.kt)("inlineCode",{parentName:"p"},"Dockerfile")," will setup the NITCbase environment."),(0,r.kt)("h3",{id:"building-the-container-image"},"Building the container image"),(0,r.kt)("p",null,"We'll now build the container image using the ",(0,r.kt)("inlineCode",{parentName:"p"},"Dockerfile")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker build -t nitcbase:ubuntu20.04 .\n")),(0,r.kt)("h3",{id:"start-the-container-instance"},"Start the container instance"),(0,r.kt)("p",null,"We'll start an instance of the container and map the local folder ",(0,r.kt)("inlineCode",{parentName:"p"},"NITCbase")," into ",(0,r.kt)("inlineCode",{parentName:"p"},"/home/nitcbase/NITCbase")," directory of the container."),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(i.Z,{value:"unix/linux",label:"Unix/Linux",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker run -v $PWD/NITCbase:/home/nitcbase/NITCbase -d --name nitcbase -i nitcbase:ubuntu20.04\n"))),(0,r.kt)(i.Z,{value:"windows",label:"Windows",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-powershell"},"docker run -v ${PWD}/NITCbase:/home/nitcbase/NITCbase -d --name nitcbase -i nitcbase:ubuntu20.04\n")))),(0,r.kt)("p",null,"We now have a container instance running in background with the name ",(0,r.kt)("inlineCode",{parentName:"p"},"nitcbase")," and required volume mounts"),(0,r.kt)("h3",{id:"connecting-to-the-container"},"Connecting to the container"),(0,r.kt)("p",null,"We can connect to the container instance using the following commands.\n",(0,r.kt)("strong",{parentName:"p"},"These are the only commands you will need to connect to the container going forward.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker start nitcbase # if the container instance is not already running\n\ndocker exec -it nitcbase /bin/bash # to get a bash shell inside the container\n")),(0,r.kt)("h2",{id:"running-the-setup-script"},"Running the setup script"),(0,r.kt)("p",null,"Connect to the container instance as mentioned earlier."),(0,r.kt)("p",null,"Run the following commands in the terminal connected to the container."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd /home/nitcbase\nchmod +x ./setup.sh\n./setup.sh\n")),(0,r.kt)("p",null,"You can now proceed to the ",(0,r.kt)("a",{parentName:"p",href:"/docs/Misc/Installation%20Guidelines#files-and-directories"},"Files and Directories")," section of the setup page."))}m.isMDXComponent=!0}}]);