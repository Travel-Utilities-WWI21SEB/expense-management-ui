<script lang="ts">
	import { goto } from '$app/navigation';
	import { CheckIcon } from '$icons';
	import { email, errorMessage, errorState, loading, tokenValues } from '$stores';
	import { Step, modalStore } from '@skeletonlabs/skeleton';
	import { debounce } from 'lodash';
	import { correctToken, tokenErrorState } from '../../../stores/landingPageStore';
	import AlertWithAction from '../../general/_AlertWithAction.svelte';
	import ProgressCircleAnimated from '../../general/_ProgressCircleAnimated.svelte';
	import TokenForm from '../../general/forms/_TokenForm.svelte';

	export let register: () => Promise<void>;

	// Token validation
	$: validToken = !$tokenValues.some((value) => value === '');

	// Register
	const debouncedRegister = debounce(register, 500);

	// Verify token
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

			const { tokenCorrect, error, errorMessage: message } = await response.json();

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

	// Resend token
	const resendToken = async () => {
		loading.set(true);
		correctToken.set(undefined);
		errorState.set(false);
		tokenErrorState.set(false);

		try {
			const response = await fetch(`api/users/resend-token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: $email })
			});

			const { error, errorMessage: message } = await response.json();

			errorState.set(error);
			errorMessage.set(message);
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

<Step
	buttonBack="invisible pointer-events-none"
	buttonComplete="invisible pointer-events-none"
	regionNavigation="display-none"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Verify your email
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
			{#if $loading}
				<ProgressCircleAnimated />
			{:else if $errorState}
				<AlertWithAction
					errorAction={debouncedRegister}
					alertHeading="Something went wrong!"
					actionText="Try again!"
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
</Step>
