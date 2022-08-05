import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
	return (
		<svg width="1440" height="1205" viewBox="0 0 1440 1205" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M152.5 1375L1151.89 90.2903C1187.72 44.2336 1256.82 42.7374 1294.61 87.2001L1922.5 826.001L987 1911.5L152.5 1375Z" fill="#060606"/>
			<mask  mask-type="alpha" maskUnits="userSpaceOnUse" x="152" y="54" width="1771" height="1858">
				<path d="M152.5 1375L1151.89 90.2903C1187.72 44.2336 1256.82 42.7374 1294.61 87.2001L1922.5 826.001L987 1911.5L152.5 1375Z" fill="#5132A1"/>
			</mask>
			<g >
				<path opacity="0.6" d="M-599.5 1960.5L382.952 862.536C420.168 820.944 485.547 821.802 521.659 864.356L1115.23 1563.81L-58.2019 2559.61L-599.5 1960.5Z" fill="#060606"/>
				<path d="M152.5 1335L1151.89 50.2902C1187.72 4.23354 1256.82 2.73741 1294.61 47.2001L1922.5 786.001L987 1871.5L152.5 1335Z" fill="#060606"/>
				<circle opacity="0.2" cx="1509.5" cy="500.507" r="301.5" fill="#1F1F1F"/>
				<circle opacity="0.4" cx="1213.5" cy="1389.5" r="257.5" fill="#1F1F1F"/>
				<rect opacity="0.3" x="291.926" y="524.655" width="653.161" height="372.786" rx="100" transform="rotate(25.5745 291.926 524.655)" fill="#191919"/>
			</g>
		</svg>

	);
}

export default Svg
