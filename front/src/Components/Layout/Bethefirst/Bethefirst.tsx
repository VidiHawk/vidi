import React from "react";

import {  Form } from 'antd'
import VButton from '../../Common/VButton'
import VCheckbox from '../../Common/VCheckbox'
import { useMutation } from '@apollo/client'
import { NEWSLETTER} from '../../../lib/mutations'
import AuthContext from '../../../helpers/authContext'

import './Bethefirst.scss'

const Bethefirst = () => {
  const [submitted, setSubmitted] = React.useState(false)
  const context:any = React.useContext(AuthContext)
  const themeDark = context.themeDark


  const [saveNewsletter] = useMutation(NEWSLETTER.save(), {
    onCompleted(data) {
      if (data?.newsletterForm?.message === 'Success') {
        setSubmitted(true)
      } else {
        context.showAlert(data?.newsletterForm?.message, 'error')
      }
    },
    onError() {
      context.showAlert('Something went wrong!', 'error')
    },
  })

  const onFinish = (values:any) => {
    submitNewsletterForm(values.email)
  }
  const submitNewsletterForm = (email:any) => {
    saveNewsletter({ variables: { email, blog: true, url: window.location.href } })
  }
  
  const bethefirstClass = themeDark ? 'v-bethefirst-container' : 'v-bethefirst-container v-bethefirst-container--light'
  return (
	<div className={bethefirstClass}>
		{!submitted ? <div className="v-bethefirst">
			<h3>Be the first to learn about our new features</h3>
			<span>Receive behind-the-scene news on our innovations, and tips for building stunning video commerce sites</span>
			<Form name="v-request-demo" id="subscribeForm" autoComplete="off" onFinish={onFinish}>
				<Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please write valid email!' }]}>
					<input type="email" name="email" placeholder="Enter your email address" id="email" />
				</Form.Item>
				<Form.Item
					name="agree"
					rules={[{ required: true, message: 'You need to checkbox "Sign me up"' }]}
      >
					<VCheckbox>
						Sign me up (I can unsubscribe anytime). More on this in our Privacy Policy
					</VCheckbox>
				</Form.Item>
				<VButton type="button" htmlType="submit">
					Get Informed
				</VButton>
			</Form>
		</div> : <div className="v-bethefirst-thank">Thank you!</div>}
	</div>
  )
}
export default Bethefirst
