import { writable } from 'svelte/store';
import type { TravelData } from '$tripDomain';

const testTravelData: Array<TravelData> = [
	{
		id: 'ABCD-01',
		name: 'Die epische Reise',
		costCategories: [
			{ name: 'Food', totalAmount: 100, color: '#F7464A', icon: 'unicode' },
			{ name: 'Real Estate', totalAmount: 400, color: '#949FB1', icon: 'unicode' },
			{ name: 'Mobility', totalAmount: 200, color: '#46BFBD', icon: 'unicode' }
		],

		data: undefined,
		endDate: new Date('2023-07-12'),
		startDate: new Date('2023-06-12'),
		totalCost: undefined,
		location: 'Palo Alto',
		participants: [
			{ name: 'Aidan Zimmer', userId: 'ljahvdöas' },
			{ name: 'Johanna Deike', userId: 'alsbvas' },
			{ name: 'Kevin Rieger', userId: 'öaksjdbv' },
			{ name: 'lisa Reß-Park', userId: 'aöksdjvöa' },
			{ name: 'Luca Chmielarski', userId: 'AIUNC)Q' }
		],
		userDept: 200,
		userGets: 120
	},
	{
		id: 'ZYX-99',
		name: 'Die guten alten Zeiten',
		costCategories: [
			{ name: 'Food', totalAmount: 150, color: '#F7464A', icon: 'unicode' },
			{ name: 'Real Estate', totalAmount: 500, color: '#949FB1', icon: 'unicode' },
			{ name: 'Mobility', totalAmount: 250, color: '#46BFBD', icon: 'unicode' },
			{ name: 'Skiing', totalAmount: 350, color: '#D3D3D3', icon: 'unicode' }
		],

		data: undefined,
		endDate: new Date('2024-04-02'),
		startDate: new Date('2024-03-19'),
		totalCost: undefined,
		location: 'Vals Schweiz',
		participants: [
			{ name: 'Aidan Zimmer', userId: 'ljahvdöas' },
			{ name: 'Johanna Deike', userId: 'alsbvas' }
		],
		userDept: 300,
		userGets: 50
	}
];

export const allTrips = writable<Array<TravelData>>(testTravelData);

export const currentTrip = writable<TravelData>();
