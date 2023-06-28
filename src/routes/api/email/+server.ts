import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ fetch, request }) => {
	console.log('POST');
	const requestBody = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/send-email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			return json({ error: false, errorMessage: '' });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage });
	} catch (exception) {
		const message = getErrorMessage('EM-000'); // Default error message

		return json({
			error: true,
			errorMessage: message
		});
	}
}) satisfies RequestHandler;
