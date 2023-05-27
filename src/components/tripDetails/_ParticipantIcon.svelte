<script lang="ts">
	import type { User } from '$userDomain';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Tooltip } from '$components';

	export let participant: User;
</script>

<Tooltip>
	<Avatar
		initials={participant.name
			.split(' ')
			.map((val) => val.substring(0, 1))
			.join('')}
		background="bg-primary-500"
	/>
</Tooltip>
