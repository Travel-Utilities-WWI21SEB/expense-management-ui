<script lang="ts">
	// Stores
	import { modalStore, Stepper, Step } from '@skeletonlabs/skeleton';
	import { NewTripStep, InviteParticipantsStep } from '$components';
	import { newTripForm } from '$stores';

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response($newTripForm);
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
		<Stepper on:complete={onFormSubmit} on:close={() => alert('test')}>
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
