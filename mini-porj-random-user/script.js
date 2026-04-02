const buttonRandomUser = document.querySelector('button');
const cardFigure = document.querySelector('figure .card');

function randomUser() {
	async function getUser(user) {
		cardFigure.innerHTML = '';
		const response = await (await fetch(user)).json();
		createUser(response);
	}

	getUser('https://randomuser.me/api/');
}


function createUser(content) {
	const data = content.results;
	data.forEach(data => {
		const contentHTML = `
		<div class="card">
		<picture>
		<img src="${data.picture.large}" alt="">
		</picture>
		<ul class="dethas">
		<h2 class="name">${data.name.first} ${data.name.last}</h2>
		<li><span>Email: </span>${data.email}</li>
		<li><span>Phone: </span>${data.phone}</li>
		<li><span>Location: </span>${data.location.name}</li>
		<li><span>Age: </span>${data.dob.age}</li>
		</ul>
		</div>`;
		cardFigure.insertAdjacentHTML('beforeend', contentHTML);
	});
}

buttonRandomUser.addEventListener('click', randomUser);
document.addEventListener("DOMContentLoaded",randomUser)