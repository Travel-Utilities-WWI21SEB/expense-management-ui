<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { User } from '$userDomain';

	export let participant: User;
</script>

<div class="py-1">
	<Avatar
		initials={participant.username
			.split(' ')
			.map((val) => val.substring(0, 1))
			.join('')}
		background="bg-secondary-200"
		class="inline-block h-12 w-12 rounded-full ring-2 ring-surface-100 dark:ring-surface-800"
	/>
</div>
