import { tokenExpired } from '$utils';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const token = cookies.get('token');
	const refreshToken = cookies.get('refreshToken');

	if ((token && !tokenExpired(token)) || (refreshToken && !tokenExpired(refreshToken))) {
		// User can authenticate with either token or refresh token
		// which is why we redirect to home page
		throw redirect(303, '/home');
	}
};
