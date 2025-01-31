const TerserPlugin = require('terser-webpack-plugin')
const commonPaths = require('./common-paths')

module.exports = env => ({
	mode: env.mode,
	entry: {
		app: [`${commonPaths.appEntry}/index.tsx`]
	},
	output: {
		filename: 'js/[name].[contenthash].js'
	},
	module: {
		rules: []
	},
	devtool: 'source-map',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true
			})
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: 'vendor',
					name: 'vendor',
					enforce: true
				}
			}
		}
	}
})
