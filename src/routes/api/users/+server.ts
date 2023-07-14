import { PUBLIC_BASE_URL } from '$env/static/public';
import type { UserDetails } from '$userDomain';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	console.log('GET');
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorCode: '', data: body as UserDetails });
		}

		const body = await response.json();
		return json({ error: true, errorCode: body.errorCode, data: null });
	} catch (exception) {
		return json({
			error: true,
			errorCode: 'EM-000',
			data: null
		});
	}
};

export const PATCH: RequestHandler = async ({ fetch, request }) => {
	const initialBody = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(initialBody)
		});

		if (response.ok) {
			return json({ error: false, errorCode: '' });
		}

		const body = await response.json();
		return json({ error: true, errorCode: body.errorCode });
	} catch (exception) {
		return json({
			error: true,
			errorCode: 'EM-000'
		});
	}
};
