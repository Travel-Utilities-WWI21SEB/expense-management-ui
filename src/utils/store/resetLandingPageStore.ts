import {
	correctToken,
	email,
	emailValid,
	errorMessage,
	errorState,
	loading,
	password,
	passwordValid,
	passwordsMatch,
	tokenErrorState,
	tokenValues,
	username,
	usernameValid
} from '$stores';

export function resetLandingPageStore() {
	errorMessage.set('');
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
}
