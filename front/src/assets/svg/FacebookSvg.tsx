import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
  return (
    <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.08 8.61864H7.204L7.528 6.06264H5.08V4.44264C5.08 3.68664 5.296 3.18264 6.304 3.18264H7.6V0.914641C7.384 0.878641 6.592 0.806641 5.692 0.806641C3.82 0.806641 2.524 1.99464 2.524 4.19064V6.06264H0.400002V8.61864H2.524V15.1706L5.08 15.2066V8.61864Z" fill="white"/>
    </svg>
  );
}

export default Svg;
