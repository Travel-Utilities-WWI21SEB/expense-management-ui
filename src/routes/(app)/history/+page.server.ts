import { errorCode, errorState } from '$stores';
import { getCurrentUser, transactionHistory } from '$utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url, cookies }) => {
	const sort = String(url.searchParams.get('sortBy') ?? 'createdAt');
	const sortOrder = String(url.searchParams.get('sortOrder') ?? 'desc');

	const sortByQuery = `sortBy=${sort}`;
	const sortOrderQuery = `&sortOrder=${sortOrder}`;

	const transactionPromise = fetch(`/api/transactions?${sortByQuery}${sortOrderQuery}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const [transactionResponse] = await Promise.all([transactionPromise]);

	const transactionBody = await transactionResponse.json();

	const token = cookies.get('token');
	if (token === undefined) {
		return {
			data: 'nodata'
		};
	} //TODO: Error handling
	const userId = getCurrentUser(token);

	if (!transactionBody.errorCode) {
		return transactionHistory(transactionBody.data, userId);
	} else {
		errorCode.set(transactionBody.errorCode);
		errorState.set(true);
	}
};
