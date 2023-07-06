<script lang="ts">
	import { email, emailValid } from '$stores';
	import { validateEmail } from '$utils';
	import { i } from '@inlang/sdk-js';
	import { Step } from '@skeletonlabs/skeleton';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	$: emailValid.set(validateEmail($email));

	// Keyboard handler
	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if ($emailValid) {
				// Click next button
				const nextButton = document.querySelector('.btn.variant-filled-primary');
				if (nextButton) {
					(nextButton as HTMLButtonElement).click();
				}
			}
		}
	};
</script>

<Step
	locked={!$emailValid}
	buttonNextLabel={i('forms.signin.forgotPassword.steps.email.nextStep')}
	buttonBack="invisible"
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {!emailValid
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			{i('forms.signin.forgotPassword.steps.email.title')}
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form novalidate on:keydown={keydownHandler}>
				<label class="label">
					<span>Email</span>
					<input
						class="input"
						title="inputEmail"
						type="email"
						placeholder="max@mustermann.de"
						autocomplete="email"
						bind:value={$email}
						on:input={(e) => email.set(e.currentTarget.value.trim())}
					/>
				</label>
			</form>
			<ol class="list">
				<li>
					{#if $emailValid}
						<span class="badge-icon variant-filled-success w-4 h-4">
							<Icon src={Check} class="w-6 h-6" />
						</span>
						<span class="flex-auto">{i('forms.signin.forgotPassword.steps.email.validEmail')}</span>
					{:else}
						<span class="badge-icon variant-filled-error w-4 h-4"
							><Icon src={XMark} class="w-6 h-6" /></span
						>
						<span class="flex-auto"
							>{i('forms.signin.forgotPassword.steps.email.invalidEmail')}</span
						>
					{/if}
				</li>
			</ol>
		</div>
	</section>
</Step>
