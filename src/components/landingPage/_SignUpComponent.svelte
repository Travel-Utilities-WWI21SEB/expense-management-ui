<script lang="ts">
	import { Stepper } from '@skeletonlabs/skeleton';
	import EmailStep from './registerSteps/EmailStep.svelte';
	import PasswordStep from './registerSteps/PasswordStep.svelte';
	import TokenStep from './registerSteps/TokenStep.svelte';
	import UsernameStep from './registerSteps/UsernameStep.svelte';

	export let changeTab: (index: number) => void;
</script>

<Stepper
	class="p-3 m-3 h-full"
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark"
>
	<EmailStep {changeTab} />
	<UsernameStep />
	<PasswordStep />
	<TokenStep />
	<!-- ... -->
</Stepper>
