import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { getErrorMessage } from '$utils';
import type { CostCategory } from '../../../../../domain/trip/CostCategory';

export const GET = (async ({ fetch, params }) => {
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
		// 409: Conflict -> Email already exists (implicitly handled here)
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorMessage: 'Something went wrong. Please try again later'
		});
	}
}) satisfies RequestHandler;

export const POST = (async ({ fetch, request, url }) => {
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

		// 409: Conflict -> Email already exists (implicitly handled here)
		return json({ exists: false, error: true, errorMessage });
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorMessage: 'Something went wrong. Please try again later'
		});
	}
}) satisfies RequestHandler;
