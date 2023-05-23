<script lang="ts">
	import { Graphic, Item, Meta, PrimaryText, SecondaryText, Text } from '@smui/list';
	import type { Cost } from '../../interfaces/TripDetails';

	export let cost: Cost;
	export let i: number;
	export let selectionIndex: number;
</script>

<Item
	on:SMUI:action={() => (selectionIndex = i)}
	selected={selectionIndex === i}
	onloadstart={() => {}}
>
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
			>{cost.startDate.toDateString() + ' - ' + cost.endDate.toDateString()}</SecondaryText
		>
	</Text>
	<Meta class="demo-list">
		<div class="mdc-typography--headline6">
			{cost.amount.toString() + ' ' + cost.currency}
		</div>
	</Meta>
</Item>

<style>
	* :global(.demo-list) {
		max-width: 600px;
	}
</style>
