import React from "react";
import {SvgProps} from './Interface'

function Svg(props: SvgProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.52727 7.37236V3.11779L10.2909 5.24516L6.52727 7.37236ZM14.8991 1.7791C14.7335 1.15951 14.2455 0.671603 13.626 0.506015C12.503 0.205078 8 0.205078 8 0.205078C8 0.205078 3.49697 0.205078 2.37402 0.506015C1.75449 0.671603 1.26653 1.15951 1.10093 1.7791C0.799999 2.90205 0.799999 5.24508 0.799999 5.24508C0.799999 5.24508 0.799999 7.58803 1.10093 8.71105C1.26653 9.33065 1.75449 9.81855 2.37402 9.98422C3.49697 10.2851 8 10.2851 8 10.2851C8 10.2851 12.503 10.2851 13.626 9.98422C14.2455 9.81855 14.7335 9.33065 14.8991 8.71105C15.2 7.58803 15.2 5.24508 15.2 5.24508C15.2 5.24508 15.2 2.90205 14.8991 1.7791Z" fill="white"/>
    </svg>

  );
}

export default Svg;
