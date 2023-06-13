import type { PageServerLoad } from './$types';

export const load = (() => {
	return {
		message: 'Test'
	};
}) satisfies PageServerLoad;
