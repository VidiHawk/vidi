import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from 'path'
const server = express();

const expressStaticGzip = require("express-static-gzip");
// const shrinkRay = require('shrink-ray-current');
import webpack from "webpack";

import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import config from "../config/index"

import configDevClient from "../../config/webpack.dev-client.js";
import configDevServer from "../../config/webpack.dev-server.js";
import configProdClient from "../../config/webpack.prod-client.js";
import configProdServer from "../../config/webpack.prod-server.js";

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const configProdClient2 = require('../../config/webpack.prod-client.js');
const configProdServer2 = require('../../config/webpack.prod-server.js');

// const outputPath = configProdClient.output.path
const outputPath = configProdClient.output.path

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;
const PORT = process.env.PORT || 3003;
let isBuilt = false;

const done = () => {
	!isBuilt &&
		server.listen(PORT, () => {
			isBuilt = true;
			console.log(
				`Server listening on \x1b[42m\x1b[1m${config.BASE_URL}\x1b[0m in \x1b[41m${process.env.NODE_ENV}\x1b[0m 🌎...`,
			);
		});
};

if (isDev) {
	const compiler = webpack([configDevClient, configDevServer]);

	const clientCompiler = compiler.compilers[0];

	const webpackDevMiddleware = require("webpack-dev-middleware")(
		compiler,
		configDevClient.devServer,
	);

	const webpackHotMiddlware = require("webpack-hot-middleware")(
		clientCompiler,
		configDevClient.devServer,
	);

	server.use(webpackDevMiddleware);
	server.use(webpackHotMiddlware);
	server.use(webpackHotServerMiddleware(compiler));
	console.log("Middleware enabled");
	done();
} else {

	const compiler = webpack([configProdClient2, configProdServer2]);
	
	compiler.apply(new ProgressPlugin((percentage, msg, current, active, modulepath) => {
		if (process.stdout.isTTY && percentage < 1) {
			process.stdout.cursorTo(0)
			modulepath = modulepath ? '...' + modulepath.substr(modulepath.length - 30) : ''
			current = current ? ' ' + current : ''
			active = active ? ' ' + active : ''
			process.stdout.write((percentage * 100).toFixed(0) + '% ' + msg + current + active + modulepath + ' ')
			process.stdout.clearLine(1)
		} else if (percentage === 1) {
			process.stdout.write('\n')
			console.log('webpack: done.')
		}
	}))

	compiler.run((err, stats) => {		
			if (err) throw err

			const clientStats = stats.toJson().children[0];
			
			const render = require("../../buildServer/prod-server-bundle.js").default;
			
			console.log(
				stats.toString({
					colors: true,
					// modules: false,
					// children: false,
					// chunks: false,
					// chunkModules: false,
				}),
			);
			
			server.disable('x-powered-by');
			server.use(cookieParser());
			server.use(compression());

			server.use('/', expressStaticGzip('public', {
				enableBrotli: true,
				serveStatic: {
					maxAge: 86400000*7,
					lastModified: true,
			},
			orderPreference: ['br'],
			})) // oneWeek = 86400000*7;

			server.use('/',
				expressStaticGzip('buildClient', {
					enableBrotli: true,
					serveStatic: {
						maxAge: 86400000*7,
						lastModified: true,
				},
				orderPreference: ['br'],
				}),
			);
			
			server.use(render({ clientStats , outputPath}));
			done();
		});
}
