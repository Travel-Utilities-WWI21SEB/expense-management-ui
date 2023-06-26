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
		const contributors = cost.contributors.map((contributor) => {
			return { ...contributor, amount: Number(contributor.amount) };
		});
		return {
			...cost,
			costCategory,
			startDate: new Date(cost.deductedAt),
			endDate: cost.endDate ? new Date(cost.endDate) : undefined,
			name: cost.description,
			contributors,
			amount: Number(cost.amount)
		};
	});
	return result;
}
