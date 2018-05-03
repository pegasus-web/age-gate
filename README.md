# Pegasus Web Age Gate

Age Gate as a Service

### What is an Age Gate?

An Age Gate, also known as an Adult Verification System, is a policy to 
confirm that a website visitor is of the age required (by law) to view 
the website's contents. In the case of Pegasus Web this is due to the 
alcoholic nature of the Carlsberg Group websites.

## Installation
- Clone repo
- Use Node.js command prompt to change directory to cloned repo on local file system
- Run `npm install`
- Run `gulp` for minified production build or `gulp dev` for non-minified development build

## Website Integration

Place CSS file in html head:

```
<head>
  ...
  <link href="//path/to/pwag.min.css" rel="stylesheet">
</head>
```

Place JS config and file before end of `</body>`.

```html
<!-- Begin Pegasus Web Age Gate -->
<script>
	window.pwagConfig = {
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
		loginViaSocialMedia: 'Log in with',
		unableToGetSocialData: '',
		yesNoQuestion: 'Are you old enough to enter this site?',
		yes: 'Yes',
		no: 'No',
		errorYesNo: 'Please confirm that you are old enough to enter this site',
		welcomeText: 'Welcome to the age gate market',				// Text which appears beneath the logo, above the gate inputs
		marketText: 'market',										// Part of the text from the `welcomeText` variable which should be replaced with the market selector drop-down
		marketAliasSelected: 'xz-en',								// Alias of the market which should be selected by default
		markets: [													// Array of objects representing the items in the markets drop-down
			{
				label: 'Global — EN',								// Name of the option displayed in the UI
				alias: 'xz-en',										// Value of the option, used to set a default (via `marketAliasSelected` variable)
				link: 'http://www.example.com?global',				// URL to redirect to upon selection of this option
				icon: 'http://via.placeholder.com/36x27?text=%20'	// URL of icon e.g. flag. This won't be shown due to poor support for images within `<option>` tags but will be rendered as a data attribute in case the select element is replaced by a custom renderer
			},
			{
				label: 'Denmark — DA',
				alias: 'dk-da',
				link: 'http://www.example.com?danish',
				icon: 'http://via.placeholder.com/36x27?text=%20'
			},
			{
				label: 'France — FR',
				alias: 'fr-fr',
				link: 'http://www.example.com?french',
				icon: 'http://via.placeholder.com/36x27?text=%20'
			}
		],
		termsText: '',
		termsLinks: [],
		cookieName: 'pwag',
		cookieExpiry: 365,
		domain: '',
		windowResizeThreshold: 100,
		delayBeforeOpenGate: 750,
		// Only used in Birthday Age Gate
		socialNetworks: [
			{
				label : 'Login with ____',
				name: 'facebook|google|windows',
				clientId: 'clientID'
			}
		],
		focusGroupIndex: 0,
		focusBoxIndex: 2,
		beforeRender: function(){},		// Called when the age gate is activated but before it renders anything
		afterRender: function(){},		// Called when the age gate is activated and after the mark-up is rendered 
		beforeSuccess: function(){},	// Called upon successful age gate submission before the gate is removed
		afterSuccess: function(){},		// Called upon successful age gate submission after the gate is removed
		afterBypass: function(){}		// Called when the age gate is bypassed i.e. the cookie is already set
	};
</script>

<script src="//path/to/pwag.min.js"></script>
<!-- End Pegasus Web Age Gate -->
...
</body>
```

Note: All config values are optional.

TODO: Provide details of default values and formatting of termsLinks option.

## License

Copyright &copy; 2016 Umbrella Inc Ltd

This project is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Please see [LICENSE](LICENSE.md) for further details.
