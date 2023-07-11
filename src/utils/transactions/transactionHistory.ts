import type { Transaction } from '$tripDomain';

export const transactionHistory = (transactions: Array<Transaction>, userId: string) => {
	if (transactions) {
		const history: Array<Transaction> = transactions.map((transaction: Transaction) => {
			return {
				...transaction,
				createdAt: transaction.createdAt.split(' ')[0],
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
