import React from 'react'

import { Row, Col } from 'antd'
import ScrollAnimation from 'react-animate-on-scroll'
import Image from '../../../helpers/image'

const ResponsiveCommerce = (props:any) => {
  return (
	<section className="v-responsive-section">
		<Row gutter={[24, 48]}>
			<Col xs={{ span: 22, offset: 1, order: 1 }} md={{span:18, offset:4}} lg={{ span: 12, offset: 10 }}>
				<div className="v-title">
					<h3>
						<span>Your responsive and fully customizable ecommerce</span>
					</h3>
					<span>
						A seamless user experience on both desktop and mobile. Design your store for your brand&apos;s needs.
					</span>
				</div>
			</Col>
		</Row>
		<Row gutter={[24, 48]} justify="start">
			<Col lg={14} md={17} xs={24}>
				<ScrollAnimation animateIn='fadeIn'  afterAnimatedIn={props.playVideo}  offset={150} animateOnce={true}>
					<div className="v-video-wrapper">
						<video
              className="desktop"
							muted={true} 
							playsInline={true}
							ref={props.video4Ref}
							poster="images/screen_tablet_home.jp2"
							loop={true}
							>
							<source
								type="video/mp4"
								src={`https://storage.googleapis.com/vidiren-dot-com/VIDIREN4.mp4`}
              />
							Sorry, your browser doesnt support embedded videos.
						</video>
            <video
              className="mobile"
							muted={true} 
							playsInline={true}
							ref={props.video5Ref}
							poster="images/screen_tablet_home.jp2"
							loop={true}
							>
							<source
								type="video/mp4"
								src={`https://storage.googleapis.com/vidiren-dot-com/VIDIREN4_Mobile.mp4`}
              />
							Sorry, your browser doesnt support embedded videos.
						</video>
					</div>
				</ScrollAnimation>
			</Col>
			<Col lg={6} md={7}>
				<div className="v-img-revolution-bl">
					<Image
						isStatic={true}
						image_url="images/product_card_home.png"
						islazy={true}
						className="v-img-revolution-bl__img1"
						width="584"
						height="240" alt="video product display" title="video product display"
            />
					<Image
						isStatic={true}
						image_url={props.theme ? 'images/size_card_home.png' : 'images/size_card_home_light.png' } alt="product color options" title="product color options"
						islazy={true}
						className="v-img-revolution-bl__img2"
						width="386"
						height="296"
            />
				</div>
			</Col>
		</Row>
	</section>
  )
}

export default ResponsiveCommerce
