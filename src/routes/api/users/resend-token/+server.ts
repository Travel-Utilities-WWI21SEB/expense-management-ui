import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { email } = body;

	try {
		const response = await fetch(`http://localhost:8080/api/v1/users/resend-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email })
		});

		if (response.ok) {
			return json({ error: false, errorMessage: '' });
		}

		const { errorCode } = await response.json();
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage: errorMessage });
	} catch (exception) {
		return json({
			error: true,
			errorMessage: getErrorMessage('EM-000') // Default error message
		});
	}
}) satisfies RequestHandler;
