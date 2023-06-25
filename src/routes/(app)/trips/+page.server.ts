import { modifyTripData } from '$utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const tripResponse = await fetch('api/trips', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const tripBody = await tripResponse.json();

	const userResponse = await fetch('api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const userBody = await userResponse.json();
	console.log(tripBody.data[0].costCategories);
	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTripData(tripBody.data, userBody.data),
			userData: userBody
		};
	}
	return { ...tripBody, tripData: tripBody.data, userData: userBody };
}) satisfies PageServerLoad;
