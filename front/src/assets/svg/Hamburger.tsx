import React from "react";
import {SvgProps} from './Interface'


function Svg(props: SvgProps) {
	return (
		<svg width="24" height="14" viewBox="0 0 24 14"  {...props}>
			<path d="M23 12C23.5523 12 24 12.4477 24 13C24 13.5523 23.5523 14 23 14H1C0.447715 14 0 13.5523 0 13C0 12.4477 0.447715 12 1 12H23ZM23 6C23.5523 6 24 6.44772 24 7C24 7.55228 23.5523 8 23 8H1C0.447715 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6H23ZM23 0C23.5523 0 24 0.447715 24 1C24 1.55228 23.5523 2 23 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H23Z"/>
		</svg>

	);
}

export default Svg;
