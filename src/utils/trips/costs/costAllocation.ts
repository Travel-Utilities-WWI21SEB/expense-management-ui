import type { CostPaidForUser } from '$userDomain';

export function validateCostAllocation(
	totalAmount: number,
	usersInvolved: Array<CostPaidForUser>
): boolean {
	let sum = 0;
	usersInvolved.forEach((user) => {
		sum += user.amount;
	});
	return sum === totalAmount;
}
