import { getCurrentUser, modifyTripData } from '$utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
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

	const token = cookies.get('token');
	if (token === undefined) {
		return {
			data: 'nodata'
		};
	} //TODO: Error handling
	const userId = getCurrentUser(token);

	// Resolve both promises at the same time
	const [tripResponse, userResponse] = await Promise.all([tripPromise, userPromise]);

	const userBody = await userResponse.json();
	const tripBody = await tripResponse.json();

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTripData(tripBody.data, userBody.data, userId),
			userData: userBody
		};
	}
	return { ...tripBody, tripData: tripBody.data, userData: userBody };
};
