import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { matchRoutes } from "react-router-config";
import { HelmetProvider } from "react-helmet-async";
import { clearChunks, flushChunkNames } from "react-universal-component/server"
import flushChunks from "webpack-flush-chunks";
import Routes, { routes } from "../app/Routes";
import { ApolloProvider } from '@apollo/client'
import UAParser from 'ua-parser-js';
import GraphClient from '../lib/client';
import { getMobile } from './Utils'
const  parser = new UAParser();
const client = GraphClient.getGraphClient();


export default ({ clientStats , outputPath}) => (req, res) => {
	const promises = matchRoutes(routes, req.path).map(({ route,match }) => {
		route.loadData ? route.loadData(match) : null;
	});

	var ua = req.headers['user-agent'];
	let isMobile = getMobile(req, ua);

	Promise.all(promises).then(() => {
		const context = {};
		const helmetContext = {};
		// clearChunks()
		const app = renderToString(
			<ApolloProvider client={client}>
				<HelmetProvider context={helmetContext}>
					<StaticRouter location={req.originalUrl} context={context}>
						<Routes isMobile={isMobile}/>
					</StaticRouter>
				</HelmetProvider>
			</ApolloProvider>,
		);

		

		const { helmet } = helmetContext;
		const chunkNames = flushChunkNames()
		const siteName = 'Vidiren';

		const { js, styles, cssHash , scripts, stylesheets,css} = flushChunks(clientStats, {
    
			chunkNames,
			before: ['commonCss', 'vendorCss'],
			outputPath,
		});

		const status = context.status || 200;

		if (context.status == 404) {
			console.log("Error 404: ", req.originalUrl);
		}

		if (context.url) {
			const redirectStatus = context.status || 302;
			res.redirect(redirectStatus, context.url);
			return;
		}

		console.log('PATH', req.path)
		console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
		console.log('SCRIPTS SERVED', scripts)
		console.log('STYLESHEETS SERVED', stylesheets)

		res.status(status)
			.cookie()
			.header("Content-Type", "text/html; charset=utf-8")
			.send(
				`<!DOCTYPE html>
					<html lang="en">
						<head>${helmet.title}${helmet.meta.toString()}${helmet.link.toString()}
						<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
						<meta name="msapplication-TileColor" content="#ffffff">
						<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
						<meta name="theme-color" content="#ffffff">
						<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
						<meta http-equiv="X-UA-Compatible" content="ie=edge">
						<meta property="og:site_name" content="${siteName}"/>
						<meta name="twitter:card" content="summary_large_image"/>
						<meta property="og:type" content="website"/>
						<meta name="copyright" content="© 2009 - 2022, VIDIREN, ALL RIGHTS RESERVED"/>
						<meta name="mobile-web-app-capable" content="yes"/>
						<meta name="apple-mobile-web-app-capable" content="yes"/>
						<meta name="apple-mobile-web-app-status-bar-style" content="white"/>
						<meta name="apple-mobile-web-app-title" content="${siteName}"/>
						<meta name="application-name" content="${siteName}"/>
						<meta name="google" content="notranslate"/>
						<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
						<meta http-equiv="X-UA-Compatible" content="ie=edge">
						${(process.env.NODE_APP != 'production') ? '<meta name="robots" content="noindex, nofollow" />' : ''}
						${css}
						<!-- Global site tag (gtag.js) - Google Analytics -->
						<script async src="https://www.googletagmanager.com/gtag/js?id=G-TWNNJLWGB0"></script>
						<script>
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-TWNNJLWGB0');
						</script>
						<!-- Global site tag (gtag.js) - Google Analytics -->
						</head>
						<body>
							<div id="react-root">${app}</div>
						</body>
						<script type="text/javascript">window.isMobile=${isMobile};window.__APOLLO_STATE__ = ${JSON.stringify(client.extract())};</script>
						${cssHash}
						${js}
				</html>`,
			);
	});
};
