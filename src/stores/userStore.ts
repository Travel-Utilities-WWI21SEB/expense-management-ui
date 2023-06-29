import { writable } from 'svelte/store';

export const currentUser = writable({ username: '', email: '' });
export const authToken = writable(null);
