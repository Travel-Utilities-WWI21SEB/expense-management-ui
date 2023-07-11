<script lang="ts">
	import defaultAvatar from '$lib/assets/default_avatar.png';
	import { imageUrl } from '$stores';
	import { i } from '@inlang/sdk-js';
	import { Avatar, FileDropzone, Step } from '@skeletonlabs/skeleton';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let files: FileList;
	let currentAvatar = '';
	let invalidFile = false;
	let invalidMessages: string[] = [];

	const messages = {
		invalidFileType: i('forms.signup.steps.profilePicture.fileType'),
		invalidFileSize: i('forms.signup.steps.profilePicture.fileSize')
	};

	const onChangeHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		invalidMessages = [];

		// Check if file is jpg or png and smaller than 5MB
		if (
			target.files &&
			target.files[0].type !== 'image/jpeg' &&
			target.files[0].type !== 'image/png'
		) {
			invalidFile = true;
			invalidMessages.push(messages.invalidFileType);
		}

		if (target.files && target.files[0].size > 5000000) {
			invalidFile = true;
			invalidMessages.push(messages.invalidFileSize);
		}

		if (invalidFile) {
			return;
		}

		// Delete old picture from memory
		if (currentAvatar) {
			URL.revokeObjectURL(currentAvatar);
		}

		if (target.files) {
			invalidFile = false;
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
				<Avatar
					class="w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60"
					src={currentAvatar || defaultAvatar}
				/>
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
				{#if invalidFile}
					<ol class="list">
						{#each invalidMessages as invalidMessage}
							<li class="flex items-center">
								<span class="badge-icon variant-filled-error w-4 h-4">
									<Icon src={XMark} class="w-6 h-6" />
								</span>
								<span class="flex-auto">{invalidMessage}</span>
							</li>
						{/each}
					</ol>
				{/if}
			</div>
		</div>
	</section>
</Step>
