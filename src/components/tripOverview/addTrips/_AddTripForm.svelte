<script lang="ts">
	// Stores
	import {
		modalStore,
		Stepper,
		Step,
		type ToastSettings,
		toastStore
	} from '@skeletonlabs/skeleton';
	import { NewTripStep, InviteParticipantsStep } from '$components';
	import { currentUser, errorMessage, errorState, loading } from '$stores';
	import { invalidateAll } from '$app/navigation';
	import AddCostCategories from './steps/_AddCostCategories.svelte';
	import type { NewTripInputs } from '$tripDomain';

	let newTrip: NewTripInputs = {
		name: '',
		location: '',
		startDate: new Date(Date.now()).toISOString().substring(0, 10),
		endDate: new Date(Date.now()).toISOString().substring(0, 10)
	};
	let selectedUsers = [$currentUser.username];
	let newCostCategories = ['Food', 'Mobility'];
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
		const result = await createTrip();

		await Promise.all(
			selectedUsers.map(async (name) => {
				if (name !== $currentUser.username) {
					await inviteUsers(result.data.tripId, { username: name });
				}
			})
		);

		await Promise.all(
			newCostCategories.map(async (name, index) => {
				await createCostCategories(result.data.tripId, {
					name: name,
					color: newCostCategoryColors[index]
				});
			})
		);

		const message = result.error
			? `Error: ${result.errorMessage}`
			: `Trip ${result.data.name} created successfully`;
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
		<Stepper on:complete={async () => await onFormSubmit()} on:close={() => alert('test')}>
			<Step locked={newTrip.name.length < 1 || newTrip.location.length < 1}>
				<svelte:fragment slot="header">Trip Details</svelte:fragment>
				<NewTripStep bind:newTrip />
			</Step>
			<Step>
				<svelte:fragment slot="header">Add Cost Categories</svelte:fragment>
				<AddCostCategories bind:newCostCategories bind:newCostCategoryColors />
			</Step>
			<Step>
				<svelte:fragment slot="header">Invite Participants</svelte:fragment>
				<InviteParticipantsStep bind:selectedUsers />
			</Step>
		</Stepper>
	</div>
{/if}
