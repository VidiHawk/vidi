import React from 'react'

import { Row, Col } from 'antd'
import DemoRequest from './DemoRequest'
import { BottomDecorSvg, FaqBottomMobileSvg } from '../../../assets/svg'

const BottomSection = (props:any) => {
  return (
	<section className="v-home-bottom-section">
		<BottomDecorSvg className="v-bottom-svg black-svg" />
		<FaqBottomMobileSvg className="custom-mobile-home black-svg" />
		<section>
			<Row justify="center" gutter={[24, 24]}>
				<Col xs={{ span: 24, offset: 0 }} lg={{ span: 14, offset: 0 }} xl={{ span: 11, offset: 0 }}>
					<DemoRequest {...props} />
				</Col>
			</Row>
		</section>
	</section>
  )
}
export default BottomSection
