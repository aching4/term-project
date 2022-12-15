(function() {
	'use strict';

	function getLargestHeight(...elements) {
		var largest = elements[0].offsetHeight;

		for (var i = 0; i < elements.length; i++) {
			if (!elements[i]) {
				continue;
			}

			if (elements[i].offsetHeight > largest) {
				largest = elements[i].offsetHeight;
			}
		}

		return largest + 10 + 'px';
	}

	function reload() {
		const photos = document.getElementsByClassName('photos')[0].getElementsByTagName('div');

		for (var i = 0; i < photos.length; i++) {
			photos[i].style.height = 'auto';
		}

		setHeight(photos);
	}

	function setHeight(...elements) {
		for (var i = 0; i < elements[0].length; i += 3) {
			var one = elements[0][i];
			var two = elements[0][i + 1];
			var three = elements[0][i + 2];

			var height = getLargestHeight(one, two, three);

			if (one) {
				one.style.height = height;
			}
			if (two) {
				two.style.height = height;
			}
			if (three) {
				three.style.height = height;
			}
		}
	}

	function load() {
		function remove() {
			// once
			this.removeEventListener('click', remove);

			// timing
			var element = this.parentElement;
			element.classList.add('fade');
			var timeout = getComputedStyle(element).animationDuration;
			timeout = timeout.substring(0, timeout.length - 1) * 1000;

			// removal
			setTimeout(function() {
				element.remove();
				document.getElementsByClassName('counter')[0].getElementsByTagName('span')[0].innerText--;

				reload();
			}, timeout);
		}

		const photos = document.getElementsByClassName('photos')[0].getElementsByTagName('div');

		// add click listener + count photos
		for (var i = 0; i < photos.length; i++) {
			var img = photos[i].getElementsByTagName('img')[0];
			img.addEventListener('click', remove);
		}

		setHeight(photos);

		document.getElementsByClassName('counter')[0].getElementsByTagName('span')[0].innerText = photos.length;
	}

	setTimeout(function() {
		load();
	}, 100);

	window.addEventListener('resize', reload);
})();