<script lang="ts">
	import type { CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser, User } from '$userDomain';
	import {
		TripDetailsEditCostItemCostAllocation,
		TripDetailsEditCostItemDetails,
		TripDetailsEditCostItemPaidBy
	} from '$components';
	import { costAllocationValid, costDetailsValid, costPaidByValid } from '$stores';
	import { Step, Stepper, modalStore } from '@skeletonlabs/skeleton';

	export let trip: TravelData;

	let costPaidForUser: Array<CostPaidForUser> = trip.participants.flatMap(
		(tripParticipant: User) => {
			return {
				userId: tripParticipant.userId,
				amount: 0,
				currencyCode: 'EUR',
				user: tripParticipant,
				checked: false
			};
		}
	);
	let cost: CostDateAsString = {
		id: '',
		name: '',
		amount: 0,
		currency: 'EUR',
		costCategory: { name: '', totalAmount: 0, color: '', icon: '' },
		creationDate: new Date(),
		endDate: '',
		paidBy: '',
		paidFor: costPaidForUser,
		startDate: new Date().toISOString().slice(0, 10)
	};

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(cost);
		//modalStore.close();
		//Put changes to backend
		//get new costs for trip details
	}

	$: involvedUsers = costPaidForUser.filter((user) => user.checked);
	const handleCostAllocationMessage = (event: CustomEvent<any>) => {
		involvedUsers = event.detail.involvedUsers;
	};
</script>

<div class="card p-4 md:w-1/2">
	<div class="p-4">
		<h3 class="h3 flex justify-center">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-300 bg-clip-text text-transparent box-decoration-clone"
			>
				Add new Cost
			</span>
		</h3>
		<Stepper>
			<Step locked={!$costDetailsValid}>
				<svelte:fragment slot="header">Details</svelte:fragment>
				<TripDetailsEditCostItemDetails
					{cost}
					{trip}
					bind:users={costPaidForUser}
					{involvedUsers}
				/>
			</Step>
			<Step locked={!$costPaidByValid}>
				<svelte:fragment slot="header">Paid by</svelte:fragment>
				<TripDetailsEditCostItemPaidBy bind:users={costPaidForUser} />
			</Step>
			<Step locked={!$costAllocationValid}>
				<svelte:fragment slot="header">Cost allocation</svelte:fragment>
				<TripDetailsEditCostItemCostAllocation
					on:message={(e) => handleCostAllocationMessage(e)}
					{cost}
					bind:users={costPaidForUser}
					bind:usersInvolved={involvedUsers}
				/>
			</Step>
		</Stepper>
	</div>
</div>
<!-- TODO: equally and custom not initially 0 -->
