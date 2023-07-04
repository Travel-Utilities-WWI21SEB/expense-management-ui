import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, fetch, request }) => {
	const { token } = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/activate?token=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const body = await response.json();
			const { token, refreshToken } = body;

			cookies.set('token', token, { path: '/' });
			cookies.set('refreshToken', refreshToken, { path: '/' });

			return json({ tokenCorrect: true, error: false, errorMessage: '' });
		} else if (response.status !== 500) {
			return json({ valid: false, error: false, errorMessage: '' });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage });
	} catch (error) {
		const errorMessage = getErrorMessage('EM-000'); // Default error message
		return json({ success: false, error: true, errorMessage });
	}
};
