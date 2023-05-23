export interface ChartData {
	labels: Array<string>;
	datasets: Array<{
		data: Array<number>;
		backgroundColor: Array<string>;
	}>;
}

export interface TravelData {
	id: string;
	name: string;
	costcategories: Array<CostCategory>;
	data: ChartData | undefined;
	startDate: Date;
	endDate: Date;
	totalCost: number | undefined;
	location: string;
	participants: Array<User>;
}

export interface User {
	name: string;
}

export interface CostCategory {
	name: string;
	totalAmount: number;
	color: string;
	icon: string;
}

export interface Cost {
	id: string;
	name: string;
	amount: number;
	currency: string;
	creationDate: Date;
	startDate: Date;
	endDate: Date;
	costCategory: CostCategory;
}

export interface CostList extends Cost {
	listDisabled?: boolean;
}
