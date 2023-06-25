import type { ChartData, TravelData } from '$tripDomain';
import type { User } from '$userDomain';

export function modifyTrip(trip: TravelData, userData: User) {
	trip = {
		...trip,
		participants: trip.participants.map((participant) => {
			return {
				...participant,
				presenceEndDate: new Date(participant.presenceEndDate),
				presenceStartDate: new Date(participant.presenceStartDate)
			};
		}),
		costCategories: trip.costCategories,
		startDate: new Date(trip.startDate),
		endDate: new Date(trip.endDate),
		hasAcceptedInvite: trip.participants.filter((user) => user.username === userData.username)[0]
			.hasAcceptedInvite
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
	if (trip.costCategories.length > 1) {
		trip.costCategories.forEach((category) => {
			tripChartData.labels.push(category.name);
			tripChartData.datasets[0].data.push(category.totalCost);
			tripChartData.datasets[0].backgroundColor.push(category.color);
		});
		trip.data = tripChartData;
	} else {
		trip.data = {
			labels: ['no cost specified'],
			datasets: [{ data: [-1], backgroundColor: ['#808080'] }]
		};
	}

	return trip;
}

export function modifyTripData(tripData: Array<TravelData>, userData: User) {
	return tripData.map((trip) => {
		return modifyTrip(trip, userData);
	});
}
