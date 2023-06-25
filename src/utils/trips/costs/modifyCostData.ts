import type { CostCategory, CostFromGet } from '$tripDomain';

export function modifyCosts(costs: Array<CostFromGet>, costCategories: Array<CostCategory>) {
	const result: Array<any> = costs.map((cost: CostFromGet) => {
		const costCategory = costCategories.find((category: CostCategory) => {
			if (category.costCategoryId === cost.costCategoryId) return category;
		});
		return { ...cost, costCategory, startDate: new Date(cost.deductedAt), name: cost.description };
	});
	return result;
}
