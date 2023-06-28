import { modifyCosts, modifyTrip } from '$utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const tripPromise = fetch(`/api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const costPromise = fetch(`/api/trips/${params.id}/costs`, {
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

	const [tripResponse, costsResponse, userResponse] = await Promise.all([
		tripPromise,
		costPromise,
		userPromise
	]);

	const tripBody = await tripResponse.json();
	const costsBody = await costsResponse.json();
	const userBody = await userResponse.json();

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTrip(tripBody.data, userBody.data),
			userData: userBody,
			costsData: modifyCosts(costsBody.data, tripBody.data.costCategories)
		};
	}

	return { tripData: tripBody.data, costsData: costsBody.data };
}) satisfies PageServerLoad;
