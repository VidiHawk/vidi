import React, { useContext, useState } from 'react'
import { Row, Col, Input, Card, Collapse } from 'antd'
import AuthContext from '../../helpers/authContext'
import Head from "../../Components/Head";
import VButton from '../../Components/Common/VButton'

import { FaqBottomMobileSvg, FaqBottomSvg, TopBg } from '../../assets/svg'
import { SearchIconSvg } from '../../assets/svg';
import { GroupSvg } from '../../assets/svg';
import { VideoMarketingSvg } from '../../assets/svg';
import { FeatureSvg } from '../../assets/svg'

import { FaqsData } from './FaqsData';

import { Link } from 'react-router-dom'

const { Panel } = Collapse;

const Faqs =(props:any) =>{
  const context = useContext(AuthContext)
	const themeDark = context.themeDark
  const svgBgColor = themeDark ? '#060606' : '#F0F1F6'
  const svgIconsColor = themeDark ? '#FFFFFF' : '#060606'
	const htmlProps = {
		itemscope: "true",
		itemtype: "https://schema.org/FAQPage",
	}

  return (
	<>
		<Head
			htmlProps={htmlProps}
			title="Video Website Builder | Mobile-first Video Shopping | Vidiren"
			description="Discover what you need to know about Vidiren. Check out the frequently asked questions about mobile-first video commerce websites platform." url="https://vidiren.com/blog"/>
		<div className="v-faqs">
			<HeaderSection {...props} svgBgColor={svgBgColor} svgIconsColor={svgIconsColor} themeDark={themeDark}/>
			<CardContent svgBgColor={svgBgColor} svgIconsColor={svgIconsColor} themeDark={themeDark} />
		</div>
		<FaqBottomSvg className="custom-faq black-svg" />
		<FaqBottomMobileSvg className="custom-mobile-faq black-svg" />
	</>
  )
}

const CardContentList = (props: any) => {
	return (
		<div className="faq-wrapper">
			<h2>Frequently Asked Questions</h2>
			<Collapse defaultActiveKey={['1']}>
				{props.faqs.map((faq: any, index: number) => <Panel key={index+1} header={faq.question}>
							<div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
								<h3 itemProp="name" style={{display: 'none'}}>{faq.question}</h3>
								<div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
									<p itemProp="text">{faq.ans}</p>
								</div>
							</div>
						</Panel>)}
			</Collapse>
		</div>
			)
}


const CardContent = (props: any) => {
	const svgIconsColor = props.themeDark ? '#FFFFFF' : '#D0D1D7'
	const [selectedQuestionType, setSelectedQuestionType]= useState<string>('About');
	const cardContent = [
		{
			name: 'About',
			svg: <GroupSvg style={{ fill: svgIconsColor }}/>,
		},
		{
			name: 'Features',
			svg: <FeatureSvg style={{ fill: svgIconsColor }}/>,
		},
		{
			name: 'Videos',
			svg: <VideoMarketingSvg style={{ fill: svgIconsColor }} />,
		},
	]

	return (
		<>
			<Row justify="center" className="card-wrapper"  gutter={{ xs: 8, sm: 16, md: 40, lg: 32 }}>
				{
					cardContent.map( (content, index) => <Col key={`content_${index}`} >
						<Card className="v-custom-card"  onClick={() => setSelectedQuestionType(content.name)}>
							{content.svg}
							<p>{content.name}</p>
						</Card>
					</Col>,
				)}
			</Row>

			<FrequentQuestions faqs={FaqsData[selectedQuestionType]}/>
		</>
	)
}

const FrequentQuestions = (props: any) => {

	return (
		<>
			<Row justify="center">
				<Col xs={24} sm={24} md={24} lg={19} xl={19} xxl={15} >
					<CardContentList faqs={props.faqs} />
				</Col>
			</Row>
			<Row justify="center">
				<Col>
					<div className="v-header">
						<div className="v-heading">
							<h1 className="v-heading__title-small"><span>Do not you find what you are looking for?</span></h1>
							<p className="v-heading__sub-title">Get in touch with us and we will help you</p>
						</div>
						<Link to="/contact" title="Contact Vidiren">
							<VButton>Contact Us</VButton>
						</Link>
					</div>
				</Col>
			</Row>
		</>
	)
}

const HeaderSection = (props:any) => {
	const searchClass = props.themeDark ? 'v-search' : 'v-search v-search--light'
	const svgIconsColor = props.themeDark ? '#FFFFFF' : '#9B9B9B'
  const searchIcon = <SearchIconSvg style={{ fill: svgIconsColor }} />
  return (
	<section className="v-faq-section">
		<TopBg className="v-svgBg black-svg" />
		<Row justify="center">
			<Col>
				<div className="v-header">
					<div className="v-heading">
						<h1 className="v-heading__title mb-fotn">How can we help you?</h1>
						<p className="v-heading__sub-title mb-padd">Find out what you need to know about Vidiren</p>
					</div>
					{/*<Input prefix={searchIcon} className={searchClass} placeholder="Search" />*/}
				</div>
			</Col>
		</Row>
	</section>
  )
}

export default Faqs
