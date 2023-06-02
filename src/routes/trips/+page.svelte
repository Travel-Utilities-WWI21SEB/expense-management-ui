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

<h2 class="h2 md:invisible text-center mt-2 text-primary-800 dark:text-primary-400">Your trips</h2>
<div class="xl:grid xl:grid-cols-2 pl-4">
	{#each tripData as trip}
		<button
			class="block card card-hover my-6 shadow-xl mx-auto md:mr-4"
			on:click={() => onTripCardClick(trip)}
		>
			<TripCard {trip} />
		</button>
	{/each}
</div>
