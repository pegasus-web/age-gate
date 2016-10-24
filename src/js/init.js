var pwagInit = (function(exports, d){

	function domReady(fn, ctx) {

		function onReady(event) {
			d.removeEventListener('DOMContentLoaded', onReady);
			fn.call(ctx || exports, event);
		}

		function onReadyIe(event) {
			if (d.readyState === 'complete') {
				d.detachEvent('onreadystatechange', onReadyIe);
				fn.call(ctx || exports, event);
			}
		}

		d.addEventListener && d.addEventListener('DOMContentLoaded', onReady) || d.attachEvent && d.attachEvent('onreadystatechange', onReadyIe);
    }

	domReady(function(){
		activateGate();
	});

	function activateGate(){
		if(pwagHelpers.getCookie('pwag')){
			return;
		}else{
			// Set body class to show age gate in UI
			pwagHelpers.addClassToElement(document.body, 'pwag-gate-enabled');

			if(pwagTemplate.config.type == 'birthday'){
				pwagBirthday.initGate();
				window.addEventListener('resize', pwagBirthday.windowResize);
			}else{
				pwagYesNo.initGate();
				window.addEventListener('resize', pwagYesNo.windowResize);
			}
			pwagLinks.initLinks();
		}
	}

})(window, document);