<script lang="ts">
	import type { CostOverview } from '$costDomain';
	import { GlobeIcon } from '$icons';
	import { formatCostString } from '../../utils/cost/formatCostString';

	export let costOverview: CostOverview;
	export let leastExpensiveTrip: boolean;

	export let trip = leastExpensiveTrip
		? costOverview.leastExpensiveTrip
		: costOverview.mostExpensiveTrip;
	const title = leastExpensiveTrip ? 'Least expensive trip' : 'Most expensive trip';
	const formattedCostString = formatCostString(trip.amount);
</script>

<div class="card rounded-lg shadow-md">
	<header class="card-header flex justify-center">
		<h4 class="h4">{title}</h4>
	</header>
	<hr class="!border-t-2 mt-2" />
	<section class="p-4">
		<div class="flex flex-row">
			<div class="flex justify-start grow !w-10">
				<GlobeIcon sidebarIcon={false} />
			</div>
			<nav
				class="list-nav flex justify-end my-auto bg-primary-500/20 dark:bg-primary-200/20 rounded-xl ml-2"
			>
				<ul>
					<li>
						<a href="/trips/{trip.tripId}">
							<h6
								class="h6 bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
								data-sveltekit-preload-data="hover"
							>
								{trip.tripName}
							</h6>
							<span class="flex-auto">{formattedCostString} €</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</section>
</div>
