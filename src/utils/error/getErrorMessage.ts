const ERROR_MESSAGES: Record<string, string> = {
	'EM-000': 'An unknown error occurred. Please try again later.',
	'EM-001': 'An upstream service is not available. Please try again later',
	'EM-002': 'An unknown server error occurred. Please try again later',
	'EM-003': 'The requested resource does not exist. Please check the URL.',
	'EM-004':
		'The request could not be completed due to a conflict with the current state of the resource. Contact the support team for help.',
	'EM-005':
		'The request could not be completed due to a bad request. Contact the support team for help.',
	'EM-006':
		'The authentication token used to access the resource is invalid or expired. You are now getting redirected to the login page.',
	'EM-007': 'The provided password is incorrect. Please try again.',
	'EM-008':
		'The request could not be completed due to insufficient permissions of the authenticated user.',
	'EM-009':
		'No user was found with the provided email address. Please check the email address and try again.',
	'EM-010':
		'The targeted trip does not exist or you do not have sufficient permissions to access the resource',
	'EM-011':
		'The targeted cost item does not exist or you do not have sufficient permissions to access the resource',
	'EM-012': 'The registration failed since the email or username you provided is already in use.',
	'EM-013':
		'Your account is not activated yet. Please check your emails and enter the activation code by pressing on the button next to this message.',
	'EM-014': 'The request was processed successfully, but an email could not be sent.',
	'EM-015': 'Your account is already activated. Please log in.',
	'EM-016': 'You already accepted the invitation to this trip.',
	'EM-017': 'The email you provided is already in use.',
	'EM-018': 'The username you provided is already in use.'
};

export function getErrorMessage(expenseErrorCode: string): string {
	if (expenseErrorCode in ERROR_MESSAGES) {
		return ERROR_MESSAGES[expenseErrorCode];
	}

	// This normally cannot happen, but if it does, we are prepared. :)
	return ERROR_MESSAGES['EM-000'];
}
