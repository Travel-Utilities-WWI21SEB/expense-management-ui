import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { username } = body;

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/check-username`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: username })
		});

		if (response.ok) {
			return json({ exists: false, valid: true, error: false, errorMessage: '' });
		}

		const { errorCode } = await response.json();
		const errorMessage = getErrorMessage(errorCode);

		// 400: Bad Request -> Username is invalid
		if (response.status === 400) {
			return json({ exists: false, valid: false, error: true, errorMessage: errorMessage });
		}

		// 409: Conflict -> Email already exists (implicitly handled here)
		return json({ exists: false, valid: true, error: true, errorMessage: errorMessage });
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorMessage: 'Something went wrong. Please try again later'
		});
	}
}) satisfies RequestHandler;
