import {
	correctToken,
	email,
	emailValid,
	errorCode,
	errorState,
	loading,
	notActivatedAlert,
	notActivatedWorkflow,
	password,
	passwordValid,
	passwordsMatch,
	tokenErrorState,
	tokenValues,
	username,
	usernameValid
} from '$stores';

export function resetLandingPageStore() {
	errorCode.set('');
	errorState.set(false);
	loading.set(false);

	tokenValues.set(['', '', '', '', '', '']);
	correctToken.set(undefined);
	tokenErrorState.set(false);

	username.set('');
	usernameValid.set(false);

	email.set('');
	emailValid.set(false);

	password.set('');
	passwordValid.set(false);
	passwordsMatch.set(false);

	notActivatedAlert.set(false);
	notActivatedWorkflow.set(false);
}
