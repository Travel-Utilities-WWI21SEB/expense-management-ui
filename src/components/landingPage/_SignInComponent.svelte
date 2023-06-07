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

	// Login
	const login = async () => {
		loading = true;
		errorState = false;

		const loginRequest: LoginRequest = { email, password };

		const response = await fetch('api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginRequest)
		});

		loading = false;
		const { success, error, errorMessage } = await response.json();

		errorState = error;
		errorDisplayMessage = errorMessage;

		if (success) {
			goto('/home');
		}
	};
</script>

<section class="p-3 m-3 h-full">
	<!-- This is to adjust the stepper difference in size -->
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		<h1
			class="h1 text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white text-center"
		>
			Sign in to your account
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full" />
		<form class="space-y-4 md:space-y-6" novalidate>
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
		</form>
		<div class="flex items-center justify-between">
			<label class="flex items-center space-x-2">
				<input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 checkbox" />
				<p>Remember me</p>
			</label>
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
		<p class="text-sm font-light text-gray-500 dark:text-gray-400">
			Don't have an account yet? <button
				on:click={() => {
					changeTab(0);
				}}
				class="variant-soft-primary">Sign up</button
			>
		</p>
		<div class="flex flex-row justify-end">
			<button
				type="submit"
				class="btn variant-filled-primary hover:variant-soft-primary active: dark:hover:variant-soft-primary-dark"
				on:click={login}
			>
				{#if !loading}
					Sign in
				{:else}
					<ProgressRadial width="w-6" />
				{/if}
			</button>
		</div>
	</div>
</section>
