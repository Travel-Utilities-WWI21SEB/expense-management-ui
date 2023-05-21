<script lang="ts">
	import Button from '@smui/button/src/Button.svelte';
	import Card, { Content } from '@smui/card';
	import Fab from '@smui/fab';
	import LayoutGrid, { InnerGrid } from '@smui/layout-grid';
	import Cell from '@smui/layout-grid/src/Cell.svelte';
	import { HeaderTripDetailsLayout } from '$components';

	export let trip_name: string;
	export let time: string;
	export let people: Array<{ name: string }>;
</script>

<Card variant="outlined">
	<Content>
		<HeaderTripDetailsLayout>
			<span slot="main_details">
				<h1>{trip_name}</h1>
				<h6>{time}</h6>
			</span>
			<span slot="people">
				<LayoutGrid align="left">
					{#each people as person}
						<Cell spanDevices={{ desktop: 2, tablet: 1, phone: 1 }}>
							<Button disabled>
								<Fab
									ripple={false}
									style="background-image: url(https://placehold.co/58x58/a8e3f1/white?text={person.name
										.split(' ')
										.map((val) => val.substring(0, 1))
										.join('')});"
								/>
							</Button>
						</Cell>
					{/each}
				</LayoutGrid>
			</span>
		</HeaderTripDetailsLayout>
	</Content>
</Card>
