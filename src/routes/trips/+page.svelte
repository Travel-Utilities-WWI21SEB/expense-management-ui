<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { goto } from '$app/navigation';
	import { TripCard } from '$components';
	import { allTrips, currentTrip } from '$stores';
	import { modifyTripData } from '$utils';

	let tripData: Array<TravelData>;

	allTrips.subscribe((storeData) => {
		tripData = modifyTripData(storeData);
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
