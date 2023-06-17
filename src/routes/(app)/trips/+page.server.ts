/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('api/trips', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();

	return body;
}
