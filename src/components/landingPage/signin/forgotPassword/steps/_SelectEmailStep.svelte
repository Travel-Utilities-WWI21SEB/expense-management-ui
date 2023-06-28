<script lang="ts">
	import { CheckIcon, CrossIcon } from '$icons';
	import { email, emailValid } from '$stores';
	import { validateEmail } from '$utils';
	import { Step } from '@skeletonlabs/skeleton';

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
	buttonNextLabel="Receive reset code"
	buttonBack="invisible"
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {!emailValid
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			What is your email?
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
						<span class="badge-icon variant-filled-success w-4 h-4"><CheckIcon /></span>
						<span class="flex-auto">Email is valid</span>
					{:else}
						<span class="badge-icon variant-filled-error w-4 h-4"><CrossIcon /></span>
						<span class="flex-auto">Please provide a valid email</span>
					{/if}
				</li>
			</ol>
		</div>
	</section>
</Step>
