!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(6),n(2),n(10)},function(e,t){function n(e,t){var n=e.className.split(" "),o=n.indexOf(t);o>=0&&(n.splice(o,1),e.className=n.join(" "))}e.exports={setAmPm:function(e,t){var o=e.getElementsByClassName("pm")[0],r=e.getElementsByClassName("am")[0],a=e.getElementsByClassName("clock")[0];"pm"===t.toLowerCase()?(n(a,"darkTheme"),o.className="pm active",r.className="am"):(r.className="am active",o.className="pm",-1===a.className.split(" ").indexOf("darkTheme")&&(a.className+=" darkTheme"))},setTime:function(e,t,n){var o=e.getElementsByClassName("hourBar")[0],r=e.getElementsByClassName("minuteBar")[0],a=e.getElementsByClassName("hourInput")[0],i=e.getElementsByClassName("minuteInput")[0];a.value=t,i.value=n;var s=6*i.value;r.style.transform="rotate("+s+"deg)";var u=30*a.value,l=this.adjustClock(u,s,a);o.style.transform="rotate("+l+"deg)"},setCity:function(e,t){var n=e.getElementsByClassName("location")[0];n.innerHTML=t},adjustClock:function(e,t,n){var o=t/360*30,r=e+o;return r}}},function(e,t,n){function o(e){var t=document.createElement("div");return t.innerHTML=e,t.children[0]}function r(e,t,r,u,l){var p=o(n(8)),c=a(p);return i.setTime(c,e,t),i.setAmPm(c,r),i.setCity(c,u),s.appendChild(c),c}var a=n(7),i=n(1),s=document.getElementsByClassName("clockView")[0];e.exports=r},function(e,t,n){var o=n(2),r=n(1),a=[],i=0;e.exports={addTimeZone:function(e,t){var n=moment(new Date).tz(e),r=n.format("h"),i=n.format("m"),s=n.format("a"),u=o(r,i,s,t);u.setAttribute("data-index",a.length),u.setAttribute("data-timezone",e),a.push({dom:u,timezone:e})},removeTimeZone:function(e){a[e].dom.remove(),a[e]=void 0},update:function(){if(!(0>=a||isNaN(i))){var e=a.concat([]),t=e[i],n={hour:t.dom.getElementsByClassName("hourInput")[0].value,minute:t.dom.getElementsByClassName("minuteInput")[0].value},o=t.dom.getElementsByClassName("active")[0].className;n.hour=Number.parseInt(n.hour),o.indexOf("pm")>-1?12!==n.hour&&(n.hour+=12,n.hour=24===n.hour?0:n.hour):o.indexOf("am")>-1&&12===n.hour&&(n.hour=0),e.splice(i,1);var s=moment.tz(n,t.timezone);e.forEach(function(e){if("undefined"!=typeof e){var t=s.clone().tz(e.timezone),n=t.format("h"),o=t.format("m"),a=t.format("a");r.setTime(e.dom,n,o),r.setAmPm(e.dom,a)}})}},setDefaultIndex:function(e){i=e},getTimeBaseOnTimeZone:function(){}}},function(e,t,n){t=e.exports=n(5)(),t.push([e.id,".clockContainer{display:inline-table;width:310px;height:100%;margin:4px 10px;padding:10px;border-left:3px solid #607d8b;border-radius:20px 2px;background:beige;box-shadow:0 0 1px #607d8b}.clock{position:relative;z-index:1;width:200px;height:200px;cursor:-webkit-grab;color:#000;border:3px solid #9e9e9e;border-radius:50%;background:#f2f2f2;box-shadow:0 0 0 #000}.tip{position:absolute;margin:0 98px 200px;transform-origin:50% 100px;background:#000}.hourTip{width:4px;height:8px}.hourTip span{position:absolute;top:10px;left:-3px;padding:-1px}.clockContainer{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.minuteTip{width:1px;height:3px}.bar{position:absolute;z-index:3;cursor:grabbing;cursor:-webkit-grabbing;transform-origin:50% bottom;background:#009688;box-shadow:0 3px 1px #000}.hourBar{width:7px;height:55px;margin:45px 98px 100px}.minuteBar{width:4px;height:70px;margin:30px 99px 74px}.clockCenter{position:absolute;z-index:1;width:10px;height:10px;margin:calc(50% - 4px);border-radius:50%;background:#607d8b;box-shadow:0 -1px 0 #000}.controller{position:absolute;top:0;left:190px;width:120px}.day{font-size:14px;width:100%;margin:0;list-style-type:none}ul.day{margin:1px;padding:1px;border-radius:10px;background:bisque}.day li{display:inline-block;width:40%;padding:2px 5px;cursor:pointer;text-align:center;border-radius:20px}.day li.active{color:#fff;background:#009688;box-shadow:-1px 1px 2px 0 #000}.clockInput{border:1px solid #f2f2f2}.clockInput input{font-size:15px;line-height:20px;width:41%;height:20px;margin:0;padding:3px;border:1px solid transparent;border-radius:31px;outline:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{margin:0;-webkit-appearance:none;-moz-appearance:textfield}input[type=number]{-moz-appearance:textfield}.hourInput{text-align:right}.hourInput:after{content:':'}.minuteInput{text-align:left}.clockInput input{height:20px}.cityInput{font-size:15px;font-weight:900;width:90%;height:30px;padding:5px;border:1px solid #f2f2f2;border-radius:10px;outline:0}.darkTheme{background:#000}.darkTheme>.tip{background:#ffeb3b}.darkTheme>.hourTip{color:#ffeb3b}.darkTheme>.bar{background:#ffeb3b}.close{position:absolute;top:-10px;left:-12px;padding:5px;cursor:pointer;color:hsla(0,0%,100%,.73);border-radius:14px 0;background:#607d8b;box-shadow:2px 0 1px 0 #666}.location{font-family:cursive;font-weight:900;z-index:2;top:62%;left:25%;text-align:center;color:#8bc34a;border-radius:10px;background:hsla(0,0%,100%,.16)}.location,button.currentTime{position:absolute;width:100px}button.currentTime{font-size:13px;top:170px;left:10px;padding:5px;cursor:pointer;text-transform:uppercase;color:#fff;border-radius:20px;outline:0;background:#009688}input:focus:invalid,input:required:invalid{border-bottom:2px solid #c36;-moz-box-shadow:none}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var a=this[r][0];"number"==typeof a&&(o[a]=!0)}for(r=0;r<t.length;r++){var i=t[r];"number"==typeof i[0]&&o[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},function(e,t,n){function o(e,t,n){var o=e+","+t,r="https://maps.googleapis.com/maps/api/timezone/json?location="+o+"&timestamp=1331766000",s=new XMLHttpRequest;s.open("GET",r,!0),s.onload=function(){if(s.status>=200&&s.status<400){var e=JSON.parse(s.responseText);a.addTimeZone(e.timeZoneId,n),i.blur(),setTimeout(function(){i.value="",i.focus()},50)}else console.log("something wrong with status")},s.onerror=function(){console.log("onerror")},s.send()}function r(){var e=document.getElementsByTagName("head")[0],t=document.createElement("script");t.type="text/javascript",t.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDm5N1VOb1DflM9ZDrjX_0BA3ATIRlwDaw&signed_in=true&libraries=places&callback=loadGoogleAPi",e.appendChild(t)}var a=n(3),i=document.getElementById("cityAutocomplete");window.loadGoogleAPi=function(){function e(){var e=t.getPlace(),n=e.geometry.location.lng(),r=e.geometry.location.lat();o(r,n,e.name)}var t=new window.google.maps.places.Autocomplete(i,{types:["(cities)"]});t.addListener("place_changed",e)},window.onload=r,e.exports={getTimeZone:o}},function(e,t,n){function o(e){for(var t=0;60>t;t++){var n=document.createElement("div");if(n.className="tip ",t%5===0){n.className+="hourTip";var o=document.createElement("span"),r=t/5,a=0===r?12:r;o.innerHTML=a,o.style.transform="rotate("+6*-t+"deg)",n.appendChild(o)}else n.className+="minuteTip";n.style.transform="rotate("+6*t+"deg)",e.appendChild(n)}}function r(e){function t(){var t=Number.parseInt(e.getAttribute("data-index"));u.setDefaultIndex(t),u.update()}function r(e){e.preventDefault();var t=s(e),n=Math.floor(t/30),o=30*n,r=o+30;g.style.transform="rotate("+r+"deg)",f.value=r/30}function i(e){e.preventDefault();var t=s(e),n=Math.floor(t/6),o=6*n,r=o+6;v.style.transform="rotate("+r+"deg)",h.value=r/6%60}function s(e){var t=e.pageX-l.offsetLeft,n=e.pageY-l.offsetTop,o=l.clientWidth/2,r=l.clientHeight/2,a=t-o,i=r-n,s=Math.atan2(a,i)*(180/Math.PI),u=s+360*Math.ceil(-s/360);return u}var u=n(3),l=e.getElementsByClassName("clock")[0];o(l);var p=l.getElementsByClassName("pm")[0],c=l.getElementsByClassName("am")[0];p.onclick=function(){a.setAmPm(e,"pm"),t()},c.onclick=function(){a.setAmPm(e,"am"),t()};var d=l.getElementsByClassName("close")[0];d.onclick=function(t){t.stopPropagation();var n=e.getAttribute("data-index");u.removeTimeZone(n)};var m=e.getElementsByClassName("currentTime")[0];m.onclick=function(n){var o=e.getAttribute("data-timezone"),r=moment(new Date).tz(o);a.setTime(e,r.format("h"),r.format("m")),a.setAmPm(e,r.format("a")),t()};var f=l.getElementsByClassName("hourInput")[0],h=l.getElementsByClassName("minuteInput")[0];f.onchange=function(n){a.setTime(e,f.value,h.value),t()},h.onchange=function(n){a.setTime(e,f.value,h.value),t()};var g=l.getElementsByClassName("hourBar")[0],v=l.getElementsByClassName("minuteBar")[0];return g.addEventListener("mousedown",function(e){l.addEventListener("mousemove",r,!1)}),v.addEventListener("mousedown",function(e){l.addEventListener("mousemove",i,!1)}),l.onmouseup=function(e){e.stopPropagation(),l.removeEventListener("mousemove",r,!1),l.removeEventListener("mousemove",i,!1),t()},e}var a=n(1);e.exports=r},function(e,t){e.exports='<div class="clockContainer">\n    <div class="clock">\n    <div class="close">x</div>\n        <div class="bar hourBar"></div>\n        <div class="clockCenter"></div>\n        <div class="bar minuteBar"></div>\n        <div class="location">Somewhere</div>\n        <div class="controller">\n            <!-- Input materials -->\n            <div class="clockInput">\n                <input required type="number" min="0" max="23" class="hourInput required"   placeholder="H">:<input required type="number" min="0" max="59" class="minuteInput" placeholder="M">\n            </div>\n            <ul class="day">\n                <li class="am active">AM</li>\n                <li class="pm">PM</li>\n            </ul>\n            <button class="currentTime">Time Now</button>\n        </div>\n    </div>\n</div>'},function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=m[o.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](o.parts[a]);for(;a<o.parts.length;a++)r.parts.push(l(o.parts[a],t))}else{for(var i=[],a=0;a<o.parts.length;a++)i.push(l(o.parts[a],t));m[o.id]={id:o.id,refs:1,parts:i}}}}function r(e){for(var t=[],n={},o=0;o<e.length;o++){var r=e[o],a=r[0],i=r[1],s=r[2],u=r[3],l={css:i,media:s,sourceMap:u};n[a]?n[a].parts.push(l):t.push(n[a]={id:a,parts:[l]})}return t}function a(e,t){var n=g(),o=b[b.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function i(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",a(e,t),t}function u(e){var t=document.createElement("link");return t.rel="stylesheet",a(e,t),t}function l(e,t){var n,o,r;if(t.singleton){var a=x++;n=v||(v=s(t)),o=p.bind(null,n,a,!1),r=p.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=u(t),o=d.bind(null,n),r=function(){i(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),o=c.bind(null,n),r=function(){i(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}function p(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=y(t,r);else{var a=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function c(e,t){var n=t.css,o=t.media;t.sourceMap;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function d(e,t){var n=t.css,o=(t.media,t.sourceMap);o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var r=new Blob([n],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(r),a&&URL.revokeObjectURL(a)}var m={},f=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),g=f(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,x=0,b=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=r(e);return o(n,t),function(e){for(var a=[],i=0;i<n.length;i++){var s=n[i],u=m[s.id];u.refs--,a.push(u)}if(e){var l=r(e);o(l,t)}for(var i=0;i<a.length;i++){var u=a[i];if(0===u.refs){for(var p=0;p<u.parts.length;p++)u.parts[p]();delete m[u.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var o=n(4);"string"==typeof o&&(o=[[e.id,o,""]]);n(9)(o,{});o.locals&&(e.exports=o.locals)}]);
//# sourceMappingURL=bundle.js.map