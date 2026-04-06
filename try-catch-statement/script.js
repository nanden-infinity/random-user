// try {
//   console.log(x)
// } catch (error) {
//       console.log(error.message)
// }
const createPost = (dataContent, fc) => {
	showSpinner();
	const content = dataContent;
	const section = document.createElement('section');

	content.forEach(data => {
		const figure = document.createElement('figure');
		figure.classList.add('card-content');
		const {
			address,
			address: { city },
		} = data;
		console.log(address, city);
		figure.innerHTML = `
     
            <div class="card">
            <picture><img src="" alt="img"></picture>
            <div class="content">
                  <h2><strong>Name</strong>: ${data.name}</h2>
                  <p><strong>Phone</strong>: ${data.phone}</p>
                  <p><strong>Email</strong>: ${data.email}</p>
                  <p><strong>Address</strong>: ${address.street} <br> <span><strong>Suite</strong>${address.suite} </span> <br><strong>ZipCode</strong>  ${address.zipcode}</p>
                  <p><strong>City</strong>: ${city}</p>
                  
            </div>
            </div>

      `;
		hideSpinner();
		section.appendChild(figure);
		fc(figure);
		document.querySelector('body').appendChild(section);
	});
};
const getPost = async post => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/users?_limit=${post}`,
	);

	try {
		if (!response.ok) {
			throw new Error('Nao pode ser processado o seu pedido');
		} else {
			const data = await response.json();
			console.log(data);
			createPost(data, async function (section) {
				const response = await fetch('https://randomuser.me/api/');
				const dados = await response.json();
				const imgs = section.querySelectorAll('img');
				imgs.forEach(photo => {
					const [images] = dados.results;
					const img = images.picture.large;
					photo.src = img;
				});

				return dados;
			});
		}
	} catch (error) {
		console.log(error.message);
	}
  return post
};
// HideSpinner
function hideSpinner() {
	const modal = document.querySelector('.modal');
	const spinner = document.querySelector('.spinner');
	const overlay = document.querySelector('.overlay');
	spinner.classList.add('hidden');
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
	console.log(modal, overlay);

	// document.querySelector('.modal').classList.add('hidden');
	// document.querySelector('.spinner').classList.add('hidden');
	// document.querySelector('.overlay').classList.add('hidden');
}
function showSpinner() {
	const modal = document.querySelector('.modal');
	const spinner = document.querySelector('.spinner');
	const overlay = document.querySelector('.overlay');
	spinner.classList.remove('hidden');
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
	// document.querySelector('.modal').classList.remove('hidden');
	// document.querySelector('.overlay').classList.remove('hidden');
	//  document.querySelector('.spinner').classList.remove('hidden');
}

document.querySelector('form').addEventListener('submit', e => {
	e.preventDefault();
	const input = document.querySelector('form input');
	const inputValue = input.value;
	getPost(+inputValue);
	input.value = '';
});
document.addEventListener('DOMContentLoaded', () => {
 const min = Math.min(4, 8, 12);
 const max = Math.max(20, 25, 44);

 const users = Math.floor(Math.random() * (max - min + 1)) + min;
 const val = getPost(users)
 console.log(val)
});
