var pwagSocialNetworks = (function () {
    // 'Private' variables
    var config = pwagTemplate.config;													// Config data from global variable
    var redirectPage = "example.htm";
    var gateElem = document.querySelector('.pwag-gate');

    var init = function () {
        hello.init(config.socialNetworks.networks, { redirect_uri: config.socialNetworks.redirectPage });
    };
    var login = function(network) {
        hello(network).login();
    };
    var logout = function (network) {
        hello(network).logout();
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
            // Call user information, for the given network
            hello("facebook").api("me", { fields: "id,name,age_range" }).then(function (r) {
                var ageRange = r.age_range;

                if (!ageRange || !ageRange.min) {
                    validateAge(-1, "facebook");
                } else {
                    validateAge(ageRange.min, "facebook");
                }
                logout("facebook");
            });
        },
        viaGoogle: function () {
            hello("google").api("me").then(function (r) {
                if (!r.birthday) {
                    validateAge(-1, "google");
                } else {
                    var birthday = new Date(r.birthday);

                    //Source: http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
                    var ageDifMs = Date.now() - birthday.getTime();
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch

                    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

                    validateAge(age, "google");
                }
                logout("facebook");
            });
        }
    };

    var validateAge = function (age, network) {
        if (age >= config.age) {
            initOpenGate();
        } else if (age == -1) {
            showError("unableToGetSocialData");
        } else{
            showError("notLegal");
        }
    }

    function showError(messageId) {
        pwagHelpers.addClassToElement(document.querySelector(".pwag-feedback__message--" + messageId), "pwag-show");
    }

    function initOpenGate() {
        pwagHelpers.setCookie(config.cookieName, true, config.cookieExpiry);
        setTimeout(openGate, config.delayBeforeOpenGate);
    }

    function openGate() {
        var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName("body")[0],
			windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;

        gateElem.style.transform = "translate(0px, " + (-windowHeight) + "px)";

        setTimeout(function () {
            pwagHelpers.removeClassFromElement(document.querySelector("body"), "pwag-gate-enabled");
            pwagHelpers.dispose();
        }, 450);
    }

    return {
        init: init,
        login: login
    };
})();