import { writable } from 'svelte/store';
import type { TravelData, NewTripInputs } from '$tripDomain';

export const allTrips = writable<Array<TravelData>>();

export const currentTrip = writable<TravelData>();

export const newTripForm = writable<NewTripInputs>({
	name: '',
	location: '',
	startDate: new Date(Date.now()).toISOString().substring(0, 10),
	endDate: new Date(Date.now()).toISOString().substring(0, 10)
});

export const newCostCategories = writable<Array<string>>();
export const newCostCategoryColors = writable<Array<string>>();
