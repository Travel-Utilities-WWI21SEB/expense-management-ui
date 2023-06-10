<script lang="ts">
	import {
		correctToken,
		errorMessage,
		errorState,
		loading,
		password,
		passwordValid,
		passwordsMatch,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { Stepper } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount, tick } from 'svelte/internal';
	import SetNewPasswordStep from './forgotPasswordSteps/SetNewPasswordStep.svelte';
	import ValidateResetTokenStep from './forgotPasswordSteps/ValidateResetTokenStep.svelte';

	export let closeForgotPassword: () => void;
	export let email: string;

	const forgotPasswordHandler = async () => {
		loading.set(true);
		errorState.set(false);

		const response = await fetch('api/users/forgot-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const { error, errorMessage: errorDisplayMessage } = await response.json();

		errorState.set(error);
		errorMessage.set(errorDisplayMessage);
		loading.set(false);
	};

	const onCompleteHandler = async () => {
		loading.set(true);
		errorState.set(false);

		const response = await fetch(`api/users/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email, password: $password, token: $tokenValues.join('') })
		});

		const { success, error, errorMessage: errorDisplayMessage } = await response.json();

		errorState.set(error);
		errorMessage.set(errorDisplayMessage);

		if (success) {
			await tick();
			closeForgotPassword();
		}

		loading.set(false);
	};

	onDestroy(() => {
		// Clean up store values
		tokenValues.set(['', '', '', '', '', '']);
		correctToken.set(undefined);
		tokenErrorState.set(false);

		password.set('');
		passwordValid.set(false);
		passwordsMatch.set(false);

		errorState.set(false);
		errorMessage.set('');
		loading.set(false);
	});

	onMount(() => {
		forgotPasswordHandler();
	});
</script>

<Stepper
	on:buttonBack={closeForgotPassword}
	on:complete={onCompleteHandler}
	buttonBackLabel="Abort"
>
	<ValidateResetTokenStep {forgotPasswordHandler} {email} />
	<SetNewPasswordStep {closeForgotPassword} />
</Stepper>
