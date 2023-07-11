<script lang="ts">
	import CoveredDebtsPercentage from '$components/debtOverview/_CoveredDebtsPercentage.svelte';
	import TotalDebts from '$components/debtOverview/_TotalDebts.svelte';
	import TripDebtsCarousel from '$components/debtOverview/_TripDebtsCarousel.svelte';
	import BarChart from '$components/homepage/_BarChart.svelte';
	import { formatCostString, generateRandomColor, getErrorMessage } from '$utils';

	export let data;
	console.log(data);

	const { error, errorCode, debts } = data;

	type mapTripToDebts = {
		tripId: string;
		tripName: string;
		openDebt: number;
		openCredit: number;
		amountOpenDebts: number;
		amountOpenCredits: number;
	};

	let debtChartData: any;
	let tripDebtChartData: any;

	let mappedDebtData: Array<{
		debtor: string;
		openDebt: number;
		openCredit: number;
	}> = [];

	const openDebtPercentage = ((debts.openDebtAmount * -1) / debts.totalSpent) * 100;
	const showArrows = debts && debts.debts && debts.debts.length > 1;
	const mappedTrips: mapTripToDebts[] = [];

	if (debts && debts.debts && debts.debts.length > 0) {
		// Map the debts to the trips
		for (const debt of debts.debts) {
			const parsedAmount = parseFloat(debt.amount);

			if (parsedAmount < 0) {
				const existingTrip = mappedTrips.find((entry) => entry.tripId === debt.trip.tripId);

				if (existingTrip) {
					existingTrip.openDebt += parsedAmount * -1;
					existingTrip.amountOpenDebts += 1;
				} else {
					mappedTrips.push({
						tripId: debt.trip.tripId,
						tripName: debt.trip.name,
						openDebt: parsedAmount * -1,
						openCredit: 0,
						amountOpenDebts: 1,
						amountOpenCredits: 0
					});
				}
			} else {
				const existingTrip = mappedTrips.find((entry) => entry.tripId === debt.trip.tripId);

				if (existingTrip) {
					existingTrip.openCredit += parsedAmount;
					existingTrip.amountOpenCredits += 1;
				} else {
					mappedTrips.push({
						tripId: debt.trip.tripId,
						tripName: debt.trip.name,
						openDebt: 0,
						openCredit: parsedAmount,
						amountOpenDebts: 0,
						amountOpenCredits: 1
					});
				}
			}
		}

		// Fill the debt chart data
		const debtColors: any[] = [];
		const debtLength = debts.debts.length;

		for (let i = 0; i < 2; i++) {
			debtColors.push(generateRandomColor(debtLength, i));
		}

		// Have first color for open debts and second color for open credits
		const openDebtsColors = debts.debts.map(() => debtColors[0]);
		const openCreditsColors = debts.debts.map(() => debtColors[1]);

		// Map open debts and open to different datasets
		// Open debts are negative values in the amount
		// Open credits are positive values in the amount
		for (const debt of debts.debts) {
			const parsedAmount = parseFloat(debt.amount);

			if (parsedAmount < 0) {
				mappedDebtData.push({
					debtor: debt.debtor.username,
					openDebt: parsedAmount * -1,
					openCredit: 0
				});
			} else {
				mappedDebtData.push({
					debtor: debt.debtor.username,
					openDebt: 0,
					openCredit: parsedAmount
				});
			}
		}

		tripDebtChartData = {
			labels: mappedTrips.map((entry) => entry.tripName),
			datasets: [
				{
					label: 'Open debts',
					data: mappedTrips.map((entry) => entry.openDebt),
					backgroundColor: openDebtsColors
				},
				{
					label: 'Open credits',
					data: mappedTrips.map((entry) => entry.openCredit),
					backgroundColor: openCreditsColors
				}
			]
		};

		debtChartData = {
			labels: mappedDebtData.map((entry) => entry.debtor),
			datasets: [
				{
					label: 'Open debts',
					data: mappedDebtData.map((entry) => entry.openDebt),
					backgroundColor: openDebtsColors
				},
				{
					label: 'Open credits',
					data: mappedDebtData.map((entry) => entry.openCredit),
					backgroundColor: openCreditsColors
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
				Your debt overview
			</span>
		</h1>
	</div>
	{#if error}
		<div class="card p-2 rounded-lg shadow-xl">
			<p class="text-red-500">{getErrorMessage(errorCode)}</p>
		</div>
	{:else if !debts || !debts.debts || debts.debts.length === 0}
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
						You don't have any debts yet
					</p>
					<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
						You can start accumulating debts by creating a trip and adding costs to it.
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
				<TotalDebts received={true} totalDebts={debts.totalReceived.toString()} />
			</div>
			<div
				class="row-start-3 row-span-2 col-span-6 lg:col-span-4 lg:row-start-1 lg:col-start-5 lg:row-span-3"
			>
				<TotalDebts received={false} totalDebts={debts.totalSpent.toString()} />
			</div>
			<div
				class="col-start-7 row-span-4 col-span-6 lg:col-span-4 lg:row-start-1 lg:col-start-9 lg:row-span-3"
			>
				<CoveredDebtsPercentage
					coveredDebtsPercentage={formatCostString(openDebtPercentage.toString())}
				/>
			</div>
			<div class="row-start-5 row-span-3 col-span-12 md:col-span-6 lg:row-start-4 md:row-span-6">
				<div class="card rounded-lg shadow-md flex flex-col items-center">
					<header class="card-header">
						<h4 class="h4">Trip distribution</h4>
					</header>
					<div class="lg:w-10/12 p-3 flex justify-center">
						<BarChart data={tripDebtChartData} />
					</div>
				</div>
			</div>
			<div
				class="row-span-3 col-span-12 md:col-span-6 md:col-start-7 md:row-start-5 md:row-span-6 lg:row-start-4"
			>
				<div class="card rounded-lg shadow-md flex flex-col items-center">
					<header class="card-header">
						<h4 class="h4">User distribution</h4>
					</header>
					<div class="lg:w-10/12 p-3 flex justify-center">
						<BarChart data={debtChartData} />
					</div>
				</div>
			</div>
			<div
				class="row-start-11 col-span-12 row-span-2 md:row-span-2 md:col-span-12 lg:row-span-3 lg:row-start-10"
			>
				<TripDebtsCarousel {mappedTrips} {showArrows} />
			</div>
		</div>
	{/if}
</div>
