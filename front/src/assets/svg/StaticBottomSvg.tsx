import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
  return (

    <svg viewBox="0 0 1440 850" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M449.5 389.001C714.697 411.738 1440 539.501 1440 539.501V980.5H0V520.632C0 520.632 184.303 366.264 449.5 389.001Z" fill="#060606"/>
      <path d="M-115.5 1139.4L221.238 697.799C245.276 666.276 286.804 653.695 324.295 666.578L1652.5 1123L855 1671.31L-115.5 1139.4Z" fill="#1F1F1F"/>
      <path d="M44.5 1083.4L409.961 610.301C432.181 581.536 469.255 568.55 504.568 577.164L1904 918.5L1015 1615.31L44.5 1083.4Z" fill="#191919"/>
    </svg>

  );
}

export default Svg
