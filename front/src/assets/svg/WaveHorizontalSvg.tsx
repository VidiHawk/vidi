import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
	return (
		<svg preserveAspectRatio="none"  viewBox="0 0 1440 1072" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M991.475 2.42025C726.278 25.1571 0 225.5 0 225.5V498H1440V124.631C1440 124.631 1256.67 -20.3166 991.475 2.42025Z"/>
			<path d="M305.456 1072C148.465 1072 0 1017.92 0 1017.92V335H1438V914C1438 914 462.447 1072 305.456 1072Z"/>
		</svg>
	);
}

export default Svg
