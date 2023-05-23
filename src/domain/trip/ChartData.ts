export interface ChartData {
	labels: Array<string>;
	datasets: Array<{
		data: Array<number>;
		backgroundColor: Array<string>;
	}>;
}
