<script lang="ts">
	import { DonutChart } from '$components';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<div class="card">
	<div class="p-4">
		<h3 class="h3 p-2 justify-center flex">Dashboard</h3>
		<h6 class="h6 p-2 justify-center flex">
			Total cost: {`${trip.totalCost}€`}
		</h6>
		{#if trip.data}
			<DonutChart data={trip.data} />
		{/if}
	</div>
</div>
