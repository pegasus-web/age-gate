/*jshint multistr: true */
var pwagTemplate = (function(){

	// 'Private' variables
	var config = {
		logoURL: '',
		type: 'birthday',
		age: 18,
		placeholderYear: 'Y',
		placeholderMonth: 'M',
		placeholderDay: 'D',
		enterTextYear: 'Enter the year of your birth',
		enterTextMonth: 'Enter the month of your birth',
		enterTextDay: 'Enter the day of your birth',
		errorInvalidYear: 'The year you entered is invalid',
		errorInvalidMonth: 'The month you entered is invalid',
		errorInvalidDay: 'The day you entered is invalid',
		errorNotOldEnough: 'You are not old enough to enter this site',
		yesNoQuestion: 'Are you old enough to enter this site?',
		yes: 'Yes',
		no: 'No',
		errorYesNo: 'Please confirm that you are old enough to enter this site',
		termsText: '',
		termsLinkText: '',
		termsLinkURL: '',
		cookieName: 'pwag',
		cookieExpiry: 365,
		windowResizeThreshold: 100,
		delayBeforeOpenGate: 750
	};

	var configOverride = window.pwagConfig;

	// 'Merge' custom config values into defaults
	config = pwagHelpers.extendConfig(config, configOverride);

	var templateYesNo = '\
		<div class="pwag-clearfix pwag-yes-no">\
			<div class="pwag-yes-no__title"><p>' + config.yesNoQuestion + '</p></div>\
			<div class="pwag-yes-no__options">\
				<button class="pwag-yes-no__option pwag-yes-no__option--yes">' + config.yes + '</button>\
				<button class="pwag-yes-no__option pwag-yes-no__option--no">' + config.no + '</button>\
			</div>\
			<div class="pwag-clearfix pwag-feedback pwag-feedback--relative">\
				<span class="pwag-feedback__message pwag-feedback__message--no">' + config.errorYesNo + '</span>\
			</div>\
		</div>\
	';

	var templateBirthday = '\
		<div class="pwag-clearfix pwag-birthday-groups">\
			<div class="pwag-clearfix pwag-birthday-groups__inner">\
				<div class="pwag-birthday-group">\
					<p class="pwag-birthday-group__instruction">' + config.enterTextYear + '</p>\
					<div class="pwag-date-box pwag-date-box--valid pwag-date-box--0">\
						<span class="pwag-date-box__value">1</span>\
						<span class="pwag-date-box__placeholder">' + config.placeholderYear + '</span>\
						<input type="number" class="pwag-date-box__input" />\
					</div>\
					<div class="pwag-date-box pwag-date-box--valid pwag-date-box--1">\
						<span class="pwag-date-box__value">9</span>\
						<span class="pwag-date-box__placeholder">' + config.placeholderYear + '</span>\
						<input type="number" class="pwag-date-box__input" />\
					</div>\
					<div class="pwag-date-box pwag-date-box--2">\
						<span class="pwag-date-box__value"></span>\
						<span class="pwag-date-box__placeholder">' + config.placeholderYear + '</span>\
						<input type="number" class="pwag-date-box__input" />\
					</div>\
					<div class="pwag-date-box pwag-date-box--3">\
						<span class="pwag-date-box__value"></span>\
						<span class="pwag-date-box__placeholder">' + config.placeholderYear + '</span>\
						<input type="number" class="pwag-date-box__input" />\
					</div>\
				</div>\
				<div class="pwag-birthday-group">\
					<p class="pwag-birthday-group__instruction">' + config.enterTextMonth + '</p>\
					<div class="pwag-date-box pwag-date-box--4">\
						<span class="pwag-date-box__value"></span>\
						<span class="pwag-date-box__placeholder">' + config.placeholderMonth + '</span>\
						<input type="number" class="pwag-date-box__input" />\
					</div>\
					<div class="pwag-date-box pwag-date-box--5">\
						<span class="pwag-date-box__value"></span>\
						<span class="pwag-date-box__placeholder">' + config.placeholderMonth + '</span>\
						<input type="number" class="pwag-date-box__input" />\
					</div>\
				</div>\
				<div class="pwag-birthday-group">\
					<p class="pwag-birthday-group__instruction">' + config.enterTextDay + '</p>\
					<div class="pwag-date-box pwag-date-box--6">\
						<span class="pwag-date-box__value"></span>\
						<span class="pwag-date-box__placeholder">' + config.placeholderDay + '</span>\
						<input type="number" class="pwag-date-box__input" />\
					</div>\
					<div class="pwag-date-box pwag-date-box--7">\
						<span class="pwag-date-box__value"></span>\
						<span class="pwag-date-box__placeholder">' + config.placeholderDay + '</span>\
						<input type="number" class="pwag-date-box__input" />\
					</div>\
				</div>\
			</div>\
			<div class="pwag-clearfix pwag-feedback">\
				<span class="pwag-feedback__message pwag-feedback__message--year">' + config.errorInvalidYear + '</span>\
				<span class="pwag-feedback__message pwag-feedback__message--month">' + config.errorInvalidMonth + '</span>\
				<span class="pwag-feedback__message pwag-feedback__message--day">' + config.errorInvalidDay + '</span>\
				<span class="pwag-feedback__message pwag-feedback__message--notLegal">' + config.errorNotOldEnough + '</span>\
			</div>\
		</div>\
	';

	var templateLogo = function(){
		var rtn = '';
		logoURL = configOverride.logoURL;
		if(logoURL){
			rtn = '\
				<div class="pwag-logo">\
					<img src="' + logoURL + '">\
				</div>\
			';
		}
		return rtn;
	};

	var templateTerms = function(){
		var termsText = config.termsText;
		var termsLinkText = config.termsLinkText;
		var termsLinkURL = config.termsLinkURL;
		var rtn = '';

		if(termsText){
			rtn = termsText;
		}

		if(termsText && termsLinkText && termsLinkURL){
			rtn = parseLinks(termsText, termsLinkText, termsLinkURL);
		}

		if(rtn){
			rtn = '\
				<div class="pwag-clearfix pwag-terms">\
					<p>' + rtn + '</p>\
				</div>\
			';
		}
		return rtn;
	};

	var templateModal = function(){
		var rtn = '\
			<div class="pwag-modal">\
				<div class="pwag-modal__outer">\
					<div class="pwag-modal__inner">\
						<button class="pwag-modal__close">Close</button>\
						<div class="pwag-modal__content"></div>\
					</div>\
				</div>\
			</div>\
		';
		return rtn;
	};

	function parseLinks(orig, linkText, linkURLs){

		var linkTextArr = linkText.split(',');
		var linkURLArr = linkURLs.split(',');

		if(linkTextArr.length !== linkURLArr.length){
			return;
		}

		for (i = 0; i < linkTextArr.length; i++) {
			orig = orig.replace(linkTextArr[i], '<a href="' + linkURLArr[i] + '" class="pwag-terms__link">' + linkTextArr[i] + '</a>');
		}
		return orig;
	}

	var templateType = config.type == 'birthday' ? templateBirthday : templateYesNo;

	var templateMaster = '\
		<div class="pwag-gate">\
			<div class="pwag-gate__inner">\
				<div class="pwag-gate__content">\
					' + templateLogo() + '\
					' + templateType + '\
					' + templateTerms() + '\
				</div>\
			</div>\
		</div>\
		' + templateModal() + '\
	';

	// Render HTML to page before any selectors are instantiated
	pwagHelpers.appendHTML(document.body, templateMaster);

	// 'Public' methods
	return {
		config: config
	};
})();