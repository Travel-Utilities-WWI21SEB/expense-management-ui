<script lang="ts">
	import { CheckIcon, CrossIcon, QuestionMarkIcon } from '$icons';
	import { newUser } from '$stores';
	import { validateUsername } from '$utils';
	import { ProgressRadial, Step } from '@skeletonlabs/skeleton';
	import { debounce } from 'lodash';

	// Form data
	let usernameValue = '';

	// Utility variables
	let errorState = false;
	let errorDisplayMessage = '';
	let loading = false;

	// Email validation
	$: usernameValid = validateUsername(usernameValue);

	// Email availability
	let usernameExists: boolean | undefined = undefined;
	let lockUserStep = true;

	// Verify username
	const verifyUsername = async () => {
		if (!usernameValid) {
			usernameExists = undefined;
			return;
		}

		newUser.set({ ...$newUser, username: usernameValue });
		loading = true;
		errorState = false;

		const response = await fetch('api/users/verify-username', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: usernameValue })
		});

		const { error, errorMessage, exists, valid } = await response.json();
		loading = false;

		errorState = error;
		errorDisplayMessage = errorMessage;
		usernameValid = valid;
		usernameExists = exists;
		lockUserStep = errorState || !usernameValid;
	};

	const debouncedVerifyUsername = debounce(verifyUsername, 500);
</script>

<Step locked={lockUserStep} buttonNextLabel="Select your password">
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Select your username
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div class="px-6 py-8 mx-auto lg:py-0">
			<div class="flex flex-col flex-wrap content-center p-6 space-y-4 md:space-y-6 sm:p-8">
				<form class="space-y-4 md:space-y-6 group w-full lg:w-3/5" novalidate>
					<label class="label">
						<span>Username</span>
						<input
							class="input"
							title="inputUsername"
							type="text"
							placeholder="mustermann1997"
							autocomplete="username"
							bind:value={usernameValue}
							on:input={() => {
								lockUserStep = true;
								loading = true;
								debouncedVerifyUsername();
							}}
						/>
					</label>
					<ol class="list">
						<li>
							{#if usernameValid}
								<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
								<span class="flex-auto">Username is valid</span>
							{:else}
								<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
								<span class="flex-auto">Username must be between 4 and 15 characters</span>
							{/if}
						</li>
						<li>
							{#if usernameValid && loading}
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
							{:else if loading || usernameExists === undefined}
								<span class="badge-icon variant-filled-warning w-4 h-4"><QuestionMarkIcon /></span>
								<span class="flex-auto">Please provide a valid username to check availability</span>
							{:else}
								<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
								<span class="flex-auto">Username is not in use</span>
							{/if}
						</li>
					</ol>
				</form>
			</div>
		</div>
	</section>
</Step>
