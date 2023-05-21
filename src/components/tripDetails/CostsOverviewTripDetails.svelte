<script lang="ts">
	import { PrimaryAction } from '@smui/card';
	import Card from '@smui/card/src/Card.svelte';
	import { stringify } from 'querystring';

	export let costs: Array<{ name: string }>;
</script>

<Card variant="outlined" padded>
	<h1>Costs</h1>
	{#each costs as cost, i}
		<PrimaryAction id={i.toString()}>
			<Card padded variant="outlined">{cost.name}</Card>
		</PrimaryAction>
	{/each}
</Card>
