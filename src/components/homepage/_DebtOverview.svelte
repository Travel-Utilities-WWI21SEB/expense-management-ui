<script lang="ts">
	import { generateRandomColor } from '$utils';
	import { Minus, Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { DebtOverview } from '../../domain/debt/DebtOverview';
	import BarChart from './_BarChart.svelte';

	export let debts: DebtOverview;

	let debtChartData: any;
	let mappedDebtData: Array<{
		debtor: string;
		openDebt: number;
		openCredit: number;
	}> = [];

	if (debts.debts && debts.debts.length > 0) {
		const debtColors: any[] = [];
		const debtLength = debts.debts.length;

		for (let i = 0; i < 2; i++) {
			debtColors.push(generateRandomColor(debtLength, i));
		}

		// Have first color for open debts and second color for open credits
		const openDebtsColors = debts.debts.map((entry) => debtColors[0]);
		const openCreditsColors = debts.debts.map((entry) => debtColors[1]);

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

<div class="relative">
	<div class="relative overflow-hidden rounded-lg">
		<h1 class="h1 col-start-1 flex justify-center pt-2">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-400 bg-clip-text text-transparent box-decoration-clone"
				>Debt overview</span
			>
		</h1>
		<hr class="mt-2" />
		<div class="grid grid-rows-2 grid-cols-none lg:grid-rows-none lg:grid-cols-3">
			{#if debts.debts && debts.debts.length > 0}
				<div class="p-4 row-span-1 lg:col-span-1">
					<div
						class="logo-cloud grid-cols-2 lg:grid-rows-2 lg:grid-cols-none gap-4 [&>.logo-item]:pointer-events-none [&>.logo-item]:p-3 h-full"
					>
						<a class="logo-item variant-ghost-warning" href="/">
							<span><Icon src={Minus} class="w-12 h-12" /></span>
							<span>You have {debts.openDebtAmount * -1}€ open debts</span>
						</a>
						<a class="logo-item variant-ghost-success" href="/">
							<span><Icon src={Plus} class="w-12 h-12" /></span>
							<span>You have {debts.openCreditAmount}€ open credits</span>
						</a>
					</div>
				</div>
				<div class="p-4 row-span-1 lg:col-span-2">
					<BarChart data={debtChartData} />
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
