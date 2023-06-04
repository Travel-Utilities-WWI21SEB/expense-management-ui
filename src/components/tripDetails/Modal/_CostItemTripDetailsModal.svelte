<script lang="ts">
	import type { Cost, CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser, User } from '$userDomain';
	import { TripDetailsShowCostItem, TripDetailsEditCostItem } from '$components';

	/* export let name: string; */
	export let cost: Cost;
	export let trip: TravelData;

	let costPaidForUser: Array<CostPaidForUser> = trip.participants.map((user: User) => {
		return {
			userId: user.userId,
			amount: 0,
			currencyCode: 'EUR',
			user: user,
			checked: false
		};
	});

	//convert date to yyyy-mm-dd for date picker
	let localeCost: CostDateAsString = {
		...cost,
		startDate: cost.startDate.toISOString().slice(0, 10),
		endDate: cost.endDate?.toISOString().slice(0, 10)
	};
	let isEditing: boolean = false;

	export let parent: any;

	import { modalStore } from '@skeletonlabs/skeleton';

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(cost);
		//modalStore.close();
		//Put changes to backend
		//get new costs for trip details
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<div class="card p-4">
	<div class="p-4">
		{#if isEditing}
			<TripDetailsEditCostItem
				cost={localeCost}
				users={costPaidForUser}
				costCategories={trip.costCategories}
			/>
		{:else}
			<TripDetailsShowCostItem cost={localeCost} />
		{/if}
	</div>
	<footer class="modal-footer t-2{parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
		{#if isEditing}
			<button class="btn variant-filled" on:click={() => (isEditing = false)}> Save </button>
		{:else}
			<button
				class="btn variant-filled"
				on:click={() => {
					isEditing = true;
				}}
			>
				<span>&#9998</span>
				<span>Edit</span>
			</button>
		{/if}
	</footer>
</div>
