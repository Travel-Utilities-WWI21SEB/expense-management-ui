<script lang="ts">
	import { goto } from '$app/navigation';
	import { CrossIcon } from '$icons';
	import type { LoginRequest } from '$userDomain';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let changeTab: (index: number) => void;

	// Form data
	let email = '';
	let password = '';

	// Utility variables
	let loading = false;
	let errorState = false;
	let errorDisplayMessage = '';

	const login = async () => {
		loading = true;
		errorState = false;

		const loginRequest: LoginRequest = { email, password };

		const response = await fetch('api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginRequest)
		});

		loading = false;
		const { success, error, errorMessage } = await response.json();

		if (error) {
			errorState = true;
			errorDisplayMessage = errorMessage;
			return;
		} else if (success) {
			goto('/home');
		}
	};
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full">
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
			<h1
				class="h1 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-center"
			>
				Sign in to your account
			</h1>
			<hr class="w-16 h-1 bg-primary-500 rounded-full" />
			<form class="space-y-4 md:space-y-6 group" action="#" novalidate>
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						title="email"
						type="email"
						placeholder="max@mustermann.de"
						autocomplete="email"
						bind:value={email}
					/>
				</label>
				<label class="label">
					<span>Password</span>
					<input
						class="input"
						title="password"
						type="password"
						placeholder="********"
						autocomplete="current-password"
						bind:value={password}
					/>
				</label>

				<div class="flex items-center justify-between">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="remember"
								aria-describedby="remember"
								type="checkbox"
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-500 dark:ring-offset-primary-500"
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
						</div>
					</div>
					<a
						href="#"
						class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"
						>Forgot password?</a
					>
				</div>
				<ol class="list">
					<li>
						{#if errorState}
							<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
							<span class="flex-auto">{errorDisplayMessage}</span>
						{/if}
					</li>
				</ol>
				<button
					type="submit"
					class="w-full btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark group-invalid:pointer-events-none group-invalid:opacity-50"
					on:click={login}
				>
					{#if !loading}
						Sign in
					{:else}
						<ProgressRadial width="w-6" />
					{/if}
				</button>
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Don't have an account yet? <button
						on:click={() => {
							changeTab(0);
						}}
						class="font-medium text-primary-600 hover:underline dark:text-primary-500"
						>Sign up</button
					>
				</p>
			</form>
		</div>
	</div>
</section>
