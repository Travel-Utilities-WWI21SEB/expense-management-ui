import type { CostDateAsString } from '$tripDomain';

export function validateDetails(cost: CostDateAsString, endDate: boolean): boolean {
	let endDateValid = endDate ? !!cost.endDate : !cost.endDate;
	return cost.name != '' && cost.amount > 0 && endDateValid && cost.costCategory.name != '';
}
