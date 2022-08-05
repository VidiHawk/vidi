import React from "react";
import {SvgProps} from './Interface'


function Svg(props: SvgProps) {
	return (
		<svg width="100" height="100" viewBox="0 0 75 100" {...props} preserveAspectRatio="none">
			<path d="M0 0V40 C20 63.3 40 71.7 91 79 V 0Z" fill="black"/>
		</svg>

	);
}

export default Svg;
