<script lang="ts">
	import Card, { Content, PrimaryAction } from '@smui/card';
	import { Doughnut } from 'svelte-chartjs';

	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

	let data = {
		labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
		datasets: [
			{
				data: [300, 50, 100, 40, 120],
				backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
			}
		]
	};

	let sum = data.datasets[0].data.reduce((partialSum, a) => partialSum + a, 0);

	ChartJS.register(Title, Tooltip, ArcElement);
</script>

<h2 class="mdc-typography--headline6" style="margin: 0;">All Trips</h2>
<Card variant="outlined" style="max-width: 38rem">
	<div class="flex-box">
		<div class="flex-diagram">
			<Doughnut
				{data}
				options={{
					responsive: true,
					plugins: {
						title: {
							display: true,
							text: 'Total Cost: ' + sum + '$',
							color: '#ff0000'
						}
					}
				}}
			/>
		</div>
		<div class="flex-action">
			<PrimaryAction>
				<Content class="mdc-typography--body2">
					And some info text. And the media and info text are a primary action for the card.
				</Content>
			</PrimaryAction>
		</div>
	</div>
</Card>

<style>
	.flex-diagram {
		flex: 0;
		width: fit-content;
	}
	.flex-action {
		flex: 0;
		min-width: 20rem;
	}
	.flex-box {
		display: flex;
		flex-direction: row;
	}

	@media (max-width: 680px) {
		.flex-box {
		display: flex;
		flex-direction: column;
	}
	}


</style>
