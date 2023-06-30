<script lang="ts">
	import {TripCarousel, HeaderAndTwoPartsLayout, CostOverview} from "$components";
	import type {Cost} from "$tripDomain";
	import type {Debt} from "$debtDomain";
	import FunFacts from "../../../components/homescreen/_FunFacts.svelte";

	export let data;

	let debt: Debt = {
		deptId: '42eaae07-eda6-471f-997c-713d096737fe',
		creditor: 'Hans',
		debtor: 'Klaus',
		tripId: '20ff0272-75c3-4d7c-b397-12d0bd5551e6',
		amount: 5,
		currency: 'EUR',
		creationDate: new Date('2023-06-25'),
	};

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

	let debts = [debt, debt, debt, debt, debt];
</script>

<div>
	<HeaderAndTwoPartsLayout>
		<span slot="header">
			<div class="mdc-elevation--z3">
				<h2
					class="h2 text-center mt-2 bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
				>
					Everything at glance
				</h2>
			</div>
		</span>
		<span slot="left_element">
			<div class="mdc-elevation--z3">
				<TripCarousel trips={data.tripData} />
			</div>
		</span>
		<span slot="right_element">
			<div class="mdc-elevation--z3">
				<CostOverview {debts} />
			</div>
		</span>
	</HeaderAndTwoPartsLayout>

	<div class="pl-4 pr-8">
		<FunFacts {debts} />
	</div>
</div>
