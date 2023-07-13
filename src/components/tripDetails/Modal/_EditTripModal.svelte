<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { AddCostCategories, InviteParticipantsStep, NewTripStep } from '$components';
	import { errorCode, errorState, loading } from '$stores';
	import type { NameExistsInterface, NewTripInputs } from '$tripDomain';
	import { createCostCategories, getErrorMessage, inviteUsers } from '$utils';
	import {
		Tab,
		TabGroup,
		modalStore,
		type ToastSettings,
		toastStore
	} from '@skeletonlabs/skeleton';
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { i } from '@inlang/sdk-js';
	let tabSet = 0;

	export let parent: any;
	export let newTrip: NewTripInputs;
	export let tripId: string;
	export let onDeleteClick: () => void;
	export let newCostCategories: Array<NameExistsInterface>;
	export let newCostCategoryColors: Array<string>;
	export let selectedUsers: Array<NameExistsInterface>;

	$: newCostCategoryElements = newCostCategories.filter((category) => category.isNew);
	$: existingCostCategoryElements = newCostCategories.filter((category) => !category.isNew);

	const updateTrip = async () => {
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(`/api/trips/${tripId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: newTrip.name,
					location: newTrip.location,
					startDate: newTrip.startDate,
					endDate: newTrip.endDate
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
	};

	const updateCostCategory = async (costCategory: { id: string; name: string; color: string }) => {
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(`/api/trips/${tripId}/cost-categories/${costCategory.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: tripId,
					body: {
						name: costCategory.name,
						color: costCategory.color
					}
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
	};

	const onSaveClick = async () => {
		let result = await updateTrip();
		let toastMessage = i('toast.trip') + result.data.name + i('toast.saved');

		const costCategoryPromises = newCostCategories.map(async (category, index) => {
			if (category.isNew) {
				createCostCategories(result.data.tripId, {
					name: category.name,
					color: newCostCategoryColors[index]
				});
			} else {
				if (category.id) {
					updateCostCategory({
						id: category.id,
						name: category.name,
						color: newCostCategoryColors[index]
					});
				}
			}
		});

		const invitationPromises = selectedUsers.map(async (participant) => {
			if (participant.isNew) {
				inviteUsers(result.data.tripId, { username: participant.name });
			}
		});

		await Promise.all([...costCategoryPromises, ...invitationPromises]);

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
	};
</script>

<div class="card p-4 md:w-1/2">
	<div class="p-4">
		<TabGroup>
			<Tab bind:group={tabSet} name={i('tripOverview.tripData')} value={0}
				>{i('tripOverview.tripData')}</Tab
			>
			<Tab bind:group={tabSet} name="Cost Categories" value={1}
				>{i('tripOverview.costCategories')}</Tab
			>
			<Tab bind:group={tabSet} name="Participants" value={2}>{i('tripOverview.participants')}</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<NewTripStep bind:newTrip />
				{:else if tabSet === 1}
					<AddCostCategories
						{newCostCategoryElements}
						{existingCostCategoryElements}
						bind:newCostCategories
						bind:newCostCategoryColors
					/>
				{:else if tabSet === 2}
					<InviteParticipantsStep bind:selectedUsers />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>{i('tripOverview.closeButton')}</button>
		<button
			class="btn variant-filled-error"
			on:click={() => {
				onDeleteClick();
			}}
		>
			<Icon src={Trash} class="w-6 h-6" />
			<span>{i('tripOverview.deleteButton')}</span>
		</button>
		<button
			class="btn variant-filled"
			on:click={() => {
				onSaveClick();
			}}
		>
			{i('tripOverview.saveButton')}
		</button>
	</footer>
</div>
