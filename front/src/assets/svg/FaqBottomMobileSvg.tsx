import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
  return (
    <svg viewBox="0 0 376 703" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M232.569 1.31189C395.419 15.2833 858 122.365 858 122.365L825.5 886.5L-40.9999 863V89.5707C-40.9999 89.5707 69.7188 -12.6595 232.569 1.31189Z" fill="#060606"/>
      <path d="M-1174 814.5L233.729 372.168C263.787 362.723 296.587 369.316 320.66 389.643L1281 1200.5L-337.975 2230.09L-1174 814.5Z" fill="#191919"/>
    </svg>
  );
}

export default Svg
