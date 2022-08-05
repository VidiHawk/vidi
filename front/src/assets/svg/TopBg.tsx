import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
	return (
		<svg width="1440" height="510" viewBox="0 0 1440 510" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M571.363 -718.706L1547.5 14.5L919.876 488.84C892.555 509.489 856.568 514.72 824.498 502.706L-362.5 58.0001L571.363 -718.706Z" fill="#060606"/>
		</svg>

	);
}

export default Svg;
