import { modifyTrip } from '$utils';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const tripResponse = await fetch(`/api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const userResponse = await fetch('/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const tripBody = await tripResponse.json();
	const userBody = await userResponse.json();

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTrip(tripBody.data, userBody.data),
			userData: userBody
		};
	}

	return { tripData: tripBody.data };
};
