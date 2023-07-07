<script lang="ts">
	import { birthDate, firstName, lastName, location } from '$stores';
	import { i } from '@inlang/sdk-js';
	import { Step } from '@skeletonlabs/skeleton';
	import { Check, QuestionMarkCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const validationIcons = {
		valid: Check,
		invalid: XMark,
		unknown: QuestionMarkCircle
	};

	const validationClasses = {
		valid: 'text-success-800 dark:text-success-200',
		invalid: 'text-error-800 dark:text-error-200',
		unknown: 'text-warning-800 dark:text-warning-200'
	};

	const validateInput = (
		name: string,
		lowerBound: number,
		upperBound: number
	): 'valid' | 'invalid' | 'unknown' => {
		if (name.length === 0) {
			return 'unknown';
		}

		if (name.length < lowerBound || name.length > upperBound) {
			return 'invalid';
		}

		return 'valid';
	};

	const validateBirthDate = (date: string): 'valid' | 'invalid' | 'unknown' => {
		if (date.length === 0) {
			return 'unknown';
		}

		const dateObj = new Date(date);
		const now = new Date();

		if (dateObj > now) {
			return 'invalid';
		}

		return 'valid';
	};

	$: firstNameValid = validateInput($firstName, 2, 25);
	$: firstNameIcon = validationIcons[firstNameValid];
	$: firstNameClass = validationClasses[firstNameValid];

	$: lastNameValid = validateInput($lastName, 2, 25);
	$: lastNameIcon = validationIcons[lastNameValid];
	$: lastNameClass = validationClasses[lastNameValid];

	$: locationValid = validateInput($location, 2, 50);
	$: locationIcon = validationIcons[locationValid];
	$: locationClass = validationClasses[locationValid];

	$: birthDateValid = validateBirthDate($birthDate);
	$: birthDateIcon = validationIcons[birthDateValid];
	$: birthDateClass = validationClasses[birthDateValid];

	// Lock step
	$: lockDataStep =
		firstNameValid !== 'valid' ||
		lastNameValid !== 'valid' ||
		locationValid !== 'valid' ||
		birthDateValid !== 'valid';

	// Keyboard handler
	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (!lockDataStep) {
				// Click next button
				const nextButton = document.querySelector('.btn.variant-filled-primary');
				if (nextButton) {
					(nextButton as HTMLButtonElement).click();
				}
			}
		}
	};
</script>

<Step
	locked={lockDataStep}
	buttonNextLabel={i('forms.signup.steps.data.nextStep')}
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark {lockDataStep
		? 'pointer-events-none opacity-50'
		: ''}"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			{i('forms.signup.steps.data.title')}
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>

	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form novalidate on:keydown={keydownHandler} class="space-y-2 md:space-y-4">
				<label class="label">
					<span>{i('forms.signup.steps.data.firstName')}</span>
					<div class="input-group input-group-divider grid-cols-[1fr_auto]">
						<input
							class="input"
							title="inputFirstName"
							type="text"
							placeholder="Tommy"
							bind:value={$firstName}
						/>
						<div class="input-group-shim">
							<Icon src={firstNameIcon} class="w-6 h-6 {firstNameClass}" />
						</div>
					</div>
				</label>
				<label class="label">
					<span>{i('forms.signup.steps.data.lastName')}</span>
					<div class="input-group input-group-divider grid-cols-[1fr_auto]">
						<input
							class="input"
							title="inputLastName"
							type="text"
							placeholder="Schwarzeneggger"
							bind:value={$lastName}
						/>
						<div class="input-group-shim">
							<Icon src={lastNameIcon} class="w-6 h-6 {lastNameClass}" />
						</div>
					</div>
				</label>
				<label class="label">
					<span>{i('forms.signup.steps.data.location')}</span>
					<div class="input-group input-group-divider grid-cols-[1fr_auto]">
						<input
							class="input"
							title="inputLocation"
							type="text"
							placeholder="Los Angeles"
							bind:value={$location}
						/>
						<div class="input-group-shim">
							<Icon src={locationIcon} class="w-6 h-6 {locationClass}" />
						</div>
					</div>
				</label>
				<label class="label">
					<span>{i('forms.signup.steps.data.birthDate')}</span>
					<div class="input-group input-group-divider grid-cols-[1fr_auto]">
						<input
							class="input"
							type="date"
							max={new Date().toISOString().split('T')[0]}
							bind:value={$birthDate}
						/>
						<div class="input-group-shim">
							<Icon src={birthDateIcon} class="w-6 h-6 {birthDateClass}" />
						</div>
					</div>
				</label>
			</form>
		</div>
	</section>
</Step>
