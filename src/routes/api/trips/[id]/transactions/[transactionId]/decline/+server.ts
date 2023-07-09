import { PUBLIC_BASE_URL } from '$env/static/public';
import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ fetch, params }) => {
	console.log('POST');
	try {
		const response = await fetch(
			`${PUBLIC_BASE_URL}/api/v1/trips/${params.id}/transactions/${params.transactionId}/decline`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		if (response.status === 204) {
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
