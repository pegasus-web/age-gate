var pwagLinks = (function(){

	// 'Private' variables
	var config = pwagTemplate.config;									// Config data from global variable
	var links = document.querySelectorAll('.pwag-terms__link');			// NodeList of links
	var modal = document.querySelector('.pwag-modal');					// Modal element
	var modalContent = document.querySelector('.pwag-modal__content');	// Element within modal which contains content
	var closeModalBtn = document.querySelector('.pwag-modal__close');		// Close modal button

	// 'Private' methods
	var initLinks = function() {
		bindLinkClick();
		bindCloseModal();
	};

	function bindLinkClick(){
		[].forEach.call(links, function(_this){
			_this.addEventListener('click', function(e) { 
				e.preventDefault();
				ajaxRequest(_this.href);
			}, false);
		});
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
	}

	function bindCloseModal(){
		
		// Close on background click
		modal.addEventListener('click', function(event) {
			var isClickInside = modalContent.contains(event.target);
			if (!isClickInside) {
				closeModal();
			}
		});

		// Close on btn click
		closeModalBtn.addEventListener('click', function(e) { 
			e.preventDefault();
			closeModal();
		}, false);
	}

	function closeModal(){
		pwagHelpers.removeClassFromElement(modal, 'pwag-modal--visible');
	}

	function resizeModal(){
		console.log('Modal resized - update it');
	}

	var windowResize = pwagHelpers.debounce(function() {
		resizeModal();
	}, config.windowResizeThreshold);


	// 'Public' methods
	return {
		initLinks: initLinks
	};
})();