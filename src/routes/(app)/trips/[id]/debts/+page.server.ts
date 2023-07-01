import { modifyCosts, modifyTrip } from '$utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, url }) => {
	const tripPromise = fetch(`/api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const debtPromise = fetch(`/api/trips/${params.id}/debts`, {
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

	const [tripResponse, debtResponse, userResponse] = await Promise.all([
		tripPromise,
		debtPromise,
		userPromise
	]);

	const tripBody = await tripResponse.json();
	const userBody = await userResponse.json();
	const debtBody = await debtResponse.json();

	console.log('debtBody', debtBody);

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTrip(tripBody.data, userBody.data),
			userData: userBody,
			debtData: debtBody
		};
	}

	return { tripData: tripBody.data, debtBody: debtBody.data };
};
