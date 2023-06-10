<script lang="ts">
	import { CheckIcon } from '$icons';
	import {
		correctToken,
		errorMessage,
		errorState,
		loading,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { Step } from '@skeletonlabs/skeleton';
	import AlertWithAction from '../../general/_AlertWithAction.svelte';
	import ProgressCircleAnimated from '../../general/_ProgressCircleAnimated.svelte';
	import TokenForm from '../../general/forms/_TokenForm.svelte';

	export let forgotPasswordHandler: () => void;
	export let email: string;

	// Lock step
	$: lockTokenStep = !validToken || !$correctToken;

	// Token utility variables
	$: validToken = !$tokenValues.some((value) => value === '');

	const verifyPasswordToken = async () => {
		if ($correctToken || !validToken) {
			return;
		}

		loading.set(true);
		correctToken.set(undefined);
		tokenErrorState.set(false);

		const response = await fetch(`api/users/verify-reset-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email, token: $tokenValues.join('') })
		});

		const { valid, error, errorMessage: errorDisplayMessage } = await response.json();

		correctToken.set(valid);
		tokenErrorState.set(error);
		errorMessage.set(errorDisplayMessage);
		loading.set(false);
	};
</script>

<Step
	buttonNextLabel="Enter new password"
	locked={lockTokenStep}
	buttonBack="invisible"
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockTokenStep
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
			{#if $loading}
				<ProgressCircleAnimated />
			{:else if $errorState}
				<AlertWithAction errorAction={forgotPasswordHandler} actionText="Try again!" />
			{:else}
				<TokenForm keyboardHandler={verifyPasswordToken} resendToken={forgotPasswordHandler}>
					<span
						slot="correctTokenIcon"
						class="badge-icon variant-filled-success w-4 h-4 justify-center"
					>
						<CheckIcon />
					</span>
					<span slot="correctTokenText" class="flex-auto">Token is correct!</span>
				</TokenForm>
			{/if}
		</div>
	</section>
</Step>
