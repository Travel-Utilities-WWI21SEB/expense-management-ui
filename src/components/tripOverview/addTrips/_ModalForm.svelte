<script lang="ts">
	// Stores
	import { modalStore, Stepper, Step } from '@skeletonlabs/skeleton';

	// Form Data
	const formData = {
		name: 'Jane Doe',
		tel: '214-555-1234',
		email: 'jdoe@email.com'
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<Stepper on:buttonComplete={onFormSubmit}>
			<Step>
				<form class="modal-form {cForm}">
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
						<span>Phone Number</span>
						<input
							class="input"
							type="tel"
							bind:value={formData.tel}
							placeholder="Enter phone..."
						/>
					</label>
					<label class="label">
						<span>Email</span>
						<input
							class="input"
							type="email"
							bind:value={formData.email}
							placeholder="Enter email address..."
						/>
					</label>
				</form>
			</Step>
			<Step>
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						type="email"
						bind:value={formData.email}
						placeholder="Enter email address..."
					/>
				</label>
			</Step>
		</Stepper>
	</div>
{/if}
