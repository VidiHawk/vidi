import React, { Component, Fragment } from 'react';
import { Row, Col} from 'antd';
import { StaticBg } from "../../assets/svg";

export const StaticPageBG = (props:any) => {
  return (
	<Fragment>
		<div className="static-page">
			<StaticBg className="v-svgBg black-svg"/>
			<section className="static-section">
				<div className="static-section-title"><div className="anime-bg" style={{ width: '24rem', height: '3rem', margin:'0 auto' }}></div></div>
				<div className="static-section-summary"><div className="anime-bg" style={{ width: '20rem', height: '2rem', margin: '1.2rem auto' }}></div></div>
				<div className="static-section-content">
					<Row justify="center">
						<Col lg={12}>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'5rem' }}></div>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'1rem' }}></div>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'1rem' }}></div>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'1rem' }}></div>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'1rem' }}></div>

							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'5rem' }}></div>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'1rem' }}></div>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'1rem' }}></div>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'1rem' }}></div>
							<div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop:'1rem' }}></div>
						</Col>
					</Row>
				</div>
			</section>
		</div>
      
	</Fragment>
  )
}