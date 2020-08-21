import { sha256 } from 'js-sha256';

const url = process.env.REACT_APP_API_URL;

export function fetchGraphql({ headers, query, variables }) {
	const getUrl = new URL(url);
	getUrl.searchParams.append('hash', sha256(query));
	// getUrl.searchParams.append('variables', JSON.stringify(variables));

	const persistedConfig = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	};

	const normalConfig = {
		method: 'POST',
		headers: persistedConfig.headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	};

	return new Promise((resolve, reject) => {
		fetch(getUrl, persistedConfig)
			.then((response) => {
				if (response && (response.status === 400 || response.status === 405))
					throw Error(response.status);
				return response.json();
			})
			.then((response) => {
				resolve(response);
			})
			.catch((e) => {
				if (e.message === '400' || e.message === '405') {
					fetch(new URL(url), normalConfig)
						.then((response) => {
							return response.json();
						})
						.then((response) => {
							if (response.errors && response.errors.length > 0)
								return reject(response.errors[0]);
							resolve(response);
						})
						.catch((err) => {
							reject(err);
						});
				} else {
					reject(e);
				}
			});
	});
}
