export function validateAmountPrecision(amount: number): boolean {
	return !(String(amount).split('.')[1]?.length > 2) && amount > 0;
}
