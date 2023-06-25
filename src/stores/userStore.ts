import { writable } from 'svelte/store';

export const currentUser = writable({ username: '', email: '' });
export const selectedUsers = writable<Array<string>>([]);
export const authToken = writable(null);
