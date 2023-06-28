<script lang="ts">
	import { CostIcon, GlobeIcon } from '$icons';
	import type { ChartData } from '$tripDomain';
	import { generateRandomColor } from '$utils';
	import PieChart from '../../../components/costOverview/_PieChart.svelte';

	export let data;

	const { error, errorMessage, user } = data;

	const tripColors = [];
	const costColors = [];
	const tripLength = user.tripDistribution.length;
	const costLength = user.costDistribution.length;

	for (let i = 0; i < user.tripDistribution.length; i++) {
		tripColors.push(generateRandomColor(tripLength, i));
	}

	for (let i = 0; i < user.costDistribution.length; i++) {
		costColors.push(generateRandomColor(costLength, i));
	}

	const tripChartData: ChartData = {
		labels: user.tripDistribution.map((entry) => entry.tripName),
		datasets: [
			{
				data: user.tripDistribution.map((entry) => Number(parseFloat(entry.amount).toFixed(2))),
				backgroundColor: tripColors
			}
		]
	};

	const costChartData: ChartData = {
		labels: user.costDistribution.map((entry) => entry.costCategoryName),
		datasets: [
			{
				data: user.costDistribution.map((entry) => Number(parseFloat(entry.amount).toFixed(2))),
				backgroundColor: costColors
			}
		]
	};
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
	<div class="grid grid-cols-11 grid-rows-9 gap-4 pt-6">
		<div class="col-span-5 lg:col-span-3 lg:row-span-3">
			<div class="card rounded-lg shadow-md">
				<header class="card-header flex justify-center"><h4 class="h4">Total costs</h4></header>
				<hr class="!border-t-2 mt-2" />
				<section class="p-4">
					<div class="flex flex-row">
						<CostIcon width={12} height={12} />
						<div class="flex justify-start grow" />
						<h4 class="h4 my-auto justify-end">
							<span
								class="bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
							>
								{user.totalCosts} €
							</span>
						</h4>
					</div>
				</section>
			</div>
		</div>
		<div class="lg:row-start-4 col-span-6 lg:col-span-3 row-span-3">
			<div class="card rounded-lg shadow-md">
				<header class="card-header flex justify-center">
					<h4 class="h4">Average contribution percentage</h4>
				</header>
				<hr class="!border-t-2 mt-2" />
				<section class="p-4">
					<div class="flex flex-row">
						<div class="flex justify-start grow">
							<GlobeIcon sidebarIcon={false} />
						</div>
						<h4 class="h4 my-auto justify-end">
							<span
								class="bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
							>
								{user.averageContributionPercentage} %
							</span>
						</h4>
					</div>
				</section>
			</div>
		</div>
		<div class="col-span-4 row-span-6">
			<div class="card rounded-lg shadow-md flex flex-col items-center">
				<header class="card-header">
					<h4 class="h4">Trip distribution</h4>
				</header>
				<div class="lg:w-10/12 p-3">
					<PieChart data={tripChartData} />
				</div>
			</div>
		</div>
		<div class="col-span-4 row-span-6">
			<div class="card rounded-lg shadow-md flex flex-col items-center">
				<header class="card-header">
					<h4 class="h4">Cost distribution</h4>
				</header>
				<div class="lg:w-10/12 p-3">
					<PieChart data={costChartData} />
				</div>
			</div>
		</div>
		<div class="col-span-3 row-span-3">
			<div class="card rounded-lg shadow-md">
				<header class="card-header flex justify-center">
					<h4 class="h4">Average trip costs</h4>
				</header>
				<hr class="!border-t-2 mt-2" />
				<section class="p-4">
					<div class="flex flex-row">
						<div class="flex justify-start grow !w-10">
							<GlobeIcon sidebarIcon={false} />
						</div>
						<h5 class="h5 my-auto justify-end ml-2">
							<span
								class="bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
							>
								{user.averageTripCosts} € across {user.tripDistribution.length} trip{user
									.tripDistribution.length > 1
									? 's'
									: ''}
							</span>
						</h5>
					</div>
				</section>
			</div>
		</div>
		<div class="col-span-4 row-span-3">
			<div class="card rounded-lg shadow-md">
				<header class="card-header flex justify-center">
					<h4 class="h4">Most expensive trip</h4>
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
									<a href="/trips/{user.mostExpensiveTrip.tripId}">
										<h6
											class="h6 bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
											data-sveltekit-preload-data="hover"
										>
											{user.mostExpensiveTrip.tripName}
										</h6>
										<span class="flex-auto">{user.mostExpensiveTrip.amount} €</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</section>
			</div>
		</div>
		<div class="col-span-4 row-span-3">
			<div class="card rounded-lg shadow-md">
				<header class="card-header flex justify-center">
					<h4 class="h4">Least expensive trip</h4>
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
									<a href="/trips/{user.leastExpensiveTrip.tripId}">
										<h6
											class="h6 bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
											data-sveltekit-preload-data="hover"
										>
											{user.leastExpensiveTrip.tripName}
										</h6>
										<span class="flex-auto">{user.leastExpensiveTrip.amount} €</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</section>
			</div>
		</div>
	</div>
</div>
