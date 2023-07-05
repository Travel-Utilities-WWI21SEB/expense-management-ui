<script lang="ts">
	import { DeleteIcon } from '$icons';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { NewTripStep, AddCostCategories, InviteParticipantsStep } from '$components';
	import type { NameExistsInterface, NewTripInputs } from '$tripDomain';
	let tabSet = 0;

	export let parent: any;
	export let newTrip: NewTripInputs;
	export let onDeleteClick: () => void;
	export let newCostCategories: Array<NameExistsInterface>;
	export let newCostCategoryColors: Array<string>;
	export let selectedUsers: Array<NameExistsInterface>;
</script>

<div class="card p-4 md:w-1/2">
	<div class="p-4">
		<TabGroup>
			<Tab bind:group={tabSet} name="Trip Data" value={0}>Trip Data</Tab>
			<Tab bind:group={tabSet} name="Cost Categories" value={1}>Cost Categories</Tab>
			<Tab bind:group={tabSet} name="Participants" value={2}>Participants</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<NewTripStep bind:newTrip />
				{:else if tabSet === 1}
					<AddCostCategories bind:newCostCategories bind:newCostCategoryColors />
				{:else if tabSet === 2}
					<InviteParticipantsStep bind:selectedUsers />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn border-2" on:click={parent.onClose}>Close</button>
		<button
			class="btn variant-filled-error"
			on:click={() => {
				onDeleteClick();
			}}
		>
			<DeleteIcon />
			<span>Delete</span>
		</button>
		<button
			class="btn variant-filled"
			on:click={() => {
				//onFormSubmit();
			}}
		>
			Save
		</button>
	</footer>
</div>
