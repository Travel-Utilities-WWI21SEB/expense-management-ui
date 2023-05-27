<script lang="ts">
	import type { Cost } from '$tripDomain';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let costs: Array<Cost>;

	let selectionIndex = -1;

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};
</script>

<div class="card h-full">
	<h3 class="h3 flex justify-center p-2">Costs</h3>
	<ul class="list p-4">
		{#each costs as cost, i}
			<li>
				<div class="card card-hover w-full">
					<div class="grid grid-cols-12 md:gap-2">
						<div class="col-start-1 col-span-2 grid content-center">
							<div class="flex flex-row flex-wrap content-center">
								<Avatar initials={cost.costCategory.name} background={cost.costCategory.color} />
							</div>
						</div>
						<div class="col-span-8 grid content-center">
							<div class="flex flex-row flex-wrap">
								{cost.name}
							</div>
						</div>
						<div class="col-span-2 grid content-center">
							<div class="flex flex-row flex-wrap w-full">
								{cost.amount + ' ' + cost.currency}
							</div>
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
