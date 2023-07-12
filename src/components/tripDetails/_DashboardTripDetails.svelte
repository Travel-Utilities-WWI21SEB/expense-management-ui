<script lang="ts">
	import { DonutChart } from '$components';
	import type { TravelData } from '$tripDomain';
	import { i } from '@inlang/sdk-js';

	export let trip: TravelData;
</script>

<div class="card h-full">
	<div class="p-4">
		<h3 class="h3 p-2 justify-center flex">{i('tripDetails.dashboard')}</h3>
		<h6 class="h6 p-2 justify-center flex">
			{trip.totalCost
				? i('tripDetails.totalCosts') + trip.totalCost + '€'
				: i('tripDetails.zeroTotalCosts')}
		</h6>
		{#if trip.data}
			<DonutChart data={trip.data} />
		{/if}
	</div>
</div>
