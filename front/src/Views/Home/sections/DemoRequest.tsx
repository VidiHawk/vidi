import React from 'react'

import { Row, Col, Form, Input } from 'antd'
const { TextArea } = Input
import VButton from '../../../Components/Common/VButton'
import VCheckbox from '../../../Components/Common/VCheckbox';
import { Link} from "react-router-dom";

const DemoRequest = (props:any) => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (props.contactsubmitted) {
      form.resetFields()
    }
  }, [props.contactsubmitted, form])

  const onFinish = (values:any) => {
    delete values.privacy
    const formValues = {
      ...values,
      message: values.message ? values.message : '',
      newsletter:
        values.newsletter && values.newsletter.target && values.newsletter.target.checked
          ? values.newsletter.target.checked
          : false,
			demo: true,
			url: window.location.href
    }
    props.submitContactForm(formValues)
  }

  return (
	<div className="v-contact">
			<div className="v-demoRequest-container v-contact-container">
		<p className="v-form-title">Would you like to get a demo from us?</p>
		<Form name="v-request-demo" id="contactForm" form={form} onFinish={onFinish} autoComplete="off">
			<Row gutter={16}>
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
						<Input placeholder="Your Name" className="v-input" />
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
						<Input placeholder="Your Email" className="v-input" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={{ span: 24}} lg={{ span: 12}}>
					<Form.Item
						name="company"
						rules={[
                {
                  required: true,
                  message: 'Please write your company name!',
                },
              ]}
            >
						<Input placeholder="Company Name" className="v-input" />
					</Form.Item>
				</Col>
				<Col xs={{ span: 24}} lg={{ span: 12}}>
					<Form.Item
						name="website"
						rules={[
                {
                  required: true,
                  message: 'Please write your company website!',
                },
              ]}
            >
						<Input placeholder="Company Website" className="v-input" />
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Form.Item name="message">
						<TextArea rows={4} placeholder="Message (optional)" className="v-textarea" />
					</Form.Item>
				</Col>
			</Row>
			<Row className="v-checkbox-space">
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
							Sign me up to the Vidiren newsletter (I can unsubscribe anytime). More on this in our <Link to="/privacy" title="Vidiren User Privacy Policy">Privacy Policy</Link>
						</VCheckbox>
					</Form.Item>
				</Col>
			</Row>
			<Row className="v-top-padding">
				<Col>
					<Form.Item>
						<VButton htmlType="submit">Submit</VButton>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	</div>
		</div>
  )
}

export default DemoRequest
