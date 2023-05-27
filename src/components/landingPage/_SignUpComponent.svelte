<script lang="ts">
	import { goto } from '$app/navigation';
	import { CheckIcon, CrossIcon, QuestionMarkIcon } from '$icons';
	import {
		validateEmail,
		validatePassword,
		validatePasswordsMatch,
		validateUsername
	} from '$utils';
	import { ProgressRadial, Step, Stepper } from '@skeletonlabs/skeleton';

	export let changeTab: (index: number) => void;

	// Form data
	let email = '';
	let username = '';
	let password = '';
	let passwordConfirm = '';

	// Form validation
	$: emailValid = validateEmail(email);
	$: usernameValid = validateUsername(username);
	$: passwordValid = validatePassword(password);
	$: passwordsMatch = validatePasswordsMatch(password, passwordConfirm);

	// Email and username availability
	let emailExists: boolean | undefined = undefined;
	let usernameExists: boolean | undefined = undefined;

	// Utility variables
	let loading = false;
	let errorState = false;
	let registerPromise: Promise<void> | undefined = undefined;

	// Locks the next step if the previous step is not completed
	let lockEmailStep = true;
	let lockUserStep = true;
	$: lockRegisterStep = !passwordValid || !passwordsMatch || loading;

	// NextHandler for Stepper
	const nextHandler = (e: CustomEvent<any>): void => {
		if (e.detail.state.current !== 3) {
			return;
		}

		registerPromise = register();
	};

	// Verify email
	const verifyEmail = async () => {
		loading = true;
		errorState = false;

		const response = await fetch('api/user/verify-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		loading = false;
		const body = await response.json();
		const { error, exists, valid } = body;

		if (error) {
			errorState = true;
			return;
		} else if (!valid) {
			emailValid = false;
			return;
		} else if (exists) {
			emailExists = true;
			return;
		}

		emailExists = false;
		lockEmailStep = false;
	};

	// Verify username
	const verifyUsername = async () => {
		loading = true;
		errorState = false;

		const response = await fetch('api/user/verify-username', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username })
		});

		loading = false;
		const body = await response.json();
		const { error, exists, valid } = body;

		if (error) {
			errorState = true;
			return;
		}

		if (!valid) {
			usernameValid = false;
			return;
		}

		if (exists) {
			usernameExists = true;
			return;
		}

		usernameExists = false;
		lockUserStep = false;
	};

	// register
	const register = async () => {
		loading = true;
		const response = await fetch('api/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, username, password })
		});

		loading = false;
		const { valid, error } = await response.json();

		if (error) {
			return;
		}

		if (!valid) {
			return;
		}
	};
</script>

<Stepper on:next={nextHandler} class="p-3 m-3" buttonComplete="invisible">
	<Step locked={lockEmailStep}>
		<svelte:fragment slot="header">
			<h1
				class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
			>
				Check email availability
			</h1>
			<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
		</svelte:fragment>
		<section class="bg-gray-50 dark:bg-gray-900">
			<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
					<form class="space-y-4 md:space-y-6 group w-full" novalidate>
						<label class="label">
							<span>Email</span>
							<input
								class="input"
								title="inputEmail"
								type="email"
								placeholder="max@mustermann.de"
								autocomplete="email"
								bind:value={email}
								on:input={() => {
									lockEmailStep = true;
									errorState = false;
									emailExists = undefined;
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
								{#if errorState}
									<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
									<span class="flex-auto">Something went wrong, please try again</span>
								{:else if emailExists === undefined}
									<span class="badge-icon variant-filled-warning w-4 h-4"><QuestionMarkIcon /></span
									>
									<span class="flex-auto">Please verify the email to check availability</span>
								{:else if emailExists}
									<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
									<span class="flex-auto">Email is already in use</span>
								{:else}
									<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
									<span class="flex-auto">Email is not in use</span>
								{/if}
							</li>
						</ol>
						<button
							type="submit"
							class="w-full btn variant-filled-primary hover:variant-soft-primary {!loading &&
							emailValid
								? ''
								: 'pointer-events-none opacity-50'}"
							on:click={verifyEmail}
						>
							{#if !loading}
								Verify availability
							{:else}
								<ProgressRadial width="w-6" />
							{/if}
						</button>
						<p class="text-sm font-light text-gray-500 dark:text-gray-400">
							Already have an account? <button
								on:click={() => changeTab(1)}
								class="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>Sign up</button
							>
						</p>
					</form>
				</div>
			</div>
		</section>
	</Step>
	<Step locked={lockUserStep}>
		<svelte:fragment slot="header">
			<h1
				class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
			>
				Check username availability
			</h1>
			<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
		</svelte:fragment>
		<section class="bg-gray-50 dark:bg-gray-900">
			<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
					<form class="space-y-4 md:space-y-6 group" action="#" novalidate>
						<label class="label">
							<span>Username</span>
							<input
								class="input"
								title="inputUsername"
								type="text"
								placeholder="mustermann1997"
								autocomplete="username"
								bind:value={username}
								on:input={() => {
									lockUserStep = true;
									errorState = false;
									usernameExists = undefined;
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
								{#if usernameExists === undefined}
									<span class="badge-icon variant-filled-warning w-4 h-4"><QuestionMarkIcon /></span
									>
									<span class="flex-auto">Please verify the username to check availability</span>
								{:else if usernameExists}
									<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
									<span class="flex-auto">Username is already in use</span>
								{:else}
									<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
									<span class="flex-auto">Username is not in use</span>
								{/if}
							</li>
						</ol>
						<button
							class="w-full btn variant-filled-primary hover:variant-soft-primary {!loading &&
							usernameValid
								? ''
								: 'pointer-events-none opacity-50'}"
							type="submit"
							on:click={verifyUsername}
						>
							{#if !loading}
								Verify availability
							{:else}
								<ProgressRadial width="w-6" />
							{/if}
						</button>
					</form>
				</div>
			</div>
		</section>
	</Step>
	<Step
		locked={lockRegisterStep}
		on:next={() => {
			register();
		}}
		buttonNextLabel="Register →"
		buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark"
	>
		<svelte:fragment slot="header">
			<h1
				class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
			>
				Set password
			</h1>
			<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
		</svelte:fragment>
		<section class="bg-gray-50 dark:bg-gray-900">
			<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
					<form class="space-y-4 md:space-y-6 group" action="#" novalidate>
						<label class="label">
							<span>Password</span>
							<input
								class="input"
								title="password"
								type="password"
								placeholder="********"
								autocomplete="new-password"
								bind:value={password}
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
					</form>
				</div>
			</div>
		</section>
	</Step>
	<Step>
		<svelte:fragment slot="header">
			<h1
				class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
			>
				Verify your email
			</h1>
			<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
		</svelte:fragment>
		<section class="bg-gray-50 dark:bg-gray-900">
			<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-wrap justify-center w-full">
					{#await registerPromise}
						<ProgressRadial
							class="w-1/2 h-1/2"
							stroke={100}
							meter="stroke-primary-500"
							track="stroke-primary-500/30"
						/>
					{:then}
						<h5 class="h5 text-center">Please enter the code we sent to your email!</h5>
						<form
							class="space-y-4 md:space-y-6 group flex flex-wrap justify-center"
							action="#"
							novalidate
						>
							<label class="label">
								<input
									class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded form-control"
									title="token1"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
								/>
								<input
									class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
									title="token2"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
								/>
								<input
									class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
									title="token3"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
								/>
								<input
									class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
									title="token4"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
								/>
								<input
									class="input h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-center rounded"
									title="token5"
									maxlength="1"
									type="text"
									placeholder=""
									autocomplete="off"
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
										<span class="flex-auto">False code, please enter </span>
									{/if}
								</li>
							</ol>
							<button
								type="submit"
								class="w-full btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {true
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
					{:catch error}
						<p>error {error}</p>
					{/await}
				</div>
			</div>
		</section>
	</Step>
	<!-- ... -->
</Stepper>
