<script lang="ts">
	import { SelectEmailStep, SetNewPasswordStep, ValidateResetTokenStep } from '$components';
	import { email, errorCode, errorState, loading, password, tokenValues } from '$stores';
	import { i } from '@inlang/sdk-js';
	import { Stepper, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onDestroy, tick } from 'svelte/internal';
	import { resetLandingPageStore } from '../../../../utils/store/resetLandingPageStore';

	export let closeForgotPassword: () => void;

	const successToast: ToastSettings = {
		background: 'variant-filled-success',
		message: i('toast.resetPassword'),
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
		const { error, errorCode: code } = body;

		errorState.set(error);
		errorCode.set(code);
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
		const { success, error, errorCode: code } = body;

		errorState.set(error);
		errorCode.set(code);

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
		resetLandingPageStore();
	});
</script>

<Stepper
	on:back={closeForgotPassword}
	on:next={nextStepHandler}
	on:complete={onCompleteHandler}
	buttonBackLabel={i('forms.signin.forgotPassword.abort')}
	stepTerm={i('forms.step')}
>
	<SelectEmailStep />
	<ValidateResetTokenStep {forgotPasswordHandler} />
	<SetNewPasswordStep {closeForgotPassword} />
</Stepper>
