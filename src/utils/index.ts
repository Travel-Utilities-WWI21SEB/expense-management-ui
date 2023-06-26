export { calculateDate, calculateTomorrowForInputFormat } from './date/calculateDate';
export { pickTextColorBasedOnBgColorSimple } from './color/color';
// ERROR HANDLING
export { getErrorMessage } from './error/getErrorMessage';
// CLIPBOARD FORM UTILS
export { keydownHandler, pasteHandler } from './form/clipboardUtils';
export { resetLandingPageStore } from './store/resetLandingPageStore';
// AUTHENTICATION
export { tokenExpired } from './token/tokenExpired';
export { modifyTripData, modifyTrip } from './trips/modifyTripData';
export { modifyUserSuggestions } from './trips/modifyUserSuggestions';
// VALIDATORS
export { validateEmail } from './validation/validateEmail';
export { validatePassword } from './validation/validatePassword';
export { validatePasswordsMatch } from './validation/validatePasswordsMatch';
export { validateUsername } from './validation/validateUsername';

// VALIDATOR COST_POINT
export { validateCostAllocation, isSplitEqually } from './trips/costs/costAllocation';
export { validatePaidBy } from './trips/costs/paidBy';
export { validateDetails } from './trips/costs/costDetails';
export { validateAmountPrecision } from './trips/costs/amount';

//COST
export { changeToEqual, deselectAllPeople, selectAllPeople } from './trips/costs/costAllocation';
export { modifyCosts } from './trips/costs/modifyCostData';
