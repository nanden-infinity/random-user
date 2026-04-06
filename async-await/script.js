const res = function () {
	console.log('sim foi resolvido');
};

const rej = function () {
	console.log(' foi rejeitado!!!');
};

function promessaFetch(resolve, reject) {
	let age = 19;
	if (age >= 18) {
		resolve(age);
	} else {
		const erro = `a sua idade é de ${age}`;
		reject(erro);
		throw new Error(erro);
	}
}
const promessa = new Promise(promessaFetch);

promessa.then(f => console.log(f)).catch(showError);

function showError(erro) {
	console.log(erro);
}

const promesa1 = new Promise((resolve, reject) => {
	let idade = 19;
	setTimeout(() => {
		if (idade >= 18) {
			resolve({ name: 'John', age: 54 });
		} else {
			reject('erro na idade');
			// throw new Error('Idade false');
		}
	}, 1000);
});

async function getResolve() {
	const result = await promesa1;
	try {
		const div = document.createElement('div');
		div.innerHTML = ` <h1>nome:${result.name}  <span>Idade:${result.age}</span></h1>`;
		document.querySelector('body').appendChild(div);
	} catch (err) {
		console.log(err.error);
	}
}

getResolve();
async function getUsers(c) {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();
	const dataEl = data;
	const article = document.createElement('article');
	dataEl.forEach(d => {
			const figure = document.createElement('figure');
		figure.innerHTML = `
		 

			 <div class="card"><h4>${d.name}<p></h4>${d.email}</div>

	 `;
	 article.appendChild(figure)
	 document.querySelector('body').appendChild(article);
	});
	c();
	console.log(data, '1');
}
getUsers(function getUsers2() {
	const response = fetch('https://jsonplaceholder.typicode.com/users').then(
		res => res,
	);
     response
		.then(d => d.json())
		.then(d => {
			const section = document.createElement('section');
			section.innerHTML = `<figure>
			 <div class="card"><h4>${d[0].name}<p></h4>${d[0].email}</div>
		 </figure>
	 `;
			document.querySelector('body').appendChild(section);
			return d;
		});
});
