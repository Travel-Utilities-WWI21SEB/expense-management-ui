export const load = async ({ cookies }) => {
	const email = cookies.get('email');
	const rememberMe = email ? true : false;

	return { rememberMe, email };
};
