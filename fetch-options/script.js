function createPost({ title, body }) {
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify({
			title,
			body,
		}),
		headers: {
			'Content-Type': 'application/json',
			token: 'abc123',
		},
	})
		.then(resp => resp.json())
		.then(data => {
		
			console.log(data);
		});
}

createPost({ title: 'My Post', body: 'This is my Post' });
