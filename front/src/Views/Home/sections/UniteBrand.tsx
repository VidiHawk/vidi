import React from 'react'

import { Row, Col} from 'antd'
import Image from '../../../helpers/image'
// import VButton from '../../../Components/Common/VButton'
import {WaveHorizontalSvg, ChatSvg, LightningSvg, UserSvg, MoveRightSvg} from '../../../assets/svg'

const UniteBrand = (props:any) => {
  return (
	<section className="v-unite-brand-section">
		<WaveHorizontalSvg className="v-svgHorizontal" style={{ fill: props.svgBgColor }} />
		<Row justify="center" gutter={[48, 48]}>
			<Col lg={24} xl={20}>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg:0 }} justify="center" >
					<Col xs={{ span: 24, offset: 0, order: 1 }} lg={{ span: 12, offset: 0, order: 1  }} xl={{ span: 14, offset: 0, order: 1  }}>
						<div className="v-title">
							<h3>
								<span>Unite your brand community under your own platform</span>
							</h3>
							<span className="v-unic-fontset">
								Remain in control of your domain and data and reduce your dependence on social media platform
							</span>
						</div>
					</Col>
					<Col xs={{ span: 24, offset: 0, order: 2 }} lg={{ span: 12, offset: 0, order: 1  }} xl={{ span: 8, offset: 0, order: 2  }}>
						<Image isStatic={true} image_url="images/points_home.png" islazy={true} style={{ width: '100%', height: 'auto' }} width="572" height="377" alt="control your domain" title="control your domain"/>
					</Col>
				</Row>
			</Col>
			<Col lg={24} xl={20}>
				<Row gutter={[46, 12]} justify="center" >
					<Col xs={{ span: 24, offset: 0 }} md={{ span:12 }} lg={{ span: 6, offset: 0 }}>
						<ChatSvg style={{ fill: props.svgIconsColor }} />
						<p>Messaging and video call functionalities between brand and customer</p>
					</Col>
					<Col xs={{ span: 24, offset: 0 }} md={{ span:12 }} lg={{ span: 6, offset: 0 }}>
						<LightningSvg style={{ fill: props.svgIconsColor }} />
						<p>Much more entertaning and user friendly, easier navigation</p>
					</Col>
					<Col xs={{ span: 24, offset: 0 }} md={{ span:12 }} lg={{ span: 6, offset: 0 }}>
						<UserSvg style={{ fill: props.svgIconsColor }} />
						<p>Build up a loyal customer profile with prizes, discounts and points</p>
					</Col>
					 {/* <Col xs={{ span: 24, offset: 0 }} md={{ span:12 }} lg={{ span: 4, offset: 1 }}>
						<VButton>
							<span>Know more
							<MoveRightSvg style={{ fill: '#060606' }} /></span>
						</VButton>
					</Col> */}
				</Row>
			</Col>
		</Row>
	</section>
  )
}
export default UniteBrand
