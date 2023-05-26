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
		amount: 45,
		costCategory: { name: 'Miete', color: '000000', icon: 'unicode', totalAmount: 450 },
		creationDate: new Date(),
		endDate: new Date('2023-06-25'),
		startDate: new Date('2023-05-25'),
		currency: 'EUR',
		id: '982734592873465'
	};
	let costs = [cost, cost, cost, cost, cost, cost, cost, cost, cost, cost, cost, cost];

	let trip: TravelData;
	currentTrip.subscribe((currentTrip) => {
		trip = currentTrip;
	});
</script>

<HeaderAndTwoPartsLayout>
	<span slot="header">
		<div class="mdc-elevation--z3">
			<TripDetailsHeader {trip} />
		</div>
	</span>
	<span slot="left_element">
		<div class="mdc-elevation--z3">
			<TripDetailsCostOverview {costs} />
		</div>
	</span>
	<span slot="right_element">
		<div class="mdc-elevation--z3">
			<TripDetailsDashboard {trip} />
		</div>
	</span>
</HeaderAndTwoPartsLayout>
