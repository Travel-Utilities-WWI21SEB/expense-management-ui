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
	userDebt: number;
	userCredit: number;
	hasAcceptedInvite?: boolean;
}

export interface TravelDataAPI {
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
	userDebt: string;
	userCredit: string;
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

export interface NameExistsInterface {
	id?: string;
	name: string;
	isNew: boolean;
}
