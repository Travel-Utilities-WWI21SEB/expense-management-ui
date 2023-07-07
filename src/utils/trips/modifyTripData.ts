import type { ChartData, CostCategory, SortedDebts, TravelData } from '$tripDomain';
import type { User } from '$userDomain';
import { modifyDebtData } from '../debt/modifyDeptData';

const costCategoriesFilled = (categories: Array<CostCategory>): boolean => {
	let ctr = 0;
	categories.forEach((category) => {
		if (category.totalCost > 0) {
			ctr++;
		}
	});
	return ctr !== 0;
};

export function modifyTrip(trip: TravelData, userData: User, debtData: SortedDebts) {
	trip = {
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
		userDebt:
			debtData.debitorDebts.length < 1
				? 0
				: debtData?.debitorDebts.reduce(
						(partialSum, debt) => parseFloat(partialSum + debt.amount),
						0
				  ),
		userCredit:
			debtData.creditorDebts.length < 1
				? 0
				: debtData?.creditorDebts.reduce(
						(partialSum, credit) => parseFloat(partialSum + credit.amount),
						0
				  )
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
		trip.data = tripChartData;
	} else {
		trip.data = {
			labels: ['no cost specified'],
			datasets: [{ data: [-1], backgroundColor: ['#808080'] }]
		};
	}

	return trip;
}

export function modifyTripData(tripData: Array<TravelData>, userData: User, userId: string) {
	return tripData.map(async (trip) => {
		const response = await fetch(`/api/trips/${trip.tripId}/debts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const debtBody = await response.json();

		return modifyTrip(trip, userData, modifyDebtData(debtBody.data, userId));
	});
}
