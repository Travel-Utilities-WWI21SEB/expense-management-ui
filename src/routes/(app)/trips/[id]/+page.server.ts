/*
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
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
