import type { Debt } from '$tripDomain';

export function modifyDebtData(debts: Array<Debt>, userId: string) {
	const creditorDebts: Array<Debt> = debts.filter(
		(dept) => dept.creditor.userId === userId && dept.amount > 0
	);
	const debitorDebts: Array<Debt> = debts.filter(
		(dept) => dept.debtor.userId === userId && dept.amount > 0
	);

	return {
		creditorDebts,
		debitorDebts
	};
}
