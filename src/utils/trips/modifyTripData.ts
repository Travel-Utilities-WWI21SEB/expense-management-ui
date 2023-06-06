import type { ChartData, TravelData } from '$tripDomain';

export function modifyTripData(tripData: Array<TravelData>) {
	return tripData.map((trip) => {
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
			trip.costCategories.map((category) => {
				tripChartData.labels.push(category.name);
				tripChartData.datasets[0].data.push(category.totalAmount);
				tripChartData.datasets[0].backgroundColor.push(category.color);
				return category;
			});
			trip.data = tripChartData;
			trip.totalCost = tripChartData.datasets[0].data.reduce((partialSum, a) => partialSum + a, 0);
		} else {
			trip.data = {
				labels: ['no cost specified'],
				datasets: [{ data: [-1], backgroundColor: ['#808080'] }]
			};
		}

		return trip;
	});
}
