import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { LoginRequest } from '../../../../domain/user/requests/LoginRequest';
import type { RequestHandler } from './$types';

export const POST = (async ({ cookies, fetch, request }) => {
	const body = await request.json();
	const requestBody: LoginRequest = body;
	const { email, password } = requestBody;

	try {
		const response = await fetch(`http://localhost:8080/api/v1/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			const { token, refreshToken } = await response.json();

			cookies.set('token', token, { path: '/' });
			cookies.set('refreshToken', refreshToken, { path: '/' });

			return json({ error: false, errorMessage: '' });
		}

		const { errorCode } = await response.json();
		const errorMessage = getErrorMessage(errorCode);

		// 400: Bad Request -> No input given or invalid input
		if (response.status === 400) {
			return json({ error: true, errorMessage: 'Please enter a valid email and password' });
		}

		// 403: Forbidden -> User is not activated yet
		if (response.status === 403) {
			return json({ activated: false, error: true, errorMessage: errorMessage });
		}

		return json({ error: true, errorMessage: errorMessage });
	} catch (error) {
		const errorMessage = getErrorMessage('EM-000'); // Default error message
		return json({ success: false, error: true, errorMessage: errorMessage });
	}
}) satisfies RequestHandler;
