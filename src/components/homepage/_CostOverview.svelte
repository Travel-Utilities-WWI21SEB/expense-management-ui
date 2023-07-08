<script lang="ts">
	import { goto } from '$app/navigation';
	import { PieChart } from '$components';
	import type { TripDistribution } from '$costDomain';
	import type { ChartData } from '$tripDomain';
	import { generateRandomColor } from '$utils';

	export let costs: TripDistribution[];

	let tripChartData: ChartData;

	if (costs) {
		const tripColors = [];
		const tripLength = costs.length;

		for (let i = 0; i < tripLength; i++) {
			tripColors.push(generateRandomColor(tripLength, i));
		}

		tripChartData = {
			labels: costs.map((entry) => entry.tripName),
			datasets: [
				{
					data: costs.map((entry) => Number(parseFloat(entry.amount).toFixed(2))),
					backgroundColor: tripColors
				}
			]
		};
	}
</script>

<div class="relative w-full">
	<div class="relative overflow-hidden rounded-lg w-full">
		<h1 class="h1 col-start-1 flex justify-center">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
				>Cost overview</span
			>
		</h1>
		<hr class="mt-2" />
		<div class="flex flex-col items-center">
			{#if costs && costs.length > 0}
				<div class="pt-2 pb-2">
					<PieChart data={tripChartData} />
				</div>
			{:else}
				<section class="mt-4">
					<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
						<div class="mx-auto max-w-screen-sm text-center">
							<h1
								class="mb-4 text-7xl tracking-tight font-extrabold lg:text-3xl text-primary-600 dark:text-primary-500"
							>
								You don't have any costs yet
							</h1>
							<button
								type="button"
								class="btn variant-ghost-primary mb-4 text-lg font-light text-gray-500 dark:text-gray-400"
								on:click={() => goto('/trips')}
							>
								Try adding costs to your trips
							</button>
						</div>
					</div>
				</section>
			{/if}
		</div>
	</div>
</div>
