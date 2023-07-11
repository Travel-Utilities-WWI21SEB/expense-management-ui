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
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { i } from '@inlang/sdk-js';

	export let users: Array<CostPaidForUser>;
	export let usersInvolved: Array<CostPaidForUser>;
	export let cost: CostDateAsString;

	$costSplitType = isSplitEqually(users, cost) ? 0 : 1;
	$: costAllocationValid.set(validateCostAllocation(cost.amount, users));
	$: restAmount = calculateRestAmount(cost.amount, users);
</script>

<div class="grid grid-cols-1 gap-2">
	<h3 class="h3 pb-4">
		{i('tripDetails.addCostModal.totalCost')}  {cost.amount}  {cost.currency === '' ? '€' : cost.currency}
	</h3>
	<label class="label py-2">
		<div class="flex justify-between">
			<span class="font-semibold">{i('tripDetails.addCostModal.peopleInvolved')}</span>
			<button
				type="button"
				class="btn btn-sm variant-filled"
				on:click={() => {
					users =
						users.length === usersInvolved.length
							? deselectAllPeople(users)
							: selectAllPeople(users, cost, $costSplitType);
				}}>{users.length === usersInvolved.length ? i('tripDetails.addCostModal.deselectAll') : i('tripDetails.addCostModal.selectAll')} </button
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
		<span class="font-semibold">{i('tripDetails.addCostModal.split')}</span>
		<div class="content-center">
			<RadioGroup>
				<RadioItem
					bind:group={$costSplitType}
					name="equally"
					value={0}
					on:change={() => (users = changeToEqual(users, cost, usersInvolved))}>{i('tripDetails.addCostModal.equally')}</RadioItem
				>
				<RadioItem bind:group={$costSplitType} name="custom" value={1}>{i('tripDetails.addCostModal.custom')}</RadioItem>
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
		<li>
			{#if usersInvolved.length === 0}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto">{i('tripDetails.addCostModal.allocationWarningNoOneInvolved')}</span>
			{:else if !$costAllocationValid}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto">{i('tripDetails.addCostModal.allocationWarningNotValid')}</span>
			{:else}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} class="w-6 h-6" />
				</span>
				<span class="flex-auto">{i('tripDetails.addCostModal.allocationAllowed')}</span>
			{/if}
		</li>
		<li>
			{#if !$costAllocationValid}
				<span class="badge-icon variant-filled-error w-4 h-4">
					<Icon src={XMark} class="w-6 h-6" />
				</span>
				<span class="flex-auto"
					>{`${Math.abs(restAmount).toString()} € ${
						restAmount > 0 ? i('tripDetails.addCostModal.allocationWarningStillLeft') : i('tripDetails.addCostModal.allocationWarningToMuch')
					}`}</span
				>
			{/if}
		</li>
	</ol>
</div>
