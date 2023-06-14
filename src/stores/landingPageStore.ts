import { writable } from 'svelte/store';

// Utility variables
export const errorMessage = writable('');
export const errorState = writable(false);
export const loading = writable(false);

// Token variables
export const tokenValues = writable(['', '', '', '', '', '']);
export const correctToken = writable<boolean | undefined>();
export const tokenErrorState = writable(false);

// Username variables
export const username = writable('');
export const usernameValid = writable(false);

// Email variables
export const email = writable('');
export const emailValid = writable(false);

// Password variables
export const password = writable('');
export const passwordValid = writable(false);
export const passwordsMatch = writable(false);

// Activate account variables
export const notActivatedAlert = writable(false);
export const notActivatedWorkflow = writable(false);
