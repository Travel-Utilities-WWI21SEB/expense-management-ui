<script lang="ts">
	import { ErrorIcon } from '$icons';
	import { errorMessage, loading } from '$stores';

	export let errorAction = () => {
		console.log('Function not yet specified');
	};
	export let alertHeading: string;
	export let actionText = '';
	export let enableAction = false;
</script>

<aside class="alert {$$props.class} w-full">
	<!-- Icon -->
	<div>
		<span class="badge-icon w-15 h-15"><ErrorIcon /></span>
	</div>
	<!-- Message -->
	<div class="alert-message">
		<h3 class="h3">{alertHeading}</h3>
		<p>{$errorMessage}</p>
	</div>
	<!-- Actions -->
	{#if enableAction}
		<div class="alert-actions">
			<button
				class="btn variant-filled {$loading ? 'pointer-events-none opacity-50' : ''}"
				on:click={errorAction}>{actionText}</button
			>
		</div>
	{/if}
</aside>
