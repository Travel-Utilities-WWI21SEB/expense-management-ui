export { pickTextColorBasedOnBgColorSimple } from './color/color';
export {
	calculateDate,
	calculateTomorrowForInputFormat,
	isEndDateAfterStartDate
} from './date/calculateDate';
// ERROR HANDLING
export { getErrorMessage } from './error/getErrorMessage';
// CLIPBOARD FORM UTILS
export { keydownHandler, pasteHandler } from './form/clipboardUtils';
export { resetLandingPageStore } from './store/resetLandingPageStore';
// AUTHENTICATION
export { tokenExpired } from './token/tokenExpired';
export { modifyTrip, modifyTripData } from './trips/modifyTripData';
export { modifyUserSuggestions } from './trips/modifyUserSuggestions';
// VALIDATORS
export { validateEmail } from './validation/validateEmail';
export { validatePassword } from './validation/validatePassword';
export { validatePasswordsMatch } from './validation/validatePasswordsMatch';
export { validateUsername } from './validation/validateUsername';

// VALIDATOR COST_POINT
export { validateAmountPrecision } from './trips/costs/amount';
export { isSplitEqually, validateCostAllocation } from './trips/costs/costAllocation';
export { validateDetails } from './trips/costs/costDetails';
export { validatePaidBy } from './trips/costs/paidBy';

//COST
export { generateRandomColor } from './color/generateRandomColor';
export {
	calculateRestAmount,
	changeToEqual,
	deselectAllPeople,
	selectAllPeople
} from './trips/costs/costAllocation';
export { modifyCosts } from './trips/costs/modifyCostData';
