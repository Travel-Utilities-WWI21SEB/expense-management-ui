import { PUBLIC_BASE_URL } from '$env/static/public';
import type { UserDetails } from '$userDomain';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	console.log('GET');
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorMessage: '', data: body as UserDetails });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage, data: null });
	} catch (exception) {
		return json({
			error: true,
			errorMessage: 'Something went wrong. Please try again later',
			data: null
		});
	}
};
