<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import type { Cost } from '$tripDomain';

	export let cost: Cost;
	export let i: number;
	export let selectionIndex: number;

	const dispatch = createEventDispatcher();

	function selectListItem(i: number) {
		dispatch('select_item', {
			index: i
		});
	}
</script>

<button
	class="card card-hover hover:bg-secondary-100 hover:dark:text-secondary-900 w-full {selectionIndex ===
	i
		? 'bg-secondary-200  outline outline-1'
		: ''}"
	on:click={() => selectListItem(i)}
>
	<div class="grid grid-cols-12 md:gap-2">
		<div class="col-start-1 col-span-2 grid content-center">
			<div class="flex flex-row flex-wrap content-center">
				<Avatar initials={cost.costCategory.name} background={cost.costCategory.color} />
			</div>
		</div>
		<div class="col-span-8 grid content-center">
			<div class="flex flex-row flex-wrap">
				{cost.name}
			</div>
		</div>
		<div class="col-span-2 grid content-center">
			<div class="flex flex-row flex-wrap w-full">
				{cost.amount + ' ' + cost.currency}
			</div>
		</div>
	</div>
</button>

<!-- <script lang="ts">
	import { Graphic, Item, Meta, PrimaryText, SecondaryText, Text } from '@smui/list';
	import type { Cost } from '$tripDomain';
	import { createEventDispatcher } from 'svelte';
	import { calculateDate } from '$utils';

	export let cost: Cost;
	export let i: number;
	export let selectionIndex: number;

	const dispatch = createEventDispatcher();

	function selectListItem(i: number) {
		dispatch('select_item', {
			index: i
		});
	}
</script>

<Item on:SMUI:action={() => selectListItem(i)} selected={selectionIndex === i}>
	<Graphic
		style="background-image: url(https://placehold.co/40x40/${cost.costCategory
			.color}/ffffff?text={cost.costCategory.name
			.split(' ')
			.map((val) => val.substring(0, 1))
			.join('')});"
	/>
	<Text>
		<PrimaryText>{cost.name}</PrimaryText>
		<SecondaryText
			>{`${calculateDate(cost.startDate)} - ${calculateDate(cost.endDate)}`}</SecondaryText
		>
	</Text>
	<Meta class="demo-list">
		<div class="mdc-typography--headline6">
			{`${cost.amount.toString()} ${cost.currency}`}
		</div>
	</Meta>
</Item>

<style>
	* :global(.demo-list) {
		max-width: 600px;
	}
</style>
 -->
