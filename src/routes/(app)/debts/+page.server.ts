import type { ServerLoadEvent } from '@sveltejs/kit';
import type { DebtOverview } from '../../../domain/debt/DebtOverview';
import type { PageServerLoad } from './$types';

interface LoadResponse {
	error: boolean;
	errorCode: string;
	debts: DebtOverview;
}

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const response = await event.fetch('/api/debts', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { error, errorCode, data } = await response.json();

	return {
		error,
		errorCode,
		debts: data
	} as LoadResponse;
};
