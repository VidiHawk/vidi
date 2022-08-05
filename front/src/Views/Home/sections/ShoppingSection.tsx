import React from 'react'

import { Row, Col } from 'antd'
import ScrollAnimation from 'react-animate-on-scroll'
import Image from '../../../helpers/image'
import { CommentsSvg } from "../../../assets/svg";

const ShoppingSection = (props:any) => {
  return (
	<section className="v-video-shopping-section">
		<Row justify="center">
			<Col lg={20}>
				<Row gutter={[48, 48]} justify="center" >
					<Col xs={{ span: 24, offset: 0, order: 2 }} md={{ span: 22 }} lg={{ span: 12, offset: 0, order: 1 }} xl={10} className="v-padding-top">
						<ScrollAnimation animateIn='fadeIn'  afterAnimatedIn={props.playVideo}  offset={150} animateOnce={true}>
							<div className="v-video-comments">
								<CommentsSvg className="v-commentsSvg" style={{ fill: props.svgIconsColor }} />
								<div className="v-video-wrapper">
									<video
										muted={true}
										playsInline={true}
										ref={props.video3Ref}
										poster="images/screen_dress_home.jpg"
										loop={true}
                    >
										<source
											type="video/mp4"
											src={`https://storage.googleapis.com/vidiren-dot-com/VIDIREN3.mp4`}
                      />
										Sorry, your browser doesnt support embedded videos.
									</video>
								</div>
							</div>
						</ScrollAnimation>
					</Col>
					<Col xs={{ span: 24, offset: 0, order: 1 }} md={{ span: 13 }} lg={{ span: 10, offset: 0, order: 2 }}>
						<div className="v-title">
							<h3>
								<span>Full video shopping experience</span>
							</h3>
							<span>
								Present your products through live streaming sessions. Your customers can click on the purchase button
								at any time. They can also post comments, and even join the live stream!
							</span>
						</div>
						<div className="v-trio-images">
							<Image isStatic={true} image_url="images/pic_1_home.png" islazy={true} width="136" height="254" alt="video shopping experience" title="video shopping experience"/>
							<Image isStatic={true} image_url="images/pic_2_home.png" islazy={true} width="136" height="254" alt="video content marketing" title="video content marketing"/>
							<Image isStatic={true} image_url="images/pic_3_home.png" islazy={true} width="136" height="254" alt="video content" title="video content"/>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	</section>
  )
}
export default ShoppingSection
