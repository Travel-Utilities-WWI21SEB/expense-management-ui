<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { goto } from '$app/navigation';
	import { TripCard, HeaderBar } from '$components';
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

<div class="card p-4 mt-8 mx-4">
	<div class="grid grid-cols-2">
		<HeaderBar />
	</div>
</div>
<div class="grid grid-cols-1 xl:grid-cols-2 place-items-stretch gap-4 mx-4">
	{#each tripData as trip}
		<button class="block card card-hover my-4 shadow-xl" on:click={() => onTripCardClick(trip)}>
			<TripCard {trip} />
		</button>
	{/each}
</div>
