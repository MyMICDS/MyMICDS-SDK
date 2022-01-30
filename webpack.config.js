/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpackRxjsExternals = require('webpack-rxjs-externals');

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	target: 'web',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		library: {
			name: 'MyMICDS',
			type: 'umd'
		},
		filename: 'umd.js',
		path: path.resolve(__dirname, 'dist')
	},
	externals: [webpackRxjsExternals()]
};
