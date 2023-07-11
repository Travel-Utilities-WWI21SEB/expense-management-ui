<script lang="ts">
	import { Bar } from 'svelte-chartjs';

	export let data: ChartData<'bar', (number | [number, number])[], unknown>;

	import {
		BarElement,
		CategoryScale,
		Chart,
		Legend,
		LinearScale,
		Title,
		Tooltip,
		type ChartData
	} from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<Bar {data} options={{ responsive: true }} />
