<script lang="ts">
	import {
		AverageContributionPercentage,
		AverageTripCosts,
		PieChart,
		TotalCosts,
		TripAssociation
	} from '$components';
	import type { ChartData } from '$tripDomain';
	import { formatCostString, generateRandomColor } from '$utils';

	export let data;

	const { error, errorMessage, costOverview } = data;
	let tripChartData: ChartData;
	let costChartData: ChartData;

	if (costOverview.tripDistribution && costOverview.costDistribution) {
		const tripColors = [];
		const costColors = [];
		const tripLength = costOverview.tripDistribution.length;
		const costLength = costOverview.costDistribution.length;

		for (let i = 0; i < costOverview.tripDistribution.length; i++) {
			tripColors.push(generateRandomColor(tripLength, i));
		}

		for (let i = 0; i < costOverview.costDistribution.length; i++) {
			costColors.push(generateRandomColor(costLength, i));
		}

		tripChartData = {
			labels: costOverview.tripDistribution.map((entry) => entry.tripName),
			datasets: [
				{
					data: costOverview.tripDistribution.map((entry) =>
						Number(parseFloat(entry.amount).toFixed(2))
					),
					backgroundColor: tripColors
				}
			]
		};

		costChartData = {
			labels: costOverview.costDistribution.map((entry) => entry.costCategoryName),
			datasets: [
				{
					data: costOverview.costDistribution.map((entry) =>
						Number(parseFloat(entry.amount).toFixed(2))
					),
					backgroundColor: costColors
				}
			]
		};
	}
</script>

<div class="p-4">
	<div class="card p-2 rounded-lg shadow-xl">
		<h1 class="h1 col-start-1">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
			>
				Your cost overview
			</span>
		</h1>
	</div>
	{#if error}
		<div class="card p-2 rounded-lg shadow-xl">
			<p class="text-red-500">{errorMessage}</p>
		</div>
	{:else if !costOverview.tripDistribution || !costOverview.costDistribution}
		<section class=" mt-4">
			<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div class="mx-auto max-w-screen-sm text-center">
					<h1
						class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
					>
						404
					</h1>
					<p
						class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"
					>
						You don't have any costs yet
					</p>
					<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
						You can start adding costs by creating a trip and adding costs to it.
					</p>
					<a
						href="trips"
						class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
						>Create a trip</a
					>
				</div>
			</div>
		</section>
	{:else}
		<div class="grid grid-cols-12 grid-rows-12 gap-4 mt-4">
			<div class="col-span-6 row-span-2 lg:col-span-4 lg:row-span-3">
				<TotalCosts totalCosts={costOverview.totalCosts} />
			</div>
			<div
				class="row-start-3 row-span-2 col-span-6 lg:col-span-4 lg:row-start-1 lg:col-start-5 lg:row-span-3"
			>
				<AverageTripCosts {costOverview} />
			</div>
			<div
				class="col-start-7 row-span-4 col-span-6 lg:col-span-4 lg:row-start-1 lg:col-start-9 lg:row-span-3"
			>
				<AverageContributionPercentage
					averageContributionPercentage={formatCostString(
						costOverview.averageContributionPercentage
					)}
				/>
			</div>
			<div class="row-start-5 row-span-3 col-span-12 md:col-span-6 lg:row-start-4 md:row-span-6">
				<div class="card rounded-lg shadow-md flex flex-col items-center">
					<header class="card-header">
						<h4 class="h4">Cost distribution</h4>
					</header>
					<div class="lg:w-10/12 p-3">
						<PieChart data={costChartData} />
					</div>
				</div>
			</div>
			<div
				class="row-span-3 col-span-12 md:col-span-6 md:col-start-7 md:row-start-5 md:row-span-6 lg:row-start-4"
			>
				<div class="card rounded-lg shadow-md flex flex-col items-center">
					<header class="card-header">
						<h4 class="h4">Trip distribution</h4>
					</header>
					<div class="lg:w-10/12 p-3">
						<PieChart data={tripChartData} />
					</div>
				</div>
			</div>
			<div
				class="row-start-11 col-span-12 row-span-1 md:row-span-2 md:col-span-6 lg:row-span-3 lg:row-start-10"
			>
				<TripAssociation {costOverview} leastExpensiveTrip={false} />
			</div>
			<div
				class="row-start-12 col-span-12 row-span-1 md:row-span-2 md:col-start-7 md:col-span-6 lg:row-span-3 lg:row-start-10"
			>
				<TripAssociation {costOverview} leastExpensiveTrip={true} />
			</div>
		</div>
	{/if}
</div>
