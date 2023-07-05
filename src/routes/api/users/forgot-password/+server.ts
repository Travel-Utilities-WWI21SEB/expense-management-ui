import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const { email } = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (!response.ok) {
			const body = await response.json();
			return json({ error: true, errorCode: body.errorCode });
		}

		return json({ error: false, errorCode: '' });
	} catch (error) {
		return json({ error: true, errorCode: 'EM-000' });
	}
};
