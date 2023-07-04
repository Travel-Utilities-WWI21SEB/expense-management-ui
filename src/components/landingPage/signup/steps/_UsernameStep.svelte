<script lang="ts">
	import { errorMessage, errorState, loading, username, usernameValid } from '$stores';
	import { validateUsername } from '$utils';
	import { i } from '@inlang/sdk-js';
	import { ProgressRadial, Step } from '@skeletonlabs/skeleton';
	import { Check, QuestionMarkCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import _ from 'lodash';

	// Email validation
	$: usernameValid.set(validateUsername($username));

	// Email availability
	let usernameExists: boolean | undefined = undefined;
	let lockUserStep = true;

	// Verify username
	const verifyUsername = async () => {
		if (!$usernameValid) {
			usernameExists = undefined;
			return;
		}

		loading.set(true);
		errorState.set(false);

		const response = await fetch('/api/users/verify-username', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: $username })
		});

		const body = await response.json();
		const { error, errorMessage: errorDisplayMessage, exists, valid } = body;

		loading.set(false);
		errorState.set(error);
		errorMessage.set(errorDisplayMessage);
		usernameValid.set(valid);
		usernameExists = exists;
		lockUserStep = $errorState || !usernameValid;
	};

	const debouncedVerifyUsername = _.debounce(verifyUsername, 500);

	// Keyboard handler
	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if ($usernameValid && !lockUserStep) {
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
	locked={lockUserStep}
	buttonNextLabel={i('forms.signup.steps.username.nextStep')}
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockUserStep
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			{i('forms.signup.steps.username.title')}
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form novalidate on:keydown={keydownHandler}>
				<label class="label">
					<span>{i('forms.signup.steps.username.word')}</span>
					<input
						class="input"
						title="inputUsername"
						type="text"
						placeholder="mustermann1997"
						autocomplete="username"
						bind:value={$username}
						on:input={(e) => {
							lockUserStep = true;
							loading.set(true);
							username.set(e.currentTarget.value.trim());
							debouncedVerifyUsername();
						}}
					/>
				</label>
			</form>
			<ol class="list">
				<li>
					{#if $usernameValid}
						<span class="badge-icon variant-filled-success w-4 h-4">
							<Icon src={Check} class="w-6 h-6" />
						</span>
						<span class="flex-auto">{i('forms.signup.steps.username.validUsername')}</span>
					{:else}
						<span class="badge-icon variant-filled-error w-4 h-4">
							<Icon src={XMark} class="w-6 h-6" />
						</span>
						<span class="flex-auto">{i('forms.signup.steps.username.invalidUsername')}</span>
					{/if}
				</li>
				<li>
					{#if $usernameValid && $loading}
						<ProgressRadial
							class="w-4 h-4"
							stroke={100}
							meter="stroke-warning-500"
							track="stroke-warning-500/30"
						/>
						<span class="flex-auto">{i('forms.signup.steps.username.ongoingValidation')}</span>
					{:else if $errorState}
						<span class="badge-icon variant-filled-error w-4 h-4">
							<Icon src={XMark} class="w-6 h-6" />
						</span>
						<span class="flex-auto">{$errorMessage}</span>
					{:else if $loading || usernameExists === undefined}
						<span class="badge-icon variant-filled-warning w-4 h-4">
							<Icon src={QuestionMarkCircle} class="w-6 h-6" />
						</span>
						<span class="flex-auto">{i('forms.signup.steps.username.initialValidation')}</span>
					{:else}
						<span class="badge-icon variant-filled-success w-4 h-4">
							<Icon src={Check} class="w-6 h-6" />
						</span>
						<span class="flex-auto">{i('forms.signup.steps.username.available')}</span>
					{/if}
				</li>
			</ol>
		</div>
	</section>
</Step>
