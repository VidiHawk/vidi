import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
	return (
		<svg width="576" height="1694" viewBox="0 0 576 1694" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M576 0C514.04 359.48 5.52912e-05 549.584 0 808.821C-5.52912e-05 1068.06 284.7 1092.57 422.337 1316.93C559.974 1541.29 576 1694 576 1694V0Z" />
		</svg>

	);
}

export default Svg
