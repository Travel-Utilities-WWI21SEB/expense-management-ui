<script lang="ts">
	import { costPaidByValid } from '$stores';
	import type { CostPaidForUser } from '$userDomain';
	import { validatePaidBy } from '$utils';
	import { Check, InformationCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createEventDispatcher } from 'svelte';

	export let users: Array<CostPaidForUser>;
	export let paidBy: string;
	export let tripHasNotAccedptedUsers: boolean;

	$: costPaidByValid.set(validatePaidBy());
	$: isAnyPartisipentNotAccepted = users.some((user) => !user.hasAcceptedInvite);
	const dispatch = createEventDispatcher();

	function changeSelectedValue(event: any) {
		dispatch('change', {
			paidBy: event.target.value
		});
	}
</script>

<label class="label pb-4">
	<span class="font-semibold">Paid by</span>
	<select
		class="select"
		on:change={(e) => {
			changeSelectedValue(e);
		}}
	>
		{#each users as user}
			<option value={user.username} selected={paidBy === user.username}
				>{user.user?.username}</option
			>
		{/each}
	</select>
</label>
<ol class="list">
	{#if tripHasNotAccedptedUsers}
		<li>
			<span class="badge-icon variant-filled-warning w-4 h-4">
				<Icon src={InformationCircle} class="w-6 h-6" />
			</span>
			<span class="flex-auto"
				>Participants that have not accepted the invite cannot be included in costs</span
			>
		</li>
	{/if}
	<li>
		{#if $costPaidByValid}
			<span class="badge-icon variant-filled-success w-4 h-4">
				<Icon src={Check} class="w-6 h-6" />
			</span>
			<span class="flex-auto">Paid By is valid</span>
		{:else}
			<span class="badge-icon variant-filled-error w-4 h-4">
				<Icon src={XMark} class="w-6 h-6" />
			</span>
			<span class="flex-auto">Please provide a valid paid by</span>
		{/if}
	</li>
</ol>
