<script lang="ts">
	import {
		CheckIcon,
		ClosedEnvelopeIcon,
		CrossIcon,
		ErrorIcon,
		InfoIcon,
		OpenEnvelopeIcon,
		QuestionMarkIcon
	} from '$icons';
	import { tokenValues } from '$stores';
	import { keydownHandler, pasteHandler, validatePassword, validatePasswordsMatch } from '$utils';
	import { ProgressRadial, Step, Stepper } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount, tick } from 'svelte/internal';

	export let closeForgotPassword: () => void;
	export let email: string;

	// Utility variables
	let errorState = false;
	let errorDisplayMessage = '';
	let loading = true;

	// Timer variables
	let resendTokenInterval = 25;
	let resendTokenTimer = 0;
	$: remainingTime = resendTokenTimer > 0 ? `in ${resendTokenTimer} seconds` : '';

	// Password variables
	let passwordValue = '';
	let passwordConfirm = '';

	// Form validation
	$: passwordValid = validatePassword(passwordValue);
	$: passwordsMatch = validatePasswordsMatch(passwordValue, passwordConfirm);

	// Lock step
	$: lockTokenStep = !validToken || !correctToken;
	$: lockCompletion = !passwordValid || !passwordsMatch;

	// Decrease timer if it's greater than 0
	$: if (resendTokenTimer > 0) {
		setTimeout(() => {
			resendTokenTimer--;
		}, 1000);
	}

	// Token utility variables
	let tokenErrorState = false;
	$: validToken = !$tokenValues.some((value) => value === '');
	let correctToken: boolean | undefined = undefined;

	const forgotPasswordHandler = async () => {
		errorState = false;
		loading = true;
		resendTokenTimer = resendTokenInterval;

		const response = await fetch('api/users/forgot-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const { error, errorMessage } = await response.json();

		errorState = error;
		errorDisplayMessage = errorMessage;
		loading = false;
	};

	const verifyPasswordToken = async () => {
		if (correctToken || !validToken) {
			return;
		}

		loading = true;
		correctToken = undefined;
		tokenErrorState = false;

		const response = await fetch(`api/users/verify-reset-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email, token: $tokenValues.join('') })
		});

		const { valid, error, errorMessage } = await response.json();

		correctToken = valid;
		errorState = error;
		errorDisplayMessage = errorMessage;
		loading = false;
	};

	const onCompleteHandler = async () => {
		errorState = false;
		loading = true;

		const response = await fetch(`api/users/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email, password: passwordValue, token: $tokenValues.join('') })
		});

		const { success, error, errorMessage } = await response.json();

		errorState = error;
		errorDisplayMessage = errorMessage;

		if (success) {
			await tick();
			closeForgotPassword();
		}

		loading = false;
	};

	onDestroy(() => {
		tokenValues.set(['', '', '', '', '', '']);
	});

	onMount(() => {
		forgotPasswordHandler();
	});
</script>

<Stepper
	on:complete={onCompleteHandler}
	on:buttonBack={closeForgotPassword}
	buttonBackLabel="Abort"
>
	<Step
		buttonNextLabel="Enter new password"
		locked={lockTokenStep}
		buttonBack="invisible"
		buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockTokenStep
			? 'pointer-events-none opacity-50'
			: ''}"
	>
		<section>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
				{#if loading}
					<ProgressRadial
						class="w-1/2 h-1/2 mx-auto"
						stroke={100}
						meter="stroke-primary-500"
						track="stroke-primary-500/30"
					/>
				{:else if errorState}
					<aside class="alert variant-filled-error w-full">
						<!-- Icon -->
						<div>
							<span class="badge-icon variant-ghost-error w-15 h-15"><ErrorIcon /></span>
						</div>
						<!-- Message -->
						<div class="alert-message">
							<h3 class="h3">Something went wrong!</h3>
							<p>{errorDisplayMessage}</p>
						</div>
						<!-- Actions -->
						<div class="alert-actions">
							<button
								class="btn variant-filled {loading ? 'pointer-events-none opacity-50' : ''}"
								on:click={forgotPasswordHandler}>Try again</button
							>
						</div>
					</aside>
				{:else}
					<h5 class="h5 text-center">Please enter the code we sent to your email!</h5>
					<form
						class="grid grid-flow-col grid-cols-6 lg:gap-x-4"
						novalidate
						on:keydown={(e) => keydownHandler(e, verifyPasswordToken)}
						on:paste={(e) => pasteHandler(e, verifyPasswordToken)}
					>
						{#each $tokenValues as _, index}
							<input
								class="input text-center variant-form-material"
								title="token{index + 1}"
								maxlength="1"
								type="text"
								placeholder=""
								autocomplete="off"
								disabled={correctToken}
								bind:value={$tokenValues[index]}
							/>
						{/each}
					</form>
					<ol class="list flex flex-col">
						<li>
							{#if correctToken}
								<span class="badge-icon variant-filled-success w-4 h-4 justify-center">
									<CheckIcon />
								</span>
								<span class="flex-auto">Token is correct!</span>
							{:else if validToken}
								{#if tokenErrorState}
									<span class="badge-icon variant-filled-success w-4 h-4"><ErrorIcon /></span>
									<span class="flex-auto">{errorDisplayMessage}</span>
								{:else}
									<span class="badge-icon variant-filled-warning w-4 h-4"><CrossIcon /></span>
									<span class="flex-auto">Token is incorrect!</span>
								{/if}
							{:else}
								<span class="badge-icon variant-filled-warning w-4 h-4"><QuestionMarkIcon /></span>
								<span class="flex-auto">Enter the code to start validation</span>
							{/if}
						</li>
						{#if !correctToken}
							<li>
								<span class="badge-icon variant-filled-tertiary w-4 h-4"><InfoIcon /></span>
								<span class="flex-auto">Didn't receive a code?</span>
							</li>
						{/if}
					</ol>
					{#if !correctToken}
						<button
							type="button"
							class="btn btn-sm variant-filled-tertiary flex justify-center center mt-2 {resendTokenTimer >
							0
								? 'pointer-events-none opacity-50'
								: ''}"
							on:click={forgotPasswordHandler}
						>
							<span>
								{#if resendTokenTimer > 0}
									<ClosedEnvelopeIcon />
								{:else}
									<OpenEnvelopeIcon />
								{/if}
							</span>
							<span>Get a new one {remainingTime}</span>
						</button>
					{/if}
				{/if}
			</div>
		</section>
	</Step>
	<Step
		locked={lockCompletion}
		buttonCompleteLabel="Reset password"
		buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockCompletion
			? 'pointer-events-none opacity-50'
			: ''}"
	>
		<svelte:fragment slot="header">
			<h1
				class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
			>
				Set new password
			</h1>
			<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
		</svelte:fragment>
		<section>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
				{#if loading}
					<ProgressRadial
						class="w-1/2 h-1/2 mx-auto"
						stroke={100}
						meter="stroke-primary-500"
						track="stroke-primary-500/30"
					/>
				{:else}
					<form class="space-y-4 md:space-y-6" novalidate>
						<label class="label mb-2">
							<span>Password</span>
							<input
								class="input"
								title="password"
								type="password"
								placeholder="********"
								autocomplete="new-password"
								bind:value={passwordValue}
							/>
						</label>
						<label class="label">
							<span>Confirm Password</span>
							<input
								class="input"
								title="verifyPassword"
								type="password"
								placeholder="********"
								autocomplete="new-password"
								bind:value={passwordConfirm}
							/>
						</label>
					</form>
					<ol class="list">
						<li>
							{#if passwordValid}
								<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
								<span class="flex-auto">Minimum length fulfilled</span>
							{:else}
								<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
								<span class="flex-auto">Password must be at least 8 characters long</span>
							{/if}
						</li>
						<li>
							{#if passwordsMatch}
								<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
								<span class="flex-auto">Passwords match</span>
							{:else}
								<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
								<span class="flex-auto">Passwords don't match</span>
							{/if}
						</li>
					</ol>
				{/if}
			</div>
		</section>
	</Step>
</Stepper>
