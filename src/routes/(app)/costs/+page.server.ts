import type { CostOverview } from '$costDomain';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type LoadResponse = {
	error: boolean;
	errorCode: string;
	costOverview: CostOverview;
};

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const response = await event.fetch('/api/costs', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { error, errorCode, data } = await response.json();

	return {
		error,
		errorCode,
		costOverview: data
	} as LoadResponse;
};
