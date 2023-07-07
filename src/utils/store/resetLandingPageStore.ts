import {
	correctToken,
	email,
	emailValid,
	errorCode,
	errorState,
	firstName,
	lastName,
	loading,
	location,
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
import { birthDate } from '../../stores/landingPageStore';

export function resetLandingPageStore() {
	errorCode.set('');
	errorState.set(false);
	loading.set(false);

	tokenValues.set(['', '', '', '', '', '']);
	correctToken.set(undefined);
	tokenErrorState.set(false);

	username.set('');
	usernameValid.set(false);

	firstName.set('');
	lastName.set('');
	location.set('');
	birthDate.set('');

	email.set('');
	emailValid.set(false);

	password.set('');
	passwordValid.set(false);
	passwordsMatch.set(false);

	notActivatedAlert.set(false);
	notActivatedWorkflow.set(false);
}
