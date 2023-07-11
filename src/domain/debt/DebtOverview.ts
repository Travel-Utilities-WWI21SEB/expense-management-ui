import type { Debt } from '$tripDomain';

export interface DebtOverview {
	debts: Array<Debt>;
	openDebtAmount: number;
	openCreditAmount: number;
	totalSpent: number;
	totalReceived: number;
}
