import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { email } = body;

	try {
		const response = await fetch(`http://localhost:8080/api/v1/user/check-email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		switch (response.status) {
			case 200: {
				return json({ exists: false, valid: true, error: false });
			}
			case 400: {
				return json({ exists: false, valid: false, error: false });
			}
			case 409: {
				return json({ exists: true, valid: true, error: false });
			}
			default: {
				return json({ exists: false, valid: false, error: true });
			}
		}
	} catch (error) {
		return json({ exists: false, valid: false, error: true });
	}
}) satisfies RequestHandler;
