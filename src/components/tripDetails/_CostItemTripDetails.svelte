<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Cost, TravelData } from '$tripDomain';
	import { calculateDate, pickTextColorBasedOnBgColorSimple } from '$utils';
	import { TripDetailsCostItemModal } from '$components';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { currentCost } from '../../stores/costStore';

	export let cost: Cost;
	export let i: number;
	export let selectionIndex: number;
	export let trip: TravelData;

	const dispatch = createEventDispatcher();

	function selectListItem(i: number) {
		dispatch('select_item', {
			index: i
		});

		currentCost.set(cost);

		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	const modalComponent: ModalComponent = {
		ref: TripDetailsCostItemModal,
		props: { cost: cost, trip: trip }
	};
</script>

<button
	class="card card-hover hover:bg-secondary-100 hover:dark:text-secondary-900 w-full {selectionIndex ===
	i
		? 'bg-secondary-200  outline outline-1'
		: ''}"
	on:click={() => selectListItem(i)}
>
	<div class="grid grid-cols-12 md:gap-2">
		<div class="col-span-12 sm:col-span-3 grid content-center p-2">
			<div class="text-clip overflow-hidden content-center">
				<p
					style="background-color: {cost.costCategory.color}"
					class="text-sm text-
					text-[{pickTextColorBasedOnBgColorSimple(cost.costCategory.color, '#ffffff', '#000000')}]
					 rounded-full border-0 font-semibold m-4 chip variant-filled"
				>
					{cost.costCategory.name}
				</p>
			</div>
		</div>
		<div class="col-span-8 sm:col-span-7 grid content-center p-2">
			<div class="text-clip overflow-hidden text-left">
				{cost.name}
				<br />
				{calculateDate(cost.startDate)}
				{#if cost.endDate} - {calculateDate(cost.endDate)} {/if}
			</div>
		</div>
		<div class="col-span-4 sm:col-span-2 grid content-center p-2">
			<div class="text-clip font-semibold overflow-hidden w-full text-rigth text-error-500">
				{cost.amount + ' ' + (cost.currency === '' ? '€' : cost.currency)}
			</div>
		</div>
	</div>
</button>
