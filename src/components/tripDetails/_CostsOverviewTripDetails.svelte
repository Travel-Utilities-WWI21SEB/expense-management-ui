<script lang="ts">
	import Card from '@smui/card/src/Card.svelte';
	import List from '@smui/list';
	import type { Cost } from '$tripDomain';
	import { TripDetailsCostItem } from '$components';

	export let costs: Array<Cost>;

	let list: InstanceType<typeof List>;
	let selectionIndex = -1;

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};
</script>

<Card variant="outlined" padded>
	<div class="mdc-typography--headline4">Costs</div>
	<List
		class="demo-list"
		bind:this={list}
		twoLine
		avatarList
		singleSelection
		selectedIndex={selectionIndex}
	>
		{#each costs as cost, i}
			<TripDetailsCostItem
				on:select_item={(e) => handleSelectItem(e)}
				{cost}
				{i}
				{selectionIndex}
			/>
		{/each}
	</List>
</Card>

<style>
	* :global(mdc-typography--headline6) {
		color: #56e639;
	}
</style>
