import { modifyTrip } from '$utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const tripPromise = await fetch(`/api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const userPromise = fetch('/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const [tripResponse, userResponse] = await Promise.all([tripPromise, userPromise]);

	const userBody = await userResponse.json();
	const tripBody = await tripResponse.json();

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTrip(tripBody.data, userBody.data),
			userData: userBody
		};
	}

	return { tripData: tripBody.data };
};
