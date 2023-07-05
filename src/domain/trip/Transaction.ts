import type { DebtUser } from './Debt';

export interface Transaction {
	transactionId: string;
	amount: string;
	creditor: DebtUser;
	debtor: DebtUser;
	//currencyCode: string;
	isConfirmed: boolean;
	trip: {
		description: string;
		endDate: string;
		location: string;
		name: string;
		startDate: string;
		tripId: string;
	};
}

export interface NewTransaction {
	debtorId: string;
	amount: number;
	currencyCode: string;
}

export interface UserTransactions {
	unconfirmedTransactions: Array<Transaction>;
	confirmedTransactions: Array<Transaction>;
}
