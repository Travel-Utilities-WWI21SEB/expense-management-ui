import type { Transaction } from '$tripDomain';
import { calculateDate } from '$utils';

export const transactionHistory = (transactions: Array<Transaction>, userId: string) => {
	if (transactions) {
		const history: Array<Transaction> = transactions.map((transaction: Transaction) => {
			return {
				...transaction,
				createdAt: calculateDate(new Date(transaction.createdAt.split(' ')[0])),
				isDebt: transaction.debtor.userId === userId ? false : true
			};
		});
		return {
			transactionHistory: history
		};
	} else {
		return {
			transactionHistory: []
		};
	}
};
