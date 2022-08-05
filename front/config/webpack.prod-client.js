const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

// const smp = new SpeedMeasurePlugin();

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath).filter(function (file) {
			return fs.statSync(path.join(srcpath, file)).isDirectory();
	});
}

var entry = {
	vendor: ['react', 'react-dom'],
	main: ['./main.js'],
	commonCss: './assets/scss/styles.scss',
	vendorCss: './assets/scss/vendor/styles.scss',
};

module.exports = {
	name: 'client',
	context: path.resolve(__dirname, '../src'),
	entry,
	mode: 'production',
	output: {
		filename: '[name]-bundle.[hash].js',
		path: path.resolve(__dirname, '../buildClient'),
		publicPath: '/',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
					minChunks: 2,
				},
				default: false,
			},
		},
		minimize: true,
	// 	minimizer: [
	// 		new OptimizeCssAssetsPlugin({}),
	// 		new TerserPlugin({
	// 				terserOptions: {
	// 						// compress: {
	// 						//     drop_console: true,
	// 						// },
	// 						// extractComments: 'all',
	// 						cache: true,
	// 						parallel: true,
	// 				},
	// 		}),
	// ],

	},
	resolve: {
		symlinks: false,
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.scss'],
	},

module: {
  rules: [
    {
			test: /\.js$/,
			
			exclude: /(node_modules|bower_components|public\/)/,
      use: [
				'cache-loader',
        {
					loader: 'babel-loader',
					options: {

						cacheDirectory: true,
					},
					// query: {compact: true},
        },
      ],
    },

		{
			test: /\.tsx?$/,
			loader: 'ts-loader',
			// include: path.resolve(__dirname, '../src'),
			exclude: [/(node_modules|bower_components|public\/)/],
			options: {
				// happyPackMode: true,
				transpileOnly: true,
			},
		},
    {
			test: /\.(sa|sc|c)ss$/,
			exclude: /(node_modules|bower_components|public\/)/,
      use: [
				ExtractCssChunks.loader,
				'cache-loader',
          {
							loader: 'fast-css-loader',
              options: {
									importLoaders: 2,
									modules: false,
									sourceMap: false,
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
		test: /\.(ico)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          esModule: false,
          name: "favicon.ico",
        },
      },
    ],
  },
  {
		test: /\.(jpg|svg|png|ico|gif)$/i,
		exclude: /(node_modules|bower_components\/)/,
    use: [
      {
        loader: "file-loader",
        options: {
          esModule: false,
          name: "/images/[name].[ext]&limit=1024",
        },
      },
    ],
  },
  {
		test: /\.(eot|otf|woff|woff2|ttf)$/,
		exclude: /(node_modules|bower_components\/)/,
    use: [
      {
        loader: "file-loader",
        options: {
          esModule: false,
					name: "[name].[ext]&limit=1024",
					outputPath: '/fonts',
					publicPath: './../fonts',
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
				NODE_APP: JSON.stringify('production'),
        SERVICE_WORKER: JSON.stringify('sw.js?' + Date.now()),
			},
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new ExtractCssChunks({
			filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
		}),
		
		// new OptimizeCssAssetsPlugin({
		// 	assetNameRegExp: /\.css$/g,
		// 	cssProcessor: require('cssnano'),
		// 	cssProcessorOptions: { discardComments: { removeAll: true } },
		// 	canPrint: true,
		// }),
		
		// new webpack.optimize.ModuleConcatenationPlugin(),
		// new webpack.NoEmitOnErrorsPlugin(),
		// new webpack.HashedModuleIdsPlugin() ,// not needed for strategy to work (just good practice)
		// new webpack.optimize.OccurrenceOrderPlugin(),

		
		// new CompressionPlugin({
		// 	algorithm: 'gzip',
		// 	threshold: 10240,
		// 	minRatio: 0.8,
		// }),
		// new BrotliPlugin({
		// 	threshold: 10240,
		// 	minRatio: 0.8,
		// }),
		
		// new BundleAnalyzerPlugin(),
	],
};