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
	var delayBeforeOpenGate = 250; 											// Delay between validation and gate opening
	var windowResizeThreshold = 100;										// Debounce threshold for window resize event

	// 'Private' methods
	var _initGateYesNo = function() {
		bindClicks();
	};

	function bindClicks(){
		bindClickYes();
		bindClickNo();
	}

	function bindClickYes(){
		optionYes.addEventListener('click', function() { 
			initOpenGate();
		}, false);
	}

	function bindClickNo(){
		optionNo.addEventListener('click', function() { 
			console.log('No');
		}, false);
	}

	function initOpenGate() {
		// TODO: set cookie
		pwagHelpers.addClass(options, 'pwag-yes-no--success');
		setTimeout(openGate, delayBeforeOpenGate);
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
			gateElem.innerHTML = '';
			gateElem.remove();
		}, 450);
	}

	var initGate = function () {
		_initGateYesNo();
	};

	var windowResize = pwagHelpers.debounce(function() {
		console.log('windowResize');
	}, windowResizeThreshold);

	// 'Public' methods
	return {
		initGate: initGate,
		windowResize: windowResize
	};
})();