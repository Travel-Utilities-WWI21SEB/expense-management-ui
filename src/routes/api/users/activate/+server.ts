import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ cookies, fetch, request }) => {
	const { token } = await request.json();

	try {
		const response = await fetch(`http://localhost:8080/api/v1/users/activate?token=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const { token, refreshToken } = await response.json();

			cookies.set('token', token, { path: '/' });
			cookies.set('refreshToken', refreshToken, { path: '/' });

			return json({ tokenCorrect: true, error: false, errorMessage: '' });
		}

		const { errorCode } = await response.json();
		const errorMessage = getErrorMessage(errorCode);

		// 400: Bad Request -> User entered wrong token
		if (response.status === 400) {
			return json({ tokenCorrect: false, error: false, errorMessage: errorMessage });
		}

		return json({ error: true, errorMessage: errorMessage });
	} catch (error) {
		const errorMessage = getErrorMessage('EM-000'); // Default error message
		return json({ success: false, error: true, errorMessage: errorMessage });
	}
}) satisfies RequestHandler;
