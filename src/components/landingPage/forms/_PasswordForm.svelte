<script lang="ts">
	import { CheckIcon, CrossIcon } from '$icons';
	import { passwordValid, passwordsMatch } from '$stores';
	import { validatePassword, validatePasswordsMatch } from '$utils';

	export let onInputHandler: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;

	let passwordValue = '';
	let passwordConfirm = '';

	$: passwordValid.set(validatePassword(passwordValue));
	$: passwordsMatch.set(validatePasswordsMatch(passwordValue, passwordConfirm));
</script>

<form class="space-y-4 md:space-y-6" novalidate>
	<label class="label mb-2">
		<span>Password</span>
		<input
			class="input"
			title="password"
			type="password"
			placeholder="********"
			autocomplete="new-password"
			bind:value={passwordValue}
			on:input={onInputHandler}
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
</form>
<ol class="list">
	<li>
		{#if $passwordValid}
			<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
			<span class="flex-auto">Minimum length fulfilled</span>
		{:else}
			<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
			<span class="flex-auto">Password must be at least 8 characters long</span>
		{/if}
	</li>
	<li>
		{#if $passwordsMatch}
			<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
			<span class="flex-auto">Passwords match</span>
		{:else}
			<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
			<span class="flex-auto">Passwords don't match</span>
		{/if}
	</li>
</ol>
