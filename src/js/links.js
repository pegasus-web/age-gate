var pwagLinks = (function(){

	// 'Private' variables
	var links = document.querySelectorAll('.pwag-terms__link');	// NodeList of links

	// 'Private' methods
	var initLinks = function() {
		bindClick();
	};

	function bindClick(){
		[].forEach.call(links, function(_this){
			_this.addEventListener('click', function(e) { 
				e.preventDefault();
				console.log(_this.href);
				pwagHelpers.ajaxRequest(_this.href);
			}, false);
		});
	}

	// 'Public' methods
	return {
		initLinks: initLinks
	};
})();