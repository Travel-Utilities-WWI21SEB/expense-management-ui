import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const body = await request.json();
	const { email } = body;

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/check-email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (response.ok) {
			return json({ exists: false, valid: true, error: false, errorCode: '' });
		}

		const body = await response.json();

		// 400: Bad Request -> Email is invalid
		if (response.status === 400) {
			return json({ exists: false, valid: false, error: true, errorCode: body.errorCode });
		}

		// 409: Conflict -> Email already exists (implicitly handled here)
		return json({ exists: false, valid: true, error: true, errorCode: body.errorCode });
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorCode: 'EM-000'
		});
	}
};
