import type { CostPaidForUser } from '$userDomain';
import type { CostDateAsString } from '$tripDomain';
import { validateAmountPrecision } from '$utils';

export function validateCostAllocation(
	totalAmount: number,
	usersInvolved: Array<CostPaidForUser>
): boolean {
	return isAmountFullySplit(totalAmount, usersInvolved) && validateAmountPrecisions(usersInvolved);
}

function validateAmountPrecisions(usersInvolved: Array<CostPaidForUser>): boolean {
	return usersInvolved.filter((user) => !validateAmountPrecision(user.amount)).length === 0;
}

function isAmountFullySplit(totalAmount: number, usersInvolved: Array<CostPaidForUser>): boolean {
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
	function divideAmount(amount: number, numberOfParticipants: number) {
		const number = (amount / numberOfParticipants).toString();
		return Number(parseFloat(number).toFixed(2));
	}
	const newUsers = users.map((user) => {
		return {
			...user,
			amount: user.checked ? divideAmount(cost.amount, usersInvolved.length) : 0
		};
	});

	return isAmountFullySplit(cost.amount, newUsers)
		? newUsers
		: newUsers.map((user) => {
				return {
					...user,
					amount: user.user?.userId === cost.paidBy ? user.amount + 0.01 : user.amount
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
