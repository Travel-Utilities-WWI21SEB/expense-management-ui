import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	console.log('POST');
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips/${requestBody.id}/accept`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody.body)
		});

		if (response.ok) {
			return json({ error: false, errorCode: '' });
		}

		const body = await response.json();
		return json({ error: true, errorCode: body.errorCode });
	} catch (exception) {
		return json({
			error: true,
			errrorCode: 'EM-000'
		});
	}
};
