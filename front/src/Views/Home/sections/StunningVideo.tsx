import React from 'react'
import { Row, Col } from 'antd'
import ScrollAnimation from 'react-animate-on-scroll'
import Image from '../../../helpers/image'
import {  StunningSvg , StarsSvg, PlayerHomeSvg, PlayerHomeMobileSvg} from "../../../assets/svg";

const StunningVideo = (props:any) => {
  return (
	<section className="v-stunning-section">
		<StunningSvg className="v-svgBg v-svgBg--right" style={{ fill: props.svgBgColor }}/>
		{/*<Row justify="center" gutter={[16, 60]}>*/}
			<Row justify="center" >
			<Col lg={10} xl={9} md={17} className="gutter-row v-margin-bottom">
				<div className="v-title">
					<h3>
						<span>Create a stunning video commerce website</span>
					</h3>
					<span>Tell your brand story through video</span>
				</div>
			</Col>
		</Row>
		<Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 48}}>
			<Col xs={{ span: 24, offset: 0 }} lg={{ span: 18 }} xl={{ span:14 }} className="gutter-row">
				<Row justify="center">
					<Col lg={14} xl={10} md={10}>
						<Row justify="center">
							<Col>
								<ScrollAnimation animateIn='fadeIn'  afterAnimatedIn={props.playVideo}  offset={150} animateOnce={true}>
									<div className="v-video-wrapper">
										<video
											muted={true}
											playsInline={true}
											ref={props.video2Ref}
											poster="images/screen_artist_home.jpg"
											loop={true}
                      >
											<source
												type="video/mp4"
												src={`https://storage.googleapis.com/vidiren-dot-com/VIDIREN2.mp4`}
                        />
											Sorry, your browser doesnt support embedded videos.
										</video>
									</div>
									<div className="v-player-controls v-player-controls-mobile">
										<PlayerHomeMobileSvg/>
									</div>
									<div className="v-player-controls v-player-controls-desktop">
										<PlayerHomeSvg/>
									</div>
								</ScrollAnimation>
							</Col>
						</Row>
					</Col>
					<Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 0 }} xl={12} md={{ span:12, offset:2 }}>
						<ScrollAnimation animateIn="fadeIn">
							<h4>Empower your community to create video content and share directly on your website</h4>
							<div className="v-stun-star">
								<Image isStatic={true} image_url="images/stunning_img.jpg" islazy={true} width="230" height="474" alt="video commerce" title="video commerce"/>
								<StarsSvg />
							</div>
						</ScrollAnimation>
					</Col>
				</Row>
			</Col>
		</Row>
	</section>
  )
}
export default StunningVideo
