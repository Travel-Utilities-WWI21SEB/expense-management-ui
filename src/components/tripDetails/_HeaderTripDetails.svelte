<script lang="ts">
	import Card, { Content } from '@smui/card';

	export let trip_name: string;
	export let time: string;
	export let people: Array<{ name: string }>;
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<Card variant="outlined">
	<Content>
		<div class="alignleft">
			<h1>{trip_name}</h1>
			<h6>{time}</h6>
		</div>
		<div class="alignright">
			<div class="people">
				{#each people as person}
					<div class="person">
						<span id={person.name} class="material-symbols-outlined"> account_circle </span>
					</div>
				{/each}
			</div>
		</div>
	</Content>
</Card>

<style>
	.people {
		display: flex;
	}

	.person {
		padding: 0.1rem;
	}

	.alignleft {
		float: left;
		padding: 1rem;
	}
	.alignright {
		float: right;
		padding: 1rem;
	}

	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48;
	}
</style>
