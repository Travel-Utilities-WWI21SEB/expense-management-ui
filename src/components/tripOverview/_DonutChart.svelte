<script lang="ts">
	import { Doughnut } from 'svelte-chartjs';
	import { Chart as ChartJS, Title, Tooltip, ArcElement } from 'chart.js';
	import type { ChartData } from '$tripDomain';

	export let data: ChartData;

	ChartJS.register(Title, Tooltip, ArcElement);
</script>

<Doughnut
	{data}
	options={{
		responsive: true
	}}
	style="max-height: 20rem max-width: 20rem"
/>
