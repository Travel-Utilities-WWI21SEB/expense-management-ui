import type { CostPaidForUser } from '$userDomain';
import type { CostDateAsString } from '$tripDomain';

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

export function changeToEqual(
	users: Array<CostPaidForUser>,
	cost: CostDateAsString,
	usersInvolved: Array<CostPaidForUser>
): Array<CostPaidForUser> {
	return users.map((user) => {
		return {
			...user,
			amount: user.checked ? cost.amount / usersInvolved.length : 0
		};
	});
}

export function deselectAllPeople(users: Array<CostPaidForUser>): Array<CostPaidForUser> {
	return users.map((user) => {
		return {
			...user,
			checked: false,
			amount: 0
		};
	});
}
export function selectAllPeople(
	users: Array<CostPaidForUser>,
	cost: CostDateAsString,
	splitType: number
): Array<CostPaidForUser> {
	return users.map((user) => {
		return {
			...user,
			checked: true,
			amount: splitType === 0 ? cost.amount / users.length : user.amount
		};
	});
}
