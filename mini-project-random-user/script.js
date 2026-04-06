const cardFigure = document.querySelector('figure .card');
const buttonUser = document.querySelector('button');

function fetchUser() {
	showSpinner();
	fetch('https://randomuser.me/api/')
		.then(resp => {
			if (!resp.ok) {
				throw new Error(' Request Failed❗️');
			}
			return resp.json();
		})
		.then(body => {
			const [data] = body.results;
			hideSpinner();
			displayUser(data);
		})
		.catch(error => {

			document.querySelector('figure').innerHTML = `<p class="text-center">${error.message}</p>
				<button>
					<div class="spinner hidden"></div>
					Generate User</button>`;
			showSpinner();
		});
}
// DisplayUser
function displayUser(user) {
	if (user.gender === 'female') {
		document.body.style.backgroundColor = 'var(--roxo-02)';
	} else {
		document.body.style.backgroundColor = 'var(--preto-texto-default)';
	}

	createUser(user);
}
// ShowSpinner
function showSpinner() {
	document.querySelector('.spinner').classList.remove('hidden');
	document.querySelector('button').lastElementChild.textContent = '';
}
// HideSpinner
function hideSpinner() {
	document.querySelector('.spinner').classList.add('hidden');
	document.querySelector('button').lastElementChild.textContent =
		buttonUser.lastElementChild.textContent;
}
// Create User Content
function createUser(user) {
	return (cardFigure.innerHTML = `<picture>
		<img src="${user.picture.large}" alt="">
		</picture>
		<ul class="dethas">
		<h2 class="name">${user.name.first} ${user.name.last}</h2>
		<li><span>Email: </span>${user.email}</li>
		<li><span>Phone: </span>${user.phone}</li>
		<li><span>Location: </span>${user.location.city}</li>
		<li><span>Age: </span>${user.dob.age}</li>
		</ul>`);
}

function init() {
	buttonUser.addEventListener('click', fetchUser);
	fetchUser();
}
document.addEventListener('DOMContentLoaded', init);
