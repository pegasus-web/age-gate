var pwagBirthday = (function(){

	// 'Private' variables
	var config = pwagTemplate.config;													// Config data from global variable
	var ageMin = config.age;			 												// Minimum age (in years) from config
	var gateElem = document.querySelector('.pwag-gate');								// Gate element
	var inputs = document.querySelectorAll('.pwag-date-box__input'); 					// NodeList of hidden date inputs
	var inputsArray = pwagHelpers.nodeListToArray(inputs); 								// NodeList of hidden date inputs
	var boxes = document.querySelectorAll('.pwag-date-box'); 							// NodeList of date boxes
	var boxesArray = pwagHelpers.nodeListToArray(boxes);								// Array of date boxes
	var values = document.querySelectorAll('.pwag-date-box__value'); 					// NodeList of date value holder elements
	var valuesArray = pwagHelpers.nodeListToArray(values); 								// Array of date value holder elements
	var inputGroups = document.querySelectorAll('.pwag-birthday-group');				// NodeList of groups of date inputs
	var inputGroupsArray = pwagHelpers.nodeListToArray(inputGroups);					// Array of groups of date inputs
	var birthdayGroupsInner = document.querySelector('.pwag-birthday-groups__inner');	// NodeList of birthday groups positioner TODO: redo this comment
	var validDateAsString = getValidDateAsString(); 									// Date of minimum valid age to be allowed access, as string (yyyymmdd)
	var numberReg = new RegExp('^[0-9]+$'); 											// Regular expression to validate digits only
	var editIndex = 2; 																	// Input index to focus on when page loads (zero-based)
	var groupIndex = 0; 																// Input group index to focus on when page loads (zero-based)
	var today = new Date(); 															// Current date
	var yyyy = today.getFullYear(); 													// Current year
	var dateGroup = [[0, 3], [4, 5], [6, 7]]; 											// Array to group year/month/day inputs
	var groupKeys = ['year', 'month', 'day']; 											// Keys for date groups, used for showing specific error messages
	var dateRanges = [[yyyy - 150, yyyy], [1, 12], [1, 31]]; 							// Array of valid ranges for year/month/day values

	// 'Private' methods
	var _initGateBirthday = function() {
		bindDateBoxClick();
		bindKeyUp();
		setGroupFocus(groupIndex);
		setBoxFocus(false);
		setInputFocus();
	};

	function setInputFocus() {
		inputs[editIndex].focus();
	}

	function setBoxFocus(skipGroupReIndex) {
		var newGroupIndex = !skipGroupReIndex ? getGroupIndexFromInputIndex(editIndex) : groupIndex;
		groupInvalidReset();
		hideErrors();
		clearBoxValues();
		removeBoxFocus();
		pwagHelpers.addClassToElement(boxes[editIndex], 'pwag-date-box--focus');

		if (groupIndex > newGroupIndex) {	// Go back to a previous group
			groupIndex--;
			pwagHelpers.removeClass([].slice.call(inputGroups,newGroupIndex), 'pwag-birthday-group--visible');
			setGroupFocus(groupIndex);
		}
	}

	function getAbsBoxIndex(_groupIndex, _boxIndex){
		var groupArr = dateGroup[_groupIndex];
		var counter = 0;
		for (var i = groupArr[0]; i <= groupArr[1]; i++) {
			if(counter == _boxIndex){
				return i;
			}
			counter++;
		}
	}

	function removeBoxFocus() {
		pwagHelpers.removeClass(boxes, 'pwag-date-box--focus');
	}

	function removeInputFocus() {
		for (var i = 0; i < inputsArray.length; i++) {
			inputsArray[i].blur();
		}
	}

	function clearBoxValues() {
		var boxesToClear = valuesArray.slice(editIndex, values.length);
		pwagHelpers.text(boxesToClear, '');
		pwagHelpers.removeClass(boxesArray.slice(editIndex, boxes.length), 'pwag-date-box--valid');
	}

	function setBoxValid() {
		pwagHelpers.addClassToElement(boxes[editIndex], 'pwag-date-box--valid');
	}

	function setGroupFocus(groupIndex) {
		var groupObject = inputGroups[groupIndex];
		pwagHelpers.removeClass(inputGroups, 'pwag-current');
		pwagHelpers.addClassToElement(groupObject, 'pwag-birthday-group--visible');
		pwagHelpers.addClassToElement(groupObject, 'pwag-current');
		pwagContent = document.querySelector('.pwag-gate__content');
		pwagContentWidth = parseInt(pwagHelpers.getWidth(pwagContent));
		var newLeft = pwagContentWidth / 2 - groupObject.offsetWidth / 2 - groupObject.offsetLeft + 'px';
		birthdayGroupsInner.style.left = newLeft;
	}

	function bindDateBoxClick(){
		for (var i = 0; i < boxesArray.length; i++) {
			_thisItem = boxesArray[i];
			if (_thisItem.addEventListener) {
				_thisItem.addEventListener('click', onDateBoxClick, false);
			}
			else {
				_thisItem.onclick = function(){
					onDateBoxClick();
				};
			}
		}
	}
	
	function onDateBoxClick(e){

		// Ensure correct element being clicked
		element = e.target;
		var elemClass = element.getAttribute('class');
		if(elemClass == 'pwag-date-box__value' || elemClass == 'pwag-date-box__placeholder' || elemClass == 'pwag-date-box__input'){
			element = element.parentNode;
		}

		var newGroupIndex = pwagHelpers.index(element.parentNode);
		groupIndex = newGroupIndex;
		editIndex = pwagHelpers.index(element) - 1;
		var absBoxIndex = getAbsBoxIndex(newGroupIndex, pwagHelpers.index(element) - 1);
		editIndex = absBoxIndex;
		setGroupFocus(newGroupIndex);
		setBoxFocus(true);
		setInputFocus();
	}

	function bindKeyUp(){
		document.onkeyup = function(e){
			evalKey(e);
		};
	}

	function updateBox(number) {
		setBoxValid();
		if (pwagHelpers.isIE8()) {
			document.querySelector('.pwag-date-box--' + editIndex + ' .pwag-date-box__value').innerText = number;
		}else{
			document.querySelector('.pwag-date-box--' + editIndex + ' .pwag-date-box__value').textContent = number;			
		}
		var groupComplete = isGroupComplete(groupIndex);

		if (groupComplete === true) {
			if (validateDatePartRange()) {
				var groupValid = isGroupValid(groupIndex);
				switch (groupValid) {
					case 1: // Not old enough
						showError('notLegal');
						removeBoxFocus();
						removeInputFocus();
						groupInvalid(groupIndex);
						break;
					case 2: // May be old enough
						editIndex++;
						groupIndex++;
						setBoxFocus(false);
						setGroupFocus(groupIndex);
						break;
					case 3: // Old enough
						initOpenGate();
						break;
				}
			} else {
				groupInvalid(groupIndex);
				showError(groupKeys[groupIndex]);
			}
		} else {
			editIndex++;
			setBoxFocus(false);
		}
	}

	function evalKey(e) {
		var key;
		// If IE8 get key from window event, otherwise get it properly
		if (pwagHelpers.isIE8()) {
			key = window.event.keyCode;
		}else{
			key = e.keyCode || e.which;
		}

		// Android/Chrome keycode fix
		if (key === 0 || key === 229) {
			var focusedElement = document.activeElement;
			if (focusedElement) {
				key = getKeyCode(focusedElement.value);
			}
		}

		switch (key) {
			case 8: 	// Backspace
			case 37: 	// Left arrow
				back();
				e.preventDefault();
				break;
			default: 	// Other - check if key is number (either on main keyboard or number-pad)
				if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
					var number = key >= 96 ? key - 96 : key - 48;
					hideErrors();
					updateBox(number);
				} else {
					e.preventDefault();
				}
				break;
		}
	}

	function getKeyCode(str) {
		return str.charCodeAt(str.length - 1);
	}

	function getGroupIndexFromInputIndex(inputIndex) {
		for (var i = 0; i < dateGroup.length; i++) {
			var min = dateGroup[i][0];
			var max = dateGroup[i][1];
			if (inputIndex >= min && inputIndex <= max) {
				return i;
			}
		}
	}

	function validateDatePartRange() {
		var validRange = true;
		var partValue = getGroupValues(groupIndex);
		var min = dateRanges[groupIndex][0];
		var max = dateRanges[groupIndex][1];
		if (partValue < min || partValue > max) {
			validRange = false;
		}
		return validRange;
	}

	function isGroupComplete(groupIndex) {
		var complete = true;
		var startIndex = dateGroup[groupIndex][0];
		var endIndex = dateGroup[groupIndex][1];

		for (i = startIndex; i <= endIndex; i++) {
			if(pwagHelpers.isIE8()){
				if (numberReg.test(valuesArray[i].innerText) !== true) {
					complete = false;
				}
			}else{
				if (numberReg.test(valuesArray[i].textContent) !== true) {
					complete = false;
				}
			}
		}
		return complete;
	}

	/*
	* Checks validity of input group values
	* @param {Number} groupIndex
	* @return {Number} 1 = Invalid; 2 = Possibly valid; 3 = Valid
	*/
	function isGroupValid(groupIndex) {
		var valid;
		var startIndex = dateGroup[groupIndex][0];
		var endIndex = dateGroup[groupIndex][1];
		var groupValues = getGroupValues();
		var datePart = parseInt(validDateAsString.slice(startIndex, endIndex + 1)); 	// Gets part of valid date to compare against

		if (groupValues < datePart) {			// Old enough, so open gate
			valid = 3;
		} else if (groupValues > datePart) {	// Not old enough, so error
			valid = 1;
		} else {								// May be old enough
			if (groupIndex == 2) {				// Exactly old enough
				valid = 3;
			} else {							// May be old enough but need to check next group
				valid = 2;
			}
		}
		return valid;
	}

	function getGroupValues() {
		var groupValues = '';
		var startIndex = dateGroup[groupIndex][0];
		var endIndex = dateGroup[groupIndex][1];

		for (i = startIndex; i <= endIndex; i++) {
			if(pwagHelpers.isIE8()){
				groupValues += values[i].innerText;
			}else{
				groupValues += values[i].textContent;
			}
		}
		return groupValues;
	}

	function groupInvalid(groupIndex) {
		pwagHelpers.addClassToElement(inputGroups[groupIndex], 'pwag-invalid');
	}

	function groupInvalidReset() {
		pwagHelpers.removeClass(inputGroups, 'pwag-invalid');
	}

	function back() {
		if (editIndex > 0) {
			editIndex--;
			setBoxFocus(false);
		}
	}

	function showError(messageId) {
		pwagHelpers.addClassToElement(document.querySelector('.pwag-feedback'), 'pwag-show');
		pwagHelpers.addClassToElement(document.querySelector('.pwag-feedback__message--' + messageId), 'pwag-show');
	}

	function hideErrors() {
		pwagHelpers.removeClass(document.querySelectorAll('.pwag-feedback'), 'pwag-show');
		pwagHelpers.removeClass(document.querySelectorAll('.pwag-feedback__message'), 'pwag-show');
	}

	function initOpenGate() {
		pwagHelpers.setCookie(config.cookieName, true, config.cookieExpiry);
		pwagHelpers.addClass(inputGroups, 'pwag-success');
		setTimeout(openGate, config.delayBeforeOpenGate);
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
			pwagHelpers.dispose();
		}, 450);
	}

	function getValidDateAsString() {
		var today = new Date();
		var yyyy = today.getFullYear();
		var dd = preceedingZero(today.getDate());
		var mm = preceedingZero(today.getMonth() + 1);
		var yearMin = Number(yyyy) - Number(ageMin);
		return '' + yearMin + mm + dd;
	}

	function preceedingZero(input) {
		return input < 10 ? '0' + input : input;
	}

	var initGate = function () {
		if(config.type == 'birthday'){
			_initGateBirthday();
		}else{
			_initGateYesNo();
		}
	};

	var windowResize = pwagHelpers.debounce(function() {
		setGroupFocus(groupIndex);
	}, config.windowResizeThreshold);

	// 'Public' methods
	return {
		initGate: initGate,
		windowResize: windowResize
	};
});