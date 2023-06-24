<script lang="ts">
	import {
		TripDetailsHeader,
		TripDetailsCostOverview,
		HeaderAndTwoPartsLayout,
		TripDetailsDashboard
	} from '$components';
	import type { Cost, TravelData } from '$tripDomain';
	import { currentTrip } from '$stores';

	let cost: Cost = {
		name: 'Kostenpunkt Aiai',
		amount: 10,
		costCategory: { name: 'Real Estate', color: '#000000', icon: 'unicode', totalAmount: 450 },
		creationDate: new Date(),
		endDate: new Date('2023-06-25'),
		startDate: new Date('2023-05-25'),
		currency: 'EUR',
		id: '982734592873465',
		paidFor: [
			{ username: 'ljahvdöas', amount: 6, currencyCode: 'EUR' },
			{ username: 'alsbvas', amount: 4, currencyCode: 'EUR' }
		],
		paidBy: 'ljahvdöas'
	};
	let costs = [cost, cost, cost, cost, cost, cost, cost, cost, cost, cost, cost, cost];

	let trip: TravelData;
	currentTrip.subscribe((currentTrip) => {
		trip = currentTrip;
	});
</script>

<HeaderAndTwoPartsLayout>
	<span slot="header">
		<div class="">
			<TripDetailsHeader {trip} />
		</div>
	</span>
	<span slot="left_element">
		<div class="h-full">
			<TripDetailsCostOverview {costs} {trip} />
		</div>
	</span>
	<span slot="right_element">
		<div class="h-full">
			<TripDetailsDashboard {trip} />
		</div>
	</span>
</HeaderAndTwoPartsLayout>
