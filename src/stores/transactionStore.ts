import type { Transaction } from '$tripDomain';
import { writable } from 'svelte/store';

export const currentTransaction = writable<Transaction>({
	transactionId: '',
	amount: '0',
	createdAt: '',
	creditor: {
		userId: '',
		email: '',
		username: ''
	},
	debtor: {
		userId: '',
		email: '',
		username: ''
	},
	isConfirmed: false,
	trip: {
		tripId: '',
		name: '',
		startDate: '',
		endDate: '',
		description: '',
		location: ''
	},
	isDebt: false
});
