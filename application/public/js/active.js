(function() {
	'use strict';
	
	function getPage() {
		var title = document.title;
		var page;
		switch (title) {
			case 'Home Page':
				page = 0;
				break;
			case 'Login':
				page = 1;
				break;
			case 'Registration':
				page = 2;
				break;
			case 'Post Image':
				page = 3;
				break;
			case 'View Post':
				page = 4;
				break;
			default:
				console.error('Not a page from the navigation bar. A hidden page?');
				return;
		}
		var a = document.getElementsByTagName('a');
		a[page].classList.add('active');
	}
	
	getPage();
})();