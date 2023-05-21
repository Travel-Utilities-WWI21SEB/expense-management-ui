export interface chartData {
    labels: Array<string>,
    datasets: Array<
        {
            data: Array<number>,
            backgroundColor: Array<string>
        }
    >
}

export interface travelData {
    name: string,
    costcategories: Array<costcategories>,
    data: chartData | undefined,
    startDate: Date,
    endDate: Date,
    totalCost: number | undefined,
    location: string
}

export interface costcategories {
    name: string,
    amount: number,
    color: string
}