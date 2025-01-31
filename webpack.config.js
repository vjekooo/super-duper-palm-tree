const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const presetConfig = require('./build-utils/loadPresets')
const commonPaths = require('./build-utils/common-paths')
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
	return merge(
		{
			mode,
			entry: {
				vendor: ['react', 'react-dom']
			},
			output: {
				path: commonPaths.outputPath
			},
			resolve: {
				alias: {
					lib: path.resolve(__dirname, 'src/lib'),
					components: path.resolve(__dirname, 'src/components'),
					routes: path.resolve(__dirname, 'src/routes')
				},
				extensions: ['.ts', '.tsx', '.js', '.json']
			},
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						include: commonPaths.appEntry,
						use: 'babel-loader'
					},
					{
						test: /\.json$/,
						use: 'json',
						include: commonPaths.appEntry
					},
					{
						test: /\.(gif|png|jpe?g|svg)$/i,
						include: `${commonPaths.appEntry}/images`,
						use: [
							{
								loader: 'file-loader',
								options: {
									name: 'images/[hash:8]-[name].[ext]'
								}
							},
							{
								loader: 'image-webpack-loader',
								options: {
									mozjpeg: {
										progressive: true,
										quality: 70
									},
									optipng: {
										optimizationLevel: 7
									},
									pngquant: {
										quality: '65-90',
										speed: 4
									},
									gifsicle: {
										interlaced: false
									}
								}
							}
						]
					}
				]
			},
			plugins: [
				new HtmlWebpackPlugin({
					title: 'Noice',
					template: 'public/index.html',
					favicon: 'public/favicon.ico'
				}),
				new webpack.ProgressPlugin()
			]
		},
		modeConfig(mode),
		presetConfig({ mode, presets })
	)
}
