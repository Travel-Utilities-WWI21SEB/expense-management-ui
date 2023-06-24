export async function fetchTrip(params: any) {
	const tripResponse = await fetch(`api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const tripBody = await tripResponse.json();

	return { ...tripBody, tripData: tripBody.data };
}
