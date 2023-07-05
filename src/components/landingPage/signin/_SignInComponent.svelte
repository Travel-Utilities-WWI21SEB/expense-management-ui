<script lang="ts">
	import { goto } from '$app/navigation';
	import { ForgotPasswordStepper, VerifyToken, VerifyTokenAlert } from '$components';
	import {
		correctToken,
		email,
		errorCode,
		errorState,
		loading,
		notActivatedAlert,
		notActivatedWorkflow,
		password,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { getErrorMessage, resetLandingPageStore } from '$utils';
	import { i } from '@inlang/sdk-js';
	import { ProgressRadial, modalStore } from '@skeletonlabs/skeleton';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onDestroy } from 'svelte';

	export let changeTab: (index: number) => void;
	export let rememberMeCookie: boolean;
	export let emailCookie: string | undefined;

	// Form data
	email.set(emailCookie || $email);
	let rememberMe = rememberMeCookie;

	let forgotPassword = false;
	notActivatedAlert.set(false);
	notActivatedWorkflow.set(false);

	// Provide backwards navigation to the forgotPassword component
	const closeForgotPassword = () => {
		tokenValues.set(['', '', '', '', '', '']);
		forgotPassword = false;
	};

	// Login
	const login = async () => {
		loading.set(true);
		errorState.set(false);

		const response = await fetch('/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: $email, password: $password, rememberMe })
		});

		loading.set(false);
		const body = await response.json();
		const { success, activated, error, errorCode: code } = body;

		errorState.set(error);
		errorCode.set(code);

		if (success) {
			modalStore.close();
			goto('/home');
		} else if (!error && !activated) {
			notActivatedAlert.set(true);
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

	// Keyboard handler
	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			// Ensure that we are in the context of signing in
			if (!forgotPassword && !$notActivatedWorkflow && !$notActivatedAlert) {
				// Click login button
				const loginButton = document.querySelector('.btn.variant-filled-primary');

				if (loginButton) {
					(loginButton as HTMLButtonElement).click();
				}
			}
		}
	};

	onDestroy(() => {
		// Clean up store values
		resetLandingPageStore();
	});
</script>

<section class="p-3 m-3 h-full">
	{#if !forgotPassword && !$notActivatedWorkflow && !$notActivatedAlert}
		<!-- This is to adjust the stepper difference in size -->
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="h1 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-center"
			>
				{i('forms.signin.componentTitle')}
			</h1>
			<hr class="w-16 h-1 bg-primary-500 rounded-full" />
			<form class="space-y-4 md:space-y-6" novalidate on:keydown={keydownHandler}>
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
					<span>{i('forms.signin.password')}</span>
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
					<p>{i('forms.signin.rememberMe')}</p>
				</label>
				<button
					on:click={() => {
						forgotPassword = true;
					}}
					class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"
					>{i('forms.signin.forgotPassword.title')}</button
				>
			</div>
			<ol class="list">
				<li>
					{#if $errorState}
						<span class="badge-icon variant-filled-error w-4 h-4">
							<Icon src={XMark} class="w-6 h-6" />
						</span>
						<span class="flex-auto">{getErrorMessage($errorCode)}</span>
					{/if}
				</li>
			</ol>

			<p class="text-sm font-light text-gray-500 dark:text-gray-400">
				{i('forms.signin.noAccount')}
				<button
					on:click={() => {
						changeTab(0);
					}}
					class="variant-soft-primary"
					>{i('forms.signin.noAccountAction')}
				</button>
			</p>
			<div class="flex flex-row justify-end">
				<button
					type="submit"
					class="btn variant-filled-primary hover:variant-soft-primary active: dark:hover:variant-soft-primary-dark"
					on:click={login}
				>
					{#if !$loading}
						{i('forms.signin.submit')}
					{:else}
						<ProgressRadial width="w-6" />
					{/if}
				</button>
			</div>
		</div>
	{:else if forgotPassword}
		<ForgotPasswordStepper {closeForgotPassword} />
	{:else if $notActivatedAlert}
		<VerifyTokenAlert {resendToken} />
	{:else if $notActivatedWorkflow}
		<VerifyToken {resendToken} />
	{/if}
</section>
