<script lang="ts">
	import { goto } from '$app/navigation';
	import { CheckIcon } from '$icons';
	import {
		correctToken,
		errorMessage,
		errorState,
		loading,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { AlertWithAction, ProgressCircleAnimated, TokenForm } from '$components';

	export let resendToken: () => void;

	// Token validation
	$: validToken = !$tokenValues.some((value) => value === '');

	const verifyToken = async () => {
		if ($correctToken || !validToken) {
			return;
		}

		loading.set(true);
		correctToken.set(undefined);
		tokenErrorState.set(false);

		try {
			const response = await fetch(`api/users/activate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token: $tokenValues.join('') })
			});

			const body = await response.json();
			const { tokenCorrect, error, errorMessage: message } = body;

			correctToken.set(tokenCorrect);
			tokenErrorState.set(error);
			errorMessage.set(message);

			if (tokenCorrect) {
				loading.set(false);
			}
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	};

	const navigationHandler = () => {
		modalStore.close();
		goto('/home');
	};
</script>

<h1
	class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
>
	Verify your email
</h1>
<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
<section>
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
		{#if $loading}
			<ProgressCircleAnimated />
		{:else if $errorState}
			<AlertWithAction
				enableAction={true}
				errorAction={resendToken}
				alertHeading="Something went wrong!"
				actionText="Send another token"
			/>
		{:else if $correctToken}
			<aside class="alert variant-ghost-success">
				<!-- Icon -->
				<div><CheckIcon /></div>
				<!-- Message -->
				<div class="alert-message">
					<h3 class="h3">The Verification was successful!</h3>
					<p>
						Thank you for trusting Costventures, click on the button on the right to automatically
						login and navigate to the homepage.
					</p>
				</div>
				<!-- Actions -->
				<div class="alert-actions">
					<button on:click={navigationHandler} class="btn variant-filled">Login</button>
				</div>
			</aside>
		{:else}
			<TokenForm keyboardHandler={verifyToken} {resendToken} />
		{/if}
	</div>
</section>
