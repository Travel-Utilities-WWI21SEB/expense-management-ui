export const formatCostString = (cost: string): string => {
	// Format total costs to 2 decimal places (e.g. 2325,5 -> 2325,50)
	// We do this by specifying a precision of the length of the integer part + 2 to ensure that the number is rounded to 2 decimal places
	// and then rounding the number to 2 decimal places
	const precisionLength = cost.split('.')[0]?.length ?? 0;
	return Number(parseFloat(cost).toPrecision(precisionLength + 2)).toFixed(2);
};
