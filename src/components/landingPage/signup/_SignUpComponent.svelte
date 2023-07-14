<script lang="ts">
	import { DataStep, EmailStep, PasswordStep, TokenStep, UsernameStep } from '$components';
	import {
		birthDate,
		email,
		errorCode,
		errorState,
		firstName,
		imageUrl,
		lastName,
		loading,
		location,
		password,
		username
	} from '$stores';
	import { resetLandingPageStore } from '$utils';
	import { i } from '@inlang/sdk-js';
	import { Stepper } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';
	import ProfilePictureStep from './steps/_ProfilePictureStep.svelte';

	export let changeTab: (index: number) => void;

	// Register
	const register = async () => {
		loading.set(true);
		errorState.set(false);

		try {
			// Create multipart form data
			const formData = new FormData();

			// Append all the data to the form data
			formData.append('email', $email);
			formData.append('firstName', $firstName);
			formData.append('lastName', $lastName);
			formData.append('password', $password);
			formData.append('username', $username);
			formData.append('birthday', $birthDate);
			formData.append('location', $location);

			// Fetch the image as a Blob object and append it to the form data
			if ($imageUrl !== '') {
				const blobPromise = await fetch($imageUrl);
				const blob = await blobPromise.blob();
				formData.append('profilePicture', blob);
			}

			const response = await fetch('/api/users/register', {
				method: 'POST',
				body: formData
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
		if (step === 4 && state.current === 5) {
			register();
		}
	};

	onDestroy(() => {
		// Clean up store values
		resetLandingPageStore();
	});
</script>

<Stepper
	class="p-3 m-3 h-full"
	on:next={nextStepHandler}
	stepTerm={i('forms.step')}
	buttonBackLabel={i('tripOverview.addTripModal.backButton')}
>
	<EmailStep {changeTab} />
	<UsernameStep />
	<ProfilePictureStep />
	<DataStep />
	<PasswordStep />
	<TokenStep {register} />
	<!-- ... -->
</Stepper>
