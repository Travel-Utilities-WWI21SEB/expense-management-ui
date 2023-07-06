import { errorCode, errorState, loading } from '$stores';

export const inviteUsers = async (tripId: number, user: { username: string }) => {
	loading.set(true);
	errorState.set(false);

	try {
		const response = await fetch(`/api/trips/${tripId}/invite`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ body: user, id: tripId })
		});

		const body = await response.json();
		const { error, errorCode: code } = body;

		errorState.set(error);
		errorCode.set(code);
	} catch (error) {
		errorState.set(true);
		errorCode.set('EM-000');
	} finally {
		loading.set(false);
	}
};
