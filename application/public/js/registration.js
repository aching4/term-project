(function() {
    'use strict';

    function setValidity(event, pack) {
		const val = event.target.value;

		if (!val.length) {
			event.target.setCustomValidity('Please fill out this field.');
			return;
		}

		for (var i = 0; i < pack.length; i++) {
		    if (pack[i][0]) {
		        event.target.setCustomValidity('');
		    } else {
		        event.target.setCustomValidity(pack[i][1] || 'Something is wrong in this field.');
		        return;
		    }
		}
	}

	// regexp
	const lowers = /[a-z]/g;
	const uppers = /[A-Z]/g;
	const numbers = /[0-9]/g;
	const specials = /[/*\-+!@#$\^&~[\]]/g


	// checks
	function containsGroup(str, threshold, ...regexp) {
		var found = 0;

		for (var i in regexp) {
			found += [...str.matchAll(regexp[i])].length;
		}

		return found >= threshold;
	}

	function startWithChar(str) {
		return [...str[0].matchAll(lowers)].length || [...str[0].matchAll(uppers)].length;
	}

	function matchPass(pass1, pass2) {
		return pass1 === pass2;
	}

	// initialization
	function load() {
		// get fields
		const form = document.getElementById('form');
		const username = document.getElementById('username');
		const password = document.getElementById('password');
		const cpassword = document.getElementById('confirm_password');

		// submit form
		// form.addEventListener('submit', function(event) {
		// 	event.preventDefault();
			// alert('Success! Your account has been created.');
			// window.location.reload();
		// });

		// set validation conditions
		username.addEventListener('input', function(event) {
			setValidity(
				event,
				[
					[startWithChar(username.value), 'Username must start with a letter.'],
					[containsGroup(username.value, 3, lowers, uppers, numbers), 'Username must contain at least 3 character.']
				]
			);
		});

		password.addEventListener('input', function(event) {
			setValidity(
				event,
				[
					[containsGroup(password.value, 8, lowers, uppers, numbers, specials), 'Password must be at least 8 characters long.'],
					[containsGroup(password.value, 1, uppers), 'Password must contain at least 1 upper case letter.'],
					[containsGroup(password.value, 1, numbers), 'Password must contain at least 1 number.'],
					[containsGroup(password.value, 1, specials), 'Password must contain at least 1 special character']
				]
			);
		});

		cpassword.addEventListener('input', function(event) {
			setValidity(
				event,
				[
					[matchPass(password.value, cpassword.value), 'Passwords must match.']
				]
			);
		});
	}

	load();
})();