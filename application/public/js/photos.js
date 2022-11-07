(function() {
	'use strict';

	function load() {
		// fetch images from API
		fetch('https://jsonplaceholder.typicode.com/albums/2/photos').then((response) => response.json()).then((data) => {
			const photos = document.getElementsByClassName('photos')[0];

			for (var i in data) {
				var photo = document.createElement('div');
				var img = document.createElement('img');
				img.setAttribute('src', data[i].url);
				var p = document.createElement('p');
				p.innerText = data[i].title;
				p.style.textAlign = 'center';
				photo.appendChild(img);
				photo.appendChild(p);
				photos.appendChild(photo);
			}
		});
	}

	load();
})();