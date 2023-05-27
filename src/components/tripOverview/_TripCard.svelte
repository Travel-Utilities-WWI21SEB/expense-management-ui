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
		<div class="flex flex-row justify-center flex-wrap">
			{#each trip.participants as participant}
				<div class="mt-2">
					<ParticipantIcon {participant} />
				</div>
			{/each}
		</div>
	</div>
	{#if trip.data && trip.totalCost}
		<div>
			<h6 class="h6 p-2 flex justify-center">
				Total cost: {trip.totalCost}€
			</h6>
			<DonutChart data={trip.data} />
		</div>
	{/if}
</div>
