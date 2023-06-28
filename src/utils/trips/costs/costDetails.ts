import type { CostDateAsString } from '$tripDomain';
import { isEndDateAfterStartDate } from '../../date/calculateDate';
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
