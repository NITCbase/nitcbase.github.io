"use strict";(self.webpackChunknitcbase=self.webpackChunknitcbase||[]).push([[1147],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>b});var r=t(7294);function f(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){f(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,r,f=function(e,n){if(null==e)return{};var t,r,f={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(f[t]=e[t]);return f}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(f[t]=e[t])}return f}var a=r.createContext({}),l=function(e){var n=r.useContext(a),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=l(e.components);return r.createElement(a.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,f=e.mdxType,o=e.originalType,a=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),d=l(t),b=f,h=d["".concat(a,".").concat(b)]||d[b]||s[b]||o;return t?r.createElement(h,i(i({ref:n},c),{},{components:t})):r.createElement(h,i({ref:n},c))}));function b(e,n){var t=arguments,f=n&&n.mdxType;if("string"==typeof e||f){var o=t.length,i=new Array(o);i[0]=d;var u={};for(var a in n)hasOwnProperty.call(n,a)&&(u[a]=n[a]);u.originalType=e,u.mdxType="string"==typeof e?e:f,i[1]=u;for(var l=2;l<o;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1138:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>u,toc:()=>l});var r=t(7462),f=(t(7294),t(3905));const o={sidebar_position:7,title:"Buffer Layer"},i="Buffer Layer Stub Code",u={unversionedId:"Misc/stub/buffer",id:"Misc/stub/buffer",title:"Buffer Layer",description:"StaticBuffer.cpp",source:"@site/docs/Misc/stub/buffer.md",sourceDirName:"Misc/stub",slug:"/Misc/stub/buffer",permalink:"/docs/Misc/stub/buffer",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,title:"Buffer Layer"},sidebar:"stubSidebar",previous:{title:"Cache Layer",permalink:"/docs/Misc/stub/cache"}},a={},l=[{value:"StaticBuffer.cpp",id:"staticbuffercpp",level:2},{value:"BlockBuffer.cpp",id:"blockbuffercpp",level:2}],c={toc:l};function s(e){let{components:n,...t}=e;return(0,f.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,f.kt)("h1",{id:"buffer-layer-stub-code"},"Buffer Layer Stub Code"),(0,f.kt)("h2",{id:"staticbuffercpp"},"StaticBuffer.cpp"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-cpp"},"StaticBuffer::StaticBuffer(){\n    // copy Block Allocation Map blocks from disk to blockAllocMap using Disk::readBlock()\n\n    //initialize metaInfo of all the buffer blocks with free:true, dirty:false, blockNum:-1 and timeStamp:-1.\n}\n\n\nStaticBuffer::~StaticBuffer(){\n    // copy blockAllocMap to Block Allocation Map blocks in the disk using Disk::writeBlock().\n\n    /* iterate through all the metaInfo entries,\n      write back buffer blocks with meta-info as free:false,dirty:true using Disk::writeBlock().*/\n}\n\n\nint StaticBuffer::getStaticBlockType(int blockNum){\n    // Check if blockNum is valid (non zero and less than number of disk blocks)\n    // and return E_OUTOFBOUND if not valid.\n\n    // Access the entry in block allocation map corresponding to the blockNum argument\n    // and return the block type after type casting to integer.\n}\n\n\nint StaticBuffer::setDirtyBit(int blockNum){\n    // find the buffer index corresponding to the block using getBufferNum().\n\n    // if block is not present in the buffer (bufferNum = E_BLOCKNOTINBUFFER)\n    //     return E_BLOCKNOTINBUFFER\n\n    // if blockNum is out of bound (bufferNum = E_OUTOFBOUND)\n    //     return E_OUTOFBOUND\n\n    // else\n    //     (the bufferNum is valid)\n    //     set the dirty bit of that buffer to true in metainfo\n\n    // return SUCCESS\n}\n\n\nint StaticBuffer::getBufferNum(int blockNum){\n    // Check if blockNum is valid (non zero and less than number of disk blocks)\n    // and return E_OUTOFBOUND if not valid.\n\n    // traverse through the metaInfo array and\n    //  find the buffer number of the buffer to which the block is loaded.\n\n    // if found return buffer number\n\n    // if block not found in buffer return E_BLOCKNOTINBUFFER\n}\n\n\nint StaticBuffer::getBufferNum(int blockNum){\n    // Check if blockNum is valid (non zero and less than number of disk blocks)\n    // and return E_OUTOFBOUND if not valid.\n\n    // traverse through the metaInfo array and\n    //  find the buffer number of the buffer to which the block is loaded.\n\n    // if found return buffer number\n\n    // if block not found in buffer return E_BLOCKNOTINBUFFER\n}\n")),(0,f.kt)("h2",{id:"blockbuffercpp"},"BlockBuffer.cpp"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-cpp"},"BlockBuffer::BlockBuffer(char blockType){\n    // allocate a block on the disk and a buffer in memory to hold the new block of\n    // given type using getFreeBlock function and get the return error codes if any.\n\n    // set the blockNum field of the object to that of the allocated block\n    // number if the method returned a valid block number,\n    // otherwise set the error code returned as the block number.\n\n    // (The caller must check if the constructor allocatted block successfully\n    // by checking the value of block number field.)\n}\n\n\nBlockBuffer::BlockBuffer(int blockNum){\n\n    // set the blockNum field of the object to input argument.\n}\n\n\nint BlockBuffer::getBlockNum(){\n\n    //return corresponding block number.\n}\n\n\nint BlockBuffer::getHeader(struct HeadInfo *head){\n\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // cast bufferPtr to type HeadInfo*\n    struct HeadInfo *bufferHeader = (struct HeadInfo *)bufferPtr;\n\n    // copy all the values except reserved in the header (from bufferHeader)\n    // to the argument `head`\n    // (hint: head->numEntries = bufferHeader->numEntries)\n\n    // return SUCCESS\n}\n\n\nint BlockBuffer::setHeader(struct HeadInfo *head){\n\n    unsigned char *bufferPtr;\n    // get the starting address of the buffer containing the block using\n    // loadBlockAndGetBufferPtr(&bufferPtr).\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // cast bufferPtr to type HeadInfo*\n    struct HeadInfo *bufferHeader = (struct HeadInfo *)bufferPtr;\n\n    // copy the fields of the HeadInfo pointed to by head (except reserved) to\n    // the header of the block (pointed to by bufferHeader)\n    //(hint: bufferHeader->numSlots = head->numSlots )\n\n    // update dirty bit by calling StaticBuffer::setDirtyBit()\n    // if setDirtyBit() failed, return the error code\n\n    // return SUCCESS;\n}\n\n\nvoid BlockBuffer::releaseBlock(){\n\n    // if blockNum is INVALID_BLOCK (-1), or it is invalidated already, do nothing\n\n    // else\n        /* get the buffer number of the buffer assigned to the block\n           using StaticBuffer::getBufferNum().\n           (this function return E_BLOCKNOTINBUFFER if the block is not\n           currently loaded in the buffer)\n            */\n\n        // if the block is present in the buffer, free the buffer\n        // by setting the free flag of its StaticBuffer::tableMetaInfo entry\n        // to true.\n\n        // free the block in disk by setting the data type of the entry\n        // corresponding to the block number in StaticBuffer::blockAllocMap\n        // to UNUSED_BLK.\n\n        // set the object's blockNum to INVALID_BLOCK (-1)\n}\n\n\nint BlockBuffer::loadBlockAndGetBufferPtr(unsigned char ** buffPtr) {\n    /* check whether the block is already present in the buffer\n       using StaticBuffer.getBufferNum() */\n    int bufferNum = StaticBuffer::getBufferNum(this->blockNum);\n\n    // if present (!=E_BLOCKNOTINBUFFER),\n        // set the timestamp of the corresponding buffer to 0 and increment the\n        // timestamps of all other occupied buffers in BufferMetaInfo.\n\n    // else\n        // get a free buffer using StaticBuffer.getFreeBuffer()\n\n        // if the call returns E_OUTOFBOUND, return E_OUTOFBOUND here as\n        // the blockNum is invalid\n\n        // Read the block into the free buffer using readBlock()\n\n    // store the pointer to this buffer (blocks[bufferNum]) in *buffPtr\n\n    // return SUCCESS;\n}\n\n\nint BlockBuffer::getFreeBlock(int blockType){\n\n    // iterate through the StaticBuffer::blockAllocMap and find the block number\n    // of a free block in the disk.\n\n    // if no block is free, return E_DISKFULL.\n\n    // set the object's blockNum to the block number of the free block.\n\n    // find a free buffer using StaticBuffer::getFreeBuffer() .\n\n    // initialize the header of the block passing a struct HeadInfo with values\n    // pblock: -1, lblock: -1, rblock: -1, numEntries: 0, numAttrs: 0, numSlots: 0\n    // to the setHeader() function.\n\n    // update the block type of the block to the input block type using setBlockType().\n\n    // return block number of the free block.\n}\n\n\nint BlockBuffer::setBlockType(int blockType){\n\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // store the input block type in the first 4 bytes of the buffer.\n    // (hint: cast bufferPtr to int32_t* and then assign it)\n    // *((int32_t *)bufferPtr) = blockType;\n\n    // update the StaticBuffer::blockAllocMap entry corresponding to the\n    // object's block number to `blockType`.\n\n    // update dirty bit by calling StaticBuffer::setDirtyBit()\n    // if setDirtyBit() failed\n        // return the returned value from the call\n\n    // return SUCCESS\n}\n\n\nRecBuffer::RecBuffer() : BlockBuffer('R'){}\n\nRecBuffer::RecBuffer(int blockNum) : BlockBuffer(blockNum){}\n\n\nint RecBuffer::getSlotMap(unsigned char *slotMap) {\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block using\n       loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // get the header of the block using the getHeader() function\n\n    int numSlots = /* the number of slots in the block */;\n\n    // the slotmap starts at bufferPtr + HEADER_SIZE. Copy the contents of the\n    // slotmap in the buffer to the argument `slotMap`.\n    // Note that size of slotmap is `numSlots`\n\n    // return SUCCESS\n}\n\n\nint RecBuffer::setSlotMap(unsigned char *slotMap) {\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block using\n       loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // get the header of the block using the getHeader() function\n\n    int numSlots = /* the number of slots in the block */;\n\n    // the slotmap starts at bufferPtr + HEADER_SIZE. Copy the contents of the\n    // argument `slotMap` to the buffer replacing the existing slotmap.\n    // Note that size of slotmap is `numSlots`\n\n    // update dirty bit using StaticBuffer::setDirtyBit\n    // if setDirtyBit failed, return the value returned by the call\n\n    // return SUCCESS\n}\n\n\nint RecBuffer::getRecord(union Attribute *rec, int slotNum) {\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    // get the header using the getHeader() function\n\n    // get number of attributes in the block.\n\n    // get the number of slots in the block.\n\n    // if input slotNum is not in the permitted range return E_OUTOFBOUND\n\n    // if slot corresponding to input slotNum is free return E_FREESLOT\n\n    /* offset bufferPtr to point to the beginning of the record at required\n       slot. the block contains the header, the slotmap, followed by all\n       the records. so, for example,\n       record at slot x will be at bufferPtr + HEADER_SIZE + (x*recordSize)\n       copy the record from buffer to `rec` using memcpy\n       (hint: a record will be of size ATTR_SIZE * numAttrs)\n    */\n\n    // return SUCCESS\n}\n\n\nint RecBuffer::setRecord(union Attribute *rec, int slotNum) {\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n        // return the value returned by the call.\n\n    /* get the header of the block using the getHeader() function */\n\n    // get number of attributes in the block.\n\n    // get the number of slots in the block.\n\n    // if input slotNum is not in the permitted range return E_OUTOFBOUND.\n\n    /* offset bufferPtr to point to the beginning of the record at required\n       slot. the block contains the header, the slotmap, followed by all\n       the records. so, for example,\n       record at slot x will be at bufferPtr + HEADER_SIZE + (x*recordSize)\n       copy the record from `rec` to buffer using memcpy\n       (hint: a record will be of size ATTR_SIZE * numAttrs)\n    */\n\n    // update dirty bit using setDirtyBit()\n\n    /* (the above function call should not fail since the block is already\n       in buffer and the blockNum is valid. If the call does fail, there\n       exists some other issue in the code) */\n\n    // return SUCCESS\n}\n\n\nIndBuffer::IndBuffer(char blockType) : BlockBuffer(blockType){}\n\nIndBuffer::IndBuffer(int blockNum) : BlockBuffer(blockNum){}\n\nIndInternal::IndInternal() : IndBuffer('I'){}\n\nIndInternal::IndInternal(int blockNum) : IndBuffer(blockNum){}\n\n\nint IndInternal::getEntry(void *ptr, int indexNum) {\n    // if the indexNum is not in the valid range of [0, MAX_KEYS_INTERNAL-1]\n    //     return E_OUTOFBOUND.\n\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n    //     return the value returned by the call.\n\n    // typecast the void pointer to an internal entry pointer\n    struct InternalEntry *internalEntry = (struct InternalEntry *)ptr;\n\n    /*\n    - copy the entries from the indexNum`th entry to *internalEntry\n    - make sure that each field is copied individually as in the following code\n    - the lChild and rChild fields of InternalEntry are of type int32_t\n    - int32_t is a type of int that is guaranteed to be 4 bytes across every\n      C++ implementation. sizeof(int32_t) = 4\n    */\n\n    /* the indexNum'th entry will begin at an offset of\n       HEADER_SIZE + (indexNum * (sizeof(int) + ATTR_SIZE) )         [why?]\n       from bufferPtr */\n    unsigned char *entryPtr = bufferPtr + HEADER_SIZE + (indexNum * 20);\n\n    memcpy(&(internalEntry->lChild), entryPtr, sizeof(int32_t));\n    memcpy(&(internalEntry->attrVal), entryPtr + 4, sizeof(Attribute));\n    memcpy(&(internalEntry->rChild), entryPtr + 20, 4);\n\n    // return SUCCESS.\n}\n\n\nint IndInternal::setEntry(void *ptr, int indexNum) {\n    // if the indexNum is not in the valid range of [0, MAX_KEYS_INTERNAL-1]\n    //     return E_OUTOFBOUND.\n\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n    //     return the value returned by the call.\n\n    // typecast the void pointer to an internal entry pointer\n    struct InternalEntry *internalEntry = (struct InternalEntry *)ptr;\n\n    /*\n    - copy the entries from *internalEntry to the indexNum`th entry\n    - make sure that each field is copied individually as in the following code\n    - the lChild and rChild fields of InternalEntry are of type int32_t\n    - int32_t is a type of int that is guaranteed to be 4 bytes across every\n      C++ implementation. sizeof(int32_t) = 4\n    */\n\n    /* the indexNum'th entry will begin at an offset of\n       HEADER_SIZE + (indexNum * (sizeof(int) + ATTR_SIZE) )         [why?]\n       from bufferPtr */\n\n    unsigned char *entryPtr = bufferPtr + HEADER_SIZE + (indexNum * 20);\n\n    memcpy(entryPtr, &(internalEntry->lChild), 4);\n    memcpy(entryPtr + 4, &(internalEntry->attrVal), ATTR_SIZE);\n    memcpy(entryPtr + 20, &(internalEntry->rChild), 4);\n\n\n    // update dirty bit using setDirtyBit()\n    // if setDirtyBit failed, return the value returned by the call\n\n    // return SUCCESS\n}\n\n\nIndLeaf::IndLeaf() : IndBuffer('L'){}\n\nIndLeaf::IndLeaf(int blockNum) : IndBuffer(blockNum){}\n\n\nint IndLeaf::getEntry(void *ptr, int indexNum) {\n\n    // if the indexNum is not in the valid range of [0, MAX_KEYS_LEAF-1]\n    //     return E_OUTOFBOUND.\n\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n    //     return the value returned by the call.\n\n    // copy the indexNum'th Index entry in buffer to memory ptr using memcpy\n\n    /* the indexNum'th entry will begin at an offset of\n       HEADER_SIZE + (indexNum * LEAF_ENTRY_SIZE)  from bufferPtr */\n    unsigned char *entryPtr = bufferPtr + HEADER_SIZE + (indexNum * LEAF_ENTRY_SIZE);\n    memcpy((struct Index *)ptr, entryPtr, LEAF_ENTRY_SIZE);\n\n    // return SUCCESS\n}\n\n\nint IndLeaf::setEntry(void *ptr, int indexNum) {\n\n    // if the indexNum is not in the valid range of [0, MAX_KEYS_LEAF-1]\n    //     return E_OUTOFBOUND.\n\n    unsigned char *bufferPtr;\n    /* get the starting address of the buffer containing the block\n       using loadBlockAndGetBufferPtr(&bufferPtr). */\n\n    // if loadBlockAndGetBufferPtr(&bufferPtr) != SUCCESS\n    //     return the value returned by the call.\n\n    // copy the Index at ptr to indexNum'th entry in the buffer using memcpy\n\n    /* the indexNum'th entry will begin at an offset of\n       HEADER_SIZE + (indexNum * LEAF_ENTRY_SIZE)  from bufferPtr */\n    unsigned char *entryPtr = bufferPtr + HEADER_SIZE + (indexNum * LEAF_ENTRY_SIZE);\n    memcpy(entryPtr, (struct Index *)ptr, LEAF_ENTRY_SIZE);\n\n    // update dirty bit using setDirtyBit()\n    // if setDirtyBit failed, return the value returned by the call\n\n    //return SUCCESS\n}\n")))}s.isMDXComponent=!0}}]);