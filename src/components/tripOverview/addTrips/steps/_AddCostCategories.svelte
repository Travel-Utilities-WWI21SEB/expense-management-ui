<script lang="ts">
	import { newCostCategories, newCostCategoryColors } from '$stores';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let inputValue = '';

	newCostCategories.set(['Food', 'Mobility']);
	newCostCategoryColors.set(['#FF8585', '#00FF62']);

	function onSelection(): void {
		if ($newCostCategories.indexOf(inputValue) === -1) {
			newCostCategories.set([...$newCostCategories, inputValue]);
			newCostCategoryColors.set([...$newCostCategoryColors, '#6590D5']);
			inputValue = '';
		}
	}

	const onRemoveInvitationClick = (name: string) => {
		newCostCategories.set($newCostCategories.filter((m) => m !== name));
	};
</script>

<input
	class="input"
	type="search"
	name="demo"
	bind:value={inputValue}
	on:change={onSelection}
	placeholder="Input new Cost Category"
/>
{#each $newCostCategories as _, i}
	<input
		id={`nativeColorPicker${i}`}
		bind:value={$newCostCategoryColors[i]}
		type="color"
		class="opacity-0 h-0"
	/>
{/each}

<div class="h-auto p-4" tabindex="-1">
	{#if $newCostCategories.length > 0}
		<p>You can change the color by clicking!</p>
	{/if}
	{#each $newCostCategories as name, i}
		<button
			class="m-4 chip variant-filled h-8"
			style="background-color: {$newCostCategoryColors[i]};"
			on:click={() => {
				document.getElementById(`nativeColorPicker${i}`)?.click();
			}}
		>
			{name}
			<button on:click={() => onRemoveInvitationClick(name)}>
				<Icon src={XMark} class="w-6 h-6" />
			</button>
		</button>
	{/each}
</div>
