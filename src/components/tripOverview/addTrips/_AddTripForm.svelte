<script lang="ts">
	// Stores
	import { invalidateAll } from '$app/navigation';
	import { InviteParticipantsStep, NewTripStep, AddCostCategories } from '$components';
	import { currentUser, errorCode, errorState, loading } from '$stores';
	import type { NewTripInputs } from '$tripDomain';
	import { createCostCategories, inviteUsers } from '$utils';
	import {
		Step,
		Stepper,
		modalStore,
		toastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { i } from '@inlang/sdk-js';

	$: newCostCategoryElements = newCostCategories.filter((category) => category.isNew);
	$: existingCostCategoryElements = newCostCategories.filter((category) => !category.isNew);

	let newTrip: NewTripInputs = {
		name: '',
		location: '',
		startDate: new Date(Date.now()).toISOString().substring(0, 10),
		endDate: new Date(Date.now()).toISOString().substring(0, 10)
	};
	let selectedUsers = [{ name: $currentUser.username, isNew: true }];
	let newCostCategories = [
		{ name: i('tripOverview.addTripModal.foodCategory'), isNew: true },
		{ name: i('tripOverview.addTripModal.mobilityCategory'), isNew: true }
	];
	let newCostCategoryColors = ['#FF8585', '#00FF62'];

	const createTrip = async () => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch('/api/trips', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newTrip)
			});

			const body = await response.json();
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

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit(): Promise<void> {
		const result = await createTrip();
		const invitationPromises = selectedUsers.map(async (participant) => {
			if (participant.name !== $currentUser.username) {
				inviteUsers(result.data.tripId, { username: participant.name });
			}
		});

		const costCategoryPromises = newCostCategories.map(async (category, index) => {
			createCostCategories(result.data.tripId, {
				name: category.name,
				color: newCostCategoryColors[index]
			});
		});

		await Promise.all([...invitationPromises, ...costCategoryPromises]);

		const message = result.error
			? i('toast.error') + result.errorMessage
			: i('toast.trip') + result.data.name + i('toast.created');
		const t: ToastSettings = {
			message: message,
			background: result.error ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);

		invalidateAll();
		modalStore.close();
		newTrip = {
			name: '',
			location: '',
			startDate: new Date(Date.now()).toISOString().substring(0, 10),
			endDate: new Date(Date.now()).toISOString().substring(0, 10)
		};
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4 h-auto';
	const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<Stepper
			on:complete={async () => await onFormSubmit()}
			on:close={() => alert('test')}
			buttonNextLabel={i('tripOverview.addTripModal.nextButton')}
			buttonBackLabel={i('tripOverview.addTripModal.backButton')}
			buttonCompleteLabel={i('tripOverview.addTripModal.completeButton')}
			stepTerm={i('forms.step')}
		>
			<Step locked={newTrip.name.length < 1 || newTrip.location.length < 1}>
				<svelte:fragment slot="header"
					>{i('tripOverview.addTripModal.tripDetailsTitle')}</svelte:fragment
				>
				<NewTripStep bind:newTrip />
			</Step>
			<Step>
				<svelte:fragment slot="header"
					>{i('tripOverview.addTripModal.costCategoriesTitle')}</svelte:fragment
				>
				<AddCostCategories
					{existingCostCategoryElements}
					{newCostCategoryElements}
					bind:newCostCategories
					bind:newCostCategoryColors
				/>
			</Step>
			<Step>
				<svelte:fragment slot="header"
					>{i('tripOverview.addTripModal.iviteParticitpatsTitle')}</svelte:fragment
				>
				<InviteParticipantsStep bind:selectedUsers />
			</Step>
		</Stepper>
	</div>
{/if}
