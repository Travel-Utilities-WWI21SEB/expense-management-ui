<script lang="ts">
	import {
		TripDetailsHeader,
		TripDetailsCostOverview,
		HeaderAndTwoPartsLayout,
		TripDetailsDashboard
	} from '$components';
	import type { Cost } from '../../../interfaces/Trips';
	import type { TravelData } from '../../../interfaces/Trips';
	import { calculateDate } from '../../../modules/general.svelte';
	import { currentTrip } from '../../../stores/tripsStore';

	let cost: Cost = {
		name: 'Kostenpunkt Aiai',
		amount: 45,
		costCategory: { name: 'Miete', color: '000000', icon: 'unicode', totalAmount: 450 },
		creationDate: new Date(),
		endDate: new Date(),
		startDate: new Date(),
		currency: 'EUR',
		id: '982734592873465'
	};
	let costs = [cost, cost, cost, cost, cost, cost, cost, cost, cost, cost, cost, cost];
	let time: string;

	let trip: TravelData;
	currentTrip.subscribe((currentTrip) => {
		trip = currentTrip;
		time = calculateDate(currentTrip.startDate) + ' - ' + calculateDate(currentTrip.endDate);
	});
</script>

<HeaderAndTwoPartsLayout>
	<span slot="header">
		<TripDetailsHeader participants={trip.participants} trip_name={trip.name} {time} />
	</span>
	<span slot="left_element">
		<TripDetailsCostOverview {costs} />
	</span>
	<span slot="rigth_element">
		<TripDetailsDashboard {trip} />
	</span>
</HeaderAndTwoPartsLayout>
