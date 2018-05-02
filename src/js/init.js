var pwagInit = (function(exports, d){
	var config;

	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function(){
			document.removeEventListener('DOMContentLoaded', arguments.callee, false);
			domReady();
		}, false);
	} else if (document.attachEvent) {
		document.attachEvent('onreadystatechange', function(){
			if (document.readyState === 'complete') {
				document.detachEvent('onreadystatechange', arguments.callee);
				domReady();
			}
		});
	}	

	function domReady(){
		pwagHelpers = pwagHelpers();
		pwagTemplate = pwagTemplate();
		config = pwagTemplate.config;
		pwagBirthday = pwagBirthday();
		pwagYesNo = pwagYesNo();
		pwagLinks = pwagLinks();
		pwagSocialNetworks = pwagSocialNetworks();
		activateGate();
	}

	function activateGate(){
		if(pwagHelpers.getCookie(config.cookieName)){
			return;
		}else{
			config.beforeRender();
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
			config.afterRender();
		}
	}

})(window, document);
