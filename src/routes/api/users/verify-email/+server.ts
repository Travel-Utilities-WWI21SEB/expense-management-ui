import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getErrorMessage } from '$utils';

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { email } = body;

	try {
		const response = await fetch(`http://localhost:8080/api/v1/users/check-email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email })
		});

		if (response.ok) {
			return json({ exists: false, valid: true, error: false, errorMessage: '' });
		}

		const { errorCode } = await response.json();
		const errorMessage = getErrorMessage(errorCode);

		// 400: Bad Request -> Email is invalid
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
