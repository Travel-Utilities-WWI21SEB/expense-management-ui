export interface Transaction {
	debtorId: string;
	amount: string;
	currencyCode: string;
}

export interface NewTransaction {
	debtorId: string;
	amount: number;
	currencyCode: string;
}
