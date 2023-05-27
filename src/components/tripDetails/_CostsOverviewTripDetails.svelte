<script lang="ts">
	import type { Cost } from '$tripDomain';

	export let costs: Array<Cost>;

	let selectionIndex = -1;

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};
</script>

<div class="card h-full">
	<h4 class="h4">Costs</h4>
	<ul class="list">
		{#each costs as cost, i}
			<li>
				<p>{cost.name}</p>
			</li>
		{/each}
	</ul>
</div>
