import type { Debt } from '$tripDomain';

export function modifyDebtData(debts: Array<Debt>, userId: string) {
	if (debts) {
		const creditorDebts: Array<Debt> = debts.filter(
			(dept) => dept.creditor.userId === userId && parseFloat(dept.amount) > 0
		);
		const debitorDebts: Array<Debt> = debts.filter(
			(dept) => dept.debtor.userId === userId && parseFloat(dept.amount) > 0
		);
		return {
			creditorDebts,
			debitorDebts
		};
	} else {
		return {
			creditorDebts: [],
			debitorDebts: []
		};
	}
}
