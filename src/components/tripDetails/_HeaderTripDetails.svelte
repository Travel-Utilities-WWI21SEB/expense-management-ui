<script lang="ts">
	import Card, { Content } from '@smui/card';
	import LayoutGrid from '@smui/layout-grid';
	import Cell from '@smui/layout-grid/src/Cell.svelte';
	import { HeaderTripDetailsLayout } from '$components';
	import ParticipantIcon from './_ParticipantIcon.svelte';

	export let trip_name: string;
	export let time: string;
	export let participants: Array<{ name: string }>;
</script>

<Card variant="outlined">
	<Content>
		<HeaderTripDetailsLayout>
			<span slot="main_details">
				<h1>{trip_name}</h1>
				<h6 style="padding: 1rem">{time}</h6>
			</span>
			<span slot="people">
				<LayoutGrid align="left">
					{#each participants as participant}
						<Cell spanDevices={{ desktop: 2, tablet: 1, phone: 1 }}>
							<ParticipantIcon {participant} />
						</Cell>
					{/each}
				</LayoutGrid>
			</span>
		</HeaderTripDetailsLayout>
	</Content>
</Card>
