import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const POST: RequestHandler = async ({ fetch, request, params }) => {
	console.log('POST');
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/transactions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorCode: '', data: body });
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

export const GET: RequestHandler = async ({ fetch, params }) => {
	console.log('GET');

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/transactions`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorCode: '', data: body });
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
