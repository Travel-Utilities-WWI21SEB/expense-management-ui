import { loading, errorState, errorCode } from '$stores';

export const deleteTransaction = async (transactionId: string, tripId: string) => {
	loading.set(true);
	errorState.set(false);

	try {
		const costsResponse = await fetch(`/api/trips/${tripId}/transactions/${transactionId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await costsResponse.json();

		const { error, errorCode: code } = body;

		errorState.set(error);
		errorCode.set(code);

		return body;
	} catch (error: any) {
		errorState.set(true);
		errorCode.set('EM-000');
	} finally {
		loading.set(false);
	}
};
