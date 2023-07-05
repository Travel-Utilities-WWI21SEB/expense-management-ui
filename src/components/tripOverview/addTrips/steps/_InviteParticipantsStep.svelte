<script lang="ts">
	import { modifyUserSuggestions } from '$utils';
	import { errorMessage, errorState, loading, currentUser } from '$stores';
	import { Autocomplete, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import { RemoveIcon } from '$icons';
	import type { NameExistsInterface } from '$tripDomain';

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
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	};

	let options: AutocompleteOption[] = [];

	function onSelection(event: any): void {
		if (selectedUsers.indexOf(event.detail.label) === -1)
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
	placeholder="Search..."
/>
<div class="card overflow-y-auto h-auto max-h-32">
	<Autocomplete bind:input={inputValue} {options} on:selection={onSelection} />
</div>
<div class="h-auto p-4" tabindex="-1">
	{#each selectedUsers as participant}
		<span class="m-4 chip variant-filled h-8">
			{participant.name}
			<button on:click={() => onRemoveInvitationClick(participant.name)}>
				{#if participant.name !== $currentUser.username && participant.isNew}
					<RemoveIcon />
				{/if}
			</button>
		</span>
	{/each}
</div>
