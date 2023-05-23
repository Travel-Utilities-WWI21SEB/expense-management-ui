<script lang="ts">
	import { DonutChart } from '$components';
	import Card, { Content } from '@smui/card';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<Card variant="outlined" padded>
	<Content>
		<div class="mdc-typography--headline4">Dashboard</div>
		<div
			class="mdc-typography--headline6"
			style="padding: 1rem; display: flex; justify-content: center;"
		>
			Total cost: {trip.totalCost + ' €'}
		</div>
		{#if trip.data}
			<DonutChart data={trip.data} />
		{/if}
	</Content>
</Card>
