<script lang="ts">
	import type { CostDateAsString, CostCategory } from '$tripDomain';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let cost: CostDateAsString;
	export let costCategories: Array<CostCategory>;

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
	<label class="label col-span-2 sm:col-span-1">
		<span>Amount</span>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">{cost.currency === 'EUR' ? '€' : '$'}</div>
			<input type="number" bind:value={cost.amount} />
			<select bind:value={cost.currency}>
				<option value="EUR">EUR</option>
				<option value="USD">USD</option>
			</select>
		</div>
	</label>
	<label class="label col-span-2 sm:col-span-1">
		<span>Category</span>
		<select class="select" bind:value={cost.costCategory.name}>
			{#each costCategories as category}
				<option value={category.name}>{category.name} </option>
			{/each}
		</select>
	</label>
</div>

<style>
	/*Removes arrows for number input */
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: number;
	}
</style>
