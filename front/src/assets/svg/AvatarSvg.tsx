import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
  return (
	<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<circle cx="20" cy="20" r="20" fill="#6A6A6A"/>
		<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
			<circle cx="20" cy="20" r="20" fill="#D4D5D5"/>
		</mask>
		<g mask="url(#mask0)">
			<path d="M20 25.8333C23.6819 25.8333 26.6667 22.8486 26.6667 19.1667C26.6667 15.4848 23.6819 12.5 20 12.5C16.3181 12.5 13.3334 15.4848 13.3334 19.1667C13.3334 22.8486 16.3181 25.8333 20 25.8333Z" fill="white"/>
			<path d="M20 54.1667C27.3638 54.1667 33.3334 48.1971 33.3334 40.8333C33.3334 33.4695 27.3638 27.5 20 27.5C12.6362 27.5 6.66669 33.4695 6.66669 40.8333C6.66669 48.1971 12.6362 54.1667 20 54.1667Z" fill="white"/>
		</g>
	</svg>
  );
}

export default Svg
