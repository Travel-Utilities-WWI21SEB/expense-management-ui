<script lang="ts">
	import type { CostOverview } from '$costDomain';
	import { GlobeIcon } from '$icons';
	import { formatCostString } from '$utils';

	export let costOverview: CostOverview;

	const formattedCost = formatCostString(costOverview.averageTripCosts);
</script>

<div class="card rounded-lg shadow-md">
	<header class="card-header flex justify-center">
		<h4 class="h4">Average trip costs</h4>
	</header>
	<hr class="!border-t-2 mt-2" />
	<section class="p-4">
		<div class="flex flex-row">
			<div class="flex justify-start grow !w-12 !h-12">
				<GlobeIcon sidebarIcon={false} />
			</div>
			<h5 class="h5 my-auto justify-end ml-2">
				<span
					class="bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
				>
					{formattedCost} € across {costOverview.tripDistribution.length} trip{costOverview
						.tripDistribution.length > 1 || costOverview.tripDistribution.length === 0
						? 's'
						: ''}
				</span>
			</h5>
		</div>
	</section>
</div>
