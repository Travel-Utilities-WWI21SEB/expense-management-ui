<script lang="ts">
	import { errorMessage, errorState, loading, newUser } from '$stores';
	import { Stepper } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';
	import EmailStep from './registerSteps/EmailStep.svelte';
	import PasswordStep from './registerSteps/PasswordStep.svelte';
	import TokenStep from './registerSteps/TokenStep.svelte';
	import UsernameStep from './registerSteps/UsernameStep.svelte';

	export let changeTab: (index: number) => void;

	onDestroy(() => {
		newUser.set({
			email: '',
			username: '',
			password: ''
		});
	});

	// Register
	const register = async () => {
		loading.set(true);
		errorState.set(false);

		const { email, username, password } = $newUser;

		try {
			const response = await fetch('api/user/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password, username })
			});

			const { error, errorMessage: message } = await response.json();

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
		// Print current time and step
		console.log(new Date().toLocaleTimeString(), step, state);

		// If last step is reached, fire registration
		if (step === 2 && state.current === 3) {
			register();
		}
	};
</script>

<Stepper
	class="p-3 m-3 h-full"
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark"
	on:next={nextStepHandler}
>
	<EmailStep {changeTab} />
	<UsernameStep />
	<PasswordStep />
	<TokenStep {register} />
	<!-- ... -->
</Stepper>
