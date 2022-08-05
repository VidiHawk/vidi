const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	name: "client",
	entry: {
		vendor: ["react", "react-dom"],
		main: [
			"react-hot-loader/patch",
			"@babel/runtime/regenerator",
			"webpack-hot-middleware/client?reload=true",
			"./src/main.js",
		],
		commonCss: './src/assets/scss/styles.scss',
		vendorCss: './src/assets/scss/vendor/styles.scss',
	},
	mode: "development",
	devtool: "inline-source-map",
	cache: false,
	output: {
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
		path: path.resolve(__dirname, "../buildClient"),
		publicPath: "/",
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
					"css-hot-loader",
					{
            loader: ExtractCssChunks.loader,
            options: {
              hot: true,
              reloadAll: true,
            },
          },
						{
								loader: 'css-loader',
								options: {
									modules: false,
									importLoaders: 2,
								},
						},
						
						{
							loader: "postcss-loader",
							options: {
								sourceMap: true,
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
			test: /\.(jpg|svg|png|ico|gif|jpeg)$/i,
			use: [
				{
					loader: "file-loader",
					options: {
						esModule: false,
						name: "images/[name].[ext]&limit=1024",
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
						name: "fonts/[name].[ext]&limit=1024",
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
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new WriteFilePlugin(),
		new ExtractCssChunks({
			filename: "[name].css",
			chunkFilename: "[name].css",
			hot: true,
		}),

		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
				WEBPACK: true,
			},
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: "./**", to: "./", context: "./public" }],
		}),
		// new BundleAnalyzerPlugin({
		// 	analyzerPort:8899,
		// }),
	],
};
