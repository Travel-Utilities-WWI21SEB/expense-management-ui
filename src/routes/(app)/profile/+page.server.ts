import type { UserDetails } from '$userDomain';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type dataResponse = {
	error: boolean;
	errorCode: string;
	user: UserDetails;
};

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const response = await event.fetch('/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();

	if (!response.ok) {
		return {
			error: true,
			errorCode: body.errorCode,
			user: null
		} as unknown as dataResponse;
	}

	return {
		error: false,
		errorCode: '',
		user: body.data
	} as unknown as dataResponse;
};
