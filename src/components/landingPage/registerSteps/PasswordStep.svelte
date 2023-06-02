<script lang="ts">
	import { CheckIcon, CrossIcon } from '$icons';
	import { newUser } from '$stores';
	import { validatePassword, validatePasswordsMatch } from '$utils';
	import { Step } from '@skeletonlabs/skeleton';

	// Form data
	let passwordValue = '';
	let passwordConfirm = '';

	// Form validation
	$: passwordValid = validatePassword(passwordValue);
	$: passwordsMatch = validatePasswordsMatch(passwordValue, passwordConfirm);

	// Lock step
	$: lockRegisterStep = !passwordValid || !passwordsMatch;
</script>

<Step locked={lockRegisterStep} buttonNextLabel="Register →">
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Set password
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div class="px-6 py-8 mx-auto lg:py-0">
			<div class="flex flex-col flex-wrap content-center p-6 space-y-4 md:space-y-6 sm:p-8">
				<form class="space-y-4 md:space-y-6 group w-full lg:w-3/5" novalidate>
					<label class="label">
						<span>Password</span>
						<input
							class="input"
							title="password"
							type="password"
							placeholder="********"
							autocomplete="new-password"
							bind:value={passwordValue}
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
							on:input={() => newUser.set({ ...$newUser, password: passwordValue })}
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
