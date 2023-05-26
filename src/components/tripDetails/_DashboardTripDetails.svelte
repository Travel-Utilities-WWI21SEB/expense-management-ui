<script lang="ts">
	import { DonutChart } from '$components';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<div class="card">
	<h4 class="h4">Dashboard</h4>
	<h6 class="h6" style="padding: 1rem; display: flex; justify-content: center;">
		Total cost: {`${trip.totalCost}€`}
	</h6>
	{#if trip.data}
		<DonutChart data={trip.data} />
	{/if}
</div>
