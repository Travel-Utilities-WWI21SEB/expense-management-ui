<script lang="ts">
	import type { CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser, User } from '$userDomain';
	import {
		TripDetailsEditCostItemCostAllocation,
		TripDetailsEditCostItemDetails,
		TripDetailsEditCostItemPaidBy
	} from '$components';
	import {
		costAllocationValid,
		costDetailsValid,
		costPaidByValid,
		costSplitType,
		errorMessage,
		errorState,
		loading
	} from '$stores';
	import { Step, Stepper, modalStore } from '@skeletonlabs/skeleton';
	import { changeToEqual } from '$utils';
	import { createCost } from '../../../utils/trips/requests';

	export let trip: TravelData;

	let costPaidForUser: Array<CostPaidForUser> = trip.participants.flatMap(
		(tripParticipant: User) => {
			return {
				username: tripParticipant.username,
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
		costCategory: { name: '', totalAmount: 0, color: '', icon: '', id: '' },
		creationDate: new Date(),
		endDate: '',
		paidBy: trip.participants[0].username,
		paidFor: costPaidForUser,
		startDate: new Date().toISOString().slice(0, 10)
	};

	async function onFormSubmit(): Promise<void> {
		await createCost(cost, trip, costPaidForUser);

		if ($modalStore[0].response) $modalStore[0].response(cost);
	}

	$: involvedUsers = costPaidForUser.filter((user) => user.checked);
	const handleCostAllocationMessage = (event: CustomEvent<any>) => {
		involvedUsers = event.detail.involvedUsers;
	};

	function changePaidBy(event: CustomEvent<any>) {
		cost.paidBy = event.detail.paidBy;
		if ($costSplitType) {
			costPaidForUser = changeToEqual(costPaidForUser, cost, involvedUsers);
		}
	}
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
		<Stepper on:complete={() => onFormSubmit()}>
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
				<TripDetailsEditCostItemPaidBy
					bind:users={costPaidForUser}
					paidBy={cost.paidBy}
					on:change={changePaidBy}
				/>
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
