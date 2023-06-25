<script lang="ts">
	import { modifyUserSuggestions } from '$utils';
	import { errorMessage, errorState, loading, selectedUsers } from '$stores';
	import { Autocomplete, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import { RemoveIcon } from '$icons';

	let inputValue = '';

	const suggestUsers = async (input: string) => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch(`api/users/suggest?q=${input}`, {
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
		if ($selectedUsers.indexOf(event.detail.label) === -1)
			selectedUsers.set([...$selectedUsers, event.detail.label]);
	}

	const onRemoveInvitationClick = (name: string) => {
		selectedUsers.set($selectedUsers.filter((m) => m !== name));
	};

	const onSearchInput = () => {
		suggestUsers(inputValue).then((result) => {
			options = modifyUserSuggestions(result.data);
		});
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
	{#each $selectedUsers as name}
		<span class="m-4 chip variant-filled">
			{name}
			<button on:click={() => onRemoveInvitationClick(name)}><RemoveIcon /></button>
		</span>
	{/each}
</div>
