import type { PageServerLoad } from './$types';

export const load = (() => {
	/*
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
	*/

	return {
		message: 'Test'
	};
}) satisfies PageServerLoad;
