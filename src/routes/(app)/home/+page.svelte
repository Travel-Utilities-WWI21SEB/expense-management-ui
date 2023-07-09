<script lang="ts">
	import CostOverview from '$components/homepage/_CostOverview.svelte';
	import DebtOverview from '$components/homepage/_DebtOverview.svelte';
	import FunFacts from '$components/homepage/_FunFacts.svelte';
	import type { CostDistribution, TripDistribution } from '$costDomain';
	import { errorCode, errorState } from '$stores';
	import { getErrorMessage } from '$utils';
	import TripCarousel from '../../../components/homepage/_TripCarousel.svelte';

	export let data;

	const { tripDistribution, costDistribution } = data.trips.reduce(
		(acc, trip) => {
			acc.tripDistribution.push({
				tripName: trip.name,
				amount: trip.totalCost?.toString() ?? '0'
			});

			trip.costCategories.forEach((costCategory) => {
				const existingEntry = acc.costDistribution.find(
					(entry) => entry.costCategoryName === costCategory.name
				);

				if (existingEntry) {
					existingEntry.amount = (
						parseFloat(existingEntry.amount) + parseFloat(costCategory.totalCost?.toString() ?? '0')
					).toString();
				} else {
					acc.costDistribution.push({
						costCategoryName: costCategory.name,
						amount: costCategory.totalCost?.toString() ?? '0'
					});
				}
			});

			return acc;
		},
		{
			tripDistribution: [] as TripDistribution[],
			costDistribution: [] as CostDistribution[]
		}
	);
</script>

<div class="p-2">
	{#if $errorState}
		<div class="card p-2 rounded-lg shadow-xl">
			<p class="text-red-500">{getErrorMessage($errorCode)}</p>
		</div>
	{:else}
		<div class="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 gap-4">
			<div class="">
				<div class="card">
					<TripCarousel trips={data.trips} />
				</div>
			</div>
			<div class="">
				<div class="card h-full">
					<CostOverview {tripDistribution} {costDistribution} />
				</div>
			</div>
			<div class="md:col-span-2">
				<div class="card">
					<FunFacts {data} />
				</div>
			</div>
			<div class="md:col-span-2">
				<div class="card">
					<DebtOverview trips={data.trips} />
				</div>
			</div>
		</div>
	{/if}
</div>
