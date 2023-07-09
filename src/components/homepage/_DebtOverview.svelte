<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import BarChart from './_BarChart.svelte';
	import LineChart from './_LineChart.svelte';

	export let trips: TravelData[];
	console.log(trips);

	const openDebts = trips
		? trips
				.map((trip) => trip.userDept)
				.filter((dept) => dept && dept > 0)
				.reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
		: 0;
	const openCredits = trips
		? trips
				.map((trip) => trip.userCredit)
				.filter((credit) => credit && credit > 0)
				.reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
		: 0;

	// Give me some example debt data pls, I'll get it from the backend later
	// I get the month as the key with the amount in that month as the value
	const debtChartData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'Debt',
				data: [12, 19, 3, 5, 2, 3, 4],
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			},
			{
				label: 'Credit',
				data: [2, 3, 20, 5, 1, 4, 5],
				fill: false,
				borderColor: 'rgb(255, 99, 132)',
				tension: 0.1
			}
		]
	};

	// Give me more example data pls, I'll get it from the backend later
	// I get a user id as the key with the open and total balance as the value
	// The total balance is the total accumulated debt/credit of the user while
	// the open balance is the amount of debt/credit that is not yet paid back
	// A negative value means that the user has to pay back money
	// Can you give me correct numbers please, yours are wrong
	const userDebtData = {
		labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
		datasets: [
			{
				label: 'Debt',
				data: [123.5, 0, 32, 2],
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)'
			},
			{
				label: 'Credit',
				data: [0, 40.5, 0, 0],
				fill: false,
				backgroundColor: 'rgb(32, 2, 122)',
				borderColor: 'rgba(255, 99, 132, 0.2)'
			}
		]
	};
</script>

<div class="relative">
	<div class="relative overflow-hidden rounded-lg">
		<h1 class="h1 col-start-1 flex justify-center pt-2">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
				>Debt overview</span
			>
		</h1>
		<hr class="mt-2" />
		<div class="grid grid-rows-2 grid-cols-none lg:grid-rows-none lg:grid-cols-2">
			{#if trips}
				<div class="pr-2">
					<LineChart data={debtChartData} />
					<hr class="mt-2" />
				</div>
				<div class="pl-2">
					<BarChart data={userDebtData} />
				</div>
			{:else}
				<section class="mt-4">
					<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
						<div class="mx-auto max-w-screen-sm text-center">
							<h1
								class="mb-4 text-7xl tracking-tight font-extrabold lg:text-3xl text-primary-600 dark:text-primary-500"
							>
								You don't have any debts yet
							</h1>
							<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
								Try to keep it this way
							</p>
						</div>
					</div>
				</section>
			{/if}
		</div>
	</div>
</div>
