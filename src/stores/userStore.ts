import { writable } from 'svelte/store';

export const currentUserId = writable(null);
export const authToken = writable(null);

// ONLY RELEVANT FOR REGISTERING NEW USERS
export const newUser = writable({
	email: '',
	password: '',
	username: ''
});
