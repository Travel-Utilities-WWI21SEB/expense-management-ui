import type { ChartData, CostCategory, TravelData, TravelDataAPI } from '$tripDomain';
import type { User } from '$userDomain';

const costCategoriesFilled = (categories: Array<CostCategory>): boolean => {
	let ctr = 0;
	categories.forEach((category) => {
		if (category.totalCost > 0) {
			ctr++;
		}
	});
	return ctr !== 0;
};

export function modifyTrip(trip: TravelDataAPI, userData: User): TravelData {
	const convertedTrip = {
		...trip,
		participants: trip.participants.map((participant) => {
			return {
				...participant,
				presenceEndDate: new Date(participant.presenceEndDate),
				presenceStartDate: new Date(participant.presenceStartDate)
			};
		}),
		startDate: new Date(trip.startDate),
		endDate: new Date(trip.endDate),
		hasAcceptedInvite: trip.participants.filter((user) => user.username === userData.username)[0]
			.hasAcceptedInvite,
		userDebt: parseFloat(trip.userDebt) < 0 ? 0 : parseFloat(trip.userDebt),
		userCredit: parseFloat(trip.userCredit) < 0 ? 0 : parseFloat(trip.userCredit)
	};

	//calculate data to be consumed by Chart JS
	const tripChartData: ChartData = {
		labels: [],
		datasets: [
			{
				data: [],
				backgroundColor: []
			}
		]
	};

	if (costCategoriesFilled(trip.costCategories)) {
		trip.costCategories.forEach((category) => {
			tripChartData.labels.push(category.name);
			tripChartData.datasets[0].data.push(category.totalCost);
			tripChartData.datasets[0].backgroundColor.push(category.color);
		});
		convertedTrip.data = tripChartData;
	} else {
		convertedTrip.data = {
			labels: ['No Costs Specified'],
			datasets: [{ data: [-1], backgroundColor: ['#808080'] }]
		};
	}

	return convertedTrip;
}

export function modifyTripData(tripData: Array<TravelDataAPI>, userData: User) {
	return tripData.map((trip) => {
		return modifyTrip(trip, userData);
	});
}
