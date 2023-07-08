<script lang="ts">
	import { imageUrl } from '$stores';
	import { i } from '@inlang/sdk-js';
	import { Avatar, FileDropzone, Step } from '@skeletonlabs/skeleton';

	let files: FileList;
	let currentAvatar = '$lib/assets/default_avatar.png';

	const onChangeHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;

		// Delete old picture from memory
		if (currentAvatar) {
			URL.revokeObjectURL(currentAvatar);
		}

		if (target.files) {
			currentAvatar = URL.createObjectURL(target.files[0]);
		}
	};

	// Update the store with the new avatar
	$: imageUrl.set(currentAvatar);
</script>

<Step
	buttonNextLabel={i('forms.signup.steps.profilePicture.nextStep')}
	buttonNext="btn variant-filled-primary hover:variant-soft-primary dark:hover:variant-soft-primary-dark"
>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			{i('forms.signup.steps.profilePicture.title')}
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<div class="flex flex-col items-center space-y-4">
				<Avatar class="w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60" src={currentAvatar} />
				<p class="font-semibold text-center">
					{i('forms.signup.steps.profilePicture.imageDescription')}
				</p>
				<FileDropzone name="files" bind:files on:change={onChangeHandler}>
					<svelte:fragment slot="message"
						>{i('forms.signup.steps.profilePicture.uploadMessage')}</svelte:fragment
					>
					<svelte:fragment slot="meta"
						>{i('forms.signup.steps.profilePicture.uploadDescription')}</svelte:fragment
					>
				</FileDropzone>
			</div>
		</div>
	</section>
</Step>
