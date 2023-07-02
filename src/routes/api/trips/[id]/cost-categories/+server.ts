import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ fetch, params }) => {
	console.log('GET');

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/cost-categories`, {
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

export const POST: RequestHandler = async ({ fetch, request }) => {
	console.log('POST');
	const requestBody = await request.json();
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${requestBody.id}/cost-categories`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody.body)
			}
		);

		if (response.ok) {
			return json({ exists: false, error: false, errorMessage: '' });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ exists: false, error: true, errorMessage });
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorMessage: 'Something went wrong. Please try again later'
		});
	}
};
