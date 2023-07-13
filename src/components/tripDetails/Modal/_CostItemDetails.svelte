<script lang="ts">
	import { costDetailsValid, costSplitType } from '$stores';
	import type { CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser } from '$userDomain';
	import {
		calculateTomorrowForInputFormat,
		changeToEqual,
		isEndDateAfterStartDate,
		validateDetails
	} from '$utils';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { i } from '@inlang/sdk-js';

	export let cost: CostDateAsString;
	export let trip: TravelData;
	export let users: Array<CostPaidForUser>;
	export let involvedUsers: Array<CostPaidForUser>;

	$: costDetailsValid.set(validateDetails(cost, checked) && !costAmountTooHigh);
	$: costAmountTooHigh = cost.amount > 50000;
	let checked: boolean = cost.endDate !== cost.startDate ? true : false;
	const endDateTrip = trip.endDate.toISOString().slice(0, 10);
	const startDateTrip = trip.startDate.toISOString().slice(0, 10);

	function changeTimeToggle() {
		if (checked) {
			cost.endDate =
				new Date(cost.startDate).toDateString() === new Date(endDateTrip).toDateString()
					? cost.startDate
					: calculateTomorrowForInputFormat(cost.startDate);
		} else {
			cost.endDate = cost.startDate;
		}
	}

	function changeStartDate(e: any) {
		{
			if (checked && cost.endDate && !isEndDateAfterStartDate(e.target.value, cost.endDate)) {
				if (new Date(e.target.value).toDateString() === new Date(endDateTrip).toDateString()) {
					cost.endDate = e.target.value;
					checked = false;
				} else {
					cost.endDate = calculateTomorrowForInputFormat(cost.startDate);
				}
			}
		}
	}
</script>

<div class="grid grid-cols-2 gap-2">
	<label class="label col-span-2">
		<span class="font-semibold">{i('tripDetails.addCostModal.name')}</span>
		<input class="input" type="text" bind:value={cost.name} />
	</label>
	<SlideToggle
		class="col-span-2 font-semibold"
		name="Time Period"
		bind:checked
		on:change={() => changeTimeToggle()}
		>{!checked
			? i('tripDetails.addCostModal.oneTimeCost')
			: i('tripDetails.addCostModal.periodCost')}</SlideToggle
	>
	<label class="label col-span-2 {checked ? 'sm:col-span-1' : 'sm:col-span-2'}">
		<span class="font-semibold">{i('tripDetails.addCostModal.startDate')}</span>
		<input
			class="input"
			type="date"
			min={startDateTrip}
			max={endDateTrip}
			bind:value={cost.startDate}
			on:change={(e) => changeStartDate(e)}
		/>
	</label>

	{#if checked}
		<label class="label col-span-2 sm:col-span-1">
			<span class="font-semibold">{i('tripDetails.addCostModal.endDate')}</span>
			<input
				class="input"
				type="date"
				min={calculateTomorrowForInputFormat(cost.startDate)}
				max={endDateTrip}
				bind:value={cost.endDate}
			/>
		</label>
	{/if}
	<label class="label col-span-2 sm:col-span-1">
		<span class="font-semibold">{i('tripDetails.addCostModal.amount')}</span>
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
		<span class="font-semibold">{i('tripDetails.addCostModal.category')}</span>
		<select class="select" bind:value={cost.costCategory.costCategoryId}>
			{#each trip.costCategories as category}
				<option value={category.costCategoryId}>{category.name} </option>
			{/each}
		</select>
	</label>
	<ol class="list">
		<li>
			{#if $costDetailsValid}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} class="w-6 h-6" />
				</span>
				<span class="flex-auto">{i('tripDetails.addCostModal.costAllowed')}</span>
			{:else}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto">{i('tripDetails.addCostModal.costWarning')}</span>
			{/if}
		</li>
		{#if costAmountTooHigh}
			<li>
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto">Maximum amount per cost is 50000</span>
			</li>
		{/if}
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
