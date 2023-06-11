<script lang="ts">
	import { calculateDate, pickTextColorBasedOnBgColorSimple } from '$utils';
	import type { CostDateAsString } from '$tripDomain';

	export let cost: CostDateAsString;
</script>

<div class="grid grid-rows-6 gap-2">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-blue-500 to-pink-500 bg-clip-text text-transparent box-decoration-clone"
			>{cost.name}</span
		>
	</h1>
	<h3 class="h3">
		{#if cost.endDate}
			Time Period:
		{:else}
			Date:
		{/if}
		{calculateDate(new Date(cost.startDate))}
		{#if cost.endDate}
			- {calculateDate(new Date(cost.endDate))}
		{/if}
	</h3>
	<div class="flex">
		<h3 class="h3">Amount:</h3>
		<h3 class="h3 font-semibold text-error-500">
			{cost.amount + ' ' + cost.currency}
		</h3>
	</div>
	<p
		class="text-sm py-2 px-2 rounded-full border-2 font-semibold text-[{pickTextColorBasedOnBgColorSimple(
			cost.costCategory.color,
			'#FFFFFF',
			'#000000'
		)}] border-[{cost.costCategory.color}]"
	>
		{cost.costCategory.name}
	</p>
</div>
