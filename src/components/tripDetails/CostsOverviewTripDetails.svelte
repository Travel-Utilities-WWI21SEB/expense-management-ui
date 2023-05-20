<script lang="ts">
	import { PrimaryAction } from '@smui/card';
	import Card from '@smui/card/src/Card.svelte';

	export let trip_name: String;
	export let costs: Array<{ name: String }>;
</script>

<Card variant="outlined" padded>
	<h1>Costs</h1>
	{#each costs as cost, i}
		<PrimaryAction id={String(i)}>
			<Card padded variant="outlined">{cost.name}</Card>
		</PrimaryAction>
	{/each}
</Card>
