import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
  return (
    <svg width="1440" height="900" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M-115.5 1060.4L221.238 618.799C245.276 587.276 286.804 574.695 324.295 587.578L1652.5 1044L855 1592.31L-115.5 1060.4Z" fill="#1F1F1F"/>
      <path d="M44.5 1004.4L409.961 531.301C432.181 502.536 469.255 489.55 504.568 498.164L1904 839.5L1015 1536.31L44.5 1004.4Z" fill="#191919"/>
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="44" y="495" width="1860" height="1042">
        <path d="M44.5 1004.4L409.961 531.301C432.181 502.536 469.255 489.55 504.568 498.164L1904 839.5L1015 1536.31L44.5 1004.4Z" fill="#191919"/>
      </mask>
      <g mask="url(#mask0)">
        <circle cx="1243.5" cy="1037.5" r="235.5" fill="#151515"/>
        <rect x="343.926" y="149.688" width="653.161" height="372.786" rx="100" transform="rotate(25.5745 343.926 149.688)" fill="#151515"/>
      </g>
    </svg>
  );
}

export default Svg
