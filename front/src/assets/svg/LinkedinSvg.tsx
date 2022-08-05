import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.981109 15.2057H4.0682V5.49023H0.981109V15.2057ZM2.52511 4.16409C3.6017 4.16409 4.27217 3.41778 4.27217 2.48489C4.25205 1.5319 3.6017 0.806641 2.54615 0.806641C1.49059 0.806641 0.8 1.5319 0.8 2.48489C0.8 3.41778 1.47047 4.16409 2.50682 4.16409H2.52511ZM15.2 15.2057V9.63513C15.2 6.65084 13.677 5.26155 11.6464 5.26155C10.0073 5.26155 9.27371 6.20497 8.86393 6.86612V5.49023H5.77684C5.818 6.40207 5.77684 15.2057 5.77684 15.2057H8.86393V9.77961C8.86393 9.4897 8.88405 9.19978 8.96546 8.99216C9.18864 8.41233 9.6963 7.81145 10.5488 7.81145C11.6665 7.81145 12.1129 8.70224 12.1129 10.0083V15.2066L15.2 15.2057Z" fill="white"/>
    </svg>
  );
}

export default Svg;
