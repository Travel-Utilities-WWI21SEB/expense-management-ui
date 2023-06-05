import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const response = await fetch(`http://localhost:8080/api/v1/test`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		throw error(response.status, 'Error');
	}

	const { message } = await response.json();

	return {
		message
	};
};
