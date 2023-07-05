<script lang="ts">
	import { AlertWithAction } from '$components';
	import { CostIcon } from '$icons';
	import type { Transaction, TravelData } from '$tripDomain';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { AddNewTransactionModal } from '$components';

	export let transactions: Transaction[];
	export let trip: TravelData;
	export let currentUserId: string;

	onMount(() => {
		console.log(transactions);
	}); //TODO: remove

	const addNewTransaction = () => {
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	};

	const modalComponent: ModalComponent = {
		ref: AddNewTransactionModal,
		props: { trip: trip, currentUserId: currentUserId }
	};
</script>

<div class="card h-full p-4">
	<div class="flex justify-between pt-4 px-4">
		<h3 class="h3">Transactions</h3>
		<button type="button" class="btn variant-filled" on:click={addNewTransaction}>
			<span>+</span>
			<span>Add</span>
		</button>
	</div>
	<!-- {#if debts.creditorDebts.length === 0 && debts.debitorDebts.length === 0}
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
							<li>//item</li>
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
							<li>//item</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{/if} -->
</div>
