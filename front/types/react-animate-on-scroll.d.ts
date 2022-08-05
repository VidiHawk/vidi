
declare module "react-animate-on-scroll" {
  import * as React from "react";
  import ScrollAnimation from 'react-animate-on-scroll'
  import ScrollAnimationProps from 'react-animate-on-scroll'

  namespace ScrollAnimationC {
      interface ScrollAnimationPropsC extends Partial<ScrollAnimationProps> {
          animateIn?: string;
          animateOut?: string;
          offset?: number;
          duration?: number;
          delay?: number;
          initiallyVisible?: boolean;
          animateOnce?: boolean;
          style?: object;
          scrollableParentSelector?: string;
          className?: string;
          afterAnimatedIn?:any,
      }
  }

  class ScrollAnimationC extends React.Component<ScrollAnimationC.ScrollAnimationPropsC> {
      /**
       * ScrollAnimation instance
       */
      readonly ScrollAnimationC: ScrollAnimation;
  }

  export = ScrollAnimationC;
}
