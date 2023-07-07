import { getCurrentUser, modifyDebtData, modifyTrip } from '$utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, cookies }) => {
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

	const token = cookies.get('token');
	if (token === undefined) {
		return {
			data: 'nodata'
		};
	} //TODO: Error handling
	const userId = getCurrentUser(token);

	const debtPromise = fetch(`/api/trips/${params.id}/debts`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const [tripResponse, userResponse, debtResponse] = await Promise.all([
		tripPromise,
		userPromise,
		debtPromise
	]);

	const userBody = await userResponse.json();
	const tripBody = await tripResponse.json();
	const debtBody = await debtResponse.json();

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTrip(tripBody.data, userBody.data, modifyDebtData(debtBody.data, userId)),
			userData: userBody
		};
	}

	return { tripData: tripBody.data };
};
