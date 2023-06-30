import { modifyTrip, modifyCosts } from '$utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch, url }) => {
	const sort = String(url.searchParams.get('sortBy') ?? 'deducted_at');
	const sortOrder = String(url.searchParams.get('sortOrder') ?? 'desc');

	const sortByQuery = `sortBy=${sort}`;
	const sortOrderQuery = url.searchParams.has('sortOrder') ? `&sortOrder=${sortOrder}` : '';
	const minDeductionDateQuery = url.searchParams.has('minDeductionDate')
		? `&minDeductionDate=${url.searchParams.get('minDeductionDate')}`
		: '';
	const maxDeductionDateQuery = url.searchParams.has('maxDeductionDate')
		? `&maxDeductionDate=${url.searchParams.get('maxDeductionDate')}`
		: '';
	const minEndDateQuery = url.searchParams.has('minEndDate')
		? `&minEndDate=${url.searchParams.get('minEndDate')}`
		: '';
	const maxEndDateQuery = url.searchParams.has('maxEndDate')
		? `&maxEndDate=${url.searchParams.get('maxEndDate')}`
		: '';

	const tripResponse = await fetch(`/api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const costsResponse = await fetch(
		`/api/trips/${params.id}/costs?${sortByQuery}${sortOrderQuery}${minDeductionDateQuery}${maxDeductionDateQuery}${minEndDateQuery}${maxEndDateQuery}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	const userResponse = await fetch('/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const tripBody = await tripResponse.json();
	const costsBody = await costsResponse.json();
	const userBody = await userResponse.json();

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTrip(tripBody.data, userBody.data),
			userData: userBody,
			costsData: modifyCosts(costsBody.data, tripBody.data.costCategories)
		};
	}

	return { tripData: tripBody.data, costsData: costsBody.data };
}) satisfies PageServerLoad;
