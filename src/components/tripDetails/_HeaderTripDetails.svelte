<script lang="ts">
	import Card, { Content } from '@smui/card';
	import LayoutGrid from '@smui/layout-grid';
	import Cell from '@smui/layout-grid/src/Cell.svelte';
	import { HeaderTripDetailsLayout, TripInfos, UserPaymentOverview } from '$components';
	import ParticipantIcon from './_ParticipantIcon.svelte';
	import type { TravelData } from '$tripDomain';

	export let trip: TravelData;
</script>

<Card variant="outlined">
	<Content>
		<HeaderTripDetailsLayout>
			<span slot="main_details">
				<h3 class="mdc-typography--headline3">{trip.name}</h3>
				<TripInfos {trip} />
			</span>
			<span slot="payments">
				<UserPaymentOverview {trip} />
			</span>
			<span slot="people">
				<LayoutGrid align="left">
					{#each trip.participants as participant}
						<Cell spanDevices={{ desktop: 1, tablet: 1, phone: 1 }}>
							<ParticipantIcon {participant} />
						</Cell>
					{/each}
				</LayoutGrid>
			</span>
		</HeaderTripDetailsLayout>
	</Content>
</Card>
