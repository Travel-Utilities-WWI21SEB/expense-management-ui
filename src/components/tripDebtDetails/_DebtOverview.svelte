<script lang="ts">
	import { ImformationAlertWithAction, DebtItemTripDetails } from '$components';
	import { Banknotes } from '@steeze-ui/heroicons';
	import type { SortedDebts } from '$tripDomain';
	import { i } from '@inlang/sdk-js';

	export let debts: SortedDebts;

	let selectionIndex = -1;

	const handleSelectItem = (event: CustomEvent<any>) => {
		selectionIndex = event.detail.index;
	};
</script>

<div class="card h-full p-4">
	<div class="flex justify-between pt-4 px-4">
		<h3 class="h3">{i("tripDetails.debtsTab.title")}</h3>
	</div>
	{#if debts.creditorDebts.length === 0 && debts.debitorDebts.length === 0}
		<ImformationAlertWithAction
			alertHeading="This trip has no debts yet"
			class="variant-ghost-primary"
			icon={Banknotes}
		/>
	{:else}
		<div class="grid grid-cols-1 gap-2">
			<div>
				{#if debts.creditorDebts.length !== 0}
					<span class="flex justify-center font-semibold">{i("tripDetails.debtsTab.youGet")}</span>
					<ul class="list p-2 max-h-[500px] overflow-auto">
						{#each debts.creditorDebts as debt, index}
							<li>
								<DebtItemTripDetails isDebt={false} {debt} {index} />
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div>
				{#if debts.debitorDebts.length !== 0}
					<span class="flex justify-center font-semibold">{i("tripDetails.debtsTab.youOwe")}</span>
					<ul class="list p-2 max-h-[500px] overflow-auto">
						{#each debts.debitorDebts as debt, index}
							<li>
								<DebtItemTripDetails isDebt={true} {debt} {index} />
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{/if}
</div>
