export interface Debt {
	debtId: string;
	creditor: DebtUser;
	debtor: DebtUser;
	trip: DebtTrip;
	amount: number;
	currency: string;
	createdAt: string;
	updatedAt: string;
}

export interface DebtUser {
	userId: string;
	username: string;
	email: string;
}

interface DebtTrip {
	tripId: string;
	name: string;
	description: string;
	location: string;
	startDate: string;
	endDate: string;
}

export interface SortedDebts {
	creditorDebts: Array<Debt>;
	debitorDebts: Array<Debt>;
}
