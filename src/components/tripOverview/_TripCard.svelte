<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { DonutChart, ParticipantIcon, UserPaymentOverview } from '$components';
	import type { TravelData } from '$tripDomain';
	import { TripInfos } from '$components';

	export let trip: TravelData;
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
		<TripInfos {trip} />
		<UserPaymentOverview {trip} />
		<LayoutGrid style="margin-top: 2rem">
			{#each trip.participants as participant}
				<Cell spanDevices={{ desktop: 1, tablet: 1, phone: 1 }}>
					<ParticipantIcon {participant} />
				</Cell>
			{/each}
		</LayoutGrid>
	</Cell>
	{#if trip.data && trip.totalCost}
		<Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
			<h2
				class="mdc-typography--headline6"
				style="padding: 1rem; display: flex; justify-content: center;"
			>
				Total cost: {trip.totalCost}€
			</h2>
			<DonutChart data={trip.data} />
		</Cell>
	{/if}
</LayoutGrid>
