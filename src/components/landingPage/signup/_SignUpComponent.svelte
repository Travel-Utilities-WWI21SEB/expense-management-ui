<script lang="ts">
	import { email, errorMessage, errorState, loading, password, username } from '$stores';
	import { resetLandingPageStore } from '$utils';
	import { Stepper } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';
	import EmailStep from './steps/_EmailStep.svelte';
	import PasswordStep from './steps/_PasswordStep.svelte';
	import TokenStep from './steps/_TokenStep.svelte';
	import UsernameStep from './steps/_UsernameStep.svelte';

	export let changeTab: (index: number) => void;

	// Register
	const register = async () => {
		loading.set(true);
		errorState.set(false);

		try {
			const response = await fetch('api/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: $email, password: $password, username: $username })
			});

			const body = await response.json();
			const { error, errorMessage: message } = body;

			// Writing in the store to let TokenStep know the results
			errorState.set(error);
			errorMessage.set(message);
		} catch (error: any) {
			errorState.set(true);
			errorMessage.set(error.message);
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
		if (step === 2 && state.current === 3) {
			register();
		}
	};

	onDestroy(() => {
		// Clean up store values
		resetLandingPageStore();
	});
</script>

<Stepper class="p-3 m-3 h-full" on:next={nextStepHandler}>
	<EmailStep {changeTab} />
	<UsernameStep />
	<PasswordStep />
	<TokenStep {register} />
	<!-- ... -->
</Stepper>