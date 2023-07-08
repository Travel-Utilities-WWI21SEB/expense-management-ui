<script lang="ts">
	import CostOverview from '$components/homepage/_CostOverview.svelte';
	import DebtOverview from '$components/homepage/_DebtOverview.svelte';
	import FunFacts from '$components/homepage/_FunFacts.svelte';
	import type { TripDistribution } from '$costDomain';
	import { errorCode, errorState } from '$stores';
	import { getErrorMessage } from '$utils';
	import TripCarousel from '../../../components/homepage/_TripCarousel.svelte';

	export let data;

	const tripDistribution: TripDistribution[] = data.trips.map((trip) => {
		return {
			tripName: trip.name,
			amount: trip.totalCost?.toString() ?? '0'
		};
	});
</script>

<div class="p-2">
	{#if $errorState}
		<div class="card p-2 rounded-lg shadow-xl">
			<p class="text-red-500">{getErrorMessage($errorCode)}</p>
		</div>
	{:else}
		<div class="grid grid-cols-6 grid-rows-4 lg:grid-rows-10 gap-4">
			<div class="row-span-1 col-span-6 lg:col-span-3 lg:row-span-4">
				<div class="card w-full h-full">
					<TripCarousel trips={data.trips} />
				</div>
			</div>
			<div class="row-span-1 col-span-6 lg:col-span-3 lg:row-span-4 lg:col-start-4">
				<div class="card w-full h-full">
					<CostOverview costs={tripDistribution} />
				</div>
			</div>
			<div class="row-span-2 col-span-6 lg:col-span-6 lg:row-span-2 lg:row-start-5">
				<div class="card w-full h-full">
					<FunFacts {data} />
				</div>
			</div>
			<div class="row-span-2 col-span-6 lg:col-span-6 lg:row-span-4 lg:row-start-7">
				<div class="card w-full h-full">
					<DebtOverview trips={data.trips} />
				</div>
			</div>
		</div>
	{/if}
</div>
