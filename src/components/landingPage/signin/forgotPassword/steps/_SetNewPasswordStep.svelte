<script lang="ts">
	import { AlertWithAction, PasswordForm, ProgressCircleAnimated } from '$components';
	import { errorState, loading, password, passwordValid, passwordsMatch } from '$stores';
	import { i } from '@inlang/sdk-js';
	import { Step } from '@skeletonlabs/skeleton';

	export let closeForgotPassword: () => void;

	$: lockCompletion = !$passwordValid || !$passwordsMatch;

	const onInputHandler = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const { value } = e.currentTarget;
		password.set(value);
	};
</script>

<Step
	locked={lockCompletion}
	buttonCompleteLabel={i('forms.signin.forgotPassword.steps.password.nextStep')}
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockCompletion
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			{i('forms.signin.forgotPassword.steps.password.title')}
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
			{#if $loading}
				<ProgressCircleAnimated />
			{:else if $errorState}
				<AlertWithAction
					enableAction={true}
					errorAction={closeForgotPassword}
					alertHeading={i('forms.signin.forgotPassword.steps.password.alertHeading')}
					actionText={i('forms.signin.forgotPassword.steps.password.alertMessage')}
					class="variant-filled-error"
				/>
			{:else}
				<PasswordForm {onInputHandler} />
			{/if}
		</div>
	</section>
</Step>
