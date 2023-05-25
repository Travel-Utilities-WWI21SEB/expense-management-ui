<script lang="ts">
	import Card, { PrimaryAction } from '@smui/card';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
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

<h2 class="mdc-typography--headline4" style="margin: 0;">Get an Overview of all your Trips</h2>
<LayoutGrid>
	{#each tripData as trip}
		<Cell spanDevices={{ desktop: 6, tablet: 4, phone: 12 }}>
			<div class="mdc-elevation--z3">
				<Card variant="outlined" padded>
					<PrimaryAction on:click={() => onTripCardClick(trip)}>
						<TripCard {trip} />
					</PrimaryAction>
				</Card>
			</div>
		</Cell>
	{/each}
</LayoutGrid>
