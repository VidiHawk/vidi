import React, { useContext } from 'react'
import { Row, Col } from 'antd'
import AuthContext from '../../helpers/authContext'
import { formatDate } from '../../helpers/helpers'
import { useQuery } from '@apollo/client'
import { STATIC } from '../../lib/graphql/queries'

import { StaticBg, StaticBottomMobileSvg, StaticBottomSvg } from '../../assets/svg'
import { StaticPageBG } from '../../Components/Common/Preact'
import Head from "../../Components/Head";

const StaticPage = React.memo(function StaticPage(props:any) {
	const page = props.match.params.page
  const { loading, data: pageData } = useQuery(STATIC.get(), {
    variables: { page },
  })
  const context = useContext(AuthContext)
  const themeDark = context.themeDark
  const data = pageData && pageData.static ? pageData.static : {}

  if (loading) return <StaticPageBG />

  let head = <Head title={`Vidi Commerce ${page}`} url={`https://vidicommerce.com/${page}`}/>;

  if (page === 'terms') {
    head = <Head title="Terms | Create a Video Commerce Website | Vidi Commerce" description="Learn about the Vidi Commerce Terms of Use. This document contains important information about content types, copyright info, and permitted uses of our platform." url={`https://vidicommerce.com/${page}`}/>;
  } else if (page === 'privacy') {
    head = <Head title="Privacy | Best video commerce builder 2021 | Vidi Commerce" description="Learn about the Vidi Rendering Technologies Privacy Policy. This document contains the rules which govern how we collect and use subscriber data." url={`https://vidicommerce.com/${page}`}/>;
  }

  if (data && data.html) {
    return (
	<>
		{head}
		<div className="static-page">
			<StaticBg className="v-svgBg black-svg" />
			<section className="static-section">
				<h1 className="static-section-title">{data.label}</h1>
				<div className="static-section-summary">Last Updated: {formatDate(data.updatedAt)}</div>
				<div className="static-section-content">
					<Row justify="center">
						<Col lg={18} sm={20}>
							<div dangerouslySetInnerHTML={{ __html: data.html }}></div>
						</Col>
					</Row>
				</div>
			</section>
		</div>
		<StaticBottomSvg className="custom-static-svg black-svg"/>
		<StaticBottomMobileSvg className="custom-static-mobile black-svg"/>
	</>
    )
  } else return null
})

export default StaticPage
