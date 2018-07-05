var pwagSocialNetworks = (function() {

	// 'Private' variables
	var config = pwagTemplate.config; // Config data from global variable
	var redirectPage = window.location.href;
	var gateElem = document.querySelector('.pwag-gate');
	var socialContainer = document.querySelector('.pwag-social-container');

	var init = function() {
		var socialNetWorks = {};
		
		for (var i = 0; i < config.socialNetworks.length; i++) {
			socialNetWorks[config.socialNetworks[i].name] = config.socialNetworks[i].clientId;
		}
	
		hello.init(socialNetWorks, {
			redirect_uri: redirectPage
		});

		// Inject mark-up is here (rather than in the 'template.js' file)
		// to allow future updates to pull back user profile information
		// e.g. name/avatar for already-logged-in users. This info is not
		// available without deeper/server-side auth processes.
		injectMarkUp();
	};

	var login = function(network) {
		var options = getLoginOptionsByNetwork(network);
		hello(network).login(options);
	};

	var logout = function(network) {
		hello(network).logout();
	};
	// not used atm.
	// var isLoggedIn = function(network) {
	// 	return hello.getAuthResponse(network);
	// };

	var getLoginOptionsByNetwork = function(network) {
		switch (network) {
			case 'windows':
				return {
					scope: 'wl.birthday'
				};
			default:
				return {};
		}
	};

	hello.on('auth.login', function(auth) {
		switch (auth.network) {
			case 'facebook':
				authentication.viaFacebook();
				break;
			case 'google':
				authentication.viaGoogle();
				break;
			case 'windows':
				authentication.viaWindows();
				break;
				// case 'twitter':
				//     authentication.viaTwitter();
				//     break;
		}
	});

	var authentication = {
		viaFacebook: function() {
			hello('facebook').api('me', {
				fields: 'id,name,age_range'
			}).then(function(r) {
				var ageRange = r.age_range;
				if (!ageRange || !ageRange.min) {
					validateAge(-1, 'facebook');
				} else {
					validateAge(ageRange.min, 'facebook');
				}
				logout('facebook');
			});
		},
		viaGoogle: function() {
			hello('google').api('me').then(function(r) {
				if (!r.birthday) {
					validateAge(-1, 'google');
				} else {
					var birthday = new Date(r.birthday);
					var age = getAgeByBirthDate(birthday);

					validateAge(age, 'google');
				}
				logout('google');
			});
		},
		// viaTwitter: function () {
		//     hello('twitter').api('me').then(function (r) {
		//         console.log(r);
		//         logout('twitter');
		//     });
		// },
		viaWindows: function() {
			hello('windows').api('me').then(function(r) {
				if (!r.birth_year || !r.birth_month || !r.birth_day) {
					validateAge(-1, 'windows');
				} else {
					var birthDayPropertiesInDateFormat = r.birth_year + '-' + r.birth_month + '-' + r.birth_day;
					var birthday = new Date(birthDayPropertiesInDateFormat);
					var age = getAgeByBirthDate(birthday);

					validateAge(age, 'windows');
				}

				logout('windows');
			});
		}
	};

	var getAgeByBirthDate = function(birthday) {
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // Milliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};

	var socialButtons = function() {
		var networkMarkUp = '';
		var network;
		for (var i = 0; i < config.socialNetworks.length; i++) {
			network = config.socialNetworks[i];
			networkMarkUp += '<button onclick="pwagSocialNetworks.login(\'' + network.name + '\')" class="pwag-social__button pwag-social__button--' + network.name + '">' + network.label + '</button>';
		}
		return networkMarkUp;
	};

	var templateSocialNetworks = function() {
		return '<div class="pwag-clearfix pwag-social"><p class="pwag-social__message">' + config.loginViaSocialMedia + '</p>' + socialButtons() + '</div>';
	};

	function injectMarkUp() {
		pwagHelpers.appendHTML(socialContainer, templateSocialNetworks());
	}

	function validateCheckbox() {
		if(config.checkboxText && !document.querySelector('.pwag-checkbox__input').checked){
			return false;
		}
		return true;
	}

	var validateAge = function(age) {
		if (age >= config.age) {
			if(validateCheckbox()){
				initOpenGate();
			}else{
				showCheckboxError();
			}
		} else if (age == -1) {
			showError('unableToGetSocialData');
		} else {
			showError('notLegal');
		}
	};

	function showError(messageId) {
		pwagHelpers.addClassToElement(document.querySelector('.pwag-feedback__message--' + messageId), 'pwag-show');
	}

	function showCheckboxError(){
		if(config.checkboxText){
			var checkbox = document.querySelector('.pwag-checkbox');
			pwagHelpers.addClassToElement(checkbox, 'pwag-checkbox--invalid');
			checkbox.scrollIntoView();
		}
	}

	function initOpenGate() {
		config.beforeSuccess();
		pwagHelpers.setCookie(config.cookieName, true, config.cookieExpiry, config.domain);
		setTimeout(openGate, config.delayBeforeOpenGate);
	}

	function openGate() {
		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;

		gateElem.style.transform = 'translate(0px, ' + (-windowHeight) + 'px)';

		setTimeout(function() {
			pwagHelpers.removeClassFromElement(document.querySelector('body'), 'pwag-gate-enabled');
			pwagHelpers.dispose();
			config.afterSuccess();
		}, 450);
	}

	return {
		init: init,
		login: login
	};
});
