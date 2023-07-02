<script lang="ts">
	import type { DebtUser } from '$tripDomain';

	export let participant: DebtUser;
	export let background: string;
</script>

<div class="card rounded p-2 {background} truncate m-2">{participant.username}</div>
