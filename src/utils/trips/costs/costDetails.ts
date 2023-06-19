import type { CostDateAsString } from '$tripDomain';
import { validateAmountPrecision } from '$utils';

export function validateDetails(cost: CostDateAsString, endDate: boolean): boolean {
	const endDateValid = endDate ? !!cost.endDate : !cost.endDate;
	return (
		cost.name != '' &&
		validateAmountPrecision(cost.amount) &&
		cost.amount > 0 &&
		endDateValid &&
		cost.costCategory.name != ''
	);
}
