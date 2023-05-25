<script lang="ts">
	import Card, { Content } from '@smui/card';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import {
		HeaderTripDetailsLayout,
		TripInfos,
		UserPaymentOverview,
		ParticipantIcon
	} from '$components';
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
