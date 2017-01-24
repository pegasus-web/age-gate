var pwagInit = (function(exports, d){
	var config = pwagTemplate.config;
	
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
		if(pwagHelpers.getCookie(config.cookieName)){
			return;
		}else{
			// Set body class to show age gate in UI and add IE8 class if necessary
			pwagHelpers.addClassToElement(document.body, 'pwag-gate-enabled pwag-ie8-' + pwagHelpers.isIE8());

			if(pwagTemplate.config.type == 'birthday'){
				pwagBirthday.initGate();
				if(window.addEventListener){
					window.addEventListener('resize', pwagBirthday.windowResize);
				}else{
					window.attachEvent('resize', function(){
						pwagBirthday.windowResize;
					});
				}

				if (pwagTemplate.config.socialNetworks) {
				    pwagSocialNetworks.init();
				}
			}else{
				pwagYesNo.initGate();
				if(window.addEventListener){
					window.addEventListener('resize', pwagYesNo.windowResize);
				}else{
					window.attachEvent('resize', function(){
						pwagYesNo.windowResize;
					});
				}
			}
			pwagLinks.initLinks();
		}
	}

})(window, document);
