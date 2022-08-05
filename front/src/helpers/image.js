import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from '../config'
import AuthContext from './authContext'

const fadeIn = `@keyframes gracefulimage {
  0% {
    opacity: 0.5;
  },
  100% {
    opacity: 1;
  }
}`

class LazyLoadImage extends Component {
  static contextType = AuthContext
  constructor(props) {
    super(props)
    if (this.props) {
      this.state = {
        loaded: false,
        loadedOnLoad: false,
        src: this.getImagSrc(this.props),
      }
    }
  }

  /* Adding a style for adding a fadeIn animation */
  addAnimationStyles() {
    const exists = document.head.querySelectorAll('[data-gracefulimage]')
    if (!exists.length) {
      const styleElement = document.createElement('style')
      styleElement.setAttribute('data-gracefulimage', 'exists')
      document.head.appendChild(styleElement)
      styleElement.sheet.insertRule(fadeIn, styleElement.sheet.cssRules.length)
    }
  }

  /* Downloading an image, and tracks its success / failure */
  loadImage() {
    const image = new Image()
    image.onload = () => {
      this.setState({
        loaded: true,
      })
    }
    image.onerror = () => {
      this.setState({
        loaded: true,
        loadedOnLoad: true,
      })
    }
    image.src = this.state.src
  }

  getImagSrc(props) {
    let image_url = props.image_url
    let main_img = ''
    if (!props.islazy) main_img = this.createUrl(image_url, props)
    else main_img = this.getImageUrl(image_url, props)
    return main_img
  }

  getImageUrl(image_url, props) {
    return this.createUrl(image_url, props)
  }
  getDefaultUrl(image_url, props) {
    return this.getDefaultImage(props)
  }

  getDefaultImage() {
    return null
  }

  createUrl(image_url, props) {
    if (typeof image_url === 'undefined' || image_url == null || image_url.length === 0) {
      image_url = this.getDefaultImage(props)
    }

    if (image_url.indexOf('http') === -1 && !props.isStatic) {
      let imgEndPoint = config.IMG_END_POINT
      if (props.islocal) {
        imgEndPoint = config.BASE_URL
      }
      image_url = imgEndPoint + image_url
    }
    return image_url
  }

  /*
    Attempts to load an image src passed via props
    and utilises image events to track sccess / failure of the loading
  */
  componentDidMount() {
    //this.addAnimationStyles();
    /* if user wants to lazy load */
    if (this.props.islazy && this.ImageEle) {
      var elem = this.ImageEle
      /* continue if IntersectionObserver API support available */
      if ('IntersectionObserver' in window) {
        this.elemObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                let _this = entry.target
                this.loadImage()
                // stop watching this element
                this.elemObserver.unobserve(_this)
              }
            })
          },
          {
            rootMargin: '0px 100px 100px 0px',
            //rootMargin: '0px 0px 100px 0px'
          },
        ) //Root Margin given to load images just before coming to viewport
        this.elemObserver.observe(elem)
      } else {
        // fall back
        this.loadImage()
      }
    } else {
      if (!this.props.islazy) {
        this.loadImage()
      }
    }
  }

  componentWillUnmount() {
    if (this.ImageEle && this.elemObserver) {
      this.elemObserver.unobserve(this.ImageEle)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.image_url != nextProps.image_url) {
      this.setState({
        src: this.getImagSrc(nextProps),
      })
    }
  }

  /*
    - If image hasn't yet loaded AND user didn't want a placeholder then don't render anything
    - Else if image has loaded then render the image
    - Else render the placeholder
  */
  render() {
    if (!this.state.loaded && this.props.noPlaceholder) return null

    let placeholderImage = this.getDefaultUrl(this.props.image_url, this.props, false)
    let src = ''
    if (this.state.loadedOnLoad) {
      src = this.getDefaultUrl(this.props.image_url, this.props, false)
    } else {
      src = this.state.loaded ? this.state.src : placeholderImage
    }

    if (!this.props.islazy) {
      src = this.state.src
    }
    const style = {}
    return (
	<img
		src={src}
		className={this.props.className}
		width={this.props.width}
		height={this.props.height}
		style={{
          ...style,
          ...this.props.style,
        }}
		data-src={this.props.image_url}
		alt={this.props.alt}
		title={this.props.title}
		ref={this.state.loaded ? null : (ref) => (this.ImageEle = ref)}
      />
    )
  }
}

LazyLoadImage.defaultProps = {
  image_url: null,
  className: null,
  width: null,
  height: null,
  alt: 'Vidiren',
  title: 'Vidiren',
  style: {},
  islazy: true,
}

LazyLoadImage.propTypes = {
  image_url: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  islazy: PropTypes.bool,
}

export default LazyLoadImage
