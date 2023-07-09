export interface User {
	userId: string;
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

export interface CostPaidForUserGet {
	username: string;
	amount: string;
	currencyCode: string;
	user?: User;
	checked?: boolean;
}
