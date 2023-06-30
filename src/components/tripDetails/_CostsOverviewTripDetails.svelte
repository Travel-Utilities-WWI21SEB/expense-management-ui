<script lang="ts">
	import {
		TripDetailsCostItem,
		TripDetailsAddNewCostItem,
		AlertWithAction,
		TripDetailsSortingPopUp,
		TripDetailsFilterPopUp
	} from '$components';
	import type { Cost, TravelData } from '$tripDomain';
	import type { ModalComponent, ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';
	import { modalStore, popup } from '@skeletonlabs/skeleton';
	import { CostIcon } from '$icons';
	import { page } from '$app/stores';

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

	const popUpSorting: PopupSettings = {
		event: 'click',
		target: 'SortingPopUp',
		placement: 'bottom'
	};

	const popUpFiltering: PopupSettings = {
		event: 'click',
		target: 'FilteringPopUp',
		placement: 'bottom'
	};
</script>

<div class="card h-full p-4">
	<div class="flex justify-between pt-4 px-4">
		<h3 class="h3">Costs</h3>
		<button type="button" class="btn variant-filled" on:click={addNewCostItem}>
			<span>+</span>
			<span>Add</span>
		</button>
	</div>
	<div class="flex p-2">
		<button type="button" class="btn btn-sm variant-filled mx-1" use:popup={popUpSorting}
			>Sort</button
		>
		<button type="button" class="btn btn-sm variant-filled mx-1" use:popup={popUpFiltering}
			>Filter</button
		>
	</div>
	{#if costs.length === 0 && $page.url.searchParams.size === 0}
		<AlertWithAction
			alertHeading="This trip has no costs yet"
			class="variant-ghost-primary"
			icon={CostIcon}
		/>
	{:else if costs.length === 0 && $page.url.searchParams.size > 0}
		<AlertWithAction
			alertHeading="No costs match your filter criteria"
			class="variant-ghost-primary"
			icon={CostIcon}
		/>
	{:else}
		<ul class="list p-2 max-h-[500px] overflow-auto">
			{#key costs}
				{#each costs as cost, i}
					<li>
						<TripDetailsCostItem
							{cost}
							{selectionIndex}
							{i}
							{trip}
							on:select_item={(e) => handleSelectItem(e)}
						/>
					</li>
				{/each}
			{/key}
		</ul>
	{/if}
</div>

<!-- 	Sorting PopUp   -->
<div class="card p-4 shadow-xl w-72 grid grid-cols-2" data-popup="SortingPopUp">
	<TripDetailsSortingPopUp />
</div>
<!-- SortingPopUp End -->

<!-- 	Filtering PopUp   -->
<div class="card p-4 shadow-xl w-72 grid grid-cols-2" data-popup="FilteringPopUp">
	<TripDetailsFilterPopUp {trip} />
</div>
<!-- Filtering PopUp End -->
