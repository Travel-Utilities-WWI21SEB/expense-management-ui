<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { errorCode, errorState, loading } from '$stores';
	import type { NewTransaction, TravelData } from '$tripDomain';
	import { validateNewTransaction } from '$utils';
	import { modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { Check, XCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let trip: TravelData;
	export let currentUserId: string;
	export let parent: any;

	let users = trip.participants.filter(
		(user) => user.hasAcceptedInvite && user.userId !== currentUserId
	);

	$: validData = validateNewTransaction(newTransaction);

	let newTransaction = {
		amount: 0,
		currencyCode: 'EUR',
		debtorId: users.length > 0 ? users[0].userId : ''
	};

	const changeSelectedUser = (e: any) => {
		newTransaction.debtorId = e.target.value;
	};

	const createTransaction = async (transaction: NewTransaction) => {
		loading.set(true);
		errorState.set(false);

		try {
			const costsResponse = await fetch(`/api/trips/${trip.tripId}/transactions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...transaction,
					amount: transaction.amount.toString()
				})
			});

			const body = await costsResponse.json();

			const { error, errorCode: errorDisplayMessage } = body;

			errorState.set(error);
			errorCode.set(errorDisplayMessage);

			return body;
		} catch (error: any) {
			errorState.set(true);
			errorCode.set(error.errorCode);
		} finally {
			loading.set(false);
		}
	};

	const onFormSubmit = async () => {
		const result = await createTransaction(newTransaction);

		const message = result.error
			? `Error: ${result.errorMessage}`
			: `Transaction created successfully`;
		const t: ToastSettings = {
			message: message,
			background: result.error ? 'variant-filled-warning' : 'variant-filled-success'
		};
		toastStore.trigger(t);

		if (!result.error) {
			invalidateAll();
			modalStore.close();
		}
	};
</script>

<div class="card p-4 md:w-1/2">
	<div class="p-4">
		<h3 class="h3 flex justify-center pb-4">
			<span
				class="bg-gradient-to-br from-primary-800 to-primary-300 bg-clip-text text-transparent box-decoration-clone"
			>
				Add new Transaction
			</span>
		</h3>
		<label class="label pb-2">
			<span class="font-semibold">Send money to</span>
			<select
				class="select"
				on:change={(e) => {
					changeSelectedUser(e);
				}}
			>
				{#each users as user}
					<option value={user.userId} selected={newTransaction.debtorId === user.userId}
						>{user.username}</option
					>
				{/each}
			</select>
		</label>
		<label class="label">
			<span class="font-semibold">Amount</span>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<input type="number" bind:value={newTransaction.amount} />
				<select bind:value={newTransaction.currencyCode}>
					<option value="EUR">€</option>
				</select>
			</div>
		</label>
	</div>
	<ol class="list">
		<li>
			{#if !validData}
				<span class="badge-icon variant-filled-error w-4 h-4"> <Icon src={XCircle} /> </span>
				<span class="flex-auto">Please provide a valid transaction</span>
			{:else}
				<span class="badge-icon variant-filled-success w-4 h-4">
					<Icon src={Check} />
				</span>
				<span class="flex-auto">New Transaction is valid</span>
			{/if}
		</li>
	</ol>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
		<button
			class="btn variant-filled"
			disabled={!validData}
			on:click={() => {
				onFormSubmit();
			}}
		>
			Save
		</button>
	</footer>
</div>