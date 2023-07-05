import type { UserTransactions, Transaction } from '$tripDomain';

export const modifyTransactions = (
	transactions: Array<Transaction>,
	userId: string
): UserTransactions => {
	const nonConfirmed: Array<Transaction> = transactions.filter(
		(transaction: Transaction) => transaction.debtor.userId === userId && !transaction.isConfirmed
	);
	const confirmed: Array<Transaction> = transactions.filter(
		(transaction: Transaction) => transaction.creditor.userId === userId
	);
	return {
		unconfirmedTransactions: nonConfirmed,
		confirmedTransactions: confirmed
	};
};
