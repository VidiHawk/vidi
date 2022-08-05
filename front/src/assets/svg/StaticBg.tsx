import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
	return (
		<svg width="1440" height="280" viewBox="0 0 1440 280" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M479.393 -960.905L1569.03 77.8025L803.764 274.724C790.742 278.075 777.179 278.765 763.884 276.753L-425.468 96.8025L479.393 -960.905Z" fill="#060606"/>
		</svg>
	);
}

export default Svg;
