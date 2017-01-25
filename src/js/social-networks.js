var pwagSocialNetworks = (function () {

    // 'Private' variables
    var config = pwagTemplate.config;													// Config data from global variable
    var redirectPage = window.location.href;
    var gateElem = document.querySelector('.pwag-gate');
    var socialContainer = document.querySelector('.pwag-social-container');

    var init = function () {
        hello.init(config.socialNetworks, { redirect_uri: redirectPage });

        // Inject mark-up is here (rather than in the 'template.js' file)
        // to allow future updates to pull back user profile information
        // e.g. name/avatar for already-logged-in users. This info is not
        // available without deeper/server-side auth processes.
        injectMarkUp();
    };

    var login = function(network) {
        hello(network).login();
    };
    
    var logout = function (network) {
        hello(network).logout();
    };

    var isLoggedIn = function(network){
        return hello.getAuthResponse(network);
    };

    hello.on('auth.login', function (auth) {
        switch (auth.network) {
            case 'facebook':
                authentication.viaFacebook();
                break;
            case 'google':
                authentication.viaGoogle();
                break;
        }
    });

    var authentication = {
        viaFacebook: function() {
            hello('facebook').api('me', { fields: 'id,name,age_range' }).then(function (r) {
                var ageRange = r.age_range;
                if (!ageRange || !ageRange.min) {
                    validateAge(-1, 'facebook');
                } else {
                    validateAge(ageRange.min, 'facebook');
                }
                logout('facebook');
            });
        },
        viaGoogle: function () {
           hello('google').api('me').then(function (r) {
                if (!r.birthday) {
                    validateAge(-1, 'google');
                } else {
                    var birthday = new Date(r.birthday);
                    var ageDifMs = Date.now() - birthday.getTime();
                    var ageDate = new Date(ageDifMs); // Milliseconds from epoch
                    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

                    validateAge(age, 'google');
                }
                logout('google');
            });
        }
    };

    var socialButtons = function() {
		var networkMarkUp = '';
		for (var network in config.socialNetworks) {
			networkMarkUp += '<a href="#" onclick="pwagSocialNetworks.login(\'' + network + '\')" class="pwag-social__button pwag-social__button--' + network + '">' + network + '</a>';
		}
		return networkMarkUp;
	};

	var templateSocialNetworks = function () {
		return '<div class="pwag-clearfix pwag-social"><p class="pwag-social__message">' + config.loginViaSocialMedia + '</p>' + socialButtons() + '</div>';
	};

    function injectMarkUp(){
        pwagHelpers.appendHTML(socialContainer, templateSocialNetworks());
    }

    var validateAge = function (age, network) {
        if (age >= config.age) {
            initOpenGate();
        } else if (age == -1) {
            showError('unableToGetSocialData');
        } else {
            showError('notLegal');
        }
    };

    function showError(messageId) {
        pwagHelpers.addClassToElement(document.querySelector('.pwag-feedback__message--' + messageId), 'pwag-show');
    }

    function initOpenGate() {
        pwagHelpers.setCookie(config.cookieName, true, config.cookieExpiry);
        setTimeout(openGate, config.delayBeforeOpenGate);
    }

    function openGate() {
        var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;

        gateElem.style.transform = 'translate(0px, ' + (-windowHeight) + 'px)';

        setTimeout(function () {
            pwagHelpers.removeClassFromElement(document.querySelector('body'), 'pwag-gate-enabled');
            pwagHelpers.dispose();
        }, 450);
    }

    return {
        init: init,
        login: login
    };
})();