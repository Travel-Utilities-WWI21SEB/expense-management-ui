<script lang="ts">
	import { CrossIcon } from '$icons';
	import { newUser } from '$stores';
	import { ProgressRadial, Step } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	// Form data;
	let firstToken = '',
		secondToken = '',
		thirdToken = '',
		fourthToken = '',
		fifthToken = '',
		sixthToken = '';
	// not the best way to do this, but i don't know how to do it better
	$: tokenValue = `${firstToken}${secondToken}${thirdToken}${fourthToken}${fifthToken}${sixthToken}`;

	// Form validation
	$: tokenValid = tokenValue.length === 6;

	// Utility variables
	let errorState = false;
	let errorDisplayMessage = '';
	let loading = true;

	// Lock completion step
	let lockTokenStep = true;

	// Register on mount
	onMount(async () => {
		await register();
	});

	// Register
	const register = async () => {
		loading = true;
		const { email, username, password } = $newUser;
		console.log($newUser);

		try {
			const response = await fetch('api/user/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password, username })
			});

			if (response.status === 201) {
				return;
			}

			const { errorMessage } = await response.json();
			errorState = true;
			errorDisplayMessage = errorMessage;
		} catch (error: any) {
			errorState = true;
			errorDisplayMessage = error.message;
		} finally {
			loading = false;
		}
	};

	// Verify token
	const verifyToken = async () => {};

	// Handle token input
	const handleTokenInput = (e: Event & { currentTarget: HTMLInputElement }): void => {
		const target = e.currentTarget as HTMLInputElement;
		const { value } = target;

		if (value.length === 1) {
			const nextInput = target.nextElementSibling as HTMLInputElement;

			if (nextInput) {
				nextInput.focus();
			}
		}
	};
</script>

<Step buttonBack="btn variant-filled pointer-events-none opacity-50" locked={lockTokenStep}>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Verify your email
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
			<div class="flex flex-col flex-wrap content-center p-6 space-y-4 md:space-y-6 sm:p-8">
				{#if loading}
					<ProgressRadial
						class="w-1/2 h-1/2"
						stroke={100}
						meter="stroke-primary-500"
						track="stroke-primary-500/30"
					/>
				{:else if errorState}
					<aside class="alert variant-filled-error w-full">
						<!-- Icon -->
						<div>
							<span class="badge-icon variant-ghost-error w-15 h-15"><CrossIcon /></span>
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
								on:click={register}>Try again</button
							>
						</div>
					</aside>
				{:else}
					<h5 class="h5 text-center">Please enter the code we sent to your email!</h5>
					<form class="space-y-4 md:space-y-6 group w-full lg:w-3/5" novalidate>
						<label class="label">
							<input
								class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded form-control"
								title="token1"
								maxlength="1"
								type="text"
								placeholder=""
								autocomplete="off"
								on:input={handleTokenInput}
							/>
							<input
								class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
								title="token2"
								maxlength="1"
								type="text"
								placeholder=""
								autocomplete="off"
								on:input={handleTokenInput}
							/>
							<input
								class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
								title="token3"
								maxlength="1"
								type="text"
								placeholder=""
								autocomplete="off"
								on:input={handleTokenInput}
							/>
							<input
								class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
								title="token4"
								maxlength="1"
								type="text"
								placeholder=""
								autocomplete="off"
								on:input={handleTokenInput}
							/>
							<input
								class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
								title="token5"
								maxlength="1"
								type="text"
								placeholder=""
								autocomplete="off"
								on:input={handleTokenInput}
							/>
							<input
								class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
								title="token6"
								maxlength="1"
								type="text"
								placeholder=""
								autocomplete="off"
							/>
						</label>
						<ol class="list">
							<li>
								{#if errorState}
									<span class="badge-icon variant-filled-success w-4 h-4"><CrossIcon /></span>
									<span class="flex-auto">False code, please enter the correct code!</span>
								{/if}
							</li>
						</ol>
						<button
							type="submit"
							class="w-full btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {tokenValid
								? ''
								: 'pointer-events-none opacity-50'}"
							on:click={() => {
								loading = true;
							}}
							on:click={register}
						>
							{#if !loading}
								Verify token
							{:else}
								<ProgressRadial width="w-6" />
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>
</Step>
