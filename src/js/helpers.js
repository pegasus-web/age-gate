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
			elements.forEach(function(element) {
				element.className += padString(className);
			});
		},
		addClassToElement: function(element, className){ // TODO: remove this function and refactor 'addClass' so it can accept single or multiple elements (get to bottom of weird typing issue)
			element.className += padString(className);
		},
		removeClass: function(elements, className){
			elements = this.nodeListToArray(elements);
			var rclass = getRegex(className);
			elements.forEach(function(element) {
				element.className = element.className.replace(rclass, ' ');
			});
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
			}
			return rtn;
		},
		text: function(elements, text){
			elements.forEach(function(element) {
				element.textContent = text;
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
		ajaxRequest: function(url){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = function() {
				if (xhr.status === 200) {
					alert('Cookie policy text returned: ' + xhr.responseText);
				}
				else {
					alert('Request failed.  Returned status of ' + xhr.status);
				}
			};
			xhr.send();
		}
	};

})();