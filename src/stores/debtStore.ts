import { writable } from 'svelte/store';
import type { Debt } from '$debtDomain';

export const debtDetailsValid = writable(true);
export const debtPaidByValid = writable(true);
export const debtAllocationValid = writable(true);
export const debtSplitType = writable(0);

export const currentDebt = writable<Debt>({
	deptId: '42eaae07-eda6-471f-997c-713d096737fe',
	creditor: 'Hans',
	debtor: 'Klaus',
	tripId: '20ff0272-75c3-4d7c-b397-12d0bd5551e6',
	amount: 5,
	currency: 'EUR',
	creationDate: new Date('2023-06-25')
});
