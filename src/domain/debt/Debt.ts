export interface Debt {
	deptId: string;
	creditor: string;
	debtor: string;
	tripId: string;
	amount: number;
	currency: string;
	creationDate: Date;
	updateDate?: Date;
}
