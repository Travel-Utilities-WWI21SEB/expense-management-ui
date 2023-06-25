import type { CostCategory, CostFromGet } from '$tripDomain';

export function modifyCosts(costs: Array<CostFromGet>, costCategories: Array<CostCategory>) {
	const result = costs.map((cost: CostFromGet) => {
		const costCategory = costCategories.find((category: CostCategory) => {
			if (category.costCategoryId === cost.costCategoryId) {
				return category;
			} else {
				return undefined;
			}
		});
		return { ...cost, costCategory, startDate: new Date(cost.deductedAt), name: cost.description };
	});
	return result;
}
