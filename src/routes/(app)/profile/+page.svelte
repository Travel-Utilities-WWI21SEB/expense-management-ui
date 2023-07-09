<script lang="ts">
	import { AlertWithAction } from '$components';
	import { PUBLIC_IMAGE_SERVICE_URL } from '$env/static/public';
	import { errorCode } from '$stores';
	import { calculateDate } from '$utils';
	import { language } from '@inlang/sdk-js';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Check, Pencil } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let data;

	let editMode = false;

	const dateFormats: {
		[key: string]: string;
		en: string;
		de: string;
	} = {
		en: 'en-US',
		de: 'de-de'
	};

	// get the date format based on the current language
	$: dateFormat = dateFormats[language];
	$: creationDate = calculateDate(new Date(data.user.createdAt), dateFormat, 'full');
	$: birthday = calculateDate(new Date(data.user.birthday), dateFormat, 'full');

	let pictureSource = `${PUBLIC_IMAGE_SERVICE_URL}/images/${data.user.profilePicture}`;
	const { error, errorCode: code, user } = data;
	errorCode.set(code);
</script>

{#if error}
	<AlertWithAction alertHeading="Something went wrong" enableAction={false} />
{:else}
	<div class="m-4 card variant-ghost-surface">
		<header class="card-header m-2 p-2 rounded-lg shadow-md flex flex-row">
			<h1 class="h1 col-start-1 grow">
				<span
					class="bg-gradient-to-br from-primary-800 to-primary-600 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone"
				>
					Your profile
				</span>
			</h1>
			<button class="btn variant-ghost-primary" on:click={() => (editMode = !editMode)}>
				{#if editMode}
					<span><Icon src={Check} class="w-6 h-6" /></span>
					<span>Save</span>
				{:else}
					<span><Icon src={Pencil} class="w-6 h-6" /></span>
					<span>Edit</span>
				{/if}
			</button>
		</header>
		<section class="p-4 flex md:flex-row flex-col gap-5">
			<div class="flex-1 card !bg-transparent shadow-xl p-4 border border-surface-500">
				<header class="card-header flex flex-col items-center mb-2">
					<Avatar
						src={pictureSource}
						initials={user.firstName[0] + user.lastName[0]}
						width="w-1/4"
						border="border border-current"
						rounded="rounded-full"
					/>
				</header>
				<section class="p-4 flex justify-center my-2">
					<h2 class="h2 pt-2">{user.username}</h2>
				</section>
				<hr class="!border-t-2 !border-current" />
				<footer class="card-footer flex justify-center mt-2">
					<dl class="list-dl p-4">
						<div>
							<span class="badge bg-primary-500">1</span>
							<span class="flex-auto">
								<dt>Traveller since:</dt>
								<dd>{creationDate}</dd>
							</span>
						</div>
						<div>
							<span class="badge bg-primary-500">2</span>
							<span class="flex-auto">
								<dt>Description:</dt>
								<dd>Here could be a short description about you, but we were too lazy. :)</dd>
							</span>
						</div>
						<!-- ... -->
					</dl>
				</footer>
			</div>
			<div class="flex-1 !bg-transparent border border-surface-500 rounded-lg shadow-xl p-8">
				<h4 class="h4">Personal Info</h4>
				<ul class="mt-2">
					<li class="flex border-y border-current py-2">
						<span class="font-bold w-24">First name:</span>
						{#if editMode}
							<input
								type="text"
								class="input"
								bind:value={user.firstName}
								placeholder="First name"
							/>
						{:else}
							<span>{user.firstName}</span>
						{/if}
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">Last name:</span>
						{#if editMode}
							<input type="text" class="input" bind:value={user.lastName} placeholder="Last name" />
						{:else}
							<span>{user.lastName}</span>
						{/if}
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">Birthday:</span>
						{#if editMode}
							<input type="date" class="input" bind:value={user.birthday} placeholder="Birthday" />
						{:else}
							<span>{birthday}</span>
						{/if}
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">Joined:</span>
						<span>{creationDate}</span>
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">Email:</span>
						<span class="overflow-x-auto">{user.email}</span>
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">Location:</span>
						{#if editMode}
							<input type="text" class="input" bind:value={user.location} placeholder="Location" />
						{:else}
							<span>{user.location}</span>
						{/if}
					</li>
				</ul>
			</div>
		</section>
	</div>
{/if}
