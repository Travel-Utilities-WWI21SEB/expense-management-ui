/**
 * @type { import("@inlang/core/config").DefineConfig }
 */
export async function defineConfig(env) {
	const { default: pluginJson } = await env.$import(
		'https://cdn.jsdelivr.net/npm/@inlang/plugin-json@3/dist/index.js'
	);

	// recommended to enable linting feature
	const { default: standardLintRules } = await env.$import(
		'https://cdn.jsdelivr.net/gh/inlang/standard-lint-rules@2/dist/index.js'
	);

	const { default: sdkPlugin } = await env.$import(
		'https://cdn.jsdelivr.net/npm/@inlang/sdk-js-plugin@0.8.1/dist/index.js'
	);

	return {
		referenceLanguage: 'en',
		plugins: [
			pluginJson({
				pathPattern: './languages/{language}.json'
			}),
			standardLintRules(),
			sdkPlugin({
				languageNegotiation: {
					strategies: [{ type: 'localStorage' }]
				}
			})
		]
	};
}
