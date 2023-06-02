<script lang="ts">
	import type { Cost } from '$tripDomain';
	import { TripDetailsShowCostItem, TripDetailsEditCostItem } from '$components';

	/* export let name: string; */
	export let cost: Cost;

	let isEditing: boolean = false;

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(cost);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<div class="card p-4 {cBase}">
	{#if isEditing}
		<TripDetailsEditCostItem {cost} />
	{:else}
		<TripDetailsShowCostItem {cost} />
	{/if}
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
			>{parent.buttonTextCancel}</button
		>
		<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
	</footer>
</div>
