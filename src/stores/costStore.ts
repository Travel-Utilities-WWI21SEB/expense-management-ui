import { writable } from 'svelte/store';
import type { Cost } from '$tripDomain';

export const costDetailsValid = writable(true);
export const costPaidByValid = writable(true);
export const costAllocationValid = writable(true);
export const costSplitType = writable(0);

export const currentCost = writable<Cost>({
	costCategoryId: '',
	costId: '',
	name: '',
	amount: 0,
	currency: 'EUR',
	costCategory: { name: '', totalCost: 0, color: '', icon: '', costCategoryId: '' },
	creationDate: new Date(),
	endDate: new Date(),
	creditor: '',
	contributors: [],
	startDate: new Date()
});
