import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppContainer } from "react-hot-loader";
import AppRoot from "./app/AppRoot";

const isProd = process.env.NODE_ENV === "production";

function render(Component) {
	ReactDOM.hydrate(
		<HelmetProvider>
			<AppContainer>
				<Component />
			</AppContainer>
		</HelmetProvider>,
		document.getElementById("react-root"),
	);
}
render(AppRoot);

if (module.hot) {
	module.hot.accept("./app/AppRoot.js", () => {
		const NewAppRoot = require("./app/AppRoot.js").default;
		render(NewAppRoot);
	});
}
