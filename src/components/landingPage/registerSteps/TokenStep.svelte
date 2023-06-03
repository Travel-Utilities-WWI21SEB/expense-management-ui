<script lang="ts">
	import {
		ClosedEnvelopeIcon,
		CrossIcon,
		ErrorIcon,
		InfoIcon,
		OpenEnvelopeIcon,
		QuestionMarkIcon
	} from '$icons';
	import { errorMessage, errorState, loading, newUser } from '$stores';
	import { ProgressRadial, Step } from '@skeletonlabs/skeleton';
	import { debounce } from 'lodash';

	export let register: () => Promise<void>;

	// Timer
	let resendTokenInterval = 25;
	let resendTokenTimer: number = 0;
	$: remainingTime = resendTokenTimer > 0 ? `in ${resendTokenTimer} seconds` : '';

	// Decrease timer if it's greater than 0
	$: if (resendTokenTimer > 0) {
		setTimeout(() => {
			resendTokenTimer--;
		}, 1000);
	}

	// Form data;
	let firstToken = '',
		secondToken = '',
		thirdToken = '',
		fourthToken = '',
		fifthToken = '',
		sixthToken = '';
	// not the best way to do this, but i don't know how to do it better
	$: tokenValue = `${firstToken}${secondToken}${thirdToken}${fourthToken}${fifthToken}${sixthToken}`;

	// Utility variables
	let correctToken: boolean | undefined = undefined;
	let tokenErrorState = false;

	// Register
	const debouncedRegister = debounce(register, 500);

	// Verify token
	const verifyToken = async () => {
		loading.set(true);
		correctToken = undefined;
		errorState.set(false);

		try {
			const response = await fetch(`api/user/activate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token: tokenValue })
			});

			const { tokenCorrect, error, errorMessage: message } = await response.json();

			correctToken = tokenCorrect;
			errorState.set(error);
			errorMessage.set(message);
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
		} finally {
			loading.set(false);
		}
	};

	const debouncedVerifyToken = debounce(verifyToken, 500);

	// Resend token
	const resendToken = async () => {
		loading.set(true);
		correctToken = undefined;
		errorState.set(false);
		tokenErrorState = false;

		resendTokenTimer = resendTokenInterval;

		try {
			const response = await fetch(`api/user/resend-token`, {
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

	// Handle token input
	const handleTokenInput = (e: Event & { currentTarget: HTMLInputElement }): void => {
		const target = e.currentTarget as HTMLInputElement;
		const { value } = target;

		if (value.length === 1) {
			const nextInput = target.nextElementSibling as HTMLInputElement;

			if (nextInput) {
				nextInput.focus();
			} else {
				debouncedVerifyToken();
			}
		}
	};
</script>

<Step
	buttonBack="invisible pointer-events-none"
	buttonComplete="invisible pointer-events-none"
	regionContent="flex flex-wrap flex-col grow"
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
	<section class="bg-gray-50 dark:bg-gray-900">
		<div class="px-6 py-8 mx-auto lg:py-0">
			<div
				class="flex flex-col flex-wrap content-center items-center p-6 space-y-4 md:space-y-6 sm:p-8"
			>
				{#if $loading}
					<ProgressRadial
						class="w-1/2 h-1/2"
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
					<form class="space-y-4 md:space-y-6 group w-full lg:w-3/5" novalidate>
						<div class="flex justify-center">
							<label class="label">
								<input
									class="input h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 text-center rounded form-control"
									title="token1"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
									on:input={handleTokenInput}
									bind:value={firstToken}
								/>
								<input
									class="input h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 text-center rounded"
									title="token2"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
									on:input={handleTokenInput}
									bind:value={secondToken}
								/>
								<input
									class="input h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 text-center rounded"
									title="token3"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
									on:input={handleTokenInput}
									bind:value={thirdToken}
								/>
								<input
									class="input h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 text-center rounded"
									title="token4"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
									on:input={handleTokenInput}
									bind:value={fourthToken}
								/>
								<input
									class="input h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 text-center rounded"
									title="token5"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
									on:input={handleTokenInput}
									bind:value={fifthToken}
								/>
								<input
									class="input h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 text-center rounded"
									title="token6"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
									on:input={handleTokenInput}
									bind:value={sixthToken}
								/>
							</label>
						</div>
						<ol class="list">
							<li>
								{#if correctToken}
									<span class="badge-icon variant-filled-success w-4 h-4"
										><ProgressRadial
											class="w-4 h-4"
											stroke={100}
											meter="stroke-success-500"
											track="stroke-success-500/30"
										/></span
									>
									<span class="flex-auto">Redirecting...</span>
								{:else if firstToken && secondToken && thirdToken && fourthToken && fifthToken && sixthToken}
									{#if tokenErrorState}
										<span class="badge-icon variant-filled-success w-4 h-4"><ErrorIcon /></span>
										<span class="flex-auto">{$errorMessage}</span>
									{:else}
										<span class="badge-icon variant-filled-warning w-4 h-4"><CrossIcon /></span>
										<span class="flex-auto">Token is incorrect!</span>
									{/if}
								{:else}
									<span class="badge-icon variant-filled-warning w-4 h-4"><QuestionMarkIcon /></span
									>
									<span class="flex-auto">Enter the code to start validation</span>
								{/if}
							</li>
							<li>
								<span class="badge-icon variant-filled-tertiary w-4 h-4"><InfoIcon /></span>
								<span class="flex-auto">Didn't receive a code?</span>
							</li>
						</ol>
					</form>
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
			</div>
		</div>
	</section>
</Step>
