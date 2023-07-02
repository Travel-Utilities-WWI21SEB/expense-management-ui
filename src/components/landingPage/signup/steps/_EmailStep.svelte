<script lang="ts">
	import { CheckIcon, CrossIcon, QuestionMarkIcon } from '$icons';
	import { email, errorMessage, errorState, loading } from '$stores';
	import { validateEmail } from '$utils';
	import { i } from '@inlang/sdk-js';
	import { ProgressRadial, Step } from '@skeletonlabs/skeleton';
	import _ from 'lodash';

	export let changeTab: (index: number) => void;

	// Email validation
	$: emailValid = validateEmail($email);

	// Email availability
	let emailExists: boolean | undefined = undefined;
	let lockEmailStep = true;

	// Verify email
	const verifyEmail = async () => {
		if (!emailValid) {
			emailExists = undefined;
			return;
		}

		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch('/api/users/verify-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: $email })
			});

			const body = await response.json();
			const { error, errorMessage: errorDisplayMessage, exists, valid } = body;

			errorState.set(error);
			errorMessage.set(errorDisplayMessage);
			emailValid = valid;
			emailExists = exists;
			lockEmailStep = $errorState || !emailValid;
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	};

	const debouncedVerifyEmail = _.debounce(verifyEmail, 500);

	// Keyboard handler
	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (emailValid && !lockEmailStep) {
				// Click next button
				const nextButton = document.querySelector('.btn.variant-filled-primary');
				if (nextButton) {
					(nextButton as HTMLButtonElement).click();
				}
			}
		}
	};
</script>

<Step
	locked={lockEmailStep}
	buttonNextLabel={i('forms.signup.steps.email.nextStep')}
	buttonBack="invisible"
	buttonNext="variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockEmailStep
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			{i('forms.signup.steps.email.title')}
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form novalidate on:keydown={keydownHandler}>
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						title="inputEmail"
						type="email"
						placeholder="max@mustermann.de"
						autocomplete="email"
						bind:value={$email}
						on:input={async (e) => {
							lockEmailStep = true;
							loading.set(true);
							email.set(e.currentTarget.value.trim());
							debouncedVerifyEmail();
						}}
					/>
				</label>
			</form>
			<ol class="list">
				<li>
					{#if emailValid}
						<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
						<span class="flex-auto">{i('forms.signup.steps.email.validEmail')}</span>
					{:else}
						<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
						<span class="flex-auto">{i('forms.signup.steps.email.invalidEmail')}</span>
					{/if}
				</li>
				<li>
					{#if emailValid && $loading}
						<ProgressRadial
							class="w-4 h-4"
							stroke={100}
							meter="stroke-warning-500"
							track="stroke-warning-500/30"
						/>
						<span class="flex-auto">{i('forms.signup.steps.email.ongoingValidation')}</span>
					{:else if $errorState}
						<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
						<span class="flex-auto">{$errorMessage}</span>
					{:else if $loading || emailExists === undefined}
						<span class="badge-icon variant-filled-warning w-4 h-4"><QuestionMarkIcon /></span>
						<span class="flex-auto">{i('forms.signup.steps.email.initialValidation')}</span>
					{:else}
						<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
						<span class="flex-auto">{i('forms.signup.steps.email.available')}</span>
					{/if}
				</li>
			</ol>
			<p class="text-sm font-light text-gray-500 dark:text-gray-400">
				{i('forms.signup.alreadyRegistered')}
				<button
					on:click={() => {
						changeTab(1);
					}}
					class="variant-soft-primary">{i('forms.signup.alreadyRegisteredAction')}</button
				>
			</p>
		</div>
	</section>
</Step>
