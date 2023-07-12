<script lang="ts">
	import type { NameExistsInterface } from '$tripDomain';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { i } from '@inlang/sdk-js';

	let inputValue = '';

	export let newCostCategories: Array<NameExistsInterface>;
	export let newCostCategoryColors: Array<string>;
	export let newCostCategoryElements: Array<NameExistsInterface>;
	export let existingCostCategoryElements: Array<NameExistsInterface>;

	function onSelection(): void {
		if (!newCostCategories.some((c) => c.name === inputValue)) {
			newCostCategories = [...newCostCategories, { name: inputValue, isNew: true }];
			newCostCategoryColors = [...newCostCategoryColors, '#6590D5'];
			inputValue = '';
		}
	}

	const onRemoveInvitationClick = (name: NameExistsInterface) => {
		newCostCategories = newCostCategories.filter((m) => m !== name);
	};
</script>

<input
	class="input"
	type="search"
	name="demo"
	bind:value={inputValue}
	on:change={onSelection}
	placeholder={i('tripOverview.addTripModal.costCategoriesInField')}
/>
<div class="h-auto p-4" tabindex="-1">
	{#if newCostCategoryElements.length > 0}
		<p>{i('tripOverview.addTripModal.colorChangeExplanation')}</p>
	{/if}
	{#each newCostCategories as category, id}
		{#if category.isNew}
			<button
				class="m-4 chip variant-filled h-8"
				style="background-color: {newCostCategoryColors[id]};"
				on:click={() => {
					document.getElementById(`nativeColorPicker${id}`)?.click();
				}}
			>
				{category.name}
				<button class="ml-2" on:click={() => onRemoveInvitationClick(category)}>
					<Icon src={XMark} class="w-6 h-6" />
				</button>
			</button>
		{/if}
	{/each}
	{#if existingCostCategoryElements.length > 0}
		<hr class="!border-t-4 my-4" />
	{/if}
	<div class="lg:grid lg:grid-cols-2 lg:gap-4">
		{#each newCostCategories as category, id}
			{#if category.isNew}
				<input
					id={`nativeColorPicker${id}`}
					bind:value={newCostCategoryColors[id]}
					type="color"
					class="opacity-0 h-0"
				/>
			{:else}
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] my-2">
					<input
						class="w-32"
						type="search"
						bind:value={category.name}
						placeholder="Change category..."
					/>
					<div>
						<input
							id={`nativeColorPicker${id}`}
							bind:value={newCostCategoryColors[id]}
							type="color"
							class="h-full w-full"
						/>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
