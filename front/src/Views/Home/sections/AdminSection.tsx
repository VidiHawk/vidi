import React from 'react'

import { Row, Col} from 'antd'
import Image from '../../../helpers/image'
import {StunningSvg} from '../../../assets/svg'


const AdminSection = (props:any) => {
	const textColor =  !props.theme ? '__white' : '';
  return (
	<section className="v-admin-panel-section">
		<StunningSvg className="v-svgBg v-svgBg--left" style={{ fill: props.svgBgColor }} />
		<Row gutter={[24, 48]}>
			<Col xs={{ span: 24, offset: 0, order: 1 }} md={{span:18, offset:2}} lg={{ span: 12, offset: 5 }}>
				<div className="v-title">
					<h3>
						<span>Admin panel</span>
					</h3>
					<span>
						Monitor and ship your orders, manage your customers, create discounts, start a live-streaming session on
						your video store.
					</span>
				</div>
			</Col>
		</Row>
		<Row gutter={[24, 48]} justify="center">
			<Col xs={{ span: 24, offset: 0 }} lg={20} offset={5}>
				<div className="v-admin-panel">
					<Image isStatic={true} image_url="images/admin_panel_home.png" islazy={true} height="582" width="844" className="desktop" alt="admin panel for live-streaming session" title="admin panel for live-streaming session"/>
					<Image isStatic={true} image_url="images/admin_panel_home_small.png" islazy={true} height="191" width="666" className="mobile" alt="analytics for video commerce" title="analytics for video commerce"/>
					<div className={`v-admin-text v-admin-text${textColor} v-admin-text__1`}>Easily upload and edit your videos</div>
					<div className={`v-admin-text v-admin-text${textColor} v-admin-text__2`}>Complete analytics suite</div>
					<div className={`v-admin-text v-admin-text${textColor} v-admin-text__3`}>Create your own videos with AI</div>
				</div>
			</Col>
		</Row>
	</section>
  )
}

export default AdminSection
