import type { CostPaidForUser } from '../user/User';
import type { CostCategory } from './CostCategory';

export interface Cost {
	id: string;
	name: string;
	amount: number;
	currency: string;
	creationDate: Date;
	startDate: Date;
	endDate?: Date;
	costCategory: CostCategory;
	paidFor: Array<CostPaidForUser>;
	paidBy: string;
	splitEqually?: boolean;
}

export interface CostDateAsString {
	id: string;
	name: string;
	amount: number;
	currency: string;
	creationDate: Date;
	startDate: string;
	endDate?: string;
	costCategory: CostCategory;
	paidFor: Array<CostPaidForUser>;
	paidBy: string;
	splitEqually?: boolean;
}
export interface CostForNewCosttem {
	id: string;
	name?: string;
	amount?: number;
	currency?: string;
	creationDate: string;
	startDate?: string;
	endDate?: string;
	costCategory?: CostCategory;
	paidFor?: Array<CostPaidForUser>;
	paidBy?: string;
	splitEqually: boolean;
}
