<script lang="ts">
	import { DonutChart, UserPaymentOverview, TripInfos, Participants } from '$components';
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
		<Participants participants={trip.participants} justifyCenter={true} />
	</div>
	<div class="pr-4 pb-4">
		<h6 class="h6 p-4 flex justify-center">
			{trip.totalCost ? `Total cost: ${trip.totalCost}€` : 'No Costs specified'}
		</h6>
		{#if trip.data}
			<DonutChart data={trip.data} />
		{/if}
	</div>
</div>
