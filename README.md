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
		loginViaSocialMedia: 'Log in with'
		unableToGetSocialData: ''
		yesNoQuestion: 'Are you old enough to enter this site?',
		yes: 'Yes',
		no: 'No',
		errorYesNo: 'Please confirm that you are old enough to enter this site',
		termsText: '',
		termsLinks: [],
		cookieName: 'pwag',
		cookieExpiry: 365,
		windowResizeThreshold: 100,
		delayBeforeOpenGate: 750,
		// Only used in Birthday Age Gate
		socialNetworks: [
			{
				label : 'Login with ____',
				name: 'facebook|google|windows',
				clientId: 'clientID'
			}
		]
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
