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

	export let cost: CostDateAsString;
	export let users: Array<CostPaidForUser>;
	export let trip: TravelData;

	$: involvedUsers = users.filter((user) => user.checked);
	let tabSet = 0;
	console.log(involvedUsers);
	cost = { ...cost, splitEqually: isSplitEqually(users, cost) };
	function changePaidBy(event: CustomEvent<any>) {
		cost.contributors = event.detail.paidBy;
		if ($costSplitType === 0) {
			users = changeToEqual(users, cost, involvedUsers);
		}
	}
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="Details" value={0}>Details</Tab>
	<Tab bind:group={tabSet} name="PaidyBy" value={1}>Paid By</Tab>
	<Tab bind:group={tabSet} name="CostAllocation" value={2}>Cost allocation</Tab>
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
