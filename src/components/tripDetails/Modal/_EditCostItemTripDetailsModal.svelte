<script lang="ts">
	import type { CostDateAsString } from '$tripDomain';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let cost: CostDateAsString;
	let checked: boolean = cost.endDate ? true : false;

	function changeTimeToggle(e: Event) {
		if (!checked) {
			cost.endDate = '';
		}
	}
</script>

<div class="grid grid-cols-2 gap-2">
	<label class="label col-span-2">
		<span>Name</span>
		<input class="input" type="text" bind:value={cost.name} />
	</label>
	<SlideToggle
		class="col-span-2"
		name="Time Period"
		bind:checked
		on:change={(e) => changeTimeToggle(e)}>{!checked ? 'One-Time Cost' : 'Period Cost'}</SlideToggle
	>
	<label class="label col-span-2 {checked ? 'sm:col-span-1' : 'sm:col-span-2'}">
		<span>Start Date</span>
		<input class="input" type="date" bind:value={cost.startDate} />
	</label>
	{#if checked}
		<label class="label col-span-2 sm:col-span-1">
			<span>End Date</span>
			<input class="input" type="date" min={cost.startDate} bind:value={cost.endDate} />
		</label>
	{/if}
	<label class="label">
		<span>Amount</span>
		<input class="input" type="number" bind:value={cost.amount} />
	</label>
	<label class="label">
		<span>Currency</span>
		<select class="select" bind:value={cost.currency}>
			<option value="EUR">€</option>
			<option value="USD">$</option>
		</select>
	</label>
	<label class="label col-span-2">
		<span>Category</span>
		<select class="select" bind:value={cost.costCategory.name}>
			<!--Dynamic Values from backend with for Each-->
			<option value="EUR">€</option>
		</select>
	</label>
</div>
