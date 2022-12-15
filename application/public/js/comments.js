function addNewComment(data) {
	let commentList = document.getElementById('comments');
	let newComment = document.createElement('template');
	newComment.innerHTML = `
		<div>
			<p class="comment-username">@${data.username}</p>
			<p class="comment-postdate">${new Date().toLocaleString()}</p>
			<p class="comment-texttext">${data.comment}</p>
		</div>
	`;
	commentList.prepend(newComment.content);
}

document.getElementById('comment').addEventListener('keypress', function(event) {
	if (event.keyCode == 13) {
		document.getElementById('commit').click();
	}
});

document.getElementById('commit').addEventListener('click', function(event) {
	let commentTextElement = document.getElementById('comment');
	let commentText = commentTextElement.value;
	let postId = event.currentTarget.dataset.postid;

	if (!commentText) return;

	fetch('/comments/create', {
		method: 'POST',
		headers: {'Content-Type': 'Application/json'},
		body: JSON.stringify({
			comment: commentText,
			postId: postId
		})
	})
	.then(response => response.json())
	.then(res_json => {
		addNewComment(res_json.data);
		commentTextElement.value = "";
	});
});