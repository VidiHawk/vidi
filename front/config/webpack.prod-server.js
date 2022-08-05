const path = require('path');
const webpack = require('webpack');
const externals = require('./node-externals');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

// const smp = new SpeedMeasurePlugin();

module.exports = {
	name: 'server',
	target: 'node',
	externals,
	entry: './src/server/render.js',
	mode: 'production',
	output: {
		filename: 'prod-server-bundle.js',
		path: path.resolve(__dirname, '../buildServer'),
		libraryTarget: 'commonjs2',
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, '../src'),
	],
		extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css'],
	},
	module: {
		rules: [
			{
    
				test: /\.js$/,
				// exclude: [/(node_modules|bower_components|public\/)/],
				exclude: /(node_modules|bower_components)/,
				include: path.resolve(__dirname, '../src'),
				use: [
					{
						loader: 'babel-loader',
						query: {compact: true},
					},
				],
			},

			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				include: path.resolve(__dirname, '../src'),
				exclude: /(node_modules|bower_components)/,
				// exclude: [/(node_modules|bower_components|public\/)/],
				options: {
					// happyPackMode: true,
					transpileOnly: true,
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				include: path.resolve(__dirname, '../src'),
				exclude: /(node_modules|bower_components)/,
				use: [
						{
								loader: 'fast-css-loader',
								options: {
										importLoaders: 2,
										sourceMap: false,
										modules: {
											mode: 'local',
										},
								},
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: false,
								postcssOptions: {
									config: true,
									ident: "postcss",
								},
							},
						},
						{
							loader: 'fast-sass-loader',
							options: {
									sourceMap: false,
							},
					},
				],
		},
		{
			test: /\.(jpg|svg|png|ico|gif|jpeg)$/i,
			use: [
				{
					loader: "file-loader",
					options: {
						esModule: false,
						name: "/images/[name].[ext]&limit=1024",
						emitFile: false,
					},
				},
			],
		},
		{
			test: /\.(eot|otf|woff|woff2|ttf)$/,
			use: [
				{
					loader: "file-loader",
					options: {
						esModule: false,
						name: "/fonts/[name].[ext]&limit=1024",
						emitFile: false,
					},
				},
			],
		},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				// WEBPACK: true,
				NODE_APP: JSON.stringify('production'),
        // SERVICE_WORKER: JSON.stringify('sw.js?' + Date.now()),
			},
		}),
		// new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(),
		
		// new webpack.LoaderOptionsPlugin( { minimize: true, debug: false } ),
		
		// new OptimizeCssnanoPlugin({
		// 	cssnanoOptions: {
		// 		preset: [
		// 			'default',
		// 			{
		// 				discardComments: {
		// 					removeAll: true,
		// 				},
		// 			},
		// 		],
		// 	},
		// }),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new webpack.HashedModuleIdsPlugin(),
	],
};
