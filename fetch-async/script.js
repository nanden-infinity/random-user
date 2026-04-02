async function getData(endpoint) {
	const response = await fetch(endpoint);

	try {
		if (response.status === 200) {
			const data = await response.json();
			const result = document.getElementById('result');

			const div = document.createElement('div');
			data.forEach(data => {
				const li = document.createElement('li');
				const strong = document.createElement('strong');
				div.classList.add('conteudo');
				li.innerText = data.title;
				data.body
					? (li.classList.add('body-content'), (strong.innerText = data.body))
					: (strong.innerText = data.body ?? data.year);
				li.appendChild(strong);
				div.appendChild(li);
				result.appendChild(div);
			});
			return data;
		} else {
			throw Error(`Somethig is wrong our Bad Request ${response.status}`);
		}
	} catch (error) {
		const texto = document.querySelector('body');
		texto.querySelector('ul').firstElementChild.textContent = error.message;
		texto.style.backgroundColor = '#f00';
		texto.style.color = '#fff';
		console.log(error);
		return error;
	}
}

const moviesPromise = getData('./movies.json');
const actoresPromise = getData('./series.json');

fetch('./movies.json')
	.then(response => response.json())
	.then(resolve => {
		return resolve.map(d => {
			let nome = []
			if(d.year !== 'number'){
				const dd = [d.year]
				nome.push(dd)
				console.log(nome)
			} else return d.body
	
		});
	})
	.then(text => {
		console.log(text);
	});
