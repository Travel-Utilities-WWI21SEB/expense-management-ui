import { authToken, currentUserId } from '$stores';
import { fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { email, password } = body;

	try {
		const response = await fetch(`http://localhost:8080/api/v1/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		console.log(JSON.stringify({ email, password }));

		switch (response.status) {
			case 200: {
				const { userId, token } = await response.json();

				currentUserId.set(userId);
				authToken.set(token);

				return json({ success: true, error: false, errorMessage: '' });
			}
			case 400: {
				return json({ success: false, error: true, errorMessage: 'Invalid email or password' });
			}
			case 401: {
				return json({
					success: false,
					error: true,
					errorMessage: 'Wrong password for the given address'
				});
			}
			case 404: {
				return json({
					success: false,
					error: true,
					errorMessage: 'User not found with the given address'
				});
			}
			default: {
				return json({ success: false, error: true, errorMessage: 'Something went wrong' });
			}
		}
	} catch (error) {
		fail(500);
	}

	return json({ exists: false, valid: true });
}) satisfies RequestHandler;
