<script lang="ts">
	import { AlertWithAction, TripDetailsAddNewCostItem, TripDetailsCostItem } from '$components';
	import { CostIcon } from '$icons';
	import type { Cost, TravelData } from '$tripDomain';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';

	export let costs: Array<Cost>;
	export let trip: TravelData;

	let selectionIndex = -1;

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};

	const modalComponent: ModalComponent = {
		ref: TripDetailsAddNewCostItem,
		props: { trip: trip }
	};

	function addNewCostItem() {
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}
</script>

<div class="card h-full p-4">
	<div class="flex justify-between p-4">
		<h3 class="h3">Costs</h3>
		<button type="button" class="btn variant-filled" on:click={addNewCostItem}>
			<span>+</span>
			<span>Add</span>
		</button>
	</div>
	{#if costs.length === 0}
		<AlertWithAction
			alertHeading="This trip has no costs yet"
			class="variant-ghost-primary"
			icon={CostIcon}
		/>
	{:else}
		<ul class="list p-2 max-h-[500px] overflow-y-auto">
			{#each costs as cost, i}
				<li>
					<TripDetailsCostItem
						{cost}
						{i}
						{selectionIndex}
						{trip}
						on:select_item={(e) => handleSelectItem(e)}
					/>
				</li>
			{/each}
		</ul>
	{/if}
</div>
