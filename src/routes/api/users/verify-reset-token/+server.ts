import { PUBLIC_BASE_URL } from '$env/static/public';
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
			return json({ valid: true, error: false, errorCode: '' });
		} else if (response.status !== 500) {
			return json({ valid: false, error: false, errorCode: '' });
		}

		const body = await response.json();
		return json({ valid: false, error: true, errorCode: body.errorCode });
	} catch (exception) {
		return json({
			success: false,
			error: true,
			errorCode: 'EM-000'
		});
	}
};
