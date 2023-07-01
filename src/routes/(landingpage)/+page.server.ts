import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	const email = cookies.get('email');
	const rememberMe = email ? true : false;

	return { rememberMe, email };
};
