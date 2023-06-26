import type { CostDateAsString } from '$tripDomain';
import { validateAmountPrecision } from './amount';

export function validateDetails(cost: CostDateAsString, endDate: boolean): boolean {
	const endDateValid = endDate
		? Boolean(cost.endDate) && isEndDateAfterStartDate(cost.startDate, cost.endDate)
		: !cost.endDate || cost.endDate === cost.startDate;
	return (
		cost.name !== '' &&
		validateAmountPrecision(cost.amount) &&
		cost.amount > 0 &&
		endDateValid &&
		cost.costCategory.costCategoryId !== ''
	);
}

function isEndDateAfterStartDate(startDate: string, endDate: string | undefined): boolean {
	return endDate ? new Date(startDate) < new Date(endDate) : false;
}
