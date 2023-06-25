import type { User } from '$userDomain';
import type { ChartData } from './ChartData';
import type { CostCategory } from './CostCategory';

export interface TravelData {
	tripId: string;
	name: string;
	description: string;
	costCategories: Array<CostCategory>;
	data?: ChartData;
	startDate: Date;
	endDate: Date;
	totalCost?: number;
	location: string;
	participants: Array<User>;
	userDept?: number;
	userCredit?: number;
	hasAcceptedInvite?: boolean;
}

export interface BackendTripType {
	tripId: string;
	name: string;
	description: string;
	startDate: string;
	participants: Array<User>;
	endDate: string;
	userDept: number;
	userCredit: number;
	location: string;
}

export interface NewTripInputs {
	name: string;
	startDate: string;
	endDate: string;
	location: string;
}
