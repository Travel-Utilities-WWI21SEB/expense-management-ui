import { errorMessage, errorState, loading } from '$stores';
import type { CostDateAsString } from '../../domain/trip/Cost';
import type { TravelData } from '../../domain/trip/TravelData';
import type { CostPaidForUser } from '../../domain/user/User';

export async function createCost(
	cost: CostDateAsString,
	trip: TravelData,
	costPaidForUser: Array<CostPaidForUser>
) {
	console.log(cost);
	loading.set(true);
	errorState.set(false);

	try {
		const costsResponse = await fetch(`api/trips/${trip.tripId}/costs`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				costCategoryId: cost.costCategory.id,
				amount: cost.amount,
				currency: cost.currency,
				description: cost.name,
				deductedAt: `${cost.startDate}T00:00:00+02:00`,
				creditor: cost.paidBy,
				contributors: costPaidForUser
					.filter((user) => user.checked)
					.map((user) => {
						return {
							username: user.username,
							amount: user.amount
						};
					})
			})
		});

		const body = await costsResponse.json();

		console.log(body);
		const { error, errorMessage: errorDisplayMessage } = body;

		errorState.set(error);
		errorMessage.set(errorDisplayMessage);

		return body;
	} catch (error: any) {
		errorState.set(true);
		errorMessage.set(error.message);
	} finally {
		loading.set(false);
	}
}
