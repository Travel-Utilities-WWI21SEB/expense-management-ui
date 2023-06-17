<script lang="ts">
	// Stores
	import { modalStore, Stepper, Step } from '@skeletonlabs/skeleton';

	// Form Data
	const formData = {
		name: '',
		location: '',
		startDate: new Date(Date.now()).toISOString().substring(0, 10),
		endDate: new Date(Date.now()).toISOString().substring(0, 10)
	};

	console.log(new Date(Date.now() + 1).toISOString().substring(0, 10));
	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<Stepper on:complete={onFormSubmit}>
			<Step locked={formData.name.length < 1 || formData.location.length < 1}>
				<svelte:fragment slot="header">Trip Details</svelte:fragment>
				<form class="modal-form p-4 space-y-4">
					<label class="label">
						<span>Name</span>
						<input
							class="input"
							type="text"
							bind:value={formData.name}
							placeholder="Enter name..."
						/>
					</label>
					<label class="label">
						<span>Location</span>
						<input
							class="input"
							type="text"
							bind:value={formData.location}
							placeholder="Enter location..."
						/>
					</label>
					<label class="label">
						<span>Start Date:</span>
						<input
							min={new Date(Date.now()).toISOString().substring(0, 10)}
							class="input"
							type="date"
							placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
							bind:value={formData.startDate}
						/>
					</label>
					<label class="label">
						<span>Start Date:</span>
						<input
							min={formData.startDate}
							class="input"
							type="date"
							placeholder={new Date(Date.now()).toISOString().substring(0, 10)}
							bind:value={formData.endDate}
						/>
					</label>
				</form>
			</Step>
			<Step>
				<svelte:fragment slot="header">Invite Participants</svelte:fragment>
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						type="date"
						bind:value={formData.startDate}
						placeholder="Enter email address..."
					/>
				</label>
			</Step>
		</Stepper>
	</div>
{/if}
