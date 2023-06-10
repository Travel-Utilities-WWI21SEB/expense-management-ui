<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		ClosedEnvelopeIcon,
		CrossIcon,
		ErrorIcon,
		InfoIcon,
		OpenEnvelopeIcon,
		QuestionMarkIcon
	} from '$icons';
	import { errorMessage, errorState, loading, newUser } from '$stores';
	import { ProgressRadial, Step, modalStore } from '@skeletonlabs/skeleton';
	import { debounce } from 'lodash';
	import { tick } from 'svelte/internal';

	export let register: () => Promise<void>;

	// Timer
	let resendTokenInterval = 25;
	let resendTokenTimer = 0;
	$: remainingTime = resendTokenTimer > 0 ? `in ${resendTokenTimer} seconds` : '';

	// Decrease timer if it's greater than 0
	$: if (resendTokenTimer > 0) {
		setTimeout(() => {
			resendTokenTimer--;
		}, 1000);
	}

	// Token validation
	let tokenValues: string[] = ['', '', '', '', '', ''];
	$: validToken = !tokenValues.some((value) => value === '');

	// Utility variables
	let correctToken: boolean | undefined = undefined;
	let tokenErrorState = false;

	// Register
	const debouncedRegister = debounce(register, 500);

	// Verify token
	const verifyToken = async () => {
		if (correctToken || !validToken) {
			return;
		}

		loading.set(true);
		correctToken = undefined;
		errorState.set(false);

		try {
			const response = await fetch(`api/users/activate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token: tokenValues.join('') })
			});

			const { tokenCorrect, error, errorMessage: message } = await response.json();

			correctToken = tokenCorrect;
			errorState.set(error);
			errorMessage.set(message);

			if (tokenCorrect) {
				modalStore.close();
				goto('/home');
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
		correctToken = undefined;
		errorState.set(false);
		tokenErrorState = false;

		resendTokenTimer = resendTokenInterval;

		try {
			const response = await fetch(`api/users/resend-token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: $newUser.email })
			});

			const { error, errorMessage: message } = await response.json();

			tokenErrorState = error;
			errorMessage.set(message);
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	};

	// Handle keydown event
	const keydownHandler = async (e: KeyboardEvent): Promise<void> => {
		// If the key is trying to paste something in the first input
		// we get the clipboard data and spread it into the inputs
		const target = e.target as HTMLInputElement;

		if (target.title === 'token1' && e.code === 'KeyV' && (e.ctrlKey || e.metaKey)) {
			// Little hack to get the clipboard data and spread it :)
			const clipboardData = (e as unknown as ClipboardEvent).clipboardData?.getData('text/plain');
			pasteClipboardData(clipboardData);
			return;
		}

		let previousInput: HTMLInputElement;

		switch (e.code) {
			case 'Backspace': {
				previousInput = target.previousElementSibling as HTMLInputElement;

				// If there's a value in the current target
				// we delete it, otherwise we focus the previous input
				if (previousInput && target.selectionStart === 0) {
					previousInput.focus();
				} else {
					const index = Array.from(target.parentElement?.children || []).indexOf(target);
					tokenValues[index] = '';
				}

				e.preventDefault();
				break;
			}
			case 'ArrowLeft': {
				previousInput = target.previousElementSibling as HTMLInputElement;

				if (previousInput && target.selectionStart === 0) {
					previousInput.focus();
				} else {
					target.selectionStart = target.selectionEnd = 0;
				}

				break;
			}
			case 'ArrowRight': {
				const nextInput = target.nextElementSibling as HTMLInputElement;

				if (nextInput && target.selectionStart === target.value.length) {
					nextInput.focus();
				} else {
					target.selectionStart = target.selectionEnd = target.value.length;
				}

				break;
			}
			default: {
				// Check if input is number or letter
				// Write the value and focus the next input
				const validInput = ['Digit', 'Key', 'Numpad'];

				if (validInput.some((input) => e.code.startsWith(input))) {
					// Yet another hack to trigger svelte array reactivity
					// but reduces loc by creating form inputs in a loop
					const index = Array.from(target.parentElement?.children || []).indexOf(target);
					tokenValues[index] = e.key;

					const nextInput = target.nextElementSibling as HTMLInputElement;

					if (nextInput) {
						nextInput.focus();
						e.preventDefault();
					} else {
						// If there's no next input, we verify the token
						// since we're in the last input
						await tick();
						verifyToken();
					}
				}
			}
		}
	};

	// Handle paste event
	const pasteHandler = (e: ClipboardEvent): void => {
		e.preventDefault();

		const clipboardData = e.clipboardData?.getData('text/plain');

		pasteClipboardData(clipboardData);
	};

	const pasteClipboardData = async (clipboardData?: string): Promise<void> => {
		if (!clipboardData) return;

		// We only want to paste 6 characters
		// If its more than 6, we slice it
		// If its less than 6, we don't do anything
		if (clipboardData.length > 6) {
			clipboardData = clipboardData.slice(0, 6);
		} else if (clipboardData.length < 6) {
			return;
		}

		const inputs = document.querySelectorAll('input[type="text"]');

		// We spread the clipboard data into the array to
		// trigger svelte reactivity
		tokenValues = clipboardData.split('');

		// Focus the last input
		const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
		lastInput.focus();

		await tick();
		verifyToken();
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
				<ProgressRadial
					class="w-1/2 h-1/2 mx-auto"
					stroke={100}
					meter="stroke-primary-500"
					track="stroke-primary-500/30"
				/>
			{:else if $errorState}
				<aside class="alert variant-filled-error w-full">
					<!-- Icon -->
					<div>
						<span class="badge-icon variant-ghost-error w-15 h-15"><ErrorIcon /></span>
					</div>
					<!-- Message -->
					<div class="alert-message">
						<h3 class="h3">Something went wrong!</h3>
						<p>{$errorMessage}</p>
					</div>
					<!-- Actions -->
					<div class="alert-actions">
						<button
							class="btn variant-filled {$loading ? 'pointer-events-none opacity-50' : ''}"
							on:click={debouncedRegister}>Try again</button
						>
					</div>
				</aside>
			{:else}
				<h5 class="h5 text-center">Please enter the code we sent to your email!</h5>
				<form
					class="grid grid-flow-col grid-cols-6 lg:gap-x-4"
					novalidate
					on:keydown={keydownHandler}
					on:paste={pasteHandler}
				>
					{#each tokenValues as _, index}
						<input
							class="input text-center variant-form-material"
							title="token{index + 1}"
							maxlength="1"
							type="text"
							placeholder=""
							autocomplete="off"
							bind:value={tokenValues[index]}
						/>
					{/each}
				</form>
				<ol class="list flex flex-col">
					<li>
						{#if correctToken}
							<span class="badge-icon variant-filled-success w-4 h-4 justify-center"
								><ProgressRadial
									class="w-4 h-4"
									stroke={100}
									meter="stroke-success-500"
									track="stroke-success-500/30"
								/></span
							>
							<span class="flex-auto">Redirecting...</span>
						{:else if validToken}
							{#if tokenErrorState}
								<span class="badge-icon variant-filled-success w-4 h-4"><ErrorIcon /></span>
								<span class="flex-auto">{$errorMessage}</span>
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
						on:click={resendToken}
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
