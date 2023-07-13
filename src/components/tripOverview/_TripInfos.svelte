<script lang="ts">
	import type { TravelData } from '$tripDomain';
	import { calculateDate } from '$utils';
	import { i, language } from '@inlang/sdk-js';

	export let trip: TravelData;

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
	$: startDate = calculateDate(trip.startDate, dateFormat, 'medium');
	$: endDate = calculateDate(trip.endDate, dateFormat, 'medium');
</script>

<p>
	{`${startDate} ${endDate !== startDate && endDate ? ` - ${endDate}` : ''}`}
</p>
<p>
	{i('tripOverview.tripCard.location')}
	{trip.location}
</p>
