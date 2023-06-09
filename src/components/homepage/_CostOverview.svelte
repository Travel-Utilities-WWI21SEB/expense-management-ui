<script lang="ts">
	import { goto } from '$app/navigation';
	import { PieChart } from '$components';
	import type { CostDistribution, TripDistribution } from '$costDomain';
	import type { ChartData } from '$tripDomain';
	import { generateRandomColor } from '$utils';
	import { ArrowLeft, ArrowRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Carousel from 'svelte-carousel';
	import { i } from '@inlang/sdk-js';

	export let tripDistribution: TripDistribution[];
	export let costDistribution: CostDistribution[];

	let tripChartData: ChartData;
	let costChartData: ChartData;

	if (tripDistribution) {
		const tripColors = [];
		const tripLength = tripDistribution.length;

		for (let i = 0; i < tripLength; i++) {
			tripColors.push(generateRandomColor(tripLength, i));
		}

		tripChartData = {
			labels: tripDistribution.map((entry) => entry.tripName),
			datasets: [
				{
					data: tripDistribution.map((entry) => Number(parseFloat(entry.amount).toFixed(2))),
					backgroundColor: tripColors
				}
			]
		};
	}

	if (costDistribution) {
		const costColors = [];
		const costLength = costDistribution.length;

		for (let i = 0; i < costLength; i++) {
			costColors.push(generateRandomColor(costLength, i));
		}

		costChartData = {
			labels: costDistribution.map((entry) => entry.costCategoryName),
			datasets: [
				{
					data: costDistribution.map((entry) => Number(parseFloat(entry.amount).toFixed(2))),
					backgroundColor: costColors
				}
			]
		};
	}

	let carousel;

	const showArrows = (tripDistribution && tripDistribution.length > 1) ?? false;
</script>

<div class="relative">
	<div class="relative overflow-hidden rounded-lg">
		<h1 class="h1 col-start-1 flex justify-center pt-2">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
				>{i('homepage.noData.costOverview')}</span
			>
		</h1>
		<hr class="mt-2" />
		<div class="flex flex-col items-center">
			{#if tripDistribution && tripDistribution.length > 0}
				<Carousel
					bind:this={carousel}
					let:showPrevPage
					let:showNextPage
					autoplay={true}
					autoplayDuration={4000}
					pauseOnFocus={true}
					arrows={showArrows}
				>
					<div slot="prev" class="mt-2 ml-2">
						<button
							class="btn-icon variant-ghost-primary w-6 h-6 md:w-8 md:h-8"
							on:click={() => showPrevPage()}
						>
							<Icon src={ArrowLeft} class="w-4 h-4 md:w-6 md:h-6" />
						</button>
					</div>
					<div slot="next" class="mt-2 mr-2">
						<button
							class="btn-icon variant-ghost-primary w-6 h-6 md:w-8 md:h-8"
							on:click={() => showNextPage()}
						>
							<Icon src={ArrowRight} class="w-4 h-4 md:w-6 md:h-6" />
						</button>
					</div>
					<button
						on:click={() => goto('/costs')}
						class="card-hover pt-2 pb-2 flex flex-col items-center"
					>
						<h4 class="h4 hidden md:block">{i('homepage.costsPerTrip')}</h4>
						<PieChart data={tripChartData} />
					</button>
					<button
						on:click={() => goto('/costs')}
						class="card-hover pt-2 pb-2 flex flex-col items-center"
					>
						<h4 class="h4 hidden md:block">{i('homepage.costsPerCategory')}</h4>
						<PieChart data={costChartData} />
					</button>
				</Carousel>
			{:else}
				<section class="mt-4">
					<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
						<div class="mx-auto max-w-screen-sm text-center">
							<h1
								class="mb-4 text-2xl tracking-tight font-extrabold lg:text-3xl text-primary-600 dark:text-primary-500"
							>
								{i('homepage.noData.noCosts')}
							</h1>
							<button
								type="button"
								class="btn variant-ghost-primary mb-4 text-lg font-light text-gray-500 dark:text-gray-400"
								on:click={() => goto('/trips')}
							>
								{i('homepage.noData.addCost')}
							</button>
						</div>
					</div>
				</section>
			{/if}
		</div>
	</div>
</div>
