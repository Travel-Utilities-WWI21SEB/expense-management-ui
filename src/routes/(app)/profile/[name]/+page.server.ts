import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	return {
		props: {
			name: params.name,
			email: 'test-email@domain.com'
		}
	};
};
