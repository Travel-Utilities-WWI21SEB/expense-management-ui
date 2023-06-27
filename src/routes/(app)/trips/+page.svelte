<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { goto } from '$app/navigation';
	import { TripCard, HeaderBar, AlertWithAction } from '$components';
	import { currentTrip, currentUser } from '$stores';
	import { errorMessage, errorState } from '$stores';

	export let data;

	errorMessage.set(data.errorMessage);
	errorState.set(data.error);
	currentUser.set(data.userData.data);

	function onTripCardClick(trip: TravelData) {
		currentTrip.update(() => trip);
		if (trip.hasAcceptedInvite) {
			goto(`/trips/${trip.tripId}`);
		} else {
			goto(`/trips/${trip.tripId}/acceptInvite`);
		}
	}
</script>

<div class="card p-4 mt-8 mx-4">
	<div class="grid grid-cols-2">
		<HeaderBar />
	</div>
</div>
{#if !$errorState}
	{#if data.tripData}
		<div class="grid grid-cols-1 xl:grid-cols-2 place-items-stretch gap-4 mx-4">
			{#each data.tripData as trip}
				<button class="block card card-hover my-4 shadow-xl" on:click={() => onTripCardClick(trip)}>
					<TripCard {trip} />
				</button>
			{/each}
		</div>
	{:else}
		<div class="card p-4 mt-8 mx-4 h-96">
			<h2 class="text-center">No Trips specified</h2>
		</div>
	{/if}
{:else}
	<AlertWithAction alertHeading="Can't load trips" class="variant-ghost-error" />
{/if}
