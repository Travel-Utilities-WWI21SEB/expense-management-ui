<script lang="ts">
	import { costAllocationValid, costSplitType } from '$stores';
	import type { CostDateAsString } from '$tripDomain';
	import type { CostPaidForUser } from '$userDomain';
	import {
		calculateRestAmount,
		changeToEqual,
		deselectAllPeople,
		isSplitEqually,
		selectAllPeople,
		validateCostAllocation
	} from '$utils';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { Check, ExclamationCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let users: Array<CostPaidForUser>;
	export let usersInvolved: Array<CostPaidForUser>;
	export let cost: CostDateAsString;
	export let tripHasNotAccedptedUsers: boolean;

	$costSplitType = isSplitEqually(users, cost) ? 0 : 1;
	$: costAllocationValid.set(validateCostAllocation(cost.amount, users));
	$: restAmount = calculateRestAmount(cost.amount, users);
</script>

<div class="grid grid-cols-1 gap-2">
	<h3 class="h3 pb-4">
		{`Total cost: ${cost.amount} ${cost.currency === '' ? '€' : cost.currency}`}
	</h3>
	<label class="label py-2">
		<div class="flex justify-between">
			<span class="font-semibold">People involved</span>
			<button
				type="button"
				class="btn btn-sm variant-filled"
				on:click={() => {
					users =
						users.length === usersInvolved.length
							? deselectAllPeople(users)
							: selectAllPeople(users, cost, $costSplitType);
				}}>{users.length === usersInvolved.length ? 'Deselect' : 'Select'} All</button
			>
		</div>
		<div class="flex overflow-auto">
			{#each users as user}
				<label class="space-x-2 px-4">
					<input
						class="checkbox"
						type="checkbox"
						bind:checked={user.checked}
						on:change={() => {
							if ($costSplitType === 0) {
								users = changeToEqual(users, cost, usersInvolved);
							} else if (user.checked) {
								user.amount = 0.01;
							} else if (!user.checked) {
								user.amount = 0;
							}
						}}
					/>
					<span class="truncate">{user.user?.username}</span>
				</label>
			{/each}
		</div>
	</label>

	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label py-2">
		<span class="font-semibold">Split</span>
		<div class="content-center">
			<RadioGroup>
				<RadioItem
					bind:group={$costSplitType}
					name="equally"
					value={0}
					on:change={() => (users = changeToEqual(users, cost, usersInvolved))}>Equally</RadioItem
				>
				<RadioItem bind:group={$costSplitType} name="custom" value={1}>Custom</RadioItem>
			</RadioGroup>
		</div>
	</label>

	<div class="py-2">
		<div class="flex overflow-auto sm:grid sm:grid-cols-2 sm:gap-2">
			{#each users as user}
				{#if user.amount > 0 || user.checked}
					<label class="label space-x-2 px-4">
						<span class="truncate font-semibold">{user.user?.username}</span>
						<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
							<input disabled={$costSplitType === 0} type="number" bind:value={user.amount} />
							<select disabled={$costSplitType === 0} bind:value={user.currencyCode}>
								<option value="EUR">EUR</option>
							</select>
						</div>
					</label>
				{/if}
			{/each}
		</div>
	</div>
	<ol class="list">
		{#if tripHasNotAccedptedUsers}
			<li>
				<span class="badge-icon variant-filled-primary w-4 h-4">
					<Icon src={ExclamationCircle} class="w-6 h-6" />
				</span>
				<span class="flex-auto"
					>Participants that have not accepted the invite cannot be included in costs</span
				>
			</li>
		{/if}
		<li>
			{#if usersInvolved.length === 0}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto">No one is involved in this cost</span>
			{:else if !$costAllocationValid}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto">Please provide a valid cost allocation</span>
			{:else}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} class="w-6 h-6" />
				</span>
				<span class="flex-auto">Cost allocation is valid</span>
			{/if}
		</li>
		<li>
			{#if !$costAllocationValid}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto"
					>{`${Math.abs(restAmount).toString()} € ${
						restAmount > 0 ? 'are left to split' : 'are split too much'
					}`}</span
				>
			{/if}
		</li>
	</ol>
</div>
