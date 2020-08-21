// dipake buat rich text

import { sha256 } from 'js-sha256';
const url = process.env.REACT_APP_API_URL;

export function mutationGraphql({ headers, query, variables }) {
	const getUrl = new URL(url);
	getUrl.searchParams.append('hash', sha256(query));

	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	};

	return new Promise((resolve, reject) => {
		fetch(new URL(url), config)
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
	});
}
