import { Col, Row } from 'antd'
import { RightSing } from '../../../assets/svg'
import React from 'react'

const ConfirmationMessage = () => {
  return (
    <section className="v-conformation-section">
      <Row justify="center">
        <Col>
          <div className="v-header">
            <div className="v-heading">
              <RightSing />
              <h1 className="v-heading__title mb-fotn">We have received your request</h1>
              <p className="v-heading__sub-title mb-padd">Thank you very much for contacting us. We will get back to you as soon as we can</p>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default ConfirmationMessage;
