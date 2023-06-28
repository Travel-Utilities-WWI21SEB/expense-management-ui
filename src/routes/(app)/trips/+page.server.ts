import { modifyTripData } from '$utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const tripPromise = fetch('/api/trips', {
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

	// Resolve both promises at the same time
	const [tripResponse, userResponse] = await Promise.all([tripPromise, userPromise]);

	const userBody = await userResponse.json();
	const tripBody = await tripResponse.json();

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTripData(tripBody.data, userBody.data),
			userData: userBody
		};
	}
	return { ...tripBody, tripData: tripBody.data, userData: userBody };
}) satisfies PageServerLoad;
