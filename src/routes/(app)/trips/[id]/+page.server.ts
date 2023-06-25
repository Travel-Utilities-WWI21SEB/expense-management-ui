import { modifyTrip } from '$utils';
import { modifyCosts } from '../../../../utils/trips/costs/modifyCostData';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const tripResponse = await fetch(`/api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const costsResponse = await fetch(`/api/trips/${params.id}/costs`, {
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
