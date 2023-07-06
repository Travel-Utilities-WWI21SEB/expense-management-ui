import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const PATCH: RequestHandler = async ({ fetch, request, url }) => {
	console.log('PATCH');
	const requestBody = await request.json();
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${requestBody.id}/cost-categories/${
				url.pathname.split('/')[5]
			}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody.body)
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
