import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { email, password, username } = body;

	try {
		const response = await fetch(`http://localhost:8080/api/v1/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password, username })
		});

		if (response.status === 201 || response.status === 206) {
			// 201: Created -> User successfully created
			// 206: Partial Content -> User successfully created, but email could not be sent
			return json({ created: true, valid: true, error: false, errorMessage: '' });
		}

		const { errorMessage } = await response.json();

		// 400: Bad Request -> Email, passowrd or username is invalid
		// 409: Conflict -> This should never happen since we validate the availability of the email and username
		if (response.status === 400 || response.status === 409) {
			return json({ created: false, error: true, errorMessage: errorMessage });
		}

		throw error(response.status, errorMessage);
	} catch (exception) {
		const errorMessage = (exception as Error).message;
		throw error(500, errorMessage);
	}
}) satisfies RequestHandler;
