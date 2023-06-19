import type { CostPaidForUser } from '$userDomain';
import type { CostDateAsString } from '$tripDomain';
import { validateAmountPrecision } from '$utils';

export function validateCostAllocation(
	totalAmount: number,
	users: Array<CostPaidForUser>
): boolean {
	let first = isAmountFullySplit(totalAmount, users);
	let second = validateAmountPrecisions(users);
	return first && second;
}

function validateAmountPrecisions(usersInvolved: Array<CostPaidForUser>): boolean {
	return usersInvolved.filter((user) => !validateAmountPrecision(user.amount)).length === 0;
}

function isAmountFullySplit(totalAmount: number, users: Array<CostPaidForUser>): boolean {
	let sum = 0;
	users.forEach((user) => {
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
	let newUsers = users.map((user) => {
		return {
			...user,
			amount: user.checked ? divideAmount(cost.amount, usersInvolved.length) : 0
		};
	});

	if (!isAmountFullySplit(cost.amount, newUsers)) {
		newUsers = newUsers.map((user) => {
			return {
				...user,
				amount: user.user?.userId === cost.paidBy ? user.amount + 0.01 : user.amount
			};
		});
	}

	//if creditor is not debitor
	/* if (!isAmountFullySplit(cost.amount, newUsers)) {
		newUsers.push(users.filter((user) => user.userId === cost.paidBy)[0]);
	} */

	return newUsers;
}
export function isSplitEqually(allUsers: Array<CostPaidForUser>, cost: CostDateAsString): boolean {
	const involvedUsers = allUsers.filter((user) => user.checked);
	const equallySplitUsers = changeToEqual(allUsers, cost, involvedUsers);
	return JSON.stringify(allUsers) === JSON.stringify(equallySplitUsers);
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
