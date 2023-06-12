import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ fetch, request }) => {
	const { email, token } = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/verify-reset-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email, token: token })
		});

		if (response.ok) {
			return json({ valid: true, error: false, errorMessage: '' });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		// 404: Not found -> Token is invalid
		if (response.status === 404) {
			return json({ valid: false, error: false, errorMessage: errorMessage });
		}

		return json({ valid: false, error: true, errorMessage: errorMessage });
	} catch (exception) {
		const errorMessage = getErrorMessage('EM-000'); // Default error message

		return json({
			success: false,
			error: true,
			errorMessage: errorMessage
		});
	}
}) satisfies RequestHandler;
