const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = environment => {
	const isProd = 'production'.indexOf(environment) !== -1;
	return {
		entry: path.join(__dirname, 'src', 'index.tsx'),
		output: {
			filename: 'bundle.js',
			path: path.join(__dirname, 'dist')
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
			alias: {
				api: path.join(__dirname, 'src', 'api'),
				assets: path.join(__dirname, 'src', 'assets'),
				config: path.join(__dirname, 'src', 'config'),
				containers: path.join(__dirname, 'src', 'containers'),
				components: path.join(__dirname, 'src', 'components'),
				models: path.join(__dirname, 'src', 'models'),
				services: path.join(__dirname, 'src', 'services'),
				style: path.join(__dirname, 'src', 'style')
			}
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx|js)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env', '@babel/preset-react']
							}
						},
						{
							loader: 'ts-loader'
						}
					]
				},
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'source-map-loader',
					exclude: [
						// instead of /\/node_modules\//
						path.join(process.cwd(), 'node_modules')
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'assets/[hash].[ext]'
							}
						}
					]
				}
			].concat(
				isProd
					? []
					: //Run tslint through code in dev environment
					  [
							{
								test: /\.(ts|tsx)/,
								exclude: /node_modules/,
								use: [{ loader: 'tslint-loader' }]
							}
					  ]
			)
		},
		plugins: [
			new HtmlWebpackPlugin(
				Object.assign(
					{
						filename: 'index.html',
						template: path.join(__dirname, 'src', 'index.html'),
						minify: isProd
							? {
									collapseInlineTagWhitespace: true,
									collapseWhitespace: true,
									sortAttributes: true,
									sortClassName: true
							  }
							: false
					},
					isProd ? { filename: path.join(__dirname, 'dist', 'index.html') } : null
				)
			),
			new FaviconsWebpackPlugin('./src/assets/favicon.png')
		].concat(
			//Enable HMR in dev environment
			isProd ? [] : [new webpack.HotModuleReplacementPlugin()]
		),
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			publicPath: '/',
			hot: true,
			port: 8000,
			stats: {
				color: true
			}
		}
	};
};
