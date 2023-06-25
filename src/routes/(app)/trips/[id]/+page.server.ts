/* import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const tripResponse = await fetch(`api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const tripBody = await tripResponse.json();

	return { ...tripBody, tripData: tripBody.data };
}) satisfies PageServerLoad;
 */

import type { Actions } from './$types';

export const actions = {
	default: async ({ fetch, request }) => {
		const data = await request.formData();
		console.log(data);

		const response = fetch('api/trips/0ca30476-db6c-448f-9e35-378101f797ff/costs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data })
		});

		const responseData = await response;
		console.log(responseData.url);
	}
} satisfies Actions;
