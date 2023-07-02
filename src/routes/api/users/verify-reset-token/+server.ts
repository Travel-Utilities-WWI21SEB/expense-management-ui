import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { email, token } = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/verify-reset-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, token })
		});

		if (response.ok) {
			return json({ valid: true, error: false, errorMessage: '' });
		} else if (response.status !== 500) {
			return json({ valid: false, error: false, errorMessage: '' });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ valid: false, error: true, errorMessage });
	} catch (exception) {
		const errorMessage = getErrorMessage('EM-000'); // Default error message

		return json({
			success: false,
			error: true,
			errorMessage
		});
	}
};
