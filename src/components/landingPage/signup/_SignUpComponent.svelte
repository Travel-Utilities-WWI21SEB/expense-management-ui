<script lang="ts">
	import { DataStep, EmailStep, PasswordStep, TokenStep, UsernameStep } from '$components';
	import { email, errorCode, errorState, loading, password, username } from '$stores';
	import { resetLandingPageStore } from '$utils';
	import { i } from '@inlang/sdk-js';
	import { Stepper } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';

	export let changeTab: (index: number) => void;

	// Register
	const register = async () => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch('/api/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: $email, password: $password, username: $username })
			});

			const body = await response.json();
			const { error, errorCode: code } = body;

			// Writing in the store to let TokenStep know the results
			errorState.set(error);
			errorCode.set(code);
		} catch (error: any) {
			errorState.set(true);
			errorCode.set('EM-000');
		} finally {
			loading.set(false);
		}
	};

	// Next step handler, should fire registration when last step is reached
	const nextStepHandler = (
		e: CustomEvent<{ step: number; state: { current: number; total: number } }>
	): void => {
		const { step, state } = e.detail;

		// If last step is reached, fire registration
		if (step === 3 && state.current === 4) {
			register();
		}
	};

	onDestroy(() => {
		// Clean up store values
		resetLandingPageStore();
	});
</script>

<Stepper class="p-3 m-3 h-full" on:next={nextStepHandler} stepTerm={i('forms.step')}>
	<EmailStep {changeTab} />
	<UsernameStep />
	<DataStep />
	<PasswordStep />
	<TokenStep {register} />
	<!-- ... -->
</Stepper>
