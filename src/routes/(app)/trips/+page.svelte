<script lang="ts">
	import { goto } from '$app/navigation';
	import { AlertWithAction, HeaderBar, TripCard } from '$components';
	import { currentUser, errorCode, errorState } from '$stores';
	import { i } from '@inlang/sdk-js';
	import type {TravelData } from '$tripDomain';

	export let data;
	console.log(data.tripData);

	errorCode.set(data.errorCode);
	errorState.set(data.error);
	currentUser.set(data.userData.data);

	function onTripCardClick(trip: TravelData) {
		if (trip.hasAcceptedInvite) {
			goto(`/trips/${trip.tripId}/costs`);
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
	{#if data.tripData.length > 0}
		<div class="grid grid-cols-1 xl:grid-cols-2 place-items-stretch gap-4 mx-4">
			{#each data.tripData as trip}
				<button class="block card card-hover my-4 shadow-xl" on:click={() => onTripCardClick(trip)}>
					<TripCard {trip} />
				</button>
			{/each}
		</div>
	{:else}
		<section class=" mt-4">
			<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div class="mx-auto max-w-screen-sm text-center">
					<h1
						class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
					>
						{i('tripOverview.errorCode')}
					</h1>
					<p
						class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"
					>
						{i('tripOverview.noTripsText')}
					</p>
					<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
						{i('tripOverview.noTripsExplanation')}
					</p>
				</div>
			</div>
		</section>
	{/if}
{:else}
	<AlertWithAction alertHeading="Can't load trips" class="variant-ghost-error" />
{/if}
