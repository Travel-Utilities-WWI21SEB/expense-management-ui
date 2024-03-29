import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface ResponseType {
	errorMessage: string;
	errorCode: string;
}

export const POST: RequestHandler = async ({ fetch, request }) => {
	// Get multipart form data
	const formData = await request.formData();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/register`, {
			method: 'POST',
			body: formData
		});

		if (response.status === 201 || response.status === 206) {
			// 201: Created -> User successfully created
			// 206: Partial Content -> User successfully created, but email could not be sent
			return json({ error: false, errorCode: '' });
		}

		const body = (await response.json()) as ResponseType;
		return json({ error: true, errorCode: body.errorCode });
	} catch (exception) {
		console.error(exception);
		return json({ error: true, errorCode: 'EM-000' });
	}
};
