"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[6914],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),c=p(n),u=i,k=c["".concat(s,".").concat(u)]||c[u]||m[u]||o;return n?a.createElement(k,l(l({ref:t},d),{},{components:n})):a.createElement(k,l({ref:t},d))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=c;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:i,l[1]=r;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},9880:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const o={sidebar_position:4,title:"XFS Commands"},l=void 0,r={unversionedId:"User Interface Commands/efs",id:"User Interface Commands/efs",title:"XFS Commands",description:"The XFS commands are used to format the disk, dump disk data structures like Block Allocation Map, Relation Catalog and Attribute Catalog, load / remove relations, list relations and copy the records of a relation on the NITCbase disk to a UNIX file. These commands are only available for the XFS Interface. The following are the XFS commands supported by NITCBase.",source:"@site/docs/User Interface Commands/efs.md",sourceDirName:"User Interface Commands",slug:"/User Interface Commands/efs",permalink:"/docs/User Interface Commands/efs",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"XFS Commands"},sidebar:"Commands",previous:{title:"Data Manipulation Language Commands",permalink:"/docs/User Interface Commands/dml"},next:{title:"Script Commands",permalink:"/docs/User Interface Commands/script-cmds"}},s={},p=[{value:"Format Disk",id:"format-disk",level:3},{value:"Description",id:"description",level:4},{value:"Syntax",id:"syntax",level:4},{value:"Import Relation",id:"import-relation",level:3},{value:"Description",id:"description-1",level:4},{value:"File Format",id:"file-format",level:4},{value:"Syntax",id:"syntax-1",level:4},{value:"Show Schema",id:"show-schema",level:3},{value:"Description",id:"description-2",level:4},{value:"Syntax",id:"syntax-2",level:4},{value:"Export Relation",id:"export-relation",level:3},{value:"Description",id:"description-3",level:4},{value:"Syntax",id:"syntax-3",level:4},{value:"List Relation Names",id:"list-relation-names",level:3},{value:"Description",id:"description-4",level:4},{value:"Syntax",id:"syntax-4",level:4},{value:"Dump Block Allocation Map",id:"dump-block-allocation-map",level:3},{value:"Description",id:"description-5",level:4},{value:"Syntax",id:"syntax-5",level:4},{value:"Dump Relation Catalog",id:"dump-relation-catalog",level:3},{value:"Description",id:"description-6",level:4},{value:"Syntax",id:"syntax-6",level:4},{value:"Dump Attribute Catalog",id:"dump-attribute-catalog",level:3},{value:"Description",id:"description-7",level:4},{value:"Syntax",id:"syntax-7",level:4},{value:"Exit",id:"exit",level:3},{value:"Description",id:"description-8",level:4},{value:"Syntax",id:"syntax-8",level:4},{value:"Print B+ Tree",id:"print-b-tree",level:3},{value:"Description",id:"description-9",level:4},{value:"Syntax",id:"syntax-9",level:4},{value:"Export B+ Blocks",id:"export-b-blocks",level:3},{value:"Description",id:"description-10",level:4},{value:"Syntax",id:"syntax-10",level:4}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The XFS commands are used to format the disk, dump disk data structures like Block Allocation Map, Relation Catalog and Attribute Catalog, load / remove relations, list relations and copy the records of a relation on the NITCbase disk to a UNIX file. These commands are only available for the XFS Interface. The following are the XFS commands supported by NITCBase."),(0,i.kt)("h3",{id:"format-disk"},"Format Disk"),(0,i.kt)("h4",{id:"description"},"Description"),(0,i.kt)("p",null,"This command is used to create a simulated disk or to format the disk if already it already exists. On the newly created/formatted disk, initialization of ",(0,i.kt)("em",{parentName:"p"},"disk data structures"),", namely - ",(0,i.kt)("inlineCode",{parentName:"p"},"Block allocation map"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Relation catalog")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Attribute catalog")," are done according to the specification for disk model given in the ",(0,i.kt)("a",{parentName:"p",href:"https://nitcbase.github.io/storage-model.html"},"Physical layer")," of NITCBase. The disk is simulated on a binary file called ",(0,i.kt)("inlineCode",{parentName:"p"},"disk")," which is located at ",(0,i.kt)("inlineCode",{parentName:"p"},"Disk/")," once it is created."),(0,i.kt)("admonition",{title:"Important Details",type:"note"},(0,i.kt)("ul",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("strong",{parentName:"li"},"first four blocks of the disk")," is used for storing the Block Allocation Map and hence ",(0,i.kt)("em",{parentName:"li"},"the first 4 entries in the Block Allocation Map is marked as occupied during the initialization of the disk.")),(0,i.kt)("li",{parentName:"ul"},"Blocks 4 and 5 used for storing relation catalog and attribute catalog are also marked as ",(0,i.kt)("inlineCode",{parentName:"li"},"REC")," type in the newly initialized Block Allocation Map as part of the fdisk routine."))),(0,i.kt)("h4",{id:"syntax"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"fdisk\n")),(0,i.kt)("h3",{id:"import-relation"},"Import Relation"),(0,i.kt)("h4",{id:"description-1"},"Description"),(0,i.kt)("p",null,"This command is used to load relations from the UNIX filesystem to the NITCbase disk. The argument ",(0,i.kt)("inlineCode",{parentName:"p"},"filename")," specifies the name of the ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Comma-separated_values"},"CSV")," (Comma Separated Values) file which contains the contents of the relation to be uploaded. The file names should ",(0,i.kt)("strong",{parentName:"p"},"not")," contain ",(0,i.kt)("inlineCode",{parentName:"p"},"whitespaces")," or any special characters except ",(0,i.kt)("inlineCode",{parentName:"p"},"-")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"_"),". The command checks the size of the relation in the ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Comma-separated_values"},"CSV")," file, allocates the required number of blocks for the relation, updates the ",(0,i.kt)("inlineCode",{parentName:"p"},"Block allocation map"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Relation catalog")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Attribute catalog"),"."),(0,i.kt)("h4",{id:"file-format"},"File Format"),(0,i.kt)("p",null,"The records to be added in the relation must be in a ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Comma-separated_values"},"CSV")," file.\nThe CSV file ",(0,i.kt)("strong",{parentName:"p"},"must follow")," the following format:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The first line must contain the names of the attributes of the relation separated by commas."),(0,i.kt)("li",{parentName:"ul"},"Second line onwards records are specified as ",(0,i.kt)("em",{parentName:"li"},"comma-seperated attribute values"),", in the ",(0,i.kt)("strong",{parentName:"li"},"same order")," as the attributes listed in the first line."),(0,i.kt)("li",{parentName:"ul"},"Only ",(0,i.kt)("strong",{parentName:"li"},"one record is allowed per line.")),(0,i.kt)("li",{parentName:"ul"},"The CSV file must be stored in the path ",(0,i.kt)("inlineCode",{parentName:"li"},"Files/Input_Files"),".")),(0,i.kt)("h4",{id:"syntax-1"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"import filename\n")),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("ul",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ul"},"The data types of the attributes in the first line are inferred from the values of the corresponding attributes on the second line of the CSV file."),(0,i.kt)("li",{parentName:"ul"},"The name of the CSV file must be the same as the relation to be imported to the disk. i.e. the CSV file name should be in the format ",(0,i.kt)("inlineCode",{parentName:"li"},"relname.csv"),", where relname is taken as name of the new relation."),(0,i.kt)("li",{parentName:"ul"},"First ",(0,i.kt)("strong",{parentName:"li"},"15 characters of name of file is taken as the relation name"),". Similarly, only the first 15 characters of attributes listed in first line of the CSV file is taken as the name for each attribute."),(0,i.kt)("li",{parentName:"ul"},"The CSV file ",(0,i.kt)("strong",{parentName:"li"},"should not contain any null values.")),(0,i.kt)("li",{parentName:"ul"},"If a relation with the same name as that of the CSV file already exists, then the import will ",(0,i.kt)("em",{parentName:"li"},"fail, without any changes to disk.")),(0,i.kt)("li",{parentName:"ul"},"All files to be imported should be stored in the path ",(0,i.kt)("inlineCode",{parentName:"li"},"Files/Input_Files"),"."),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("em",{parentName:"li"},"order of attribute values in each line of the CSV file must be same as that of the attributes of the relation.")),(0,i.kt)("li",{parentName:"ul"},"The number of attribute values in each row should match the number of attributes specified in the first line of the file."),(0,i.kt)("li",{parentName:"ul"},"The types of attribute values in each row should match the attribute types inferred from the second line of the file."),(0,i.kt)("li",{parentName:"ul"},"All attribute names of the relation must be unique."))),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Consider the sample ",(0,i.kt)("inlineCode",{parentName:"p"},"Students.csv")," file:"),(0,i.kt)("p",{parentName:"admonition"},'`Files/Input_Files/Students.csv"\nNo,Name,Cgpa\n3,Sunny,8.2\n5,Sania,6.0\n7,Ralph,7.5'),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre"},"`import Students.csv` command will import relation `Students` into the disk\n\nThe first line in the CSV file represents the list of attributes in the relation which in this case are No, Name, Cgpa.\nThe datatypes of the attributes are determined from the values of the attributes in the second line.\nAn attribute can be an a number or a string. In this example the datatypes will be number, string and number respectively.\n"))),(0,i.kt)("h3",{id:"show-schema"},"Show Schema"),(0,i.kt)("h4",{id:"description-2"},"Description"),(0,i.kt)("p",null,"This command is used to view the schema of a relation from XFS / NITCbase disk. All the attributes of the relation as well as their type and whether they have an index is printed to the console."),(0,i.kt)("h4",{id:"syntax-2"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"schema tablename\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"To see the schema of a relation ",(0,i.kt)("inlineCode",{parentName:"p"},"Students")," present in the NITCbase disk, execute the following command:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"schema Students\n"))),(0,i.kt)("h3",{id:"export-relation"},"Export Relation"),(0,i.kt)("h4",{id:"description-3"},"Description"),(0,i.kt)("p",null,"This command is used to export a relation from XFS / NITCbase disk to UNIX file system. All the records corresponding to the relation ",(0,i.kt)("inlineCode",{parentName:"p"},"tablename")," are written to a CSV file named ",(0,i.kt)("inlineCode",{parentName:"p"},"filename.csv"),", located at ",(0,i.kt)("inlineCode",{parentName:"p"},"Files/Output_Files")),(0,i.kt)("h4",{id:"syntax-3"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"export tablename filename\n")),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("ul",{parentName:"admonition"},(0,i.kt)("li",{parentName:"ul"},"The file to which output is to be written must be a CSV file."),(0,i.kt)("li",{parentName:"ul"},"The file names should not contain ",(0,i.kt)("inlineCode",{parentName:"li"},"whitespaces")," or any special characters except ",(0,i.kt)("inlineCode",{parentName:"li"},"-")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"_"),"."))),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"To export a relation ",(0,i.kt)("inlineCode",{parentName:"p"},"Students")," present in the NITCbase disk to a CSV file (named ",(0,i.kt)("inlineCode",{parentName:"p"},"Marks.csv")," located at ",(0,i.kt)("inlineCode",{parentName:"p"},"Files/Output_Files")," directory),\nexecute the following command:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"export Students Marks.csv\n"))),(0,i.kt)("h3",{id:"list-relation-names"},"List Relation Names"),(0,i.kt)("h4",{id:"description-4"},"Description"),(0,i.kt)("p",null,"This command is used to list the names of all relations in present in NITCbase / XFS Disk to the command line."),(0,i.kt)("h4",{id:"syntax-4"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"ls\n")),(0,i.kt)("h3",{id:"dump-block-allocation-map"},"Dump Block Allocation Map"),(0,i.kt)("h4",{id:"description-5"},"Description"),(0,i.kt)("p",null,"This command is used to dump the contents of the ",(0,i.kt)("inlineCode",{parentName:"p"},"Block allocation map")," into an external file named ",(0,i.kt)("inlineCode",{parentName:"p"},"block_allocation_map.txt")," located at 'Files/Output_Files`."),(0,i.kt)("h4",{id:"syntax-5"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"dump bmap\n")),(0,i.kt)("h3",{id:"dump-relation-catalog"},"Dump Relation Catalog"),(0,i.kt)("h4",{id:"description-6"},"Description"),(0,i.kt)("p",null,"This command is used to copy the contents of ",(0,i.kt)("inlineCode",{parentName:"p"},"Relation catalog")," to an external file named ",(0,i.kt)("inlineCode",{parentName:"p"},"relation_catalog.txt")," located at ",(0,i.kt)("inlineCode",{parentName:"p"},"Files/Output_Files"),"."),(0,i.kt)("h4",{id:"syntax-6"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"dump relcat\n")),(0,i.kt)("h3",{id:"dump-attribute-catalog"},"Dump Attribute Catalog"),(0,i.kt)("h4",{id:"description-7"},"Description"),(0,i.kt)("p",null,"This command is used to copy the contents of ",(0,i.kt)("inlineCode",{parentName:"p"},"Attribute catalog")," to an external file named ",(0,i.kt)("inlineCode",{parentName:"p"},"attribute_catalog.txt")," located at ",(0,i.kt)("inlineCode",{parentName:"p"},"Files/Output_Files"),"."),(0,i.kt)("h4",{id:"syntax-7"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"dump attrcat\n")),(0,i.kt)("h3",{id:"exit"},"Exit"),(0,i.kt)("h4",{id:"description-8"},"Description"),(0,i.kt)("p",null,"This command is used to exit the XFS Interface."),(0,i.kt)("h4",{id:"syntax-8"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"exit\n")),(0,i.kt)("h3",{id:"print-b-tree"},"Print B+ Tree"),(0,i.kt)("h4",{id:"description-9"},"Description"),(0,i.kt)("p",null,"This command is used to print the ",(0,i.kt)("inlineCode",{parentName:"p"},"B+ tree"),"(in a level order manner) corresponding to the index created on an attribute of a relation. If index does not exist then an error message of ",(0,i.kt)("inlineCode",{parentName:"p"},"Index does not exist")," is returned."),(0,i.kt)("h4",{id:"syntax-9"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"print b+ tree relation_name.attribute_name\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Consider the sample ",(0,i.kt)("inlineCode",{parentName:"p"},"numbers.csv")," file:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-c",metastring:'title="/Files/numbers.csv"',title:'"/Files/numbers.csv"'},"key\n10\n5\n75\n20\n.\n.\n.\n")),(0,i.kt)("p",{parentName:"admonition"},"Assume an index is created on the attribute ",(0,i.kt)("inlineCode",{parentName:"p"},"key"),". Now to print the B+ tree corresponding to that index the following command can be used:\n",(0,i.kt)("inlineCode",{parentName:"p"},"print b+ tree numbers.key"),". This will give the following output:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre"},"LEVEL 0\n40\nLEVEL 1\n10,20   55,65\nLEVEL 2\n5,10   15,20   25,40,40   45,55   60,65   70,75\n")),(0,i.kt)("blockquote",{parentName:"admonition"},(0,i.kt)("p",{parentName:"blockquote"},"The tree is printed in a level-order manner.\nIn the above B+ tree, ",(0,i.kt)("inlineCode",{parentName:"p"},"40")," is the root node and it's left and right child nodes are ",(0,i.kt)("inlineCode",{parentName:"p"},"10,20")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"55,65")," respectively"))),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"In the above example, output shown is for a B+ tree which allows that maximum ",(0,i.kt)("inlineCode",{parentName:"p"},"4")," keys in the internal node and maximum ",(0,i.kt)("inlineCode",{parentName:"p"},"3")," keys in the leaf nodes. In NITCbase B+ tree design, maximum ",(0,i.kt)("inlineCode",{parentName:"p"},"100")," keys are allowed in the internal node and maximum ",(0,i.kt)("inlineCode",{parentName:"p"},"63")," keys are allowed in the leaf node.")),(0,i.kt)("h3",{id:"export-b-blocks"},"Export B+ Blocks"),(0,i.kt)("h4",{id:"description-10"},"Description"),(0,i.kt)("p",null,"This command is used to export the data stored in ",(0,i.kt)("inlineCode",{parentName:"p"},"index blocks"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"internal index blocks")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"leaf index blocks"),") of the ",(0,i.kt)("inlineCode",{parentName:"p"},"B+ tree")," corresponding to an attribute of a relation. If index does not exist then an error message of ",(0,i.kt)("inlineCode",{parentName:"p"},"Index does not exist")," is returned. All the blocks corresponding to the index are written to a TXT file named ",(0,i.kt)("inlineCode",{parentName:"p"},"filename.txt"),", located at ",(0,i.kt)("inlineCode",{parentName:"p"},"Files/Output_Files")),(0,i.kt)("h4",{id:"syntax-10"},"Syntax"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"export b+ blocks relation_name.attribute_name filename.txt\n")),(0,i.kt)("admonition",{title:"Example",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Consider the sample ",(0,i.kt)("inlineCode",{parentName:"p"},"numbers.csv")," file:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-c",metastring:'title="Files/Input_Files/numbers.csv"',title:'"Files/Input_Files/numbers.csv"'},"key\n10\n5\n75\n20\n.\n.\n.\n")),(0,i.kt)("p",{parentName:"admonition"},"Assume an index is created on the attribute ",(0,i.kt)("inlineCode",{parentName:"p"},"key"),". Now to print the index blocks corresponding to that index the following command can be used:\n",(0,i.kt)("inlineCode",{parentName:"p"},"export b+ blocks numbers.key numbers.txt"),". This will give the following file."),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-plain",metastring:'title="Files/Output_Files/numbers.txt"',title:'"Files/Output_Files/numbers.txt"'},"----- B+ TREE BLOCKS -----\nBLOCK 15\nBlock Type: IND_INTERNAL\nParent Block: -1\nNo of entries: 1\nlchild: 9, key_val: 40, rchild: 14\n---------\nBLOCK 9\nBlock Type: IND_INTERNAL\nParent Block: 15\nNo of entries: 2\nlchild: 7, key_val: 10, rchild: 8\nlchild: 8, key_val: 20, rchild: 11\n---------\nBLOCK 7\nBlock Type: IND_LEAF\nParent Block: 9\nNo of entries: 2\nleft node: -1, right node: 8\nkey_val: 5\nkey_val: 10\n---------\nBLOCK 8\nBlock Type: IND_LEAF\nParent Block: 9\nNo of entries: 2\nleft node: 7, right node: 11\nkey_val: 15\nkey_val: 20\n---------\nBLOCK 11\nBlock Type: IND_LEAF\nParent Block: 9\nNo of entries: 3\nleft node: 8, right node: 13\nkey_val: 25\nkey_val: 40\nkey_val: 40\n---------\nBLOCK 14\nBlock Type: IND_INTERNAL\nParent Block: 15\nNo of entries: 2\nlchild: 13, key_val: 55, rchild: 10\nlchild: 10, key_val: 65, rchild: 12\n---------\nBLOCK 13\nBlock Type: IND_LEAF\nParent Block: 14\nNo of entries: 2\nleft node: 11, right node: 10\nkey_val: 45\nkey_val: 55\n---------\nBLOCK 10\nBlock Type: IND_LEAF\nParent Block: 14\nNo of entries: 2\nleft node: 13, right node: 12\nkey_val: 60\nkey_val: 65\n---------\nBLOCK 12\nBlock Type: IND_LEAF\nParent Block: 14\nNo of entries: 2\nleft node: 10, right node: -1\nkey_val: 70\nkey_val: 75\n---------\n")),(0,i.kt)("blockquote",{parentName:"admonition"},(0,i.kt)("p",{parentName:"blockquote"},"The b+ tree blocks is printed in a level-order manner."))),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"In the above example, output shown is for a B+ tree which allows that maximum ",(0,i.kt)("inlineCode",{parentName:"p"},"4")," keys in the internal node and maximum ",(0,i.kt)("inlineCode",{parentName:"p"},"3")," keys in the leaf nodes. In NITCbase B+ tree design, maximum ",(0,i.kt)("inlineCode",{parentName:"p"},"100")," keys are allowed in the internal node and maximum ",(0,i.kt)("inlineCode",{parentName:"p"},"63")," keys are allowed in the leaf node.")))}m.isMDXComponent=!0}}]);