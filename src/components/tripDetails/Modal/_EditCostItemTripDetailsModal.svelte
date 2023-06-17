<script lang="ts">
	import type { CostDateAsString, CostCategory, TravelData } from '$tripDomain';
	import type { CostPaidForUser } from '$userDomain';
	import {
		TripDetailsEditCostItemDetails,
		TripDetailsEditCostItemPaidBy,
		TripDetailsEditCostItemCostAllocation
	} from '$components';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	export let cost: CostDateAsString;
	export let users: Array<CostPaidForUser>;
	export let trip: TravelData;

	let tabSet: number = 0;
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="Details" value={0}>Details</Tab>
	<Tab bind:group={tabSet} name="PaidyBy" value={1}>Paid By</Tab>
	<Tab bind:group={tabSet} name="CostAllocation" value={2}>Cost allocation</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<TripDetailsEditCostItemDetails {cost} {trip} />
		{:else if tabSet === 1}
			<TripDetailsEditCostItemPaidBy {users} />
		{:else if tabSet === 2}
			<TripDetailsEditCostItemCostAllocation {users} {cost} />
		{/if}
	</svelte:fragment>
</TabGroup>
