<script lang="ts">
	import { goto } from '$app/navigation';
	import { AlertWithAction, ProgressCircleAnimated, TokenForm } from '$components';
	import {
		correctToken,
		email,
		errorCode,
		errorState,
		loading,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { i } from '@inlang/sdk-js';
	import { Step, modalStore } from '@skeletonlabs/skeleton';
	import { Check } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import _ from 'lodash';

	export let register: () => Promise<void>;

	// Token validation
	$: validToken = !$tokenValues.some((value) => value === '');

	// Register
	const debouncedRegister = _.debounce(register, 500);

	// Verify token
	const verifyToken = async () => {
		if ($correctToken || !validToken) {
			return;
		}

		loading.set(true);
		correctToken.set(undefined);
		tokenErrorState.set(false);

		try {
			const response = await fetch(`/api/users/activate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token: $tokenValues.join('') })
			});

			const body = await response.json();
			const { tokenCorrect, error, errorCode: code } = body;

			correctToken.set(tokenCorrect);
			tokenErrorState.set(error);
			errorCode.set(code);

			if (tokenCorrect) {
				loading.set(false);
			}
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
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
			const response = await fetch(`/api/users/resend-token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: $email })
			});

			const body = await response.json();
			const { error, errorCode: code } = body;

			errorState.set(error);
			errorCode.set(code);
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
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
			{i('forms.signup.steps.token.title')}
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
			{#if $loading}
				<ProgressCircleAnimated />
			{:else if $errorState}
				<AlertWithAction
					enableAction={true}
					errorAction={debouncedRegister}
					alertHeading="Something went wrong!"
					actionText="Try again!"
					class="variant-filled-error"
				/>
			{:else if $correctToken}
				<aside class="alert variant-ghost-success">
					<!-- Icon -->
					<div>
						<Icon src={Check} class="w-6 h-6" />
					</div>
					<!-- Message -->
					<div class="alert-message">
						<h3 class="h3">{i('forms.signup.steps.token.successMessage')}</h3>
						<p>
							{i('forms.signup.steps.token.successAction')}
						</p>
					</div>
					<!-- Actions -->
					<div class="alert-actions">
						<button on:click={navigationHandler} class="btn variant-filled"
							>{i('forms.signup.steps.token.successActionLink')}</button
						>
					</div>
				</aside>
			{:else}
				<TokenForm keyboardHandler={verifyToken} {resendToken} />
			{/if}
		</div>
	</section>
</Step>
