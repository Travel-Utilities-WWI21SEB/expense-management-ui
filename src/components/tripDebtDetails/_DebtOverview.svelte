<script lang="ts">
	import { AlertWithAction } from '$components';
	import { CostIcon } from '$icons';
	import type { SortedDebts, TravelData } from '$tripDomain';
	import DebtItemTripDetails from './_DebtItemTripDetails.svelte';

	export let debts: SortedDebts;
	export let trip: TravelData;

	let selectionIndex = -1;

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};
</script>

<div class="card h-full p-4">
	<div class="flex justify-between pt-4 px-4">
		<h3 class="h3">Debts</h3>
	</div>
	{#if debts.creditorDebts.length === 0}
		<AlertWithAction
			alertHeading="This trip has no debts yet"
			class="variant-ghost-primary"
			icon={CostIcon}
		/>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2">
			<div>
				<span class="flex justify-center">You get</span>
				<ul class="list p-2 max-h-[500px] overflow-auto">
					{#each debts.creditorDebts as debt, i}
						<li>
							<DebtItemTripDetails
								isDebt={false}
								{debt}
								{i}
								{trip}
								{selectionIndex}
								on:select_item={(e) => handleSelectItem(e)}
							/>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<span class="flex justify-center">You have to pay</span>
				<ul class="list p-2 max-h-[500px] overflow-auto">
					{#each debts.debitorDebts as debt, i}
						<li>
							<DebtItemTripDetails
								isDebt={true}
								{debt}
								{i}
								{trip}
								{selectionIndex}
								on:select_item={(e) => handleSelectItem(e)}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</div>
