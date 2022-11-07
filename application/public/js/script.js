'user strict';

function validator(event, condition, error) {
	const val = event.target.value;

	if (!val.length) {
		event.target.setCustomValidity('Please fill out this field.');
		return;
	}

	for (var i = 0; i < condition.length; i++) {
	    if (condition[i]) {
	        event.target.setCustomValidity('');
	    } else {
	        event.target.setCustomValidity(error[i] || 'Something is wrong in this field.');
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
	return str.length && ([...str[0].matchAll(lowers)].length || [...str[0].matchAll(uppers)].length);
}

function matchPass(pass1, pass2) {
	return pass1 === pass2;
}

// initialization
function load() {
	const form = document.getElementById('form');
	const username = document.getElementById('username');
	const password = document.getElementById('password');
	const cpassword = document.getElementById('confirm_password');

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		alert('Success! Your account has been created.');
		window.location.reload();
	});

	username.addEventListener('input', function(event) {
		validator(event, [startWithChar(username.value), containsGroup(username.value, 3, lowers, uppers, numbers)],
			['Username must start with a letter.', 'Username must contain at least 3 character.']);
	});

	password.addEventListener('input', function(event) {
		validator(event, [containsGroup(password.value, 8, lowers, uppers), containsGroup(password.value, 1, uppers),
			containsGroup(password.value, 1, numbers), containsGroup(password.value, 1, specials)],
			['Password must be at least 8 letters long.', 'Password must contain at least 1 upper case letter.',
			'Password must contain at least 1 number.', 'Password must contain at least 1 special character'])
	});

	cpassword.addEventListener('input', function(event) {
		validator(event, [matchPass(password.value, cpassword.value)], ['Passwords must match.'])
	});
}

load();