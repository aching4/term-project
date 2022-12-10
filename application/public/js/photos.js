(function() {
	'use strict';

	function load() {
		// fetch images from API
		fetch('https://jsonplaceholder.typicode.com/albums/2/photos').then((response) => response.json()).then((data) => {
			function remove() {
				// once
				this.removeEventListener('click', remove);

				// timing
				var element = this;
				element.classList.add('fade');
				var timeout = getComputedStyle(element).animationDuration;
				timeout = timeout.substring(0, timeout.length - 1) * 1000;

				// removal
				setTimeout(function() {
					element.remove();
					document.getElementsByClassName('counter')[0].getElementsByTagName('span')[0].innerText--;
				}, timeout);
			}

			const photos = document.getElementsByClassName('photos')[0];

			for (var i in data) {
				// create containers
				var photo = document.createElement('div');
				var img = document.createElement('img');
				var p = document.createElement('p');

				// set attributes
				img.setAttribute('src', data[i].url);
				p.innerText = data[i].title;
				p.style.textAlign = 'center';

				// add onclick
				photo.addEventListener('click', remove);

				// generate element
				photo.appendChild(img);
				photo.appendChild(p);
				photos.appendChild(photo);
			}

			document.getElementsByClassName('counter')[0].getElementsByTagName('span')[0].innerText = data.length;
		});
	}

	load();
})();