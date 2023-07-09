import type { TravelData } from '$tripDomain';
import type { UserDetails } from '$userDomain';
import { modifyTripData } from '$utils';
import type { DebtOverview } from '../../../domain/debt/DebtOverview';
import type { PageServerLoad } from './$types';

type LoadResponse = {
	error: boolean;
	errorCode: string;
	debts: DebtOverview;
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

	const debtPromise = fetch('/api/debts', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	// Resolve both promises at the same time
	const [tripResponse, userResponse, debtResponse] = await Promise.all([
		tripPromise,
		userPromise,
		debtPromise
	]);

	const userBody = await userResponse.json();
	const tripBody = await tripResponse.json();
	const debtBody = await debtResponse.json();

	const error = tripBody.error || userBody.error || debtBody.error;
	const errorCode = tripBody.errorCode || userBody.errorCode || debtBody.errorCode;
	const tripData =
		tripBody.data && userBody.data ? modifyTripData(tripBody.data, userBody.data) : tripBody.data;

	return {
		error,
		errorCode,
		debts: debtBody.data,
		trips: tripData,
		user: userBody.data
	} as LoadResponse;
};
