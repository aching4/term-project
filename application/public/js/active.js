(function() {
	'use strict';
	
	var title = document.title;
	var a = document.getElementsByTagName('a');

	for (var i in a) {
		if (a[i].innerText == title) {
			a[i].classList.add('active');
			break;
		}
	}
})();