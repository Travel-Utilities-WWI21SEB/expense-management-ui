<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		ImformationAlertWithAction,
		TripDetailsAddNewCostItem,
		TripDetailsCostItem,
		TripDetailsFilterPopUp,
		TripDetailsSortingPopUp
	} from '$components';
	import type { Cost, TravelData } from '$tripDomain';
	import type { ModalComponent, ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';
	import { Paginator, modalStore, popup } from '@skeletonlabs/skeleton';
	import { Banknotes, Plus, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let costs: Array<Cost>;
	export let trip: TravelData;

	let selectionIndex = -1;

	let paginationSettings = {
		offset: 0,
		limit: 5,
		size: costs.length,
		amounts: [5, 10, 20, 50]
	};

	$: paginatedCosts = costs.slice(
		paginationSettings.offset * paginationSettings.limit, // start
		paginationSettings.offset * paginationSettings.limit + paginationSettings.limit // end
	);

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};

	const modalComponent: ModalComponent = {
		ref: TripDetailsAddNewCostItem,
		props: { trip: trip }
	};

	const addNewCostItem = () => {
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	};

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

	const clearFilters = () => {
		let url = new URL($page.url);
		url.searchParams.delete('sortBy');
		url.searchParams.delete('sortOrder');
		url.searchParams.delete('minDeductionDate');
		url.searchParams.delete('maxDeductionDate');
		url.searchParams.delete('minEndDate');
		url.searchParams.delete('maxEndDate');
		goto(url.toString());
	};
</script>

<div class="card h-full p-4">
	<div class="flex justify-between pt-4 px-4">
		<h3 class="h3">Costs</h3>
		<button type="button" class="btn variant-filled" on:click={addNewCostItem}>
			<span>
				<Icon src={Plus} class="w-6 h-6" />
			</span>
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
		{#if $page.url.searchParams.size > 0}
			<button type="button" class="btn btn-sm variant-ghost mx-1" on:click={clearFilters}>
				<Icon src={XMark} class="w-4 h-4" />
				<span>Clear Filters</span>
			</button>
		{/if}
	</div>
	{#if costs.length === 0 && $page.url.searchParams.size === 0}
		<ImformationAlertWithAction
			alertHeading="This trip has no costs yet"
			class="variant-ghost-primary"
			icon={Banknotes}
		/>
	{:else if costs.length === 0 && $page.url.searchParams.size > 0}
		<ImformationAlertWithAction
			alertHeading="No costs match your filter criteria"
			class="variant-ghost-primary"
			icon={Banknotes}
		/>
	{:else}
		{#key paginatedCosts}
			<ul class="list p-2 max-h-[500px] overflow-auto">
				{#each paginatedCosts as cost, idx}
					<li>
						<TripDetailsCostItem
							{cost}
							{selectionIndex}
							{idx}
							{trip}
							on:select_item={(e) => handleSelectItem(e)}
						/>
					</li>
				{/each}
			</ul>
		{/key}
		{#key costs}
			<Paginator
				bind:settings={paginationSettings}
				showFirstLastButtons={false}
				showPreviousNextButtons={true}
				justify="justify-center"
			/>
		{/key}
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
