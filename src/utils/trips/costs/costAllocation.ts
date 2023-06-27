import type { CostPaidForUser } from '$userDomain';
import type { CostDateAsString } from '$tripDomain';
import { validateAmountPrecision } from './amount';

export function validateCostAllocation(
	totalAmount: number,
	users: Array<CostPaidForUser>
): boolean {
	return isAmountFullySplit(totalAmount, users) && validateAmountPrecisions(users);
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
	if (usersInvolved.length === 0) {
		return users;
	}
	function divideAmount(amount: number, numberOfParticipants: number) {
		const number = amount / numberOfParticipants;
		return Math.floor(number * 100) / 100;
	}
	const newUsers = users.map((user) => {
		return {
			...user,
			amount: user.checked ? divideAmount(cost.amount, usersInvolved.length) : 0
		};
	});

	//split rest cents by involved Users
	let number = 0;
	while (!isAmountFullySplit(cost.amount, newUsers)) {
		if (newUsers[number].checked) {
			newUsers[number].amount += 0.01;
		}
		number = number <= newUsers.length ? number + 1 : 0;
	}
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
			amount: splitType === 0 ? cost.amount / users.length : user.amount === 0 ? 0.01 : user.amount
		};
	});
}

export function calculateRestAmount(totalAmount: number, users: Array<CostPaidForUser>): number {
	let sum = 0;
	users.forEach((user) => {
		sum += user.amount;
	});
	return totalAmount - sum;
}
