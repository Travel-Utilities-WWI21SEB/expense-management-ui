export interface ChartData {
    labels: Array<string>,
    datasets: Array<
        {
            data: Array<number>,
            backgroundColor: Array<string>
        }
    >
}

export interface TravelData {
    id: string
    name: string,
    costcategories: Array<Costcategories>,
    data: ChartData | undefined,
    startDate: Date,
    endDate: Date,
    totalCost: number | undefined,
    location: string
}

export interface Costcategories {
    name: string,
    amount: number,
    color: string
}