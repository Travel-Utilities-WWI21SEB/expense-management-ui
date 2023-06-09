<script lang="ts">
	import { currentUser, errorCode, errorState, loading } from '$stores';
	import type { NameExistsInterface } from '$tripDomain';
	import { modifyUserSuggestions } from '$utils';
	import { Autocomplete, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { i } from '@inlang/sdk-js';

	let inputValue = '';
	export let selectedUsers: Array<NameExistsInterface>;

	const suggestUsers = async (input: string) => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch(`/api/users/suggest?q=${input}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const body = await response.json();
			return body;
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	};

	let options: AutocompleteOption[] = [];

	function onSelection(event: any): void {
		if (!selectedUsers.find((user) => user.name === event.detail.label))
			selectedUsers = [...selectedUsers, { name: event.detail.label, isNew: true }];
	}

	const onRemoveInvitationClick = (name: string) => {
		if (name !== $currentUser.username) {
			selectedUsers = selectedUsers.filter((m) => m.name !== name);
		}
	};

	const onSearchInput = async () => {
		const suggestedUser = await suggestUsers(inputValue);

		options = modifyUserSuggestions(suggestedUser.data);
	};
</script>

<input
	class="input"
	type="search"
	name="demo"
	bind:value={inputValue}
	on:input={onSearchInput}
	placeholder={i('tripOverview.addTripModal.iviteParticitpatsInField')}
/>
<div class="card overflow-y-auto h-auto max-h-32">
	<Autocomplete
		bind:input={inputValue}
		{options}
		on:selection={onSelection}
		emptyState={i('tripOverview.addTripModal.noResultsMessage')}
	/>
</div>
<div class="h-auto p-4" tabindex="-1">
	{#each selectedUsers as participant}
		<span class="m-4 chip variant-filled h-8">
			{participant.name}
			<button on:click={() => onRemoveInvitationClick(participant.name)}>
				{#if participant.name !== $currentUser.username && participant.isNew}
					<Icon src={XMark} class="w-6 h-6" />
				{/if}
			</button>
		</span>
	{/each}
</div>
