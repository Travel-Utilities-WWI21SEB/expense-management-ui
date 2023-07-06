<script lang="ts">
	import { AlertWithAction } from '$components';
	import { CostIcon } from '$icons';
	import type { TravelData, UserTransactions } from '$tripDomain';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { AddNewTransactionModal } from '$components';

	export let transactions: UserTransactions;
	export let trip: TravelData;
	export let currentUserId: string;

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
	{#if transactions.confirmedTransactions.length === 0 && transactions.unconfirmedTransactions.length === 0}
		<AlertWithAction
			alertHeading="This trip has no transaction your included in yet"
			class="variant-ghost-primary"
			icon={CostIcon}
		/>
	{:else}
		<div class="grid grid-cols-1 gap-2">
			<div>
				{#if transactions.unconfirmedTransactions.length !== 0}
					<span class="flex justify-center font-semibold">Transaction you can confirm</span>
					<ul class="list p-2 max-h-[500px] overflow-auto">
						{#each transactions.unconfirmedTransactions as transaction, i}
							<li>//item</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div>
				{#if transactions.confirmedTransactions.length === 0}
					<span class="flex justify-center invisible">Placeholder</span>
					<AlertWithAction
						alertHeading="You have to pay nothing"
						class="variant-ghost-primary p-2"
						icon={CostIcon}
					/>
				{:else}
					<span class="flex justify-center font-semibold">History</span>
					<ul class="list p-2 max-h-[500px] overflow-auto">
						{#each transactions.confirmedTransactions as transaction, i}
							<li>//item</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{/if}
</div>
