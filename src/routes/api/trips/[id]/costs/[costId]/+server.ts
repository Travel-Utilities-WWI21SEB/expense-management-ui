import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const PATCH = (async ({ url, fetch, request, params }) => {
	console.log('PATCH');
	const requestBody = await request.json();
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/costs/${url.pathname.split('/')[5]}`,
			{
				method: 'PATCH',
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
}) satisfies RequestHandler;

export const DELETE = (async ({ url, fetch, params }) => {
	console.log('DELETE');
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/costs/${url.pathname.split('/')[5]}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		if (response.status === 204) {
			return json({ error: false, errorMessage: '' });
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
