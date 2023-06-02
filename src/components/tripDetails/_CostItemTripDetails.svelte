<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Cost } from '$tripDomain';
	import { calculateDate } from '$utils';

	export let cost: Cost;
	export let i: number;
	export let selectionIndex: number;

	const dispatch = createEventDispatcher();

	function selectListItem(i: number) {
		dispatch('select_item', {
			index: i
		});
	}

	function pickTextColorBasedOnBgColorSimple(
		bgColor: string,
		lightColor: string,
		darkColor: string
	): string {
		var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
		var r = parseInt(color.substring(0, 2), 16); // hexToR
		var g = parseInt(color.substring(2, 4), 16); // hexToG
		var b = parseInt(color.substring(4, 6), 16); // hexToB
		return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
	}
</script>

<button
	class="card card-hover hover:bg-secondary-100 hover:dark:text-secondary-900 w-full {selectionIndex ===
	i
		? 'bg-secondary-200  outline outline-1'
		: ''}"
	on:click={() => selectListItem(i)}
>
	<div class="grid grid-cols-12 md:gap-2">
		<div class="col-span-12 sm:col-span-2 grid content-center p-2">
			<div class="text-clip overflow-hidden content-center">
				<p
					class="w-full text-sm text-slate-500 mr-4 py-2 px-4
					 rounded-full border-0 text-sm font-semibold
					 text-[{pickTextColorBasedOnBgColorSimple(cost.costCategory.color, '#FFFFFF', '#000000')}]
					  bg-[{cost.costCategory.color}]"
				>
					{cost.costCategory.name}
				</p>
			</div>
		</div>
		<div class="col-span-8 sm:col-span-8 grid content-center p-2">
			<div class="text-clip overflow-hidden text-left">
				{cost.name}
				<br />
				{`${calculateDate(cost.startDate)} - ${calculateDate(cost.endDate)}`}
			</div>
		</div>
		<div class="col-span-4 sm:col-span-2 grid content-center p-2">
			<div class="text-clip font-semibold overflow-hidden w-full text-rigth text-error-500">
				{cost.amount + ' ' + cost.currency}
			</div>
		</div>
	</div>
</button>
