<script lang="ts">
	import type { CostPaidForUser } from '$userDomain';

	export let users: Array<CostPaidForUser>;
</script>

<label class="label">
	<span>Paid by</span>
	<select class="select">
		{#each users as user}
			<option value="5">{user.user?.name}</option>
		{/each}
	</select>
</label>
