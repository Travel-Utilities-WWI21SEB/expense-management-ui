import type { TravelData } from '$tripDomain';
import type { UserDetails } from '$userDomain';
import { modifyTripData } from '$utils';
import type { PageServerLoad } from './$types';

type LoadResponse = {
	error: boolean;
	errorCode: string;
	trips: TravelData[];
	user: UserDetails;
};

export const load: PageServerLoad = async ({ fetch }) => {
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

	if (tripBody.data && userBody.data) {
		return {
			...tripBody,
			trips: modifyTripData(tripBody.data, userBody.data),
			user: userBody.data
		} as LoadResponse;
	}
	return { ...tripBody, trips: tripBody.data, user: userBody.data } as LoadResponse;
};
