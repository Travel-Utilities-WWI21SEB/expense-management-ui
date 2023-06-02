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
			{ name: 'Aidan Zimmer' },
			{ name: 'Johanna Deike' },
			{ name: 'Kevin Rieger' },
			{ name: 'lisa Reß-Park' },
			{ name: 'Luca Chmielarski' }
		],
		userDept: 200,
		userGets: 120
	},
	{
		id: 'ZYX-99',
		name: 'Die guten alten Zeiten',
		costCategories: [],

		data: undefined,
		endDate: new Date('2024-04-02'),
		startDate: new Date('2024-03-19'),
		totalCost: undefined,
		location: 'Vals Schweiz',
		participants: [{ name: 'Aidan Zimmer' }, { name: 'Johanna Deike' }],
		userDept: undefined,
		userGets: undefined
	}
];

export const allTrips = writable<Array<TravelData>>(testTravelData);

export const currentTrip = writable<TravelData>();
