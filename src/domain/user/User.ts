export interface User {
	username: string;
	presenceStartDate: Date;
	presenceEndDate: Date;
	hasAcceptedInvite: boolean;
}

export interface CostPaidForUser {
	username: string;
	amount: number;
	currencyCode: string;
	user?: User;
	checked?: boolean;
}
