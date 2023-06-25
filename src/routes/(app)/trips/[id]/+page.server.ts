import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const tripResponse = await fetch(`/api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const costsResponse = await fetch(`/api/trips/${params.id}/costs`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const tripBody = await tripResponse.json();
	const costsBody = await costsResponse.json();

	return { tripData: tripBody.data, costsData: costsBody.data };
}) satisfies PageServerLoad;
