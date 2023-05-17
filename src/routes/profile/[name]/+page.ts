export function load({ params }) {
	return {
		props: {
			name: params.name,
			email: 'test-email@domain.com'
		}
	};
}
