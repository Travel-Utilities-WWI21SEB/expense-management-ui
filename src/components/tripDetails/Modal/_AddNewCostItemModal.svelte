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
	import {
		Step,
		Stepper,
		modalStore,
		type ToastSettings,
		toastStore
	} from '@skeletonlabs/skeleton';
	import { changeToEqual } from '$utils';
	import { invalidateAll } from '$app/navigation';

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
		costCategory: { name: '', totalCost: 0, color: '', icon: '', costCategoryId: '' },
		creationDate: new Date(),
		endDate: '',
		creditor: trip.participants[0].username,
		contributors: costPaidForUser,
		startDate: new Date().toISOString().slice(0, 10)
	};

	export async function createCost(
		cost: CostDateAsString,
		trip: TravelData,
		costPaidForUser: Array<CostPaidForUser>
	) {
		console.log(cost);
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(`/api/trips/${trip.tripId}/costs`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					costCategoryId: cost.costCategory.costCategoryId,
					amount: cost.amount.toString(),
					currency: cost.currency,
					description: cost.name,
					deductedAt: `${cost.startDate}T00:00:00+02:00`,
					creditor: cost.creditor,
					contributors: costPaidForUser
						.filter((user) => user.checked)
						.map((user) => {
							return {
								username: user.username,
								amount: user.amount.toString()
							};
						})
				})
			});

			const body = await costsResponse.json();

			const { error, errorMessage: errorDisplayMessage } = body;

			errorState.set(error);
			errorMessage.set(errorDisplayMessage);

			return body;
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	}

	async function onFormSubmit(): Promise<void> {
		const result = await createCost(cost, trip, costPaidForUser);

		const message = result.error
			? `Error: ${result.errorMessage}`
			: `Cost ${result.data.description} created successfully`;
		const t: ToastSettings = {
			message: message
		};
		toastStore.trigger(t);

		if (!result.error) {
			invalidateAll();
			modalStore.close();
		}
	}

	$: involvedUsers = costPaidForUser.filter((user) => user.checked);
	const handleCostAllocationMessage = (event: CustomEvent<any>) => {
		involvedUsers = event.detail.involvedUsers;
	};

	function changePaidBy(event: CustomEvent<any>) {
		cost.creditor = event.detail.paidBy;
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
					bind:cost
					{trip}
					bind:users={costPaidForUser}
					{involvedUsers}
				/>
			</Step>
			<Step locked={!$costPaidByValid}>
				<svelte:fragment slot="header">Paid by</svelte:fragment>
				<TripDetailsEditCostItemPaidBy
					bind:users={costPaidForUser}
					paidBy={cost.creditor}
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
