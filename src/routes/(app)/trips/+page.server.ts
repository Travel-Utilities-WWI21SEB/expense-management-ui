import type { User } from '$userDomain';
import type { TravelData } from '$tripDomain';
import { modifyTripData } from '$utils';

type temporaryTripType = {
	tripId: string;
	startDate: string;
	participants: Array<User>;
	endDate: string;
	location: string;
};

const APINotFinishedHelper = (data: Array<temporaryTripType>) => {
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
			endDate: new Date(currentTrip.endDate)
		};
		return mapTrip;
	});
	return modifyTripData(trips);
};

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
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
	return { ...tripBody, tripData: APINotFinishedHelper(tripBody.data), userData: userBody };
}
