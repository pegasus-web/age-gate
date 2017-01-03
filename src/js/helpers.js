var pwagHelpers = (function(){

	// 'Private' variables
    var s = '(\\s|^)';		// Space or start
    var e = '(\\s|$)';		// Space or end
	var enableLogging = true;

	// 'Private' methods
    var getRegex = function(className){
        return new RegExp(s + className + e, 'g');
    };

	var padString = function(string){
		return ' ' + string + ' ';
	};

	// 'Public' methods

	// Extend array prototype to support 'forEach' (for IE8)
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(callback, thisArg) {
			var T, k;
			if (this == null) {
				throw new TypeError(' this is null or not defined');
			}
			var O = Object(this);
			var len = O.length >>> 0;
			if (typeof callback !== "function") {
				throw new TypeError(callback + ' is not a function');
			}
			if (arguments.length > 1) {
				T = thisArg;
			}
			k = 0;
			while (k < len) {
				var kValue;
				if (k in O) {
					kValue = O[k];
					callback.call(T, kValue, k, O);
				}
				k++;
			}
		};
	}


	return {
		appendHTML: function(element, string) {
			var div = document.createElement('div');
			div.innerHTML = string;
			while (div.children.length > 0) {
				element.appendChild(div.children[0]);
			}
		},
		appendCSS: function(href) {
			var link = document.createElement('link');
			link.href = href;
			link.type = 'text/css';
			link.rel = 'stylesheet';
			document.getElementsByTagName('head')[0].appendChild(link);
		},
		extendConfig: function(original, override){ // Note this is not recursive, so will only cope with a single level of config data
			for(var key in override)
			if(override.hasOwnProperty(key)){
				original[key] = override[key];
			}
			return original;
		},
		addClass: function(elements, className){
			elements = this.nodeListToArray(elements);
			for (var i = 0; i < elements.length; i++) {
				elements[i].className += padString(className);				
			}
		},
		addClassToElement: function(element, className){ // TODO: remove this function and refactor 'addClass' so it can accept single or multiple elements (get to bottom of weird typing issue)
			element.className += padString(className);
		},
		removeClass: function(elements, className){
			elements = this.nodeListToArray(elements);
			var rclass = getRegex(className);
			for (var i = 0; i < elements.length; i++) {
				elements[i].className = elements[i].className.replace(rclass, ' ');
			}
		},
		removeClassFromElement: function(element, className){ // TODO: remove this function and refactor 'removeClass' so it can accept single or multiple elements (get to bottom of weird typing issue)
			var rclass = getRegex(className);
			element.className = element.className.replace(rclass, ' ');
		},
		nodeListToArray: function(nodeList){
			// Only convert to array if object is a nodeList (otherwise assumed to be array)
			var rtn = nodeList;
			if(NodeList.prototype.isPrototypeOf(nodeList)){
				rtn = Array.prototype.slice.call(nodeList,0);
			}else{
				var tempArr = [];
				for (var i = 0; i < nodeList.length; i++) {
					tempArr.push(nodeList[i]);
				}
				rtn = tempArr;
			}
			return rtn;
		},
		text: function(elements, text){
			elements.forEach(function(element) {
				if (pwagHelpers.isIE8()) {
					element.textContent = text;
				}else{
					element.innerText = text;
				}
			});
		},
		index: function(element){
			return [].slice.call(element.parentNode.children).indexOf(element);
		},
		consoleLog: function(text){
			if(enableLogging){
				console.log(text);
			}
		},
		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				}, wait);
				if (immediate && !timeout) func.apply(context, args);
			};
		},
		getCookie: function(name) {
			var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
			return v ? v[2] : null;
		},
		setCookie: function(name, value, days) {
			var d = new Date();
			d.setTime(d.getTime() + 24*60*60*1000*days);
			document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
		},
		getWindowDims: function(){
			var w = window,
				d = document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth,
				y = w.innerHeight || e.clientHeight || g.clientHeight;
			var winDims = {};
			winDims.x = x;
			winDims.y = y;
			return winDims;
		},
		getWidth: function (el) {
			if (typeof getComputedStyle !== 'undefined') {
				return getComputedStyle(el, null).getPropertyValue('width');
			} else {
				return el.offsetWidth;
			}
		},
		isIE8: function(){
			if (window.attachEvent && !window.addEventListener) {
				return true;
			}else{
				return false;
			}
		}
	};

})();