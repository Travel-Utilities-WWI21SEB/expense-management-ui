<script>
	import HeaderAndTwoPartsLayout from '../../../components/general/HeaderAndTwoPartsLayout.svelte';
	import CostsOverviewTripDetails from '../../../components/tripDetails/CostsOverviewTripDetails.svelte';
	import HeaderTripDetails from '../../../components/tripDetails/HeaderTripDetails.svelte';

	let trip_name = 'Reise A';
	let costs = [
		{ name: 'Kostenpunkt Aiai' },
		{ name: 'Kostenpunkt Jojo' },
		{ name: 'Kostenpunkt Jojo' },
		{ name: 'Kostenpunkt Jojo' },
		{ name: 'Kostenpunkt Jojo' },
		{ name: 'Kostenpunkt Jojo' },
		{ name: 'Kostenpunkt Jojo' },
		{ name: 'Kostenpunkt Jojo' }
	];
	let people = [
		{ name: 'Aidan Zimmer' },
		{ name: 'Johanna Deike' },
		{ name: 'Kevin Rieger' },
		{ name: 'lisa Reß-Park' },
		{ name: 'Luca Chmielarski' }
	];
	let time = '21.09.2023 - 26.10.2023';
</script>

<HeaderAndTwoPartsLayout>
	<span slot="header">
		<HeaderTripDetails {people} {trip_name} {time} />
	</span>
	<span slot="left_element">
		<CostsOverviewTripDetails {costs} />
	</span>
	<span slot="rigth_element">
		<CostsOverviewTripDetails {costs} />
	</span>
</HeaderAndTwoPartsLayout>
