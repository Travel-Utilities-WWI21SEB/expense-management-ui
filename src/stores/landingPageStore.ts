import { writable } from 'svelte/store';

export const newUser = writable({
	email: '',
	password: '',
	username: ''
});

export const errorMessage = writable('');
export const errorState = writable(false);
export const loading = writable(false);
