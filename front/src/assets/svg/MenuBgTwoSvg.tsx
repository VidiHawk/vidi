import React from "react";
import {SvgProps} from './Interface'


function Svg(props: SvgProps) {
	return (
		<svg width="100" height="100" viewBox="0 0 75 100" {...props} preserveAspectRatio="none">
			<path d="M0 0V50 C23 70 39 74 91 79 V 0Z" fill="#191919"/>
		</svg>

	);
}

export default Svg;
