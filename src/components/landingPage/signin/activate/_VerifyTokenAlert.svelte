<script lang="ts">
	import { notActivatedAlert, notActivatedWorkflow } from '$stores';
	import { AlertWithAction } from '$components';

	export let resendToken: () => void;
</script>

<section>
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
		<AlertWithAction
			enableAction={true}
			errorAction={() => {
				resendToken();
				notActivatedAlert.set(false);
				notActivatedWorkflow.set(true);
			}}
			alertHeading="Your account is not activated!"
			actionText="Open token form"
			class="variant-filled-error"
		/>
	</div>
</section>
