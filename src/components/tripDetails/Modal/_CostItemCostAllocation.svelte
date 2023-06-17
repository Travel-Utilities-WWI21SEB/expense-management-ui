<script lang="ts">
	import type { CostPaidForUser } from '$userDomain';
	import type { CostDateAsString } from '$tripDomain';
	import { CheckIcon, CrossIcon } from '$icons';
	import { validateCostAllocation } from '$utils';
	import { costAllocationValid } from '$stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	export let users: Array<CostPaidForUser>;
	export let cost: CostDateAsString;

	$: usersInvolved = users.filter((user) => user.checked);
	let splitType: number = 0;
	$: costAllocationValid.set(validateCostAllocation(cost.amount, usersInvolved));

	function changeToEqual() {
		users = users.map((user) => {
			return {
				...user,
				amount: user.checked ? cost.amount / usersInvolved.length : 0
			};
		});
	}

	function deselectAllPeople() {
		users = users.map((user) => {
			return {
				...user,
				checked: false,
				amount: 0
			};
		});
	}
	function selectAllPeople() {
		users = users.map((user) => {
			return {
				...user,
				checked: true,
				amount: splitType === 0 ? cost.amount / users.length : user.amount
			};
		});
	}
</script>

<div class="grid grid-cols-1 gap-2">
	<h3 class="h3 pb-4">Total cost: {cost.amount} {cost.currency}</h3>
	<label class="label py-2">
		<div class="flex justify-between">
			<span>People involved</span>
			<button
				type="button"
				class="btn btn-sm variant-filled"
				on:click={() => {
					users.length === usersInvolved.length ? deselectAllPeople() : selectAllPeople();
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
							user.amount = 0;
							if (splitType === 0) {
								changeToEqual();
							}
						}}
					/>
					<span class="truncate">{user.user?.name}</span>
				</label>
			{/each}
		</div>
	</label>

	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label py-2">
		<span>Split</span>
		<div class="content-center">
			<RadioGroup>
				<RadioItem bind:group={splitType} name="equally" value={0} on:change={() => changeToEqual()}
					>Equally</RadioItem
				>
				<RadioItem bind:group={splitType} name="custom" value={1}>Custom</RadioItem>
			</RadioGroup>
		</div>
	</label>

	<div class="py-2">
		<div class="flex overflow-auto sm:grid sm:grid-cols-2 sm:gap-2">
			{#each usersInvolved as user}
				<label class="label space-x-2 px-4">
					<span class="truncate">{user.user?.name}</span>
					{#if user.checked}
						<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
							<input disabled={splitType === 0} type="number" bind:value={user.amount} />
							<select disabled={splitType === 0} bind:value={user.currencyCode}>
								<option value="EUR">EUR</option>
								<option value="USD">USD</option>
							</select>
						</div>
					{/if}
				</label>
			{/each}
		</div>
	</div>
	<ol class="list">
		<li>
			{#if costAllocationValid}
				<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
				<span class="flex-auto">Cost allocation is valid</span>
			{:else if usersInvolved.length === 0}
				<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
				<span class="flex-auto">No one is involved in this cost</span>
			{:else}
				<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
				<span class="flex-auto">Please provide a valid cost allocation</span>
			{/if}
		</li>
	</ol>
</div>
