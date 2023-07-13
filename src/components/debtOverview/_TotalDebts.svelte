<script lang="ts">
	import { formatCostString } from '$utils';
	import { CreditCard } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { i } from '@inlang/sdk-js';

	export let totalDebts: string;
	export let received: boolean;

	const formattedCost = formatCostString(totalDebts);
</script>

<div class="card rounded-lg shadow-md">
	<header class="card-header flex justify-center">
		<h4 class="h4">
			{i('debtsPage.totalDebts')}
			{received ? i('debtsPage.received') : i('debtsPage.paidBack')}
		</h4>
	</header>
	<hr class="!border-t-2 mt-2" />
	<section class="p-4">
		<div class="flex flex-row">
			<Icon src={CreditCard} class="w-12 h-12 mx-auto" />
			<div class="flex justify-start grow" />
			<h4 class="h4 my-auto justify-end">
				<span
					class="bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
				>
					{formattedCost} EUR
				</span>
			</h4>
		</div>
	</section>
</div>
