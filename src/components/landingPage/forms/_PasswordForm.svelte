<script lang="ts">
	import { passwordValid, passwordsMatch } from '$stores';
	import { validatePassword, validatePasswordsMatch } from '$utils';
	import { i } from '@inlang/sdk-js';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let onInputHandler: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;

	let passwordValue = '';
	let passwordConfirm = '';

	$: passwordValid.set(validatePassword(passwordValue));
	$: passwordsMatch.set(validatePasswordsMatch(passwordValue, passwordConfirm));

	// Keyboard handler
	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if ($passwordValid && $passwordsMatch) {
				// Click next button
				const nextButton = document.querySelector('.btn.variant-filled-primary');
				if (nextButton) {
					(nextButton as HTMLButtonElement).click();
				}
			}
		}
	};
</script>

<form class="space-y-4 md:space-y-6" novalidate on:keydown={keydownHandler}>
	<label class="label mb-2">
		<span>{i('forms.signup.steps.password.word')}</span>
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
		<span>{i('forms.signup.steps.password.repeatWord')}</span>
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
			<span class="badge-icon variant-filled-success w-4 h-4">
				<Icon src={Check} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('forms.signup.steps.password.validPassword')}</span>
		{:else}
			<span class="badge-icon variant-filled-error w-4 h-4">
				<Icon src={XMark} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('forms.signup.steps.password.invalidPassword')}</span>
		{/if}
	</li>
	<li>
		{#if $passwordsMatch}
			<span class="badge-icon variant-filled-success w-4 h-4">
				<Icon src={Check} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('forms.signup.steps.password.passwordsMatch')}</span>
		{:else}
			<span class="badge-icon variant-filled-error w-4 h-4">
				<Icon src={XMark} class="w-6 h-6" />
			</span>
			<span class="flex-auto">{i('forms.signup.steps.password.passwordsDontMatch')}</span>
		{/if}
	</li>
</ol>
