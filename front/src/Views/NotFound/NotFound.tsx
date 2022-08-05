import React from "react";
import Head from "../../Components/Head";
import { Status } from "../../Components/Status";

function NotFound() {
	return (
		<>
			<Head title="Vidiren • Not Found" />
			<Status code={404} />
			<h1>Not Found</h1>
			<p>404 Error - Page not found.</p>
		</>
	);
}

export default NotFound;
