export interface User {
	name: string;
	userId: string;
}

export interface CostPaidForUser {
	userId: string;
	amount: number;
	currencyCode: string;
	user?: User;
	checked?: boolean;
}
