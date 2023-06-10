import { PUBLIC_BASE_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/test`, {
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
