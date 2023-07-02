import type { CostDistribution } from './CostDistribution';
import type { TripDistribution } from './TripDistribution';
import type { TripNameToId } from './TripNameToId';

export interface CostOverview {
	totalCosts: string;
	averageTripCosts: string;
	mostExpensiveTrip: TripNameToId;
	leastExpensiveTrip: TripNameToId;
	averageContributionPercentage: string;
	tripDistribution: TripDistribution[];
	costDistribution: CostDistribution[];
}
