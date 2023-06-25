<script lang="ts">
	import type { CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser } from '$userDomain';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { CheckIcon, CrossIcon } from '$icons';
	import { changeToEqual, validateDetails } from '$utils';
	import { costDetailsValid, costSplitType } from '$stores';

	export let cost: CostDateAsString;
	export let trip: TravelData;
	export let users: Array<CostPaidForUser>;
	export let involvedUsers: Array<CostPaidForUser>;

	$: costDetailsValid.set(validateDetails(cost, checked));
	let checked: boolean = cost.endDate ? true : false;
	let endDateTrip = trip.endDate.toISOString().slice(0, 10);
	let startDateTrip = trip.startDate.toISOString().slice(0, 10);

	function changeTimeToggle() {
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
		on:change={() => changeTimeToggle()}>{!checked ? 'One-Time Cost' : 'Period Cost'}</SlideToggle
	>
	<label class="label col-span-2 {checked ? 'sm:col-span-1' : 'sm:col-span-2'}">
		<span>Start Date</span>
		<input
			class="input"
			type="date"
			min={startDateTrip}
			max={endDateTrip}
			bind:value={cost.startDate}
		/>
	</label>
	{#if checked}
		<label class="label col-span-2 sm:col-span-1">
			<span>End Date</span>
			<input
				class="input"
				type="date"
				min={cost.startDate}
				max={endDateTrip}
				bind:value={cost.endDate}
			/>
		</label>
	{/if}
	<label class="label col-span-2 sm:col-span-1">
		<span>Amount</span>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">{cost.currency === 'EUR' ? '€' : '$'}</div>
			<input
				type="number"
				bind:value={cost.amount}
				min="0"
				on:change={() => {
					if ($costSplitType === 0) {
						users = changeToEqual(users, cost, involvedUsers);
					}
				}}
			/>
			<select bind:value={cost.currency}>
				<option value="EUR">EUR</option>
			</select>
		</div>
	</label>
	<label class="label col-span-2 sm:col-span-1">
		<span>Category</span>
		<select class="select" bind:value={cost.costCategory.costCategoryId}>
			{#each trip.costCategories as category}
				<option value={category.costCategoryId}>{category.name} </option>
			{/each}
		</select>
	</label>
	<ol class="list">
		<li>
			{#if $costDetailsValid}
				<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
				<span class="flex-auto">Cost Details are valid</span>
			{:else}
				<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
				<span class="flex-auto">Please provide valid cost details</span>
			{/if}
		</li>
	</ol>
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
