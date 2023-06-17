<script lang="ts">
	// Stores
	import {
		modalStore,
		Stepper,
		Step,
		Autocomplete,
		type AutocompleteOption
	} from '@skeletonlabs/skeleton';
	import NewTripStep from './_NewTripStep.svelte';
	import { newTripForm } from '$stores';
	import RemoveIcon from '../../../icons/_RemoveIcon.svelte';

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response($newTripForm);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4 h-auto';
	const cHeader = 'text-2xl font-bold';

	let inputDemo = '';

	const flavorOptions: AutocompleteOption[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

	let selection: Array<string> = [];

	function onFlavorSelection(event: any): void {
		selection = [...selection, event.detail.label];
		inputDemo = event.detail.label;
	}
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<Stepper on:complete={onFormSubmit}>
			<Step locked={$newTripForm.name.length < 1 || $newTripForm.location.length < 1}>
				<svelte:fragment slot="header">Trip Details</svelte:fragment>
				<NewTripStep />
			</Step>
			<Step>
				<svelte:fragment slot="header">Invite Participants</svelte:fragment>
				<input
					class="input"
					type="search"
					name="demo"
					bind:value={inputDemo}
					placeholder="Search..."
				/>
				<div class="card overflow-y-auto h-auto">
					<Autocomplete
						bind:input={inputDemo}
						options={flavorOptions}
						on:selection={onFlavorSelection}
					/>
				</div>
				<div class="justify-center align-center card h-auto p-4" tabindex="-1">
					{#each selection as name}
						<span class="justify-center align-center m-4 chip variant-filled">
							{name}
							<button><RemoveIcon /></button>
						</span>
					{/each}
				</div>
			</Step>
		</Stepper>
	</div>
{/if}
