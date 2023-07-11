import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, url }) => {
	console.log('GET');

	const sort = String(url.searchParams.get('sortBy') ?? 'createdAt');
	const sortOrder = String(url.searchParams.get('sortOrder') ?? 'desc');

	const sortByQuery = `sortBy=${sort}`;
	const sortOrderQuery = url.searchParams.has('sortOrder') ? `&sortOrder=${sortOrder}` : '';
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/transactions?${sortByQuery}${sortOrderQuery}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorCode: '', data: body });
		}

		const body = await response.json();
		return json({ error: true, errorCode: body.errorCode });
	} catch (exception) {
		return json({
			error: true,
			errorCode: 'EM-000'
		});
	}
};
