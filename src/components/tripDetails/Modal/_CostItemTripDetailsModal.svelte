<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { TripDetailsEditCostItem, TripDetailsShowCostItem } from '$components';
	import {
		costAllocationValid,
		costDetailsValid,
		costPaidByValid,
		currentCost,
		errorCode,
		errorState,
		loading
	} from '$stores';
	import type { Cost, CostDateAsString, TravelData } from '$tripDomain';
	import type { CostPaidForUser, User } from '$userDomain';
	import { getErrorMessage } from '$utils';
	import { modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { Pencil, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { i } from '@inlang/sdk-js';

	/* export let name: string; */
	export let cost: Cost;
	export let trip: TravelData;
	export let parent: any;
	export let onDelete: (cost: CostDateAsString) => void;

	currentCost.subscribe((currCost) => (cost = currCost));

	$: validData = $costAllocationValid && $costDetailsValid && costPaidByValid;

	let costPaidForUser: Array<CostPaidForUser> = trip.participants
		.filter((user) => user.hasAcceptedInvite)
		.flatMap((tripParticipants: User) => {
			const userInvolved = cost?.contributors
				? cost.contributors.filter(
						(involvedUser) => tripParticipants.username === involvedUser.username
				  )
				: [];

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
							username: tripParticipants.username,
							amount: 0,
							currencyCode: 'EUR',
							user: tripParticipants,
							checked: false
					  };
			return newUser;
		});

	//convert date to yyyy-mm-dd for date picker
	let localeCost: CostDateAsString = {
		...cost,
		startDate: cost.startDate.toISOString().slice(0, 10),
		endDate: cost.endDate
			? cost.endDate.toISOString().slice(0, 10)
			: cost.startDate.toISOString().slice(0, 10)
	};

	let isEditing = false;

	async function updateCost(
		cost: CostDateAsString,
		trip: TravelData,
		costPaidForUser: Array<CostPaidForUser>
	) {
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(`/api/trips/${trip.tripId}/costs/${cost.costId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					costCategoryId: cost.costCategory.costCategoryId,
					amount: cost.amount.toString(),
					currency: cost.currency === '' ? 'EUR' : cost.currency,
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

			return body;
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	}

	async function onFormSubmit(): Promise<void> {
		const result = await updateCost(localeCost, trip, costPaidForUser);

		const message = result.error
			? i("toast.error") + getErrorMessage(result.errorCode)
			: i("toast.costItem")+ result.data.description + i("toast.saved");
		const t: ToastSettings = {
			message: message,
			background: result.error ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);

		if (!result.error) {
			await invalidateAll();
			modalStore.close();
		}
	}
</script>

<div class="card p-4 md:w-1/2">
	<div class="p-4">
		{#if isEditing}
			<TripDetailsEditCostItem bind:cost={localeCost} bind:users={costPaidForUser} {trip} />
		{:else}
			<TripDetailsShowCostItem bind:cost={localeCost} />
		{/if}
	</div>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
		{#if isEditing}
			<button
				class="btn variant-filled-error"
				on:click={() => {
					onDelete(localeCost);
				}}
			>
				<Icon src={Trash} class="w-6 h-6" />
				<span>Delete</span>
			</button>
			<button
				class="btn variant-filled"
				disabled={!validData}
				on:click={() => {
					onFormSubmit();
				}}
			>
				Save
			</button>
		{:else}
			<button
				class="btn variant-filled"
				on:click={() => {
					isEditing = true;
				}}
			>
				<span>
					<Icon src={Pencil} class="w-4 h-4" />
				</span>
				<span>Edit</span>
			</button>
		{/if}
	</footer>
</div>
