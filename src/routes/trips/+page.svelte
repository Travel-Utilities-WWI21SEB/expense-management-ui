<script lang="ts">
	import type { ChartData, TravelData } from '$tripDomain';
	import { goto } from '$app/navigation';
	import { TripCard } from '$components';
	import { allTrips, currentTrip } from '$stores';

	let tripData: Array<TravelData>;

	allTrips.subscribe((storeData) => {
		tripData = storeData;
		tripData.map((trip) => {
			let tripChartData: ChartData = {
				labels: [],
				datasets: [
					{
						data: [],
						backgroundColor: []
					}
				]
			};
			trip.costCategories.map((category) => {
				tripChartData.labels.push(category.name);
				tripChartData.datasets[0].data.push(category.totalAmount);
				tripChartData.datasets[0].backgroundColor.push(category.color);
				return category;
			});
			trip.data = tripChartData;
			trip.totalCost = tripChartData.datasets[0].data.reduce((partialSum, a) => partialSum + a, 0);
			return trip;
		});
	});

	function onTripCardClick(trip: TravelData) {
		currentTrip.update(() => trip);
		goto(`/trips/${trip.id}`);
	}
</script>

<h2 class="h2">Get an Overview of all your Trips</h2>
<div class="xl:grid xl:grid-cols-2">
	{#each tripData as trip}
		<button
			class="block card card-hover my-6 shadow-xl"
			style="width: 98%"
			on:click={() => onTripCardClick(trip)}
		>
			<TripCard {trip} />
		</button>
	{/each}
</div>
