<script lang="ts">
	import {
		correctToken,
		email,
		emailValid,
		errorMessage,
		errorState,
		loading,
		password,
		passwordValid,
		passwordsMatch,
		tokenErrorState,
		tokenValues
	} from '$stores';
	import { Stepper, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onDestroy, tick } from 'svelte/internal';
	import { SelectEmailStep, SetNewPasswordStep, ValidateResetTokenStep } from '$components';

	export let closeForgotPassword: () => void;

	const successToast: ToastSettings = {
		background: 'variant-filled-success',
		message: 'Your password was successfully reset!',
		autohide: true,
		timeout: 5000
	};

	const forgotPasswordHandler = async () => {
		loading.set(true);
		errorState.set(false);

		const response = await fetch('/api/users/forgot-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: $email })
		});

		const body = await response.json();
		const { error, errorMessage: errorDisplayMessage } = body;

		errorState.set(error);
		errorMessage.set(errorDisplayMessage);
		loading.set(false);
	};

	const onCompleteHandler = async () => {
		loading.set(true);
		errorState.set(false);

		const response = await fetch(`/api/users/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: $email, password: $password, token: $tokenValues.join('') })
		});

		const body = await response.json();
		const { success, error, errorMessage: errorDisplayMessage } = body;

		errorState.set(error);
		errorMessage.set(errorDisplayMessage);

		if (success) {
			await tick();
			toastStore.trigger(successToast);
			closeForgotPassword();
		}

		loading.set(false);
	};

	const nextStepHandler = (
		e: CustomEvent<{ step: number; state: { current: number; total: number } }>
	): void => {
		const { step, state } = e.detail;

		// If the first step is completed, we start the workflow in
		// our backend with the given email address
		if (step === 0 && state.current === 1) {
			forgotPasswordHandler();
		}
	};

	onDestroy(() => {
		// Clean up store values
		tokenValues.set(['', '', '', '', '', '']);
		correctToken.set(undefined);
		tokenErrorState.set(false);

		email.set('');
		emailValid.set(false);

		password.set('');
		passwordValid.set(false);
		passwordsMatch.set(false);

		errorState.set(false);
		errorMessage.set('');
		loading.set(false);
	});
</script>

<Stepper
	on:back={closeForgotPassword}
	on:next={nextStepHandler}
	on:complete={onCompleteHandler}
	buttonBackLabel="Abort"
>
	<SelectEmailStep />
	<ValidateResetTokenStep {forgotPasswordHandler} />
	<SetNewPasswordStep {closeForgotPassword} />
</Stepper>
