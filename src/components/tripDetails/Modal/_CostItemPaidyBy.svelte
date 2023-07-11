<script lang="ts">
	import { costPaidByValid } from '$stores';
	import type { CostPaidForUser } from '$userDomain';
	import { validatePaidBy } from '$utils';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createEventDispatcher } from 'svelte';
	import { i } from '@inlang/sdk-js';

	export let users: Array<CostPaidForUser>;
	export let paidBy: string;

	$: costPaidByValid.set(validatePaidBy());
	const dispatch = createEventDispatcher();

	function changeSelectedValue(event: any) {
		dispatch('change', {
			paidBy: event.target.value
		});
	}
</script>

<label class="label pb-4">
	<span class="font-semibold">{i('tripDetails.addCostModal.paidBy')}</span>
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
	<li>
		{#if $costPaidByValid}
			<span class="badge-icon variant-filled-success w-4 h-4">
				<Icon src={Check} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('tripDetails.addCostModal.paidByAllowed')}</span>
		{:else}
			<span class="badge-icon variant-filled-error w-4 h-4">
				<Icon src={XMark} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('tripDetails.addCostModal.paidByWarning')}</span>
		{/if}
	</li>
</ol>
