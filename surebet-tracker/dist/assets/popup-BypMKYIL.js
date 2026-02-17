true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

var react = {exports: {}};

var react_production_min = {};

/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1=Symbol.for("react.element"),n$1=Symbol.for("react.portal"),p$2=Symbol.for("react.fragment"),q$1=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v$1=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z$1=Symbol.iterator;function A$1(a){if(null===a||"object"!==typeof a)return null;a=z$1&&a[z$1]||a["@@iterator"];return "function"===typeof a?a:null}
var B$1={isMounted:function(){return  false},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C$1=Object.assign,D$1={};function E$1(a,b,e){this.props=a;this.context=b;this.refs=D$1;this.updater=e||B$1;}E$1.prototype.isReactComponent={};
E$1.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState");};E$1.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E$1.prototype;function G$1(a,b,e){this.props=a;this.context=b;this.refs=D$1;this.updater=e||B$1;}var H$1=G$1.prototype=new F;
H$1.constructor=G$1;C$1(H$1,E$1.prototype);H$1.isPureReactComponent=true;var I$1=Array.isArray,J=Object.prototype.hasOwnProperty,K$1={current:null},L$1={key:true,ref:true,__self:true,__source:true};
function M$1(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L$1.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f;}if(a&&a.defaultProps)for(d in g=a.defaultProps,g) void 0===c[d]&&(c[d]=g[d]);return {$$typeof:l$1,type:a,key:k,ref:h,props:c,_owner:K$1.current}}
function N$1(a,b){return {$$typeof:l$1,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O$1(a){return "object"===typeof a&&null!==a&&a.$$typeof===l$1}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var P$1=/\/+/g;function Q$1(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R$1(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=false;if(null===a)h=true;else switch(k){case "string":case "number":h=true;break;case "object":switch(a.$$typeof){case l$1:case n$1:h=true;}}if(h)return h=a,c=c(h),a=""===d?"."+Q$1(h,0):d,I$1(c)?(e="",null!=a&&(e=a.replace(P$1,"$&/")+"/"),R$1(c,b,e,"",function(a){return a})):null!=c&&(O$1(c)&&(c=N$1(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P$1,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I$1(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q$1(k,g);h+=R$1(k,b,e,f,c);}else if(f=A$1(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q$1(k,g++),h+=R$1(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S$1(a,b,e){if(null==a)return a;var d=[],c=0;R$1(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T$1(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b;},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b;});-1===a._status&&(a._status=0,a._result=b);}if(1===a._status)return a._result.default;throw a._result;}
var U$1={current:null},V$1={transition:null},W$1={ReactCurrentDispatcher:U$1,ReactCurrentBatchConfig:V$1,ReactCurrentOwner:K$1};function X$1(){throw Error("act(...) is not supported in production builds of React.");}
react_production_min.Children={map:S$1,forEach:function(a,b,e){S$1(a,function(){b.apply(this,arguments);},e);},count:function(a){var b=0;S$1(a,function(){b++;});return b},toArray:function(a){return S$1(a,function(a){return a})||[]},only:function(a){if(!O$1(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};react_production_min.Component=E$1;react_production_min.Fragment=p$2;react_production_min.Profiler=r;react_production_min.PureComponent=G$1;react_production_min.StrictMode=q$1;react_production_min.Suspense=w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W$1;react_production_min.act=X$1;
react_production_min.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C$1({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){ void 0!==b.ref&&(k=b.ref,h=K$1.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L$1.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g;}return {$$typeof:l$1,type:a.type,key:c,ref:k,props:d,_owner:h}};react_production_min.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};react_production_min.createElement=M$1;react_production_min.createFactory=function(a){var b=M$1.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};
react_production_min.forwardRef=function(a){return {$$typeof:v$1,render:a}};react_production_min.isValidElement=O$1;react_production_min.lazy=function(a){return {$$typeof:y,_payload:{_status:-1,_result:a},_init:T$1}};react_production_min.memo=function(a,b){return {$$typeof:x,type:a,compare:void 0===b?null:b}};react_production_min.startTransition=function(a){var b=V$1.transition;V$1.transition={};try{a();}finally{V$1.transition=b;}};react_production_min.unstable_act=X$1;react_production_min.useCallback=function(a,b){return U$1.current.useCallback(a,b)};react_production_min.useContext=function(a){return U$1.current.useContext(a)};
react_production_min.useDebugValue=function(){};react_production_min.useDeferredValue=function(a){return U$1.current.useDeferredValue(a)};react_production_min.useEffect=function(a,b){return U$1.current.useEffect(a,b)};react_production_min.useId=function(){return U$1.current.useId()};react_production_min.useImperativeHandle=function(a,b,e){return U$1.current.useImperativeHandle(a,b,e)};react_production_min.useInsertionEffect=function(a,b){return U$1.current.useInsertionEffect(a,b)};react_production_min.useLayoutEffect=function(a,b){return U$1.current.useLayoutEffect(a,b)};
react_production_min.useMemo=function(a,b){return U$1.current.useMemo(a,b)};react_production_min.useReducer=function(a,b,e){return U$1.current.useReducer(a,b,e)};react_production_min.useRef=function(a){return U$1.current.useRef(a)};react_production_min.useState=function(a){return U$1.current.useState(a)};react_production_min.useSyncExternalStore=function(a,b,e){return U$1.current.useSyncExternalStore(a,b,e)};react_production_min.useTransition=function(){return U$1.current.useTransition()};react_production_min.version="18.3.1";

{
  react.exports = react_production_min;
}

var reactExports = react.exports;
const React$2 = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p$1={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m$1.call(a,b)&&!p$1.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

var client = {};

var reactDom = {exports: {}};

var reactDom_production_min = {};

var scheduler = {exports: {}};

var scheduler_production_min = {};

/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (exports$1) {
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
	function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports$1.unstable_now=function(){return l.now()};}else {var p=Date,q=p.now();exports$1.unstable_now=function(){return p.now()-q};}var r=[],t=[],u=1,v=null,y=3,z=false,A=false,B=false,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
	"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t);}}function H(a){B=false;G(a);if(!A)if(null!==h(r))A=true,I(J);else {var b=h(t);null!==b&&K(H,b.startTime-a);}}
	function J(a,b){A=false;B&&(B=false,E(L),L=-1);z=true;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports$1.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b);}else k(r);v=h(r);}if(null!==v)var w=!0;else {var m=h(t);null!==m&&K(H,m.startTime-b);w=!1;}return w}finally{v=null,y=c,z=false;}}var N=false,O=null,L=-1,P=5,Q=-1;
	function M(){return exports$1.unstable_now()-Q<P?false:true}function R(){if(null!==O){var a=exports$1.unstable_now();Q=a;var b=true;try{b=O(!0,a);}finally{b?S():(N=false,O=null);}}else N=false;}var S;if("function"===typeof F)S=function(){F(R);};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null);};}else S=function(){D(R,0);};function I(a){O=a;N||(N=true,S());}function K(a,b){L=D(function(){a(exports$1.unstable_now());},b);}
	exports$1.unstable_IdlePriority=5;exports$1.unstable_ImmediatePriority=1;exports$1.unstable_LowPriority=4;exports$1.unstable_NormalPriority=3;exports$1.unstable_Profiling=null;exports$1.unstable_UserBlockingPriority=2;exports$1.unstable_cancelCallback=function(a){a.callback=null;};exports$1.unstable_continueExecution=function(){A||z||(A=true,I(J));};
	exports$1.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5;};exports$1.unstable_getCurrentPriorityLevel=function(){return y};exports$1.unstable_getFirstCallbackNode=function(){return h(r)};exports$1.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y;}var c=y;y=b;try{return a()}finally{y=c;}};exports$1.unstable_pauseExecution=function(){};
	exports$1.unstable_requestPaint=function(){};exports$1.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=y;y=a;try{return b()}finally{y=c;}};
	exports$1.unstable_scheduleCallback=function(a,b,c){var d=exports$1.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3;}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=true,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=true,I(J)));return a};
	exports$1.unstable_shouldYield=M;exports$1.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c;}}}; 
} (scheduler_production_min));

{
  scheduler.exports = scheduler_production_min;
}

var schedulerExports = scheduler.exports;

/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa=reactExports,ca=schedulerExports;function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b);}
function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a]);}
var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
{},ma={};function oa(a){if(ja.call(ma,a))return  true;if(ja.call(la,a))return  false;if(ka.test(a))return ma[a]=true;la[a]=true;return  false}function pa(a,b,c,d){if(null!==c&&0===c.type)return  false;switch(typeof b){case "function":case "symbol":return  true;case "boolean":if(d)return  false;if(null!==c)return !c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return  false}}
function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return  true;if(d)return  false;if(null!==c)switch(c.type){case 3:return !b;case 4:return  false===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return  false}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g;}var z={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,false,a,null,false,false);});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,false,a[1],null,false,false);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,false,a.toLowerCase(),null,false,false);});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,false,a,null,false,false);});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,false,a.toLowerCase(),null,false,false);});
["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,true,a,null,false,false);});["capture","download"].forEach(function(a){z[a]=new v(a,4,false,a,null,false,false);});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,false,a,null,false,false);});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,false,a.toLowerCase(),null,false,false);});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
sa);z[b]=new v(b,1,false,a,null,false,false);});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,false,a,"http://www.w3.org/1999/xlink",false,false);});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,false,a,"http://www.w3.org/XML/1998/namespace",false,false);});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,false,a.toLowerCase(),null,false,false);});
z.xlinkHref=new v("xlinkHref",1,false,"xlink:href","http://www.w3.org/1999/xlink",true,false);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,false,a.toLowerCase(),null,true,true);});
function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?false:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&true===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)));}
var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");var Ia=Symbol.for("react.offscreen");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return "function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||"";}return "\n"+La+a}var Na=false;
function Oa(a,b){if(!a||Na)return "";Na=true;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[]);}catch(l){var d=l;}Reflect.construct(a,[],b);}else {try{b.call();}catch(l){d=l;}a.call(b.prototype);}else {try{throw Error();}catch(l){d=l;}a();}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=false,Error.prepareStackTrace=c;}return (a=a?a.displayName||a.name:"")?Ma(a):""}
function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,false),a;case 11:return a=Oa(a.type.render,false),a;case 1:return a=Oa(a.type,true),a;default:return ""}}
function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return "Fragment";case wa:return "Portal";case Aa:return "Profiler";case za:return "StrictMode";case Ea:return "Suspense";case Fa:return "SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return (a.displayName||"Context")+".Consumer";case Ba:return (a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
function Ra(a){var b=a.type;switch(a.tag){case 24:return "Cache";case 9:return (b.displayName||"Context")+".Consumer";case 10:return (b._context.displayName||"Context")+".Provider";case 18:return "DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return "Fragment";case 5:return b;case 4:return "Portal";case 3:return "Root";case 6:return "Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return "Offscreen";
case 12:return "Profiler";case 21:return "Scope";case 13:return "Suspense";case 19:return "SuspenseList";case 25:return "TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return ""}}
function Ta(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:true,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
null;delete a[b];}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a));}function Wa(a){if(!a)return  false;var b=a._valueTracker;if(!b)return  true;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),true):false}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,false);}
function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c;}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
function db$1(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c);}
function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c);}var eb=Array.isArray;
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=true;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=true);}else {c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=true;d&&(a[e].defaultSelected=true);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=true);}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0];}b=c;}null==b&&(b="");c=b;}a._wrapperState={initialValue:Sa(c)};}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d);}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b);}function kb(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}
function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var mb,nb=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else {mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild);}});
function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
var pb={animationIterationCount:true,aspectRatio:true,borderImageOutset:true,borderImageSlice:true,borderImageWidth:true,boxFlex:true,boxFlexGroup:true,boxOrdinalGroup:true,columnCount:true,columns:true,flex:true,flexGrow:true,flexPositive:true,flexShrink:true,flexNegative:true,flexOrder:true,gridArea:true,gridRow:true,gridRowEnd:true,gridRowSpan:true,gridRowStart:true,gridColumn:true,gridColumnEnd:true,gridColumnSpan:true,gridColumnStart:true,fontWeight:true,lineClamp:true,lineHeight:true,opacity:true,order:true,orphans:true,tabSize:true,widows:true,zIndex:true,
zoom:true,fillOpacity:true,floodOpacity:true,stopOpacity:true,strokeDasharray:true,strokeDashoffset:true,strokeMiterlimit:true,strokeOpacity:true,strokeWidth:true},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a];});});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;}}var tb=A({menuitem:true},{area:true,base:true,br:true,col:true,embed:true,hr:true,img:true,input:true,keygen:true,link:true,meta:true,param:true,source:true,track:true,wbr:true});
function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
function vb(a,b){if(-1===a.indexOf("-"))return "string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return  false;default:return  true}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b));}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a;}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a]);}}function Gb(a,b){return a(b)}function Hb(){}var Ib=false;function Jb(a,b,c){if(Ib)return a(b,c);Ib=true;try{return Gb(a,b,c)}finally{if(Ib=false,null!==zb||null!==Ab)Hb(),Fb();}}
function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=false;}if(a)return null;if(c&&"function"!==
typeof c)throw Error(p(231,b,typeof c));return c}var Lb=false;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0;}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb);}catch(a){Lb=false;}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l);}catch(m){this.onError(m);}}var Ob=false,Pb=null,Qb=false,Rb=null,Sb={onError:function(a){Ob=true;Pb=a;}};function Tb(a,b,c,d,e,f,g,h,k){Ob=false;Pb=null;Nb.apply(Sb,arguments);}
function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=false;Pb=null;}else throw Error(p(198));Qb||(Qb=true,Rb=l);}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else {a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling;}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else {for(var g=false,h=e.child;h;){if(h===c){g=true;c=e;d=f;break}if(h===d){g=true;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===
c){g=true;c=f;d=e;break}if(h===d){g=true;d=f;c=e;break}h=h.sibling;}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling;}return null}
var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128));}catch(b){}}
var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)));}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return  -1;case 134217728:case 268435456:case 536870912:case 1073741824:return  -1;default:return  -1}}
function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b);}else k<=b&&(a.expiredLanes|=h);f&=~h;}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c;}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f;}}
function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e;}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=false,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId);}}
function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),true;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),true;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),true;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return  true;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),true}return  false}
function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c);});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null;}
function Xc(a){if(null!==a.blockedOn)return  false;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null;}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,false;b.shift();}return  true}function Zc(a,b,c){Xc(a)&&c.delete(b);}function $c(){Jc=false;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc);}
function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=true,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)));}
function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null);}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift();}var cd=ua.ReactCurrentBatchConfig,dd=true;
function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d);}finally{C=e,cd.transition=f;}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d);}finally{C=e,cd.transition=f;}}
function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f;}null!==e&&d.stopPropagation();}else hd(a,b,d,null,c);}}var id=null;
function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null;}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null;}else b!==a&&(a=null);id=a;return null}
function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return  true}function qd(){return  false}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:false===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=true;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=false),this.isDefaultPrevented=pd);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=true),this.isPropagationStopped=pd);},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return "movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:false}function zd(){return Pd}
var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return "keypress"===a.type?od(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=false;
function ge(a,b){switch(a){case "keyup":return  -1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return  true;default:return  false}}function he(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var ie=false;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=true;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return "compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=false,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:true,date:true,datetime:true,"datetime-local":true,email:true,month:true,number:true,password:true,range:true,search:true,tel:true,text:true,time:true,url:true,week:true};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!le[a.type]:"textarea"===b?true:false}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}));}var pe=null,qe=null;function re(a){se(a,0);}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=false;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput;}xe=ye;}else xe=false;we=xe&&(!document.documentMode||9<document.documentMode);}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null);}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b);}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae();}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
function Ie(a,b){if(He(a,b))return  true;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return  false;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return  false;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return  false}return  true}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return {node:c,offset:b-a};a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Je(c);}}function Le(a,b){return a&&b?a===b?true:a&&3===a.nodeType?false:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):false:false}
function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href;}catch(d){c=false;}if(c)a=b.contentWindow;else break;b=Xa(a.document);}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)));}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top;}}
var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=false;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)));}
function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a,b){df.set(a,b);fa(b,[a]);}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf);}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null;}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k;}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k;}}}if(Qb)throw a=Rb,Qb=false,Rb=null,a;}
function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,false),c.add(d));}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b);}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=true;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,false,a),qf(b,true,a));});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=true,qf("selectionchange",false,b));}}
function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd;}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=true);d?void 0!==e?a.addEventListener(b,c,{capture:true,passive:e}):a.addEventListener(b,c,true):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,false);}
function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return;}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode;}}d=d.return;}Jb(function(){var d=f,e=xb(c),g=[];
a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td;}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return;}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}));}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null;}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x);}t=null;}else t=null;null!==k&&wf(g,h,k,t,false);null!==n&&null!==J&&wf(g,J,n,t,true);}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else {na=De;var xa=Ce;}else (k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
xa.controlled&&"number"===h.type&&cb(h,"number",h.value);}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=true;break;case "contextmenu":case "mouseup":case "dragend":Te=false;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e);}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0;}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=true)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a);}se(g,b);});}function tf(a,b,c){return {instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return;}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return;}0!==g.length&&a.push({event:b,listeners:g});}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return ("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
var Cf=null,Df=null;function Ef(a,b){return "textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;});}
function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--;}else "$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e;}while(c);bd(b);}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--;}else "/$"===c&&b++;}a=a.previousSibling;}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a);}return b}a=c;c=a.parentNode;}return null}function Cb(a){a=a[Of]||a[uf];return !a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return {current:a}}
function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--);}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b;}var Vf={},H=Uf(Vf),Wf=Uf(false),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H);}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c);}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return  true}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c);}var eg=null,fg=false,gg=false;function hg(a){null===eg?eg=[a]:eg.push(a);}function ig(a){fg=true;hg(a);}
function jg(){if(!gg&&null!==eg){gg=true;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1;}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=false;}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b;}
function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a;}else rg=1<<f|c<<e|d,sg=a;}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0));}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null;}var xg=null,yg=null,I=false,zg=null;
function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c);}
function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),true):false;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,true):false;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
null,true):false;default:return  false}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=false,xg=a);}}else {if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=false;xg=a;}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a;}
function Gg(a){if(a!==xg)return  false;if(!I)return Fg(a),I=true,false;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling);}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--;}else "$"!==c&&"$!"!==c&&"$?"!==c||b++;}a=a.nextSibling;}yg=
null;}}else yg=xg?Lf(a.stateNode.nextSibling):null;return  true}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling);}function Ig(){yg=xg=null;I=false;}function Jg(a){null===zg?zg=[a]:zg.push(a);}var Kg=ua.ReactCurrentBatchConfig;
function Lg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode;}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a;};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
function Mg(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ng(a){var b=a._init;return b(a._payload)}
function Og(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c);}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Pg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Qg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&Ng(f)===b.type))return d=e(b,c.props),d.ref=Lg(a,b,c),d.return=a,d;d=Rg(c.type,c.key,c.props,null,a.mode,d);d.ref=Lg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=Sg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Tg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=Qg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=Rg(b.type,b.key,b.props,null,a.mode,c),
c.ref=Lg(a,null,b),c.return=a,c;case wa:return b=Sg(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Tg(b,a.mode,c,null),b.return=a,b;Mg(a,b);}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);Mg(a,c);}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);Mg(b,d);}return null}
function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x;}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x;}if(n.done)return c(e,
m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&Ng(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=Lg(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling;}f.type===ya?(d=Tg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Rg(f.type,f.key,f.props,null,a.mode,h),h.ref=Lg(a,d,f),h.return=a,a=h);}return g(a);case wa:a:{for(l=f.key;null!==
d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else {c(a,d);break}else b(a,d);d=d.sibling;}d=Sg(f,a.mode,h);d.return=a;a=d;}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);Mg(a,f);}return "string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
(c(a,d),d=Qg(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Ug=Og(true),Vg=Og(false),Wg=Uf(null),Xg=null,Yg=null,Zg=null;function $g(){Zg=Yg=Xg=null;}function ah(a){var b=Wg.current;E(Wg);a._currentValue=b;}function bh(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return;}}
function ch(a,b){Xg=a;Zg=Yg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(dh=true),a.firstContext=null);}function eh(a){var b=a._currentValue;if(Zg!==a)if(a={context:a,memoizedValue:b,next:null},null===Yg){if(null===Xg)throw Error(p(308));Yg=a;Xg.dependencies={lanes:0,firstContext:a};}else Yg=Yg.next=a;return b}var fh=null;function gh(a){null===fh?fh=[a]:fh.push(a);}
function hh(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,gh(b)):(c.next=e.next,e.next=c);b.interleaved=c;return ih(a,d)}function ih(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var jh=false;function kh(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null};}
function lh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects});}function mh(a,b){return {eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
function nh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return ih(a,c)}e=d.interleaved;null===e?(b.next=b,gh(d)):(b.next=e.next,e.next=b);d.interleaved=b;return ih(a,c)}function oh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c);}}
function ph(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next;}while(null!==c);null===f?e=f=b:f=f.next=b;}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b;}
function qh(a,b,c,d){var e=a.updateQueue;jh=false;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k));}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:jh=true;}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h));}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null;}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);rh|=g;a.lanes=g;a.memoizedState=q;}}
function sh(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d);}}}var th={},uh=Uf(th),vh=Uf(th),wh=Uf(th);function xh(a){if(a===th)throw Error(p(174));return a}
function yh(a,b){G(wh,b);G(vh,a);G(uh,th);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a);}E(uh);G(uh,b);}function zh(){E(uh);E(vh);E(wh);}function Ah(a){xh(wh.current);var b=xh(uh.current);var c=lb(b,a.type);b!==c&&(G(vh,a),G(uh,c));}function Bh(a){vh.current===a&&(E(uh),E(vh));}var L=Uf(0);
function Ch(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}return null}var Dh=[];
function Eh(){for(var a=0;a<Dh.length;a++)Dh[a]._workInProgressVersionPrimary=null;Dh.length=0;}var Fh=ua.ReactCurrentDispatcher,Gh=ua.ReactCurrentBatchConfig,Hh=0,M=null,N=null,O=null,Ih=false,Jh=false,Kh=0,Lh=0;function P(){throw Error(p(321));}function Mh(a,b){if(null===b)return  false;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return  false;return  true}
function Nh(a,b,c,d,e,f){Hh=f;M=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Fh.current=null===a||null===a.memoizedState?Oh:Ph;a=c(d,e);if(Jh){f=0;do{Jh=false;Kh=0;if(25<=f)throw Error(p(301));f+=1;O=N=null;b.updateQueue=null;Fh.current=Qh;a=c(d,e);}while(Jh)}Fh.current=Rh;b=null!==N&&null!==N.next;Hh=0;O=N=M=null;Ih=false;if(b)throw Error(p(300));return a}function Sh(){var a=0!==Kh;Kh=0;return a}
function Th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===O?M.memoizedState=O=a:O=O.next=a;return O}function Uh(){if(null===N){var a=M.alternate;a=null!==a?a.memoizedState:null;}else a=N.next;var b=null===O?M.memoizedState:O.next;if(null!==b)O=b,N=a;else {if(null===a)throw Error(p(310));N=a;a={memoizedState:N.memoizedState,baseState:N.baseState,baseQueue:N.baseQueue,queue:N.queue,next:null};null===O?M.memoizedState=O=a:O=O.next=a;}return O}
function Vh(a,b){return "function"===typeof b?b(a):b}
function Wh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=N,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g;}d.baseQueue=e=f;c.pending=null;}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Hh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else {var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;M.lanes|=m;rh|=m;}l=l.next;}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(dh=true);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d;}a=c.interleaved;if(null!==a){e=a;do f=e.lane,M.lanes|=f,rh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return [b.memoizedState,c.dispatch]}
function Xh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(dh=true);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f;}return [f,d]}function Yh(){}
function Zh(a,b){var c=M,d=Uh(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,dh=true);d=d.queue;$h(ai.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==O&&O.memoizedState.tag&1){c.flags|=2048;bi(9,ci.bind(null,c,d,e,b),void 0,null);if(null===Q)throw Error(p(349));0!==(Hh&30)||di(c,b,e);}return e}function di(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a));}
function ci(a,b,c,d){b.value=c;b.getSnapshot=d;ei(b)&&fi(a);}function ai(a,b,c){return c(function(){ei(b)&&fi(a);})}function ei(a){var b=a.getSnapshot;a=a.value;try{var c=b();return !He(a,c)}catch(d){return  true}}function fi(a){var b=ih(a,1);null!==b&&gi(b,a,1,-1);}
function hi(a){var b=Th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vh,lastRenderedState:a};b.queue=a;a=a.dispatch=ii.bind(null,M,a);return [b.memoizedState,a]}
function bi(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function ji(){return Uh().memoizedState}function ki(a,b,c,d){var e=Th();M.flags|=a;e.memoizedState=bi(1|b,c,void 0,void 0===d?null:d);}
function li(a,b,c,d){var e=Uh();d=void 0===d?null:d;var f=void 0;if(null!==N){var g=N.memoizedState;f=g.destroy;if(null!==d&&Mh(d,g.deps)){e.memoizedState=bi(b,c,f,d);return}}M.flags|=a;e.memoizedState=bi(1|b,c,f,d);}function mi(a,b){return ki(8390656,8,a,b)}function $h(a,b){return li(2048,8,a,b)}function ni(a,b){return li(4,2,a,b)}function oi(a,b){return li(4,4,a,b)}
function pi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}function qi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return li(4,4,pi.bind(null,b,a),c)}function ri(){}function si(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function ti(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function ui(a,b,c){if(0===(Hh&21))return a.baseState&&(a.baseState=false,dh=true),a.memoizedState=c;He(c,b)||(c=yc(),M.lanes|=c,rh|=c,a.baseState=true);return b}function vi(a,b){var c=C;C=0!==c&&4>c?c:4;a(true);var d=Gh.transition;Gh.transition={};try{a(!1),b();}finally{C=c,Gh.transition=d;}}function wi(){return Uh().memoizedState}
function xi(a,b,c){var d=yi(a);c={lane:d,action:c,hasEagerState:false,eagerState:null,next:null};if(zi(a))Ai(b,c);else if(c=hh(a,b,c,d),null!==c){var e=R();gi(c,a,d,e);Bi(c,b,d);}}
function ii(a,b,c){var d=yi(a),e={lane:d,action:c,hasEagerState:false,eagerState:null,next:null};if(zi(a))Ai(b,e);else {var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,gh(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=hh(a,b,e,d);null!==c&&(e=R(),gi(c,a,d,e),Bi(c,b,d));}}
function zi(a){var b=a.alternate;return a===M||null!==b&&b===M}function Ai(a,b){Jh=Ih=true;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b;}function Bi(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c);}}
var Rh={readContext:eh,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useInsertionEffect:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useDeferredValue:P,useTransition:P,useMutableSource:P,useSyncExternalStore:P,useId:P,unstable_isNewReconciler:false},Oh={readContext:eh,useCallback:function(a,b){Th().memoizedState=[a,void 0===b?null:b];return a},useContext:eh,useEffect:mi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ki(4194308,
4,pi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ki(4194308,4,a,b)},useInsertionEffect:function(a,b){return ki(4,2,a,b)},useMemo:function(a,b){var c=Th();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=xi.bind(null,M,a);return [d.memoizedState,a]},useRef:function(a){var b=
Th();a={current:a};return b.memoizedState=a},useState:hi,useDebugValue:ri,useDeferredValue:function(a){return Th().memoizedState=a},useTransition:function(){var a=hi(false),b=a[0];a=vi.bind(null,a[1]);Th().memoizedState=a;return [b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=M,e=Th();if(I){if(void 0===c)throw Error(p(407));c=c();}else {c=b();if(null===Q)throw Error(p(349));0!==(Hh&30)||di(d,b,c);}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;mi(ai.bind(null,d,
f,a),[a]);d.flags|=2048;bi(9,ci.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Th(),b=Q.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Kh++;0<c&&(b+="H"+c.toString(32));b+=":";}else c=Lh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:false},Ph={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Wh,useRef:ji,useState:function(){return Wh(Vh)},
useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return ui(b,N.memoizedState,a)},useTransition:function(){var a=Wh(Vh)[0],b=Uh().memoizedState;return [a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:false},Qh={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Xh,useRef:ji,useState:function(){return Xh(Vh)},useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return null===
N?b.memoizedState=a:ui(b,N.memoizedState,a)},useTransition:function(){var a=Xh(Vh)[0],b=Uh().memoizedState;return [a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:false};function Ci(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a) void 0===b[c]&&(b[c]=a[c]);return b}return b}function Di(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c);}
var Ei={isMounted:function(a){return (a=a._reactInternals)?Vb(a)===a:false},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e));},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e));},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=R(),d=
yi(a),e=mh(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=nh(a,e,d);null!==b&&(gi(b,a,d,c),oh(b,a,d));}};function Fi(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):true}
function Gi(a,b,c){var d=false,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=eh(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Ei;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Hi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Ei.enqueueReplaceState(b,b.state,null);}
function Ii(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};kh(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=eh(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Di(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Ei.enqueueReplaceState(e,e.state,null),qh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308);}function Ji(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c;}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack;}return {value:a,source:b,stack:e,digest:null}}
function Ki(a,b,c){return {value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function Li(a,b){try{console.error(b.value);}catch(c){setTimeout(function(){throw c;});}}var Mi="function"===typeof WeakMap?WeakMap:Map;function Ni(a,b,c){c=mh(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Oi||(Oi=true,Pi=d);Li(a,b);};return c}
function Qi(a,b,c){c=mh(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Li(a,b);};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Li(a,b);"function"!==typeof d&&(null===Ri?Ri=new Set([this]):Ri.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""});});return c}
function Si(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Mi;var e=new Set;d.set(b,e);}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ti.bind(null,a,b,c),b.then(a,a));}function Ui(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?true:false:true;if(b)return a;a=a.return;}while(null!==a);return null}
function Vi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=mh(-1,1),b.tag=2,nh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Wi=ua.ReactCurrentOwner,dh=false;function Xi(a,b,c,d){b.child=null===a?Vg(b,null,c,d):Ug(b,a.child,c,d);}
function Yi(a,b,c,d,e){c=c.render;var f=b.ref;ch(b,e);d=Nh(a,b,c,d,f,e);c=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&c&&vg(b);b.flags|=1;Xi(a,b,d,e);return b.child}
function $i(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!aj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,bj(a,b,f,d,e);a=Rg(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return Zi(a,b,e)}b.flags|=1;a=Pg(f,d);a.ref=b.ref;a.return=b;return b.child=a}
function bj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(dh=false,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(dh=true);else return b.lanes=a.lanes,Zi(a,b,e)}return cj(a,b,c,d,e)}
function dj(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(ej,fj),fj|=c;else {if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(ej,fj),fj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(ej,fj);fj|=d;}else null!==
f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(ej,fj),fj|=d;Xi(a,b,e,c);return b.child}function gj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152;}function cj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);ch(b,e);c=Nh(a,b,c,d,f,e);d=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&d&&vg(b);b.flags|=1;Xi(a,b,c,e);return b.child}
function hj(a,b,c,d,e){if(Zf(c)){var f=true;cg(b);}else f=false;ch(b,e);if(null===b.stateNode)ij(a,b),Gi(b,c,d),Ii(b,c,d,e),d=true;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=eh(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
(h!==d||k!==l)&&Hi(b,g,d,l);jh=false;var r=b.memoizedState;g.state=r;qh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||jh?("function"===typeof m&&(Di(b,c,m,d),k=b.memoizedState),(h=jh||Fi(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=false);}else {g=b.stateNode;lh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Ci(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=eh(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&Hi(b,g,d,k);jh=false;r=b.memoizedState;g.state=r;qh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||jh?("function"===typeof y&&(Di(b,c,y,d),n=b.memoizedState),(l=jh||Fi(b,c,l,d,r,n,k)||false)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=false);}return jj(a,b,c,d,f,e)}
function jj(a,b,c,d,e,f){gj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,false),Zi(a,b,f);d=b.stateNode;Wi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Ug(b,a.child,null,f),b.child=Ug(b,null,h,f)):Xi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,true);return b.child}function kj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,false);yh(a,b.containerInfo);}
function lj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Xi(a,b,c,d);return b.child}var mj={dehydrated:null,treeContext:null,retryLane:0};function nj(a){return {baseLanes:a,cachePool:null,transitions:null}}
function oj(a,b,c){var d=b.pendingProps,e=L.current,f=false,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?false:0!==(e&2));if(h)f=true,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(L,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
g):f=pj(g,d,0,null),a=Tg(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=nj(c),b.memoizedState=mj,a):qj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return rj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=Pg(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=Pg(h,f):(f=Tg(f,g,c,null),f.flags|=2);f.return=
b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?nj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=mj;return d}f=a.child;a=f.sibling;d=Pg(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function qj(a,b){b=pj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function sj(a,b,c,d){null!==d&&Jg(d);Ug(b,a.child,null,c);a=qj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
function rj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Ki(Error(p(422))),sj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=pj({mode:"visible",children:d.children},e,0,null);f=Tg(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Ug(b,a.child,null,g);b.child.memoizedState=nj(g);b.memoizedState=mj;return f}if(0===(b.mode&1))return sj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
if(d)var h=d.dgst;d=h;f=Error(p(419));d=Ki(f,d,void 0);return sj(a,b,g,d)}h=0!==(g&a.childLanes);if(dh||h){d=Q;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0;}e=0!==(e&(d.suspendedLanes|g))?0:e;
0!==e&&e!==f.retryLane&&(f.retryLane=e,ih(a,e),gi(d,a,e,-1));}tj();d=Ki(Error(p(421)));return sj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=uj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=true;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=qj(b,d.children);b.flags|=4096;return b}function vj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);bh(a.return,b,c);}
function wj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e);}
function xj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Xi(a,b,d.children,c);d=L.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else {if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&vj(a,c,b);else if(19===a.tag)vj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return;}a.sibling.return=a.return;a=a.sibling;}d&=1;}G(L,d);if(0===(b.mode&1))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Ch(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);wj(b,false,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Ch(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a;}wj(b,true,c,null,f);break;case "together":wj(b,false,null,null,void 0);break;default:b.memoizedState=null;}return b.child}
function ij(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);}function Zi(a,b,c){null!==a&&(b.dependencies=a.dependencies);rh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=Pg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Pg(a,a.pendingProps),c.return=b;c.sibling=null;}return b.child}
function yj(a,b,c){switch(b.tag){case 3:kj(b);Ig();break;case 5:Ah(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:yh(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Wg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(L,L.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return oj(a,b,c);G(L,L.current&1);a=Zi(a,b,c);return null!==a?a.sibling:null}G(L,L.current&1);break;case 19:d=0!==(c&
b.childLanes);if(0!==(a.flags&128)){if(d)return xj(a,b,c);b.flags|=128;}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(L,L.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,dj(a,b,c)}return Zi(a,b,c)}var zj,Aj,Bj,Cj;
zj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}};Aj=function(){};
Bj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;xh(uh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf);}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
(c||(c={}),c[g]="");}else "dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g]);}else c||(f||(f=[]),f.push(l,
c)),c=k;else "dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k));}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4;}};Cj=function(a,b,c,d){c!==d&&(b.flags|=4);};
function Dj(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null;}}
function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
function Ej(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;zh();E(Wf);E(H);Eh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Fj(zg),zg=null));Aj(a,b);S(b);return null;case 5:Bh(b);var e=xh(wh.current);
c=b.type;if(null!==a&&null!=b.stateNode)Bj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else {if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d);}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(true!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(true!==f.suppressHydrationWarning&&Af(d.textContent,
h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d);}switch(c){case "input":Va(d);db$1(d,f,true);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf);}d=e;b.updateQueue=d;null!==d&&(b.flags|=4);}else {g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=true:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;zj(a,b,false,false);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d;}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g));}switch(c){case "input":Va(a);db$1(a,d,false);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,false):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
true);break;default:"function"===typeof e.onClick&&(a.onclick=Bf);}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=true;break a;default:d=false;}}d&&(b.flags|=4);}null!==b.ref&&(b.flags|=512,b.flags|=2097152);}S(b);return null;case 6:if(a&&null!=b.stateNode)Cj(a,b,a.memoizedProps,d);else {if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=xh(wh.current);xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:true!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1));}f&&(b.flags|=4);}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d;}S(b);return null;case 13:E(L);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=false;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b;}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=false;}else null!==zg&&(Fj(zg),zg=null),f=true;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(L.current&1)?0===T&&(T=3):tj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return zh(),
Aj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return ah(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(L);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dj(f,false);else {if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Ch(a);if(null!==g){b.flags|=128;Dj(f,false);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(L,L.current&1|2);return b.child}a=
a.sibling;}null!==f.tail&&B()>Gj&&(b.flags|=128,d=true,Dj(f,false),b.lanes=4194304);}else {if(!d)if(a=Ch(g),null!==a){if(b.flags|=128,d=true,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dj(f,true),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Gj&&1073741824!==c&&(b.flags|=128,d=true,Dj(f,false),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g);}if(null!==f.tail)return b=f.tail,f.rendering=
b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=L.current,G(L,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Hj(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(fj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
function Ij(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return zh(),E(Wf),E(H),Eh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Bh(b),null;case 13:E(L);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig();}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(L),null;case 4:return zh(),null;case 10:return ah(b.type._context),null;case 22:case 23:return Hj(),
null;case 24:return null;default:return null}}var Jj=false,U=false,Kj="function"===typeof WeakSet?WeakSet:Set,V=null;function Lj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null);}catch(d){W(a,b,d);}else c.current=null;}function Mj(a,b,c){try{c();}catch(d){W(a,b,d);}}var Nj=false;
function Oj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType;}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y;}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode;}q=y;}c=-1===h||-1===k?null:{start:h,end:k};}else c=null;}c=c||{start:0,end:0};}else c=null;Df={focusedElem:a,selectionRange:c};dd=false;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Ci(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w;}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F);}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return;}n=Nj;Nj=false;return n}
function Pj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Mj(b,c,f);}e=e.next;}while(e!==d)}}function Qj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d();}c=c.next;}while(c!==b)}}function Rj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c;}"function"===typeof b?b(a):b.current=a;}}
function Sj(a){var b=a.alternate;null!==b&&(a.alternate=null,Sj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null;}function Tj(a){return 5===a.tag||3===a.tag||4===a.tag}
function Uj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Tj(a.return))return null;a=a.return;}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child;}if(!(a.flags&2))return a.stateNode}}
function Vj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Vj(a,b,c),a=a.sibling;null!==a;)Vj(a,b,c),a=a.sibling;}
function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling;}var X=null,Xj=false;function Yj(a,b,c){for(c=c.child;null!==c;)Zj(a,b,c),c=c.sibling;}
function Zj(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c);}catch(h){}switch(c.tag){case 5:U||Lj(c,b);case 6:var d=X,e=Xj;X=null;Yj(a,b,c);X=d;Xj=e;null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Xj;X=c.stateNode.containerInfo;Xj=true;
Yj(a,b,c);X=d;Xj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Mj(c,b,g):0!==(f&4)&&Mj(c,b,g));e=e.next;}while(e!==d)}Yj(a,b,c);break;case 1:if(!U&&(Lj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount();}catch(h){W(c,b,h);}Yj(a,b,c);break;case 21:Yj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
c.memoizedState,Yj(a,b,c),U=d):Yj(a,b,c);break;default:Yj(a,b,c);}}function ak(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Kj);b.forEach(function(b){var d=bk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d));});}}
function ck(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Xj=!1;break a;case 3:X=h.stateNode.containerInfo;Xj=!0;break a;case 4:X=h.stateNode.containerInfo;Xj=!0;break a}h=h.return;}if(null===X)throw Error(p(160));Zj(f,g,e);X=null;Xj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null;}catch(l){W(e,b,l);}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)dk(b,a),b=b.sibling;}
function dk(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:ck(b,a);ek(a);if(d&4){try{Pj(3,a,a.return),Qj(3,a);}catch(t){W(a,a.return,t);}try{Pj(5,a,a.return);}catch(t){W(a,a.return,t);}}break;case 1:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);break;case 5:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"");}catch(t){W(a,a.return,t);}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l);}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1));}e[Pf]=f;}catch(t){W(a,a.return,t);}}break;case 6:ck(b,a);ek(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f;}catch(t){W(a,a.return,t);}}break;case 3:ck(b,a);ek(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo);}catch(t){W(a,a.return,t);}break;case 4:ck(b,a);ek(a);break;case 13:ck(b,a);ek(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
null!==e.alternate&&null!==e.alternate.memoizedState||(fk=B()));d&4&&ak(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,ck(b,a),U=l):ck(b,a);ek(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Pj(4,r,r.return);break;case 1:Lj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount();}catch(t){W(d,c,t);}}break;case 5:Lj(r,r.return);break;case 22:if(null!==r.memoizedState){gk(q);continue}}null!==y?(y.return=r,V=y):gk(q);}m=m.sibling;}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
rb("display",g));}catch(t){W(a,a.return,t);}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps;}catch(t){W(a,a.return,t);}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return;}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling;}}break;case 19:ck(b,a);ek(a);d&4&&ak(a);break;case 21:break;default:ck(b,
a),ek(a);}}function ek(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Tj(c)){var d=c;break a}c=c.return;}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Uj(a);Wj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Uj(a);Vj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k);}a.flags&=-3;}b&4096&&(a.flags&=-4097);}function hk(a,b,c){V=a;ik(a);}
function ik(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Jj;var l=U;Jj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?jk(e):null!==k?(k.return=g,V=k):jk(e);for(;null!==f;)V=f,ik(f),f=f.sibling;V=e;Jj=h;U=l;}kk(a);}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):kk(a);}}
function kk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Qj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else {var e=b.elementType===b.type?c.memoizedProps:Ci(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate);}var f=b.updateQueue;null!==f&&sh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
b.child.stateNode;break;case 1:c=b.child.stateNode;}sh(b,g,c);}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src);}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q);}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
default:throw Error(p(163));}U||b.flags&512&&Rj(b);}catch(r){W(b,b.return,r);}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return;}}function gk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return;}}
function jk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Qj(4,b);}catch(k){W(b,c,k);}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount();}catch(k){W(b,e,k);}}var f=b.return;try{Rj(b);}catch(k){W(b,f,k);}break;case 5:var g=b.return;try{Rj(b);}catch(k){W(b,g,k);}}}catch(k){W(b,b.return,k);}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return;}}
var lk=Math.ceil,mk=ua.ReactCurrentDispatcher,nk=ua.ReactCurrentOwner,ok=ua.ReactCurrentBatchConfig,K=0,Q=null,Y=null,Z=0,fj=0,ej=Uf(0),T=0,pk=null,rh=0,qk=0,rk=0,sk=null,tk=null,fk=0,Gj=Infinity,uk=null,Oi=false,Pi=null,Ri=null,vk=false,wk=null,xk=0,yk=0,zk=null,Ak=-1,Bk=0;function R(){return 0!==(K&6)?B():-1!==Ak?Ak:Ak=B()}
function yi(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Bk&&(Bk=yc()),Bk;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function gi(a,b,c,d){if(50<yk)throw yk=0,zk=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==Q)a===Q&&(0===(K&2)&&(qk|=c),4===T&&Ck(a,Z)),Dk(a,d),1===c&&0===K&&0===(b.mode&1)&&(Gj=B()+500,fg&&jg());}
function Dk(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===Q?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Ek.bind(null,a)):hg(Ek.bind(null,a)),Jf(function(){0===(K&6)&&jg();}),c=null;else {switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc;}c=Fk(c,Gk.bind(null,a));}a.callbackPriority=b;a.callbackNode=c;}}
function Gk(a,b){Ak=-1;Bk=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Hk()&&a.callbackNode!==c)return null;var d=uc(a,a===Q?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Ik(a,d);else {b=d;var e=K;K|=2;var f=Jk();if(Q!==a||Z!==b)uk=null,Gj=B()+500,Kk(a,b);do try{Lk();break}catch(h){Mk(a,h);}while(1);$g();mk.current=f;K=e;null!==Y?b=0:(Q=null,Z=0,b=T);}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Nk(a,e)));if(1===b)throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;if(6===b)Ck(a,d);
else {e=a.current.alternate;if(0===(d&30)&&!Ok(e)&&(b=Ik(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Nk(a,f))),1===b))throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Pk(a,tk,uk);break;case 3:Ck(a,d);if((d&130023424)===d&&(b=fk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){R();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),b);break}Pk(a,tk,uk);break;case 4:Ck(a,d);if((d&4194240)===
d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f;}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*lk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),d);break}Pk(a,tk,uk);break;case 5:Pk(a,tk,uk);break;default:throw Error(p(329));}}}Dk(a,B());return a.callbackNode===c?Gk.bind(null,a):null}
function Nk(a,b){var c=sk;a.current.memoizedState.isDehydrated&&(Kk(a,b).flags|=256);a=Ik(a,b);2!==a&&(b=tk,tk=c,null!==b&&Fj(b));return a}function Fj(a){null===tk?tk=a:tk.push.apply(tk,a);}
function Ok(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return !1}catch(g){return  false}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else {if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return  true;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return  true}
function Ck(a,b){b&=~rk;b&=~qk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d;}}function Ek(a){if(0!==(K&6))throw Error(p(327));Hk();var b=uc(a,0);if(0===(b&1))return Dk(a,B()),null;var c=Ik(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Nk(a,d));}if(1===c)throw c=pk,Kk(a,0),Ck(a,b),Dk(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Pk(a,tk,uk);Dk(a,B());return null}
function Qk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Gj=B()+500,fg&&jg());}}function Rk(a){null!==wk&&0===wk.tag&&0===(K&6)&&Hk();var b=K;K|=1;var c=ok.transition,d=C;try{if(ok.transition=null,C=1,a)return a()}finally{C=d,ok.transition=c,K=b,0===(K&6)&&jg();}}function Hj(){fj=ej.current;E(ej);}
function Kk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:zh();E(Wf);E(H);Eh();break;case 5:Bh(d);break;case 4:zh();break;case 13:E(L);break;case 19:E(L);break;case 10:ah(d.type._context);break;case 22:case 23:Hj();}c=c.return;}Q=a;Y=a=Pg(a.current,null);Z=fj=b;T=0;pk=null;rk=qk=rh=0;tk=sk=null;if(null!==fh){for(b=
0;b<fh.length;b++)if(c=fh[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g;}c.pending=d;}fh=null;}return a}
function Mk(a,b){do{var c=Y;try{$g();Fh.current=Rh;if(Ih){for(var d=M.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next;}Ih=!1;}Hh=0;O=N=M=null;Jh=!1;Kh=0;nk.current=null;if(null===c||null===c.return){T=1;pk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null);}var y=Ui(g);if(null!==y){y.flags&=-257;Vi(y,g,h,f,b);y.mode&1&&Si(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t;}else n.add(k);break a}else {if(0===(b&1)){Si(f,l,b);tj();break a}k=Error(p(426));}}else if(I&&h.mode&1){var J=Ui(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Vi(J,g,h,f,b);Jg(Ji(k,h));break a}}f=k=Ji(k,h);4!==T&&(T=2);null===sk?sk=[f]:sk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
b&=-b;f.lanes|=b;var x=Ni(f,k,b);ph(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Ri||!Ri.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Qi(f,h,b);ph(f,F);break a}}f=f.return;}while(null!==f)}Sk(c);}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Jk(){var a=mk.current;mk.current=Rh;return null===a?Rh:a}
function tj(){if(0===T||3===T||2===T)T=4;null===Q||0===(rh&268435455)&&0===(qk&268435455)||Ck(Q,Z);}function Ik(a,b){var c=K;K|=2;var d=Jk();if(Q!==a||Z!==b)uk=null,Kk(a,b);do try{Tk();break}catch(e){Mk(a,e);}while(1);$g();K=c;mk.current=d;if(null!==Y)throw Error(p(261));Q=null;Z=0;return T}function Tk(){for(;null!==Y;)Uk(Y);}function Lk(){for(;null!==Y&&!cc();)Uk(Y);}function Uk(a){var b=Vk(a.alternate,a,fj);a.memoizedProps=a.pendingProps;null===b?Sk(a):Y=b;nk.current=null;}
function Sk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Ej(c,b,fj),null!==c){Y=c;return}}else {c=Ij(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else {T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a;}while(null!==b);0===T&&(T=5);}function Pk(a,b,c){var d=C,e=ok.transition;try{ok.transition=null,C=1,Wk(a,b,c,d);}finally{ok.transition=e,C=d;}return null}
function Wk(a,b,c,d){do Hk();while(null!==wk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===Q&&(Y=Q=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||vk||(vk=true,Fk(hc,function(){Hk();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ok.transition;ok.transition=null;
var g=C;C=1;var h=K;K|=4;nk.current=null;Oj(a,c);dk(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;hk(c);dc();K=h;C=g;ok.transition=f;}else a.current=c;vk&&(vk=false,wk=a,xk=e);f=a.pendingLanes;0===f&&(Ri=null);mc(c.stateNode);Dk(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Oi)throw Oi=false,a=Pi,Pi=null,a;0!==(xk&1)&&0!==a.tag&&Hk();f=a.pendingLanes;0!==(f&1)?a===zk?yk++:(yk=0,zk=a):yk=0;jg();return null}
function Hk(){if(null!==wk){var a=Dc(xk),b=ok.transition,c=C;try{ok.transition=null;C=16>a?16:a;if(null===wk)var d=!1;else {a=wk;wk=null;xk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Pj(8,m,f);}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Sj(m);if(m===
l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y;}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J;}while(null!==t)}}V=f;}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Pj(9,f,f.return);}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return;}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Qj(9,h);}}catch(na){W(h,h.return,na);}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return;}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a);}catch(na){}d=!0;}return d}finally{C=c,ok.transition=b;}}return  false}function Xk(a,b,c){b=Ji(c,b);b=Ni(a,b,1);a=nh(a,b,1);b=R();null!==a&&(Ac(a,1,b),Dk(a,b));}
function W(a,b,c){if(3===a.tag)Xk(a,a,c);else for(;null!==b;){if(3===b.tag){Xk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ri||!Ri.has(d))){a=Ji(c,a);a=Qi(b,a,1);b=nh(b,a,1);a=R();null!==b&&(Ac(b,1,a),Dk(b,a));break}}b=b.return;}}
function Ti(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=R();a.pingedLanes|=a.suspendedLanes&c;Q===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-fk?Kk(a,0):rk|=c);Dk(a,b);}function Yk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=R();a=ih(a,b);null!==a&&(Ac(a,b,c),Dk(a,c));}function uj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Yk(a,c);}
function bk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Yk(a,c);}var Vk;
Vk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)dh=true;else {if(0===(a.lanes&c)&&0===(b.flags&128))return dh=false,yj(a,b,c);dh=0!==(a.flags&131072)?true:false;}else dh=false,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;ij(a,b);a=b.pendingProps;var e=Yf(b,H.current);ch(b,c);e=Nh(null,b,d,a,e,c);var f=Sh();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
null,Zf(d)?(f=true,cg(b)):f=false,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,kh(b),e.updater=Ei,b.stateNode=e,e._reactInternals=b,Ii(b,d,a,c),b=jj(null,b,d,true,f,c)):(b.tag=0,I&&f&&vg(b),Xi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{ij(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Zk(d);a=Ci(d,a);switch(e){case 0:b=cj(null,b,d,a,c);break a;case 1:b=hj(null,b,d,a,c);break a;case 11:b=Yi(null,b,d,a,c);break a;case 14:b=$i(null,b,d,Ci(d.type,a),c);break a}throw Error(p(306,
d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),cj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),hj(a,b,d,e,c);case 3:a:{kj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;lh(a,b);qh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:false,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
f,b.memoizedState=f,b.flags&256){e=Ji(Error(p(423)),b);b=lj(a,b,d,c,e);break a}else if(d!==e){e=Ji(Error(p(424)),b);b=lj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=true,zg=null,c=Vg(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else {Ig();if(d===e){b=Zi(a,b,c);break a}Xi(a,b,d,c);}b=b.child;}return b;case 5:return Ah(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
gj(a,b),Xi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return oj(a,b,c);case 4:return yh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Ug(b,null,d,c):Xi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),Yi(a,b,d,e,c);case 7:return Xi(a,b,b.pendingProps,c),b.child;case 8:return Xi(a,b,b.pendingProps.children,c),b.child;case 12:return Xi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
g=e.value;G(Wg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=Zi(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=mh(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k;}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);bh(f.return,
c,b);h.lanes|=c;break}k=k.next;}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);bh(g,c,b);g=f.sibling;}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return;}f=g;}Xi(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,d=b.pendingProps.children,ch(b,c),e=eh(e),d=d(e),b.flags|=1,Xi(a,b,d,c),
b.child;case 14:return d=b.type,e=Ci(d,b.pendingProps),e=Ci(d.type,e),$i(a,b,d,e,c);case 15:return bj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),ij(a,b),b.tag=1,Zf(d)?(a=true,cg(b)):a=false,ch(b,c),Gi(b,d,e),Ii(b,d,e,c),jj(null,b,d,true,a,c);case 19:return xj(a,b,c);case 22:return dj(a,b,c)}throw Error(p(156,b.tag));};function Fk(a,b){return ac(a,b)}
function $k(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null;}function Bg(a,b,c,d){return new $k(a,b,c,d)}function aj(a){a=a.prototype;return !(!a||!a.isReactComponent)}
function Zk(a){if("function"===typeof a)return aj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
function Pg(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Rg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)aj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Tg(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return pj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Tg(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function pj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:false};return a}function Qg(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
function Sg(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function al(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
null;}function bl(a,b,c,d,e,f,g,h,k){a=new al(a,b,c,h,k);1===b?(b=1,true===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};kh(f);return a}function cl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function dl(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return;}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
function el(a,b,c,d,e,f,g,h,k){a=bl(c,d,true,a,e,f,g,h,k);a.context=dl(null);c=a.current;d=R();e=yi(c);f=mh(d,e);f.callback=void 0!==b&&null!==b?b:null;nh(c,f,e);a.current.lanes=e;Ac(a,e,d);Dk(a,d);return a}function fl(a,b,c,d){var e=b.current,f=R(),g=yi(e);c=dl(c);null===b.context?b.context=c:b.pendingContext=c;b=mh(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=nh(e,b,g);null!==a&&(gi(a,e,g,f),oh(a,e,g));return g}
function gl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function hl(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b;}}function il(a,b){hl(a,b);(a=a.alternate)&&hl(a,b);}function jl(){return null}var kl="function"===typeof reportError?reportError:function(a){console.error(a);};function ll(a){this._internalRoot=a;}
ml.prototype.render=ll.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));fl(a,b,null,null);};ml.prototype.unmount=ll.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Rk(function(){fl(null,a,null,null);});b[uf]=null;}};function ml(a){this._internalRoot=a;}
ml.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a);}};function nl(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function ol(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function pl(){}
function ql(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=gl(g);f.call(a);};}var g=el(b,d,a,0,null,false,false,"",pl);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Rk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=gl(k);h.call(a);};}var k=bl(a,0,false,null,null,false,false,"",pl);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Rk(function(){fl(b,k,c,d);});return k}
function rl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=gl(g);h.call(a);};}fl(b,g,a,e);}else g=ql(c,b,a,e,d);return gl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Dk(b,B()),0===(K&6)&&(Gj=B()+500,jg()));}break;case 13:Rk(function(){var b=ih(a,1);if(null!==b){var c=R();gi(b,a,1,c);}}),il(a,1);}};
Fc=function(a){if(13===a.tag){var b=ih(a,134217728);if(null!==b){var c=R();gi(b,a,134217728,c);}il(a,134217728);}};Gc=function(a){if(13===a.tag){var b=yi(a),c=ih(a,b);if(null!==c){var d=R();gi(c,a,b,d);}il(a,b);}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c;}};
yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e);}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,false);}};Gb=Qk;Hb=Rk;
var sl={usingClientEntryPoint:false,Events:[Cb,ue,Db,Eb,Fb,Qk]},tl={findFiberByHostInstance:Wc,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"};
var ul={bundleType:tl.bundleType,version:tl.version,rendererPackageName:tl.rendererPackageName,rendererConfig:tl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:tl.findFiberByHostInstance||
jl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{kc=vl.inject(ul),lc=vl;}catch(a){}}reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sl;
reactDom_production_min.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!nl(b))throw Error(p(200));return cl(a,b,null,c)};reactDom_production_min.createRoot=function(a,b){if(!nl(a))throw Error(p(299));var c=false,d="",e=kl;null!==b&&void 0!==b&&(true===b.unstable_strictMode&&(c=true),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=bl(a,1,false,null,null,c,false,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ll(b)};
reactDom_production_min.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};reactDom_production_min.flushSync=function(a){return Rk(a)};reactDom_production_min.hydrate=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,true,c)};
reactDom_production_min.hydrateRoot=function(a,b,c){if(!nl(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=false,f="",g=kl;null!==c&&void 0!==c&&(true===c.unstable_strictMode&&(e=true),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=el(b,null,a,1,null!=c?c:null,e,false,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
e);return new ml(b)};reactDom_production_min.render=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,false,c)};reactDom_production_min.unmountComponentAtNode=function(a){if(!ol(a))throw Error(p(40));return a._reactRootContainer?(Rk(function(){rl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null;});}),true):false};reactDom_production_min.unstable_batchedUpdates=Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!ol(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return rl(a,b,c,false,d)};reactDom_production_min.version="18.3.1-next-f1338f8080-20240426";

function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}

var reactDomExports = reactDom.exports;

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const __vite_import_meta_env__$1 = {};
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

var withSelector = {exports: {}};

var withSelector_production = {};

var shim$2 = {exports: {}};

var useSyncExternalStoreShim_production = {};

/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = reactExports;
function is$1(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs$1 = "function" === typeof Object.is ? Object.is : is$1,
  useState = React$1.useState,
  useEffect$1 = React$1.useEffect,
  useLayoutEffect = React$1.useLayoutEffect,
  useDebugValue$2 = React$1.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(),
    _useState = useState({ inst: { value: value, getSnapshot: getSnapshot } }),
    inst = _useState[0].inst,
    forceUpdate = _useState[1];
  useLayoutEffect(
    function () {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect$1(
    function () {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      return subscribe(function () {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
      });
    },
    [subscribe]
  );
  useDebugValue$2(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs$1(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim$1 =
  "undefined" === typeof window ||
  "undefined" === typeof window.document ||
  "undefined" === typeof window.document.createElement
    ? useSyncExternalStore$1
    : useSyncExternalStore$2;
useSyncExternalStoreShim_production.useSyncExternalStore =
  void 0 !== React$1.useSyncExternalStore ? React$1.useSyncExternalStore : shim$1;

{
  shim$2.exports = useSyncExternalStoreShim_production;
}

var shimExports = shim$2.exports;

/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = reactExports,
  shim = shimExports;
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  useSyncExternalStore = shim.useSyncExternalStore,
  useRef = React.useRef,
  useEffect = React.useEffect,
  useMemo = React.useMemo,
  useDebugValue$1 = React.useDebugValue;
withSelector_production.useSyncExternalStoreWithSelector = function (
  subscribe,
  getSnapshot,
  getServerSnapshot,
  selector,
  isEqual
) {
  var instRef = useRef(null);
  if (null === instRef.current) {
    var inst = { hasValue: false, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo(
    function () {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return (memoizedSelection = currentSelection);
          }
          return (memoizedSelection = nextSnapshot);
        }
        currentSelection = memoizedSelection;
        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return (memoizedSnapshot = nextSnapshot), currentSelection;
        memoizedSnapshot = nextSnapshot;
        return (memoizedSelection = nextSelection);
      }
      var hasMemo = false,
        memoizedSnapshot,
        memoizedSelection,
        maybeGetServerSnapshot =
          void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function () {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot
          ? void 0
          : function () {
              return memoizedSelector(maybeGetServerSnapshot());
            }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
  useEffect(
    function () {
      inst.hasValue = true;
      inst.value = value;
    },
    [value]
  );
  useDebugValue$1(value);
  return value;
};

{
  withSelector.exports = withSelector_production;
}

var withSelectorExports = withSelector.exports;
const useSyncExternalStoreExports = /*@__PURE__*/getDefaultExportFromCjs(withSelectorExports);

const __vite_import_meta_env__ = {};
const { useDebugValue } = React$2;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
let didWarnAboutEqualityFn = false;
const identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;

var dexie_min = {exports: {}};

(function (module, exports$1) {
	((e,t)=>{module.exports=t();})(commonjsGlobal,function(){var B=function(e,t){return (B=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(e,t){e.__proto__=t;}:function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);}))(e,t)};var _=function(){return (_=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function R(e,t,n){for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||((r=r||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}var f="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:commonjsGlobal,O=Object.keys,x=Array.isArray;function a(t,n){return "object"==typeof n&&O(n).forEach(function(e){t[e]=n[e];}),t}"undefined"==typeof Promise||f.Promise||(f.Promise=Promise);var F=Object.getPrototypeOf,M={}.hasOwnProperty;function m(e,t){return M.call(e,t)}function N(t,n){"function"==typeof n&&(n=n(F(t))),("undefined"==typeof Reflect?O:Reflect.ownKeys)(n).forEach(function(e){u(t,e,n[e]);});}var L=Object.defineProperty;function u(e,t,n,r){L(e,t,a(n&&m(n,"get")&&"function"==typeof n.get?{get:n.get,set:n.set,configurable:true}:{value:n,configurable:true,writable:true},r));}function U(t){return {from:function(e){return t.prototype=Object.create(e.prototype),u(t.prototype,"constructor",t),{extend:N.bind(null,t.prototype)}}}}var V=Object.getOwnPropertyDescriptor;var z=[].slice;function W(e,t,n){return z.call(e,t,n)}function Y(e,t){return t(e)}function $(e){if(!e)throw new Error("Assertion Failed")}function Q(e){f.setImmediate?setImmediate(e):setTimeout(e,0);}function c(e,t){if("string"==typeof t&&m(e,t))return e[t];if(!t)return e;if("string"!=typeof t){for(var n=[],r=0,o=t.length;r<o;++r){var i=c(e,t[r]);n.push(i);}return n}var a,u=t.indexOf(".");return  -1===u||null==(a=e[t.substr(0,u)])?void 0:c(a,t.substr(u+1))}function b(e,t,n){if(e&&void 0!==t&&!("isFrozen"in Object&&Object.isFrozen(e)))if("string"!=typeof t&&"length"in t){$("string"!=typeof n&&"length"in n);for(var r=0,o=t.length;r<o;++r)b(e,t[r],n[r]);}else {var i,a,u=t.indexOf(".");-1!==u?(i=t.substr(0,u),""===(u=t.substr(u+1))?void 0===n?x(e)&&!isNaN(parseInt(i))?e.splice(i,1):delete e[i]:e[i]=n:b(a=(a=e[i])&&m(e,i)?a:e[i]={},u,n)):void 0===n?x(e)&&!isNaN(parseInt(t))?e.splice(t,1):delete e[t]:e[t]=n;}}function G(e){var t,n={};for(t in e)m(e,t)&&(n[t]=e[t]);return n}var X=[].concat;function H(e){return X.apply([],e)}var e="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(H([8,16,32,64].map(function(t){return ["Int","Uint","Float"].map(function(e){return e+t+"Array"})}))).filter(function(e){return f[e]}),J=new Set(e.map(function(e){return f[e]}));var Z=null;function ee(e){Z=new WeakMap;e=function e(t){if(!t||"object"!=typeof t)return t;var n=Z.get(t);if(n)return n;if(x(t)){n=[],Z.set(t,n);for(var r=0,o=t.length;r<o;++r)n.push(e(t[r]));}else if(J.has(t.constructor))n=t;else {var i,a=F(t);for(i in n=a===Object.prototype?{}:Object.create(a),Z.set(t,n),t)m(t,i)&&(n[i]=e(t[i]));}return n}(e);return Z=null,e}var te={}.toString;function ne(e){return te.call(e).slice(8,-1)}var re="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator",oe="symbol"==typeof re?function(e){var t;return null!=e&&(t=e[re])&&t.apply(e)}:function(){return null};function ie(e,t){t=e.indexOf(t);0<=t&&e.splice(t,1);}var ae={};function n(e){var t,n,r,o;if(1===arguments.length){if(x(e))return e.slice();if(this===ae&&"string"==typeof e)return [e];if(o=oe(e))for(n=[];!(r=o.next()).done;)n.push(r.value);else {if(null==e)return [e];if("number"!=typeof(t=e.length))return [e];for(n=new Array(t);t--;)n[t]=e[t];}}else for(t=arguments.length,n=new Array(t);t--;)n[t]=arguments[t];return n}var ue="undefined"!=typeof Symbol?function(e){return "AsyncFunction"===e[Symbol.toStringTag]}:function(){return  false},e=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],t=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(e),se={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function ce(e,t){this.name=e,this.message=t;}function le(e,t){return e+". Errors: "+Object.keys(t).map(function(e){return t[e].toString()}).filter(function(e,t,n){return n.indexOf(e)===t}).join("\n")}function fe(e,t,n,r){this.failures=t,this.failedKeys=r,this.successCount=n,this.message=le(e,t);}function he(e,t){this.name="BulkError",this.failures=Object.keys(t).map(function(e){return t[e]}),this.failuresByPos=t,this.message=le(e,this.failures);}U(ce).from(Error).extend({toString:function(){return this.name+": "+this.message}}),U(fe).from(ce),U(he).from(ce);var de=t.reduce(function(e,t){return e[t]=t+"Error",e},{}),pe=ce,k=t.reduce(function(e,n){var r=n+"Error";function t(e,t){this.name=r,e?"string"==typeof e?(this.message="".concat(e).concat(t?"\n "+t:""),this.inner=t||null):"object"==typeof e&&(this.message="".concat(e.name," ").concat(e.message),this.inner=e):(this.message=se[n]||r,this.inner=null);}return U(t).from(pe),e[n]=t,e},{}),ye=(k.Syntax=SyntaxError,k.Type=TypeError,k.Range=RangeError,e.reduce(function(e,t){return e[t+"Error"]=k[t],e},{}));e=t.reduce(function(e,t){return  -1===["Syntax","Type","Range"].indexOf(t)&&(e[t+"Error"]=k[t]),e},{});function g(){}function ve(e){return e}function me(t,n){return null==t||t===ve?n:function(e){return n(t(e))}}function be(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments);}}function ge(o,i){return o===g?i:function(){var e=o.apply(this,arguments),t=(void 0!==e&&(arguments[0]=e),this.onsuccess),n=this.onerror,r=(this.onsuccess=null,this.onerror=null,i.apply(this,arguments));return t&&(this.onsuccess=this.onsuccess?be(t,this.onsuccess):t),n&&(this.onerror=this.onerror?be(n,this.onerror):n),void 0!==r?r:e}}function we(n,r){return n===g?r:function(){n.apply(this,arguments);var e=this.onsuccess,t=this.onerror;this.onsuccess=this.onerror=null,r.apply(this,arguments),e&&(this.onsuccess=this.onsuccess?be(e,this.onsuccess):e),t&&(this.onerror=this.onerror?be(t,this.onerror):t);}}function _e(o,i){return o===g?i:function(e){var t=o.apply(this,arguments),e=(a(e,t),this.onsuccess),n=this.onerror,r=(this.onsuccess=null,this.onerror=null,i.apply(this,arguments));return e&&(this.onsuccess=this.onsuccess?be(e,this.onsuccess):e),n&&(this.onerror=this.onerror?be(n,this.onerror):n),void 0===t?void 0===r?void 0:r:a(t,r)}}function xe(e,t){return e===g?t:function(){return  false!==t.apply(this,arguments)&&e.apply(this,arguments)}}function ke(o,i){return o===g?i:function(){var e=o.apply(this,arguments);if(e&&"function"==typeof e.then){for(var t=this,n=arguments.length,r=new Array(n);n--;)r[n]=arguments[n];return e.then(function(){return i.apply(t,r)})}return i.apply(this,arguments)}}e.ModifyError=fe,e.DexieError=ce,e.BulkError=he;var l="undefined"!=typeof location&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function Oe(e){l=e;}var Pe={},Ke=100,Ee="undefined"==typeof Promise?[]:(t=Promise.resolve(),"undefined"!=typeof crypto&&crypto.subtle?[Ee=crypto.subtle.digest("SHA-512",new Uint8Array([0])),F(Ee),t]:[t,F(t),t]),t=Ee[0],Se=Ee[1],Se=Se&&Se.then,je=t&&t.constructor,Ae=!!Ee[2];var Ce=function(e,t){Re.push([e,t]),Ie&&(queueMicrotask(Ye),Ie=false);},Te=true,Ie=true,qe=[],De=[],Be=ve,s={id:"global",global:true,ref:0,unhandleds:[],onunhandled:g,pgp:false,env:{},finalize:g},P=s,Re=[],Fe=0,Me=[];function K(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=false;var t=this._PSD=P;if("function"!=typeof e){if(e!==Pe)throw new TypeError("Not a function");this._state=arguments[1],this._value=arguments[2],false===this._state&&Ue(this,this._value);}else this._state=null,this._value=null,++t.ref,function t(r,e){try{e(function(n){if(null===r._state){if(n===r)throw new TypeError("A promise cannot be resolved with itself.");var e=r._lib&&$e();n&&"function"==typeof n.then?t(r,function(e,t){n instanceof K?n._then(e,t):n.then(e,t);}):(r._state=!0,r._value=n,Ve(r)),e&&Qe();}},Ue.bind(null,r));}catch(e){Ue(r,e);}}(this,e);}var Ne={get:function(){var u=P,t=et;function e(n,r){var o=this,i=!u.global&&(u!==P||t!==et),a=i&&!v(),e=new K(function(e,t){ze(o,new Le(ut(n,u,i,a),ut(r,u,i,a),e,t,u));});return this._consoleTask&&(e._consoleTask=this._consoleTask),e}return e.prototype=Pe,e},set:function(e){u(this,"then",e&&e.prototype===Pe?Ne:{get:function(){return e},set:Ne.set});}};function Le(e,t,n,r,o){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r,this.psd=o;}function Ue(e,t){var n,r;De.push(t),null===e._state&&(n=e._lib&&$e(),t=Be(t),e._state=false,e._value=t,r=e,qe.some(function(e){return e._value===r._value})||qe.push(r),Ve(e),n)&&Qe();}function Ve(e){var t=e._listeners;e._listeners=[];for(var n=0,r=t.length;n<r;++n)ze(e,t[n]);var o=e._PSD;--o.ref||o.finalize(),0===Fe&&(++Fe,Ce(function(){0==--Fe&&Ge();},[]));}function ze(e,t){if(null===e._state)e._listeners.push(t);else {var n=e._state?t.onFulfilled:t.onRejected;if(null===n)return (e._state?t.resolve:t.reject)(e._value);++t.psd.ref,++Fe,Ce(We,[n,e,t]);}}function We(e,t,n){try{var r,o=t._value;!t._state&&De.length&&(De=[]),r=l&&t._consoleTask?t._consoleTask.run(function(){return e(o)}):e(o),t._state||-1!==De.indexOf(o)||(e=>{for(var t=qe.length;t;)if(qe[--t]._value===e._value)return qe.splice(t,1)})(t),n.resolve(r);}catch(e){n.reject(e);}finally{0==--Fe&&Ge(),--n.psd.ref||n.psd.finalize();}}function Ye(){at(s,function(){$e()&&Qe();});}function $e(){var e=Te;return Ie=Te=false,e}function Qe(){var e,t,n;do{for(;0<Re.length;)for(e=Re,Re=[],n=e.length,t=0;t<n;++t){var r=e[t];r[0].apply(null,r[1]);}}while(0<Re.length);Ie=Te=true;}function Ge(){for(var e=qe,t=(qe=[],e.forEach(function(e){e._PSD.onunhandled.call(null,e._value,e);}),Me.slice(0)),n=t.length;n;)t[--n]();}function Xe(e){return new K(Pe,false,e)}function E(n,r){var o=P;return function(){var e=$e(),t=P;try{return h(o,!0),n.apply(this,arguments)}catch(e){r&&r(e);}finally{h(t,false),e&&Qe();}}}N(K.prototype,{then:Ne,_then:function(e,t){ze(this,new Le(null,null,e,t,P));},catch:function(e){var t,n;return 1===arguments.length?this.then(null,e):(t=e,n=arguments[1],"function"==typeof t?this.then(null,function(e){return (e instanceof t?n:Xe)(e)}):this.then(null,function(e){return (e&&e.name===t?n:Xe)(e)}))},finally:function(t){return this.then(function(e){return K.resolve(t()).then(function(){return e})},function(e){return K.resolve(t()).then(function(){return Xe(e)})})},timeout:function(r,o){var i=this;return r<1/0?new K(function(e,t){var n=setTimeout(function(){return t(new k.Timeout(o))},r);i.then(e,t).finally(clearTimeout.bind(null,n));}):this}}),"undefined"!=typeof Symbol&&Symbol.toStringTag&&u(K.prototype,Symbol.toStringTag,"Dexie.Promise"),s.env=it(),N(K,{all:function(){var i=n.apply(null,arguments).map(rt);return new K(function(n,r){0===i.length&&n([]);var o=i.length;i.forEach(function(e,t){return K.resolve(e).then(function(e){i[t]=e,--o||n(i);},r)});})},resolve:function(n){return n instanceof K?n:n&&"function"==typeof n.then?new K(function(e,t){n.then(e,t);}):new K(Pe,true,n)},reject:Xe,race:function(){var e=n.apply(null,arguments).map(rt);return new K(function(t,n){e.map(function(e){return K.resolve(e).then(t,n)});})},PSD:{get:function(){return P},set:function(e){return P=e}},totalEchoes:{get:function(){return et}},newPSD:y,usePSD:at,scheduler:{get:function(){return Ce},set:function(e){Ce=e;}},rejectionMapper:{get:function(){return Be},set:function(e){Be=e;}},follow:function(o,n){return new K(function(e,t){return y(function(n,r){var e=P;e.unhandleds=[],e.onunhandled=r,e.finalize=be(function(){var t,e=this;t=function(){0===e.unhandleds.length?n():r(e.unhandleds[0]);},Me.push(function e(){t(),Me.splice(Me.indexOf(e),1);}),++Fe,Ce(function(){0==--Fe&&Ge();},[]);},e.finalize),o();},n,e,t)})}}),je&&(je.allSettled&&u(K,"allSettled",function(){var e=n.apply(null,arguments).map(rt);return new K(function(n){0===e.length&&n([]);var r=e.length,o=new Array(r);e.forEach(function(e,t){return K.resolve(e).then(function(e){return o[t]={status:"fulfilled",value:e}},function(e){return o[t]={status:"rejected",reason:e}}).then(function(){return --r||n(o)})});})}),je.any&&"undefined"!=typeof AggregateError&&u(K,"any",function(){var e=n.apply(null,arguments).map(rt);return new K(function(n,r){0===e.length&&r(new AggregateError([]));var o=e.length,i=new Array(o);e.forEach(function(e,t){return K.resolve(e).then(function(e){return n(e)},function(e){i[t]=e,--o||r(new AggregateError(i));})});})}),je.withResolvers)&&(K.withResolvers=je.withResolvers);var i={awaits:0,echoes:0,id:0},He=0,Je=[],Ze=0,et=0,tt=0;function y(e,t,n,r){var o=P,i=Object.create(o),t=(i.parent=o,i.ref=0,i.global=false,i.id=++tt,s.env,i.env=Ae?{Promise:K,PromiseProp:{value:K,configurable:true,writable:true},all:K.all,race:K.race,allSettled:K.allSettled,any:K.any,resolve:K.resolve,reject:K.reject}:{},t&&a(i,t),++o.ref,i.finalize=function(){--this.parent.ref||this.parent.finalize();},at(i,e,n,r));return 0===i.ref&&i.finalize(),t}function nt(){return i.id||(i.id=++He),++i.awaits,i.echoes+=Ke,i.id}function v(){return !!i.awaits&&(0==--i.awaits&&(i.id=0),i.echoes=i.awaits*Ke,true)}function rt(e){return i.echoes&&e&&e.constructor===je?(nt(),e.then(function(e){return v(),e},function(e){return v(),w(e)})):e}function ot(){var e=Je[Je.length-1];Je.pop(),h(e,false);}function h(e,t){var n,r,o=P;(t?!i.echoes||Ze++&&e===P:!Ze||--Ze&&e===P)||queueMicrotask(t?function(e){++et,i.echoes&&0!=--i.echoes||(i.echoes=i.awaits=i.id=0),Je.push(P),h(e,true);}.bind(null,e):ot),e!==P&&(P=e,o===s&&(s.env=it()),Ae)&&(n=s.env.Promise,r=e.env,o.global||e.global)&&(Object.defineProperty(f,"Promise",r.PromiseProp),n.all=r.all,n.race=r.race,n.resolve=r.resolve,n.reject=r.reject,r.allSettled&&(n.allSettled=r.allSettled),r.any)&&(n.any=r.any);}function it(){var e=f.Promise;return Ae?{Promise:e,PromiseProp:Object.getOwnPropertyDescriptor(f,"Promise"),all:e.all,race:e.race,allSettled:e.allSettled,any:e.any,resolve:e.resolve,reject:e.reject}:{}}function at(e,t,n,r,o){var i=P;try{return h(e,!0),t(n,r,o)}finally{h(i,false);}}function ut(t,n,r,o){return "function"!=typeof t?t:function(){var e=P;r&&nt(),h(n,true);try{return t.apply(this,arguments)}finally{h(e,false),o&&queueMicrotask(v);}}}function st(e){Promise===je&&0===i.echoes?0===Ze?e():enqueueNativeMicroTask(e):setTimeout(e,0);} -1===(""+Se).indexOf("[native code]")&&(nt=v=g);var w=K.reject;var ct=String.fromCharCode(65535),S="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",lt="String expected.",ft=[],ht="__dbnames",dt="readonly",pt="readwrite";function yt(e,t){return e?t?function(){return e.apply(this,arguments)&&t.apply(this,arguments)}:e:t}var vt={type:3,lower:-1/0,lowerOpen:false,upper:[[]],upperOpen:false};function mt(t){return "string"!=typeof t||/\./.test(t)?function(e){return e}:function(e){return void 0===e[t]&&t in e&&delete(e=ee(e))[t],e}}function bt(){throw k.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.")}function j(e,t){try{var n=gt(e),r=gt(t);if(n!==r)return "Array"===n?1:"Array"===r?-1:"binary"===n?1:"binary"===r?-1:"string"===n?1:"string"===r?-1:"Date"===n?1:"Date"!==r?NaN:-1;switch(n){case "number":case "Date":case "string":return t<e?1:e<t?-1:0;case "binary":for(var o=wt(e),i=wt(t),a=o.length,u=i.length,s=a<u?a:u,c=0;c<s;++c)if(o[c]!==i[c])return o[c]<i[c]?-1:1;return a===u?0:a<u?-1:1;case "Array":for(var l=e,f=t,h=l.length,d=f.length,p=h<d?h:d,y=0;y<p;++y){var v=j(l[y],f[y]);if(0!==v)return v}return h===d?0:h<d?-1:1}}catch(e){}return NaN}function gt(e){var t=typeof e;return "object"==t&&(ArrayBuffer.isView(e)||"ArrayBuffer"===(t=ne(e)))?"binary":t}function wt(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e)}function _t(t,n,r){var e=t.schema.yProps;return e?(n&&0<r.numFailures&&(n=n.filter(function(e,t){return !r.failures[t]})),Promise.all(e.map(function(e){e=e.updatesTable;return n?t.db.table(e).where("k").anyOf(n).delete():t.db.table(e).clear()})).then(function(){return r})):r}kt.prototype.execute=function(e){var t=this["@@propmod"];if(void 0!==t.add){var n=t.add;if(x(n))return R(R([],x(e)?e:[],true),n).sort();if("number"==typeof n)return (Number(e)||0)+n;if("bigint"==typeof n)try{return BigInt(e)+n}catch(e){return BigInt(0)+n}throw new TypeError("Invalid term ".concat(n))}if(void 0!==t.remove){var r=t.remove;if(x(r))return x(e)?e.filter(function(e){return !r.includes(e)}).sort():[];if("number"==typeof r)return Number(e)-r;if("bigint"==typeof r)try{return BigInt(e)-r}catch(e){return BigInt(0)-r}throw new TypeError("Invalid subtrahend ".concat(r))}n=null==(n=t.replacePrefix)?void 0:n[0];return n&&"string"==typeof e&&e.startsWith(n)?t.replacePrefix[1]+e.substring(n.length):e};var xt=kt;function kt(e){this["@@propmod"]=e;}function Ot(e,t){for(var n=O(t),r=n.length,o=false,i=0;i<r;++i){var a=n[i],u=t[a],s=c(e,a);u instanceof xt?(b(e,a,u.execute(s)),o=true):s!==u&&(b(e,a,u),o=true);}return o}r.prototype._trans=function(e,r,t){var n=this._tx||P.trans,o=this.name,i=l&&"undefined"!=typeof console&&console.createTask&&console.createTask("Dexie: ".concat("readonly"===e?"read":"write"," ").concat(this.name));function a(e,t,n){if(n.schema[o])return r(n.idbtrans,n);throw new k.NotFound("Table "+o+" not part of transaction")}var u=$e();try{var s=n&&n.db._novip===this.db._novip?n===P.trans?n._promise(e,a,t):y(function(){return n._promise(e,a,t)},{trans:n,transless:P.transless||P}):function t(n,r,o,i){if(n.idbdb&&(n._state.openComplete||P.letThrough||n._vip)){var a=n._createTransaction(r,o,n._dbSchema);try{a.create(),n._state.PR1398_maxLoop=3;}catch(e){return e.name===de.InvalidState&&n.isOpen()&&0<--n._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),n.close({disableAutoOpen:!1}),n.open().then(function(){return t(n,r,o,i)})):w(e)}return a._promise(r,function(e,t){return y(function(){return P.trans=a,i(e,t,a)})}).then(function(e){if("readwrite"===r)try{a.idbtrans.commit();}catch(e){}return "readonly"===r?e:a._completion.then(function(){return e})})}if(n._state.openComplete)return w(new k.DatabaseClosed(n._state.dbOpenError));if(!n._state.isBeingOpened){if(!n._state.autoOpen)return w(new k.DatabaseClosed);n.open().catch(g);}return n._state.dbReadyPromise.then(function(){return t(n,r,o,i)})}(this.db,e,[this.name],a);return i&&(s._consoleTask=i,s=s.catch(function(e){return console.trace(e),w(e)})),s}finally{u&&Qe();}},r.prototype.get=function(t,e){var n=this;return t&&t.constructor===Object?this.where(t).first(e):null==t?w(new k.Type("Invalid argument to Table.get()")):this._trans("readonly",function(e){return n.core.get({trans:e,key:t}).then(function(e){return n.hook.reading.fire(e)})}).then(e)},r.prototype.where=function(i){if("string"==typeof i)return new this.db.WhereClause(this,i);if(x(i))return new this.db.WhereClause(this,"[".concat(i.join("+"),"]"));var n=O(i);if(1===n.length)return this.where(n[0]).equals(i[n[0]]);var e=this.schema.indexes.concat(this.schema.primKey).filter(function(t){if(t.compound&&n.every(function(e){return 0<=t.keyPath.indexOf(e)})){for(var e=0;e<n.length;++e)if(-1===n.indexOf(t.keyPath[e]))return  false;return  true}return  false}).sort(function(e,t){return e.keyPath.length-t.keyPath.length})[0];if(e&&this.db._maxKey!==ct)return t=e.keyPath.slice(0,n.length),this.where(t).equals(t.map(function(e){return i[e]}));!e&&l&&console.warn("The query ".concat(JSON.stringify(i)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(n.join("+"),"]"));var a=this.schema.idxByName;function u(e,t){return 0===j(e,t)}var t=n.reduce(function(e,t){var n=e[0],e=e[1],r=a[t],o=i[t];return [n||r,n||!r?yt(e,r&&r.multi?function(e){e=c(e,t);return x(e)&&e.some(function(e){return u(o,e)})}:function(e){return u(o,c(e,t))}):e]},[null,null]),r=t[0],t=t[1];return r?this.where(r.name).equals(i[r.keyPath]).filter(t):e?this.filter(t):this.where(n).equals("")},r.prototype.filter=function(e){return this.toCollection().and(e)},r.prototype.count=function(e){return this.toCollection().count(e)},r.prototype.offset=function(e){return this.toCollection().offset(e)},r.prototype.limit=function(e){return this.toCollection().limit(e)},r.prototype.each=function(e){return this.toCollection().each(e)},r.prototype.toArray=function(e){return this.toCollection().toArray(e)},r.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},r.prototype.orderBy=function(e){return new this.db.Collection(new this.db.WhereClause(this,x(e)?"[".concat(e.join("+"),"]"):e))},r.prototype.reverse=function(){return this.toCollection().reverse()},r.prototype.mapToClass=function(r){for(var i=this.db,a=this.name,o=((this.schema.mappedClass=r).prototype instanceof bt&&(r=(e=>{var t=o,n=e;if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=t;}function o(){return null!==e&&e.apply(this,arguments)||this}return B(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r),Object.defineProperty(o.prototype,"db",{get:function(){return i},enumerable:false,configurable:true}),o.prototype.table=function(){return a},o})(r)),new Set),e=r.prototype;e;e=F(e))Object.getOwnPropertyNames(e).forEach(function(e){return o.add(e)});function t(e){if(!e)return e;var t,n=Object.create(r.prototype);for(t in e)if(!o.has(t))try{n[t]=e[t];}catch(e){}return n}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=t,this.hook("reading",t),r},r.prototype.defineClass=function(){return this.mapToClass(function(e){a(this,e);})},r.prototype.add=function(t,n){var r=this,e=this.schema.primKey,o=e.auto,i=e.keyPath,a=t;return i&&o&&(a=mt(i)(t)),this._trans("readwrite",function(e){return r.core.mutate({trans:e,type:"add",keys:null!=n?[n]:null,values:[a]})}).then(function(e){return e.numFailures?K.reject(e.failures[0]):e.lastResult}).then(function(e){if(i)try{b(t,i,e);}catch(e){}return e})},r.prototype.upsert=function(r,o){var i=this,a=this.schema.primKey.keyPath;return this._trans("readwrite",function(n){return i.core.get({trans:n,key:r}).then(function(t){var e=null!=t?t:{};return Ot(e,o),a&&b(e,a,r),i.core.mutate({trans:n,type:"put",values:[e],keys:[r],upsert:true,updates:{keys:[r],changeSpecs:[o]}}).then(function(e){return e.numFailures?K.reject(e.failures[0]):!!t})})})},r.prototype.update=function(e,t){return "object"!=typeof e||x(e)?this.where(":id").equals(e).modify(t):void 0===(e=c(e,this.schema.primKey.keyPath))?w(new k.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(e).modify(t)},r.prototype.put=function(t,n){var r=this,e=this.schema.primKey,o=e.auto,i=e.keyPath,a=t;return i&&o&&(a=mt(i)(t)),this._trans("readwrite",function(e){return r.core.mutate({trans:e,type:"put",values:[a],keys:null!=n?[n]:null})}).then(function(e){return e.numFailures?K.reject(e.failures[0]):e.lastResult}).then(function(e){if(i)try{b(t,i,e);}catch(e){}return e})},r.prototype.delete=function(t){var n=this;return this._trans("readwrite",function(e){return n.core.mutate({trans:e,type:"delete",keys:[t]}).then(function(e){return _t(n,[t],e)}).then(function(e){return e.numFailures?K.reject(e.failures[0]):void 0})})},r.prototype.clear=function(){var t=this;return this._trans("readwrite",function(e){return t.core.mutate({trans:e,type:"deleteRange",range:vt}).then(function(e){return _t(t,null,e)})}).then(function(e){return e.numFailures?K.reject(e.failures[0]):void 0})},r.prototype.bulkGet=function(t){var n=this;return this._trans("readonly",function(e){return n.core.getMany({keys:t,trans:e}).then(function(e){return e.map(function(e){return n.hook.reading.fire(e)})})})},r.prototype.bulkAdd=function(o,e,t){var i=this,a=Array.isArray(e)?e:void 0,u=(t=t||(a?void 0:e))?t.allKeys:void 0;return this._trans("readwrite",function(e){var t=i.schema.primKey,n=t.auto,t=t.keyPath;if(t&&a)throw new k.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(a&&a.length!==o.length)throw new k.InvalidArgument("Arguments objects and keys must have the same length");var r=o.length,n=t&&n?o.map(mt(t)):o;return i.core.mutate({trans:e,type:"add",keys:a,values:n,wantResults:u}).then(function(e){var t=e.numFailures,n=e.failures;if(0===t)return u?e.results:e.lastResult;throw new he("".concat(i.name,".bulkAdd(): ").concat(t," of ").concat(r," operations failed"),n)})})},r.prototype.bulkPut=function(o,e,t){var i=this,a=Array.isArray(e)?e:void 0,u=(t=t||(a?void 0:e))?t.allKeys:void 0;return this._trans("readwrite",function(e){var t=i.schema.primKey,n=t.auto,t=t.keyPath;if(t&&a)throw new k.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(a&&a.length!==o.length)throw new k.InvalidArgument("Arguments objects and keys must have the same length");var r=o.length,n=t&&n?o.map(mt(t)):o;return i.core.mutate({trans:e,type:"put",keys:a,values:n,wantResults:u}).then(function(e){var t=e.numFailures,n=e.failures;if(0===t)return u?e.results:e.lastResult;throw new he("".concat(i.name,".bulkPut(): ").concat(t," of ").concat(r," operations failed"),n)})})},r.prototype.bulkUpdate=function(t){var h=this,n=this.core,r=t.map(function(e){return e.key}),o=t.map(function(e){return e.changes}),d=[];return this._trans("readwrite",function(e){return n.getMany({trans:e,keys:r,cache:"clone"}).then(function(c){var l=[],f=[],s=(t.forEach(function(e,t){var n=e.key,r=e.changes,o=c[t];if(o){for(var i=0,a=Object.keys(r);i<a.length;i++){var u=a[i],s=r[u];if(u===h.schema.primKey.keyPath){if(0!==j(s,n))throw new k.Constraint("Cannot update primary key in bulkUpdate()")}else b(o,u,s);}d.push(t),l.push(n),f.push(o);}}),l.length);return n.mutate({trans:e,type:"put",keys:l,values:f,updates:{keys:r,changeSpecs:o}}).then(function(e){var t=e.numFailures,n=e.failures;if(0===t)return s;for(var r=0,o=Object.keys(n);r<o.length;r++){var i,a=o[r],u=d[Number(a)];null!=u&&(i=n[a],delete n[a],n[u]=i);}throw new he("".concat(h.name,".bulkUpdate(): ").concat(t," of ").concat(s," operations failed"),n)})})})},r.prototype.bulkDelete=function(t){var r=this,o=t.length;return this._trans("readwrite",function(e){return r.core.mutate({trans:e,type:"delete",keys:t}).then(function(e){return _t(r,t,e)})}).then(function(e){var t=e.numFailures,n=e.failures;if(0===t)return e.lastResult;throw new he("".concat(r.name,".bulkDelete(): ").concat(t," of ").concat(o," operations failed"),n)})};var Pt=r;function r(){}function Kt(o){function t(e,t){if(t){for(var n=arguments.length,r=new Array(n-1);--n;)r[n-1]=arguments[n];return a[e].subscribe.apply(null,r),o}if("string"==typeof e)return a[e]}var a={};t.addEventType=u;for(var e=1,n=arguments.length;e<n;++e)u(arguments[e]);return t;function u(e,n,r){var o,i;if("object"!=typeof e)return n=n||xe,i={subscribers:[],fire:r=r||g,subscribe:function(e){ -1===i.subscribers.indexOf(e)&&(i.subscribers.push(e),i.fire=n(i.fire,e));},unsubscribe:function(t){i.subscribers=i.subscribers.filter(function(e){return e!==t}),i.fire=i.subscribers.reduce(n,r);}},a[e]=t[e]=i;O(o=e).forEach(function(e){var t=o[e];if(x(t))u(e,o[e][0],o[e][1]);else {if("asap"!==t)throw new k.InvalidArgument("Invalid event config");var n=u(e,ve,function(){for(var e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];n.subscribers.forEach(function(e){Q(function(){e.apply(null,t);});});});}});}}function Et(e,t){return U(t).from({prototype:e}),t}function St(e,t){return !(e.filter||e.algorithm||e.or)&&(t?e.justLimit:!e.replayFilter)}function jt(e,t){e.filter=yt(e.filter,t);}function At(e,t,n){var r=e.replayFilter;e.replayFilter=r?function(){return yt(r(),t())}:t,e.justLimit=n&&!r;}function Ct(e,t){if(e.isPrimKey)return t.primaryKey;var n=t.getIndexByKeyPath(e.index);if(n)return n;throw new k.Schema("KeyPath "+e.index+" on object store "+t.name+" is not indexed")}function Tt(e,t,n){var r=Ct(e,t.schema);return t.openCursor({trans:n,values:!e.keysOnly,reverse:"prev"===e.dir,unique:!!e.unique,query:{index:r,range:e.range}})}function It(e,i,t,n){var a,r,u=e.replayFilter?yt(e.filter,e.replayFilter()):e.filter;return e.or?(a={},r=function(e,t,n){var r,o;u&&!u(t,n,function(e){return t.stop(e)},function(e){return t.fail(e)})||("[object ArrayBuffer]"===(o=""+(r=t.primaryKey))&&(o=""+new Uint8Array(r)),m(a,o))||(a[o]=true,i(e,t,n));},Promise.all([e.or._iterate(r,t),qt(Tt(e,n,t),e.algorithm,r,!e.keysOnly&&e.valueMapper)])):qt(Tt(e,n,t),yt(e.algorithm,u),i,!e.keysOnly&&e.valueMapper)}function qt(e,r,o,i){var a=E(i?function(e,t,n){return o(i(e),t,n)}:o);return e.then(function(n){if(n)return n.start(function(){var t=function(){return n.continue()};r&&!r(n,function(e){return t=e},function(e){n.stop(e),t=g;},function(e){n.fail(e),t=g;})||a(n.value,n,function(e){return t=e}),t();})})}o.prototype._read=function(e,t){var n=this._ctx;return n.error?n.table._trans(null,w.bind(null,n.error)):n.table._trans("readonly",e).then(t)},o.prototype._write=function(e){var t=this._ctx;return t.error?t.table._trans(null,w.bind(null,t.error)):t.table._trans("readwrite",e,"locked")},o.prototype._addAlgorithm=function(e){var t=this._ctx;t.algorithm=yt(t.algorithm,e);},o.prototype._iterate=function(e,t){return It(this._ctx,e,t,this._ctx.table.core)},o.prototype.clone=function(e){var t=Object.create(this.constructor.prototype),n=Object.create(this._ctx);return e&&a(n,e),t._ctx=n,t},o.prototype.raw=function(){return this._ctx.valueMapper=null,this},o.prototype.each=function(t){var n=this._ctx;return this._read(function(e){return It(n,t,e,n.table.core)})},o.prototype.count=function(e){var o=this;return this._read(function(e){var t,n=o._ctx,r=n.table.core;return St(n,true)?r.count({trans:e,query:{index:Ct(n,r.schema),range:n.range}}).then(function(e){return Math.min(e,n.limit)}):(t=0,It(n,function(){return ++t,false},e,r).then(function(){return t}))}).then(e)},o.prototype.sortBy=function(e,t){var n=e.split(".").reverse(),r=n[0],o=n.length-1;function i(e,t){return t?i(e[n[t]],t-1):e[r]}var a="next"===this._ctx.dir?1:-1;function u(e,t){return j(i(e,o),i(t,o))*a}return this.toArray(function(e){return e.sort(u)}).then(t)},o.prototype.toArray=function(e){var i=this;return this._read(function(e){var t,n,r,o=i._ctx;return "next"===o.dir&&St(o,true)&&0<o.limit?(t=o.valueMapper,n=Ct(o,o.table.core.schema),o.table.core.query({trans:e,limit:o.limit,values:true,query:{index:n,range:o.range}}).then(function(e){e=e.result;return t?e.map(t):e})):(r=[],It(o,function(e){return r.push(e)},e,o.table.core).then(function(){return r}))},e)},o.prototype.offset=function(t){var e=this._ctx;return t<=0||(e.offset+=t,St(e)?At(e,function(){var n=t;return function(e,t){return 0===n||(1===n?--n:t(function(){e.advance(n),n=0;}),false)}}):At(e,function(){var e=t;return function(){return --e<0}})),this},o.prototype.limit=function(e){return this._ctx.limit=Math.min(this._ctx.limit,e),At(this._ctx,function(){var r=e;return function(e,t,n){return --r<=0&&t(n),0<=r}},true),this},o.prototype.until=function(r,o){return jt(this._ctx,function(e,t,n){return !r(e.value)||(t(n),o)}),this},o.prototype.first=function(e){return this.limit(1).toArray(function(e){return e[0]}).then(e)},o.prototype.last=function(e){return this.reverse().first(e)},o.prototype.filter=function(t){var e;return jt(this._ctx,function(e){return t(e.value)}),(e=this._ctx).isMatch=yt(e.isMatch,t),this},o.prototype.and=function(e){return this.filter(e)},o.prototype.or=function(e){return new this.db.WhereClause(this._ctx.table,e,this)},o.prototype.reverse=function(){return this._ctx.dir="prev"===this._ctx.dir?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},o.prototype.desc=function(){return this.reverse()},o.prototype.eachKey=function(n){var e=this._ctx;return e.keysOnly=!e.isMatch,this.each(function(e,t){n(t.key,t);})},o.prototype.eachUniqueKey=function(e){return this._ctx.unique="unique",this.eachKey(e)},o.prototype.eachPrimaryKey=function(n){var e=this._ctx;return e.keysOnly=!e.isMatch,this.each(function(e,t){n(t.primaryKey,t);})},o.prototype.keys=function(e){var t=this._ctx,n=(t.keysOnly=!t.isMatch,[]);return this.each(function(e,t){n.push(t.key);}).then(function(){return n}).then(e)},o.prototype.primaryKeys=function(e){var n=this._ctx;if("next"===n.dir&&St(n,true)&&0<n.limit)return this._read(function(e){var t=Ct(n,n.table.core.schema);return n.table.core.query({trans:e,values:false,limit:n.limit,query:{index:t,range:n.range}})}).then(function(e){return e.result}).then(e);n.keysOnly=!n.isMatch;var r=[];return this.each(function(e,t){r.push(t.primaryKey);}).then(function(){return r}).then(e)},o.prototype.uniqueKeys=function(e){return this._ctx.unique="unique",this.keys(e)},o.prototype.firstKey=function(e){return this.limit(1).keys(function(e){return e[0]}).then(e)},o.prototype.lastKey=function(e){return this.reverse().firstKey(e)},o.prototype.distinct=function(){var n,e=this._ctx,e=e.index&&e.table.schema.idxByName[e.index];return e&&e.multi&&(n={},jt(this._ctx,function(e){var e=e.primaryKey.toString(),t=m(n,e);return n[e]=true,!t})),this},o.prototype.modify=function(x){var n=this,k=this._ctx;return this._write(function(p){function y(e,t){var n=t.failures;u+=e-t.numFailures;for(var r=0,o=O(n);r<o.length;r++){var i=o[r];a.push(n[i]);}}var v="function"==typeof x?x:function(e){return Ot(e,x)},m=k.table.core,e=m.schema.primaryKey,b=e.outbound,g=e.extractKey,w=200,e=n.db._options.modifyChunkSize,a=(e&&(w="object"==typeof e?e[m.name]||e["*"]||200:e),[]),u=0,t=[],_=x===Bt;return n.clone().primaryKeys().then(function(f){function h(s){var c=Math.min(w,f.length-s),l=f.slice(s,s+c);return (_?Promise.resolve([]):m.getMany({trans:p,keys:l,cache:"immutable"})).then(function(e){var n=[],t=[],r=b?[]:null,o=_?l:[];if(!_)for(var i=0;i<c;++i){var a=e[i],u={value:ee(a),primKey:f[s+i]};false!==v.call(u,u.value,u)&&(null==u.value?o.push(f[s+i]):b||0===j(g(a),g(u.value))?(t.push(u.value),b&&r.push(f[s+i])):(o.push(f[s+i]),n.push(u.value)));}return Promise.resolve(0<n.length&&m.mutate({trans:p,type:"add",values:n}).then(function(e){for(var t in e.failures)o.splice(parseInt(t),1);y(n.length,e);})).then(function(){return (0<t.length||d&&"object"==typeof x)&&m.mutate({trans:p,type:"put",keys:r,values:t,criteria:d,changeSpec:"function"!=typeof x&&x,isAdditionalChunk:0<s}).then(function(e){return y(t.length,e)})}).then(function(){return (0<o.length||d&&_)&&m.mutate({trans:p,type:"delete",keys:o,criteria:d,isAdditionalChunk:0<s}).then(function(e){return _t(k.table,o,e)}).then(function(e){return y(o.length,e)})}).then(function(){return f.length>s+c&&h(s+w)})})}var d=St(k)&&k.limit===1/0&&("function"!=typeof x||_)&&{index:k.index,range:k.range};return h(0).then(function(){if(0<a.length)throw new fe("Error modifying one or more objects",a,u,t);return f.length})})})},o.prototype.delete=function(){var o=this._ctx,n=o.range;return !St(o)||o.table.schema.yProps||!o.isPrimKey&&3!==n.type?this.modify(Bt):this._write(function(e){var t=o.table.core.schema.primaryKey,r=n;return o.table.core.count({trans:e,query:{index:t,range:r}}).then(function(n){return o.table.core.mutate({trans:e,type:"deleteRange",range:r}).then(function(e){var t=e.failures,e=e.numFailures;if(e)throw new fe("Could not delete some values",Object.keys(t).map(function(e){return t[e]}),n-e);return n-e})})})};var Dt=o;function o(){}var Bt=function(e,t){return t.value=null};function Rt(e,t){return e<t?-1:e===t?0:1}function Ft(e,t){return t<e?-1:e===t?0:1}function A(e,t,n){e=e instanceof Ut?new e.Collection(e):e;return e._ctx.error=new(n||TypeError)(t),e}function Mt(e){return new e.Collection(e,function(){return Lt("")}).limit(0)}function Nt(e,s,n,r){var o,c,l,f,h,d,p,y=n.length;if(!n.every(function(e){return "string"==typeof e}))return A(e,lt);function t(e){o="next"===e?function(e){return e.toUpperCase()}:function(e){return e.toLowerCase()},c="next"===e?function(e){return e.toLowerCase()}:function(e){return e.toUpperCase()},l="next"===e?Rt:Ft;var t=n.map(function(e){return {lower:c(e),upper:o(e)}}).sort(function(e,t){return l(e.lower,t.lower)});f=t.map(function(e){return e.upper}),h=t.map(function(e){return e.lower}),p="next"===(d=e)?"":r;}t("next");var e=new e.Collection(e,function(){return C(f[0],h[y-1]+r)}),v=(e._ondirectionchange=function(e){t(e);},0);return e._addAlgorithm(function(e,t,n){var r=e.key;if("string"==typeof r){var o=c(r);if(s(o,h,v))return  true;for(var i=null,a=v;a<y;++a){var u=((e,t,n,r,o,i)=>{for(var a=Math.min(e.length,r.length),u=-1,s=0;s<a;++s){var c=t[s];if(c!==r[s])return o(e[s],n[s])<0?e.substr(0,s)+n[s]+n.substr(s+1):o(e[s],r[s])<0?e.substr(0,s)+r[s]+n.substr(s+1):0<=u?e.substr(0,u)+t[u]+n.substr(u+1):null;o(e[s],c)<0&&(u=s);}return a<r.length&&"next"===i?e+n.substr(e.length):a<e.length&&"prev"===i?e.substr(0,n.length):u<0?null:e.substr(0,u)+r[u]+n.substr(u+1)})(r,o,f[a],h[a],l,d);null===u&&null===i?v=a+1:(null===i||0<l(i,u))&&(i=u);}t(null!==i?function(){e.continue(i+p);}:n);}return  false}),e}function C(e,t,n,r){return {type:2,lower:e,upper:t,lowerOpen:n,upperOpen:r}}function Lt(e){return {type:1,lower:e,upper:e}}Object.defineProperty(d.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:false,configurable:true}),d.prototype.between=function(e,t,n,r){n=false!==n,r=true===r;try{return 0<this._cmp(e,t)||0===this._cmp(e,t)&&(n||r)&&(!n||!r)?Mt(this):new this.Collection(this,function(){return C(e,t,!n,!r)})}catch(e){return A(this,S)}},d.prototype.equals=function(e){return null==e?A(this,S):new this.Collection(this,function(){return Lt(e)})},d.prototype.above=function(e){return null==e?A(this,S):new this.Collection(this,function(){return C(e,void 0,true)})},d.prototype.aboveOrEqual=function(e){return null==e?A(this,S):new this.Collection(this,function(){return C(e,void 0,false)})},d.prototype.below=function(e){return null==e?A(this,S):new this.Collection(this,function(){return C(void 0,e,false,true)})},d.prototype.belowOrEqual=function(e){return null==e?A(this,S):new this.Collection(this,function(){return C(void 0,e)})},d.prototype.startsWith=function(e){return "string"!=typeof e?A(this,lt):this.between(e,e+ct,true,true)},d.prototype.startsWithIgnoreCase=function(e){return ""===e?this.startsWith(e):Nt(this,function(e,t){return 0===e.indexOf(t[0])},[e],ct)},d.prototype.equalsIgnoreCase=function(e){return Nt(this,function(e,t){return e===t[0]},[e],"")},d.prototype.anyOfIgnoreCase=function(){var e=n.apply(ae,arguments);return 0===e.length?Mt(this):Nt(this,function(e,t){return  -1!==t.indexOf(e)},e,"")},d.prototype.startsWithAnyOfIgnoreCase=function(){var e=n.apply(ae,arguments);return 0===e.length?Mt(this):Nt(this,function(t,e){return e.some(function(e){return 0===t.indexOf(e)})},e,ct)},d.prototype.anyOf=function(){var e,o,t=this,i=n.apply(ae,arguments),a=this._cmp;try{i.sort(a);}catch(e){return A(this,S)}return 0===i.length?Mt(this):((e=new this.Collection(this,function(){return C(i[0],i[i.length-1])}))._ondirectionchange=function(e){a="next"===e?t._ascending:t._descending,i.sort(a);},o=0,e._addAlgorithm(function(e,t,n){for(var r=e.key;0<a(r,i[o]);)if(++o===i.length)return t(n),false;return 0===a(r,i[o])||(t(function(){e.continue(i[o]);}),false)}),e)},d.prototype.notEqual=function(e){return this.inAnyRange([[-1/0,e],[e,this.db._maxKey]],{includeLowers:false,includeUppers:false})},d.prototype.noneOf=function(){var e=n.apply(ae,arguments);if(0===e.length)return new this.Collection(this);try{e.sort(this._ascending);}catch(e){return A(this,S)}var t=e.reduce(function(e,t){return e?e.concat([[e[e.length-1][1],t]]):[[-1/0,t]]},null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:false,includeUppers:false})},d.prototype.inAnyRange=function(e,t){var i=this,a=this._cmp,u=this._ascending,n=this._descending,s=this._min,c=this._max;if(0===e.length)return Mt(this);if(!e.every(function(e){return void 0!==e[0]&&void 0!==e[1]&&u(e[0],e[1])<=0}))return A(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",k.InvalidArgument);var r=!t||false!==t.includeLowers,o=t&&true===t.includeUppers;var l,f=u;function h(e,t){return f(e[0],t[0])}try{(l=e.reduce(function(e,t){for(var n=0,r=e.length;n<r;++n){var o=e[n];if(a(t[0],o[1])<0&&0<a(t[1],o[0])){o[0]=s(o[0],t[0]),o[1]=c(o[1],t[1]);break}}return n===r&&e.push(t),e},[])).sort(h);}catch(e){return A(this,S)}var d=0,p=o?function(e){return 0<u(e,l[d][1])}:function(e){return 0<=u(e,l[d][1])},y=r?function(e){return 0<n(e,l[d][0])}:function(e){return 0<=n(e,l[d][0])};var v=p,t=new this.Collection(this,function(){return C(l[0][0],l[l.length-1][1],!r,!o)});return t._ondirectionchange=function(e){f="next"===e?(v=p,u):(v=y,n),l.sort(h);},t._addAlgorithm(function(e,t,n){for(var r,o=e.key;v(o);)if(++d===l.length)return t(n),false;return !p(r=o)&&!y(r)||(0===i._cmp(o,l[d][1])||0===i._cmp(o,l[d][0])||t(function(){f===u?e.continue(l[d][0]):e.continue(l[d][1]);}),false)}),t},d.prototype.startsWithAnyOf=function(){var e=n.apply(ae,arguments);return e.every(function(e){return "string"==typeof e})?0===e.length?Mt(this):this.inAnyRange(e.map(function(e){return [e,e+ct]})):A(this,"startsWithAnyOf() only works with strings")};var Ut=d;function d(){}function T(t){return E(function(e){return Vt(e),t(e.target.error),false})}function Vt(e){e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault();}var zt="storagemutated",Wt="x-storagemutated-1",Yt=Kt(null,zt),$t=(p.prototype._lock=function(){return $(!P.global),++this._reculock,1!==this._reculock||P.global||(P.lockOwnerFor=this),this},p.prototype._unlock=function(){if($(!P.global),0==--this._reculock)for(P.global||(P.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var e=this._blockedFuncs.shift();try{at(e[1],e[0]);}catch(e){}}return this},p.prototype._locked=function(){return this._reculock&&P.lockOwnerFor!==this},p.prototype.create=function(t){var n=this;if(this.mode){var e=this.db.idbdb,r=this.db._state.dbOpenError;if($(!this.idbtrans),!t&&!e)switch(r&&r.name){case "DatabaseClosedError":throw new k.DatabaseClosed(r);case "MissingAPIError":throw new k.MissingAPI(r.message,r);default:throw new k.OpenFailed(r)}if(!this.active)throw new k.TransactionInactive;$(null===this._completion._state),(t=this.idbtrans=t||(this.db.core||e).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=E(function(e){Vt(e),n._reject(t.error);}),t.onabort=E(function(e){Vt(e),n.active&&n._reject(new k.Abort(t.error)),n.active=false,n.on("abort").fire(e);}),t.oncomplete=E(function(){n.active=false,n._resolve(),"mutatedParts"in t&&Yt.storagemutated.fire(t.mutatedParts);});}return this},p.prototype._promise=function(n,r,o){var e,i=this;return "readwrite"===n&&"readwrite"!==this.mode?w(new k.ReadOnly("Transaction is readonly")):this.active?this._locked()?new K(function(e,t){i._blockedFuncs.push([function(){i._promise(n,r,o).then(e,t);},P]);}):o?y(function(){var e=new K(function(e,t){i._lock();var n=r(e,t,i);n&&n.then&&n.then(e,t);});return e.finally(function(){return i._unlock()}),e._lib=true,e}):((e=new K(function(e,t){var n=r(e,t,i);n&&n.then&&n.then(e,t);}))._lib=true,e):w(new k.TransactionInactive)},p.prototype._root=function(){return this.parent?this.parent._root():this},p.prototype.waitFor=function(e){var t,r=this._root(),o=K.resolve(e),i=(r._waitingFor?r._waitingFor=r._waitingFor.then(function(){return o}):(r._waitingFor=o,r._waitingQueue=[],t=r.idbtrans.objectStore(r.storeNames[0]),function e(){for(++r._spinCount;r._waitingQueue.length;)r._waitingQueue.shift()();r._waitingFor&&(t.get(-1/0).onsuccess=e);}()),r._waitingFor);return new K(function(t,n){o.then(function(e){return r._waitingQueue.push(E(t.bind(null,e)))},function(e){return r._waitingQueue.push(E(n.bind(null,e)))}).finally(function(){r._waitingFor===i&&(r._waitingFor=null);});})},p.prototype.abort=function(){this.active&&(this.active=false,this.idbtrans&&this.idbtrans.abort(),this._reject(new k.Abort));},p.prototype.table=function(e){var t=this._memoizedTables||(this._memoizedTables={});if(m(t,e))return t[e];var n=this.schema[e];if(n)return (n=new this.db.Table(e,n,this)).core=this.db.core.table(e),t[e]=n;throw new k.NotFound("Table "+e+" not part of transaction")},p);function p(){}function Qt(e,t,n,r,o,i,a,u){return {name:e,keyPath:t,unique:n,multi:r,auto:o,compound:i,src:(n&&!a?"&":"")+(r?"*":"")+(o?"++":"")+Gt(t),type:u}}function Gt(e){return "string"==typeof e?e:e?"["+[].join.call(e,"+")+"]":""}function Xt(e,t,n){return {name:e,primKey:t,indexes:n,mappedClass:null,idxByName:(r=function(e){return [e.name,e]},n.reduce(function(e,t,n){t=r(t,n);return t&&(e[t[0]]=t[1]),e},{}))};var r;}var Ht=function(e){try{return e.only([[]]),Ht=function(){return [[]]},[[]]}catch(e){return Ht=function(){return ct},ct}};function Jt(t){return null==t?function(){}:"string"==typeof t?1===(n=t).split(".").length?function(e){return e[n]}:function(e){return c(e,n)}:function(e){return c(e,t)};var n;}function Zt(e){return [].slice.call(e)}var en=0;function tn(e){return null==e?":id":"string"==typeof e?e:"[".concat(e.join("+"),"]")}function nn(e,o,t){function _(e){if(3===e.type)return null;if(4===e.type)throw new Error("Cannot convert never type to IDBKeyRange");var t=e.lower,n=e.upper,r=e.lowerOpen,e=e.upperOpen;return void 0===t?void 0===n?null:o.upperBound(n,!!e):void 0===n?o.lowerBound(t,!!r):o.bound(t,n,!!r,!!e)}function n(e){var h,w=e.name;return {name:w,schema:e,mutate:function(e){var y=e.trans,v=e.type,m=e.keys,b=e.values,g=e.range;return new Promise(function(t,e){t=E(t);var n=y.objectStore(w),r=null==n.keyPath,o="put"===v||"add"===v;if(!o&&"delete"!==v&&"deleteRange"!==v)throw new Error("Invalid operation type: "+v);var i,a=(m||b||{length:1}).length;if(m&&b&&m.length!==b.length)throw new Error("Given keys array must have same length as given values array.");if(0===a)return t({numFailures:0,failures:{},results:[],lastResult:void 0});function u(e){++l,Vt(e);}var s=[],c=[],l=0;if("deleteRange"===v){if(4===g.type)return t({numFailures:l,failures:c,results:[],lastResult:void 0});3===g.type?s.push(i=n.clear()):s.push(i=n.delete(_(g)));}else {var r=o?r?[b,m]:[b,null]:[m,null],f=r[0],h=r[1];if(o)for(var d=0;d<a;++d)s.push(i=h&&void 0!==h[d]?n[v](f[d],h[d]):n[v](f[d])),i.onerror=u;else for(d=0;d<a;++d)s.push(i=n[v](f[d])),i.onerror=u;}function p(e){e=e.target.result,s.forEach(function(e,t){return null!=e.error&&(c[t]=e.error)}),t({numFailures:l,failures:c,results:"delete"===v?m:s.map(function(e){return e.result}),lastResult:e});}i.onerror=function(e){u(e),p(e);},i.onsuccess=p;})},getMany:function(e){var f=e.trans,h=e.keys;return new Promise(function(t,e){t=E(t);for(var n,r=f.objectStore(w),o=h.length,i=new Array(o),a=0,u=0,s=function(e){e=e.target;i[e._pos]=e.result,++u===a&&t(i);},c=T(e),l=0;l<o;++l)null!=h[l]&&((n=r.get(h[l]))._pos=l,n.onsuccess=s,n.onerror=c,++a);0===a&&t(i);})},get:function(e){var r=e.trans,o=e.key;return new Promise(function(t,e){t=E(t);var n=r.objectStore(w).get(o);n.onsuccess=function(e){return t(e.target.result)},n.onerror=T(e);})},query:(h=a,function(f){return new Promise(function(n,e){n=E(n);var r,o,i,t=f.trans,a=f.values,u=f.limit,s=f.query,c=u===1/0?void 0:u,l=s.index,s=s.range,t=t.objectStore(w),t=l.isPrimaryKey?t:t.index(l.name),l=_(s);if(0===u)return n({result:[]});h?((s=a?t.getAll(l,c):t.getAllKeys(l,c)).onsuccess=function(e){return n({result:e.target.result})},s.onerror=T(e)):(r=0,o=!a&&"openKeyCursor"in t?t.openKeyCursor(l):t.openCursor(l),i=[],o.onsuccess=function(e){var t=o.result;return !t||(i.push(a?t.value:t.primaryKey),++r===u)?n({result:i}):void t.continue()},o.onerror=T(e));})}),openCursor:function(e){var c=e.trans,i=e.values,a=e.query,u=e.reverse,l=e.unique;return new Promise(function(t,n){t=E(t);var e=a.index,r=a.range,o=c.objectStore(w),o=e.isPrimaryKey?o:o.index(e.name),e=u?l?"prevunique":"prev":l?"nextunique":"next",s=!i&&"openKeyCursor"in o?o.openKeyCursor(_(r),e):o.openCursor(_(r),e);s.onerror=T(n),s.onsuccess=E(function(e){var r,o,i,a,u=s.result;u?(u.___id=++en,u.done=false,r=u.continue.bind(u),o=(o=u.continuePrimaryKey)&&o.bind(u),i=u.advance.bind(u),a=function(){throw new Error("Cursor not stopped")},u.trans=c,u.stop=u.continue=u.continuePrimaryKey=u.advance=function(){throw new Error("Cursor not started")},u.fail=E(n),u.next=function(){var e=this,t=1;return this.start(function(){return t--?e.continue():e.stop()}).then(function(){return e})},u.start=function(e){function t(){if(s.result)try{e();}catch(e){u.fail(e);}else u.done=true,u.start=function(){throw new Error("Cursor behind last entry")},u.stop();}var n=new Promise(function(t,e){t=E(t),s.onerror=T(e),u.fail=e,u.stop=function(e){u.stop=u.continue=u.continuePrimaryKey=u.advance=a,t(e);};});return s.onsuccess=E(function(e){s.onsuccess=t,t();}),u.continue=r,u.continuePrimaryKey=o,u.advance=i,t(),n},t(u)):t(null);},n);})},count:function(e){var t=e.query,o=e.trans,i=t.index,a=t.range;return new Promise(function(t,e){var n=o.objectStore(w),n=i.isPrimaryKey?n:n.index(i.name),r=_(a),r=r?n.count(r):n.count();r.onsuccess=E(function(e){return t(e.target.result)}),r.onerror=T(e);})}}}r=t,i=Zt((t=e).objectStoreNames);var r,t={schema:{name:t.name,tables:i.map(function(e){return r.objectStore(e)}).map(function(t){var e=t.keyPath,n=t.autoIncrement,r=x(e),o={},r={name:t.name,primaryKey:{name:null,isPrimaryKey:true,outbound:null==e,compound:r,keyPath:e,autoIncrement:n,unique:true,extractKey:Jt(e)},indexes:Zt(t.indexNames).map(function(e){return t.index(e)}).map(function(e){var t=e.name,n=e.unique,r=e.multiEntry,e=e.keyPath,t={name:t,compound:x(e),keyPath:e,unique:n,multiEntry:r,extractKey:Jt(e)};return o[tn(e)]=t}),getIndexByKeyPath:function(e){return o[tn(e)]}};return o[":id"]=r.primaryKey,null!=e&&(o[tn(e)]=r.primaryKey),r})},hasGetAll:0<i.length&&"getAll"in r.objectStore(i[0])&&!("undefined"!=typeof navigator&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604)},i=t.schema,a=t.hasGetAll,t=i.tables.map(n),u={};return t.forEach(function(e){return u[e.name]=e}),{stack:"dbcore",transaction:e.transaction.bind(e),table:function(e){if(u[e])return u[e];throw new Error("Table '".concat(e,"' not found"))},MIN_KEY:-1/0,MAX_KEY:Ht(o),schema:i}}function rn(e,t,n,r){n=n.IDBKeyRange;return t=nn(t,n,r),{dbcore:e.dbcore.reduce(function(e,t){t=t.create;return _(_({},e),t(e))},t)}}function on(n,e){var t=e.db,t=rn(n._middlewares,t,n._deps,e);n.core=t.dbcore,n.tables.forEach(function(e){var t=e.name;n.core.schema.tables.some(function(e){return e.name===t})&&(e.core=n.core.table(t),n[t]instanceof n.Table)&&(n[t].core=e.core);});}function an(o,e,t,i){t.forEach(function(n){var r=i[n];e.forEach(function(e){var t=function e(t,n){return V(t,n)||(t=F(t))&&e(t,n)}(e,n);(!t||"value"in t&&void 0===t.value)&&(e===o.Transaction.prototype||e instanceof o.Transaction?u(e,n,{get:function(){return this.table(n)},set:function(e){L(this,n,{value:e,writable:true,configurable:true,enumerable:true});}}):e[n]=new o.Table(n,r));});});}function un(n,e){e.forEach(function(e){for(var t in e)e[t]instanceof n.Table&&delete e[t];});}function sn(e,t){return e._cfg.version-t._cfg.version}function cn(n,r,o,e){var i=n._dbSchema,a=(o.objectStoreNames.contains("$meta")&&!i.$meta&&(i.$meta=Xt("$meta",mn("")[0],[]),n._storeNames.push("$meta")),n._createTransaction("readwrite",n._storeNames,i)),u=(a.create(o),a._completion.catch(e),a._reject.bind(a)),s=P.transless||P;y(function(){if(P.trans=a,P.transless=s,0!==r)return on(n,o),t=r,((e=a).storeNames.includes("$meta")?e.table("$meta").get("version").then(function(e){return null!=e?e:t}):K.resolve(t)).then(function(e){var s=n,c=e,l=a,f=o,t=[],e=s._versions,h=s._dbSchema=yn(0,s.idbdb,f);return 0===(e=e.filter(function(e){return e._cfg.version>=c})).length?K.resolve():(e.forEach(function(u){t.push(function(){var t,n,r,o=h,e=u._cfg.dbschema,i=(vn(s,o,f),vn(s,e,f),h=s._dbSchema=e,fn(o,e)),a=(i.add.forEach(function(e){hn(f,e[0],e[1].primKey,e[1].indexes);}),i.change.forEach(function(e){if(e.recreate)throw new k.Upgrade("Not yet support for changing primary key");var t=f.objectStore(e.name);e.add.forEach(function(e){return pn(t,e)}),e.change.forEach(function(e){t.deleteIndex(e.name),pn(t,e);}),e.del.forEach(function(e){return t.deleteIndex(e)});}),u._cfg.contentUpgrade);if(a&&u._cfg.version>c)return on(s,f),l._memoizedTables={},t=G(e),i.del.forEach(function(e){t[e]=o[e];}),un(s,[s.Transaction.prototype]),an(s,[s.Transaction.prototype],O(t),t),l.schema=t,(n=ue(a))&&nt(),e=K.follow(function(){var e;(r=a(l))&&n&&(e=v.bind(null,null),r.then(e,e));}),r&&"function"==typeof r.then?K.resolve(r):e.then(function(){return r})}),t.push(function(e){var t,n,r=u._cfg.dbschema;t=r,n=e,[].slice.call(n.db.objectStoreNames).forEach(function(e){return null==t[e]&&n.db.deleteObjectStore(e)}),un(s,[s.Transaction.prototype]),an(s,[s.Transaction.prototype],s._storeNames,s._dbSchema),l.schema=s._dbSchema;}),t.push(function(e){s.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(s.idbdb.version/10)===u._cfg.version?(s.idbdb.deleteObjectStore("$meta"),delete s._dbSchema.$meta,s._storeNames=s._storeNames.filter(function(e){return "$meta"!==e})):e.objectStore("$meta").put(u._cfg.version,"version"));});}),function e(){return t.length?K.resolve(t.shift()(l.idbtrans)).then(e):K.resolve()}().then(function(){dn(h,f);}))}).catch(u);var e,t;O(i).forEach(function(e){hn(o,e,i[e].primKey,i[e].indexes);}),on(n,o),K.follow(function(){return n.on.populate.fire(a)}).catch(u);});}function ln(e,r){dn(e._dbSchema,r),r.db.version%10!=0||r.objectStoreNames.contains("$meta")||r.db.createObjectStore("$meta").add(Math.ceil(r.db.version/10-1),"version");var t=yn(0,e.idbdb,r);vn(e,e._dbSchema,r);for(var n=0,o=fn(t,e._dbSchema).change;n<o.length;n++){var i=(t=>{if(t.change.length||t.recreate)return console.warn("Unable to patch indexes of table ".concat(t.name," because it has changes on the type of index or primary key.")),{value:void 0};var n=r.objectStore(t.name);t.add.forEach(function(e){l&&console.debug("Dexie upgrade patch: Creating missing index ".concat(t.name,".").concat(e.src)),pn(n,e);});})(o[n]);if("object"==typeof i)return i.value}}function fn(e,t){var n,r={del:[],add:[],change:[]};for(n in e)t[n]||r.del.push(n);for(n in t){var o=e[n],i=t[n];if(o){var a={name:n,def:i,recreate:false,del:[],add:[],change:[]};if(""+(o.primKey.keyPath||"")!=""+(i.primKey.keyPath||"")||o.primKey.auto!==i.primKey.auto)a.recreate=true,r.change.push(a);else {var u=o.idxByName,s=i.idxByName,c=void 0;for(c in u)s[c]||a.del.push(c);for(c in s){var l=u[c],f=s[c];l?l.src!==f.src&&a.change.push(f):a.add.push(f);}(0<a.del.length||0<a.add.length||0<a.change.length)&&r.change.push(a);}}else r.add.push([n,i]);}return r}function hn(e,t,n,r){var o=e.db.createObjectStore(t,n.keyPath?{keyPath:n.keyPath,autoIncrement:n.auto}:{autoIncrement:n.auto});r.forEach(function(e){return pn(o,e)});}function dn(t,n){O(t).forEach(function(e){n.db.objectStoreNames.contains(e)||(l&&console.debug("Dexie: Creating missing table",e),hn(n,e,t[e].primKey,t[e].indexes));});}function pn(e,t){e.createIndex(t.name,t.keyPath,{unique:t.unique,multiEntry:t.multi});}function yn(e,t,u){var s={};return W(t.objectStoreNames,0).forEach(function(e){for(var t=u.objectStore(e),n=Qt(Gt(a=t.keyPath),a||"",true,false,!!t.autoIncrement,a&&"string"!=typeof a,true),r=[],o=0;o<t.indexNames.length;++o){var i=t.index(t.indexNames[o]),a=i.keyPath,i=Qt(i.name,a,!!i.unique,!!i.multiEntry,false,a&&"string"!=typeof a,false);r.push(i);}s[e]=Xt(e,n,r);}),s}function vn(e,t,n){for(var r=n.db.objectStoreNames,o=0;o<r.length;++o){var i=r[o],a=n.objectStore(i);e._hasGetAll="getAll"in a;for(var u=0;u<a.indexNames.length;++u){var s,c=a.indexNames[u],l=a.index(c).keyPath,l="string"==typeof l?l:"["+W(l).join("+")+"]";t[i]&&(s=t[i].idxByName[l])&&(s.name=c,delete t[i].idxByName[l],t[i].idxByName[c]=s);}}"undefined"!=typeof navigator&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&f.WorkerGlobalScope&&f instanceof f.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(e._hasGetAll=false);}function mn(e){return e.split(",").map(function(e,t){var n=e.split(":"),r=null==(r=n[1])?void 0:r.trim(),n=(e=n[0].trim()).replace(/([&*]|\+\+)/g,""),o=/^\[/.test(n)?n.match(/^\[(.*)\]$/)[1].split("+"):n;return Qt(n,o||null,/\&/.test(e),/\*/.test(e),/\+\+/.test(e),x(o),0===t,r)})}gn.prototype._createTableSchema=Xt,gn.prototype._parseIndexSyntax=mn,gn.prototype._parseStoresSpec=function(r,o){var i=this;O(r).forEach(function(e){if(null!==r[e]){var t=i._parseIndexSyntax(r[e]),n=t.shift();if(!n)throw new k.Schema("Invalid schema for table "+e+": "+r[e]);if(n.unique=true,n.multi)throw new k.Schema("Primary key cannot be multiEntry*");t.forEach(function(e){if(e.auto)throw new k.Schema("Only primary key can be marked as autoIncrement (++)");if(!e.keyPath)throw new k.Schema("Index must have a name and cannot be an empty string")});n=i._createTableSchema(e,n,t);o[e]=n;}});},gn.prototype.stores=function(e){var t=this.db,e=(this._cfg.storesSource=this._cfg.storesSource?a(this._cfg.storesSource,e):e,t._versions),n={},r={};return e.forEach(function(e){a(n,e._cfg.storesSource),r=e._cfg.dbschema={},e._parseStoresSpec(n,r);}),t._dbSchema=r,un(t,[t._allTables,t,t.Transaction.prototype]),an(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],O(r),r),t._storeNames=O(r),this},gn.prototype.upgrade=function(e){return this._cfg.contentUpgrade=ke(this._cfg.contentUpgrade||g,e),this};var bn=gn;function gn(){}function wn(e,t){var n=e._dbNamesDB;return n||(n=e._dbNamesDB=new q(ht,{addons:[],indexedDB:e,IDBKeyRange:t})).version(1).stores({dbnames:"name"}),n.table("dbnames")}function _n(e){return e&&"function"==typeof e.databases}function xn(e){return y(function(){return P.letThrough=true,e()})}function kn(e){return !("from"in e)}var I=function(e,t){var n;if(!this)return n=new I,e&&"d"in e&&a(n,e),n;a(this,arguments.length?{d:1,from:e,to:1<arguments.length?t:e}:{d:0});};function On(e,t,n){var r=j(t,n);if(!isNaN(r)){if(0<r)throw RangeError();if(kn(e))return a(e,{from:t,to:n,d:1});var r=e.l,o=e.r;if(j(n,e.from)<0)return r?On(r,t,n):e.l={from:t,to:n,d:1,l:null,r:null},Sn(e);if(0<j(t,e.to))return o?On(o,t,n):e.r={from:t,to:n,d:1,l:null,r:null},Sn(e);j(t,e.from)<0&&(e.from=t,e.l=null,e.d=o?o.d+1:1),0<j(n,e.to)&&(e.to=n,e.r=null,e.d=e.l?e.l.d+1:1);t=!e.r;r&&!e.l&&Pn(e,r),o&&t&&Pn(e,o);}}function Pn(e,t){kn(t)||function e(t,n){var r=n.from,o=n.l,i=n.r;On(t,r,n.to),o&&e(t,o),i&&e(t,i);}(e,t);}function Kn(e,t){var n=En(t),r=n.next();if(!r.done)for(var o=r.value,i=En(e),a=i.next(o.from),u=a.value;!r.done&&!a.done;){if(j(u.from,o.to)<=0&&0<=j(u.to,o.from))return  true;j(o.from,u.from)<0?o=(r=n.next(u.from)).value:u=(a=i.next(o.from)).value;}return  false}function En(e){var n=kn(e)?null:{s:0,n:e};return {next:function(e){for(var t=0<arguments.length;n;)switch(n.s){case 0:if(n.s=1,t)for(;n.n.l&&j(e,n.n.from)<0;)n={up:n,n:n.n.l,s:1};else for(;n.n.l;)n={up:n,n:n.n.l,s:1};case 1:if(n.s=2,!t||j(e,n.n.to)<=0)return {value:n.n,done:false};case 2:if(n.n.r){n.s=3,n={up:n,n:n.n.r,s:0};continue}case 3:n=n.up;}return {done:true}}}}function Sn(e){var t,n,r,o=((null==(o=e.r)?void 0:o.d)||0)-((null==(o=e.l)?void 0:o.d)||0),o=1<o?"r":o<-1?"l":"";o&&(t="r"==o?"l":"r",n=_({},e),r=e[o],e.from=r.from,e.to=r.to,e[o]=r[o],n[o]=r[t],(e[t]=n).d=jn(n)),e.d=jn(e);}function jn(e){var t=e.r,e=e.l;return (t?e?Math.max(t.d,e.d):t.d:e?e.d:0)+1}function An(t,n){return O(n).forEach(function(e){t[e]?Pn(t[e],n[e]):t[e]=function e(t){var n,r,o={};for(n in t)m(t,n)&&(r=t[n],o[n]=!r||"object"!=typeof r||J.has(r.constructor)?r:e(r));return o}(n[e]);}),t}function Cn(t,n){return t.all||n.all||Object.keys(t).some(function(e){return n[e]&&Kn(n[e],t[e])})}N(I.prototype,((t={add:function(e){return Pn(this,e),this},addKey:function(e){return On(this,e,e),this},addKeys:function(e){var t=this;return e.forEach(function(e){return On(t,e,e)}),this},hasKey:function(e){var t=En(this).next(e).value;return t&&j(t.from,e)<=0&&0<=j(t.to,e)}})[re]=function(){return En(this)},t));var Tn={},In={},qn=false;function Dn(e){An(In,e),qn||(qn=true,setTimeout(function(){qn=false,Bn(In,!(In={}));},0));}function Bn(e,t){ void 0===t&&(t=false);var n=new Set;if(e.all)for(var r=0,o=Object.values(Tn);r<o.length;r++)Rn(u=o[r],e,n,t);else for(var i in e){var a,u,i=/^idb\:\/\/(.*)\/(.*)\//.exec(i);i&&(a=i[1],i=i[2],u=Tn["idb://".concat(a,"/").concat(i)])&&Rn(u,e,n,t);}n.forEach(function(e){return e()});}function Rn(e,t,n,r){for(var o=[],i=0,a=Object.entries(e.queries.query);i<a.length;i++){for(var u=a[i],s=u[0],c=[],l=0,f=u[1];l<f.length;l++){var h=f[l];Cn(t,h.obsSet)?h.subscribers.forEach(function(e){return n.add(e)}):r&&c.push(h);}r&&o.push([s,c]);}if(r)for(var d=0,p=o;d<p.length;d++){var y=p[d],s=y[0],c=y[1];e.queries.query[s]=c;}}function Fn(h){var d=h._state,r=h._deps.indexedDB;if(d.isBeingOpened||h.idbdb)return d.dbReadyPromise.then(function(){return d.dbOpenError?w(d.dbOpenError):h});d.isBeingOpened=true,d.dbOpenError=null,d.openComplete=false;var t=d.openCanceller,p=Math.round(10*h.verno),y=false;function e(){if(d.openCanceller!==t)throw new k.DatabaseClosed("db.open() was cancelled")}function v(){return new K(function(c,n){if(e(),!r)throw new k.MissingAPI;var l=h.name,f=d.autoSchema||!p?r.open(l):r.open(l,p);if(!f)throw new k.MissingAPI;f.onerror=T(n),f.onblocked=E(h._fireOnBlocked),f.onupgradeneeded=E(function(e){var t;m=f.transaction,d.autoSchema&&!h._options.allowEmptyDB?(f.onerror=Vt,m.abort(),f.result.close(),(t=r.deleteDatabase(l)).onsuccess=t.onerror=E(function(){n(new k.NoSuchDatabase("Database ".concat(l," doesnt exist")));})):(m.onerror=T(n),t=e.oldVersion>Math.pow(2,62)?0:e.oldVersion,b=t<1,h.idbdb=f.result,y&&ln(h,m),cn(h,t/10,m,n));},n),f.onsuccess=E(function(){m=null;var e,t,n,r,o,i,a=h.idbdb=f.result,u=W(a.objectStoreNames);if(0<u.length)try{var s=a.transaction(1===(o=u).length?o[0]:o,"readonly");if(d.autoSchema)i=a,r=s,(n=h).verno=i.version/10,r=n._dbSchema=yn(0,i,r),n._storeNames=W(i.objectStoreNames,0),an(n,[n._allTables],O(r),r);else if(vn(h,h._dbSchema,s),t=s,((t=fn(yn(0,(e=h).idbdb,t),e._dbSchema)).add.length||t.change.some(function(e){return e.add.length||e.change.length}))&&!y)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),a.close(),p=a.version+1,y=!0,c(v());on(h,s);}catch(e){}ft.push(h),a.onversionchange=E(function(e){d.vcFired=true,h.on("versionchange").fire(e);}),a.onclose=E(function(){h.close({disableAutoOpen:false});}),b&&(u=h._deps,o=l,_n(i=u.indexedDB)||o===ht||wn(i,u.IDBKeyRange).put({name:o}).catch(g)),c();},n);}).catch(function(e){switch(null==e?void 0:e.name){case "UnknownError":if(0<d.PR1398_maxLoop)return d.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),v();break;case "VersionError":if(0<p)return p=0,v()}return K.reject(e)})}var n,o=d.dbReadyResolve,m=null,b=false;return K.race([t,("undefined"==typeof navigator?K.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(e){function t(){return indexedDB.databases().finally(e)}n=setInterval(t,100),t();}).finally(function(){return clearInterval(n)}):Promise.resolve()).then(v)]).then(function(){return e(),d.onReadyBeingFired=[],K.resolve(xn(function(){return h.on.ready.fire(h.vip)})).then(function e(){var t;if(0<d.onReadyBeingFired.length)return t=d.onReadyBeingFired.reduce(ke,g),d.onReadyBeingFired=[],K.resolve(xn(function(){return t(h.vip)})).then(e)})}).finally(function(){d.openCanceller===t&&(d.onReadyBeingFired=null,d.isBeingOpened=false);}).catch(function(e){d.dbOpenError=e;try{m&&m.abort();}catch(e){}return t===d.openCanceller&&h._close(),w(e)}).finally(function(){d.openComplete=true,o();}).then(function(){var n;return b&&(n={},h.tables.forEach(function(t){t.schema.indexes.forEach(function(e){e.name&&(n["idb://".concat(h.name,"/").concat(t.name,"/").concat(e.name)]=new I(-1/0,[[[]]]));}),n["idb://".concat(h.name,"/").concat(t.name,"/")]=n["idb://".concat(h.name,"/").concat(t.name,"/:dels")]=new I(-1/0,[[[]]]);}),Yt(zt).fire(n),Bn(n,true)),h})}function Mn(t){function e(e){return t.next(e)}var r=n(e),o=n(function(e){return t.throw(e)});function n(n){return function(e){var e=n(e),t=e.value;return e.done?t:t&&"function"==typeof t.then?t.then(r,o):x(t)?Promise.all(t).then(r,o):r(t)}}return n(e)()}function Nn(e,t,n){for(var r=x(e)?e.slice():[e],o=0;o<n;++o)r.push(t);return r}var Ln={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(l){return _(_({},l),{table:function(e){var i=l.table(e),e=i.schema,u={},s=[];function c(e,t,n){var r=tn(e),o=u[r]=u[r]||[],i=null==e?0:"string"==typeof e?1:e.length,a=0<t,r=_(_({},n),{name:a?"".concat(r,"(virtual-from:").concat(n.name,")"):n.name,lowLevelIndex:n,isVirtual:a,keyTail:t,keyLength:i,extractKey:Jt(e),unique:!a&&n.unique});return o.push(r),r.isPrimaryKey||s.push(r),1<i&&c(2===i?e[0]:e.slice(0,i-1),t+1,n),o.sort(function(e,t){return e.keyTail-t.keyTail}),r}var t=c(e.primaryKey.keyPath,0,e.primaryKey);u[":id"]=[t];for(var n=0,r=e.indexes;n<r.length;n++){var o=r[n];c(o.keyPath,0,o);}function a(e){var t,n=e.query.index;return n.isVirtual?_(_({},e),{query:{index:n.lowLevelIndex,range:(t=e.query.range,n=n.keyTail,{type:1===t.type?2:t.type,lower:Nn(t.lower,t.lowerOpen?l.MAX_KEY:l.MIN_KEY,n),lowerOpen:true,upper:Nn(t.upper,t.upperOpen?l.MIN_KEY:l.MAX_KEY,n),upperOpen:true})}}):e}return _(_({},i),{schema:_(_({},e),{primaryKey:t,indexes:s,getIndexByKeyPath:function(e){return (e=u[tn(e)])&&e[0]}}),count:function(e){return i.count(a(e))},query:function(e){return i.query(a(e))},openCursor:function(t){var e=t.query.index,r=e.keyTail,o=e.keyLength;return e.isVirtual?i.openCursor(a(t)).then(function(e){return e&&n(e)}):i.openCursor(t);function n(n){return Object.create(n,{continue:{value:function(e){null!=e?n.continue(Nn(e,t.reverse?l.MAX_KEY:l.MIN_KEY,r)):t.unique?n.continue(n.key.slice(0,o).concat(t.reverse?l.MIN_KEY:l.MAX_KEY,r)):n.continue();}},continuePrimaryKey:{value:function(e,t){n.continuePrimaryKey(Nn(e,l.MAX_KEY,r),t);}},primaryKey:{get:function(){return n.primaryKey}},key:{get:function(){var e=n.key;return 1===o?e[0]:e.slice(0,o)}},value:{get:function(){return n.value}}})}}})}})}};function Un(o,i,a,u){return a=a||{},u=u||"",O(o).forEach(function(e){var t,n,r;m(i,e)?(t=o[e],n=i[e],"object"==typeof t&&"object"==typeof n&&t&&n?(r=ne(t))!==ne(n)?a[u+e]=i[e]:"Object"===r?Un(t,n,a,u+e+"."):t!==n&&(a[u+e]=i[e]):t!==n&&(a[u+e]=i[e])):a[u+e]=void 0;}),O(i).forEach(function(e){m(o,e)||(a[u+e]=i[e]);}),a}function Vn(e,t){return "delete"===t.type?t.keys:t.keys||t.values.map(e.extractKey)}var zn={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(e){return _(_({},e),{table:function(r){var y=e.table(r),v=y.schema.primaryKey;return _(_({},y),{mutate:function(e){var t=P.trans,n=t.table(r).hook,h=n.deleting,d=n.creating,p=n.updating;switch(e.type){case "add":if(d.fire===g)break;return t._promise("readwrite",function(){return a(e)},true);case "put":if(d.fire===g&&p.fire===g)break;return t._promise("readwrite",function(){return a(e)},true);case "delete":if(h.fire===g)break;return t._promise("readwrite",function(){return a(e)},true);case "deleteRange":if(h.fire===g)break;return t._promise("readwrite",function(){return function n(r,o,i){return y.query({trans:r,values:false,query:{index:v,range:o},limit:i}).then(function(e){var t=e.result;return a({type:"delete",keys:t,trans:r}).then(function(e){return 0<e.numFailures?Promise.reject(e.failures[0]):t.length<i?{failures:[],numFailures:0,lastResult:void 0}:n(r,_(_({},o),{lower:t[t.length-1],lowerOpen:true}),i)})})}(e.trans,e.range,1e4)},true)}return y.mutate(e);function a(c){var e,t,n,l=P.trans,f=c.keys||Vn(v,c);if(f)return "delete"!==(c="add"===c.type||"put"===c.type?_(_({},c),{keys:f}):_({},c)).type&&(c.values=R([],c.values)),c.keys&&(c.keys=R([],c.keys)),e=y,n=f,("add"===(t=c).type?Promise.resolve([]):e.getMany({trans:t.trans,keys:n,cache:"immutable"})).then(function(u){var s=f.map(function(e,t){var n,r,o,i=u[t],a={onerror:null,onsuccess:null};return "delete"===c.type?h.fire.call(a,e,i,l):"add"===c.type||void 0===i?(n=d.fire.call(a,e,c.values[t],l),null==e&&null!=n&&(c.keys[t]=e=n,v.outbound||b(c.values[t],v.keyPath,e))):(n=Un(i,c.values[t]),(r=p.fire.call(a,n,e,i,l))&&(o=c.values[t],Object.keys(r).forEach(function(e){m(o,e)?o[e]=r[e]:b(o,e,r[e]);}))),a});return y.mutate(c).then(function(e){for(var t=e.failures,n=e.results,r=e.numFailures,e=e.lastResult,o=0;o<f.length;++o){var i=(n||f)[o],a=s[o];null==i?a.onerror&&a.onerror(t[o]):a.onsuccess&&a.onsuccess("put"===c.type&&u[o]?c.values[o]:i);}return {failures:t,results:n,numFailures:r,lastResult:e}}).catch(function(t){return s.forEach(function(e){return e.onerror&&e.onerror(t)}),Promise.reject(t)})});throw new Error("Keys missing")}}})}})}};function Wn(e,t,n){try{if(!t)return null;if(t.keys.length<e.length)return null;for(var r=[],o=0,i=0;o<t.keys.length&&i<e.length;++o)0===j(t.keys[o],e[i])&&(r.push(n?ee(t.values[o]):t.values[o]),++i);return r.length===e.length?r:null}catch(e){return null}}var Yn={stack:"dbcore",level:-1,create:function(t){return {table:function(e){var n=t.table(e);return _(_({},n),{getMany:function(t){var e;return t.cache?(e=Wn(t.keys,t.trans._cache,"clone"===t.cache))?K.resolve(e):n.getMany(t).then(function(e){return t.trans._cache={keys:t.keys,values:"clone"===t.cache?ee(e):e},e}):n.getMany(t)},mutate:function(e){return "add"!==e.type&&(e.trans._cache=null),n.mutate(e)}})}}}};function $n(e,t){return "readonly"===e.trans.mode&&!!e.subscr&&!e.trans.explicit&&"disabled"!==e.trans.db._options.cache&&!t.schema.primaryKey.outbound}function Qn(e,t){switch(e){case "query":return t.values&&!t.unique;case "get":case "getMany":case "count":case "openCursor":return  false}}var Gn={stack:"dbcore",level:0,name:"Observability",create:function(b){var g=b.schema.name,w=new I(b.MIN_KEY,b.MAX_KEY);return _(_({},b),{transaction:function(e,t,n){if(P.subscr&&"readonly"!==t)throw new k.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(P.querier));return b.transaction(e,t,n)},table:function(d){function e(e){var t,e=e.query;return [t=e.index,new I(null!=(t=(e=e.range).lower)?t:b.MIN_KEY,null!=(t=e.upper)?t:b.MAX_KEY)]}var p=b.table(d),y=p.schema,v=y.primaryKey,t=y.indexes,c=v.extractKey,l=v.outbound,m=v.autoIncrement&&t.filter(function(e){return e.compound&&e.keyPath.includes(v.keyPath)}),n=_(_({},p),{mutate:function(a){function u(e){return e="idb://".concat(g,"/").concat(d,"/").concat(e),n[e]||(n[e]=new I)}var e,i,s,t=a.trans,n=a.mutatedParts||(a.mutatedParts={}),r=u(""),o=u(":dels"),c=a.type,l="deleteRange"===a.type?[a.range]:"delete"===a.type?[a.keys]:a.values.length<50?[Vn(v,a).filter(function(e){return e}),a.values]:[],f=l[0],l=l[1],h=a.trans._cache;return x(f)?(r.addKeys(f),(c="delete"===c||f.length===l.length?Wn(f,h):null)||o.addKeys(f),(c||l)&&(e=u,i=c,s=l,y.indexes.forEach(function(t){var n=e(t.name||"");function r(e){return null!=e?t.extractKey(e):null}function o(e){t.multiEntry&&x(e)?e.forEach(function(e){return n.addKey(e)}):n.addKey(e);}(i||s).forEach(function(e,t){var n=i&&r(i[t]),t=s&&r(s[t]);0!==j(n,t)&&(null!=n&&o(n),null!=t)&&o(t);});}))):f?(l={from:null!=(h=f.lower)?h:b.MIN_KEY,to:null!=(c=f.upper)?c:b.MAX_KEY},o.add(l),r.add(l)):(r.add(w),o.add(w),y.indexes.forEach(function(e){return u(e.name).add(w)})),p.mutate(a).then(function(i){return !f||"add"!==a.type&&"put"!==a.type||(r.addKeys(i.results),m&&m.forEach(function(t){for(var e=a.values.map(function(e){return t.extractKey(e)}),n=t.keyPath.findIndex(function(e){return e===v.keyPath}),r=0,o=i.results.length;r<o;++r)e[r][n]=i.results[r];u(t.name).addKeys(e);})),t.mutatedParts=An(t.mutatedParts||{},n),i})}}),f={get:function(e){return [v,new I(e.key)]},getMany:function(e){return [v,(new I).addKeys(e.keys)]},count:e,query:e,openCursor:e};return O(f).forEach(function(s){n[s]=function(o){var e=P.subscr,t=!!e,n=$n(P,p)&&Qn(s,o)?o.obsSet={}:e;if(t){var i,e=function(e){e="idb://".concat(g,"/").concat(d,"/").concat(e);return n[e]||(n[e]=new I)},a=e(""),u=e(":dels"),t=f[s](o),r=t[0],t=t[1];if(("query"===s&&r.isPrimaryKey&&!o.values?u:e(r.name||"")).add(t),!r.isPrimaryKey){if("count"!==s)return i="query"===s&&l&&o.values&&p.query(_(_({},o),{values:false})),p[s].apply(this,arguments).then(function(t){if("query"===s){if(l&&o.values)return i.then(function(e){e=e.result;return a.addKeys(e),t});var e=o.values?t.result.map(c):t.result;(o.values?a:u).addKeys(e);}else {var n,r;if("openCursor"===s)return r=o.values,(n=t)&&Object.create(n,{key:{get:function(){return u.addKey(n.primaryKey),n.key}},primaryKey:{get:function(){var e=n.primaryKey;return u.addKey(e),e}},value:{get:function(){return r&&a.addKey(n.primaryKey),n.value}}})}return t});u.add(w);}}return p[s].apply(this,arguments)};}),n}})}};function Xn(e,t,n){var r;return 0===n.numFailures?t:"deleteRange"===t.type||(r=t.keys?t.keys.length:"values"in t&&t.values?t.values.length:1,n.numFailures===r)?null:(r=_({},t),x(r.keys)&&(r.keys=r.keys.filter(function(e,t){return !(t in n.failures)})),"values"in r&&x(r.values)&&(r.values=r.values.filter(function(e,t){return !(t in n.failures)})),r)}function Hn(e,t){return n=e,(void 0===(r=t).lower||(r.lowerOpen?0<j(n,r.lower):0<=j(n,r.lower)))&&(n=e,void 0===(r=t).upper||(r.upperOpen?j(n,r.upper)<0:j(n,r.upper)<=0));var n,r;}function Jn(e,d,t,n,r,o){var i,p,y,v,m,a;return !t||0===t.length||(i=d.query.index,p=i.multiEntry,y=d.query.range,v=n.schema.primaryKey.extractKey,m=i.extractKey,a=(i.lowLevelIndex||i).extractKey,(n=t.reduce(function(e,t){var n=e,r=[];if("add"===t.type||"put"===t.type)for(var o=new I,i=t.values.length-1;0<=i;--i){var a,u=t.values[i],s=v(u);!o.hasKey(s)&&(a=m(u),p&&x(a)?a.some(function(e){return Hn(e,y)}):Hn(a,y))&&(o.addKey(s),r.push(u));}switch(t.type){case "add":var c=(new I).addKeys(d.values?e.map(function(e){return v(e)}):e),n=e.concat(d.values?r.filter(function(e){e=v(e);return !c.hasKey(e)&&(c.addKey(e),true)}):r.map(function(e){return v(e)}).filter(function(e){return !c.hasKey(e)&&(c.addKey(e),true)}));break;case "put":var l=(new I).addKeys(t.values.map(function(e){return v(e)}));n=e.filter(function(e){return !l.hasKey(d.values?v(e):e)}).concat(d.values?r:r.map(function(e){return v(e)}));break;case "delete":var f=(new I).addKeys(t.keys);n=e.filter(function(e){return !f.hasKey(d.values?v(e):e)});break;case "deleteRange":var h=t.range;n=e.filter(function(e){return !Hn(v(e),h)});}return n},e))===e)?e:(n.sort(function(e,t){return j(a(e),a(t))||j(v(e),v(t))}),d.limit&&d.limit<1/0&&(n.length>d.limit?n.length=d.limit:e.length===d.limit&&n.length<d.limit&&(r.dirty=true)),o?Object.freeze(n):n)}function Zn(e,t){return 0===j(e.lower,t.lower)&&0===j(e.upper,t.upper)&&!!e.lowerOpen==!!t.lowerOpen&&!!e.upperOpen==!!t.upperOpen}function er(e,t){return ((e,t,n,r)=>{if(void 0===e)return void 0!==t?-1:0;if(void 0===t)return 1;if(0===(e=j(e,t))){if(n&&r)return 0;if(n)return 1;if(r)return  -1}return e})(e.lower,t.lower,e.lowerOpen,t.lowerOpen)<=0&&0<=((e,t,n,r)=>{if(void 0===e)return void 0!==t?1:0;if(void 0===t)return  -1;if(0===(e=j(e,t))){if(n&&r)return 0;if(n)return  -1;if(r)return 1}return e})(e.upper,t.upper,e.upperOpen,t.upperOpen)}function tr(n,r,o,e){n.subscribers.add(o),e.addEventListener("abort",function(){var e,t;n.subscribers.delete(o),0===n.subscribers.size&&(e=n,t=r,setTimeout(function(){0===e.subscribers.size&&ie(t,e);},3e3));});}var nr={stack:"dbcore",level:0,name:"Cache",create:function(k){var O=k.schema.name;return _(_({},k),{transaction:function(g,w,e){var _,t,x=k.transaction(g,w,e);return "readwrite"===w&&(e=(_=new AbortController).signal,x.addEventListener("abort",(t=function(b){return function(){if(_.abort(),"readwrite"===w){for(var t=new Set,e=0,n=g;e<n.length;e++){var r=n[e],o=Tn["idb://".concat(O,"/").concat(r)];if(o){var i=k.table(r),a=o.optimisticOps.filter(function(e){return e.trans===x});if(x._explicit&&b&&x.mutatedParts)for(var u=0,s=Object.values(o.queries.query);u<s.length;u++)for(var c=0,l=(d=s[u]).slice();c<l.length;c++)Cn((p=l[c]).obsSet,x.mutatedParts)&&(ie(d,p),p.subscribers.forEach(function(e){return t.add(e)}));else if(0<a.length){o.optimisticOps=o.optimisticOps.filter(function(e){return e.trans!==x});for(var f=0,h=Object.values(o.queries.query);f<h.length;f++)for(var d,p,y,v=0,m=(d=h[f]).slice();v<m.length;v++)null!=(p=m[v]).res&&x.mutatedParts&&(b&&!p.dirty?(y=Object.isFrozen(p.res),y=Jn(p.res,p.req,a,i,p,y),p.dirty?(ie(d,p),p.subscribers.forEach(function(e){return t.add(e)})):y!==p.res&&(p.res=y,p.promise=K.resolve({result:y}))):(p.dirty&&ie(d,p),p.subscribers.forEach(function(e){return t.add(e)})));}}}t.forEach(function(e){return e()});}}})(false),{signal:e}),x.addEventListener("error",t(false),{signal:e}),x.addEventListener("complete",t(true),{signal:e})),x},table:function(s){var c=k.table(s),o=c.schema.primaryKey;return _(_({},c),{mutate:function(t){var n,e=P.trans;return !o.outbound&&"disabled"!==e.db._options.cache&&!e.explicit&&"readwrite"===e.idbtrans.mode&&(n=Tn["idb://".concat(O,"/").concat(s)])?(e=c.mutate(t),"add"!==t.type&&"put"!==t.type||!(50<=t.values.length||Vn(o,t).some(function(e){return null==e}))?(n.optimisticOps.push(t),t.mutatedParts&&Dn(t.mutatedParts),e.then(function(e){0<e.numFailures&&(ie(n.optimisticOps,t),(e=Xn(0,t,e))&&n.optimisticOps.push(e),t.mutatedParts)&&Dn(t.mutatedParts);}),e.catch(function(){ie(n.optimisticOps,t),t.mutatedParts&&Dn(t.mutatedParts);})):e.then(function(r){var e=Xn(0,_(_({},t),{values:t.values.map(function(e,t){var n;return r.failures[t]?e:(b(n=null!=(n=o.keyPath)&&n.includes(".")?ee(e):_({},e),o.keyPath,r.results[t]),n)})}),r);n.optimisticOps.push(e),queueMicrotask(function(){return t.mutatedParts&&Dn(t.mutatedParts)});}),e):c.mutate(t)},query:function(t){var o,e,n,r,i,a,u;return $n(P,c)&&Qn("query",t)?(o="immutable"===(null==(n=P.trans)?void 0:n.db._options.cache),e=(n=P).requery,n=n.signal,a=((e,t,n,r)=>{var o=Tn["idb://".concat(e,"/").concat(t)];if(!o)return [];if(!(e=o.queries[n]))return [null,false,o,null];var i=e[(r.query?r.query.index.name:null)||""];if(!i)return [null,false,o,null];switch(n){case "query":var a=i.find(function(e){return e.req.limit===r.limit&&e.req.values===r.values&&Zn(e.req.query.range,r.query.range)});return a?[a,true,o,i]:[i.find(function(e){return ("limit"in e.req?e.req.limit:1/0)>=r.limit&&(!r.values||e.req.values)&&er(e.req.query.range,r.query.range)}),false,o,i];case "count":a=i.find(function(e){return Zn(e.req.query.range,r.query.range)});return [a,!!a,o,i]}})(O,s,"query",t),u=a[0],r=a[2],i=a[3],u&&a[1]?u.obsSet=t.obsSet:(a=c.query(t).then(function(e){var t=e.result;if(u&&(u.res=t),o){for(var n=0,r=t.length;n<r;++n)Object.freeze(t[n]);Object.freeze(t);}else e.result=ee(t);return e}).catch(function(e){return i&&u&&ie(i,u),Promise.reject(e)}),u={obsSet:t.obsSet,promise:a,subscribers:new Set,type:"query",req:t,dirty:false},i?i.push(u):(i=[u],(r=r||(Tn["idb://".concat(O,"/").concat(s)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[t.query.index.name||""]=i)),tr(u,i,e,n),u.promise.then(function(e){return {result:Jn(e.result,t,null==r?void 0:r.optimisticOps,c,u,o)}})):c.query(t)}})}})}};function rr(e,r){return new Proxy(e,{get:function(e,t,n){return "db"===t?r:Reflect.get(e,t,n)}})}D.prototype.version=function(t){if(isNaN(t)||t<.1)throw new k.Type("Given version is not a positive number");if(t=Math.round(10*t)/10,this.idbdb||this._state.isBeingOpened)throw new k.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,t);var e=this._versions,n=e.filter(function(e){return e._cfg.version===t})[0];return n||(n=new this.Version(t),e.push(n),e.sort(sn),n.stores({}),this._state.autoSchema=false),n},D.prototype._whenReady=function(e){var n=this;return this.idbdb&&(this._state.openComplete||P.letThrough||this._vip)?e():new K(function(e,t){if(n._state.openComplete)return t(new k.DatabaseClosed(n._state.dbOpenError));if(!n._state.isBeingOpened){if(!n._state.autoOpen)return void t(new k.DatabaseClosed);n.open().catch(g);}n._state.dbReadyPromise.then(e,t);}).then(e)},D.prototype.use=function(e){var t=e.stack,n=e.create,r=e.level,e=e.name,o=(e&&this.unuse({stack:t,name:e}),this._middlewares[t]||(this._middlewares[t]=[]));return o.push({stack:t,create:n,level:null==r?10:r,name:e}),o.sort(function(e,t){return e.level-t.level}),this},D.prototype.unuse=function(e){var t=e.stack,n=e.name,r=e.create;return t&&this._middlewares[t]&&(this._middlewares[t]=this._middlewares[t].filter(function(e){return r?e.create!==r:!!n&&e.name!==n})),this},D.prototype.open=function(){var e=this;return at(s,function(){return Fn(e)})},D.prototype._close=function(){this.on.close.fire(new CustomEvent("close"));var n=this._state,e=ft.indexOf(this);if(0<=e&&ft.splice(e,1),this.idbdb){try{this.idbdb.close();}catch(e){}this.idbdb=null;}n.isBeingOpened||(n.dbReadyPromise=new K(function(e){n.dbReadyResolve=e;}),n.openCanceller=new K(function(e,t){n.cancelOpen=t;}));},D.prototype.close=function(e){var e=(void 0===e?{disableAutoOpen:true}:e).disableAutoOpen,t=this._state;e?(t.isBeingOpened&&t.cancelOpen(new k.DatabaseClosed),this._close(),t.autoOpen=false,t.dbOpenError=new k.DatabaseClosed):(this._close(),t.autoOpen=this._options.autoOpen||t.isBeingOpened,t.openComplete=false,t.dbOpenError=null);},D.prototype.delete=function(n){var o=this,i=(void 0===n&&(n={disableAutoOpen:true}),0<arguments.length&&"object"!=typeof arguments[0]),a=this._state;return new K(function(r,t){function e(){o.close(n);var e=o._deps.indexedDB.deleteDatabase(o.name);e.onsuccess=E(function(){var e,t,n;e=o._deps,t=o.name,_n(n=e.indexedDB)||t===ht||wn(n,e.IDBKeyRange).delete(t).catch(g),r();}),e.onerror=T(t),e.onblocked=o._fireOnBlocked;}if(i)throw new k.InvalidArgument("Invalid closeOptions argument to db.delete()");a.isBeingOpened?a.dbReadyPromise.then(e):e();})},D.prototype.backendDB=function(){return this.idbdb},D.prototype.isOpen=function(){return null!==this.idbdb},D.prototype.hasBeenClosed=function(){var e=this._state.dbOpenError;return e&&"DatabaseClosed"===e.name},D.prototype.hasFailed=function(){return null!==this._state.dbOpenError},D.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(D.prototype,"tables",{get:function(){var t=this;return O(this._allTables).map(function(e){return t._allTables[e]})},enumerable:false,configurable:true}),D.prototype.transaction=function(){var e=function(e,t,n){var r=arguments.length;if(r<2)throw new k.InvalidArgument("Too few arguments");for(var o=new Array(r-1);--r;)o[r-1]=arguments[r];return n=o.pop(),[e,H(o),n]}.apply(this,arguments);return this._transaction.apply(this,e)},D.prototype._transaction=function(e,t,n){var r,o,i=this,a=P.trans,u=(a&&a.db===this&&-1===e.indexOf("!")||(a=null),-1!==e.indexOf("?"));e=e.replace("!","").replace("?","");try{if(o=t.map(function(e){e=e instanceof i.Table?e.name:e;if("string"!=typeof e)throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return e}),"r"==e||e===dt)r=dt;else {if("rw"!=e&&e!=pt)throw new k.InvalidArgument("Invalid transaction mode: "+e);r=pt;}if(a){if(a.mode===dt&&r===pt){if(!u)throw new k.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");a=null;}a&&o.forEach(function(e){if(a&&-1===a.storeNames.indexOf(e)){if(!u)throw new k.SubTransaction("Table "+e+" not included in parent transaction.");a=null;}}),u&&a&&!a.active&&(a=null);}}catch(n){return a?a._promise(null,function(e,t){t(n);}):w(n)}var s=function o(i,a,u,s,c){return K.resolve().then(function(){var e=P.transless||P,t=i._createTransaction(a,u,i._dbSchema,s),e=(t.explicit=true,{trans:t,transless:e});if(s)t.idbtrans=s.idbtrans;else try{t.create(),t.idbtrans._explicit=!0,i._state.PR1398_maxLoop=3;}catch(e){return e.name===de.InvalidState&&i.isOpen()&&0<--i._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),i.close({disableAutoOpen:false}),i.open().then(function(){return o(i,a,u,null,c)})):w(e)}var n,r=ue(c),e=(r&&nt(),K.follow(function(){var e;(n=c.call(t,t))&&(r?(e=v.bind(null,null),n.then(e,e)):"function"==typeof n.next&&"function"==typeof n.throw&&(n=Mn(n)));},e));return (n&&"function"==typeof n.then?K.resolve(n).then(function(e){return t.active?e:w(new k.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):e.then(function(){return n})).then(function(e){return s&&t._resolve(),t._completion.then(function(){return e})}).catch(function(e){return t._reject(e),w(e)})})}.bind(null,this,r,o,a,n);return a?a._promise(r,s,"lock"):P.trans?at(P.transless,function(){return i._whenReady(s)}):this._whenReady(s)},D.prototype.table=function(e){if(m(this._allTables,e))return this._allTables[e];throw new k.InvalidTable("Table ".concat(e," does not exist"))};var q=D;function D(e,t){var i,r,a,n,o,u=this,s=(this._middlewares={},this.verno=0,D.dependencies),s=(this._options=t=_({addons:D.addons,autoOpen:true,indexedDB:s.indexedDB,IDBKeyRange:s.IDBKeyRange,cache:"cloned"},t),this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange},t.addons),c=(this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this,{dbOpenError:null,isBeingOpened:false,onReadyBeingFired:null,openComplete:false,dbReadyResolve:g,dbReadyPromise:null,cancelOpen:g,openCanceller:null,autoSchema:true,PR1398_maxLoop:3,autoOpen:t.autoOpen}),l=(c.dbReadyPromise=new K(function(e){c.dbReadyResolve=e;}),c.openCanceller=new K(function(e,t){c.cancelOpen=t;}),this._state=c,this.name=e,this.on=Kt(this,"populate","blocked","versionchange","close",{ready:[ke,g]}),this.once=function(n,r){var o=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];u.on(n).unsubscribe(o),r.apply(u,e);};return u.on(n,o)},this.on.ready.subscribe=Y(this.on.ready.subscribe,function(o){return function(n,r){D.vip(function(){var t,e=u._state;e.openComplete?(e.dbOpenError||K.resolve().then(n),r&&o(n)):e.onReadyBeingFired?(e.onReadyBeingFired.push(n),r&&o(n)):(o(n),t=u,r||o(function e(){t.on.ready.unsubscribe(n),t.on.ready.unsubscribe(e);}));});}}),this.Collection=(i=this,Et(Dt.prototype,function(e,t){this.db=i;var n=vt,r=null;if(t)try{n=t();}catch(e){r=e;}var t=e._ctx,e=t.table,o=e.hook.reading.fire;this._ctx={table:e,index:t.index,isPrimKey:!t.index||e.schema.primKey.keyPath&&t.index===e.schema.primKey.name,range:n,keysOnly:false,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:true,isMatch:null,offset:0,limit:1/0,error:r,or:t.or,valueMapper:o!==ve?o:null};})),this.Table=(r=this,Et(Pt.prototype,function(e,t,n){this.db=r,this._tx=n,this.name=e,this.schema=t,this.hook=r._allTables[e]?r._allTables[e].hook:Kt(null,{creating:[ge,g],reading:[me,ve],updating:[_e,g],deleting:[we,g]});})),this.Transaction=(a=this,Et($t.prototype,function(e,t,n,r,o){var i=this;"readonly"!==e&&t.forEach(function(e){e=null==(e=n[e])?void 0:e.yProps;e&&(t=t.concat(e.map(function(e){return e.updatesTable})));}),this.db=a,this.mode=e,this.storeNames=t,this.schema=n,this.chromeTransactionDurability=r,this.idbtrans=null,this.on=Kt(this,"complete","error","abort"),this.parent=o||null,this.active=true,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new K(function(e,t){i._resolve=e,i._reject=t;}),this._completion.then(function(){i.active=false,i.on.complete.fire();},function(e){var t=i.active;return i.active=false,i.on.error.fire(e),i.parent?i.parent._reject(e):t&&i.idbtrans&&i.idbtrans.abort(),w(e)});})),this.Version=(n=this,Et(bn.prototype,function(e){this.db=n,this._cfg={version:e,storesSource:null,dbschema:{},tables:{},contentUpgrade:null};})),this.WhereClause=(o=this,Et(Ut.prototype,function(e,t,n){if(this.db=o,this._ctx={table:e,index:":id"===t?null:t,or:n},this._cmp=this._ascending=j,this._descending=function(e,t){return j(t,e)},this._max=function(e,t){return 0<j(e,t)?e:t},this._min=function(e,t){return j(e,t)<0?e:t},this._IDBKeyRange=o._deps.IDBKeyRange,!this._IDBKeyRange)throw new k.MissingAPI})),this.on("versionchange",function(e){0<e.newVersion?console.warn("Another connection wants to upgrade database '".concat(u.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(u.name,"'. Closing db now to resume the delete request.")),u.close({disableAutoOpen:false});}),this.on("blocked",function(e){!e.newVersion||e.newVersion<e.oldVersion?console.warn("Dexie.delete('".concat(u.name,"') was blocked")):console.warn("Upgrade '".concat(u.name,"' blocked by other connection holding version ").concat(e.oldVersion/10));}),this._maxKey=Ht(t.IDBKeyRange),this._createTransaction=function(e,t,n,r){return new u.Transaction(e,t,n,u._options.chromeTransactionDurability,r)},this._fireOnBlocked=function(t){u.on("blocked").fire(t),ft.filter(function(e){return e.name===u.name&&e!==u&&!e._state.vcFired}).map(function(e){return e.on("versionchange").fire(t)});},this.use(Yn),this.use(nr),this.use(Gn),this.use(Ln),this.use(zn),new Proxy(this,{get:function(e,t,n){var r;return "_vip"===t||("table"===t?function(e){return rr(u.table(e),l)}:(r=Reflect.get(e,t,n))instanceof Pt?rr(r,l):"tables"===t?r.map(function(e){return rr(e,l)}):"_createTransaction"===t?function(){return rr(r.apply(this,arguments),l)}:r)}}));this.vip=l,s.forEach(function(e){return e(u)});}var or,Se="undefined"!=typeof Symbol&&"observable"in Symbol?Symbol.observable:"@@observable",ir=(ar.prototype.subscribe=function(e,t,n){return this._subscribe(e&&"function"!=typeof e?e:{next:e,error:t,complete:n})},ar.prototype[Se]=function(){return this},ar);function ar(e){this._subscribe=e;}try{or={indexedDB:f.indexedDB||f.mozIndexedDB||f.webkitIndexedDB||f.msIndexedDB,IDBKeyRange:f.IDBKeyRange||f.webkitIDBKeyRange};}catch(e){or={indexedDB:null,IDBKeyRange:null};}function ur(h){var d,p=false,e=new ir(function(r){var o=ue(h);var i,a=false,u={},s={},e={get closed(){return a},unsubscribe:function(){a||(a=true,i&&i.abort(),c&&Yt.storagemutated.unsubscribe(f));}},c=(r.start&&r.start(e),false),l=function(){return st(t)};var f=function(e){An(u,e),Cn(s,u)&&l();},t=function(){var t,n,e;!a&&or.indexedDB&&(u={},t={},i&&i.abort(),i=new AbortController,e=(e=>{var t=$e();try{o&&nt();var n=y(h,e);return n=o?n.finally(v):n}finally{t&&Qe();}})(n={subscr:t,signal:i.signal,requery:l,querier:h,trans:null}),Promise.resolve(e).then(function(e){p=true,d=e,a||n.signal.aborted||(u={},(e=>{for(var t in e)if(m(e,t))return;return 1})(s=t)||c||(Yt(zt,f),c=true),st(function(){return !a&&r.next&&r.next(e)}));},function(e){p=false,["DatabaseClosedError","AbortError"].includes(null==e?void 0:e.name)||a||st(function(){a||r.error&&r.error(e);});}));};return setTimeout(l,0),e});return e.hasValue=function(){return p},e.getValue=function(){return d},e}var sr=q;function cr(e){var t=fr;try{fr=!0,Yt.storagemutated.fire(e),Bn(e,!0);}finally{fr=t;}}N(sr,_(_({},e),{delete:function(e){return new sr(e,{addons:[]}).delete()},exists:function(e){return new sr(e,{addons:[]}).open().then(function(e){return e.close(),true}).catch("NoSuchDatabaseError",function(){return  false})},getDatabaseNames:function(e){try{return t=sr.dependencies,n=t.indexedDB,t=t.IDBKeyRange,(_n(n)?Promise.resolve(n.databases()).then(function(e){return e.map(function(e){return e.name}).filter(function(e){return e!==ht})}):wn(n,t).toCollection().primaryKeys()).then(e)}catch(e){return w(new k.MissingAPI)}var t,n;},defineClass:function(){return function(e){a(this,e);}},ignoreTransaction:function(e){return P.trans?at(P.transless,e):e()},vip:xn,async:function(t){return function(){try{var e=Mn(t.apply(this,arguments));return e&&"function"==typeof e.then?e:K.resolve(e)}catch(e){return w(e)}}},spawn:function(e,t,n){try{var r=Mn(e.apply(n,t||[]));return r&&"function"==typeof r.then?r:K.resolve(r)}catch(e){return w(e)}},currentTransaction:{get:function(){return P.trans||null}},waitFor:function(e,t){e=K.resolve("function"==typeof e?sr.ignoreTransaction(e):e).timeout(t||6e4);return P.trans?P.trans.waitFor(e):e},Promise:K,debug:{get:function(){return l},set:function(e){Oe(e);}},derive:U,extend:a,props:N,override:Y,Events:Kt,on:Yt,liveQuery:ur,extendObservabilitySet:An,getByKeyPath:c,setByKeyPath:b,delByKeyPath:function(t,e){"string"==typeof e?b(t,e,void 0):"length"in e&&[].map.call(e,function(e){b(t,e,void 0);});},shallowClone:G,deepClone:ee,getObjectDiff:Un,cmp:j,asap:Q,minKey:-1/0,addons:[],connections:ft,errnames:de,dependencies:or,cache:Tn,semVer:"4.3.0",version:"4.3.0".split(".").map(function(e){return parseInt(e)}).reduce(function(e,t,n){return e+t/Math.pow(10,2*n)})})),sr.maxKey=Ht(sr.dependencies.IDBKeyRange),"undefined"!=typeof dispatchEvent&&"undefined"!=typeof addEventListener&&(Yt(zt,function(e){fr||(e=new CustomEvent(Wt,{detail:e}),fr=true,dispatchEvent(e),fr=false);}),addEventListener(Wt,function(e){e=e.detail;fr||cr(e);}));var lr,fr=false,hr=function(){};return "undefined"!=typeof BroadcastChannel&&((hr=function(){(lr=new BroadcastChannel(Wt)).onmessage=function(e){return e.data&&cr(e.data)};})(),"function"==typeof lr.unref&&lr.unref(),Yt(zt,function(e){fr||lr.postMessage(e);})),"undefined"!=typeof addEventListener&&(addEventListener("pagehide",function(e){if(!q.disableBfCache&&e.persisted){l&&console.debug("Dexie: handling persisted pagehide"),null!=lr&&lr.close();for(var t=0,n=ft;t<n.length;t++)n[t].close({disableAutoOpen:false});}}),addEventListener("pageshow",function(e){!q.disableBfCache&&e.persisted&&(l&&console.debug("Dexie: handling persisted pageshow"),hr(),cr({all:new I(-1/0,[[]])}));})),K.rejectionMapper=function(e,t){return !e||e instanceof ce||e instanceof TypeError||e instanceof SyntaxError||!e.name||!ye[e.name]?e:(t=new ye[e.name](t||e.message,e),"stack"in e&&u(t,"stack",{get:function(){return this.inner.stack}}),t)},Oe(l),_(q,Object.freeze({__proto__:null,Dexie:q,Entity:bt,PropModification:xt,RangeSet:I,add:function(e){return new xt({add:e})},cmp:j,default:q,liveQuery:ur,mergeRanges:Pn,rangesOverlap:Kn,remove:function(e){return new xt({remove:e})},replacePrefix:function(e,t){return new xt({replacePrefix:[e,t]})}}),{default:q}),q});
	
} (dexie_min));

var dexie_minExports = dexie_min.exports;
const _Dexie = /*@__PURE__*/getDefaultExportFromCjs(dexie_minExports);

// Making the module version consumable via require - to prohibit
// multiple occurrancies of the same module in the same app
// (dual package hazard, https://nodejs.org/api/packages.html#dual-package-hazard)
const DexieSymbol = Symbol.for("Dexie");
const Dexie = globalThis[DexieSymbol] || (globalThis[DexieSymbol] = _Dexie);
if (_Dexie.semVer !== Dexie.semVer) {
    throw new Error(`Two different versions of Dexie loaded in the same app: ${_Dexie.semVer} and ${Dexie.semVer}`);
}
const {
    liveQuery, mergeRanges, rangesOverlap, RangeSet, cmp, Entity,
    PropModification, replacePrefix, add, remove,
    DexieYProvider } = Dexie;

class SurebetDatabase extends Dexie {
  surebets;
  legs;
  settings;
  constructor() {
    super("SurebetTrackerDB");
    this.version(1).stores({
      surebets: "++id, uuid, status, createdAt, updatedAt, expectedProfit",
      legs: "++id, surebetId, order, status, eventDate, bookmaker",
      settings: "key"
    });
  }
}
const db = new SurebetDatabase();
if (typeof window !== "undefined") {
  window.db = db;
}

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}

let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = { randomUUID };

function _v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? rng();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    return unsafeStringify(rnds);
}
function v4(options, buf, offset) {
    if (native.randomUUID && true && !options) {
        return native.randomUUID();
    }
    return _v4(options);
}

const storageService = {
  // ============================================
  // SUREBETS - CRUD
  // ============================================
  async createSurebet() {
    const surebet = {
      uuid: v4(),
      status: "created",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    const result = await db.transaction("rw", db.surebets, db.legs, async () => {
      const surebetId = await db.surebets.add(surebet);
      const legs = [
        { surebetId, order: 1, status: "empty" },
        { surebetId, order: 2, status: "empty" },
        { surebetId, order: 3, status: "empty" }
      ];
      await db.legs.bulkAdd(legs);
      const insertedLegs = await db.legs.where("surebetId").equals(surebetId).sortBy("order");
      return {
        ...surebet,
        id: surebetId,
        legs: insertedLegs
      };
    });
    return result;
  },
  async getSurebetById(id) {
    const surebet = await db.surebets.get(id);
    if (!surebet) return null;
    const legs = await db.legs.where("surebetId").equals(id).sortBy("order");
    return { ...surebet, legs };
  },
  async getAllSurebets(options) {
    let results = await db.surebets.orderBy("updatedAt").reverse().toArray();
    if (options?.status) {
      results = results.filter((s) => s.status === options.status);
    }
    if (options?.offset) {
      results = results.slice(options.offset);
    }
    if (options?.limit) {
      results = results.slice(0, options.limit);
    }
    const surebetsWithLegs = await Promise.all(
      results.map(async (surebet) => {
        const legs = await db.legs.where("surebetId").equals(surebet.id).sortBy("order");
        return { ...surebet, legs };
      })
    );
    return surebetsWithLegs;
  },
  async updateSurebet(id, data) {
    await db.surebets.update(id, {
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    });
  },
  async deleteSurebet(id) {
    await db.transaction("rw", db.surebets, db.legs, async () => {
      await db.legs.where("surebetId").equals(id).delete();
      await db.surebets.delete(id);
    });
  },
  // ============================================
  // LEGS
  // ============================================
  async updateLegFromExtraction(legId, extractedData) {
    const potentialReturn = extractedData.odds && extractedData.stake ? parseFloat((extractedData.odds * extractedData.stake).toFixed(2)) : void 0;
    const hasRequiredFields = extractedData.eventName && extractedData.selection && extractedData.odds && extractedData.stake;
    await db.legs.update(legId, {
      status: hasRequiredFields ? "filled" : "captured",
      eventName: extractedData.eventName || void 0,
      selection: extractedData.selection || void 0,
      odds: extractedData.odds || void 0,
      stake: extractedData.stake || void 0,
      eventDate: extractedData.eventDate ? new Date(extractedData.eventDate) : void 0,
      bookmaker: extractedData.bookmaker || void 0,
      potentialReturn,
      confidence: extractedData.confidence || void 0,
      extractedAt: /* @__PURE__ */ new Date()
    });
    const leg = await db.legs.get(legId);
    if (leg) {
      await this.recalculateSurebetStatus(leg.surebetId);
    }
  },
  async updateLeg(legId, data) {
    const currentLeg = await db.legs.get(legId);
    if (!currentLeg) return;
    const updatedData = { ...currentLeg, ...data };
    if (updatedData.odds && updatedData.stake) {
      updatedData.potentialReturn = parseFloat(
        (updatedData.odds * updatedData.stake).toFixed(2)
      );
    }
    const hasRequiredFields = updatedData.eventName && updatedData.selection && updatedData.odds && updatedData.stake;
    if (hasRequiredFields && updatedData.status !== "filled") {
      updatedData.status = "filled";
    }
    await db.legs.update(legId, updatedData);
    await this.recalculateSurebetStatus(currentLeg.surebetId);
  },
  async setLegScreenshot(legId, screenshot) {
    const leg = await db.legs.get(legId);
    if (!leg) return;
    await db.legs.update(legId, {
      screenshot,
      status: leg.status === "empty" ? "captured" : leg.status
    });
  },
  async clearLeg(legId) {
    const leg = await db.legs.get(legId);
    if (!leg) return;
    await db.legs.update(legId, {
      status: "empty",
      eventName: void 0,
      selection: void 0,
      odds: void 0,
      stake: void 0,
      eventDate: void 0,
      bookmaker: void 0,
      potentialReturn: void 0,
      confidence: void 0,
      screenshot: void 0,
      extractedAt: void 0
    });
    await this.recalculateSurebetStatus(leg.surebetId);
  },
  // ============================================
  // CÁLCULOS AUTOMÁTICOS
  // ============================================
  async recalculateSurebetStatus(surebetId) {
    const legs = await db.legs.where("surebetId").equals(surebetId).toArray();
    const filledLegs = legs.filter((l) => l.status === "filled");
    const requiredLegs = legs.filter((l) => l.order <= 2);
    const requiredFilled = requiredLegs.filter((l) => l.status === "filled");
    let status;
    if (filledLegs.length === 0) {
      status = "created";
    } else if (requiredFilled.length >= 2) {
      status = "completed";
    } else {
      status = "in_progress";
    }
    let totalStake = 0;
    let expectedProfit = 0;
    let profitPercentage = 0;
    if (status === "completed" && filledLegs.length >= 2) {
      totalStake = filledLegs.reduce((sum, leg) => sum + (leg.stake || 0), 0);
      const returns = filledLegs.filter((l) => l.potentialReturn !== void 0).map((l) => l.potentialReturn);
      if (returns.length > 0) {
        const minReturn = Math.min(...returns);
        expectedProfit = parseFloat((minReturn - totalStake).toFixed(2));
        profitPercentage = totalStake > 0 ? parseFloat((expectedProfit / totalStake * 100).toFixed(2)) : 0;
      }
    }
    await db.surebets.update(surebetId, {
      status,
      totalStake: totalStake || void 0,
      expectedProfit: expectedProfit || void 0,
      profitPercentage: profitPercentage || void 0,
      updatedAt: /* @__PURE__ */ new Date()
    });
  },
  // ============================================
  // SETTINGS (API Key, etc)
  // ============================================
  async getApiKey() {
    const setting = await db.settings.get("gemini_api_key");
    return setting?.value || null;
  },
  async setApiKey(key) {
    await db.settings.put({ key: "gemini_api_key", value: key });
  },
  // ============================================
  // ESTATÍSTICAS
  // ============================================
  async getStats(dateRange) {
    let surebets = await db.surebets.toArray();
    if (dateRange) {
      surebets = surebets.filter(
        (s) => s.createdAt >= dateRange.start && s.createdAt <= dateRange.end
      );
    }
    const completed = surebets.filter((s) => s.status === "completed");
    const filledLegs = await db.legs.where("status").equals("filled").toArray();
    const byBookmaker = {};
    filledLegs.forEach((leg) => {
      if (leg.bookmaker) {
        byBookmaker[leg.bookmaker] = (byBookmaker[leg.bookmaker] || 0) + 1;
      }
    });
    const totalProfit = completed.reduce(
      (sum, s) => sum + (s.expectedProfit || 0),
      0
    );
    const avgProfitPercentage = completed.length > 0 ? completed.reduce((sum, s) => sum + (s.profitPercentage || 0), 0) / completed.length : 0;
    return {
      total: surebets.length,
      completed: completed.length,
      inProgress: surebets.filter((s) => s.status === "in_progress").length,
      created: surebets.filter((s) => s.status === "created").length,
      totalProfit: parseFloat(totalProfit.toFixed(2)),
      avgProfitPercentage: parseFloat(avgProfitPercentage.toFixed(2)),
      byBookmaker
    };
  },
  // ============================================
  // BUSCA
  // ============================================
  async searchSurebets(query) {
    if (!query.trim()) {
      return this.getAllSurebets();
    }
    const queryLower = query.toLowerCase().trim();
    const allLegs = await db.legs.toArray();
    const matchingSurebetIds = new Set(
      allLegs.filter(
        (leg) => leg.eventName?.toLowerCase().includes(queryLower) || leg.selection?.toLowerCase().includes(queryLower) || leg.bookmaker?.toLowerCase().includes(queryLower)
      ).map((leg) => leg.surebetId)
    );
    if (matchingSurebetIds.size === 0) return [];
    return db.surebets.where("id").anyOf([...matchingSurebetIds]).reverse().sortBy("updatedAt");
  },
  // ============================================
  // EXPORT / IMPORT
  // ============================================
  async exportToJSON() {
    const surebets = await db.surebets.toArray();
    const legs = await db.legs.toArray();
    return JSON.stringify(
      {
        version: 1,
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        surebets,
        legs
      },
      null,
      2
    );
  },
  async importFromJSON(jsonString) {
    const data = JSON.parse(jsonString);
    let imported = 0;
    let errors = 0;
    await db.transaction("rw", db.surebets, db.legs, async () => {
      for (const surebet of data.surebets) {
        try {
          const oldId = surebet.id;
          delete surebet.id;
          const newId = await db.surebets.add({
            ...surebet,
            createdAt: new Date(surebet.createdAt),
            updatedAt: new Date(surebet.updatedAt)
          });
          const surebetLegs = data.legs.filter(
            (l) => l.surebetId === oldId
          );
          for (const leg of surebetLegs) {
            delete leg.id;
            await db.legs.add({
              ...leg,
              surebetId: newId,
              eventDate: leg.eventDate ? new Date(leg.eventDate) : void 0,
              extractedAt: leg.extractedAt ? new Date(leg.extractedAt) : void 0
            });
          }
          imported++;
        } catch (err) {
          console.error("Erro ao importar surebet:", err);
          errors++;
        }
      }
    });
    return { imported, errors };
  },
  // ============================================
  // MANUTENÇÃO
  // ============================================
  async deleteOlderThan(days) {
    const cutoffDate = /* @__PURE__ */ new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const oldSurebets = await db.surebets.where("createdAt").below(cutoffDate).toArray();
    const idsToDelete = oldSurebets.map((s) => s.id);
    if (idsToDelete.length === 0) return 0;
    await db.transaction("rw", db.surebets, db.legs, async () => {
      await db.legs.where("surebetId").anyOf(idsToDelete).delete();
      await db.surebets.bulkDelete(idsToDelete);
    });
    return idsToDelete.length;
  },
  async getDatabaseSize() {
    const surebetsCount = await db.surebets.count();
    const legsCount = await db.legs.count();
    const estimatedKB = Math.round(surebetsCount * 2 + legsCount * 0.5);
    return { surebets: surebetsCount, legs: legsCount, estimatedKB };
  },
  async clearAll() {
    await db.transaction("rw", db.surebets, db.legs, async () => {
      await db.legs.clear();
      await db.surebets.clear();
    });
  }
};

const useSurebetStore = create((set, get) => ({
  surebets: [],
  currentSurebet: null,
  currentLegId: null,
  isLoading: false,
  isExtracting: false,
  error: null,
  view: "list",
  apiKey: null,
  loadSurebets: async () => {
    set({ isLoading: true, error: null });
    try {
      const surebets = await storageService.getAllSurebets();
      set({ surebets, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao carregar",
        isLoading: false
      });
    }
  },
  createSurebet: async () => {
    const newSurebet = await storageService.createSurebet();
    set((state) => ({
      surebets: [newSurebet, ...state.surebets],
      currentSurebet: newSurebet,
      view: "editor"
    }));
    return newSurebet;
  },
  selectSurebet: async (id) => {
    const surebet = await storageService.getSurebetById(id);
    if (surebet) {
      set({ currentSurebet: surebet, view: "editor" });
    }
  },
  updateLeg: async (legId, data) => {
    const { currentSurebet } = get();
    if (!currentSurebet) return;
    const leg = currentSurebet.legs.find((l) => l.id === legId);
    if (!leg) return;
    const legRecordData = {};
    if (data.eventName !== void 0) legRecordData.eventName = data.eventName;
    if (data.selection !== void 0) legRecordData.selection = data.selection;
    if (data.odds !== void 0) legRecordData.odds = data.odds;
    if (data.stake !== void 0) legRecordData.stake = data.stake;
    if (data.bookmaker !== void 0) legRecordData.bookmaker = data.bookmaker;
    if (data.confidence !== void 0) legRecordData.confidence = data.confidence;
    if (data.eventDate !== void 0) {
      legRecordData.eventDate = new Date(data.eventDate);
    }
    await storageService.updateLeg(legId, legRecordData);
    await get().refreshCurrentSurebet();
  },
  setLegScreenshot: async (legId, screenshot) => {
    await storageService.setLegScreenshot(legId, screenshot);
    await get().refreshCurrentSurebet();
  },
  deleteSurebet: async (id) => {
    await storageService.deleteSurebet(id);
    set((state) => ({
      surebets: state.surebets.filter((s) => s.id !== id),
      currentSurebet: state.currentSurebet?.id === id ? null : state.currentSurebet,
      view: state.currentSurebet?.id === id ? "list" : state.view
    }));
  },
  saveCurrent: async () => {
    const { currentSurebet } = get();
    if (!currentSurebet || !currentSurebet.id) return;
    set({ isLoading: true });
    try {
      await storageService.updateSurebet(currentSurebet.id, {
        notes: currentSurebet.notes
      });
      const surebets = await storageService.getAllSurebets();
      set({
        surebets,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao salvar",
        isLoading: false
      });
    }
  },
  refreshCurrentSurebet: async () => {
    const { currentSurebet } = get();
    if (!currentSurebet?.id) return;
    const refreshed = await storageService.getSurebetById(currentSurebet.id);
    if (refreshed) {
      set({ currentSurebet: refreshed });
      set((state) => ({
        surebets: state.surebets.map(
          (s) => s.id === refreshed.id ? refreshed : s
        )
      }));
    }
  },
  setView: (view) => set({ view }),
  setCurrentLegId: (legId) => set({ currentLegId: legId }),
  setIsExtracting: (isExtracting) => set({ isExtracting }),
  setError: (error) => set({ error }),
  loadApiKey: async () => {
    const apiKey = await storageService.getApiKey();
    set({ apiKey });
  },
  saveApiKey: async (key) => {
    await storageService.setApiKey(key);
    set({ apiKey: key });
  },
  goBack: () => {
    const { view, currentSurebet } = get();
    if (view === "editor" && currentSurebet) {
      get().saveCurrent();
    }
    set({ view: "list", currentSurebet: null, currentLegId: null });
  }
}));

function Header() {
  const { view, createSurebet, goBack, setView } = useSurebetStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between p-4 border-b border-border bg-surface", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      view !== "list" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: goBack,
          className: "p-1 hover:bg-slate-700 rounded transition-colors",
          title: "Voltar",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-lg font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🎯" }),
        view === "list" && "Surebet Tracker",
        view === "editor" && "Editar Surebet",
        view === "settings" && "Configurações"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: view === "list" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setView("settings"),
          className: "p-2 hover:bg-slate-700 rounded transition-colors",
          title: "Configurações",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "18",
              height: "18",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: createSurebet, className: "btn-primary flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Nova" })
      ] })
    ] }) })
  ] });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}
function formatDate(dateInput) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
function formatRelativeTime(dateInput) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 6e4);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) {
    return "agora";
  } else if (diffMins < 60) {
    return `há ${diffMins} min`;
  } else if (diffHours < 24) {
    return `há ${diffHours}h`;
  } else if (diffDays < 7) {
    return `há ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
  } else {
    return formatDate(date);
  }
}
function getStatusLabel(status) {
  const labels = {
    created: "Criada",
    in_progress: "Em Progresso",
    completed: "Completa"
  };
  return labels[status] || status;
}
function getLegStatusLabel(status) {
  const labels = {
    empty: "Vazio",
    captured: "Capturado",
    filled: "Preenchido"
  };
  return labels[status] || status;
}
function countFilledLegs(legs) {
  return legs.filter((l) => l.status === "filled").length;
}
function getEventNamePreview(legs) {
  const filledLeg = legs.find((l) => l.eventName);
  return filledLeg?.eventName || "Aguardando preenchimento";
}

function StatusBadge({ status, filledCount, totalCount }) {
  const colors = {
    created: {
      dot: "bg-slate-400",
      text: "text-slate-400"
    },
    in_progress: {
      dot: "bg-warning",
      text: "text-warning"
    },
    completed: {
      dot: "bg-success",
      text: "text-success"
    }
  };
  const { dot, text } = colors[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 text-sm ${text}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${dot}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: getStatusLabel(status) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-text-secondary", children: [
      "(",
      filledCount,
      "/",
      totalCount,
      " pernas)"
    ] })
  ] });
}

function SurebetCard({ surebet }) {
  const { selectSurebet, deleteSurebet } = useSurebetStore();
  const filledCount = countFilledLegs(surebet.legs);
  const eventName = getEventNamePreview(surebet.legs);
  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm("Tem certeza que deseja excluir esta surebet?")) {
      if (surebet.id) {
        deleteSurebet(surebet.id);
      }
    }
  };
  const handleSelect = () => {
    if (surebet.id) {
      selectSurebet(surebet.id);
    }
  };
  const getActionButton = () => {
    switch (surebet.status) {
      case "created":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSelect, className: "btn-primary text-sm", children: "Preencher" });
      case "in_progress":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSelect, className: "btn-primary text-sm", children: "Continuar" });
      case "completed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSelect, className: "btn-secondary text-sm", children: "Ver Detalhes" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-surface border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer",
      onClick: handleSelect,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusBadge,
          {
            status: surebet.status,
            filledCount,
            totalCount: surebet.legs.filter((l) => l.order <= 2).length + (surebet.legs[2]?.status !== "empty" ? 1 : 0)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-medium text-text-primary truncate", children: eventName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm text-text-secondary", children: [
          "Criado: ",
          formatRelativeTime(surebet.createdAt)
        ] }),
        surebet.status === "completed" && surebet.expectedProfit !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-success font-medium", children: [
          "Lucro Esperado: ",
          formatCurrency(surebet.expectedProfit)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
          getActionButton(),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleDelete, className: "btn-danger text-sm", children: "Excluir" })
        ] })
      ]
    }
  );
}

function SurebetList() {
  const { surebets, createSurebet } = useSurebetStore();
  if (surebets.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: "🎯" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium text-text-primary mb-2", children: "Nenhuma surebet ainda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-text-secondary mb-4", children: "Crie sua primeira surebet para começar a rastrear suas apostas de arbitragem." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createSurebet, className: "btn-primary", children: "+ Criar Surebet" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: surebets.map((surebet) => /* @__PURE__ */ jsxRuntimeExports.jsx(SurebetCard, { surebet }, surebet.id)) });
}

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const EXTRACTION_PROMPT = `
Você é um especialista em análise de betslips (comprovantes de apostas esportivas).

Analise a imagem do betslip e extraia as seguintes informações em formato JSON:

{
  "eventName": "Nome do evento/partida (ex: Real Madrid vs Barcelona)",
  "selection": "A seleção/entrada da aposta (ex: Real Madrid ML, Over 2.5 Goals, Handicap -1.5)",
  "odds": numero_decimal (ex: 2.15),
  "stake": valor_apostado_em_numero (ex: 100.00),
  "eventDate": "Data e hora do evento no formato YYYY-MM-DD HH:mm",
  "bookmaker": "Nome da casa de apostas se visível (ex: Bet365, Betano, 1xBet)",
  "confidence": numero_de_0_a_100 (sua confiança na extração)
}

REGRAS IMPORTANTES:
1. Se não conseguir identificar algum campo, use null
2. Odds devem estar em formato decimal (não fracionário)
3. Para stake, extraia apenas o número, sem símbolo de moeda
4. Se a data não estiver visível, use null
5. Seja preciso - é melhor retornar null do que um valor incorreto

Retorne APENAS o JSON, sem markdown ou explicações adicionais.
`;
async function extractBetslipData(imageBase64) {
  const apiKey = await storageService.getApiKey();
  if (!apiKey) {
    return {
      success: false,
      error: "API key não configurada. Vá para configurações."
    };
  }
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: EXTRACTION_PROMPT },
              {
                inline_data: {
                  mime_type: "image/png",
                  data: imageBase64.replace(/^data:image\/\w+;base64,/, "")
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024
        }
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }
    const result = await response.json();
    const textResponse = result.candidates[0]?.content?.parts[0]?.text;
    if (!textResponse) {
      throw new Error("Resposta vazia do Gemini");
    }
    const cleanedResponse = textResponse.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const data = JSON.parse(cleanedResponse);
    return {
      success: true,
      data,
      rawResponse: textResponse
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido"
    };
  }
}
async function extractWithRetry(imageBase64, maxRetries = 3) {
  let lastError = null;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await extractBetslipData(imageBase64);
    if (result.success) {
      return result;
    }
    lastError = result.error || "Erro desconhecido";
    if (!lastError.includes("network") && !lastError.includes("429") && !lastError.includes("500")) {
      return result;
    }
    await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1e3));
  }
  return {
    success: false,
    error: lastError || "Número máximo de tentativas excedido"
  };
}

function LegField({ leg, isRequired }) {
  const { updateLeg, apiKey } = useSurebetStore();
  const [isExpanded, setIsExpanded] = reactExports.useState(
    leg.status !== "empty" || leg.order <= 2
  );
  const [isCapturing, setIsCapturing] = reactExports.useState(false);
  const [isExtracting, setIsExtracting] = reactExports.useState(false);
  const [extractionError, setExtractionError] = reactExports.useState(null);
  const handleFieldChange = (field, value) => {
    if (!leg.id) return;
    const processedValue = ["odds", "stake"].includes(field) ? parseFloat(value) || 0 : value;
    updateLeg(leg.id, { [field]: processedValue });
  };
  const handleCaptureScreenshot = async () => {
    if (!apiKey) {
      setExtractionError("Configure a API key nas configurações primeiro.");
      return;
    }
    setIsCapturing(true);
    setExtractionError(null);
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });
      if (!tab?.id) {
        throw new Error("Não foi possível acessar a aba atual");
      }
      await chrome.runtime.sendMessage({
        type: "ACTIVATE_SNIP_TOOL",
        payload: { tabId: tab.id, legId: leg.id }
      });
      window.close();
    } catch (error) {
      setExtractionError(
        error instanceof Error ? error.message : "Erro ao iniciar captura"
      );
      setIsCapturing(false);
    }
  };
  const handleExtractFromScreenshot = async () => {
    if (!leg.screenshot || !leg.id) return;
    setIsExtracting(true);
    setExtractionError(null);
    try {
      const result = await extractWithRetry(leg.screenshot);
      if (result.success && result.data) {
        updateLeg(leg.id, result.data);
      } else {
        setExtractionError(result.error || "Erro na extração");
      }
    } catch (error) {
      setExtractionError(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    } finally {
      setIsExtracting(false);
    }
  };
  const statusColors = {
    empty: "bg-slate-600",
    captured: "bg-warning",
    filled: "bg-success"
  };
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };
  if (!isExpanded && !isRequired) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-surface border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors",
        onClick: () => setIsExpanded(true),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              className: "w-4 h-4 accent-primary",
              checked: false,
              onChange: () => setIsExpanded(true)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-secondary", children: "Adicionar terceira perna" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border rounded-lg p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium flex items-center gap-2", children: [
        "PERNA ",
        leg.order,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs px-2 py-0.5 rounded ${isRequired ? "bg-primary/20 text-primary" : "bg-slate-600/20 text-slate-400"}`,
            children: isRequired ? "Obrigatória" : "Opcional"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-2 h-2 rounded-full ${statusColors[leg.status]}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-secondary", children: getLegStatusLabel(leg.status) }),
        leg.confidence && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          "(",
          leg.confidence,
          "%)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        leg.screenshot ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-20 h-20 rounded border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: leg.screenshot,
            alt: "Screenshot",
            className: "w-full h-full object-cover"
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-20 h-20 rounded border border-dashed border-border flex items-center justify-center text-3xl text-text-secondary", children: "📷" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleCaptureScreenshot,
              disabled: isCapturing,
              className: "btn-secondary text-sm",
              children: isCapturing ? "Aguardando..." : leg.screenshot ? "Recapturar" : "Capturar Screenshot"
            }
          ),
          leg.screenshot && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleExtractFromScreenshot,
              disabled: isExtracting,
              className: "btn-primary text-sm",
              children: isExtracting ? "Extraindo..." : "Extrair com IA"
            }
          )
        ] })
      ] }),
      extractionError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-error", children: extractionError }),
      isExtracting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 text-sm text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" }),
        "Processando imagem com IA..."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-text-secondary mb-1", children: "Evento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Ex: Real Madrid vs Barcelona",
            value: leg.eventName || "",
            onChange: (e) => handleFieldChange("eventName", e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-text-secondary mb-1", children: "Seleção" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Ex: Real Madrid ML, Over 2.5 Goals",
            value: leg.selection || "",
            onChange: (e) => handleFieldChange("selection", e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-text-secondary mb-1", children: "Odd" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              step: "0.01",
              placeholder: "2.15",
              value: leg.odds || "",
              onChange: (e) => handleFieldChange("odds", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-text-secondary mb-1", children: "Stake" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              step: "0.01",
              placeholder: "100.00",
              value: leg.stake || "",
              onChange: (e) => handleFieldChange("stake", e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-text-secondary mb-1", children: "Data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              value: formatDateForInput(leg.eventDate),
              onChange: (e) => handleFieldChange("eventDate", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-text-secondary mb-1", children: "Casa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Bet365",
              value: leg.bookmaker || "",
              onChange: (e) => handleFieldChange("bookmaker", e.target.value)
            }
          )
        ] })
      ] }),
      leg.potentialReturn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-text-secondary", children: [
          "Retorno Potencial:",
          " "
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success font-medium", children: [
          "R$ ",
          leg.potentialReturn.toFixed(2)
        ] })
      ] })
    ] })
  ] });
}

function SurebetEditor() {
  const { currentSurebet, saveCurrent, isLoading } = useSurebetStore();
  if (!currentSurebet) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-text-secondary py-8", children: "Nenhuma surebet selecionada" });
  }
  const filledLegs = currentSurebet.legs.filter((l) => l.status === "filled");
  const totalStake = filledLegs.reduce((sum, leg) => sum + (leg.stake || 0), 0);
  const returns = filledLegs.filter((l) => l.potentialReturn !== void 0).map((l) => l.potentialReturn);
  const minReturn = returns.length > 0 ? Math.min(...returns) : 0;
  const expectedProfit = filledLegs.length >= 2 ? parseFloat((minReturn - totalStake).toFixed(2)) : 0;
  const profitPercentage = totalStake > 0 && filledLegs.length >= 2 ? (expectedProfit / totalStake * 100).toFixed(2) : "0.00";
  const handleSave = async () => {
    await saveCurrent();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    currentSurebet.legs.map((leg) => /* @__PURE__ */ jsxRuntimeExports.jsx(LegField, { leg, isRequired: leg.order <= 2 }, leg.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium mb-3 text-text-primary", children: "RESUMO" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-secondary", children: "Stake Total:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-primary font-medium", children: formatCurrency(totalStake) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-secondary", children: "Retorno Garantido:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-primary font-medium", children: formatCurrency(totalStake + expectedProfit) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-secondary", children: "Lucro Esperado:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `font-semibold ${expectedProfit >= 0 ? "text-success" : "text-error"}`,
              children: [
                formatCurrency(expectedProfit),
                " (",
                profitPercentage,
                "%)"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleSave,
        disabled: isLoading,
        className: "w-full btn-primary py-3 text-center",
        children: isLoading ? "Salvando..." : "Salvar Alterações"
      }
    )
  ] });
}

function Settings() {
  const { apiKey, saveApiKey } = useSurebetStore();
  const [inputKey, setInputKey] = reactExports.useState(apiKey || "");
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setInputKey(apiKey || "");
  }, [apiKey]);
  const handleSave = async () => {
    await saveApiKey(inputKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium mb-4 text-text-primary", children: "API do Google Gemini" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-text-secondary mb-4", children: [
        "Para usar a extração automática via IA, você precisa de uma chave de API do Google Gemini. Obtenha a sua em",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://aistudio.google.com/app/apikey",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary hover:underline",
            children: "Google AI Studio"
          }
        ),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-text-secondary mb-1", children: "Chave da API" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              value: inputKey,
              onChange: (e) => setInputKey(e.target.value),
              placeholder: "AIza...",
              className: "w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSave,
            className: `btn-primary w-full ${saved ? "bg-success" : ""}`,
            children: saved ? "✓ Salvo!" : "Salvar"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium mb-2 text-text-primary", children: "Sobre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-text-secondary", children: "Surebet Tracker Pro v1.0.0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-text-secondary mt-1", children: "Gerencie suas apostas de arbitragem com captura automática via IA." })
    ] })
  ] });
}

function App() {
  const { view, loadSurebets, loadApiKey, isLoading, error } = useSurebetStore();
  reactExports.useEffect(() => {
    loadSurebets();
    loadApiKey();
  }, [loadSurebets, loadApiKey]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[400px] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mt-2 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4", children: isLoading && view === "list" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      view === "list" && /* @__PURE__ */ jsxRuntimeExports.jsx(SurebetList, {}),
      view === "editor" && /* @__PURE__ */ jsxRuntimeExports.jsx(SurebetEditor, {}),
      view === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {})
    ] }) })
  ] });
}

client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React$2.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
