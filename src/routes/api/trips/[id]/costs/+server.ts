import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const POST: RequestHandler = async ({ fetch, request }) => {
	console.log('POST');
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/costs`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorMessage: '', data: body });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage });
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorMessage: 'Something went wrong. Please try again later'
		});
	}
};

export const GET: RequestHandler = async ({ fetch, params, url }) => {
	console.log('GET');

	const sort = String(url.searchParams.get('sortBy') ?? 'deducted_at');
	const sortOrder = String(url.searchParams.get('sortOrder') ?? 'desc');

	const sortByQuery = `sortBy=${sort}`;
	const sortOrderQuery = url.searchParams.has('sortOrder') ? `&sortOrder=${sortOrder}` : '';
	const minDeductionDateQuery = url.searchParams.has('minDeductionDate')
		? `&minDeductionDate=${url.searchParams.get('minDeductionDate')}T00:00:00Z`
		: '';
	const maxDeductionDateQuery = url.searchParams.has('maxDeductionDate')
		? `&maxDeductionDate=${url.searchParams.get('maxDeductionDate')}T00:00:00Z`
		: '';
	const minEndDateQuery = url.searchParams.has('minEndDate')
		? `&minEndDate=${url.searchParams.get('minEndDate')}T00:00:00Z`
		: '';
	const maxEndDateQuery = url.searchParams.has('maxEndDate')
		? `&maxEndDate=${url.searchParams.get('maxEndDate')}T00:00:00Z`
		: '';
	const pageQuery = url.searchParams.has('page') ? `&page=${url.searchParams.get('page')}` : '';
	const pageSizeQuery = url.searchParams.has('pageSize')
		? `&pageSize=${url.searchParams.get('pageSize')}`
		: '';

	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/costs?${sortByQuery}${sortOrderQuery}${minDeductionDateQuery}${maxDeductionDateQuery}${minEndDateQuery}${maxEndDateQuery}${pageQuery}${pageSizeQuery}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorMessage: '', data: body });
		}

		const body = await response.json();
		const { errorCode } = body;
		const errorMessage = getErrorMessage(errorCode);

		return json({ error: true, errorMessage });
	} catch (exception) {
		return json({
			exists: false,
			valid: true,
			error: true,
			errorMessage: 'Something went wrong. Please try again later'
		});
	}
};
