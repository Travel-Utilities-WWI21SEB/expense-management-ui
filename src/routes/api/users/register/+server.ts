import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getErrorMessage } from '$utils';

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { email, password, username } = body;

	try {
		const response = await fetch(`http://localhost:8080/api/v1/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password, username })
		});

		if (response.status === 201 || response.status === 206) {
			// 201: Created -> User successfully created
			// 206: Partial Content -> User successfully created, but email could not be sent
			return json({ error: false, errorMessage: '' });
		}

		const { errorCode } = await response.json();
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage: errorMessage });
	} catch (exception) {
		const errorMessage = getErrorMessage('EM-000'); // Default error message
		return json({ error: true, errorMessage: errorMessage });
	}
}) satisfies RequestHandler;
