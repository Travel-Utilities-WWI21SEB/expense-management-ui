import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { email, password, token } = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password, token })
		});

		if (response.ok || response.status === 206) {
			return json({ success: true, error: false, errorMessage: '' });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ success: false, error: true, errorMessage });
	} catch (exception) {
		const errorMessage = getErrorMessage('EM-000'); // Default error message

		return json({
			success: false,
			error: true,
			errorMessage
		});
	}
};
