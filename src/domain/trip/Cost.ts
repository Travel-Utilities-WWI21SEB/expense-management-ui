import type { CostPaidForUser } from '$userDomain';
import type { CostCategory } from './CostCategory';

export interface Cost {
	costId: string;
	name: string;
	amount: number;
	currency: string;
	creationDate: Date;
	startDate: Date;
	endDate?: Date;
	costCategoryId: string;
	costCategory: CostCategory;
	contributors: Array<CostPaidForUser>;
	creditor: string;
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
	contributors: Array<CostPaidForUser>;
	creditor: string;
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
	contributors?: Array<CostPaidForUser>;
	creditor?: string;
	splitEqually: boolean;
}

export interface CostFromGet {
	costId: string;
	description: string;
	amount: number;
	currency: string;
	creationDate: Date;
	deductedAt: string;
	endDate?: Date;
	costCategoryId: string;
	costCategory: CostCategory;
	contributors: Array<CostPaidForUser>;
	creditor: string;
	splitEqually?: boolean;
}
