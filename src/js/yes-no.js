var pwagYesNo = (function(){

	if(pwagTemplate.config.type !== 'yes-no'){
		return;
	}

	// 'Private' variables
	var config = pwagTemplate.config;										// Config data from global variable
	var gateElem = document.querySelector('.pwag-gate');					// Gate element
	var options = document.querySelectorAll('.pwag-yes-no__option');		// NodeList of groups of date inputs
	var optionYes = document.querySelector('.pwag-yes-no__option--yes');	// NodeList of groups of date inputs
	var optionNo = document.querySelector('.pwag-yes-no__option--no');		// NodeList of groups of date inputs

	// 'Private' methods
	var _initGateYesNo = function() {
		bindClicks();
	};

	function bindClicks(){
		bindClickYes();
		bindClickNo();
	}

	function bindClickYes(){
		if(optionYes.addEventListener){
			optionYes.addEventListener('click', function() { 
				verify();
			}, false);
		}else{
			optionYes.onclick = function() { 
				verify();
			};
		}
	}

	function verify(){
		if(validateCheckbox()){
			hideErrors();
			initOpenGate();	
		}else{
			showCheckboxError();
		}
	}

	function bindClickNo(){
		if(optionNo.addEventListener){
			optionNo.addEventListener('click', function() { 
				showError('no');
			}, false);
		}else{
			optionNo.onclick = function() { 
				showError('no');
			};
		}
	}

	function validateCheckbox() {
		if(config.checkboxText && !document.querySelector('.pwag-checkbox__input').checked){
			return false;
		}
		return true;
	}

	function showError(messageId) {
		pwagHelpers.addClassToElement(document.querySelector('.pwag-feedback'), 'pwag-show');
		pwagHelpers.addClassToElement(document.querySelector('.pwag-feedback__message'), 'pwag-show');
	}

	function showCheckboxError(){
		if(config.checkboxText){
			var checkbox = document.querySelector('.pwag-checkbox');
			pwagHelpers.addClassToElement(checkbox, 'pwag-checkbox--invalid');
			checkbox.scrollIntoView();
		}
	}

	function hideErrors() {
		pwagHelpers.removeClass(document.querySelector('.pwag-feedback'), 'pwag-show');
		pwagHelpers.removeClass(document.querySelectorAll('.pwag-feedback__message'), 'pwag-show');
		if(config.checkboxText){
			pwagHelpers.removeClass(document.querySelector('.pwag-checkbox'), 'pwag-checkbox--invalid');
		}
	}

	function initOpenGate() {
		config.beforeSuccess();
		pwagHelpers.setCookie(config.cookieName, true, config.cookieExpiry, config.domain);
		pwagHelpers.addClass(options, 'pwag-yes-no--success');
		setTimeout(openGate, config.delayBeforeOpenGate);
	}

	function openGate() {
		var	w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;

		gateElem.style.transform = 'translate(0px, ' + (-windowHeight) + 'px)';

		setTimeout(function () {
			pwagHelpers.removeClassFromElement(document.querySelector('body'), 'pwag-gate-enabled');
			pwagHelpers.dispose();
			config.afterSuccess();
		}, 450);
	}

	var initGate = function () {
		_initGateYesNo();
	};

	// 'Public' methods
	return {
		initGate: initGate
	};
});