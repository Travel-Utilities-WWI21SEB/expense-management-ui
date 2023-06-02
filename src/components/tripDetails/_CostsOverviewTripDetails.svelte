<script lang="ts">
	import { TripDetailsCostItem } from '$components';
	import type { Cost } from '$tripDomain';

	export let costs: Array<Cost>;

	let selectionIndex = -1;

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};
</script>

<div class="card h-full p-4">
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
