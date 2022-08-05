import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Input, Form } from 'antd'
import { Link } from 'react-router-dom'
import AuthContext from '../../helpers/authContext'
import { ContactUsBottomMobileSvg, ContactUsBottomSvg, TopBg, RightSing, ContactUsConfirmationSvg } from '../../assets/svg'

import Head from "../../Components/Head";
import VCheckbox from '../../Components/Common/VCheckbox'
import VButton from '../../Components/Common/VButton'
import { useMutation } from '@apollo/client'
import { CONTACT } from '../../lib/mutations/Contact'
import { useHistory } from 'react-router-dom';

const { TextArea } = Input

interface SubmitContactFormI {
	variables : {
		message: string,
		newsletter: string
	}
}

const Contact =(props:any) =>{
	const context = useContext(AuthContext)
	const { themeDark, changeHeaderColor, headerChange } = context;
	const [onConfirmation, setOnConfirmation] = useState(false)
	const svgIconsColor = themeDark ? '#f8f9fe' : '#060606'
	const history = useHistory();

	useEffect(() => {
		headerChange && changeHeaderColor(false)
		setOnConfirmation(false);
	}, [history.location.key])

	return (
		<>
			<Head
				title="Video Shopping | Live Streaming Commerce | Contact Vidiren"
				description="Building ultra-fast mobile-first video commerce websites. See how Vidi Rendering Technologies can work for you. Talk to a video expert today"
				keywords="video commerce news, live-stream commerce trends, web builder for video commerce blog, video website builder, how to create a video commerce website, tell your brand story through videos, unite your brand community on your own site, fully customizable video ecommerce web-builder, sell more products with videos, mobile-first video shopping, best video commerce builder 2021, Here's Why You Should Focus More on Video Content, How to produce videos that sell, How to tell your brands story through video?, Live commerce is taking online commerce by storm, How to organize your team to produce high quality videos, 3 tips to create Video Content that Sells, How-to videos - a growth driver for ecommerce, Best Ecommerce builders you should try, Video content marketing is king, best video agencies for e-commerce, How to reduce your reliance on social media and move your audience to your own website, Why all your videos should be shot in vertical mode, How to publish SEO friendly videos, Why App Marketplaces are really unsafe for personal user data, Why you shouldn’t embed YouTube videos on your website, Why all your content should be mobile-first, What is video rendering?, Building stronger relationship with your brand community with Vidiren, Why Vidiren allows you to build faster and less prone to error websites, How to script great videos" url="https://vidiren.com/blog"/>
			<div className="v-contact">
				{!onConfirmation && <HeaderSection {...props} themeDark={themeDark}/>}
				{!onConfirmation ? <section>
					<Row justify="center" gutter={[24, 24]}>
						<Col xs={{ span: 22, offset: 0 }} sm={{ span: 14, offset: 0 }} xl={{ span: 10, offset: 0 }}>
							<ContactForm onConfirmation={setOnConfirmation} changeHeaderColor={changeHeaderColor}/>
						</Col>
					</Row>
					<ContactUsBottomSvg className=" custom-svg black-svg" />
					<ContactUsBottomMobileSvg className="custom-mobile black-svg"/>
				</section> :
					<section className="v-conformation">
						<ConfirmationMessage/>
						<ContactUsConfirmationSvg style={{fill: svgIconsColor}} className="conformation-custom-svg black-svg"/>
						<ContactUsBottomMobileSvg className="custom-mobile black-svg"/>
					</section>}
			</div>
		</>
  )
}

const HeaderSection = () => {
  return (
	<section className="v-contact-section">
		<TopBg className="v-svgBg black-svg" />
		<Row justify="center">
			<Col>
				<div className="v-header">
					<div className="v-heading">
						<h1 className="v-heading__title">We’d love to hear from you</h1>
						<p className="v-heading__sub-title">We will be happy to answer all your questions</p>
					</div>
				</div>
			</Col>
		</Row>
	</section>
  )
}

const ConfirmationMessage = () => {
	return (
		<section className="v-conformation-section">
			<Row justify="center">
				<Col>
					<div className="v-header">
						<div className="v-heading">
							<RightSing />
							<h1 className="v-heading__title mb-fotn">Your message has been sent</h1>
							<p className="v-heading__sub-title mb-padd">Thank you very much for contacting us. We will get back to you as soon as we can</p>
						</div>
					</div>
				</Col>
			</Row>
		</section>
	)
}

const ContactForm = (props: any) => {
	const context:any = useContext(AuthContext)

	const [form] = Form.useForm()

	const [contactsubmitted, setContactsubmitted] = useState(false)

	const [saveContact] = useMutation(CONTACT.save(), {
		errorPolicy: 'all',
		onCompleted(data) {
			if (data?.contactForm?.message === 'Success') {
				setContactsubmitted(true)
				props.onConfirmation(true);
				props.changeHeaderColor(false);
			} else {
				context.showAlert(data?.contactForm?.message, 'error')
			}
		},
		onError() {
			context.showAlert('Something went wrong!', 'error')
		},
	})

	React.useEffect(() => {
		if (contactsubmitted) {
			form.resetFields()
		}
	}, [contactsubmitted, form])

	const submitContactForm = (form:SubmitContactFormI) => {
		saveContact({ variables: form })
	}

	const onFinish = (values:any) => {
		delete values.privacy
		const formValues = {
			...values,
			newsletter:
				values.newsletter && values.newsletter.target && values.newsletter.target.checked
					? values.newsletter.target.checked
					: false,
			demo: false,
			url: window.location.href
		}
		submitContactForm({...formValues} )
	}

	return (
		<>
			<div className="v-contact-container">
				<p className="v-form-title">Contact Us</p>
				<Form name="v-request-demo" id="contactForm" form={form} onFinish={onFinish} autoComplete="off">
					<Row gutter={12}>
						<Col xs={{ span: 24}} lg={{ span: 12}}>
							<Form.Item
								name="name"
								rules={[
								{
									required: true,
									message: 'Please write your name!',
								},
							]}
						>
								<Input placeholder="Your Name *" className="v-input" />
							</Form.Item>
						</Col>
						<Col xs={{ span: 24}} lg={{ span: 12}}>
							<Form.Item
								name="email"
								rules={[
								{
									required: true,
									type: 'email',
									message: 'Please write valid email!',
								},
							]}
						>
								<Input placeholder="Your Email *" className="v-input" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item
								name="message"
								rules={[
								{
									required: true,
									message: 'Please write message!',
								},
							]}
						>
								<TextArea rows={6} placeholder="Message *" className="v-textarea" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item
								name="privacy"
								rules={[
								{
									required: true,
									message: 'You must agree to Privacy Policy & Terms of Service',
								},
							]}
						>
								<VCheckbox>
									I have read and agree to the <Link to="/privacy" title="Vidiren User Privacy Policy">Privacy Policy</Link> & <Link to="/terms" title="Vidiren Terms of Use">Terms of service</Link>
								</VCheckbox>
							</Form.Item>
							<Form.Item name="newsletter">
								<VCheckbox>
									Sign me up to the Vidiren newsletter (I can unsubscribe anytime).<br/> More on this in our <Link to="/privacy" title="Vidiren User Privacy Policy">Privacy Policy</Link>
								</VCheckbox>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Item>
								<VButton htmlType="submit">Submit</VButton>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>

		</>
	)
}

export default Contact
