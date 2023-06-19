import { errorMessage, errorState, loading } from '$stores';
import type { TravelData } from '$tripDomain';

export const acceptTrip = async (currentTrip: TravelData) => {
	loading.set(true);
	errorState.set(false);
	try {
		const response = await self.fetch(`/api/trips/${currentTrip.tripId}/accept`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await response.json();
		const { error, errorMessage: errorDisplayMessage } = body;

		errorState.set(error);
		errorMessage.set(errorDisplayMessage);
	} catch (error: any) {
		errorState.set(true);
		errorMessage.set(error.message);
	} finally {
		loading.set(false);
	}
};
