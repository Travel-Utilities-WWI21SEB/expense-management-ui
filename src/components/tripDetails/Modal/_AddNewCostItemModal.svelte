<script lang="ts">
	import { invalidateAll } from '$app/navigation';
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
		errorCode,
		errorState,
		loading
	} from '$stores';
	import type { CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser, User } from '$userDomain';
	import { changeToEqual, getErrorMessage } from '$utils';
	import {
		Step,
		Stepper,
		modalStore,
		toastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { i } from '@inlang/sdk-js';

	export let trip: TravelData;
	export let parent: any;

	let costPaidForUser: Array<CostPaidForUser> = trip.participants
		.filter((user) => user.hasAcceptedInvite)
		.flatMap((tripParticipant: User) => {
			return {
				username: tripParticipant.username,
				amount: 0,
				currencyCode: 'EUR',
				user: tripParticipant,
				checked: true
			};
		});

	let cost: CostDateAsString = {
		costCategoryId: '',
		costId: '',
		name: '',
		amount: 0,
		currency: 'EUR',
		costCategory: { name: '', totalCost: 0, color: '', icon: '', costCategoryId: '' },
		creationDate: new Date(),
		endDate: trip.startDate.toISOString().slice(0, 10),
		creditor: trip.participants[0].username,
		contributors: costPaidForUser,
		startDate: trip.startDate.toISOString().slice(0, 10)
	};

	export async function createCost(
		cost: CostDateAsString,
		trip: TravelData,
		costPaidForUser: Array<CostPaidForUser>
	) {
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
					endDate: cost.endDate ? `${cost.endDate}T00:00:00+02:00` : null,
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

			const { error, errorCode: code } = body;

			errorState.set(error);
			errorCode.set(code);
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	}

	async function onFormSubmit(): Promise<void> {
		await createCost(cost, trip, costPaidForUser);

		let toastMessage = i('toast.costItem') + cost.name + i('toast.created');
		if (!$errorState) {
			invalidateAll();
			modalStore.close();
		} else {
			let errorMessage: string = getErrorMessage($errorCode);
			toastMessage = i('toast.error') + errorMessage;
		}
		const t: ToastSettings = {
			message: toastMessage,
			background: $errorState ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);
	}

	$: involvedUsers = costPaidForUser.filter((user) => user.checked);
	const handleCostAllocationMessage = (event: CustomEvent<any>) => {
		involvedUsers = event.detail.involvedUsers;
	};

	$: tripHasNotAccedptedUsers =
		trip.participants.filter((user) => !user.hasAcceptedInvite).length > 0;

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
				{i('tripDetails.addCostModal.title')}
			</span>
		</h3>
		<Stepper
			on:complete={() => onFormSubmit()}
			buttonBackLabel={i('tripDetails.addCostModal.backButton')}
			buttonNextLabel={i('tripDetails.addCostModal.nextButton')}
			buttonCompleteLabel={i('tripDetails.addCostModal.completeButton')}
			stepTerm={i('tripDetails.addCostModal.step')}
		>
			<Step locked={!$costDetailsValid}>
				<svelte:fragment slot="header">{i('tripDetails.addCostModal.details')}</svelte:fragment>
				<TripDetailsEditCostItemDetails
					bind:cost
					{trip}
					bind:users={costPaidForUser}
					{involvedUsers}
				/>
				<svelte:fragment slot="navigation">
					<button class="btn border-2" on:click={parent.onClose}>{i("tripDetails.closeButton")}</button>
				</svelte:fragment>
			</Step>
			<Step locked={!$costPaidByValid}>
				<svelte:fragment slot="header">{i('tripDetails.addCostModal.paidBy')}</svelte:fragment>
				<TripDetailsEditCostItemPaidBy
					bind:users={costPaidForUser}
					paidBy={cost.creditor}
					{tripHasNotAccedptedUsers}
					on:change={changePaidBy}
				/>
			</Step>
			<Step locked={!$costAllocationValid}>
				<svelte:fragment slot="header"
					>{i('tripDetails.addCostModal.costAllocation')}</svelte:fragment
				>
				<TripDetailsEditCostItemCostAllocation
					on:message={(e) => handleCostAllocationMessage(e)}
					{cost}
					bind:users={costPaidForUser}
					bind:usersInvolved={involvedUsers}
					{tripHasNotAccedptedUsers}
				/>
			</Step>
		</Stepper>
	</div>
</div>
