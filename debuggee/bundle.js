!function(t){var e={};function _(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,_),r.l=!0,r.exports}_.m=t,_.c=e,_.d=function(t,e,n){_.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},_.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},_.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return _.d(e,"a",e),e},_.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},_.p="",_(_.s=7)}([function(t,e,_){"use strict";_.r(e),_.d(e,"window",function(){return n}),_.d(e,"actions",function(){return r}),_.d(e,"flags",function(){return s});var n={alert:function(t){postMessage({type:"alert",data:t})},prompt:async function(t){for(postMessage({type:"prompt",data:t});void 0==s.promptMsg;)await function(t){return new Promise(e=>setTimeout(e,t))}(0);var e=s.promptMsg;return s.promptMsg=void 0,e}};var r={prompt:t=>{s.promptMsg=t}},s={currNest:0,currId:"",promptMsg:void 0,stepWait:!1,in:!0,over:!1,up:!1,out:!1,setTrue:t=>{s.in=!1,s.over=!1,s.out=!1,s.up=!1,s[t]=!0}}},function(t,e,_){"use strict";_.d(e,"a",function(){return r});var n=_(0);function r(){return n.flags.up}n.actions.stepUp=(()=>{n.flags.stepWait=!0,n.flags.setTrue("up")})},function(t,e,_){"use strict";_.d(e,"a",function(){return r});var n=_(0);function r(){return n.flags.out}n.actions.stepOut=(()=>{n.flags.stepWait=!0,n.flags.setTrue("out")})},function(t,e,_){"use strict";_.d(e,"a",function(){return r});var n=_(0);_(2),_(1);function r(){return n.flags.in}n.actions.stepIn=(()=>{n.flags.stepWait=!0,n.flags.setTrue("in")})},function(t,e,_){"use strict";_.r(e),_.d(e,"isStepOver",function(){return r});var n=_(0);function r(){return n.flags.over}n.actions.stepOver=(()=>{n.flags.stepWait=!0,n.flags.setTrue("over")})},function(module,__webpack_exports__,__webpack_require__){"use strict";var _init_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0);_init_js__WEBPACK_IMPORTED_MODULE_0__.actions.run=(content=>{_init_js__WEBPACK_IMPORTED_MODULE_0__.window.alert(content),void 0!=content?(eval(content),postMessage({type:"execution_finished"})):_init_js__WEBPACK_IMPORTED_MODULE_0__.window.alert("The content is undefined.")})},function(module,__webpack_exports__,__webpack_require__){"use strict";var _init_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),_stepIn__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3),_stepOut__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),_stepUp__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1),isStepOver=__webpack_require__(4).isStepOver,window=__webpack_require__(0).window,flags=__webpack_require__(0).flags;async function $id(t,e){return e}function sleep(t){return new Promise(e=>setTimeout(e,t))}function next_message(){return sleep(0)}async function wait(t,e){if(highlightBlock(e),-1!=flags.currNest&&(Object(_stepIn__WEBPACK_IMPORTED_MODULE_1__.a)()||t<=flags.currNest)){if(flags.currId===e)return;if(Object(_stepUp__WEBPACK_IMPORTED_MODULE_3__.a)()&&t==flags.currNest)return;for(;!flags.stepWait;)await next_message();flags.stepWait=!1,flags.currId=e,Object(_stepOut__WEBPACK_IMPORTED_MODULE_2__.a)()?(flags.currNest=-1,flags.out=!1):flags.currNest=t}}function highlightBlock(t){postMessage({type:"highlightBlock",data:t})}_init_js__WEBPACK_IMPORTED_MODULE_0__.actions.start_debugging=(async content=>{void 0!=content?(await eval("async function code(){var local_over=false;var local_out=false; "+content+" };  code();"),postMessage({type:"execution_finished"})):window.alert("The content is undefined.")})},function(t,e,_){"use strict";_.r(e);var n=_(0);_(3),_(2),_(1),_(4),_(6),_(5);onmessage=function(t){let e=t.data;n.actions[e.type](e.data)}}]);
//# sourceMappingURL=bundle.js.map