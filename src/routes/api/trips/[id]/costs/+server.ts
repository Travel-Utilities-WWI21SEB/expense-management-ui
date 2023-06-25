import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './../$types';
import type { Cost, CostFromGet } from '$tripDomain';
import type { CostCategory } from '$tripDomain';

export const POST = (async ({ url, fetch, request }) => {
	console.log('POST');
	const requestBody = await request.json();
	console.log(requestBody);
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${url.pathname.split('/')[3]}/costs`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			}
		);

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorMessage: '', data: body });
		}

		const body = await response.json();
		console.log(body);
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
}) satisfies RequestHandler;

export const GET = (async ({ fetch, params }) => {
	console.log('GET');

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/costs`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const costCategoryResponse = await fetch(`/api/trips/${params.id}/cost-categories`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const body = await response.json();
			const costCategoryBody = await costCategoryResponse.json();

			const result: Array<Cost> = body.map((cost: CostFromGet) => {
				const costCategory = costCategoryBody.data.find((category: CostCategory) => {
					if (category.costCategoryId === cost.costCategoryId) return category;
				});
				return { ...cost, costCategory };
			});

			return json({ error: false, errorMessage: '', data: result });
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
}) satisfies RequestHandler;
