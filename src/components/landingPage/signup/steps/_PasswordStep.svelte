<script lang="ts">
	import { PasswordForm } from '$components';
	import { password, passwordValid, passwordsMatch } from '$stores';
	import { i } from '@inlang/sdk-js';
	import { Step } from '@skeletonlabs/skeleton';

	// Lock step
	$: lockRegisterStep = !$passwordValid || !$passwordsMatch;

	const onInputHandler = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const { value } = e.currentTarget;
		password.set(value);
	};
</script>

<Step
	locked={lockRegisterStep}
	buttonNextLabel={i('forms.steps.password.nextStep')}
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockRegisterStep
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			{i('forms.steps.password.title')}
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>

	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<PasswordForm {onInputHandler} />
		</div>
	</section>
</Step>
