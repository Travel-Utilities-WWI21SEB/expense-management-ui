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

export interface CostCategory {
    name: string;
    color: string;
    icon: string;
}
