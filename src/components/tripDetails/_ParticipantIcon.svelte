<script lang="ts">
	import Button from '@smui/button';
	import Fab from '@smui/fab';
	import type { User } from '$userDomain';
	import Tooltip from './_Tooltip.svelte';

	export let participant: User;
</script>

<Tooltip title={participant.name}>
	<Button disabled>
		<Fab
			ripple={false}
			style="background-image: url(https://placehold.co/58x58/9ec1d7/white?text={participant.name
				.split(' ')
				.map((val) => val.substring(0, 1))
				.join('')});"
		/>
	</Button>
</Tooltip>
