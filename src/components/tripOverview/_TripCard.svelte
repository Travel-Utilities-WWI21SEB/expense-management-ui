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
	{#if trip.data && trip.totalCost}
		<div>
			<h6 class="h6 p-2 flex justify-center">
				Total cost: {trip.totalCost}€
			</h6>
			<DonutChart data={trip.data} />
		</div>
	{/if}
</div>
