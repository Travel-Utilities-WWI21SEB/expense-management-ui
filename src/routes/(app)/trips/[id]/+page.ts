import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const tripResponse = await fetch(`api/trips/${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

 /* const costsResponse = await fetch(`api/trips/${params.id}/costs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });*/


  const tripBody = await tripResponse.json();

  return { ...tripBody, tripData: tripBody.data };
}) satisfies PageLoad;
