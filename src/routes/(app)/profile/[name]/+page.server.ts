import type { PageServerLoad } from './$types';

export const load = (({ params }) => {
	return {
		props: {
			name: params.name,
			email: 'test-email@domain.com'
		}
	};
}) satisfies PageServerLoad;
