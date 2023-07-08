import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],
	// this shit is annoying as hell
	onwarn: (warning, handler) => {
		if (warning.code.includes('a11y')) {
			return;
		}
		handler(warning);
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			precompress: true
		}),
		alias: {
			$components: './src/components',
			$icons: './src/icons',
			$stores: './src/stores',
			$utils: './src/utils',
			$tripDomain: './src/domain/trip',
			$userDomain: './src/domain/user',
			$costDomain: './src/domain/cost'
		}
	}
};

export default config;
