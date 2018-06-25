/*jshint multistr: true */
var pwagTemplate = (function () {

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
		errorUnableToGetSocialData: 'Unable to get your age from the provided social network',
		loginViaSocialMedia: 'or log in with:',
		yesNoQuestion: 'Are you old enough to enter this site?',
		yes: 'Yes',
		no: 'No',
		errorYesNo: 'Please confirm that you are old enough to enter this site',
		welcomeText: '',
		marketText: '',
		marketAliasSelected: '',
		markets: [],
		checkboxText: '',
		termsText: '',
		termsLinks: [],
		cookieName: 'pwag',
		cookieExpiry: 365,
		windowResizeThreshold: 100,
		delayBeforeOpenGate: 750,
		direction: '',
		domain: pwagHelpers.getDomain(),
		focusGroupIndex: 0,
		focusBoxIndex: 2,
		beforeRender: function(){},
		afterRender: function(){},
		beforeSuccess: function(){},
		afterSuccess: function(){},
		afterBypass: function(){}
	};

    var configOverride = window.pwagConfig;

	// 'Merge' custom config values into defaults
	config = pwagHelpers.extendConfig(config, configOverride);
	var direction = config.direction.toLowerCase();
	var socialNetworks = config.socialNetworks;

	var templateYesNo = '\
		<div class="pwag-clearfix pwag-yes-no">\
			<div class="pwag-yes-no__title pwag-instruction"><p>' + config.yesNoQuestion + '</p></div>\
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
				<div class="pwag-birthday-group pwag-birthday-group--y">\
					<p class="pwag-birthday-group__instruction pwag-instruction">' + config.enterTextYear + '</p>\
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
				<div class="pwag-birthday-group pwag-birthday-group--m">\
					<p class="pwag-birthday-group__instruction pwag-instruction">' + config.enterTextMonth + '</p>\
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
				<div class="pwag-birthday-group pwag-birthday-group--d">\
					<p class="pwag-birthday-group__instruction pwag-instruction">' + config.enterTextDay + '</p>\
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
				<span class="pwag-feedback__message pwag-feedback__message--unableToGetSocialData">' + config.errorUnableToGetSocialData + '</span>\
			</div>\
		</div>\
	';

	var templateLogo = function () {
		var rtn = '';
		logoURL = configOverride.logoURL;
		if (logoURL) {
			rtn = '\
				<div class="pwag-logo">\
					<img src="' + logoURL + '" class="pwag-logo__image">\
				</div>\
			';
		}
		return rtn;
	};

	var templateSocial = function(){
		return '<div class="pwag-social-container"></div>';
	};
	
	var templateCheckbox = function () {
		var checkboxText = config.checkboxText;
		var rtn = '';

		if (checkboxText) {
			rtn = checkboxText;
		}

		if (rtn) {
			rtn = '\
				<div class="pwag-clearfix pwag-checkbox">\
					<label class="pwag-checkbox__label">\
  						<input type="checkbox" class="pwag-checkbox__input"></input>\
						<div class="pwag-checkbox__faux"></div>\
						<p class="pwag-checkbox__text">' + rtn + '</p>\
					</label>\
				</div>\
			';
		}
		return rtn;
	};

	var templateTerms = function () {
		var termsText = config.termsText;
		var termsLinks = config.termsLinks;
		var rtn = '';

		if (termsText) {
			rtn = termsText;
		}

		if (termsText) {
			rtn = parseLinks(termsText, termsLinks);
		}

		if (rtn) {
			rtn = '\
				<div class="pwag-clearfix pwag-terms">\
					<p>' + rtn + '</p>\
				</div>\
			';
		}
		return rtn;
	};

	var templateMarketSelector = function(){
		var welcomeText = config.welcomeText;

		if(!welcomeText){
			return;
		}

		var marketText = config.marketText;
		var marketAliasSelected = config.marketAliasSelected;
		var markets = config.markets;
		var dropdown = parseSelect(welcomeText, marketText, markets, marketAliasSelected);
		var rtn = '<div class="pwag-markets"><p class="pwag-markets__text">' + dropdown + '</p></div>';
		return rtn;
	}

	var templateModal = function () {
		var rtn = '\
			<div class="pwag-modal pwag-modal--' + direction + '" dir="' + direction + '">\
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

	function parseLinks(orig, termsLinks) {
		for (i = 0; i < termsLinks.length; i++) {
			orig = pwagHelpers.replaceAll(orig, termsLinks[i].text, '<a href="' + termsLinks[i].url + '" class="pwag-terms__link">' + termsLinks[i].text + '</a>');
		}
		return orig;
	}

	function parseSelect(orig, text, options, selected) {

		if(!text || !options){
			return orig;
		}

		var selectList = document.createElement('select');
		
		for (i = 0; i < options.length; i++) {

			var _option = options[i];
			var label = _option.label;

			if(!label){
				return;
			}

			var alias = _option.alias;
			var icon = _option.icon;
			var link = _option.link;
			var option = document.createElement('option');
			var selectedItem = 0;
			option.text = label;
			option.value = alias;

			if (alias == selected) {
				option.defaultSelected = i;
			}

			if(icon){
				option.setAttribute('data-pwag-market-icon', icon);
			}

			if(link){
				option.setAttribute('data-pwag-market-link', link);
			}

			pwagHelpers.addClassToElement(option, 'pwag-markets__option');
			selectList.add(option);
		}
		pwagHelpers.addClassToElement(selectList, 'pwag-markets__select');
		selectList.id = 'pwag-marketselector';
		return pwagHelpers.replaceAll(orig, text, selectList.outerHTML);
	}

	function bindMarketSelectorEvents(){
		// Bind change handler to markets dropdown
		var marketSelector = document.getElementById('pwag-marketselector');
		if(marketSelector){
			pwagHelpers.addEventHandler(marketSelector, 'change', function(){
				var link = marketSelector.options[marketSelector.selectedIndex].getAttribute('data-pwag-market-link');
				if(link){
					window.location = link;
				}
			});	
		}
	}

	var templateType = config.type == 'birthday' ? templateBirthday : templateYesNo;

	var templateMaster = '\
		<div class="pwag-gate pwag-gate--' + direction + '" dir="' + direction + '">\
			<div class="pwag-gate__inner">\
				<div class="pwag-gate__content">\
					' + templateLogo() + '\
					' + templateMarketSelector() + '\
					' + templateType + '\
					' + templateSocial() + '\
					' + templateCheckbox() + '\
					' + templateTerms() + '\
				</div>\
			</div>\
		</div>\
		' + templateModal() + '\
	';

	if (!pwagHelpers.getCookie(config.cookieName)) {
		// Render HTML to page before any selectors are instantiated
		pwagHelpers.appendHTML(document.body, templateMaster);
		bindMarketSelectorEvents();
	}

	// 'Public' methods
	return {
		config: config
	};
});
