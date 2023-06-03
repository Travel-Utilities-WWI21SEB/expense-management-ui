import { writable } from 'svelte/store';

export const currentUserId = writable(null);
export const authToken = writable(null);
