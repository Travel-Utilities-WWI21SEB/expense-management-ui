<script lang="ts">
	import { errorState, loading, password, passwordValid, passwordsMatch } from '$stores';
	import { Step } from '@skeletonlabs/skeleton';
	import { AlertWithAction, ProgressCircleAnimated, PasswordForm } from '$components';

	export let closeForgotPassword: () => void;

	$: lockCompletion = !$passwordValid || !$passwordsMatch;

	const onInputHandler = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const { value } = e.currentTarget;
		password.set(value);
	};
</script>

<Step
	locked={lockCompletion}
	buttonCompleteLabel="Reset password"
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockCompletion
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Set new password
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
					alertHeading="Something went wrong!"
					actionText="Abort!"
					class="variant-filled-error"
				/>
			{:else}
				<PasswordForm {onInputHandler} />
			{/if}
		</div>
	</section>
</Step>
