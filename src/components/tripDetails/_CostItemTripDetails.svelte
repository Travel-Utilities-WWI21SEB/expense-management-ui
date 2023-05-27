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
