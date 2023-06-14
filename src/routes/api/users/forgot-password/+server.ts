import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ fetch, request }) => {
	const { email } = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (!response.ok) {
			const body = await response.json();
			const { errorCode } = body;
			const errorMessage = getErrorMessage(errorCode);

			return json({ error: true, errorMessage });
		}

		return json({ error: false, errorMessage: '' });
	} catch (error) {
		const errorMessage = getErrorMessage('EM-000'); // Default error message
		return json({ error: true, errorMessage });
	}
}) satisfies RequestHandler;
