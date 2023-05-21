<script lang="ts">
	import { Doughnut } from 'svelte-chartjs';
	import { Chart as ChartJS, Title, Tooltip, ArcElement } from 'chart.js';
	export let data: import('../../interfaces/TripOverview').ChartData;

	ChartJS.register(Title, Tooltip, ArcElement);
</script>

<Doughnut
	{data}
	options={{
		responsive: true
	}}
	style="max-height: 20rem"
/>
