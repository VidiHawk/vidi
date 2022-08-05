import React, {useState, useEffect} from 'react'

import { Row, Col, Form } from 'antd'
import ScrollAnimation from 'react-animate-on-scroll'
import { CSSTransition } from 'react-transition-group'
import VButton from '../../../Components/Common/VButton'
import VCheckbox from '../../../Components/Common/VCheckbox'
import { HeroSvgBg } from "../../../assets/svg";
import { Link} from "react-router-dom";

interface HeroSectionI {
	playVideo: any,
	video1Ref: React.RefObject<HTMLVideoElement>,
	submitted: boolean,
	saveNewsletter: any,
	svgIconsColor: string
}

function HeroSection (props: HeroSectionI) {
  const [thankState, setThankState] = useState(false)

  useEffect(() => {
    if (props.submitted && !thankState) setThankState(!thankState)
  }, [props.submitted, thankState])

  const onFinish = (values:any) => {
    submitNewsletterForm(values.email)
	}

	const submitNewsletterForm = (email:any) => {
    props.saveNewsletter({ variables: { email, blog: false, url: window.location.href } })
	}
	
  return (
	<section className="v-hero-section">
		<HeroSvgBg className="v-svgBg black-svg" />
		<Row justify="center">
			<Col lg={18}>
				<Row>
					<Col xs={{ order: 2, span: 24, offset: 0  }} lg={{ span: 10, offset: 0, order: 1 }}>
						<Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="bottom">
							<Col>
								<ScrollAnimation animateIn='fadeIn' afterAnimatedIn={props.playVideo} offset={150} animateOnce={true}>
									<div className="v-video-wrapper">
										<video
											ref={props.video1Ref}
											muted={true}
											playsInline={true}
											poster="images/screen_hero.jpg"
											loop={true}
                      >
											<source
												type="video/mp4"
												src={`https://storage.googleapis.com/vidiren-dot-com/VIDIREN1.mp4`}
                        />
											Sorry, your browser doesnt support embedded videos.
										</video>
									</div>
								</ScrollAnimation>
							</Col>
						</Row>
					</Col>
					<Col xs={{ order: 1, span: 24, offset: 0 }} lg={{ span: 13, offset: 0, order: 2 }}>
						<ScrollAnimation className="v-hero-section-wrapper" animateIn='fadeIn' afterAnimatedIn={props.playVideo}>
							<Form name="v-request-demo" onFinish={onFinish} autoComplete="off">
								<h2>Discover the first video commerce website builder in the world</h2>
								<h3>
									Vidiren is a platform for brands to easily build mobile-first, customer-centric, all-video ecommerce
									websites
								</h3>
								<div className="v-enter-email">
									<CSSTransition in={thankState} timeout={1000} classNames="v-thank">
										<div className="v-enter-email-content">
											<Form.Item
												name="email"
												rules={[{ required: true, type: 'email', message: 'Please write valid email!' }]}
                        >
												<input type="email" name="email" placeholder="Enter your email address" id="hero-section-email"/>
											</Form.Item>
											<VButton type="button" htmlType="submit">
												Get Informed
											</VButton>
											<div className="v-email-message">Thank You! </div>
										</div>
									</CSSTransition>
								</div>
								<Form.Item
									name="agree"
									rules={[{ required: true, message: 'You must agree to the Privacy Policy & Terms of service' }]}
									className="ageement-check"
                  >
									<VCheckbox>
										I have read and agree to the <Link to="/privacy" title="Vidiren User Privacy Policy">Privacy Policy</Link> <br /> & <Link to="/terms" title="Vidiren Terms of Use">Terms of service</Link>
									</VCheckbox>
								</Form.Item>
							</Form>
						</ScrollAnimation>
					</Col>
				</Row>
			</Col>
		</Row>
	</section>
  )
}

export default HeroSection
