<script lang="ts">
	import {TripCarousel, HeaderAndTwoPartsLayout, CostOverview, TripDetailsCostOverview} from "$components";
	import type {TravelData, Cost} from "$tripDomain"
	import { allTrips } from '$stores';
	import { modifyTripData } from '$utils';
	import FunFacts from "../../../components/homescreen/_FunFacts.svelte";

	export let data;

	let cost: Cost = {
		name: 'Kostenpunkt Aiai',
		amount: 45,
		costCategory: { name: 'Miete', color: '#ffffff', icon: 'unicode', totalCost: 450, costCategoryId: 'ksldfajöldksfj'},
		creationDate: new Date(),
		endDate: new Date('2023-06-25'),
		startDate: new Date('2023-05-25'),
		currency: 'EUR',
		costId: '982734592873465',
		costCategoryId: 'ksldfajöldksfj',	
		contributors: [],
		creditor: 'Hans',
	};

	let costs = [cost, cost, cost, cost, cost];
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
				<TripCarousel trips={data.tripData}/>
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