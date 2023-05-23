import type { User } from '$userDomain';
import type { ChartData } from './ChartData';
import type { CostCategory } from './CostCategory';

export interface TravelData {
	id: string;
	name: string;
	costCategories: Array<CostCategory>;
	data: ChartData | undefined;
	startDate: Date;
	endDate: Date;
	totalCost: number | undefined;
	location: string;
	participants: Array<User>;
}
