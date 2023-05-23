<script lang="ts">
	import {
		TripDetailsHeader,
		TripDetailsCostOverview,
		HeaderAndTwoPartsLayout,
		TripDetailsDashboard
	} from '$components';
	import type { Cost } from '../../../interfaces/TripDetails';
	import type { TravelData } from '../../../interfaces/TripOverview';

	let trip_name = 'Reise A';
	let cost: Cost = {
		name: 'Kostenpunkt Aiai',
		amount: 45,
		costCategory: { name: 'Miete', color: '000000', icon: 'unicode' },
		creationDate: new Date(),
		endDate: new Date(),
		startDate: new Date(),
		currency: 'EUR',
		id: '982734592873465'
	};
	let costs = [cost, cost, cost, cost, cost, cost, cost, cost, cost, cost, cost, cost];
	let people = [
		{ name: 'Aidan Zimmer' },
		{ name: 'Johanna Deike' },
		{ name: 'Kevin Rieger' },
		{ name: 'lisa Reß-Park' },
		{ name: 'Luca Chmielarski' }
	];
	let time = '21.09.2023 - 26.10.2023';
	let trip: TravelData = {
		id: 'ABCD-01',
		name: 'Die epische Reise',
		costcategories: [
			{ name: 'Food', amount: 100, color: '#F7464A' },
			{ name: 'Real Estate', amount: 400, color: '#949FB1' },
			{ name: 'Mobility', amount: 200, color: '#46BFBD' }
		],

		data: {
			labels: ['Food', 'Real Estate', 'Mobility'],
			datasets: [
				{
					data: [100, 400, 200],
					backgroundColor: ['#F7464A', '#949FB1', '#46BFBD']
				}
			]
		},
		endDate: new Date('2023-07-12'),
		startDate: new Date('2023-06-12'),
		totalCost: 700,
		location: 'Palo Alto'
	};
</script>

<HeaderAndTwoPartsLayout>
	<span slot="header">
		<TripDetailsHeader {people} {trip_name} {time} />
	</span>
	<span slot="left_element">
		<TripDetailsCostOverview {costs} />
	</span>
	<span slot="rigth_element">
		<TripDetailsDashboard {trip} />
	</span>
</HeaderAndTwoPartsLayout>
