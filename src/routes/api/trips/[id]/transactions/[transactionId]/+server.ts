import { PUBLIC_BASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

//get
//post????

//delete
export const DELETE: RequestHandler = async ({ fetch, params }) => {
	console.log('DELETE');
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/transactions/${params.transactionId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		if (response.ok) {
			return json({ error: false, errorCode: '' });
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
