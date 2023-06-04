<script lang="ts">
	import { calculateDate, pickTextColorBasedOnBgColorSimple } from '$utils';
	import type { CostDateAsString } from '$tripDomain';

	export let cost: CostDateAsString;
</script>

<h1 class="h1">{cost.name}</h1>
<h3 class="h3">
	{calculateDate(new Date(cost.startDate))}
	{#if cost.endDate}
		- {calculateDate(new Date(cost.endDate))}
	{/if}
</h3>
<div class="text-clip font-semibold overflow-hidden w-full text-rigth text-error-500">
	{cost.amount + ' ' + cost.currency}
</div>
<p
	class="text-sm py-2 mr-2 px-4 rounded-full border-2 font-semibold text-[{pickTextColorBasedOnBgColorSimple(
		cost.costCategory.color,
		'#FFFFFF',
		'#000000'
	)}] border-[{cost.costCategory.color}]"
>
	{cost.costCategory.name}
</p>
