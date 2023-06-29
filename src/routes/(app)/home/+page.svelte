<script lang="ts">
	import {TripCarousel, HeaderAndTwoPartsLayout, CostOverview, TripDetailsCostOverview} from "$components";
	import type {TravelData, Cost} from "$tripDomain"
	import { allTrips } from '$stores';
	import { modifyTripData } from '$utils';
	import FunFacts from "../../../components/homescreen/_FunFacts.svelte";

	let trips: Array<TravelData>
    allTrips.subscribe((storeData) => {
		trips = modifyTripData(storeData);
	});

	let cost: Cost = {
		name: 'Kostenpunkt Aiai',
		amount: 45,
		costCategory: { name: 'Miete', color: '#ffffff', icon: 'unicode', totalAmount: 450 },
		creationDate: new Date(),
		endDate: new Date('2023-06-25'),
		startDate: new Date('2023-05-25'),
		currency: 'EUR',
		id: '982734592873465'
	};

	let cost2: Cost = {
		name: 'Miete September',
		amount: 500,
		costCategory: { name: 'Miete', color: '#ffffff', icon: 'unicode', totalAmount: 450 },
		creationDate: new Date(),
		endDate: new Date('2023-06-25'),
		startDate: new Date('2023-05-25'),
		currency: 'EUR',
		id: '982734592873467'
	};

	let costs = [cost, cost2, cost, cost2, cost];
</script>

<div>

	<HeaderAndTwoPartsLayout>
		<span slot="header">
			<div class="mdc-elevation--z3">
				<h2 class="h2 text-center mt-2 bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone">Everything at glance</h2>
			</div>
		</span>
		<span slot="left_element">
			<div class="mdc-elevation--z3">
				<TripCarousel {trips}/>
			</div>
		</span>
		<span slot="right_element">
			<div class="mdc-elevation--z3">
				<CostOverview {costs} />
			</div>
		</span>
	</HeaderAndTwoPartsLayout>
	
	<div class="pl-4 pr-8">

		<FunFacts {costs}/>
	</div>
</div>