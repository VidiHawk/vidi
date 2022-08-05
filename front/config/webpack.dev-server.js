const path = require("path");
const webpack = require("webpack");
const externals = require("./node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built

module.exports = {
	name: "server",
	target: "node",
	devtool: 'source-map',
	externals,
	entry: "./src/server/render.js",
	mode: "development",
	output: {
		filename: "dev-server-bundle.js",
		path: path.resolve(__dirname, "../buildServer"),
		libraryTarget: "commonjs2",
	},
	stats: {
		colors: false,
		hash: true,
		timings: true,
		assets: true,
		chunks: true,
		chunkModules: true,
		modules: true,
		children: true,
},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
					},
				],
			},
			{
				test: /\.tsx?$/,
				loader: [
					"babel-loader",
					{
						loader: "awesome-typescript-loader",
						options: {
							useCache: true,
						},
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
						{
								loader: 'css-loader',
								options: {
									modules: false,
								},
						},
						
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									config: true,
									ident: "postcss",
								},
							},
						},
						{
							loader: 'sass-loader',
							options: {
									sourceMap: false,
							},
					},
				],
		},
		{
			test: /\.(jpg|svg|png|ico|gif)$/i,
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
	resolve: {
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
		extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".scss"],
	},
	plugins: [
		new WriteFilePlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
			},
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./**", to: "./", context: "./public" },
			],
		}),
	],
};
