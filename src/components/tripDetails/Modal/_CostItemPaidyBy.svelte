<script lang="ts">
	import type { CostPaidForUser } from '$userDomain';
	import { CheckIcon, CrossIcon } from '$icons';
	import { validatePaidBy } from '$utils';
	import { costPaidByValid } from '$stores';

	export let users: Array<CostPaidForUser>;

	$: costPaidByValid.set(validatePaidBy());
</script>

<label class="label pb-4">
	<span>Paid by</span>
	<select class="select">
		{#each users as user}
			<option value={user.userId}>{user.user?.name}</option>
		{/each}
	</select>
</label>
<ol class="list">
	<li>
		{#if costPaidByValid}
			<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
			<span class="flex-auto">Paid By is valid</span>
		{:else}
			<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
			<span class="flex-auto">Please provide a valid paid by</span>
		{/if}
	</li>
</ol>
