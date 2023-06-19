import type { User } from '$userDomain';
import type { TravelData } from '$tripDomain';
import { modifyTripData } from '$utils';
import type { PageServerLoad } from './$types';

type temporaryTripType = {
	tripId: string;
	startDate: string;
	participants: Array<User>;
	endDate: string;
	location: string;
};

const APINotFinishedHelper = (data: Array<temporaryTripType>, userData: User) => {
	const trips: Array<TravelData> = data.map((currentTrip) => {
		const mapTrip: TravelData = {
			...currentTrip,
			participants: currentTrip.participants.map((participant) => {
				return {
					...participant,
					presenceEndDate: new Date(participant.presenceEndDate),
					presenceStartDate: new Date(participant.presenceStartDate)
				};
			}),
			costCategories: [],
			name: 'Trip Name',
			totalCost: undefined,
			userDept: undefined,
			userGets: undefined,
			startDate: new Date(currentTrip.startDate),
			endDate: new Date(currentTrip.endDate),
			hasAcceptedInvite: currentTrip.participants.filter(
				(user) => user.username === userData.username
			)[0].hasAcceptedInvite
		};
		return mapTrip;
	});
	return modifyTripData(trips);
};

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
	if (tripBody.data) {
		return {
			...tripBody,
			tripData: APINotFinishedHelper(tripBody.data, userBody.data),
			userData: userBody
		};
	}
	return { ...tripBody, tripData: tripBody.data, userData: userBody };
}) satisfies PageServerLoad;
