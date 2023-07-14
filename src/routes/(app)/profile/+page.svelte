<script lang="ts">
	import { AlertWithAction } from '$components';
	import { PUBLIC_IMAGE_SERVICE_URL } from '$env/static/public';
	import { errorCode } from '$stores';
	import { calculateDate } from '$utils';
	import { i, language } from '@inlang/sdk-js';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Check, Pencil } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let data;

	let editMode = false;

	const dateFormats: {
		[key: string]: string;
		en: string;
		de: string;
		ko: string;
	} = {
		en: 'en-US',
		de: 'de-de',
		ko: 'ko-KR'
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
					{i('profile.title')}
				</span>
			</h1>
			<button class="btn variant-ghost-primary" on:click={() => (editMode = !editMode)}>
				{#if editMode}
					<span><Icon src={Check} class="w-6 h-6" /></span>
					<span>{i('profile.saveButton')}</span>
				{:else}
					<span><Icon src={Pencil} class="w-6 h-6" /></span>
					<span>{i('profile.editButton')}</span>
				{/if}
			</button>
		</header>
		<section class="p-4 flex xl:flex-row flex-col gap-5">
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
								<dt>{i('profile.travellerSince')}</dt>
								<dd>{creationDate}</dd>
							</span>
						</div>
						<div>
							<span class="badge bg-primary-500">2</span>
							<span class="flex-auto">
								<dt>{i('profile.description')}</dt>
								<dd>{i('profile.descriptionExplanation')}</dd>
							</span>
						</div>
						<!-- ... -->
					</dl>
				</footer>
			</div>
			<div class="flex-1 !bg-transparent border border-surface-500 rounded-lg shadow-xl p-8">
				<h4 class="h4">{i('profile.personalInfo')}</h4>
				<ul class="mt-2">
					<li class="flex border-y border-current py-2">
						<span class="font-bold w-24">{i('profile.firstName')}</span>
						{#if editMode}
							<input
								type="text"
								class="input"
								bind:value={user.firstName}
								placeholder={i('profile.firstName')}
							/>
						{:else}
							<span>{user.firstName}</span>
						{/if}
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">{i('profile.lastName')}</span>
						{#if editMode}
							<input
								type="text"
								class="input"
								bind:value={user.lastName}
								placeholder={i('profile.lastName')}
							/>
						{:else}
							<span>{user.lastName}</span>
						{/if}
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">{i('profile.birthDate')}</span>
						{#if editMode}
							<input
								type="date"
								class="input"
								bind:value={user.birthday}
								placeholder={i('profile.birthDate')}
							/>
						{:else}
							<span>{birthday}</span>
						{/if}
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">{i('profile.joinedAt')}</span>
						<span>{creationDate}</span>
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">{i('profile.email')}</span>
						<span class="overflow-x-auto">{user.email}</span>
					</li>
					<li class="flex border-b border-current py-2">
						<span class="font-bold w-24">{i('profile.location')}</span>
						{#if editMode}
							<input
								type="text"
								class="input"
								bind:value={user.location}
								placeholder={i('profile.location')}
							/>
						{:else}
							<span>{user.location}</span>
						{/if}
					</li>
				</ul>
			</div>
		</section>
	</div>
{/if}
