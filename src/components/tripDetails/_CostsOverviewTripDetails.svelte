<script lang="ts">
	import Card from '@smui/card/src/Card.svelte';
	import List, { Graphic, Item, Meta, PrimaryText, SecondaryText, Text } from '@smui/list';

	export let costs: Array<{ name: string; description: string }>;

	let list: InstanceType<typeof List>;

	let selectionIndex = -1;
</script>

<Card variant="outlined" padded>
	<h1>Costs</h1>
	<List
		class="demo-list"
		bind:this={list}
		twoLine
		avatarList
		singleSelection
		selectedIndex={selectionIndex}
	>
		{#each costs as cost, i}
			<Item on:SMUI:action={() => (selectionIndex = i)} selected={selectionIndex === i}>
				<Graphic
					style="background-image: url(https://placehold.co/40x40?text={cost.name
						.split(' ')
						.map((val) => val.substring(0, 1))
						.join('')});"
				/>
				<Text>
					<PrimaryText>{cost.name}</PrimaryText>
					<SecondaryText>{cost.description}</SecondaryText>
				</Text>
				<Meta class="material-icons">info</Meta>
			</Item>
		{/each}
	</List>
</Card>

<style>
	* :global(.demo-list) {
		max-width: 600px;
	}
</style>
