<script lang="ts">
	import Button from '@smui/button/src/Button.svelte';
	import Fab from '@smui/fab';
	import type { User } from '$userDomain';

	export let participant: User;
</script>

<Button disabled>
	<Fab
		ripple={false}
		style="background-image: url(https://placehold.co/58x58/a8e3f1/white?text={participant.name
			.split(' ')
			.map((val) => val.substring(0, 1))
			.join('')});"
	/>
</Button>
