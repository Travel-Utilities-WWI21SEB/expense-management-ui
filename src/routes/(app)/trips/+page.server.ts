import type { User } from '$userDomain';
import type { TravelData } from '$tripDomain';
import { modifyTripData } from '$utils';

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
	const response = await fetch('api/trips', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();

	return { ...body, data: APINotFinishedHelper(body.data) };
}

type temporaryTripType = {
	tripId: string;
	startDate: string;
	participants: Array<User>;
	endDate: string;
	location: string;
};
