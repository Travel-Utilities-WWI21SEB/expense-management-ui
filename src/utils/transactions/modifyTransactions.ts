import type { UserTransactions, Transaction } from '$tripDomain';

export const modifyTransactions = (
	transactions: Array<Transaction>,
	userId: string
): UserTransactions => {
	const nonConfirmed: Array<Transaction> = transactions.filter(
		(transaction: Transaction) => transaction.debtor.userId === userId && !transaction.isConfirmed
	);
	const confirmed: Array<Transaction> = transactions
		.filter(
			(transaction: Transaction) =>
				(transaction.debtor.userId === userId && transaction.isConfirmed) ||
				transaction.creditor.userId === userId
		)
		.map((transaction: Transaction) => {
			return { ...transaction, isDebt: transaction.debtor.userId === userId ? false : true };
		});
	return {
		unconfirmedTransactions: nonConfirmed,
		confirmedTransactions: confirmed
	};
};
