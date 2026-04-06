const getRequest = function (value) {
	const h1 = document.createElement('h1');
	const checkMessangeEror = errorCode => {
		const h2 = document.createElement('h2');
		if (isNaN(errorCode)) {
			h2.classList.add('danger')
			h2.innerText = ` Pagina não encontrado ${errorCode = ''}`;
			document.body.appendChild(h2);
			return;
		}
		switch (errorCode) {
			case 400:
				h2.innerText = `Bad Request ${errorCode}`;
				break;
			case 401:
				h2.innerText = `Unauthorized ${errorCode}`;
				break;
			case 402:
				h2.innerText = `Payment Required ${errorCode}`;
				break;
			case 403:
				h2.innerText = `Payment Required ${errorCode}`;
				break;
			case 404:
				h2.innerText = `Not Found ${errorCode}`;
				break;
			default:
				h2.innerText = ` Pagina não encontrado ${errorCode}`;
		}
		h2.classList.add('danger');
		document.body.appendChild(h2);
		return errorCode;
	};

	const response = async resp => {
		if (!resp.ok) {
			const erro = await resp.status;

			// checkMessangeEror(resp.status);
			throw new Error(erro);
		}
		return resp;
	};

	const body = resolv => {
		if (resolv.status === 200) {
			h1.innerText = resolv.status + ' Ok';
		} else if (resolv.status === 201) {
			h1.innerText = resolv.status + ' Create';
		} else {
			h1.innerText = resolv.status;
		}

		h1.classList.add('sucesso');
		document.body.appendChild(h1);
	};
	const showError = error => {
		error = Number(error.message);
		checkMessangeEror(error);
	};
	fetch(`https://tools-httpstatus.pickup-services.com/${value}`)
		.then(response)
		.then(body)
		.catch(showError);
};

getRequest(201);
