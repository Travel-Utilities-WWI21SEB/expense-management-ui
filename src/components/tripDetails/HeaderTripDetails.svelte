<script lang="ts">
	import Card, { Content } from '@smui/card';
	import Fab, { Icon } from '@smui/fab';
	import { Graphic } from '@smui/list';

	export let trip_name: String;
	export let time: String;
	export let people: Array<{ name: String }>;

	let clicked = 0;
</script>

<Card variant="outlined" class="card">
	<Content>
		<h1>{trip_name}</h1>
		<h6>{time}</h6>
		<div />
		<div class="people">
			{#each people as person}
				<div class="person">
					<Fab on:click={() => clicked++}>
						<Icon class="material-icons">
							person
							<!-- <Graphic
							style="background-image: url(https://placehold.co/40x40?text={person.name
								.split(' ')
								.map((val) => val.substring(0, 1))
								.join('')});"
						/> -->
						</Icon>
					</Fab>
				</div>
			{/each}
		</div>
	</Content>
</Card>

<style>
	div {
		display: flexbox;
	}

	.people {
		display: flex;
	}

	.person {
		padding: 0.1rem;
	}
</style>
