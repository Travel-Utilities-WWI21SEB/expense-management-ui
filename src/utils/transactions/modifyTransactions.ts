import type { UserTransactions, Transaction } from '$tripDomain';

export const modifyTransactions = (
	transactions: Array<Transaction>,
	userId: string
): UserTransactions => {
	const nonConfirmed: Array<Transaction> = transactions
		.filter(
			(transaction: Transaction) => transaction.debtor.userId === userId && !transaction.isConfirmed
		)
		.sort((a: Transaction, b: Transaction) => sortByDateDesc(a, b));
	const confirmed: Array<Transaction> = transactions
		.filter(
			(transaction: Transaction) =>
				(transaction.debtor.userId === userId && transaction.isConfirmed) ||
				transaction.creditor.userId === userId
		)
		.sort((a: Transaction, b: Transaction) => sortByDateDesc(a, b))
		.map((transaction: Transaction) => {
			return { ...transaction, isDebt: transaction.debtor.userId === userId ? false : true };
		});
	return {
		unconfirmedTransactions: nonConfirmed,
		confirmedTransactions: confirmed
	};
};

const sortByDateDesc = (a: Transaction, b: Transaction) => {
	const splitDateA = a.createdAt.split(' ');
	const splitDateB = b.createdAt.split(' ');
	const dateA = new Date(splitDateA[0] + 'T' + splitDateA[1] + 'Z');
	const dateB = new Date(splitDateB[0] + 'T' + splitDateB[1] + 'Z');
	return dateB.getTime() - dateA.getTime();
};
