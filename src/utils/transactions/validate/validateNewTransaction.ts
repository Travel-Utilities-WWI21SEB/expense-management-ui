import type { NewTransaction } from '$tripDomain';
import { validateAmountPrecision } from '../../trips/costs/amount';

export const validateNewTransaction = (transaction: NewTransaction): boolean => {
	return (
		transaction.amount > 0 &&
		validateAmountPrecision(transaction.amount) &&
		transaction.currencyCode !== '' &&
		transaction.debtorId !== ''
	);
};
