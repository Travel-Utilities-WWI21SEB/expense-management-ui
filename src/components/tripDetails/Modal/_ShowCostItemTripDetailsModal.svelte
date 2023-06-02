<script lang="ts">
	import type { Cost } from '$tripDomain';
	import { calculateDate } from '$utils';

	export let cost: Cost;
</script>

<h1 class="h1">{cost.name}</h1>
<h3 class="h3">{calculateDate(cost.startDate)} - {calculateDate(cost.endDate)}</h3>
<div class="text-clip font-semibold overflow-hidden w-full text-rigth text-error-500">
	{cost.amount + ' ' + cost.currency}
</div>
<span class="badge bg-[{cost.costCategory.color}]">{cost.costCategory.name}</span>
