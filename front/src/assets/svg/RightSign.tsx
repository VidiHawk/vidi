import React from "react";
import {SvgProps} from './Interface'


function Svg(props: SvgProps) {
	return (
		<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M53.2452 29.2694C53.8701 28.6446 54.8831 28.6446 55.508 29.2694C56.0847 29.8462 56.1291 30.7538 55.6411 31.3814L55.508 31.5322L34.7224 52.3177C34.1456 52.8945 33.238 52.9389 32.6104 52.4508L32.4596 52.3177L24.4685 44.3266C23.8437 43.7018 23.8437 42.6887 24.4685 42.0639C25.0453 41.4871 25.9529 41.4427 26.5805 41.9308L26.7312 42.0639L33.0253 48.3574C33.3377 48.6698 33.8442 48.6698 34.1567 48.3574L53.2452 29.2694Z" fill="#90CDA1"/>
			<circle cx="40" cy="40" r="38" stroke="#90CDA1" stroke-width="4"/>
		</svg>
	);
}

export default Svg;
