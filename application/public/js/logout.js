document.getElementById('logout-button')
	.addEventListener('click', function(event) {
		fetch('/users/logout', {method: 'POST'})
			.then(response => response.json())
			.then(function(res_json) {
				// console.log(res_json);
				window.location.replace('/');
			})
			.catch(err => console.log(err));
	})