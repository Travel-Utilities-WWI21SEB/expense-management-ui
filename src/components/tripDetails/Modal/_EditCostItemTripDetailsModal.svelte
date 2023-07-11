<script lang="ts">
	import type { CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser } from '$userDomain';
	import { isSplitEqually, changeToEqual } from '$utils';
	import { costSplitType } from '$stores';
	import {
		TripDetailsEditCostItemDetails,
		TripDetailsEditCostItemPaidBy,
		TripDetailsEditCostItemCostAllocation
	} from '$components';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { i } from '@inlang/sdk-js';

	export let cost: CostDateAsString;
	export let users: Array<CostPaidForUser>;
	export let trip: TravelData;

	$: involvedUsers = users.filter((user) => user.checked);
	let tabSet = 0;
	cost = { ...cost, splitEqually: isSplitEqually(users, cost) };
	function changePaidBy(event: CustomEvent<any>) {
		cost.creditor = event.detail.paidBy;
		if ($costSplitType === 0) {
			users = changeToEqual(users, cost, involvedUsers);
		}
	}
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="Details" value={0}>{i("tripDetails.addCostModal.details")}</Tab>
	<Tab bind:group={tabSet} name="PaidyBy" value={1}>{i("tripDetails.addCostModal.paidBy")}</Tab>
	<Tab bind:group={tabSet} name="CostAllocation" value={2}>{i("tripDetails.addCostModal.costAllocation")}</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<TripDetailsEditCostItemDetails bind:cost bind:trip bind:users bind:involvedUsers />
		{:else if tabSet === 1}
			<TripDetailsEditCostItemPaidBy bind:users paidBy={cost.creditor} on:change={changePaidBy} />
		{:else if tabSet === 2}
			<TripDetailsEditCostItemCostAllocation
				bind:users
				bind:cost
				bind:usersInvolved={involvedUsers}
			/>
		{/if}
	</svelte:fragment>
</TabGroup>
