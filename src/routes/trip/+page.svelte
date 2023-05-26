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
		goto(`/trip/${trip.id}`);
	}
</script>

<h4 class="h4" style="margin: 0;">Get an Overview of all your Trips</h4>
{#each tripData as trip}
	<button class="w-48 md:w-32 lg:w.48" on:click={() => onTripCardClick(trip)}>
		<div class="card p-4">
			<TripCard {trip} />
		</div>
	</button>
{/each}
