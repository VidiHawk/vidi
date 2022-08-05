import React from "react";
import {SvgProps} from './Interface'


function Svg(props: SvgProps) {
	return (
		<svg width="64" height="64" viewBox="0 0 64 64" {...props}>
			<rect width="64" height="64" rx="32" fill="#6A6A6A"/>
			<path d="M25.03 22.7752L25.1318 22.8687L32.0012 29.7384L38.872 22.8687L38.9738 22.7752C39.6024 22.2455 40.5428 22.2767 41.1348 22.8687C41.7596 23.4935 41.7596 24.5066 41.1348 25.1314L34.2644 32.0008L41.1348 38.8717C41.7596 39.4965 41.7596 40.5096 41.1348 41.1344C40.5428 41.7264 39.6024 41.7575 38.9738 41.2279L38.872 41.1344L32.0012 34.264L25.1318 41.1344L25.03 41.2279C24.4014 41.7575 23.461 41.7264 22.869 41.1344C22.2442 40.5096 22.2442 39.4965 22.869 38.8717L29.7388 32.0008L22.869 25.1314C22.2442 24.5066 22.2442 23.4935 22.869 22.8687C23.461 22.2767 24.4014 22.2455 25.03 22.7752Z" fill="white"/>
		</svg>


	);
}

export default Svg;
