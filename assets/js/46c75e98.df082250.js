"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[144],{3905:(t,e,n)=>{n.d(e,{Zo:()=>c,kt:()=>d});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),m=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},c=function(t){var e=m(t.components);return a.createElement(p.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,p=t.parentName,c=o(t,["components","mdxType","originalType","parentName"]),u=m(n),d=r,N=u["".concat(p,".").concat(d)]||u[d]||s[d]||i;return n?a.createElement(N,l(l({ref:e},c),{},{components:n})):a.createElement(N,l({ref:e},c))}));function d(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,l[1]=o;for(var m=2;m<i;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4254:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>m});var a=n(7462),r=(n(7294),n(3905));const i={title:"Stage 12: Join on Relations"},l="Stage 12: Join on Relations (10 hours)",o={unversionedId:"Roadmap/Stage12",id:"Roadmap/Stage12",title:"Stage 12: Join on Relations",description:"- Implement the equi-join operation between relations in NITCbase",source:"@site/docs/Roadmap/Stage12.md",sourceDirName:"Roadmap",slug:"/Roadmap/Stage12",permalink:"/docs/Roadmap/Stage12",draft:!1,tags:[],version:"current",frontMatter:{title:"Stage 12: Join on Relations"},sidebar:"Roadmap",previous:{title:"Stage 11: Index Creation and Deletion",permalink:"/docs/Roadmap/Stage11"}},p={},m=[{value:"Introduction",id:"introduction",level:2},{value:"Implementation",id:"implementation",level:2}],c={toc:m};function s(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"stage-12-join-on-relations-10-hours"},"Stage 12: Join on Relations (10 hours)"),(0,r.kt)("admonition",{title:"Learning Objectives",type:"note"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Implement the equi-join operation between relations in NITCbase"))),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"The join operation is used to combine two relations with respect to a condition on two columns from the respective relations. NITCbase allows us to combine two relations into a new relation with the ",(0,r.kt)("inlineCode",{parentName:"p"},"=")," condition. This is called an ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Relational_algebra#%CE%B8-join_and_equijoin"},"equijoin"),"."),(0,r.kt)("p",null,"NITCbase also allows you to do a combination of join and project operations together in a single command to create a new target relation with the specified attributes from both relations."),(0,r.kt)("p",null,"The associated commands are specified below. Read the documentation for these commands by clicking on the respective links."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Frontend User Interface Command"),(0,r.kt)("th",{parentName:"tr",align:null},"Operation"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/User%20Interface%20Commands/dml#select--from-join-where"},"SELECT ","*"," FROM Rel1 JOIN Rel2 INTO TargetRel WHERE Rel1.Attr1 = Rel2.Attr2")),(0,r.kt)("td",{parentName:"tr",align:null},"join")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/docs/User%20Interface%20Commands/dml#select-attrlist-from-join-where"},"SELECT Attr1,Attr2 FROM Rel1 JOIN Rel2 INTO TargetRel WHERE Rel1.Attr1 = Rel2.Attr2")),(0,r.kt)("td",{parentName:"tr",align:null},"join + project")))),(0,r.kt)("br",null),(0,r.kt)("details",null,(0,r.kt)("summary",null,(0,r.kt)("p",null,"Q. Consider we have a relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Events")," with the attributes (",(0,r.kt)("inlineCode",{parentName:"p"},"id"),": NUM, ",(0,r.kt)("inlineCode",{parentName:"p"},"title"),": STR, ",(0,r.kt)("inlineCode",{parentName:"p"},"location"),": STR) and a relation ",(0,r.kt)("inlineCode",{parentName:"p"},"Locations")," with the attributes name(",(0,r.kt)("inlineCode",{parentName:"p"},"name"),": STR, ",(0,r.kt)("inlineCode",{parentName:"p"},"capacity"),": NUM). We run the following commands in NITCbase."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"OPEN TABLE Events;\nSELECT * FROM Events INTO Lectures WHERE location=ELHC;\nOPEN TABLE Locations;\nOPEN TABLE Lectures;\nSELECT title, location, capacity FROM Lectures JOIN Locations INTO LectureCapacities WHERE Lectures.location = Locations.name;\n")),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"What are the attribute cache entries for the relation ",(0,r.kt)("inlineCode",{parentName:"li"},"LectureCapacities"),"?"),(0,r.kt)("li",{parentName:"ol"},"Suppose we add a relation ",(0,r.kt)("inlineCode",{parentName:"li"},"Participants")," with attributes (",(0,r.kt)("inlineCode",{parentName:"li"},"regNo"),": NUM, ",(0,r.kt)("inlineCode",{parentName:"li"},"eventTitle"),": STR). Write commands to filter the ",(0,r.kt)("inlineCode",{parentName:"li"},"regNo")," of all the participants who are attending events happening in the location ",(0,r.kt)("inlineCode",{parentName:"li"},"Auditorium"),".")),(0,r.kt)("p",null,"(click to view answer)")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Answer")),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("table",{parentName:"li"},(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"RelName"),(0,r.kt)("th",{parentName:"tr",align:null},"AttributeName"),(0,r.kt)("th",{parentName:"tr",align:null},"AttributeType"),(0,r.kt)("th",{parentName:"tr",align:null},"PrimaryFlag"),(0,r.kt)("th",{parentName:"tr",align:null},"RootBlock"),(0,r.kt)("th",{parentName:"tr",align:null},"Offset"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Lecture Capacities"),(0,r.kt)("td",{parentName:"tr",align:null},"title"),(0,r.kt)("td",{parentName:"tr",align:null},"STR"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-1"),(0,r.kt)("td",{parentName:"tr",align:null},"0")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Lecture Capacities"),(0,r.kt)("td",{parentName:"tr",align:null},"location"),(0,r.kt)("td",{parentName:"tr",align:null},"STR"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-1"),(0,r.kt)("td",{parentName:"tr",align:null},"1")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Lecture Capacities"),(0,r.kt)("td",{parentName:"tr",align:null},"capacity"),(0,r.kt)("td",{parentName:"tr",align:null},"NUM"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-1"),(0,r.kt)("td",{parentName:"tr",align:null},"2"))))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"OPEN TABLE Events;\nOPEN TABLE Participants;\nSELECT regNo, location FROM Participants JOIN Events INTO ParticipantLocations WHERE Participants.eventTitle = Events.title;\nOPEN TABLE ParticipantLocations;\nSELECT regNo FROM ParticipantLocations INTO AuditoriumParticipants WHERE location=Auditorium;\n"))))),(0,r.kt)("h2",{id:"implementation"},"Implementation"))}s.isMDXComponent=!0}}]);