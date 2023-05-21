<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { DonutChart } from '$components';
	import type { travelData } from '../../interfaces/TripOverview';
	export let trip: travelData;
</script>

<LayoutGrid>
	<Cell span={12}>
		<h2 class="mdc-typography--headline3" style="display: flex; justify-content: center;">
			{trip.name}
		</h2>
	</Cell>
	<Cell
		spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}
		style="display: flex; justify-content: center; flex-direction:column"
	>
		<h2 class="mdc-typography--subtitle1" style="padding: 0.5rem;">
			Start Date: {trip.startDate.toDateString()}
		</h2>
		<h2 class="mdc-typography--subtitle1" style="padding: 0.5rem;">
			End Date: {trip.endDate.toDateString()}
		</h2>
		<h2 class="mdc-typography--subtitle1" style="padding: 0.5rem;">
			Location: {trip.location}
		</h2>
	</Cell>
	{#if trip.data && trip.totalCost}
		<Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
			<h2
				class="mdc-typography--headline6"
				style="padding: 1rem; display: flex; justify-content: center;"
			>
				Total cost: {trip.totalCost}$
			</h2>
			<DonutChart data={trip.data} />
		</Cell>
	{/if}
</LayoutGrid>
