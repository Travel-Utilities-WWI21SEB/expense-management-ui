<script lang="ts">
	import { ErrorIcon } from '$icons';
	import { errorMessage, loading } from '$stores';

	export let errorAction: () => void;
	export let actionText: string;
</script>

<aside class="alert variant-filled-error w-full">
	<!-- Icon -->
	<div>
		<span class="badge-icon variant-ghost-error w-15 h-15"><ErrorIcon /></span>
	</div>
	<!-- Message -->
	<div class="alert-message">
		<h3 class="h3">Something went wrong!</h3>
		<p>{$errorMessage}</p>
	</div>
	<!-- Actions -->
	<div class="alert-actions">
		<button
			class="btn variant-filled {$loading ? 'pointer-events-none opacity-50' : ''}"
			on:click={errorAction}>{actionText}</button
		>
	</div>
</aside>
