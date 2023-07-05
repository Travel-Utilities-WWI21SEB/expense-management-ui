// client codeimport { get } from "svelte/store"
import { getRuntimeFromContext } from '@inlang/sdk-js/adapter-sveltekit/client/reactive';
import { get } from 'svelte/store';

const clientFn = (code: string): string => {
	const { i } = getRuntimeFromContext();
	return get(i)(code);
};

export function getErrorMessage(expenseErrorCode: string): string {
	const errorMessage = clientFn(`errors.${expenseErrorCode}`);

	// This normally cannot happen, but if it does, we are prepared. :)
	return errorMessage || clientFn('errors.EM-000') || 'An unknown error occurred.';
}
