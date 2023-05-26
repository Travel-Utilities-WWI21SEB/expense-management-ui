<script lang="ts">
	import type { User } from '$userDomain';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Tooltip } from '$components';

	export let participant: User;
</script>

<Tooltip>
	<Avatar initials={participant.name} background="bg-primary-500" />
</Tooltip>
