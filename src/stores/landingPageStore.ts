import { writable } from 'svelte/store';

// Registration variables
export const newUser = writable({
	email: '',
	password: '',
	username: ''
});

// Utility variables
export const errorMessage = writable('');
export const errorState = writable(false);
export const loading = writable(false);

// Token variables
export const tokenValues = writable(['', '', '', '', '', '']);
export const correctToken = writable<boolean | undefined>(undefined);
export const tokenErrorState = writable(false);

// Password variables
export const password = writable('');
export const passwordValid = writable(false);
export const passwordsMatch = writable(false);
