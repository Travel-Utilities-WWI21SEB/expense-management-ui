<script>
	import { TripDetailsHeader, TripDetailsCostOverview, HeaderAndTwoPartsLayout } from '$components';

	let trip_name = 'Reise A';
	let costs = [
		{ name: 'Kostenpunkt Aiai', description: 'nlasivugablsiödnf' },
		{ name: 'Kostenpunkt Jojo', description: 'nlasivugablsiödnf' },
		{ name: 'Kostenpunkt Jojo', description: 'nlasivugablsiödnf' },
		{ name: 'Kostenpunkt Jojo', description: 'nlasivugablsiödnf' },
		{ name: 'Kostenpunkt Jojo', description: 'nlasivugablsiödnf' },
		{ name: 'Kostenpunkt Jojo', description: 'nlasivugablsiödnf' },
		{ name: 'Kostenpunkt Jojo', description: 'nlasivugablsiödnf' },
		{ name: 'Kostenpunkt Jojo', description: 'nlasivugablsiödnf' }
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
		<TripDetailsHeader {people} {trip_name} {time} />
	</span>
	<span slot="left_element">
		<TripDetailsCostOverview {costs} />
	</span>
	<span slot="rigth_element">
		<TripDetailsCostOverview {costs} />
	</span>
</HeaderAndTwoPartsLayout>
