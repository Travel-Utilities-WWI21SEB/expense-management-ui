<script lang="ts">
	import { goto } from '$app/navigation';
	import { CheckIcon, CrossIcon } from '$icons';
	import {
		correctToken,
		email,
		errorMessage,
		errorState,
		loading,
		password,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { resetLandingPageStore } from '$utils';
	import { ProgressRadial, modalStore } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';
	import AlertWithAction from '../general/_AlertWithAction.svelte';
	import ProgressCircleAnimated from '../general/_ProgressCircleAnimated.svelte';
	import TokenForm from '../general/forms/_TokenForm.svelte';
	import ForgotPasswordStepper from './_ForgotPasswordStepper.svelte';

	export let changeTab: (index: number) => void;
	export let rememberMeCookie: boolean;
	export let emailCookie: string | undefined;

	// Form data
	email.set(emailCookie || $email);
	let rememberMe = rememberMeCookie;

	let forgotPassword = false;
	let notActivatedAlert = false;
	let notActivatedWorkflow = false;

	// Token validation
	$: validToken = !$tokenValues.some((value) => value === '');

	// Provide backwards navigation to the forgotPassword component
	const closeForgotPassword = () => {
		tokenValues.set(['', '', '', '', '', '']);
		forgotPassword = false;
	};

	// Login
	const login = async () => {
		loading.set(true);
		errorState.set(false);

		const response = await fetch('api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: $email, password: $password, rememberMe })
		});

		loading.set(false);
		const { success, activated, error, errorMessage: errorDisplayMessage } = await response.json();

		errorState.set(error);
		errorMessage.set(errorDisplayMessage);

		if (success) {
			modalStore.close();
			goto('/home');
		} else if (!error && !activated) {
			notActivatedAlert = true;
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

	const navigationHandler = () => {
		modalStore.close();
		goto('/home');
	};

	onDestroy(() => {
		// Clean up store values
		resetLandingPageStore();
	});
</script>

<section class="p-3 m-3 h-full">
	{#if !forgotPassword && !notActivatedWorkflow && !notActivatedAlert}
		<!-- This is to adjust the stepper difference in size -->
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="h1 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-center"
			>
				Sign in to your account
			</h1>
			<hr class="w-16 h-1 bg-primary-500 rounded-full" />
			<form class="space-y-4 md:space-y-6" novalidate>
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						title="email"
						type="email"
						placeholder="max@mustermann.de"
						autocomplete="email"
						bind:value={$email}
						on:input={(e) => email.set(e.currentTarget.value)}
					/>
				</label>
				<label class="label">
					<span>Password</span>
					<input
						class="input"
						title="password"
						type="password"
						placeholder="********"
						autocomplete="current-password"
						bind:value={$password}
						on:input={(e) => password.set(e.currentTarget.value)}
					/>
				</label>
			</form>
			<div class="flex items-center justify-between">
				<label class="flex items-center space-x-2">
					<input
						id="remember"
						aria-describedby="remember"
						type="checkbox"
						class="w-4 h-4 checkbox"
						bind:checked={rememberMe}
					/>
					<p>Remember me</p>
				</label>
				<button
					on:click={() => {
						forgotPassword = true;
					}}
					class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"
					>Forgot password?</button
				>
			</div>
			<ol class="list">
				<li>
					{#if $errorState}
						<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
						<span class="flex-auto">{$errorMessage}</span>
					{/if}
				</li>
			</ol>

			<p class="text-sm font-light text-gray-500 dark:text-gray-400">
				Don't have an account yet? <button
					on:click={() => {
						changeTab(0);
					}}
					class="variant-soft-primary">Sign up</button
				>
			</p>
			<div class="flex flex-row justify-end">
				<button
					type="submit"
					class="btn variant-filled-primary hover:variant-soft-primary active: dark:hover:variant-soft-primary-dark"
					on:click={login}
				>
					{#if !$loading}
						Sign in
					{:else}
						<ProgressRadial width="w-6" />
					{/if}
				</button>
			</div>
		</div>
	{:else if forgotPassword}
		<ForgotPasswordStepper {closeForgotPassword} />
	{:else if notActivatedAlert}
		<section>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
				<AlertWithAction
					errorAction={() => {
						resendToken();
						notActivatedAlert = false;
						notActivatedWorkflow = true;
					}}
					alertHeading="Your account is not activated!"
					actionText="Open token form"
				/>
			</div>
		</section>
	{:else if notActivatedWorkflow}
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
								Thank you for trusting Costventures, click on the button on the right to
								automatically login and navigate to the homepage.
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
	{/if}
</section>
