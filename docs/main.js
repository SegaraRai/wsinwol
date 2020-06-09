/*! For license information please see main.js.LICENSE.txt */
!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=1)}([function(t,n,e){t.exports=function(){"use strict";var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)},n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function e(t,n,e,r){var o,i,u,s=n||[0],a=(e=e||0)>>>3,c=-1===r?3:0;for(o=0;o<t.length;o+=1)i=(u=o+a)>>>2,s.length<=i&&s.push(0),s[i]|=t[o]<<8*(c+r*(u%4));return{value:s,binLen:8*t.length+e}}function r(t,r,o){switch(r){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(t){case"HEX":return function(t,n,e){return function(t,n,e,r){var o,i,u,s;if(0!=t.length%2)throw new Error("String of HEX type must be in byte increments");var a=n||[0],c=(e=e||0)>>>3,h=-1===r?3:0;for(o=0;o<t.length;o+=2){if(i=parseInt(t.substr(o,2),16),isNaN(i))throw new Error("String of HEX type contains invalid characters");for(u=(s=(o>>>1)+c)>>>2;a.length<=u;)a.push(0);a[u]|=i<<8*(h+r*(s%4))}return{value:a,binLen:4*t.length+e}}(t,n,e,o)};case"TEXT":return function(t,n,e){return function(t,n,e,r,o){var i,u,s,a,c,h,f,p,l=0,d=e||[0],m=(r=r||0)>>>3;if("UTF8"===n)for(f=-1===o?3:0,s=0;s<t.length;s+=1)for(u=[],128>(i=t.charCodeAt(s))?u.push(i):2048>i?(u.push(192|i>>>6),u.push(128|63&i)):55296>i||57344<=i?u.push(224|i>>>12,128|i>>>6&63,128|63&i):(s+=1,i=65536+((1023&i)<<10|1023&t.charCodeAt(s)),u.push(240|i>>>18,128|i>>>12&63,128|i>>>6&63,128|63&i)),a=0;a<u.length;a+=1){for(c=(h=l+m)>>>2;d.length<=c;)d.push(0);d[c]|=u[a]<<8*(f+o*(h%4)),l+=1}else for(f=-1===o?2:0,p="UTF16LE"===n&&1!==o||"UTF16LE"!==n&&1===o,s=0;s<t.length;s+=1){for(i=t.charCodeAt(s),!0===p&&(i=(a=255&i)<<8|i>>>8),c=(h=l+m)>>>2;d.length<=c;)d.push(0);d[c]|=i<<8*(f+o*(h%4)),l+=2}return{value:d,binLen:8*l+r}}(t,r,n,e,o)};case"B64":return function(t,e,r){return function(t,e,r,o){var i,u,s,a,c,h,f=0,p=e||[0],l=(r=r||0)>>>3,d=-1===o?3:0,m=t.indexOf("=");if(-1===t.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(t=t.replace(/=/g,""),-1!==m&&m<t.length)throw new Error("Invalid '=' found in base-64 string");for(i=0;i<t.length;i+=4){for(a=t.substr(i,4),s=0,u=0;u<a.length;u+=1)s|=n.indexOf(a.charAt(u))<<18-6*u;for(u=0;u<a.length-1;u+=1){for(c=(h=f+l)>>>2;p.length<=c;)p.push(0);p[c]|=(s>>>16-8*u&255)<<8*(d+o*(h%4)),f+=1}}return{value:p,binLen:8*f+r}}(t,e,r,o)};case"BYTES":return function(t,n,e){return function(t,n,e,r){var o,i,u,s,a=n||[0],c=(e=e||0)>>>3,h=-1===r?3:0;for(i=0;i<t.length;i+=1)o=t.charCodeAt(i),u=(s=i+c)>>>2,a.length<=u&&a.push(0),a[u]|=o<<8*(h+r*(s%4));return{value:a,binLen:8*t.length+e}}(t,n,e,o)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t,n,r){return function(t,n,r,o){return e(new Uint8Array(t),n,r,o)}(t,n,r,o)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t,n,r){return e(t,n,r,o)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function o(t,e,r,o){switch(t){case"HEX":return function(t){return function(t,n,e,r){var o,i,u="",s=n/8,a=-1===e?3:0;for(o=0;o<s;o+=1)i=t[o>>>2]>>>8*(a+e*(o%4)),u+="0123456789abcdef".charAt(i>>>4&15)+"0123456789abcdef".charAt(15&i);return r.outputUpper?u.toUpperCase():u}(t,e,r,o)};case"B64":return function(t){return function(t,e,r,o){var i,u,s,a,c,h="",f=e/8,p=-1===r?3:0;for(i=0;i<f;i+=3)for(a=i+1<f?t[i+1>>>2]:0,c=i+2<f?t[i+2>>>2]:0,s=(t[i>>>2]>>>8*(p+r*(i%4))&255)<<16|(a>>>8*(p+r*((i+1)%4))&255)<<8|c>>>8*(p+r*((i+2)%4))&255,u=0;u<4;u+=1)h+=8*i+6*u<=e?n.charAt(s>>>6*(3-u)&63):o.b64Pad;return h}(t,e,r,o)};case"BYTES":return function(t){return function(t,n,e){var r,o,i="",u=n/8,s=-1===e?3:0;for(r=0;r<u;r+=1)o=t[r>>>2]>>>8*(s+e*(r%4))&255,i+=String.fromCharCode(o);return i}(t,e,r)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t){return function(t,n,e){var r,o=n/8,i=new ArrayBuffer(o),u=new Uint8Array(i),s=-1===e?3:0;for(r=0;r<o;r+=1)u[r]=t[r>>>2]>>>8*(s+e*(r%4))&255;return i}(t,e,r)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t){return function(t,n,e){var r,o=n/8,i=-1===e?3:0,u=new Uint8Array(o);for(r=0;r<o;r+=1)u[r]=t[r>>>2]>>>8*(i+e*(r%4))&255;return u}(t,e,r)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}var i=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],u=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],s=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];function a(t){var n={outputUpper:!1,b64Pad:"=",outputLen:-1},e=t||{},r="Output length must be a multiple of 8";if(n.outputUpper=e.outputUpper||!1,e.b64Pad&&(n.b64Pad=e.b64Pad),e.outputLen){if(e.outputLen%8!=0)throw new Error(r);n.outputLen=e.outputLen}else if(e.shakeLen){if(e.shakeLen%8!=0)throw new Error(r);n.outputLen=e.shakeLen}if("boolean"!=typeof n.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof n.b64Pad)throw new Error("Invalid b64Pad formatting option");return n}function c(t,n){return t>>>n|t<<32-n}function h(t,n){return t>>>n}function f(t,n,e){return t&n^~t&e}function p(t,n,e){return t&n^t&e^n&e}function l(t){return c(t,2)^c(t,13)^c(t,22)}function d(t,n){var e=(65535&t)+(65535&n);return(65535&(t>>>16)+(n>>>16)+(e>>>16))<<16|65535&e}function m(t,n,e,r){var o=(65535&t)+(65535&n)+(65535&e)+(65535&r);return(65535&(t>>>16)+(n>>>16)+(e>>>16)+(r>>>16)+(o>>>16))<<16|65535&o}function v(t,n,e,r,o){var i=(65535&t)+(65535&n)+(65535&e)+(65535&r)+(65535&o);return(65535&(t>>>16)+(n>>>16)+(e>>>16)+(r>>>16)+(o>>>16)+(i>>>16))<<16|65535&i}function g(t){return c(t,7)^c(t,18)^h(t,3)}function w(t){return c(t,6)^c(t,11)^c(t,25)}function y(t){return"SHA-224"==t?u.slice():s.slice()}function A(t,n){var e,r,o,u,s,a,y,A,E,b,R,U,T=[];for(e=n[0],r=n[1],o=n[2],u=n[3],s=n[4],a=n[5],y=n[6],A=n[7],R=0;R<64;R+=1)T[R]=R<16?t[R]:m(c(U=T[R-2],17)^c(U,19)^h(U,10),T[R-7],g(T[R-15]),T[R-16]),E=v(A,w(s),f(s,a,y),i[R],T[R]),b=d(l(e),p(e,r,o)),A=y,y=a,a=s,s=d(u,E),u=o,o=r,r=e,e=d(E,b);return n[0]=d(e,n[0]),n[1]=d(r,n[1]),n[2]=d(o,n[2]),n[3]=d(u,n[3]),n[4]=d(s,n[4]),n[5]=d(a,n[5]),n[6]=d(y,n[6]),n[7]=d(A,n[7]),n}return function(n){function e(t,e,o){var i=this;if(0==("SHA-224"===t||"SHA-256"===t))throw new Error("Chosen SHA variant is not supported");var u=o||{};return(i=n.call(this,t,e,o)||this).t=i.i,i.o=!0,i.u=-1,i.s=r(i.h,i.v,i.u),i.A=A,i.p=function(t){return t.slice()},i.l=y,i.R=function(n,e,r,o){return function(t,n,e,r,o){for(var i,u=15+(n+65>>>9<<4),s=n+e;t.length<=u;)t.push(0);for(t[n>>>5]|=128<<24-n%32,t[u]=4294967295&s,t[u-1]=s/4294967296|0,i=0;i<t.length;i+=16)r=A(t.slice(i,i+16),r);return"SHA-224"===o?[r[0],r[1],r[2],r[3],r[4],r[5],r[6]]:r}(n,e,r,o,t)},i.U=y(t),i.T=512,i.m="SHA-224"===t?224:256,i.F=!1,u.hmacKey&&i.B(function(t,n,e,o){var i="hmacKey must include a value and format";if(!n)throw new Error(i);if(void 0===n.value||!n.format)throw new Error(i);return r(n.format,n.encoding||"UTF8",e)(n.value)}(0,u.hmacKey,i.u)),i}return function(n,e){function r(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}(e,n),e}(function(){function t(t,n,e){var r=e||{};if(this.h=n,this.v=r.encoding||"UTF8",this.numRounds=r.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.g=t,this.Y=[],this.H=0,this.S=!1,this.I=0,this.C=!1,this.L=[],this.N=[]}return t.prototype.update=function(t){var n,e=0,r=this.T>>>5,o=this.s(t,this.Y,this.H),i=o.binLen,u=o.value,s=i>>>5;for(n=0;n<s;n+=r)e+this.T<=i&&(this.U=this.A(u.slice(n,n+r),this.U),e+=this.T);this.I+=e,this.Y=u.slice(e>>>5),this.H=i%this.T,this.S=!0},t.prototype.getHash=function(t,n){var e,r,i=this.m,u=a(n);if(!0===this.F){if(-1===u.outputLen)throw new Error("Output length must be specified in options");i=u.outputLen}var s=o(t,i,this.u,u);if(!0===this.C&&this.t)return s(this.t(u));for(r=this.R(this.Y.slice(),this.H,this.I,this.p(this.U),i),e=1;e<this.numRounds;e+=1)!0===this.F&&i%32!=0&&(r[r.length-1]&=16777215>>>24-i%32),r=this.R(r,i,0,this.l(this.g),i);return s(r)},t.prototype.setHMACKey=function(t,n,e){if(!0!==this.o)throw new Error("Variant does not support HMAC");if(!0===this.S)throw new Error("Cannot set MAC key after calling update");var o=r(n,(e||{}).encoding||"UTF8",this.u);this.B(o(t))},t.prototype.B=function(t){var n,e=this.T>>>3,r=e/4-1;if(1!==this.numRounds)throw new Error("Cannot set numRounds with MAC");if(!0===this.C)throw new Error("MAC key already set");for(e<t.binLen/8&&(t.value=this.R(t.value,t.binLen,0,this.l(this.g),this.m));t.value.length<=r;)t.value.push(0);for(n=0;n<=r;n+=1)this.L[n]=909522486^t.value[n],this.N[n]=1549556828^t.value[n];this.U=this.A(this.L,this.U),this.I=this.T,this.C=!0},t.prototype.getHMAC=function(t,n){var e=a(n);return o(t,this.m,this.u,e)(this.i())},t.prototype.i=function(){var t;if(!1===this.C)throw new Error("Cannot call getHMAC without first setting MAC key");var n=this.R(this.Y.slice(),this.H,this.I,this.p(this.U),this.m);return t=this.A(this.N,this.l(this.g)),this.R(n,this.m,this.T,t,this.m)},t}())}()},function(t,n,e){"use strict";e.r(n);var r=e(0),o=e.n(r);e(2),e(3),e(4);function i(t){return t.replace(/^#/,"").split("&").map(t=>t.split("=").map(decodeURIComponent)).reduce((t,[n,e])=>({...t,[n]:e}),{})}function u(t){return Object.entries(t).map(t=>t.map(encodeURIComponent)).map(([t,n])=>`${t}=${n}`).join("&")}function s(){return Array.from(document.querySelectorAll('input[id^="v-"]')).reduce((t,n)=>({...t,[n.id.substr(2)]:n.value}),{})}function a(){return Math.floor(Date.now()/1e3+parseFloat(document.getElementById("vp-time-offset").value))}function c(t,n){const e=new o.a("SHA-256","TEXT",{hmacKey:{format:"TEXT",value:n}});return e.update(t),e.getHash("HEX").toLowerCase()}function h(t){const n=document.getElementById("error");n.innerText=t,n.classList.remove("d-none")}document.getElementById("wol-form").addEventListener("submit",(function(t){t.preventDefault();const n=s();location.hash=u(n),function(t,n,e,r){const o=new WebSocket(`wss://connect.websocket.in/v3/${encodeURIComponent(n)}?apiKey=${encodeURIComponent(t)}`);o.onerror=()=>{h(new Error("an error occured while establishing a WebSocket connection")),o.onclose=null,o.close()},o.onclose=()=>{h(new Error("connection closed before sending request"))},o.onopen=()=>{const t=(65536*Math.random()).toString(16),n=JSON.stringify({id:t,type:"client",time:a(),command:"wol",params:{macAddress:r}}),i=c(n,e);o.onmessage=n=>{const r=JSON.parse(String(n.data));if(!r||"string"!=typeof r.message||"string"!=typeof r.signature||c(r.message,e)!==r.signature)throw new Error("invalid signature");const i=JSON.parse(r.message);"server"===i.type&&i.id===t&&(i.error?alert("Server responded error: "+i.error):alert("Server responded ok"),setTimeout(()=>{o.onclose=void 0,o.close()},2e3))},o.send(JSON.stringify({message:n,signature:i}))}}(n.api,n.channel,n.secret,n.mac)})),function(t){for(const[n,e]of Object.entries(t)){const t=document.getElementById("v-"+n);t&&(t.value=e)}}(i(location.hash)),fetch("https://ntp-a1.nict.go.jp/cgi-bin/json?"+Date.now()/1e3).then(t=>t.json()).then(t=>{const n=t.st-(t.it+Date.now()/1e3)/2;document.getElementById("vp-time-offset").value=n.toFixed(3)}).catch(t=>{const n=document.getElementById("warning");n.innerText="Failed to fetch time offset\n"+t,n.classList.remove("d-none")})},function(t,n){},function(t,n,e){},function(t,n,e){}]);