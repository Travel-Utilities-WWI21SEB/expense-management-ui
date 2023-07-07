import { getCurrentUser, modifyCosts, modifyDebtData, modifyTrip } from '$utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, url, cookies }) => {
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
	const pageQuery = url.searchParams.has('page') ? `&page=${url.searchParams.get('page')}` : '';
	const pageSizeQuery = url.searchParams.has('pageSize')
		? `&pageSize=${url.searchParams.get('pageSize')}`
		: '';

	const tripPromise = fetch(`/api/trips/${params.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const costPromise = fetch(
		`/api/trips/${params.id}/costs?${sortByQuery}${sortOrderQuery}${minDeductionDateQuery}${maxDeductionDateQuery}${minEndDateQuery}${maxEndDateQuery}${pageQuery}${pageSizeQuery}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	const userPromise = fetch('/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const debtPromise = fetch(`/api/trips/${params.id}/debts`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const [tripResponse, costsResponse, userResponse, debtResponse] = await Promise.all([
		tripPromise,
		costPromise,
		userPromise,
		debtPromise
	]);

	const tripBody = await tripResponse.json();
	const costsBody = await costsResponse.json();
	const userBody = await userResponse.json();
	const debtBody = await debtResponse.json();

	const token = cookies.get('token');
	if (token === undefined) {
		return {
			data: 'nodata'
		};
	} //TODO: Error handling
	const userId = getCurrentUser(token);

	if (tripBody.data) {
		return {
			...tripBody,
			tripData: modifyTrip(tripBody.data, userBody.data, modifyDebtData(debtBody.data, userId)),
			userData: userBody,
			costsData: modifyCosts(costsBody.data, tripBody.data.costCategories)
		};
	}

	return { tripData: tripBody.data, costsData: costsBody.data };
};
