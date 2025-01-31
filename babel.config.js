module.exports = api => {
	api.cache.using(() => process.env.NODE_ENV)

	const presets = [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-env', '@babel/preset-typescript']
	const plugins = [
		'@babel/transform-runtime',
		[
			'babel-plugin-styled-components',
			{
				pure: true
			}
		],
		api.env('development') && 'react-refresh/babel'
	]

	return {
		presets,
		plugins
	}
}
