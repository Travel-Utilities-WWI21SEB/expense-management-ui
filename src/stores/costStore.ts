import { writable } from 'svelte/store';
import type { CostPaidForUser } from '$userDomain';

export const costDetailsValid = writable(true);
export const costPaidByValid = writable(true);
export const costAllocationValid = writable(true);
export const costSplitType = writable(0);
