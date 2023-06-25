import type { PageLoad } from './$types';

export const load = (async (event) => {
	const tripResponse = await event.fetch(`/api/trips/${event.params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	/* 	const costsResponse = await event.fetch(`api/trips/${event.params.id}/costs`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}); */

	const tripBody = await tripResponse.json();
	/* const costsBody = await costsResponse.json(); */

	return { tripData: tripBody.data /* , costsData: costsBody.data */ };
}) satisfies PageLoad;
