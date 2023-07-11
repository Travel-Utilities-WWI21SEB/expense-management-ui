<script lang="ts">
	import { ImformationAlertWithAction, TransactionItemTripDetails } from '$components';
	import type { TravelData, UserTransactions } from '$tripDomain';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { AddNewTransactionModal } from '$components';
	import { Banknotes, Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { i } from '@inlang/sdk-js';

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
		<h3 class="h3">{i("tripDetails.debtsTab.transactions")}</h3>
		<button type="button" class="btn variant-filled" on:click={addNewTransaction}>
			<span>
				<Icon src={Plus} class="w-6 h-6" />
			</span>
			<span>{i('tripDetails.debtsTab.addButton')}</span>
		</button>
	</div>
	{#if transactions.confirmedTransactions.length === 0 && transactions.unconfirmedTransactions.length === 0}
		<ImformationAlertWithAction
			alertHeading= {i("tripDetails.debtsTab.noTransactions")}
			class="variant-ghost-primary"
			icon={Banknotes}
		/>
	{:else}
		<div class="grid grid-cols-1 gap-2">
			<div>
				{#if transactions.unconfirmedTransactions.length !== 0}
					<span class="flex justify-center font-semibold">{i("tripDetails.debtsTab.transactionConfirm")}</span>
					<ul class="list p-2 max-h-[500px] overflow-auto">
						{#each transactions.unconfirmedTransactions as transaction, i}
							<li><TransactionItemTripDetails {transaction} needsConfirmation={true} /></li>
						{/each}
					</ul>
				{/if}
			</div>
			<div>
				{#if transactions.confirmedTransactions.length !== 0}
					<span class="flex justify-center font-semibold">{i("tripDetails.debtsTab.otherTransactions")}</span>
					<ul class="list p-2 max-h-[500px] overflow-auto">
						{#each transactions.confirmedTransactions as transaction, i}
							<li><TransactionItemTripDetails {transaction} needsConfirmation={false} /></li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{/if}
</div>
