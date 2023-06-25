<script lang="ts">
	import { RemoveIcon } from '$icons';

	let inputValue = '';

	let categories: Array<string> = [];
	let colors: Array<string> = [];

	function onSelection(): void {
		console.log(inputValue);
		if (categories.indexOf(inputValue) === -1) {
			categories = [...categories, inputValue];
			inputValue = '';
		}
	}

	const onRemoveInvitationClick = (name: string) => {
		categories = categories.filter((m) => m !== name);
	};
</script>

<input
	class="input"
	type="search"
	name="demo"
	bind:value={inputValue}
	on:change={onSelection}
	placeholder="Search..."
/>
<div class="h-auto p-4" tabindex="-1">
	{#each categories as name, i}
		<span class="m-4 chip variant-filled h-8">
			{name}
			<button on:click={() => onRemoveInvitationClick(name)}>
				<RemoveIcon />
			</button>
		</span>
	{/each}
</div>
