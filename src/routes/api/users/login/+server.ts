import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, fetch, request }) => {
	const body = await request.json();
	const { email, password, rememberMe } = body;

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

			return json({ success: true, activated: true, error: false, errorCode: '' });
		}

		const body = await response.json();

		// 400: Bad Request -> No input given or invalid input
		if (response.status === 400) {
			return json({
				success: false,
				error: true,
				errorCode: body.errorCode
			});
		}

		// 403: Forbidden -> User is not activated yet
		if (response.status === 403) {
			return json({ success: false, activated: false, error: false, errorCode: body.errorCode });
		}

		return json({ success: false, error: true, errorCode: body.errorCode });
	} catch (error) {
		return json({ success: false, error: true, errorCode: 'EM-000' });
	}
};
