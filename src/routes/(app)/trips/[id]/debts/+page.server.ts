import { modifyDebtData, modifyTrip } from '$utils';
import { getCurrentUser } from '$utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
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

	const transactionPromise = fetch(`/api/trips/${params.id}/transactions`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const [tripResponse, debtResponse, userResponse, transactionResponse] = await Promise.all([
		tripPromise,
		debtPromise,
		userPromise,
		transactionPromise
	]);

	const tripBody = await tripResponse.json();
	const userBody = await userResponse.json();
	const debtBody = await debtResponse.json();
	const transactionBody = await transactionResponse.json();

	const token = cookies.get('token');
	if (token === undefined) {
		return {
			data: 'nodata'
		};
	} //TODO: Error handling
	const userId = getCurrentUser(token);

	return {
		...tripBody,
		tripData: modifyTrip(tripBody.data, userBody.data),
		userData: userBody,
		debtData: modifyDebtData(debtBody.data, userId),
		transactionData: transactionBody,
		currentUserId: userId
	};
};
