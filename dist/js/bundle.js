/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	if (typeof document !== "undefined") {
	    var clockView = document.getElementsByClassName("clockView")[0];
	    // var clock2 = document.getElementsByClassName("clock")[0];
	    // createClock(clock);
	    // createClock(clock2);
	    // 
	    var clockDom = transformStringToDOM(__webpack_require__(5));
	    var clock = createClock(clockDom);
	    clockView.appendChild(clock);
	
	    var clockDom = transformStringToDOM(__webpack_require__(5));
	    var clock = createClock(clockDom);
	    clockView.appendChild(clock);
	}
	
	function createClock(clockDom) {
	    var clockDiv = clockDom.getElementsByClassName("clock")[0];
	
	    for (var i = 0; i < 60; i++) {
	        var tip = document.createElement("div");
	        tip.className = "tip ";
	
	        // If the tip is an hour
	        if (i % 5 === 0) {
	            tip.className += "hourTip";
	            var hourSpan = document.createElement("span");
	
	            // Every 5 tips we get an hour
	            var hour = i / 5;
	            // if the result is 0 return 12
	            var hourText = hour === 0 ? 12 : hour;
	            hourSpan.innerHTML = hourText;
	            hourSpan.style.transform = "rotate(" + (-i * 6) + "deg)";
	            tip.appendChild(hourSpan);
	
	            // Else it's minute
	        } else {
	            tip.className += "minuteTip";
	        }
	
	
	        tip.style.transform = "rotate(" + (i * 6) + "deg)";
	        clockDiv.appendChild(tip);
	    }
	
	    // Day: pm/am
	    var pm = clockDiv.getElementsByClassName('pm')[0];
	    var am = clockDiv.getElementsByClassName('am')[0];
	    pm.onclick = function() {
	        pm.className = "pm active";
	        am.className = "am";
	    };
	    am.onclick = function() {
	        am.className = "am active";
	        pm.className = "pm";
	    };
	
	
	    var hourBar = clockDiv.getElementsByClassName('hourBar')[0];
	    var minuteBar = clockDiv.getElementsByClassName('minuteBar')[0];
	
	
	
	    //  Hour input work 
	    var hourInput = clockDiv.getElementsByClassName('hourInput')[0];
	    var minuteInput = clockDiv.getElementsByClassName('minuteInput')[0];
	
	    hourInput.onkeyup = function(e) {
	        var degree = e.target.value * 30;
	        hourBar.style.transform = "rotate(" + degree + "deg)";
	    };
	    minuteInput.onkeyup = function(e) {
	        var degree = minuteInput.value * 6;
	        minuteBar.style.transform = "rotate(" + degree + "deg)";
	    };
	
	
	    // experiment 
	    hourBar.addEventListener("mousedown", function(e) {
	        clockDiv.addEventListener("mousemove", hourClockMouseMove, false);
	    });
	
	    hourBar.addEventListener("touchstart", function(e) {
	        clockDiv.addEventListener("touchmove", hourClockMouseMove, false);
	    });
	
	    // Minutes Events 
	    minuteBar.addEventListener("mousedown", function(e) {
	        clockDiv.addEventListener("mousemove", minuteClockMouseMove, false);
	    });
	    //MinutesBar Mobile 
	    minuteBar.addEventListener("touchstart", function(e) {
	        clockDiv.addEventListener("touchmove", minuteClockMouseMove, false);
	    });
	
	
	    clockDiv.onclick = function() {
	        clockDiv.removeEventListener("mousemove", hourClockMouseMove, false);
	        clockDiv.removeEventListener("mousemove", minuteClockMouseMove, false);
	        clockDiv.removeEventListener("touchmove", hourClockMouseMove, false);
	        clockDiv.removeEventListener("touchmove", minuteClockMouseMove, false);
	    };
	
	
	
	    // mousemove clock function 
	    function hourClockMouseMove(e) {
	        var degrees = getDegrees(e);
	        var inHours = Math.floor(degrees / 30);
	        var inDegrees = inHours * 30;
	        var hourDegree = inDegrees + 30;
	        hourBar.style.transform = "rotate(" + hourDegree + "deg)";
	        hourInput.value = hourDegree / 30;
	
	    }
	
	    // mousemove clock function 
	    function minuteClockMouseMove(e) {
	        var degrees = getDegrees(e);
	        var inMinutes = Math.floor(degrees / 6);
	        var inDegrees = inMinutes * 6;
	        var hourDegrees = inDegrees + 6;
	        minuteBar.style.transform = "rotate(" + hourDegrees + "deg)";
	        minuteInput.value = hourDegrees / 6 % 60;
	    }
	
	    function getDegrees(e) {
	        var x = e.pageX - clockDiv.offsetLeft;
	        var y = e.pageY - clockDiv.offsetTop;
	        var middleX = clockDiv.clientWidth / 2;
	        var middleY = clockDiv.clientHeight / 2;
	
	        console.log(clockDiv.offsetLeft, clockDiv.offsetTop);
	        console.log(e.pageX, e.pageY);
	        var cX = x - middleX;
	        var cY = middleY - y;
	
	        var angle = Math.atan2(cX, cY) * (180 / Math.PI);
	
	        // Convert degree from -/+ to 0-360 
	        var degrees = angle + Math.ceil(-angle / 360) * 360;
	
	        return degrees;
	    }
	
	    return clockDom; 
	}
	
	
	function transformStringToDOM(str){
	    var elm = document.createElement("div");
	    elm.innerHTML = str;
	    return elm.children[0]; 
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".clockContainer{\n  padding: 10px;\n  margin: 4px 10px;\n  width: 310px;\n  display: inline-table;\n  border-left: 3px solid #607D8B;\n  box-shadow: 0px 0px 1px #607D8B;\n  height: 100%;; \n}\n\n.clock{\n  background: #f2f2f2;\n  width: 200px;\n  position: relative;\n  height: 200px;\n  border: 3px solid #9E9E9E;\n  border-radius: 50%; \n  cursor: -webkit-grab;\n  box-shadow: 0px 0 0px black; \n}\n\n.tip{  \n  position: absolute;\n  background: black;\n  transform-origin: 50% 100px;\n  margin: 0 98px 200px;\n}\n.hourTip{ \n  height: 8px;\n  width: 4px;\n}\n.hourTip span{ \n  position: absolute;\n  top: 10px;\n  padding: -1px;\n  left: -3px;\n}\n.hourTip span::selection{\n  background: transparent;\n}\n.minuteTip{\n  height: 3px;\n  width: 1px;\n\n}\n\n.bar {\n  transform-origin: 50% bottom;\n  background: #009688;\n  position: absolute;\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n  box-shadow: 0px 3px 1px #000; \n}\n.hourBar {\n  /*z-index: 100; */\n  width: 6px;\n  transform: rotate(360deg);\n  height: 63px;\n  margin: 39px 98px 100px;\n}\n\n\n.minuteBar {      \n  transform: rotate(90deg);\n  height: 70px;\n  width: 4px;\n  margin: 30px 99px 74px;\n  \n}\n\n.clockCenter { \n  height: 10px; \n  position: absolute;\n  background: #607D8B;\n  margin: calc(50% - 4px);\n  width: 10px;\n  border-radius: 50%;\n  z-index: 1;\n  box-shadow: 0px -1px 0px #000;  \n}\n\n.one {\n  transform: rotate(30deg);\n}\n.tweleve{\n  transform: rotate(0deg);\n}\n\n.twoMin{\n  transform: rotate(6deg);\n}\n\n\n/* Controller */\n\n.day { \n  margin: 0;\n  list-style-type: none;\n  font-size: 12px;\n}\n.day li{\n  cursor: pointer;\n  display: inline-block;\n  padding: 2.5px 5px; \n}\n\n.day li.active{  \n  color: #fff;\n  background: #009688; \n}\n\n.clockInput {\n  float: left;  \n}\n\n\n.hourInput { \n  outline: 9;\n  width: 22px;\n  float: left; \n}\n\n.minuteInput {\n  width: 25px; \n}\n.open {\n  background: yellow; \n}\n\n.controller {\n  top: 10px;\n  position: absolute;\n  width: 120px;\n  padding: 1px;\n  background: #ccc;\n  left: 185px;\n  box-shadow: 2px 3px 4px black; \n\n}\n\n\n.addClock {\n    padding: 10px;\n    width: 310px;\n    /*display: inline-table;*/\n    border-left: 3px solid #607D8B;\n    box-shadow: 0px 0px 1px #607D8B;\n    height: 100%;\n    margin: 0px 10px;\n}\n\n.addClock input {\n  height: 20px; \n}\n.addClock button {\n  height: 25px;\n  background: black;\n  color: white; \n  outline: 0; \n  border: 1px solid transparent; \n  cursor: pointer;  \n}\n.close {\n  cursor: pointer;\n  top: -13px;\n  left: 299px;\n  position: absolute;\n  color: rgba(255, 255, 255, 0.73);\n  background: #607D8B;\n  padding: 3px;\n  \n}\n\n\n\n/* Validation styling */\ninput:required:invalid, input:focus:invalid {\n  /* insert your own styles for invalid form input */\n  -moz-box-shadow: none;\n  border-bottom: 1px solid red; \n}", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "    <div class=\"clockContainer\">\n        <div class=\"clock\">\n            <div class=\"bar hourBar\"></div>\n            <div class=\"clockCenter\"></div>\n            <div class=\"bar minuteBar\"></div>\n            <div class=\"controller\">\n                <!-- Input materials -->\n                <div class=\"clockInput\">\n                    <input required type=\"number\" min=\"0\" max=\"24\" class=\"hourInput required\"   placeholder=\"Hour\">\n                    <input required type=\"number\" min=\"0\" max=\"60\" class=\"minuteInput\" placeholder=\"Minutes\">\n                </div>\n                <ul class=\"day\">\n                    <li class=\"am active\">AM</li>\n                    <li class=\"pm\">PM</li>\n                </ul>\n            </div>\n        </div>\n    </div>"

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map