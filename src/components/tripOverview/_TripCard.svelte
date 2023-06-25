<script lang="ts">
	import { DonutChart, UserPaymentOverview, TripInfos, Participants } from '$components';
	import type { TravelData } from '$tripDomain';
	import AlertWithAction from '../general/_AlertWithAction.svelte';

	export let trip: TravelData;
</script>

<h3 class="h3 justify-center">
	{trip.name}
</h3>
<div class="md:grid md:grid-cols-2">
	<div class="flex flex-col justify-center">
		<TripInfos {trip} />
		{#if trip.hasAcceptedInvite}
			<UserPaymentOverview {trip} />
		{:else}
			<div class="m-8">
				<AlertWithAction alertHeading="Accept invitation" class="variant-ghost-warning" />
			</div>
		{/if}
		<Participants participants={trip.participants} justifyCenter={true} />
	</div>
	<div class="pr-4 pb-4">
		{#if trip.data && trip.hasAcceptedInvite}
			<h6 class="h6 p-4 flex justify-center">
				{trip.totalCost ? `Total cost: ${trip.totalCost}€` : `Total cost: 0€`}
			</h6>
			<DonutChart data={trip.data} />
		{:else}
			<h6 class="h6 p-4">No Access to data</h6>
			<div class="mx-6 placeholder-circle w-72 animate-pulse" />
		{/if}
	</div>
</div>
