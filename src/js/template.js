/*jshint multistr: true */
var pwagTemplate = (function(){
	pwagHelpers.consoleLog('pwagTemplate');
	var config = {
		type: "birthday",
		age: 18,
		placeholderYear: "Y",
		placeholderMonth: "M",
		placeholderDay: "D",
		enterTextYear: "Enter the year of your birth",
		enterTextMonth: "Enter the month of your birth",
		enterTextDay: "Enter the day of your birth",
		errorInvalidYear: "The year you entered is invalid",
		errorInvalidMonth: "The month you entered is invalid",
		errorInvalidDay: "The day you entered is invalid",
		errorNotOldEnough: "You are not old enough to enter this site"
	};

	var configOverride = window.pwagConfig;

	// 'Merge' custom config values into core
	config = pwagHelpers.extendConfig(config, configOverride);

	// Render CSS to page
	/*
		To do: See if there's a way to dynamically add CSS via JS which is as reliable as loading in HTML.
		The problem currently is that if CSS is loaded via JS, positionings of UI elements are wrong.
	*/
	//pwagHelpers.appendCSS('pwag.css');

	// 'Private' variables
	var templateBirthday = '\
		<section class="pwag-clearfix pwag-birthday-groups">\
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
		</section>\
	';

	var templateMaster = '\
		<div class="pwag-gate">\
			<div class="pwag-gate__inner">\
				<div class="pwag-gate__content">\
					<div class="pwag-logo">\
						<img src="http://placehold.it/100x80">\
					</div>\
					' + templateBirthday + '\
					<div class="pwag-clearfix pwag-terms">\
						<p>By submitting this form, you agree to the Cookie and Privacy policy. To learn more, please read our <a href="#" data-toggle="modal" data-target="#modalCookie">cookie</a> and <a href="#" data-toggle="modal" data-target="#modalPrivacyPolicy">privacy policy</a>.</p>\
					</div>\
				</div>\
			</div>\
		</div>\
	';

	// Render HTML to page before any selectors are instantiated
	pwagHelpers.appendHTML(document.body, templateMaster);
})();