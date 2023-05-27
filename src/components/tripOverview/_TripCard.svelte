<script lang="ts">
	import { DonutChart, ParticipantIcon, UserPaymentOverview, TripInfos } from '$components';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<h3 class="h3 justify-center">
	{trip.name}
</h3>
<div class="md:grid md:grid-cols-2">
	<div class="flex flex-col justify-center">
		<TripInfos {trip} />
		<UserPaymentOverview {trip} />
		<div class="flex flex-row justify-center">
			{#each trip.participants as participant}
				<div style="margin-top: 2rem">
					<ParticipantIcon {participant} />
				</div>
			{/each}
		</div>
	</div>
	{#if trip.data && trip.totalCost}
		<div>
			<h6 class="h6" style="padding: 1rem; display: flex; justify-content: center;">
				Total cost: {trip.totalCost}€
			</h6>
			<DonutChart data={trip.data} />
		</div>
	{/if}
</div>
