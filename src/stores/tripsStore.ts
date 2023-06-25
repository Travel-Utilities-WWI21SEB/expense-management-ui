import { writable } from 'svelte/store';
import type { TravelData, NewTripInputs } from '$tripDomain';

const testTravelData: Array<TravelData> = [
	{
		tripId: 'ABCD-01',
		name: 'Die epische Reise',
		costCategories: [
			{ name: 'Food', totalAmount: 100, color: '#F7464A', icon: 'unicode', id: '1' },
			{ name: 'Real Estate', totalAmount: 400, color: '#949FB1', icon: 'unicode', id: '2' },
			{ name: 'Mobility', totalAmount: 200, color: '#46BFBD', icon: 'unicode' , id: '3'},
		],

		data: undefined,
		endDate: new Date('2023-07-12'),
		startDate: new Date('2023-06-12'),
		totalCost: undefined,
		location: 'Palo Alto',
		participants: [
			{
				username: 'Aidan Zimmer',
				hasAcceptedInvite: true,
				presenceEndDate: new Date('2024-09-12'),
				presenceStartDate: new Date('2022-09-12')
			},
			{
				username: 'Johanna Deike',
				hasAcceptedInvite: true,
				presenceEndDate: new Date('2024-09-12'),
				presenceStartDate: new Date('2022-09-12')
			},
			{
				username: 'Kevin Rieger',
				hasAcceptedInvite: true,
				presenceEndDate: new Date('2024-09-12'),
				presenceStartDate: new Date('2022-09-12')
			},
			{
				username: 'lisa Reß-Park',
				hasAcceptedInvite: true,
				presenceEndDate: new Date('2024-09-12'),
				presenceStartDate: new Date('2022-09-12')
			},
			{
				username: 'Luca Chmielarski',
				hasAcceptedInvite: true,
				presenceEndDate: new Date('2024-09-12'),
				presenceStartDate: new Date('2022-09-12')
			}
		],
		userDept: 200,
		userGets: 120
	},
	{
		tripId: 'ZYX-99',
		name: 'Die guten alten Zeiten',
		costCategories: [],

		data: undefined,
		endDate: new Date('2024-04-02'),
		startDate: new Date('2024-03-19'),
		totalCost: undefined,
		location: 'Vals Schweiz',
		participants: [
			{
				username: 'Aidan Zimmer',
				hasAcceptedInvite: true,
				presenceEndDate: new Date('2024-09-12'),
				presenceStartDate: new Date('2022-09-12')
			},
			{
				username: 'Johanna Deike',
				hasAcceptedInvite: true,
				presenceEndDate: new Date('2024-09-12'),
				presenceStartDate: new Date('2022-09-12')
			}
		],
		userDept: undefined,
		userGets: undefined
	}
];

export const allTrips = writable<Array<TravelData>>(testTravelData);

export const currentTrip = writable<TravelData>();

export const newTripForm = writable<NewTripInputs>({
	name: '',
	location: '',
	startDate: new Date(Date.now()).toISOString().substring(0, 10),
	endDate: new Date(Date.now()).toISOString().substring(0, 10)
});
