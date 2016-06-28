# Ideas and notes

### Nomenclature

Do we go with "Age Gate", as it can also be known as an "Adult Verification System"


### Commercial solutions

- https://ageverify.co/
- http://sso.diageoagegate.com/


### Open Source libraries

- https://github.com/izolate/agegate
- https://github.com/komejo/jqverify
- https://github.com/jamielesouef/agegate.js
- https://github.com/MatthewCallis/jquery-age-gate


### Inspiration

- Cookie Consent wizard (for configuration)
  - https://silktide.com/tools/cookie-consent/download/
- Drinkaware (for branding)
  - https://www.drinkaware.co.uk/


### Potential Features

- Validate any age
- Custom Logo
- Custom Background
- Choose Age Gate prompt method
  - Date of Birth input
  - Yes/No
- Choose cookie expiry length
- Choose location of underage redirect
- Custom text
- Links to T&Cs (overlay)
- Skinned or unstyled
- Social Identity Verification
  - Facebook
  - Google+
  - Twitter (new - if added DoB to profile)
- HTTPS/SSL Connection


---


### Example embed code (from Cookie Consent by Silktide)

```html
<!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent -->
<script type="text/javascript">
	window.cookieconsent_options = {
		message":"This website uses cookies to ensure you get the best experience on our website",
		"dismiss":"Got it!",
		"learnMore":"More info",
		"link":null,
		"theme":"dark-top"
	};
</script>

<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.9/cookieconsent.min.js"></script>
<!-- End Cookie Consent plugin -->
```
