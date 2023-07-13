<script lang="ts">
	import type { User } from '$userDomain';
	import { calculateDate } from '$utils';
	import { i, language } from '@inlang/sdk-js';
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let participant: User;

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
	$: startDate = calculateDate(participant.presenceStartDate, dateFormat, 'medium');
	$: endDate = calculateDate(participant.presenceEndDate, dateFormat, 'medium');

	const avatarPopup: PopupSettings = {
		event: 'click',
		target: `popup${participant.username}`,
		placement: 'bottom'
	};
</script>

<!-- POPUP -->
<div class="card p-4 w-72 shadow-xl text-center z-50" data-popup="popup{participant.username}">
	<h4 class="p-2">{participant.username}</h4>
	<p class="p-2">
		{i('tripDetails.timePresent')} <br />
		{`${startDate} - ${endDate}`}
	</p>
	<p
		class="p-2 {participant.hasAcceptedInvite
			? 'dark:text-secondary-300 text-secondary-800'
			: 'dark:text-warning-400 text-warning-800 '}"
	>
		{participant.hasAcceptedInvite ? 'Invitation accepted' : 'Invitation: pending'}
	</p>
</div>
<!-- POPUP-->

<button class="py-1" type="button" use:popup={avatarPopup}>
	<Avatar
		initials={participant.username
			.split(' ')
			.map((val) => val.substring(0, 1))
			.join('')}
		background={participant.hasAcceptedInvite ? 'bg-secondary-300' : 'bg-warning-400'}
		class="inline-block h-12 w-12 rounded-full ring-2 ring-surface-100 dark:ring-surface-800"
	/>
</button>
