<script lang="ts">
	// Stores
	import { modalStore, Stepper, Step } from '@skeletonlabs/skeleton';
	import { NewTripStep, InviteParticipantsStep } from '$components';
	import {
		currentUser,
		newTripForm,
		errorMessage,
		errorState,
		loading,
		selectedUsers
	} from '$stores';
	import { invalidateAll } from '$app/navigation';

	selectedUsers.set([$currentUser.username]);

	const createTrip = async (newTrip: { location: string; startDate: string; endDate: string }) => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch('api/trips', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newTrip)
			});

			const body = await response.json();
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
	};

	const inviteUsers = async (tripId: number, user: { invitedUsername: string }) => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch(`api/trips/${tripId}/invite`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});

			const body = await response.json();
			const { error, errorMessage: errorDisplayMessage } = body;

			errorState.set(error);
			errorMessage.set(errorDisplayMessage);
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	};

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit(): Promise<void> {
		const result = await createTrip({
			location: $newTripForm.location,
			endDate: $newTripForm.endDate,
			startDate: $newTripForm.startDate
		});

		await Promise.all(
			$selectedUsers.map(async (name) => {
				if (name !== $currentUser.username)
					await inviteUsers(result.data.tripId, { invitedUsername: name });
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
				<svelte:fragment slot="header">Invite Participants</svelte:fragment>
				<InviteParticipantsStep />
			</Step>
		</Stepper>
	</div>
{/if}
