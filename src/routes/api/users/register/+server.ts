import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const body = await request.json();
	const { email, password, username, firstName, lastName, location, birthday, createdAt } = body;

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password,
				username,
				firstName,
				lastName,
				location,
				birthday,
				createdAt
			})
		});

		if (response.status === 201 || response.status === 206) {
			// 201: Created -> User successfully created
			// 206: Partial Content -> User successfully created, but email could not be sent
			return json({ error: false, errorCode: '' });
		}

		const body = await response.json();
		return json({ error: true, errorCode: body.errorCode });
	} catch (exception) {
		return json({ error: true, errorCode: 'EM-000' });
	}
};
