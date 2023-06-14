import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ cookies, fetch, request }) => {
	const body = await request.json();
	const { email, password, rememberMe } = body;

	if (!email || !password) {
		return json({
			success: false,
			error: true,
			errorMessage: 'Please enter a valid email and password'
		});
	}

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			const body = await response.json();
			const { token, refreshToken } = body;

			cookies.set('token', token, { path: '/' });
			cookies.set('refreshToken', refreshToken, { path: '/' });

			if (rememberMe) {
				cookies.set('email', email, { path: '/' });
			} else {
				// Delete maybe existing email cookie
				cookies.delete('email', { path: '/' });
			}

			return json({ success: true, activated: true, error: false, errorMessage: '' });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		// 400: Bad Request -> No input given or invalid input
		if (response.status === 400) {
			return json({
				success: false,
				error: true,
				errorMessage: 'Please enter a valid email and password'
			});
		}

		// 403: Forbidden -> User is not activated yet
		if (response.status === 403) {
			return json({ success: false, activated: false, error: false, errorMessage });
		}

		return json({ success: false, error: true, errorMessage });
	} catch (error) {
		console.log(error);
		const errorMessage = getErrorMessage('EM-000'); // Default error message
		return json({ success: false, error: true, errorMessage });
	}
}) satisfies RequestHandler;
