const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const addTodoDom = todo => {
	const divContent = document.createElement('div');
	divContent.setAttribute('data-id', todo.id);
	divContent.appendChild(document.createTextNode(todo.title));

	if (todo.completed) {
		divContent.classList.add('todo');
	}
	document.getElementById('todo-list').appendChild(divContent);
};
const getTodos = (value = 5) => {
	fetch(`${apiUrl}?_limit=${value}`)
		.then(resp => resp.json())
		.then(data => {
			data.forEach(todo => addTodoDom(todo));
		});
};
const createTodo = e => {
	e.preventDefault();
	const options = {
		method: 'POST',
		body: {},
		header: {
			'Content-Type': 'application/json',
		},
	};
	const input = e.target.firstElementChild;
	const value = e.target.firstElementChild.value.trim();
	if (value === '') return alert('please field input');
	const newTodo = {
		title: value,
		completed: false,
	};
	options.body = JSON.stringify(newTodo);
	fetch(apiUrl, {
		method: 'POST',
		body: JSON.stringify(newTodo),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(resp => resp.json())
		.then(data => addTodoDom(data));
	console.log(newTodo);
	input.value = '';
};

const toggleCompleted = e => {
	const target = e.target;
	if (target.classList.contains('todo')) {
		target.classList.toggle('done');
		updateTodo(target.dataset.id, target.classList.contains('done'));
	}

	// if (istrue !== this) {
	// 	e.target.classList.toggle('done');
	// } else {
	// 	e.target.classList.toggle('done');
	// }
};
const updateTodo = (id, completed) => {
	fetch(`${apiUrl}/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ completed }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
const deleteTodo = e => {
	const target = e.target;
	if (target.classList.contains('todo')) {
		const id = target.dataset.id;
		fetch(`${apiUrl}/${id}`, {
			method: 'DELETE',
		})
			.then(resp => resp.json())
			.then(() => target.remove());
	}
};
const init = () => {
	document.addEventListener('DOMContentLoaded', () => getTodos(10));
	document.getElementById('todo-form').addEventListener('submit', createTodo);
	document
		.getElementById('todo-list')
		.addEventListener('click', toggleCompleted);
	document.getElementById('todo-list').addEventListener('dblclick', deleteTodo);
};

init();
