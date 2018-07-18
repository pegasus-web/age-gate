var pwagLinks = (function(){

	// 'Private' variables
	var config = pwagTemplate.config;									// Config data from global variable
	var modalLinkClass = 'pwag-terms__link';							// CSS class of links which should open modal
	var links = document.querySelectorAll('.' + modalLinkClass);		// NodeList of links
	var linksArray = pwagHelpers.nodeListToArray(links);				// Array of links
	var modal = document.querySelector('.pwag-modal');					// Modal element
	var modalInner = document.querySelector('.pwag-modal__inner');		// Element within modal which contains content
	var modalContent = document.querySelector('.pwag-modal__content');	// Element within modal which contains content
	var closeModalBtn = document.querySelector('.pwag-modal__close');	// Close modal button

	// 'Private' methods
	var initLinks = function() {
		bindLinkClick();
		bindCloseModal();
	};

	function bindLinkClick(){
		for (var i = 0; i < linksArray.length; i++) {
			_thisItem = linksArray[i];
			if (_thisItem.addEventListener) {
				// Perform 'live' check on clicked element in case it was added to DOM after age gate init
				document.addEventListener('click', function (event) {
					// Only open age gate modal if gate is still in DOM
					var body = document.getElementsByTagName('body')[0];
					if(pwagHelpers.hasClass(body, 'pwag-gate-enabled')){
						var el = event.target;
						var isModalLink = pwagHelpers.hasClass(el, modalLinkClass);
						if(isModalLink){
							onLinkClick(event);
						}
					}
				}, false);
			}
			else {
				_thisItem.onclick = function(){
					onLinkClick;
				};
			}
		}
	}

	function onLinkClick(e){
		e.preventDefault();
		ajaxRequest(e.target.href);
	}

	function ajaxRequest(url){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function() {
			if(xhr.status === 200) {
				openModal(xhr.responseText);
			} else {
				openModal(xhr.status);
			}
		};
		xhr.send();
	}

	function openModal(content){
		modalContent.innerHTML = content;
		pwagHelpers.addClassToElement(modal, 'pwag-modal--visible');
		if(window.addEventListener){
			window.addEventListener('resize', windowResize);
		}else{
			window.attachEvent('resize', function(){
				windowResize;
			});
		}
		resizeModal();
	}

	function bindCloseModal(){
		
		// Close on background click
		if(modal.addEventListener){
			modal.addEventListener('click', function(event) {
				var isClickInside = modalContent.contains(event.target);
				if (!isClickInside) {
					closeModal();
				}
			});
		}else{
			modal.onclick = function(event) {
				var isClickInside = modalContent.contains(event.target);
				if (!isClickInside) {
					closeModal();
				}
			};
		}

		// Close on btn click
		if(closeModalBtn.addEventListener){
			closeModalBtn.addEventListener('click', function(e) { 
				e.preventDefault();
				closeModal();
			}, false);
		}else{
			closeModalBtn.onclick = function(e) { 
				e.preventDefault();
				closeModal();
			};
		}
	}

	function closeModal(){
		pwagHelpers.removeClassFromElement(modal, 'pwag-modal--visible');
	}

	function resizeModal(){
		modalContent.style.height = 'auto';		
		var winDims = pwagHelpers.getWindowDims();
		var winHeight = winDims.y;
		var modalInnerHeight = modalInner.offsetHeight;
		var modalContentHeight = modalContent.offsetHeight;
		var vPad = modalInnerHeight - modalContentHeight;

		if(winHeight < modalInnerHeight){
			modalContent.style.height = (winHeight - vPad) + 'px';
		}
	}

	var windowResize = pwagHelpers.debounce(function() {
		resizeModal();
	}, config.windowResizeThreshold);

	// 'Public' methods
	return {
		initLinks: initLinks,
		windowResize: windowResize
	};
});