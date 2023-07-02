<script lang="ts">
	import { AlertWithAction } from '$components';
	import { CostIcon } from '$icons';
	import type { SortedDebts, TravelData } from '$tripDomain';
	import { onMount } from 'svelte';
	import DebtItemTripDetails from './_DebtItemTripDetails.svelte';

	export let debts: SortedDebts;

	let selectionIndex = -1;

	onMount(() => {
		console.log(debts);
	});

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};
</script>

<div class="card h-full p-4">
	<div class="flex justify-between pt-4 px-4">
		<h3 class="h3">Debts</h3>
	</div>
	{#if debts.creditorDebts.length === 0 && debts.debitorDebts.length === 0}
		<AlertWithAction
			alertHeading="This trip has no debts yet"
			class="variant-ghost-primary"
			icon={CostIcon}
		/>
	{:else}
		<div class="grid grid-cols-1 gap-2">
			<div>
				{#if debts.creditorDebts.length === 0}
					<span class="flex justify-center invisible">Placeholder</span>
					<AlertWithAction
						alertHeading="You get nothing"
						class="variant-ghost-primary p-2 mt-2"
						icon={CostIcon}
					/>
				{:else}
					<span class="flex justify-center font-semibold">You get</span>
					<ul class="list p-2 max-h-[500px] overflow-auto">
						{#each debts.creditorDebts as debt, i}
							<li>
								<DebtItemTripDetails
									isDebt={false}
									{debt}
									{i}
									{selectionIndex}
									on:select_item={(e) => handleSelectItem(e)}
								/>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div>
				{#if debts.debitorDebts.length === 0}
					<span class="flex justify-center invisible">Placeholder</span>
					<AlertWithAction
						alertHeading="You have to pay nothing"
						class="variant-ghost-primary p-2"
						icon={CostIcon}
					/>
				{:else}
					<span class="flex justify-center font-semibold">You owe</span>
					<ul class="list p-2 max-h-[500px] overflow-auto">
						{#each debts.debitorDebts as debt, i}
							<li>
								<DebtItemTripDetails
									isDebt={true}
									{debt}
									{i}
									{selectionIndex}
									on:select_item={(e) => handleSelectItem(e)}
								/>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{/if}
</div>
