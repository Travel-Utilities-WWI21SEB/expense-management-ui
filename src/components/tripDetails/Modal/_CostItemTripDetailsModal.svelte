<script lang="ts">
	import type { Cost, CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser, User } from '$userDomain';
	import { TripDetailsShowCostItem, TripDetailsEditCostItem } from '$components';
	import { costAllocationValid, costDetailsValid, costPaidByValid } from '$stores';
	import { modalStore } from '@skeletonlabs/skeleton';

	/* export let name: string; */
	export let cost: Cost;
	export let trip: TravelData;
	export let parent: any;

	$: validData = $costAllocationValid && $costDetailsValid && costPaidByValid;

	let costPaidForUser: Array<CostPaidForUser> = trip.participants.flatMap(
		(tripParticipants: User) => {
			const userInvolved = cost.paidFor.filter(
				(involvedUser) => tripParticipants.userId === involvedUser.userId
			);
			const newUser =
				userInvolved.length > 0
					? userInvolved.map((involvedUser) => {
							return {
								...involvedUser,
								user: tripParticipants,
								checked: true
							};
					  })
					: {
							userId: tripParticipants.userId,
							amount: 0,
							currencyCode: 'EUR',
							user: tripParticipants,
							checked: false
					  };
			return newUser;
		}
	);

	//convert date to yyyy-mm-dd for date picker
	let localeCost: CostDateAsString = {
		...cost,
		startDate: cost.startDate.toISOString().slice(0, 10),
		endDate: cost.endDate?.toISOString().slice(0, 10)
	};
	let isEditing: boolean = false;

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

<div class="card p-4 md:w-1/2">
	<div class="p-4">
		{#if isEditing}
			<TripDetailsEditCostItem cost={localeCost} users={costPaidForUser} {trip} />
		{:else}
			<TripDetailsShowCostItem cost={localeCost} />
		{/if}
	</div>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
		{#if isEditing}
			<button class="btn variant-filled" disabled={!validData} on:click={() => (isEditing = false)}>
				Save
			</button>
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
