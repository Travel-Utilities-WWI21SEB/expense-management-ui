<script lang="ts">
	import { TripDetailsCostItem } from '$components';
	import type { Cost } from '$tripDomain';
	import { goto } from '$app/navigation';

	export let costs: Array<Cost>;

	let selectionIndex = -1;

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};

	function onCostCardClick() {
		goto(`/costs`);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card h-full card-hover p-4" on:click={() => onCostCardClick()}>
	<h3 class="h3 flex justify-center p-2">Costs</h3>
	<ul class="list p-2">
		{#each costs as cost, i}
			<li>
				<TripDetailsCostItem
					{cost}
					{selectionIndex}
					{i}
					on:select_item={(e) => handleSelectItem(e)}
				/>
			</li>
		{/each}
	</ul>
</div>
