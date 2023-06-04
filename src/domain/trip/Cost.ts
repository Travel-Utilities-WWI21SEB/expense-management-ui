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
}
