import type { User } from '$userDomain';
import type { ChartData } from './ChartData';
import type { CostCategory } from './CostCategory';

export interface TravelData {
	tripId: string;
	name: string;
	costCategories: Array<CostCategory>;
	data?: ChartData;
	startDate: Date;
	endDate: Date;
	totalCost?: number;
	location: string;
	participants: Array<User>;
	userDept?: number;
	userGets?: number;
	hasAcceptedInvite?: boolean;
}

export interface NewTripInputs {
	name: string;
	startDate: string;
	endDate: string;
	location: string;
}
