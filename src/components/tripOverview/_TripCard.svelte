<script lang="ts">
	import { DonutChart, ParticipantIcon, UserPaymentOverview, TripInfos } from '$components';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<h3 class="h3 w-48" style="display: flex; justify-content: center;">
	{trip.name}
</h3>
<div
	class="w-16 md:w-48 lg:w.48"
	style="display: flex; justify-content: center; flex-direction:column"
>
	<TripInfos {trip} />
	<UserPaymentOverview {trip} />
	{#each trip.participants as participant}
		<div style="margin-top: 2rem" class="w-1">
			<ParticipantIcon {participant} />
		</div>
	{/each}
</div>
{#if trip.data && trip.totalCost}
	<div class="w-16 md:w-48 lg:w.48">
		<h6 class="h6" style="padding: 1rem; display: flex; justify-content: center;">
			Total cost: {trip.totalCost}€
		</h6>
		<DonutChart data={trip.data} />
	</div>
{/if}
