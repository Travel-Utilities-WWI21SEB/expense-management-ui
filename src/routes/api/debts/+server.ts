import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

import type { DebtOverview } from '../../../domain/debt/DebtOverview';

interface LoadResponse {
	error: boolean;
	errorCode: string;
	data: DebtOverview;
}

export const GET: RequestHandler = async ({ fetch }) => {
	console.log('GET');
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/debts/overview`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const body = await response.json();
			return json({ error: false, errorCode: '', data: body } as LoadResponse);
		}

		const body = await response.json();
		return json({ error: true, errorCode: body.errorCode } as LoadResponse);
	} catch (exception) {
		return json({
			error: true,
			errorCode: 'EM-000'
		} as LoadResponse);
	}
};
