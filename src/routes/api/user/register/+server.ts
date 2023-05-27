import { currentUserId } from '$stores';
import { fail, json } from '@sveltejs/kit';
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

		console.log('response' + response.status);

		switch (response.status) {
			case 201 || 206: {
				const data = await response.json();
				const { userId } = data;

				currentUserId.set(userId);

				return json({ created: true, valid: true, error: false });
			}
			case 400: {
				// Server side validation failed
				return json({ created: false, valid: false, error: true });
			}
			case 409: {
				// This should never happen since we validate
				// the availability of the email and username
				// before sending the request to the server.
				return json({ created: false, valid: true, error: true });
			}
			default: {
				return json({ created: false, valid: false, error: true });
			}
		}
	} catch (error) {
		fail(500);
	}

	return json({ exists: false, valid: true });
}) satisfies RequestHandler;
