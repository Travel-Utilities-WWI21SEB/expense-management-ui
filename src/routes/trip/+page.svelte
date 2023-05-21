<script lang="ts">
	import Card, { Content, PrimaryAction } from '@smui/card';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { DonutChart } from '$components';
	import type { chartData, travelData } from '../../interfaces/TripOverview';
	import { goto } from '$app/navigation';
	let travelData: Array<travelData> = [
		{
			id: 'ABCD-01',
			name: 'Die epische Reise',
			costcategories: [
				{ name: 'Food', amount: 100, color: '#F7464A' },
				{ name: 'Real Estate', amount: 400, color: '#949FB1' },
				{ name: 'Mobility', amount: 200, color: '#46BFBD' }
			],

			data: undefined,
			endDate: new Date('2023-07-12'),
			startDate: new Date('2023-06-12'),
			totalCost: undefined,
			location: 'Palo Alto'
		},
		{
			id: 'ZYX-99',
			name: 'Die guten alten Zeiten',
			costcategories: [
				{ name: 'Food', amount: 150, color: '#F7464A' },
				{ name: 'Real Estate', amount: 500, color: '#949FB1' },
				{ name: 'Mobility', amount: 250, color: '#46BFBD' },
				{ name: 'Skiing', amount: 350, color: '#D3D3D3' }
			],

			data: undefined,
			endDate: new Date('2024-04-02'),
			startDate: new Date('2024-03-19'),
			totalCost: undefined,
			location: 'Vals Schweiz'
		}
	];

	travelData.map((trip) => {
		let tripChartData: chartData = {
			labels: [],
			datasets: [
				{
					data: [],
					backgroundColor: []
				}
			]
		};
		trip.costcategories.map((category) => {
			tripChartData.labels.push(category.name);
			tripChartData.datasets[0].data.push(category.amount);
			tripChartData.datasets[0].backgroundColor.push(category.color);
			return category;
		});
		trip.data = tripChartData;
		trip.totalCost = tripChartData.datasets[0].data.reduce((partialSum, a) => partialSum + a, 0);
		return trip;
	});
</script>

<h2 class="mdc-typography--headline4" style="margin: 0;">Get an Overview of all your Trips</h2>
<LayoutGrid>
	{#each travelData as trip}
		<Cell spanDevices={{ desktop: 6, tablet: 4, phone: 12 }}>
			<Card variant="outlined" padded>
				<PrimaryAction
					on:click={() => {
						goto(`/trip/${trip.id}`);
					}}
				>
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
				</PrimaryAction>
			</Card>
		</Cell>
	{/each}
</LayoutGrid>
