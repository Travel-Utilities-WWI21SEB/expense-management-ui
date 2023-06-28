import type { UserDetails } from '$userDomain';
import { getErrorMessage } from '$utils';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type dataResponse = {
	error: boolean;
	errorMessage: string;
	user: UserDetails;
};

export const load = (async (event: ServerLoadEvent) => {
	const response = await event.fetch('/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();

	if (!response.ok) {
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);
		return {
			error: true,
			errorMessage,
			user: null
		} as unknown as dataResponse;
	}

	return {
		error: false,
		errorMessage: '',
		user: body.data
	} as unknown as dataResponse;
}) satisfies PageServerLoad;
