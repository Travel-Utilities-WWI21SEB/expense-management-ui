<script lang="ts">
	import { AlertWithAction, ProgressCircleAnimated, TokenForm } from '$components';
	import {
		correctToken,
		email,
		errorMessage,
		errorState,
		loading,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { i } from '@inlang/sdk-js';
	import { Step } from '@skeletonlabs/skeleton';

	export let forgotPasswordHandler: () => void;

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

		console.log('Start verifyPasswordToken');

		const response = await fetch(`/api/users/verify-reset-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: $email, token: $tokenValues.join('') })
		});

		console.log('End verifyPasswordToken');

		const body = await response.json();
		const { valid, error, errorMessage: errorDisplayMessage } = body;

		correctToken.set(valid);
		tokenErrorState.set(error);
		errorMessage.set(errorDisplayMessage);
		loading.set(false);
	};
</script>

<Step
	buttonNextLabel={i('forms.signin.forgotPassword.steps.token.nextStep')}
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
				<AlertWithAction
					enableAction={true}
					errorAction={forgotPasswordHandler}
					alertHeading={i('forms.signin.forgotPassword.steps.token.alertHeading')}
					actionText={i('forms.signin.forgotPassword.steps.token.alertMessage')}
					class="variant-filled-error"
				/>
			{:else}
				<TokenForm keyboardHandler={verifyPasswordToken} resendToken={forgotPasswordHandler} />
			{/if}
		</div>
	</section>
</Step>
