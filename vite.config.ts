import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: path.resolve('./src/components'),
			$icons: path.resolve('./src/icons'),
			$stores: path.resolve('./src/stores'),
			$utils: path.resolve('./src/utils'),
			$tripDomain: path.resolve('./src/domain/trip'),
			$userDomain: path.resolve('./src/domain/user')
		}
	}
});
