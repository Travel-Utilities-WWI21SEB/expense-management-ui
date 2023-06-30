import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const POST: RequestHandler = async ({ url, fetch, request }) => {
	console.log('POST');
	const requestBody = await request.json();
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${url.pathname.split('/')[3]}/costs`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			}
		);

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorMessage: '', data: body });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage });
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorMessage: 'Something went wrong. Please try again later'
		});
	}
};

export const GET: RequestHandler = async ({ fetch, params }) => {
	console.log('GET');

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/costs`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const body = await response.json();

			return json({ error: false, errorMessage: '', data: body });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage });
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorMessage: 'Something went wrong. Please try again later'
		});
	}
};
