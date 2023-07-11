<script lang="ts">
	import {
		CategoryScale,
		Chart as ChartJS,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		Title,
		Tooltip,
		type ChartData,
		type Point
	} from 'chart.js';
	import { Line } from 'svelte-chartjs';

	export let data: ChartData<'line', (number | Point)[], unknown>;

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
</script>

<Line
	{data}
	options={{
		responsive: true
	}}
/>
