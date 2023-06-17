import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ fetch }) => {
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips`, {
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
}) satisfies RequestHandler;

export const POST = (async ({ fetch, request }) => {
	const body = await request.json();
	const { newTrip } = body;

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ newTrip })
		});

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
