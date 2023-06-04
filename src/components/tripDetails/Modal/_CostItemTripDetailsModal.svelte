<script lang="ts">
	import type { Cost, CostDateAsString } from '$tripDomain';
	import { TripDetailsShowCostItem, TripDetailsEditCostItem } from '$components';

	/* export let name: string; */
	export let cost: Cost;

	let localeCost: CostDateAsString = {
		...cost,
		startDate: cost.startDate.toISOString().slice(0, 10),
		endDate: cost.endDate?.toISOString().slice(0, 10)
	};
	let isEditing: boolean = false;

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	import { modalStore } from '@skeletonlabs/skeleton';

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(cost);
		//modalStore.close();
		//Put changes to backend
		//get new costs for trip details
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<div class="card p-4 {cBase}">
	{#if isEditing}
		<TripDetailsEditCostItem cost={localeCost} />
	{:else}
		<TripDetailsShowCostItem cost={localeCost} />
	{/if}
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
		{#if isEditing}
			<button class="btn variant-filled" on:click={() => (isEditing = false)}>Save</button>
		{:else}
			<button
				class="btn variant-filled"
				on:click={() => {
					isEditing = true;
				}}
			>
				<span>&#9998</span>
				<span>Edit</span>
			</button>
		{/if}
	</footer>
</div>
