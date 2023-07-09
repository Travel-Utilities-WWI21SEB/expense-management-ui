<script lang="ts">
	import type { ChartData } from '$tripDomain';
	import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
	import { Doughnut } from 'svelte-chartjs';

	export let data: ChartData;

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<Doughnut
	{data}
	options={{
		responsive: false
	}}
/>
