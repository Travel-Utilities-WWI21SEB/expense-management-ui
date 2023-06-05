<script lang="ts">
	import { CheckIcon, CrossIcon, QuestionMarkIcon } from '$icons';
	import { newUser } from '$stores';
	import { validateEmail } from '$utils';
	import { ProgressRadial, Step } from '@skeletonlabs/skeleton';
	import { debounce } from 'lodash';

	export let changeTab: (index: number) => void;

	// Form data
	let emailValue = '';

	// Utility variables
	let errorState = false;
	let errorDisplayMessage = '';
	let loading = false;

	// Email validation
	$: emailValid = validateEmail(emailValue);

	// Email availability
	let emailExists: boolean | undefined = undefined;
	let lockEmailStep = true;

	// Verify email
	const verifyEmail = async () => {
		if (!emailValid) {
			emailExists = undefined;
			return;
		}

		newUser.set({ ...$newUser, email: emailValue });
		errorState = false;

		try {
			const response = await fetch('api/users/verify-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: emailValue })
			});

			const { error, errorMessage, exists, valid } = await response.json();

			errorState = error;
			errorDisplayMessage = errorMessage;
			emailValid = valid;
			emailExists = exists;
			lockEmailStep = errorState || !emailValid;
		} catch (error: any) {
			errorState = true;
			errorDisplayMessage = error.message;
		} finally {
			loading = false;
		}
	};

	const debouncedVerifyEmail = debounce(verifyEmail, 500);
</script>

<Step locked={lockEmailStep} buttonNextLabel="Select your username" buttonBack="invisible">
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Select your email
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div class="px-6 py-8 mx-auto lg:py-0">
			<div class="flex flex-col flex-wrap content-center p-6 space-y-4 md:space-y-6 sm:p-8">
				<form class="space-y-4 md:space-y-6 group w-full lg:w-3/5" novalidate>
					<label class="label">
						<span>Email</span>
						<input
							class="input"
							title="inputEmail"
							type="email"
							placeholder="max@mustermann.de"
							autocomplete="email"
							bind:value={emailValue}
							on:input={async () => {
								lockEmailStep = true;
								loading = true;
								debouncedVerifyEmail();
							}}
						/>
					</label>
					<ol class="list">
						<li>
							{#if emailValid}
								<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
								<span class="flex-auto">Email is valid</span>
							{:else}
								<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
								<span class="flex-auto">Please provide a valid email</span>
							{/if}
						</li>
						<li>
							{#if emailValid && loading}
								<ProgressRadial
									class="w-4 h-4"
									stroke={100}
									meter="stroke-warning-500"
									track="stroke-warning-500/30"
								/>
								<span class="flex-auto">Checking availability...</span>
							{:else if errorState}
								<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
								<span class="flex-auto">{errorDisplayMessage}</span>
							{:else if loading || emailExists === undefined}
								<span class="badge-icon variant-filled-warning w-4 h-4"><QuestionMarkIcon /></span>
								<span class="flex-auto">Please provide a valid email to check availability</span>
							{:else}
								<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
								<span class="flex-auto">Email is not in use</span>
							{/if}
						</li>
					</ol>
				</form>
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Already have an account? <button
						on:click={() => {
							changeTab(1);
						}}
						class="variant-soft-primary">Sign in</button
					>
				</p>
			</div>
		</div>
	</section>
</Step>
