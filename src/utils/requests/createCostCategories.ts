import { errorCode, errorState, loading } from '$stores';

export const createCostCategories = async (
	tripId: number,
	costCategory: { name: string; color: string }
) => {
	loading.set(true);
	errorState.set(false);

	try {
		const response = await fetch(`/api/trips/${tripId}/cost-categories`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ body: costCategory, id: tripId })
		});

		const body = await response.json();
		const { error, errorCode: code } = body;

		errorState.set(error);
		errorCode.set(code);
	} catch (error: any) {
		errorState.set(true);
		errorCode.set('EM-000');
	} finally {
		loading.set(false);
	}
};
