import { fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { username } = body;

	try {
		const response = await fetch(`http://localhost:8080/api/v1/user/check-username`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username })
		});

		switch (response.status) {
			case 200: {
				return json({ exists: false, valid: true });
			}
			case 400: {
				return json({ exists: false, valid: false });
			}
			case 409: {
				return json({ exists: true, valid: true });
			}
			default: {
				fail(500);
			}
		}
	} catch (error) {
		fail(500);
	}

	return json({ exists: false, valid: true });
}) satisfies RequestHandler;
