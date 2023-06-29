import type { CostOverview } from '$costDomain';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type LoadResponse = {
	error: boolean;
	errorMessage: string;
	costOverview: CostOverview;
};

export const load = (async (event: ServerLoadEvent) => {
	const response = await event.fetch('/api/costs', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { error, errorMessage, data } = await response.json();

	return {
		error,
		errorMessage,
		costOverview: data
	} as LoadResponse;
}) satisfies PageServerLoad;
