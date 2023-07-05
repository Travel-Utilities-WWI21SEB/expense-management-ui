import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { email, password, token } = await request.json();

	try {
		console.log('email', email, 'password', password, 'token', token);
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password, token })
		});

		if (response.ok || response.status === 206) {
			return json({ success: true, error: false, errorCode: '' });
		}

		const body = await response.json();
		return json({ success: false, error: true, errorCode: body.errorCode });
	} catch (exception) {
		return json({
			success: false,
			error: true,
			errorCode: 'EM-000'
		});
	}
};
