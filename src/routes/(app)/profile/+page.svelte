<script lang="ts">
	import { AlertWithAction } from '$components';
	import { PUBLIC_IMAGE_SERVICE_URL } from '$env/static/public';
	import { errorCode } from '$stores';
	import { calculateDate } from '$utils';
	import { language } from '@inlang/sdk-js';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;

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
	<div class="flex md:flex-row flex-col p-4 gap-5">
		<div class="flex-1 card variant-ghost-surface shadow-xl p-4">
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
				<dl class="list-dl">
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
							<dt>Trips joined:</dt>
							<dd>{user.tripsJoined}</dd>
						</span>
					</div>
					<div>
						<span class="badge bg-primary-500">3</span>
						<span class="flex-auto">
							<dt>Open debts:</dt>
							<dd>{user.openDebts}</dd>
						</span>
					</div>
					<!-- ... -->
				</dl>
			</footer>
		</div>
		<div class="flex-1 bg-surface-500/20 border border-surface-500 rounded-lg shadow-xl p-8">
			<h4 class="h4">Personal Info</h4>
			<ul class="mt-2">
				<li class="flex border-y border-current py-2">
					<span class="font-bold w-24">Full name:</span>
					<span>{`${user.firstName} ${user.lastName}`}</span>
				</li>
				<li class="flex border-b border-current py-2">
					<span class="font-bold w-24">Birthday:</span>
					<span>{birthday}</span>
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
					<span>{user.location}</span>
				</li>
			</ul>
		</div>
	</div>
{/if}
