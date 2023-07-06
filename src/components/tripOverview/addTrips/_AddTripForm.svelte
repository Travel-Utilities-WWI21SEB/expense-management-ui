<script lang="ts">
	// Stores
	import { invalidateAll } from '$app/navigation';
	import { InviteParticipantsStep, NewTripStep } from '$components';
	import {
		currentUser,
		errorCode,
		errorState,
		loading,
		newCostCategories,
		newCostCategoryColors,
		newTripForm,
		selectedUsers
	} from '$stores';
	import { Step, Stepper, modalStore } from '@skeletonlabs/skeleton';
	import AddCostCategories from './steps/_AddCostCategories.svelte';

	selectedUsers.set([$currentUser.username]);

	const createTrip = async () => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch('/api/trips', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify($newTripForm)
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

	const inviteUsers = async (tripId: number, user: { username: string }) => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch(`/api/trips/${tripId}/invite`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ body: user, id: tripId })
			});

			const body = await response.json();
			const { error, errorCode: code } = body;

			errorState.set(error);
			errorCode.set(code);
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	};

	const createCostCategories = async (
		tripId: number,
		costCategory: { name: string; color: string }
	) => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch(`/api/trips/${tripId}/cost-categories`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ body: costCategory, id: tripId })
			});

			const body = await response.json();
			const { error, errorCode: code } = body;

			errorState.set(error);
			errorCode.set(code);
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

		await Promise.all(
			$selectedUsers.map(async (name) => {
				if (name !== $currentUser.username) {
					await inviteUsers(result.data.tripId, { username: name });
				}
			})
		);

		await Promise.all(
			$newCostCategories.map(async (name, index) => {
				await createCostCategories(result.data.tripId, {
					name: name,
					color: $newCostCategoryColors[index]
				});
			})
		);

		invalidateAll();
		modalStore.close();
		newTripForm.set({
			name: '',
			location: '',
			startDate: new Date(Date.now()).toISOString().substring(0, 10),
			endDate: new Date(Date.now()).toISOString().substring(0, 10)
		});
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4 h-auto';
	const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<Stepper on:complete={async () => await onFormSubmit()} on:close={() => alert('test')}>
			<Step locked={$newTripForm.name.length < 1 || $newTripForm.location.length < 1}>
				<svelte:fragment slot="header">Trip Details</svelte:fragment>
				<NewTripStep />
			</Step>
			<Step>
				<svelte:fragment slot="header">Add Cost Categories</svelte:fragment>
				<AddCostCategories />
			</Step>
			<Step>
				<svelte:fragment slot="header">Invite Participants</svelte:fragment>
				<InviteParticipantsStep />
			</Step>
		</Stepper>
	</div>
{/if}
